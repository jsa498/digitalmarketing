import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    // Import Stripe dynamically
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to purchase products' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one product is required' },
        { status: 400 }
      );
    }

    // Get all products from database
    const productIds = items.map(item => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No valid products found' },
        { status: 404 }
      );
    }

    // Check for already purchased products
    const existingPurchases = await prisma.purchase.findMany({
      where: {
        userId: session.user.id,
        productId: {
          in: productIds
        },
        status: 'completed',
      },
    });

    const alreadyPurchasedIds = existingPurchases.map(p => p.productId);
    
    // Filter out already purchased products
    const productsToPurchase = products.filter(p => !alreadyPurchasedIds.includes(p.id));
    
    if (productsToPurchase.length === 0) {
      return NextResponse.json(
        { error: 'All products have already been purchased' },
        { status: 400 }
      );
    }

    // Prepare line items for Stripe
    const lineItems = productsToPurchase.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
          description: product.description,
          images: product.imageUrl ? [product.imageUrl] : [],
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: 1,
    }));

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
      metadata: {
        // Store product IDs as comma-separated string in metadata
        productIds: productsToPurchase.map(p => p.id).join(','),
        userId: session.user.id,
      },
    });

    // Create pending purchase records for each product
    await Promise.all(
      productsToPurchase.map(product => 
        prisma.purchase.create({
          data: {
            userId: session.user.id,
            productId: product.id,
            amount: product.price,
            status: 'pending',
          },
        })
      )
    );

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the checkout session' },
      { status: 500 }
    );
  }
} 
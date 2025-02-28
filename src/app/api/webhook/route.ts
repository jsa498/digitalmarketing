import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

// Initialize Stripe with a simpler approach
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify the event
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const productId = session.metadata?.productId;
        const userId = session.metadata?.userId;

        if (productId && userId) {
          // Update purchase status to completed
          await prisma.purchase.updateMany({
            where: {
              productId,
              userId,
              status: 'pending',
            },
            data: {
              status: 'completed',
            },
          });
        }
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const productId = session.metadata?.productId;
        const userId = session.metadata?.userId;

        if (productId && userId) {
          // Update purchase status to failed
          await prisma.purchase.updateMany({
            where: {
              productId,
              userId,
              status: 'pending',
            },
            data: {
              status: 'failed',
            },
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 
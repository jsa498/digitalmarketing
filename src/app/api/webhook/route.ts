import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update purchase status in database
        if (session.metadata?.courseId && session.metadata?.userId) {
          await prisma.purchase.updateMany({
            where: {
              courseId: session.metadata.courseId,
              userId: session.metadata.userId,
              status: 'pending',
            },
            data: {
              status: 'completed',
            },
          });

          console.log(`Purchase completed for course ${session.metadata.courseId} by user ${session.metadata.userId}`);
        }
        break;
      
      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        
        // Update purchase status in database
        if (expiredSession.metadata?.courseId && expiredSession.metadata?.userId) {
          await prisma.purchase.updateMany({
            where: {
              courseId: expiredSession.metadata.courseId,
              userId: expiredSession.metadata.userId,
              status: 'pending',
            },
            data: {
              status: 'failed',
            },
          });

          console.log(`Purchase expired for course ${expiredSession.metadata.courseId} by user ${expiredSession.metadata.userId}`);
        }
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'An error occurred while handling the webhook' },
      { status: 500 }
    );
  }
} 
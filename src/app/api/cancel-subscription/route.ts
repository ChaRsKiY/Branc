import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Временное решение: ищем все активные подписки
    // В реальном приложении нужно хранить связь между Clerk userId и Stripe customer ID
    
    console.log('User trying to cancel subscription:', userId);
    
    try {
      // Получаем все активные подписки (временное решение)
      const subscriptions = await stripe.subscriptions.list({
        status: 'active',
        limit: 10,
      });

      if (subscriptions.data.length === 0) {
        return NextResponse.json(
          { error: 'No active subscription found' },
          { status: 404 }
        );
      }

      // Отменяем первую активную подписку
      const subscription = subscriptions.data[0];
      const canceledSubscription = await stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: true,
      });

      return NextResponse.json({
        success: true,
        subscription: {
          id: canceledSubscription.id,
          status: canceledSubscription.status,
          cancelAtPeriodEnd: (canceledSubscription as any).cancel_at_period_end,
        }
      });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return NextResponse.json(
        { error: 'Failed to cancel subscription' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
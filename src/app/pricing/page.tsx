'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Бесплатный',
    price: '0',
    period: 'месяц',
    features: [
      'До 1,000 подписчиков',
      '5 email-шаблонов',
      'Базовая аналитика',
      'Поддержка по email'
    ],
    buttonText: 'Начать бесплатно',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Профессиональный',
    price: '29',
    period: 'месяц',
    features: [
      'До 10,000 подписчиков',
      'Неограниченные шаблоны',
      'Расширенная аналитика',
      'Приоритетная поддержка',
      'A/B тестирование',
      'Автоматизация'
    ],
    buttonText: 'Выбрать план',
    buttonVariant: 'primary' as const,
    popular: true,
    stripePriceId: 'price_1RpDbkFBQQuHShmxqsumOhv4' // Замените на ваш Stripe Price ID
  },
  {
    name: 'Бизнес',
    price: '99',
    period: 'месяц',
    features: [
      'До 100,000 подписчиков',
      'Все функции Профессионального',
      'Индивидуальная настройка',
      'Персональный менеджер',
      'API доступ',
      'Белый лейбл'
    ],
    buttonText: 'Выбрать план',
    buttonVariant: 'primary' as const,
    popular: false,
    stripePriceId: 'price_1OqX8X2eZvKYlo2C9Q9Q9Q9Q' // Замените на ваш Stripe Price ID
  }
];

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (planName: string, stripePriceId?: string) => {
    if (!isSignedIn) {
      // Перенаправить на регистрацию
      return;
    }

    if (!stripePriceId) {
      // Бесплатный план
      alert('Бесплатный план выбран!');
      return;
    }

    setLoading(planName);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          planName: planName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка создания сессии оплаты');
      }

      const data = await response.json();
      
      if (!data.sessionId) {
        throw new Error('Не получен sessionId от сервера');
      }

      // Перенаправляем на Stripe Checkout
      const stripe = await import('@stripe/stripe-js');
      const stripeInstance = await stripe.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      if (!stripeInstance) {
        throw new Error('Не удалось загрузить Stripe');
      }

      const { error: stripeError } = await stripeInstance.redirectToCheckout({ 
        sessionId: data.sessionId 
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Email Marketing Platform
              </Link>
              
              <nav className="flex items-center space-x-6">
                <Link href="/pricing" className="text-blue-600 font-medium">
                  Тарифы
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Контакты
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Дашборд
                  </Link>
                  <span className="text-gray-600">Привет, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Войти
                  </Link>
                  <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Выберите подходящий план
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Начните бесплатно и масштабируйтесь по мере роста вашего бизнеса. 
            Все планы включают полный доступ к нашим инструментам.
          </p>
        </div>

        {error && (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.name, plan.stripePriceId)}
                  disabled={loading === plan.name}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100'
                  }`}
                >
                  {loading === plan.name ? 'Загрузка...' : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Могу ли я изменить план в любое время?
              </h3>
              <p className="text-gray-600">
                Да, вы можете изменить план в любое время. При переходе на более дорогой план 
                вы заплатите пропорциональную сумму. При переходе на более дешевый план 
                изменения вступят в силу со следующего периода оплаты.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Есть ли пробный период?
              </h3>
              <p className="text-gray-600">
                Да, все платные планы включают 14-дневный пробный период. 
                Вы можете отменить подписку в любое время без дополнительных платежей.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Какие способы оплаты вы принимаете?
              </h3>
              <p className="text-gray-600">
                Мы принимаем все основные кредитные карты (Visa, MasterCard, American Express) 
                через безопасную систему Stripe. Оплата происходит автоматически каждый месяц.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
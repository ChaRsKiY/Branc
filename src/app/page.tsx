'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Email Marketing Platform</h1>
            </div>
            
            <nav className="flex items-center space-x-8">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Тарифы
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Контакты
              </Link>
              
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Дашборд
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-gray-900">
                      Войти
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Регистрация
                    </button>
                  </SignUpButton>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Создавайте потрясающие
            <span className="text-blue-600"> email-кампании</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Профессиональная платформа для создания email-шаблонов, управления рассылками 
            и анализа результатов. Все инструменты в одном месте.
          </p>
          
          <div className="mt-10 flex justify-center space-x-4">
            {isSignedIn ? (
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Перейти в дашборд
              </Link>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                    Начать бесплатно
                  </button>
                </SignUpButton>
                <Link 
                  href="/pricing" 
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Посмотреть тарифы
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Визуальный редактор</h3>
            <p className="text-gray-600">
              Создавайте красивые email-шаблоны с помощью drag-and-drop редактора. 
              Никакого кодирования не требуется.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Управление аудиторией</h3>
            <p className="text-gray-600">
              Импортируйте контакты, создавайте сегменты аудитории и отслеживайте 
              активность подписчиков.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Аналитика и отчеты</h3>
            <p className="text-gray-600">
              Получайте детальную аналитику по открытиям, кликам и конверсиям. 
              Оптимизируйте ваши кампании.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

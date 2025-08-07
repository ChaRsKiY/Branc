# Email Marketing Platform

Полноценная платформа для создания email-кампаний с аутентификацией Clerk и подписками Stripe.

## 🚀 Возможности

- ✅ **Аутентификация** - Clerk для регистрации и входа
- ✅ **Подписки** - Stripe для управления тарифами
- ✅ **Email редактор** - Визуальный редактор шаблонов
- ✅ **Дашборд** - Управление подписками и статистика
- ✅ **Webhooks** - Обработка событий Stripe
- ✅ **Адаптивный дизайн** - Tailwind CSS

## 🛠️ Технологии

- **Frontend**: Next.js 15, React 19, TypeScript
- **Стили**: Tailwind CSS
- **Аутентификация**: Clerk
- **Платежи**: Stripe
- **Email редактор**: GrapesJS

## 📦 Установка

1. **Клонируйте репозиторий:**
```bash
git clone <your-repo-url>
cd branc
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Настройте переменные окружения:**
Создайте файл `.env.local`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Запустите приложение:**
```bash
npm run dev
```

## 🔧 Настройка Clerk

1. Зарегистрируйтесь на [clerk.com](https://clerk.com)
2. Создайте новое приложение
3. Скопируйте ключи в `.env.local`
4. Настройте домены в настройках Clerk

## 💳 Настройка Stripe

1. Зарегистрируйтесь на [stripe.com](https://stripe.com)
2. Перейдите в Dashboard → Developers → API keys
3. Скопируйте ключи в `.env.local`
4. Создайте продукты и цены в Stripe Dashboard
5. Настройте webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`

## 📁 Структура проекта

```
src/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/    # Создание Stripe checkout
│   │   ├── subscription/               # Получение подписки
│   │   ├── cancel-subscription/        # Отмена подписки
│   │   └── webhooks/
│   │       └── stripe/                 # Stripe webhooks
│   ├── dashboard/                      # Дашборд пользователя
│   ├── pricing/                        # Страница тарифов
│   ├── layout.tsx                      # Главный layout
│   └── page.tsx                        # Главная страница
├── components/                         # React компоненты
└── middleware.ts                       # Middleware для защиты маршрутов
```

## 🔐 Защищенные маршруты

Следующие маршруты требуют аутентификации:
- `/dashboard` - Дашборд пользователя
- `/editor` - Email редактор
- `/campaigns` - Управление кампаниями
- `/subscribers` - Управление подписчиками
- `/billing` - Управление подпиской

## 💰 Тарифы

- **Бесплатный** - 1,000 подписчиков, 5 шаблонов
- **Профессиональный** ($29/мес) - 10,000 подписчиков, неограниченные шаблоны
- **Бизнес** ($99/мес) - 100,000 подписчиков, все функции

## 🚀 Развертывание

1. **Vercel (рекомендуется):**
```bash
npm run build
vercel --prod
```

2. **Другие платформы:**
- Настройте переменные окружения
- Укажите webhook URL в Stripe
- Настройте домены в Clerk

## 🔧 Разработка

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн версии
npm start

# Линтинг
npm run lint
```

## 📝 TODO

- [ ] Добавить базу данных (Prisma + PostgreSQL)
- [ ] Реализовать email редактор с GrapesJS
- [ ] Добавить отправку email через SMTP
- [ ] Создать систему аналитики
- [ ] Добавить A/B тестирование
- [ ] Реализовать API для интеграций

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

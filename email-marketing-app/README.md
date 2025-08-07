# EmailFlow - Email Marketing Platform

Полнофункциональная платформа для email маркетинга, построенная на Next.js с современным дизайном и мощными возможностями.

## 🚀 Возможности

- **Аутентификация пользователей** - Безопасная регистрация и вход с помощью Clerk
- **Конструктор форм** - Drag-and-drop редактор для создания форм подписки
- **Управление подписчиками** - Полный контроль над базой подписчиков
- **Email редактор** - Визуальный редактор для создания красивых email шаблонов
- **Кампании** - Создание и управление email рассылками
- **Аналитика** - Отслеживание открытий, кликов и конверсий
- **Тарифные планы** - Гибкая система подписок с разными уровнями доступа
- **Современный UI** - Красивый интерфейс с использованием Tailwind CSS и shadcn/ui

## 🛠 Технологии

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: PostgreSQL + Prisma ORM
- **Email**: Resend (планируется)
- **Payments**: Stripe (планируется)
- **Drag & Drop**: @dnd-kit

## 📋 Требования

- Node.js 18+ 
- PostgreSQL
- Аккаунты в сервисах:
  - [Clerk](https://clerk.com) для аутентификации
  - [Resend](https://resend.com) для отправки email (опционально)
  - [Stripe](https://stripe.com) для платежей (опционально)

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd email-marketing-app
npm install
```

### 2. Настройка переменных окружения

Скопируйте `.env.local` и заполните необходимые данные:

```bash
cp .env.local .env.local.example
```

Обязательные переменные:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/email_marketing?schema=public"

# Clerk Authentication  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

### 3. Настройка базы данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Применение миграций (создание таблиц)
npx prisma db push

# Опционально: заполнение тестовыми данными
npx prisma db seed
```

### 4. Запуск приложения

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 🔧 Настройка Clerk

1. Создайте аккаунт на [clerk.com](https://clerk.com)
2. Создайте новое приложение
3. В настройках приложения:
   - Скопируйте Publishable Key и Secret Key в `.env.local`
   - Настройте redirect URLs:
     - Sign-in: `/sign-in`
     - Sign-up: `/sign-up` 
     - After sign-in: `/dashboard`
     - After sign-up: `/dashboard`

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Защищенные страницы дашборда
│   ├── sign-in/          # Страница входа
│   ├── sign-up/          # Страница регистрации
│   └── f/                # Публичные формы (планируется)
├── components/
│   └── ui/               # Переиспользуемые UI компоненты
├── lib/                  # Утилиты и конфигурация
└── prisma/              # Схема базы данных
```

## 🎯 Статус разработки

### ✅ Готово
- [x] Базовая структура Next.js проекта
- [x] Аутентификация с Clerk
- [x] Дизайн системы и UI компоненты
- [x] Дашборд с навигацией
- [x] Конструктор форм с drag-and-drop
- [x] Схема базы данных

### 🚧 В разработке
- [ ] Система хостинга форм
- [ ] Управление подписчиками
- [ ] Email редактор и шаблоны
- [ ] Система кампаний
- [ ] Аналитика и отчеты

### 📋 Планируется
- [ ] Интеграция с email провайдерами
- [ ] Система подписок и платежей
- [ ] A/B тестирование
- [ ] Автоматизация email последовательностей
- [ ] API для интеграций

## 🤝 Разработка

### Запуск в режиме разработки

```bash
npm run dev
```

### Работа с базой данных

```bash
# Просмотр данных
npx prisma studio

# Сброс базы данных
npx prisma db push --force-reset

# Создание новой миграции
npx prisma migrate dev --name your_migration_name
```

### Линтинг и форматирование

```bash
npm run lint
npm run lint:fix
```

## 📄 Лицензия

MIT License

## 🆘 Поддержка

При возникновении вопросов или проблем, создайте issue в репозитории.

---

Создано с ❤️ с использованием Next.js и современных веб-технологий.

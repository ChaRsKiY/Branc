import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Users, BarChart3, Zap, Shield, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Mail className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">EmailFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Возможности
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Тарифы
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/sign-in">
            Войти
          </Link>
          <Button asChild size="sm">
            <Link href="/sign-up">Попробовать бесплатно</Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Создавайте эффективные
                <span className="text-primary"> email кампании</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Полнофункциональная платформа для email маркетинга. Создавайте формы подписки, 
                управляйте базой подписчиков и отправляйте персонализированные рассылки.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/sign-up">Начать бесплатно</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#features">Узнать больше</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Мощные возможности</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Все необходимые инструменты для успешного email маркетинга в одной платформе
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary" />
                <CardTitle>Конструктор форм</CardTitle>
                <CardDescription>
                  Создавайте красивые формы подписки с drag-and-drop редактором и размещайте их на любом сайте
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Mail className="h-10 w-10 text-primary" />
                <CardTitle>Email редактор</CardTitle>
                <CardDescription>
                  Визуальный редактор для создания профессиональных email шаблонов и кампаний
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary" />
                <CardTitle>Аналитика</CardTitle>
                <CardDescription>
                  Отслеживайте открытия, клики и конверсии для оптимизации ваших кампаний
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary" />
                <CardTitle>Автоматизация</CardTitle>
                <CardDescription>
                  Настраивайте автоматические последовательности писем для повышения вовлеченности
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary" />
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>
                  GDPR совместимость и защита данных подписчиков на высшем уровне
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary" />
                <CardTitle>Интеграции</CardTitle>
                <CardDescription>
                  Легкая интеграция с популярными CMS, e-commerce платформами и сервисами
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Выберите ваш план</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Начните бесплатно и масштабируйтесь по мере роста вашего бизнеса
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Бесплатный</CardTitle>
                <CardDescription>Идеально для начала</CardDescription>
                <div className="text-3xl font-bold">₽0<span className="text-sm font-normal">/мес</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 1,000 подписчиков
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 5,000 писем/мес
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    5 форм подписки
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Базовая аналитика
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  <Link href="/sign-up">Начать бесплатно</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Стартер</CardTitle>
                <CardDescription>Для растущего бизнеса</CardDescription>
                <div className="text-3xl font-bold">₽1,490<span className="text-sm font-normal">/мес</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 10,000 подписчиков
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 50,000 писем/мес
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Неограниченные формы
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Продвинутая аналитика
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    A/B тестирование
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Автоматизация
                  </li>
                </ul>
                <Button className="w-full">
                  <Link href="/sign-up">Выбрать план</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Профессиональный</CardTitle>
                <CardDescription>Для больших команд</CardDescription>
                <div className="text-3xl font-bold">₽2,990<span className="text-sm font-normal">/мес</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 50,000 подписчиков
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    До 500,000 писем/мес
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Приоритетная поддержка
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Продвинутая сегментация
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Пользовательские интеграции
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Удаление брендинга
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  <Link href="/sign-up">Выбрать план</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 EmailFlow. Все права защищены.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Условия использования
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Политика конфиденциальности
          </Link>
        </nav>
      </footer>
    </div>
  );
}

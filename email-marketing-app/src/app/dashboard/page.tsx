import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Users, 
  Mail, 
  FileText, 
  TrendingUp, 
  Plus,
  BarChart3,
  Eye,
  MousePointer
} from "lucide-react";

export default function DashboardPage() {
  // В реальном проекте эти данные будут загружаться из базы данных
  const stats = {
    totalSubscribers: 1247,
    totalForms: 8,
    totalCampaigns: 15,
    openRate: 24.5,
    clickRate: 3.2,
    deliveryRate: 98.7
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Обзор</h2>
          <p className="text-muted-foreground">
            Добро пожаловать в панель управления EmailFlow
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/campaigns/new">
              <Mail className="h-4 w-4 mr-2" />
              Новая кампания
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/forms/new">
              <Plus className="h-4 w-4 mr-2" />
              Создать форму
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего подписчиков
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% с прошлого месяца
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные формы
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForms}</div>
            <p className="text-xs text-muted-foreground">
              +2 за последние 30 дней
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Отправленные кампании
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              +3 в этом месяце
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средний CTR
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              +0.5% улучшение
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Открываемость
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.openRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Процент открытых писем от общего количества доставленных
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MousePointer className="h-5 w-5 mr-2" />
              Кликабельность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.clickRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Процент кликов по ссылкам в письмах
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Доставляемость
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.deliveryRate}%</div>
            <p className="text-sm text-muted-foreground mt-2">
              Процент успешно доставленных писем
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>
            Популярные действия для быстрого доступа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/forms/new">
                <FileText className="h-6 w-6 mb-2" />
                Создать форму
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/campaigns/new">
                <Mail className="h-6 w-6 mb-2" />
                Новая кампания
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/templates/new">
                <FileText className="h-6 w-6 mb-2" />
                Создать шаблон
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/subscribers">
                <Users className="h-6 w-6 mb-2" />
                Управление подписчиками
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Последняя активность</CardTitle>
          <CardDescription>
            Недавние события в вашем аккаунте
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Кампания "Летняя распродажа" отправлена 1,247 подписчикам</p>
                <p className="text-xs text-muted-foreground">2 часа назад</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Новый подписчик добавлен через форму "Подписка на новости"</p>
                <p className="text-xs text-muted-foreground">4 часа назад</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Создан новый email шаблон "Приветственное письмо"</p>
                <p className="text-xs text-muted-foreground">1 день назад</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
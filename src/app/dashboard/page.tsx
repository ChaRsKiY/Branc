'use client'

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Users, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Eye, 
  MousePointer,
  UserPlus,
  Calendar,
  Target
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useUser()

  // Моковые данные для демонстрации
  const stats = {
    totalSubscribers: 1247,
    totalEmails: 156,
    openRate: 24.5,
    clickRate: 3.2,
    newSubscribers: 23,
    activeCampaigns: 3
  }

  const recentCampaigns = [
    { id: 1, name: "Приветственное письмо", status: "Отправлено", sent: 1247, opened: 305, clicked: 40 },
    { id: 2, name: "Новости недели", status: "Черновик", sent: 0, opened: 0, clicked: 0 },
    { id: 3, name: "Специальное предложение", status: "Запланировано", sent: 0, opened: 0, clicked: 0 },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-600">Добро пожаловать, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/campaigns/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Новая кампания
            </Button>
          </Link>
        </div>
      </div>

      <div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего подписчиков</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.newSubscribers}</span> за последние 30 дней
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Отправлено писем</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmails}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> за последние 30 дней
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Процент открытий</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> по сравнению с прошлым месяцем
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Процент кликов</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clickRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.5%</span> по сравнению с прошлым месяцем
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/dashboard/campaigns/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Создать кампанию</CardTitle>
                <CardDescription>Отправьте email вашим подписчикам</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/forms/new">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Создать форму</CardTitle>
                <CardDescription>Добавьте форму подписки на сайт</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/templates">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Шаблоны</CardTitle>
                <CardDescription>Создайте или выберите шаблон</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/analytics">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Аналитика</CardTitle>
                <CardDescription>Просмотрите детальную статистику</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Последние кампании</CardTitle>
              <CardDescription>Ваши недавние email кампании</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.status}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{campaign.sent}</div>
                      <div className="text-xs text-gray-600">
                        {campaign.opened} открытий • {campaign.clicked} кликов
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/campaigns">
                  <Button variant="outline" className="w-full">
                    Посмотреть все кампании
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Активность</CardTitle>
              <CardDescription>Последние действия в вашем аккаунте</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Новая кампания создана</p>
                    <p className="text-xs text-gray-600">2 часа назад</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">15 новых подписчиков</p>
                    <p className="text-xs text-gray-600">Сегодня</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Кампания отправлена</p>
                    <p className="text-xs text-gray-600">Вчера</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Форма подписки создана</p>
                    <p className="text-xs text-gray-600">3 дня назад</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
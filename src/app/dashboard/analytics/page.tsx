'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Mail,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Filter
} from "lucide-react"

// Моковые данные для аналитики
const analyticsData = {
  overview: {
    totalSubscribers: 1247,
    totalEmails: 156,
    totalOpens: 2847,
    totalClicks: 342,
    openRate: 24.5,
    clickRate: 3.2,
    unsubscribeRate: 0.8
  },
  trends: [
    { date: '2024-01-01', subscribers: 1200, emails: 12, opens: 280, clicks: 35 },
    { date: '2024-01-02', subscribers: 1210, emails: 15, opens: 295, clicks: 38 },
    { date: '2024-01-03', subscribers: 1220, emails: 18, opens: 310, clicks: 42 },
    { date: '2024-01-04', subscribers: 1230, emails: 14, opens: 285, clicks: 36 },
    { date: '2024-01-05', subscribers: 1240, emails: 20, opens: 320, clicks: 45 },
    { date: '2024-01-06', subscribers: 1245, emails: 16, opens: 300, clicks: 40 },
    { date: '2024-01-07', subscribers: 1247, emails: 19, opens: 315, clicks: 43 }
  ],
  topCampaigns: [
    { name: "Приветственное письмо", sent: 1247, opened: 305, clicked: 40, openRate: 24.5, clickRate: 3.2 },
    { name: "Новости недели", sent: 856, opened: 198, clicked: 25, openRate: 23.1, clickRate: 2.9 },
    { name: "Специальное предложение", sent: 623, opened: 145, clicked: 18, openRate: 23.3, clickRate: 2.9 },
    { name: "Напоминание о вебинаре", sent: 445, opened: 98, clicked: 12, openRate: 22.0, clickRate: 2.7 }
  ],
  deviceStats: [
    { device: "Desktop", percentage: 45 },
    { device: "Mobile", percentage: 40 },
    { device: "Tablet", percentage: 15 }
  ],
  locationStats: [
    { location: "Москва", subscribers: 456, percentage: 36.6 },
    { location: "Санкт-Петербург", subscribers: 234, percentage: 18.8 },
    { location: "Екатеринбург", subscribers: 123, percentage: 9.9 },
    { location: "Новосибирск", subscribers: 98, percentage: 7.9 },
    { location: "Другие", subscribers: 336, percentage: 27.0 }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-600">Детальная статистика ваших email кампаний</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Последние 7 дней</option>
            <option value="30d">Последние 30 дней</option>
            <option value="90d">Последние 90 дней</option>
            <option value="1y">Последний год</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего подписчиков</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+47</span> за последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отправлено писем</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalEmails}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+7</span> за последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Процент открытий</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.openRate}%</div>
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
            <div className="text-2xl font-bold">{analyticsData.overview.clickRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> по сравнению с прошлым месяцем
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Email Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Производительность email</CardTitle>
            <CardDescription>Статистика открытий и кликов по дням</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trends.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(day.opens / day.emails / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{day.opens} открытий</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-20 bg-green-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(day.clicks / day.emails / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{day.clicks} кликов</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{day.emails}</div>
                    <div className="text-xs text-gray-600">писем</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Лучшие кампании</CardTitle>
            <CardDescription>Топ кампаний по производительности</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{campaign.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-600">
                        {campaign.openRate}% открытий
                      </span>
                      <span className="text-xs text-gray-600">
                        {campaign.clickRate}% кликов
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{campaign.sent}</div>
                    <div className="text-xs text-gray-600">отправлено</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Устройства</CardTitle>
            <CardDescription>Распределение по типам устройств</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {device.device === "Desktop" ? "💻" : device.device === "Mobile" ? "📱" : "📱"}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>География</CardTitle>
            <CardDescription>Распределение подписчиков по городам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.locationStats.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">📍</span>
                    </div>
                    <span className="text-sm font-medium">{location.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{location.subscribers}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Дополнительные метрики</CardTitle>
            <CardDescription>Подробная статистика по кампаниям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {analyticsData.overview.totalOpens.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Всего открытий</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {analyticsData.overview.totalClicks.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Всего кликов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {analyticsData.overview.unsubscribeRate}%
                </div>
                <div className="text-sm text-gray-600">Процент отписок</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
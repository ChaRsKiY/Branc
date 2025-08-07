'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Send,
  Calendar,
  Users,
  BarChart3
} from "lucide-react"
import Link from "next/link"

// Моковые данные кампаний
const campaigns = [
  {
    id: 1,
    name: "Приветственное письмо",
    status: "Отправлено",
    sent: 1247,
    opened: 305,
    clicked: 40,
    openRate: 24.5,
    clickRate: 3.2,
    createdAt: "2024-01-15",
    sentAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Новости недели",
    status: "Черновик",
    sent: 0,
    opened: 0,
    clicked: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: "2024-01-20",
    sentAt: null
  },
  {
    id: 3,
    name: "Специальное предложение",
    status: "Запланировано",
    sent: 0,
    opened: 0,
    clicked: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: "2024-01-18",
    sentAt: "2024-01-25T14:00:00Z"
  },
  {
    id: 4,
    name: "Напоминание о вебинаре",
    status: "Отправлено",
    sent: 856,
    opened: 198,
    clicked: 25,
    openRate: 23.1,
    clickRate: 2.9,
    createdAt: "2024-01-10",
    sentAt: "2024-01-10T09:15:00Z"
  }
]

const statusColors = {
  "Отправлено": "bg-green-100 text-green-800",
  "Черновик": "bg-gray-100 text-gray-800",
  "Запланировано": "bg-blue-100 text-blue-800",
  "Отправляется": "bg-yellow-100 text-yellow-800"
}

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Кампании</h1>
          <p className="text-gray-600">Управляйте вашими email кампаниями</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая кампания
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск кампаний..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все статусы</option>
          <option value="Отправлено">Отправлено</option>
          <option value="Черновик">Черновик</option>
          <option value="Запланировано">Запланировано</option>
        </select>
      </div>

      {/* Campaigns Grid */}
      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription>
                      Создано {new Date(campaign.createdAt).toLocaleDateString('ru-RU')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                    {campaign.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{campaign.sent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Отправлено</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{campaign.opened.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Открыто</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{campaign.clicked.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Кликов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{campaign.openRate}%</div>
                  <div className="text-sm text-gray-600">Открытий</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{campaign.sent} получателей</span>
                  {campaign.sentAt && (
                    <>
                      <span>•</span>
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(campaign.sentAt).toLocaleDateString('ru-RU')}</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Просмотр
                    </Button>
                  </Link>
                  <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Редактировать
                    </Button>
                  </Link>
                  {campaign.status === "Черновик" && (
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-1" />
                      Отправить
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Кампании не найдены</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Попробуйте изменить параметры поиска" 
                : "Создайте свою первую кампанию"
              }
            </p>
            <Link href="/dashboard/campaigns/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать кампанию
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
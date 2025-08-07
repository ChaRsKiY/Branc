'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Target, 
  Plus, 
  Search, 
  Copy,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Calendar,
  Settings
} from "lucide-react"
import Link from "next/link"

// Моковые данные форм
const forms = [
  {
    id: 1,
    name: "Основная форма подписки",
    type: "Popup",
    status: "Активна",
    subscribers: 1247,
    conversionRate: 12.5,
    createdAt: "2024-01-15",
    lastUsed: "2024-01-20",
    embedCode: "<script src='https://emailcampaign.com/forms/1.js'></script>",
    url: "https://emailcampaign.com/forms/1"
  },
  {
    id: 2,
    name: "Форма в футере",
    type: "Embedded",
    status: "Активна",
    subscribers: 856,
    conversionRate: 8.2,
    createdAt: "2024-01-10",
    lastUsed: "2024-01-19",
    embedCode: "<div id='emailcampaign-form-2'></div>",
    url: "https://emailcampaign.com/forms/2"
  },
  {
    id: 3,
    name: "Поп-ап для новых посетителей",
    type: "Popup",
    status: "Неактивна",
    subscribers: 234,
    conversionRate: 15.7,
    createdAt: "2024-01-05",
    lastUsed: "2024-01-15",
    embedCode: "<script src='https://emailcampaign.com/forms/3.js'></script>",
    url: "https://emailcampaign.com/forms/3"
  }
]

const statusColors = {
  "Активна": "bg-green-100 text-green-800",
  "Неактивна": "bg-gray-100 text-gray-800",
  "Черновик": "bg-yellow-100 text-yellow-800"
}

const typeColors = {
  "Popup": "bg-blue-100 text-blue-800",
  "Embedded": "bg-purple-100 text-purple-800",
  "Landing": "bg-orange-100 text-orange-800"
}

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [copiedForm, setCopiedForm] = useState<number | null>(null)

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || form.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCopyCode = async (formId: number, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedForm(formId)
      setTimeout(() => setCopiedForm(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Формы подписки</h1>
          <p className="text-gray-600">Создавайте и управляйте формами для сбора подписчиков</p>
        </div>
        <Link href="/dashboard/forms/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Создать форму
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего форм</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forms.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> за последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные формы</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {forms.filter(f => f.status === "Активна").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((forms.filter(f => f.status === "Активна").length / forms.length) * 100)}% от общего числа
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего подписчиков</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {forms.reduce((sum, form) => sum + form.subscribers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Собрано через формы
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средняя конверсия</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(forms.reduce((sum, form) => sum + form.conversionRate, 0) / forms.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              По всем формам
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск форм..."
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
          <option value="Активна">Активные</option>
          <option value="Неактивна">Неактивные</option>
          <option value="Черновик">Черновики</option>
        </select>
      </div>

      {/* Forms Grid */}
      <div className="grid gap-6">
        {filteredForms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{form.name}</CardTitle>
                    <CardDescription>
                      Создано {new Date(form.createdAt).toLocaleDateString('ru-RU')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[form.type as keyof typeof typeColors]}`}>
                    {form.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[form.status as keyof typeof statusColors]}`}>
                    {form.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{form.subscribers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Подписчиков</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{form.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Конверсия</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {new Date(form.lastUsed).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="text-sm text-gray-600">Последнее использование</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((new Date().getTime() - new Date(form.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-gray-600">Дней активна</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Последнее использование: {new Date(form.lastUsed).toLocaleDateString('ru-RU')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link href={form.url} target="_blank">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Просмотр
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCopyCode(form.id, form.embedCode)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedForm === form.id ? "Скопировано!" : "Код"}
                  </Button>
                  <Link href={`/dashboard/forms/${form.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Редактировать
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Настройки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Формы не найдены</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Попробуйте изменить параметры поиска" 
                : "Создайте свою первую форму подписки"
              }
            </p>
            <Link href="/dashboard/forms/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Создать форму
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
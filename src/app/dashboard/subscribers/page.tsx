'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Calendar,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye
} from "lucide-react"

// Моковые данные подписчиков
const subscribers = [
  {
    id: 1,
    email: "ivan@example.com",
    firstName: "Иван",
    lastName: "Петров",
    status: "Активный",
    subscribedAt: "2024-01-15",
    lastEmail: "2024-01-20",
    opens: 12,
    clicks: 3,
    tags: ["VIP", "Новые"]
  },
  {
    id: 2,
    email: "maria@example.com",
    firstName: "Мария",
    lastName: "Сидорова",
    status: "Активный",
    subscribedAt: "2024-01-10",
    lastEmail: "2024-01-20",
    opens: 8,
    clicks: 2,
    tags: ["Активные"]
  },
  {
    id: 3,
    email: "alex@example.com",
    firstName: "Алексей",
    lastName: "Козлов",
    status: "Неактивный",
    subscribedAt: "2023-12-20",
    lastEmail: "2024-01-05",
    opens: 2,
    clicks: 0,
    tags: ["Неактивные"]
  },
  {
    id: 4,
    email: "anna@example.com",
    firstName: "Анна",
    lastName: "Иванова",
    status: "Активный",
    subscribedAt: "2024-01-18",
    lastEmail: "2024-01-20",
    opens: 5,
    clicks: 1,
    tags: ["Новые"]
  }
]

const statusColors = {
  "Активный": "bg-green-100 text-green-800",
  "Неактивный": "bg-gray-100 text-gray-800",
  "Отписался": "bg-red-100 text-red-800"
}

export default function SubscribersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([])

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id))
    }
  }

  const handleSelectSubscriber = (id: number) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Подписчики</h1>
          <p className="text-gray-600">Управляйте вашими подписчиками и списками</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Импорт
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить подписчика
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего подписчиков</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> за последние 30 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-muted-foreground">
              92.7% от общего числа
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Новые</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              За последние 7 дней
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Отписались</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91</div>
            <p className="text-xs text-muted-foreground">
              7.3% от общего числа
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Поиск по email или имени..."
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
          <option value="Активный">Активные</option>
          <option value="Неактивный">Неактивные</option>
          <option value="Отписался">Отписались</option>
        </select>
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Список подписчиков</CardTitle>
              <CardDescription>
                {filteredSubscribers.length} из {subscribers.length} подписчиков
              </CardDescription>
            </div>
            {selectedSubscribers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Выбрано {selectedSubscribers.length}
                </span>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Удалить
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.length === filteredSubscribers.length}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Имя</th>
                  <th className="text-left py-3 px-4 font-medium">Статус</th>
                  <th className="text-left py-3 px-4 font-medium">Подписка</th>
                  <th className="text-left py-3 px-4 font-medium">Активность</th>
                  <th className="text-left py-3 px-4 font-medium">Теги</th>
                  <th className="text-left py-3 px-4 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onChange={() => handleSelectSubscriber(subscriber.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{subscriber.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        {subscriber.firstName} {subscriber.lastName}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[subscriber.status as keyof typeof statusColors]}`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(subscriber.subscribedAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{subscriber.opens} открытий</div>
                        <div className="text-gray-600">{subscriber.clicks} кликов</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {subscriber.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Подписчики не найдены</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Попробуйте изменить параметры поиска" 
                  : "Добавьте первого подписчика"
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить подписчика
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
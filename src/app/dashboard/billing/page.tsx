'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Calendar,
  Download,
  Receipt,
  Settings,
  Zap,
  Users,
  Mail,
  BarChart3
} from "lucide-react"

const plans = [
  {
    id: "free",
    name: "Бесплатный",
    price: 0,
    period: "навсегда",
    features: [
      "1,000 подписчиков",
      "5,000 email в месяц",
      "Базовые шаблоны",
      "Email поддержка",
      "Базовая аналитика"
    ],
    limitations: [
      "Нет автоматизации",
      "Нет API доступа",
      "Ограниченные шаблоны"
    ],
    current: true
  },
  {
    id: "pro",
    name: "Pro",
    price: 2990,
    period: "в месяц",
    features: [
      "10,000 подписчиков",
      "100,000 email в месяц",
      "Все шаблоны",
      "Автоматизация",
      "Приоритетная поддержка",
      "Расширенная аналитика",
      "API доступ"
    ],
    limitations: [],
    current: false,
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9990,
    period: "в месяц",
    features: [
      "Неограниченно подписчиков",
      "Неограниченно email",
      "API доступ",
      "Персональный менеджер",
      "Индивидуальная настройка",
      "Белый лейбл",
      "SLA гарантии"
    ],
    limitations: [],
    current: false
  }
]

const billingHistory = [
  {
    id: 1,
    date: "2024-01-20",
    amount: 2990,
    status: "Оплачено",
    description: "Pro план - Январь 2024",
    invoice: "INV-2024-001"
  },
  {
    id: 2,
    date: "2023-12-20",
    amount: 2990,
    status: "Оплачено",
    description: "Pro план - Декабрь 2023",
    invoice: "INV-2023-012"
  },
  {
    id: 3,
    date: "2023-11-20",
    amount: 2990,
    status: "Оплачено",
    description: "Pro план - Ноябрь 2023",
    invoice: "INV-2023-011"
  }
]

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Тарифы и оплата</h1>
        <p className="text-gray-600">Управляйте подпиской и платежами</p>
      </div>

      {/* Current Plan */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Текущий план</CardTitle>
          <CardDescription>Информация о вашей активной подписке</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pro план</h3>
                <p className="text-gray-600">₽2,990 в месяц</p>
                <p className="text-sm text-gray-500">Следующее списание: 20 февраля 2024</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Использование</div>
              <div className="text-lg font-semibold">8,456 / 10,000 подписчиков</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84.56%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Выберите план</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${plan.current ? 'bg-blue-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  ₽{plan.price.toLocaleString()}
                </div>
                <CardDescription>{plan.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    {plan.current ? (
                      <Button className="w-full" variant="outline" disabled>
                        Текущий план
                      </Button>
                    ) : (
                      <Button className="w-full">
                        {plan.price === 0 ? "Начать бесплатно" : "Выбрать план"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Подписчики</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,456 / 10,000</div>
            <p className="text-xs text-muted-foreground">
              84.6% от лимита
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84.6%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email в месяц</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,230 / 100,000</div>
            <p className="text-xs text-muted-foreground">
              45.2% от лимита
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Автоматизация</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 / ∞</div>
            <p className="text-xs text-muted-foreground">
              Активные последовательности
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>История платежей</CardTitle>
              <CardDescription>Ваши последние счета и платежи</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.description}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString('ru-RU')} • {item.invoice}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₽{item.amount.toLocaleString()}</div>
                  <div className="text-sm text-green-600">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Способ оплаты</CardTitle>
          <CardDescription>Управляйте способами оплаты</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">•••• •••• •••• 4242</h4>
                <p className="text-sm text-gray-600">Истекает 12/25</p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Изменить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
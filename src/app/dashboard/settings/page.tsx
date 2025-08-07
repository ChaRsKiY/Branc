'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  User, 
  Mail, 
  Shield, 
  Bell,
  Globe,
  Save,
  Trash2,
  Download,
  Upload
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    company: "ООО Рога и Копыта",
    website: "https://example.com",
    phone: "+7 (999) 123-45-67"
  })

  const [emailSettings, setEmailSettings] = useState({
    fromName: "EmailCampaign",
    fromEmail: "noreply@emailcampaign.com",
    replyTo: "support@emailcampaign.com",
    footerText: "© 2024 EmailCampaign. Все права защищены.",
    unsubscribeText: "Отписаться от рассылки"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    campaignCompleted: true,
    newSubscribers: true,
    weeklyReports: false,
    monthlyReports: true
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Здесь будет логика сохранения настроек
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const tabs = [
    { id: "profile", name: "Профиль", icon: User },
    { id: "email", name: "Email настройки", icon: Mail },
    { id: "notifications", name: "Уведомления", icon: Bell },
    { id: "security", name: "Безопасность", icon: Shield },
    { id: "integrations", name: "Интеграции", icon: Globe }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-600">Управляйте настройками вашего аккаунта</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{tab.name}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
                <CardDescription>Основная информация о вашем аккаунте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия
                    </label>
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Ваша фамилия"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Компания
                  </label>
                  <Input
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Название компании"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Веб-сайт
                    </label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('profile')}
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Settings */}
          {activeTab === "email" && (
            <Card>
              <CardHeader>
                <CardTitle>Email настройки</CardTitle>
                <CardDescription>Настройки для отправки email кампаний</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя отправителя
                    </label>
                    <Input
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email отправителя
                    </label>
                    <Input
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                      placeholder="noreply@yourdomain.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email для ответов
                  </label>
                  <Input
                    value={emailSettings.replyTo}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, replyTo: e.target.value }))}
                    placeholder="support@yourdomain.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текст в футере
                  </label>
                  <Textarea
                    value={emailSettings.footerText}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, footerText: e.target.value }))}
                    placeholder="Текст, который будет отображаться в футере всех писем"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текст отписки
                  </label>
                  <Input
                    value={emailSettings.unsubscribeText}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, unsubscribeText: e.target.value }))}
                    placeholder="Отписаться от рассылки"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('email')}
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>Настройте уведомления о важных событиях</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email уведомления</h4>
                      <p className="text-sm text-gray-600">Получать уведомления на email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ 
                        ...prev, 
                        emailNotifications: e.target.checked 
                      }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Завершение кампании</h4>
                      <p className="text-sm text-gray-600">Уведомления о завершении отправки кампаний</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.campaignCompleted}
                      onChange={(e) => setNotificationSettings(prev => ({ 
                        ...prev, 
                        campaignCompleted: e.target.checked 
                      }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Новые подписчики</h4>
                      <p className="text-sm text-gray-600">Уведомления о новых подписчиках</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.newSubscribers}
                      onChange={(e) => setNotificationSettings(prev => ({ 
                        ...prev, 
                        newSubscribers: e.target.checked 
                      }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Еженедельные отчеты</h4>
                      <p className="text-sm text-gray-600">Получать отчеты раз в неделю</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings(prev => ({ 
                        ...prev, 
                        weeklyReports: e.target.checked 
                      }))}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Ежемесячные отчеты</h4>
                      <p className="text-sm text-gray-600">Получать отчеты раз в месяц</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.monthlyReports}
                      onChange={(e) => setNotificationSettings(prev => ({ 
                        ...prev, 
                        monthlyReports: e.target.checked 
                      }))}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleSave('notifications')}
                    disabled={isLoading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>Настройки безопасности вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Двухфакторная аутентификация</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Добавьте дополнительный уровень защиты к вашему аккаунту
                    </p>
                    <Button variant="outline" size="sm">
                      Настроить 2FA
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Смена пароля</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Регулярно меняйте пароль для обеспечения безопасности
                    </p>
                    <Button variant="outline" size="sm">
                      Сменить пароль
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Активные сессии</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Просмотрите и управляйте активными сессиями
                    </p>
                    <Button variant="outline" size="sm">
                      Просмотреть сессии
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations Settings */}
          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Интеграции</CardTitle>
                <CardDescription>Подключите внешние сервисы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-gray-600">Обработка платежей</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Подключить
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Google Analytics</h4>
                        <p className="text-sm text-gray-600">Отслеживание аналитики</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Подключить
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Zapier</h4>
                        <p className="text-sm text-gray-600">Автоматизация процессов</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Подключить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
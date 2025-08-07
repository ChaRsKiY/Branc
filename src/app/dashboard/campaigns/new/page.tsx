'use client'

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Send, Eye, Settings } from "lucide-react"
import Link from "next/link"

export default function NewCampaignPage() {
  const [campaignData, setCampaignData] = useState({
    name: "",
    subject: "",
    fromName: "",
    fromEmail: "",
    previewText: ""
  })
  const [activeTab, setActiveTab] = useState("design")
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Инициализация GrapesJS редактора
    if (editorRef.current && typeof window !== 'undefined') {
      import('grapesjs').then(({ default: grapesjs }) => {
        const editor = grapesjs.init({
          container: editorRef.current!,
          height: '600px',
          storageManager: false,
          panels: {
            defaults: [
              {
                id: 'basic-actions',
                el: '.panel__basic-actions',
                buttons: [
                  {
                    id: 'visibility',
                    active: true,
                    className: 'btn-toggle-borders',
                    label: '<u>B</u>',
                    command: 'sw-visibility',
                  },
                ],
              },
            ],
          },
          deviceManager: {
            devices: [
              {
                name: 'Desktop',
                width: '',
              },
              {
                name: 'Tablet',
                width: '768px',
                widthMedia: '992px',
              },
              {
                name: 'Mobile',
                width: '320px',
                widthMedia: '480px',
              },
            ],
          },
          plugins: ['gjs-preset-webpage'],
          pluginsOpts: {
            'gjs-preset-webpage': {}
          }
        })

        // Добавляем базовый HTML шаблон
        editor.setComponents(`
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
              <h1 style="color: #333; margin: 0;">Заголовок письма</h1>
            </div>
            <div style="padding: 20px;">
              <p style="color: #666; line-height: 1.6;">
                Здесь будет содержимое вашего письма. Вы можете редактировать этот текст, добавлять изображения, кнопки и другие элементы.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Кнопка действия
                </a>
              </div>
            </div>
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
              <p>© 2024 EmailCampaign. Все права защищены.</p>
              <p><a href="#" style="color: #007bff;">Отписаться</a> | <a href="#" style="color: #007bff;">Настройки</a></p>
            </div>
          </div>
        `)
      })
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к кампаниям
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Новая кампания</h1>
            <p className="text-gray-600">Создайте и отправьте email кампанию</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Сохранить черновик
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Отправить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Настройки кампании</CardTitle>
              <CardDescription>Основная информация о кампании</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название кампании
                </label>
                <Input
                  placeholder="Введите название кампании"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тема письма
                </label>
                <Input
                  placeholder="Тема письма"
                  value={campaignData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя отправителя
                </label>
                <Input
                  placeholder="Ваше имя"
                  value={campaignData.fromName}
                  onChange={(e) => handleInputChange('fromName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email отправителя
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={campaignData.fromEmail}
                  onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текст предпросмотра
                </label>
                <Textarea
                  placeholder="Краткое описание письма для предпросмотра"
                  value={campaignData.previewText}
                  onChange={(e) => handleInputChange('previewText', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Audience Selection */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Аудитория</CardTitle>
              <CardDescription>Выберите получателей кампании</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Список подписчиков
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Все подписчики (1,247)</option>
                    <option>Новые подписчики (23)</option>
                    <option>Активные подписчики (856)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сегменты
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">VIP клиенты</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Новые пользователи</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Неактивные</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Редактор письма</CardTitle>
                  <CardDescription>Создайте красивое email письмо</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Предпросмотр
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Настройки
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        activeTab === 'design' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('design')}
                    >
                      Дизайн
                    </button>
                    <button
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        activeTab === 'html' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab('html')}
                    >
                      HTML
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  {activeTab === 'design' ? (
                    <div 
                      ref={editorRef}
                      className="min-h-[600px] border-2 border-dashed border-gray-300 rounded-lg"
                    />
                  ) : (
                    <Textarea
                      placeholder="Введите HTML код письма..."
                      className="min-h-[600px] font-mono text-sm"
                      defaultValue={`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Campaign</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <h1 style="color: #333; margin: 0;">Заголовок письма</h1>
        </div>
        <div style="padding: 20px;">
            <p style="color: #666; line-height: 1.6;">
                Здесь будет содержимое вашего письма.
            </p>
        </div>
    </div>
</body>
</html>`}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
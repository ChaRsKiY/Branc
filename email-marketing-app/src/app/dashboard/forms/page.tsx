import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";

export default function FormsPage() {
  // В реальном проекте эти данные будут загружаться из базы данных
  const forms = [
    {
      id: "1",
      name: "Подписка на новости",
      slug: "newsletter-signup",
      description: "Основная форма подписки на рассылку новостей",
      subscribers: 847,
      isActive: true,
      createdAt: "2024-01-15",
      views: 12456
    },
    {
      id: "2", 
      name: "Регистрация на вебинар",
      slug: "webinar-registration",
      description: "Форма для регистрации на еженедельные вебинары",
      subscribers: 234,
      isActive: true,
      createdAt: "2024-01-20",
      views: 3421
    },
    {
      id: "3",
      name: "Скачать гайд",
      slug: "download-guide",
      description: "Форма для скачивания бесплатного руководства",
      subscribers: 156,
      isActive: false,
      createdAt: "2024-01-10",
      views: 1876
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Формы подписки</h2>
          <p className="text-muted-foreground">
            Создавайте и управляйте формами для сбора подписчиков
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/forms/new">
            <Plus className="h-4 w-4 mr-2" />
            Создать форму
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего форм
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forms.length}</div>
            <p className="text-xs text-muted-foreground">
              {forms.filter(f => f.isActive).length} активных
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Общие просмотры
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {forms.reduce((sum, form) => sum + form.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +18% с прошлого месяца
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средняя конверсия
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% улучшение
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Forms list */}
      <div className="space-y-4">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="flex items-center">
                      {form.name}
                      {!form.isActive && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Неактивна
                        </span>
                      )}
                      {form.isActive && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Активна
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {form.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/f/${form.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Открыть
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/forms/${form.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Подписчики</p>
                  <p className="text-2xl font-bold">{form.subscribers}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Просмотры</p>
                  <p className="text-2xl font-bold">{form.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Конверсия</p>
                  <p className="text-2xl font-bold">
                    {((form.subscribers / form.views) * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">URL форм</p>
                  <p className="text-sm text-blue-600 truncate">
                    /f/{form.slug}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Создана: {new Date(form.createdAt).toLocaleDateString('ru-RU')}</span>
                  <div className="flex items-center space-x-4">
                    <Link href={`/dashboard/forms/${form.id}/analytics`} className="hover:text-foreground">
                      Аналитика
                    </Link>
                    <Link href={`/dashboard/forms/${form.id}/settings`} className="hover:text-foreground">
                      Настройки
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {forms.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Нет форм</h3>
            <p className="text-muted-foreground text-center mb-4">
              Создайте вашу первую форму подписки для начала сбора email адресов
            </p>
            <Button asChild>
              <Link href="/dashboard/forms/new">
                Создать первую форму
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
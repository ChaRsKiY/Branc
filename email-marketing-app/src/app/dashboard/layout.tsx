import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  FileText, 
  Settings, 
  Plus,
  CreditCard
} from "lucide-react";

const sidebarItems = [
  {
    href: "/dashboard",
    label: "Обзор",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/forms",
    label: "Формы",
    icon: FileText,
  },
  {
    href: "/dashboard/subscribers",
    label: "Подписчики",
    icon: Users,
  },
  {
    href: "/dashboard/campaigns",
    label: "Кампании",
    icon: Mail,
  },
  {
    href: "/dashboard/templates",
    label: "Шаблоны",
    icon: FileText,
  },
  {
    href: "/dashboard/billing",
    label: "Подписка",
    icon: CreditCard,
  },
  {
    href: "/dashboard/settings",
    label: "Настройки",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Mail className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">EmailFlow</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Панель управления
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild size="sm">
                <Link href="/dashboard/forms/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать форму
                </Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
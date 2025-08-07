'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  BarChart3, 
  Settings, 
  Target,
  FileText,
  Zap,
  CreditCard,
  LogOut
} from "lucide-react"
import { useUser, SignOutButton } from "@clerk/nextjs"

const navigation = [
  { name: 'Дашборд', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Кампании', href: '/dashboard/campaigns', icon: Mail },
  { name: 'Подписчики', href: '/dashboard/subscribers', icon: Users },
  { name: 'Формы', href: '/dashboard/forms', icon: Target },
  { name: 'Шаблоны', href: '/dashboard/templates', icon: FileText },
  { name: 'Автоматизация', href: '/dashboard/automation', icon: Zap },
  { name: 'Аналитика', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Тарифы', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Настройки', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">EmailCampaign</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-blue-50 text-blue-700 border-blue-200"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <SignOutButton>
          <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-3 h-4 w-4" />
            Выйти
          </Button>
        </SignOutButton>
      </div>
    </div>
  )
}
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

// Моковые данные подписчиков
let subscribers = [
  {
    id: 1,
    userId: 'user_1',
    email: "ivan@example.com",
    firstName: "Иван",
    lastName: "Петров",
    status: "Активный",
    subscribedAt: "2024-01-15T10:30:00Z",
    lastEmail: "2024-01-20T10:30:00Z",
    opens: 12,
    clicks: 3,
    tags: ["VIP", "Новые"],
    source: "form_1",
    metadata: {
      location: "Москва",
      company: "ООО Рога и Копыта"
    }
  },
  {
    id: 2,
    userId: 'user_1',
    email: "maria@example.com",
    firstName: "Мария",
    lastName: "Сидорова",
    status: "Активный",
    subscribedAt: "2024-01-10T14:00:00Z",
    lastEmail: "2024-01-20T10:30:00Z",
    opens: 8,
    clicks: 2,
    tags: ["Активные"],
    source: "form_2",
    metadata: {
      location: "Санкт-Петербург",
      company: "ИП Сидорова"
    }
  },
  {
    id: 3,
    userId: 'user_1',
    email: "alex@example.com",
    firstName: "Алексей",
    lastName: "Козлов",
    status: "Неактивный",
    subscribedAt: "2023-12-20T09:15:00Z",
    lastEmail: "2024-01-05T10:30:00Z",
    opens: 2,
    clicks: 0,
    tags: ["Неактивные"],
    source: "form_1",
    metadata: {
      location: "Екатеринбург",
      company: "ООО Козлов"
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    let filteredSubscribers = subscribers.filter(subscriber => subscriber.userId === userId)

    // Фильтрация по статусу
    if (status && status !== 'all') {
      filteredSubscribers = filteredSubscribers.filter(subscriber => subscriber.status === status)
    }

    // Поиск
    if (search) {
      filteredSubscribers = filteredSubscribers.filter(subscriber => 
        subscriber.email.toLowerCase().includes(search.toLowerCase()) ||
        subscriber.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        subscriber.lastName?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Пагинация
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex)

    return NextResponse.json({
      subscribers: paginatedSubscribers,
      pagination: {
        page,
        limit,
        total: filteredSubscribers.length,
        totalPages: Math.ceil(filteredSubscribers.length / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Проверка на существующий email
    const existingSubscriber = subscribers.find(
      sub => sub.userId === userId && sub.email === body.email
    )
    
    if (existingSubscriber) {
      return NextResponse.json({ error: 'Subscriber already exists' }, { status: 400 })
    }

    const newSubscriber = {
      id: subscribers.length + 1,
      userId,
      email: body.email,
      firstName: body.firstName || null,
      lastName: body.lastName || null,
      status: "Активный",
      subscribedAt: new Date().toISOString(),
      lastEmail: null,
      opens: 0,
      clicks: 0,
      tags: body.tags || [],
      source: body.source || "manual",
      metadata: body.metadata || {}
    }

    subscribers.push(newSubscriber)
    
    return NextResponse.json(newSubscriber, { status: 201 })
  } catch (error) {
    console.error('Error creating subscriber:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const subscriberIndex = subscribers.findIndex(
      sub => sub.id === body.id && sub.userId === userId
    )
    
    if (subscriberIndex === -1) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })
    }

    subscribers[subscriberIndex] = {
      ...subscribers[subscriberIndex],
      ...body,
      userId // Защита от изменения userId
    }
    
    return NextResponse.json(subscribers[subscriberIndex])
  } catch (error) {
    console.error('Error updating subscriber:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
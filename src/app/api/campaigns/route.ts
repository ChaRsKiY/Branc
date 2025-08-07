import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

// Моковые данные кампаний (в реальном приложении это будет база данных)
let campaigns = [
  {
    id: 1,
    userId: 'user_1',
    name: "Приветственное письмо",
    subject: "Добро пожаловать в EmailCampaign!",
    status: "Отправлено",
    sent: 1247,
    opened: 305,
    clicked: 40,
    openRate: 24.5,
    clickRate: 3.2,
    fromName: "EmailCampaign",
    fromEmail: "noreply@emailcampaign.com",
    previewText: "Добро пожаловать в наш сервис!",
    htmlContent: "<!DOCTYPE html><html><body><h1>Добро пожаловать!</h1></body></html>",
    createdAt: "2024-01-15T10:30:00Z",
    sentAt: "2024-01-15T10:30:00Z",
    audience: {
      type: "all",
      segmentIds: []
    }
  },
  {
    id: 2,
    userId: 'user_1',
    name: "Новости недели",
    subject: "Что нового в EmailCampaign",
    status: "Черновик",
    sent: 0,
    opened: 0,
    clicked: 0,
    openRate: 0,
    clickRate: 0,
    fromName: "EmailCampaign",
    fromEmail: "noreply@emailcampaign.com",
    previewText: "Узнайте о последних обновлениях",
    htmlContent: "<!DOCTYPE html><html><body><h1>Новости недели</h1></body></html>",
    createdAt: "2024-01-20T14:00:00Z",
    sentAt: null,
    audience: {
      type: "segment",
      segmentIds: [1, 2]
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Фильтрация кампаний по пользователю
    const userCampaigns = campaigns.filter(campaign => campaign.userId === userId)
    
    return NextResponse.json(userCampaigns)
  } catch (error) {
    console.error('Error fetching campaigns:', error)
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
    
    const newCampaign = {
      id: campaigns.length + 1,
      userId,
      name: body.name,
      subject: body.subject,
      status: "Черновик",
      sent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      fromName: body.fromName,
      fromEmail: body.fromEmail,
      previewText: body.previewText,
      htmlContent: body.htmlContent || "",
      createdAt: new Date().toISOString(),
      sentAt: null,
      audience: body.audience || {
        type: "all",
        segmentIds: []
      }
    }

    campaigns.push(newCampaign)
    
    return NextResponse.json(newCampaign, { status: 201 })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
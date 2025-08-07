import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import nodemailer from 'nodemailer'

// Конфигурация транспорта для отправки email
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { campaignId, to, subject, html, text } = body

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Настройки email
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@emailcampaign.com',
      to: to,
      subject: subject,
      html: html,
      text: text || html.replace(/<[^>]*>/g, ''), // Удаляем HTML теги для текстовой версии
      headers: {
        'X-Campaign-ID': campaignId,
        'X-User-ID': userId,
        'List-Unsubscribe': `<mailto:unsubscribe@emailcampaign.com?subject=unsubscribe-${userId}>`,
      }
    }

    // Отправка email
    const info = await transporter.sendMail(mailOptions)

    // В реальном приложении здесь нужно сохранить информацию об отправке в базу данных
    console.log('Email sent:', info.messageId)

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Функция для массовой отправки кампании
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { campaignId, subscribers, campaignData } = body

    if (!campaignId || !subscribers || !campaignData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[]
    }

    // Отправка email каждому подписчику
    for (const subscriber of subscribers) {
      try {
        // Персонализация контента
        let personalizedHtml = campaignData.htmlContent
        let personalizedSubject = campaignData.subject

        // Замена плейсхолдеров
        personalizedHtml = personalizedHtml
          .replace(/\{\{firstName\}\}/g, subscriber.firstName || '')
          .replace(/\{\{lastName\}\}/g, subscriber.lastName || '')
          .replace(/\{\{email\}\}/g, subscriber.email)
          .replace(/\{\{unsubscribeUrl\}\}/g, `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}&token=${encodeURIComponent(subscriber.id.toString())}`)

        personalizedSubject = personalizedSubject
          .replace(/\{\{firstName\}\}/g, subscriber.firstName || '')
          .replace(/\{\{lastName\}\}/g, subscriber.lastName || '')

        const mailOptions = {
          from: `${campaignData.fromName} <${campaignData.fromEmail}>`,
          to: subscriber.email,
          subject: personalizedSubject,
          html: personalizedHtml,
          text: personalizedHtml.replace(/<[^>]*>/g, ''),
          headers: {
            'X-Campaign-ID': campaignId,
            'X-Subscriber-ID': subscriber.id,
            'X-User-ID': userId,
            'List-Unsubscribe': `<mailto:unsubscribe@emailcampaign.com?subject=unsubscribe-${subscriber.id}>`,
          }
        }

        await transporter.sendMail(mailOptions)
        results.sent++

        // Небольшая задержка между отправками
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        results.failed++
        results.errors.push(`Failed to send to ${subscriber.email}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Campaign sent: ${results.sent} successful, ${results.failed} failed`
    })

  } catch (error) {
    console.error('Error sending campaign:', error)
    return NextResponse.json({ 
      error: 'Failed to send campaign',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail, leadNotificationEmail, leadConfirmationEmail } from '@/lib/brevo'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  // Save lead to DB
  const lead = await prisma.lead.create({
    data: { name, email, company: company || null, message },
  })

  // Fire-and-forget emails (don't block the response)
  const notifyTo = process.env.BREVO_NOTIFY_TO || 'autonordai@gmail.com'

  Promise.allSettled([
    // Notify the admin
    sendEmail({
      to: [{ email: notifyTo, name: 'AutoNord.ai' }],
      subject: `New lead from ${name}${company ? ` (${company})` : ''}`,
      htmlContent: leadNotificationEmail({ name, email, company, message }),
      replyTo: { email, name },
    }),
    // Confirm to the client
    sendEmail({
      to: [{ email, name }],
      subject: 'We got your message — AutoNord.ai',
      htmlContent: leadConfirmationEmail(name),
    }),
  ]).catch(console.error)

  return NextResponse.json({ success: true, id: lead.id })
}

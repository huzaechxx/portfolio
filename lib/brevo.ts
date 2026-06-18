const BREVO_API = 'https://api.brevo.com/v3/smtp/email'

interface SendEmailParams {
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
  replyTo?: { email: string; name?: string }
}

export async function sendEmail(params: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey || apiKey === 'your-brevo-api-key-here') {
    console.warn('[Brevo] API key not configured — skipping email send')
    return
  }

  const body = {
    sender: {
      email: process.env.BREVO_FROM_EMAIL || 'hello@rdexa.tech',
      name: process.env.BREVO_FROM_NAME || 'Rdexa.tech',
    },
    to: params.to,
    subject: params.subject,
    htmlContent: params.htmlContent,
    ...(params.replyTo && { replyTo: params.replyTo }),
  }

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[Brevo] Failed to send email:', error)
  }
}

export function leadNotificationEmail(lead: {
  name: string
  email: string
  company?: string | null
  message: string
}) {
  return `
    <div style="font-family: monospace; background: #0a0a0a; color: #f5f5f5; padding: 32px; border-radius: 4px; max-width: 600px;">
      <div style="border-bottom: 1px solid #1f1f1f; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="color: #ff5500; font-size: 12px; text-transform: uppercase; letter-spacing: 4px;">New Lead</span>
        <h2 style="color: #ffffff; margin: 8px 0 0; font-size: 22px;">Rdexa.tech Contact Form</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; width: 100px;">Name</td>
          <td style="padding: 10px 0; color: #f5f5f5;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Email</td>
          <td style="padding: 10px 0; color: #ff5500;"><a href="mailto:${lead.email}" style="color: #ff5500;">${lead.email}</a></td>
        </tr>
        ${lead.company ? `<tr><td style="padding: 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Company</td><td style="padding: 10px 0; color: #f5f5f5;">${lead.company}</td></tr>` : ''}
        <tr>
          <td style="padding: 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;">Message</td>
          <td style="padding: 10px 0; color: #f5f5f5; line-height: 1.6;">${lead.message.replace(/\n/g, '<br>')}</td>
        </tr>
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1f1f1f;">
        <a href="mailto:${lead.email}?subject=Re: Your Rdexa.tech inquiry" style="background: #ff5500; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 13px; border-radius: 2px;">
          Reply to ${lead.name} →
        </a>
      </div>
    </div>
  `
}

export function leadConfirmationEmail(name: string) {
  return `
    <div style="font-family: monospace; background: #0a0a0a; color: #f5f5f5; padding: 32px; border-radius: 4px; max-width: 600px;">
      <div style="border-bottom: 1px solid #1f1f1f; padding-bottom: 16px; margin-bottom: 24px;">
        <span style="color: #ff5500; font-size: 12px; text-transform: uppercase; letter-spacing: 4px;">Rdexa.tech</span>
        <h2 style="color: #ffffff; margin: 8px 0 0; font-size: 22px;">We got your message, ${name}.</h2>
      </div>
      <p style="color: #888888; line-height: 1.7; margin: 0 0 16px;">
        Thanks for reaching out. We'll review your message and get back to you within 24 hours to schedule your free automation audit.
      </p>
      <p style="color: #888888; line-height: 1.7; margin: 0 0 24px;">
        In the meantime, feel free to browse our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/case-studies" style="color: #ff5500;">case studies</a> to see what we've built for other businesses.
      </p>
      <p style="color: #444444; font-size: 12px; margin: 0;">— The Rdexa.tech Team</p>
    </div>
  `
}

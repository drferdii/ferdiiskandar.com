import 'server-only'
import { Resend } from 'resend'

import type { AbbyLeadPayload } from '@/types/abby-lead'

export type NotificationResult = { status: 'sent'; messageId: string } | { status: 'skipped' }

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char] ?? char)
}

export async function notifyLead(leadId: string, payload: AbbyLeadPayload): Promise<NotificationResult> {
  const mode = process.env.ABBY_LEAD_MODE ?? 'database_email'
  if (mode === 'none' || mode === 'database') return { status: 'skipped' }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.ABBY_LEAD_FROM_EMAIL?.trim()
  const to = process.env.ABBY_LEAD_TO_EMAIL?.trim()
  if (!apiKey || !from || !to) throw new Error('Resend configuration is incomplete.')

  const resend = new Resend(apiKey)
  const subject = `Abby lead inquiry — ${payload.purpose}`
  const text = [
    `Lead ID: ${leadId}`,
    `Purpose: ${payload.purpose}`,
    `Created: ${payload.createdAt}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization ?? '-'}`,
    `Visitor mode: ${payload.visitorMode ?? '-'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const html = `<main><h1>Abby lead inquiry</h1><p><strong>Lead ID:</strong> ${escapeHtml(leadId)}</p><p><strong>Purpose:</strong> ${escapeHtml(payload.purpose)}</p><p><strong>Created:</strong> ${escapeHtml(payload.createdAt)}</p><p><strong>Name:</strong> ${escapeHtml(payload.name)}</p><p><strong>Email:</strong> ${escapeHtml(payload.email)}</p><p><strong>Organization:</strong> ${escapeHtml(payload.organization ?? '-')}</p><p><strong>Visitor mode:</strong> ${escapeHtml(payload.visitorMode ?? '-')}</p><h2>Message</h2><p>${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p></main>`

  const result = await resend.emails.send({ from, to, replyTo: payload.email, subject, text, html })
  if (result.error) throw new Error(result.error.message)
  return { status: 'sent', messageId: result.data?.id ?? 'unknown' }
}

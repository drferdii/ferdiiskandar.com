import 'server-only'
import crypto from 'node:crypto'
import postgres from 'postgres'

import type { AbbyLeadPayload } from '@/types/abby-lead'

export type LeadNotificationStatus = 'pending' | 'sent' | 'failed' | 'skipped'

export type StoredLead = {
  id: string
  idempotencyKey: string
  notificationStatus: LeadNotificationStatus
  createdAt: string
  duplicate: boolean
}

type LeadRow = {
  id: string
  idempotency_key: string
  notification_status: LeadNotificationStatus
  created_at: Date
}

let sqlClient: postgres.Sql | null = null

function getSql(): postgres.Sql {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) throw new Error('DATABASE_URL is required for Abby lead storage.')
  sqlClient ??= postgres(databaseUrl, {
    max: 3,
    ssl: process.env.DATABASE_SSL === 'false' ? false : 'require',
    idle_timeout: 20,
    connect_timeout: 10,
  })
  return sqlClient
}

export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex')
}

function retentionDate(): Date | null {
  const days = Number(process.env.ABBY_LEAD_RETENTION_DAYS ?? '365')
  if (!Number.isFinite(days) || days <= 0) return null
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

function toStored(row: LeadRow, duplicate: boolean): StoredLead {
  return {
    id: row.id,
    idempotencyKey: row.idempotency_key,
    notificationStatus: row.notification_status,
    createdAt: row.created_at.toISOString(),
    duplicate,
  }
}

export async function insertLead(payload: AbbyLeadPayload, idempotencyKey: string): Promise<StoredLead> {
  const sql = getSql()
  const emailHash = hashEmail(payload.email)
  const retentionDeleteAfter = retentionDate()
  const existing = await sql<LeadRow[]>`
    select id, idempotency_key, notification_status, created_at
    from abby_leads
    where idempotency_key = ${idempotencyKey}
    limit 1
  `
  if (existing[0]) return toStored(existing[0], true)

  const rows = await sql<LeadRow[]>`
    insert into abby_leads (
      idempotency_key, purpose, name, email, email_hash, organization, message,
      visitor_mode, conversation_summary, consent_at, retention_delete_after
    ) values (
      ${idempotencyKey}, ${payload.purpose}, ${payload.name}, ${payload.email}, ${emailHash},
      ${payload.organization ?? null}, ${payload.message}, ${payload.visitorMode ?? null},
      ${payload.conversationSummary ?? null}, ${payload.createdAt}, ${retentionDeleteAfter}
    )
    returning id, idempotency_key, notification_status, created_at
  `
  const row = rows[0]
  if (!row) throw new Error('Failed to insert Abby lead.')
  await sql`insert into abby_lead_events (lead_id, event_type) values (${row.id}, 'lead.accepted')`
  return toStored(row, false)
}

export async function updateLeadNotification(
  leadId: string,
  status: LeadNotificationStatus,
  messageId?: string,
  error?: string,
): Promise<void> {
  const sql = getSql()
  await sql.begin(async (tx) => {
    await tx`
      update abby_leads
      set notification_status = ${status},
          notification_message_id = ${messageId ?? null},
          notification_error = ${error ? error.slice(0, 500) : null},
          updated_at = now()
      where id = ${leadId}
    `
    await tx`
      insert into abby_lead_events (lead_id, event_type, event_detail)
      values (${leadId}, ${status === 'sent' ? 'lead.notification.sent' : status === 'failed' ? 'lead.notification.failed' : 'lead.notification.updated'}, ${tx.json({ status, messageId: messageId ?? null })})
    `
  })
}

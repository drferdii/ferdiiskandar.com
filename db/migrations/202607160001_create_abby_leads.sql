create extension if not exists pgcrypto;

create table if not exists abby_leads (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  purpose text not null,
  name text not null,
  email text not null,
  email_hash text not null,
  organization text,
  message text not null,
  visitor_mode text,
  conversation_summary text,
  consent_at timestamptz not null,
  status text not null default 'accepted',
  notification_status text not null default 'pending',
  notification_message_id text,
  notification_error text,
  retention_delete_after timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists abby_leads_created_at_idx on abby_leads (created_at desc);
create index if not exists abby_leads_email_hash_idx on abby_leads (email_hash);
create index if not exists abby_leads_notification_status_idx on abby_leads (notification_status);

create table if not exists abby_lead_events (
  id bigserial primary key,
  lead_id uuid not null references abby_leads(id) on delete cascade,
  event_type text not null,
  event_detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

# Abby Production Deployment Runbook

## Scope
Runbook ini mencakup rollout Abby selective retrieval dan lead capture PostgreSQL + Resend.

## Required environment
- `AI_PROVIDER=gemini` atau provider lain yang didukung.
- `GEMINI_API_KEY` / provider key sesuai `AI_PROVIDER`.
- `DATABASE_URL` dengan koneksi PostgreSQL terenkripsi.
- `DATABASE_SSL=true` untuk production.
- `ABBY_LEAD_MODE=database_email` untuk persistence + Resend.
- `RESEND_API_KEY`.
- `ABBY_LEAD_FROM_EMAIL` dari domain yang sudah diverifikasi di Resend.
- `ABBY_LEAD_TO_EMAIL` mailbox operasional.
- `ABBY_LEAD_RETENTION_DAYS` sesuai kebijakan retensi.

## Migration order
1. Backup database production.
2. Jalankan `db/migrations/202607160001_create_abby_leads.sql`.
3. Verifikasi tabel:
   - `abby_leads`
   - `abby_lead_events`
4. Deploy aplikasi.
5. Jalankan smoke test lead dengan mode `database` sebelum mengaktifkan `database_email`.
6. Aktifkan `database_email` setelah Resend domain verified.

## Rollout checklist
1. Deploy schema database.
2. Deploy aplikasi dengan selective retrieval.
3. Verifikasi `/api/abby` mengembalikan `X-Request-ID` dan log `abby.request.completed`.
4. Verifikasi prompt context size turun dan log menampilkan selected knowledge IDs.
5. Verifikasi lead valid tersimpan satu kali dengan idempotency key.
6. Verifikasi Resend message ID tersimpan saat notification sukses.
7. Verifikasi medical/private data ditolak sebelum persistence.

## Rollback
- Jika AI provider bermasalah: ubah `AI_PROVIDER` atau fallback model provider terkait.
- Jika Resend bermasalah: ubah `ABBY_LEAD_MODE=database` agar lead tetap tersimpan tanpa email.
- Jika database bermasalah: ubah `ABBY_LEAD_MODE=none` sementara dan tampilkan jalur kontak resmi di UI/operasional.
- Jangan drop tabel saat rollback aplikasi; data lead harus dipertahankan untuk audit.

## Operations
- Jangan logging raw email, nama, IP, pesan penuh, conversation summary, atau API key.
- Query lead kedaluwarsa hanya melalui job internal terkontrol berdasarkan `retention_delete_after`.
- Tidak ada endpoint publik untuk delete lead.

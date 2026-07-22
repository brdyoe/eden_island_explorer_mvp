# Eden Island Explorer Academy

Single-page mobile game for Tymofii's Eden Island quests.

## Cloud Sync Setup

The app works without Cloud Sync using local browser storage, manual sync codes and JSON backups.

To sync progress across devices on Vercel, create a Supabase table:

```sql
create table if not exists app_state (
  family_id text primary key,
  state_json jsonb not null,
  revision integer not null default 0,
  updated_at timestamptz not null default now()
);
```

Then add these Vercel environment variables:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-side-service-role-key
SUPABASE_STATE_TABLE=app_state
EDEN_SYNC_PIN=choose-a-private-adult-pin
```

The service-role key stays server-side in the Vercel Function. The browser must send the adult Cloud PIN to read or write progress.

## Safety Notes

- Do not store child photos in this MVP.
- Use one shared family code, for example `tymofii-eden`.
- Keep the Cloud PIN private to adults.
- If Cloud Sync is not configured, use `Copy Sync Code` or `Download Backup`.

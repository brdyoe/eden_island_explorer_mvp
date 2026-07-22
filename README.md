# Eden Island Explorer Academy

Single-page mobile game for Tymofii's Eden Island quests.

## Cloud Sync Setup

The app works without Cloud Sync using local browser storage, manual sync codes and JSON backups.

To sync progress across devices, install the Supabase integration in Vercel. The Free plan is enough for this app. Keep the database in Washington, D.C. when the Vercel Function uses its default `iad1` region.

Open Supabase Studio from Vercel, go to **SQL Editor**, create a new query, and run:

```sql
create table if not exists public.app_state (
  family_id text primary key,
  state_json jsonb not null,
  revision integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.app_state enable row level security;
revoke all on table public.app_state from anon, authenticated;
grant select, insert, update, delete on table public.app_state to service_role;
```

The Vercel integration automatically creates `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. In **Project Settings > Environment Variables**, verify those names exist, then add:

```text
SUPABASE_STATE_TABLE=app_state
EDEN_SYNC_PIN=choose-a-private-adult-pin
```

Apply the variables to Production (and Preview if preview deployments should sync), then redeploy. Environment-variable changes do not affect an already completed deployment.

`SUPABASE_SECRET_KEY` must stay server-side. Never rename it with a `NEXT_PUBLIC_` prefix or paste it into the browser. The browser sends only the adult Cloud PIN to the Vercel Function.

After redeploying:

1. Open the game on the device that already has the correct progress.
2. In **Adult Setup**, enter one family code, for example `tymofii-eden`.
3. Enter the exact value used for `EDEN_SYNC_PIN`.
4. Select **Connect Cloud**.
5. When the game says no cloud progress exists, approve saving this device to the cloud.
6. On another device, enter the same family code and PIN, select **Connect Cloud**, and approve loading the cloud progress.

## Safety Notes

- Do not store child photos in this MVP.
- Use one shared family code, for example `tymofii-eden`.
- Keep the Cloud PIN private to adults.
- If Cloud Sync is not configured, use `Copy Sync Code` or `Download Backup`.

## TODO

- Protect against accidental creation of a new family caused by a mistyped Family Code.
  Before provisioning a missing family, show the exact normalized code, summarize the
  local progress that will be uploaded, and require an explicit second confirmation.
  Provide a copyable saved Family Code so adults do not need to type it again on each
  device. A missing family must never be created silently or from an empty local state.

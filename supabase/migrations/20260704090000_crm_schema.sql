-- ============================================================
-- VDM Vize CRM — schema, RLS, reminder engine
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- staff profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff', -- 'admin' | 'staff'
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- leads (pipeline) ----------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  visa_type text,
  note text,
  source text not null default 'website',   -- website | whatsapp | phone | referral | manual
  status text not null default 'new',        -- new | contacted | quoted | in_process | won | lost
  assigned_to uuid references auth.users(id) on delete set null,
  lost_reason text
);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_idx on public.leads(created_at desc);

-- ---------- customers ----------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  notes text,
  lead_id uuid references public.leads(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null
);
create index if not exists customers_created_idx on public.customers(created_at desc);

-- ---------- visas (issue/expiry -> reminders) ----------
create table if not exists public.visas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  country text not null,
  visa_type text,
  issued_date date,
  valid_until date not null,
  status text not null default 'active',     -- active | expired | renewed
  notes text
);
create index if not exists visas_valid_idx on public.visas(valid_until);
create index if not exists visas_customer_idx on public.visas(customer_id);

-- ---------- reminders (generated from visas) ----------
create table if not exists public.visa_reminders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  visa_id uuid not null references public.visas(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  due_date date not null,                    -- valid_until - offset_days
  offset_days int not null,                  -- 30 | 7 | 1
  status text not null default 'pending',    -- pending | done | snoozed
  note text,
  unique (visa_id, offset_days)
);
create index if not exists reminders_due_idx on public.visa_reminders(due_date);
create index if not exists reminders_status_idx on public.visa_reminders(status);

-- ---------- activities (timeline / notes) ----------
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entity_type text not null,                 -- 'lead' | 'customer'
  entity_id uuid not null,
  author uuid references auth.users(id) on delete set null,
  kind text not null default 'note',         -- note | status_change | call | email | system
  body text not null
);
create index if not exists activities_entity_idx on public.activities(entity_type, entity_id, created_at desc);

-- ---------- updated_at ----------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists leads_touch on public.leads;
create trigger leads_touch before update on public.leads
  for each row execute function public.touch_updated_at();

-- ---------- reminder engine (idempotent) ----------
-- Ensures a reminder row exists for every active visa at 30/7/1 days before expiry.
-- Also flips past-due visas to 'expired'. Safe to run repeatedly (daily).
create or replace function public.generate_visa_reminders()
returns integer language plpgsql security definer set search_path = public as $$
declare inserted integer := 0;
begin
  update public.visas
    set status = 'expired'
    where valid_until < current_date and status = 'active';

  insert into public.visa_reminders (visa_id, customer_id, due_date, offset_days)
  select v.id, v.customer_id, (v.valid_until - o.d), o.d
  from public.visas v
  cross join (values (30), (7), (1)) as o(d)
  where v.valid_until is not null
    and v.status in ('active', 'expired')
  on conflict (visa_id, offset_days) do nothing;

  get diagnostics inserted = row_count;
  return inserted;
end; $$;

-- ============================================================
-- Row Level Security — staff-only (authenticated) full access.
-- Public website leads are inserted server-side via the service
-- role key, so no anon policy is needed (leads stay private).
-- ============================================================
alter table public.profiles       enable row level security;
alter table public.leads          enable row level security;
alter table public.customers      enable row level security;
alter table public.visas          enable row level security;
alter table public.visa_reminders enable row level security;
alter table public.activities     enable row level security;

create policy "profiles read"  on public.profiles for select to authenticated using (true);
create policy "profiles self"  on public.profiles for update to authenticated using (id = auth.uid());

create policy "leads all"      on public.leads          for all to authenticated using (true) with check (true);
create policy "customers all"  on public.customers      for all to authenticated using (true) with check (true);
create policy "visas all"      on public.visas          for all to authenticated using (true) with check (true);
create policy "reminders all"  on public.visa_reminders for all to authenticated using (true) with check (true);
create policy "activities all" on public.activities     for all to authenticated using (true) with check (true);

-- ---------- document storage ----------
insert into storage.buckets (id, name, public)
values ('customer-files', 'customer-files', false)
on conflict (id) do nothing;

create policy "staff files read"   on storage.objects for select to authenticated using (bucket_id = 'customer-files');
create policy "staff files write"  on storage.objects for insert to authenticated with check (bucket_id = 'customer-files');
create policy "staff files delete" on storage.objects for delete to authenticated using (bucket_id = 'customer-files');

-- ---------- daily schedule (optional; needs pg_cron on cloud) ----------
do $cron$
begin
  create extension if not exists pg_cron with schema extensions;
  perform cron.schedule('visa-reminders-daily', '0 6 * * *', 'select public.generate_visa_reminders();');
exception when others then
  raise notice 'pg_cron not scheduled (extension unavailable): %', sqlerrm;
end
$cron$;

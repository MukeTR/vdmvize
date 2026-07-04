-- ============================================================
-- VDM Vize CRM v2 — applications (visa process), documents, tasks
-- ============================================================

-- ---------- applications (the visa process, distinct from lead pipeline) ----------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  country text not null,
  visa_type text,
  stage text not null default 'on_review',
    -- on_review | collecting_docs | appointment_set | submitted | awaiting_result | approved | rejected
  appointment_at timestamptz,          -- consulate / VFS appointment
  submitted_at date,
  result_at date,
  service_fee numeric(10, 2) not null default 0,
  currency text not null default 'TRY',
  priority text not null default 'normal',   -- low | normal | high
  assigned_to uuid references auth.users(id) on delete set null,
  notes text
);
create index if not exists applications_stage_idx on public.applications(stage);
create index if not exists applications_appt_idx on public.applications(appointment_at);
create index if not exists applications_customer_idx on public.applications(customer_id);

drop trigger if exists applications_touch on public.applications;
create trigger applications_touch before update on public.applications
  for each row execute function public.touch_updated_at();

-- ---------- document checklist per application ----------
create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  name text not null,
  collected boolean not null default false,
  sort int not null default 0
);
create index if not exists appdocs_app_idx on public.application_documents(application_id);

-- ---------- tasks / follow-ups ----------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  notes text,
  due_at date,
  done boolean not null default false,
  assigned_to uuid references auth.users(id) on delete set null,
  related_type text,                   -- lead | customer | application
  related_id uuid,
  created_by uuid references auth.users(id) on delete set null
);
create index if not exists tasks_due_idx on public.tasks(due_at);
create index if not exists tasks_done_idx on public.tasks(done);

-- ---------- RLS ----------
alter table public.applications          enable row level security;
alter table public.application_documents enable row level security;
alter table public.tasks                 enable row level security;

create policy "applications all" on public.applications          for all to authenticated using (true) with check (true);
create policy "appdocs all"      on public.application_documents for all to authenticated using (true) with check (true);
create policy "tasks all"        on public.tasks                 for all to authenticated using (true) with check (true);

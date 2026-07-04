-- Demo data for local development / testing.
insert into public.leads (name, phone, email, visa_type, note, source, status) values
  ('Ahmet Yılmaz',   '0532 111 22 33', 'ahmet@example.com',  'Schengen (Fransa)',  'Yaz tatili planı',   'website',  'new'),
  ('Elif Demir',     '0533 222 33 44', 'elif@example.com',   'Amerika (ABD)',      'Fuar için acil',     'website',  'contacted'),
  ('Mehmet Kaya',    '0534 333 44 55', null,                 'İngiltere',          'Öğrenci vizesi',     'whatsapp', 'quoted'),
  ('Zeynep Şahin',   '0535 444 55 66', 'zeynep@example.com', 'Schengen (Almanya)', 'Ticari başvuru',     'phone',    'in_process'),
  ('Can Öztürk',     '0536 555 66 77', null,                 'Yunanistan',         'Ada tatili',         'website',  'won'),
  ('Deniz Arslan',   '0537 000 11 22', 'deniz@example.com',  'Schengen (İtalya)',  'Bütçe uygun değil',  'website',  'lost');

-- Customer with a visa expiring in ~20 days -> a reminder should surface today.
with c as (
  insert into public.customers (name, phone, email, notes)
  values ('Ayşe Korkmaz', '0538 666 77 88', 'ayse@example.com', '2 yıldır müşterimiz, memnun.')
  returning id
)
insert into public.visas (customer_id, country, visa_type, issued_date, valid_until, status)
select c.id, 'Fransa', 'Schengen C (çok girişli)', current_date - 160, current_date + 20, 'active' from c;

-- Customer with an already-expired visa (renewal opportunity).
with c as (
  insert into public.customers (name, phone, email)
  values ('Burak Aydın', '0539 777 88 99', null)
  returning id
)
insert into public.visas (customer_id, country, visa_type, issued_date, valid_until, status)
select c.id, 'Amerika', 'B1/B2', current_date - 400, current_date - 5, 'active' from c;

-- Customer with a visa expiring in ~6 days (7-day reminder).
with c as (
  insert into public.customers (name, phone, email, notes)
  values ('Selin Çelik', '0530 123 45 67', 'selin@example.com', 'İngiltere öğrenci')
  returning id
)
insert into public.visas (customer_id, country, visa_type, issued_date, valid_until, status)
select c.id, 'İngiltere', 'Student', current_date - 350, current_date + 6, 'active' from c;

select public.generate_visa_reminders();

-- ---- v2: applications, document checklists, tasks ----
insert into public.applications (customer_id, country, visa_type, stage, appointment_at, service_fee, priority, notes)
select id, 'Fransa', 'Turistik', 'collecting_docs', now() + interval '12 days', 4500, 'normal', 'Demo başvuru'
from public.customers where name = 'Ayşe Korkmaz' limit 1;
insert into public.applications (customer_id, country, visa_type, stage, appointment_at, service_fee, priority)
select id, 'Amerika', 'B1/B2', 'appointment_set', now() + interval '5 days', 7500, 'high'
from public.customers where name = 'Burak Aydın' limit 1;
insert into public.applications (customer_id, country, visa_type, stage, service_fee)
select id, 'İngiltere', 'Student', 'submitted', 5000
from public.customers where name = 'Selin Çelik' limit 1;

insert into public.application_documents (application_id, name, collected, sort)
select a.id, d.name, (a.stage <> 'on_review' and d.sort <= 3), d.sort
from public.applications a
cross join (values
  ('Pasaport', 1), ('Biyometrik fotoğraf', 2), ('Banka dökümü', 3),
  ('Seyahat sigortası', 4), ('Otel rezervasyonu', 5), ('Uçak bileti rezervasyonu', 6)
) as d(name, sort);

insert into public.tasks (title, due_at, related_type) values
  ('Ayşe Korkmaz - vize yenileme araması', current_date, 'customer'),
  ('Elif Demir - teklif gönder', current_date, 'lead'),
  ('Konsolosluk randevu teyidi', current_date + 2, 'application');

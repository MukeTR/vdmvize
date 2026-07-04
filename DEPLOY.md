# VDM Vize — Yayına Alma (Deploy)

Bu bir **Next.js 16 sunucu uygulaması**dır (SSR + server actions + API routes + Supabase CRM).
Statik/paylaşımlı hosting'te (ör. Hostinger web hosting) **çalışmaz** — CSS/JS yüklenmez, form
ve CRM çalışmaz. Node.js çalıştıran bir platform gerekir.

## Önerilen: Vercel (ücretsiz, repo'ya bağlı)

1. **Bulut Supabase projesi aç** (supabase.com) — lokal Supabase sadece geliştirme içindir.
2. Supabase panelinde SQL Editor'de sırayla çalıştır:
   - `supabase/migrations/20260704090000_crm_schema.sql`
   - `supabase/migrations/20260704120000_crm_v2.sql`
   - (opsiyonel demo veri için `supabase/seed.sql`)
   - Extensions'tan **pg_cron**'u aç.
3. Supabase → Project Settings → API'den değerleri al.
4. **Vercel'de** `MukeTR/vdmvize` reposunu import et. Framework otomatik "Next.js" gelir.
5. Vercel → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL       = https://<proje>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY  = <publishable / anon key>
   SUPABASE_SERVICE_ROLE_KEY      = <secret / service_role key>
   CRON_SECRET                    = <rastgele güçlü bir dize>
   DIGEST_TO                      = vize@vdmturizm.com
   RESEND_API_KEY                 = <resend.com api key>   (e-posta digest için)
   RESEND_FROM                    = VDM CRM <no-reply@vdmturizm.com>
   ```
6. Deploy. `vercel.json` her sabah 06:00'da `/api/cron/daily-digest`'i çağırır
   (Vercel Cron, `CRON_SECRET`'i Authorization başlığıyla otomatik gönderir).
7. Domain: Vercel → Domains'ten `vdmturizm.com` / `www.vdmturizm.com` ekle, DNS'i yönlendir.

## Alternatifler

- **Netlify** (Next.js runtime ile) veya **Railway / Render** (Node): benzer şekilde repo + env.
- **Hostinger VPS** (paylaşımlı DEĞİL): sunucuda `npm ci && npm run build && npm run start`,
  PM2 + Nginx reverse proxy, env değişkenleri `.env`. Cron için Hostinger cron → `curl -H "x-cron-secret: <CRON_SECRET>" https://<domain>/api/cron/daily-digest`.

## Notlar

- Site içi linkler relative, kanonik adres `https://www.vdmturizm.com` (robots/sitemap öyle).
  Yayına alınca `vdmturizm.com → https://www.vdmturizm.com` 301 yönlendirmesini bir kez kur.
- `.env.local` yalnızca lokal içindir, repoya girmez.

# VDM Vize — Yayına Alma (GitHub → Hostinger otomatik deploy)

Site tamamen **statik** dışa aktarılır (`output: "export"`) — sunucu/Node/DB gerekmez.
Akış: **main'e push → GitHub Actions build alır → hazır statik dosyaları `deploy` branch'ine
yazar → Hostinger `deploy` branch'ini `public_html`'e çeker.**

> CRM (Supabase + /admin) bu projeden çıkarıldı; kod git geçmişinde `f770e90`'de duruyor.

## Tek seferlik kurulum

### 1) GitHub tarafı
`.github/workflows/deploy.yml` zaten repoda. İlk `main` push'unda çalışır ve `deploy`
branch'ini otomatik oluşturur (içinde build edilmiş site kök dizinde: `index.html`, `_next/`…).
Ekstra secret/ayar gerekmez (yerleşik `GITHUB_TOKEN` yeter).

### 2) Hostinger tarafı
hPanel → Websites → (site) → **Advanced → Git**:
- **Repository:** `https://github.com/MukeTR/vdmvize.git` (repo private ise Hostinger'ın verdiği
  SSH deploy key'ini GitHub → Settings → Deploy keys'e ekle).
- **Branch:** `deploy`  ← (main değil!)
- **Directory / install path:** `public_html`
- Kaydet → bir kez **Deploy** de.
- **Auto-deploy:** Hostinger sana bir **webhook URL** verir. Onu
  GitHub → repo → Settings → Webhooks → Add webhook'a yapıştır (Content type: `application/json`,
  event: `push`). Artık her main push'unda: Actions build → `deploy` push → Hostinger otomatik çeker.

  (İstersen bu webhook URL'yi GitHub'da `HOSTINGER_DEPLOY_WEBHOOK` secret'ı olarak da ekleyebilirsin;
  workflow build biter bitmez kendisi tetikler.)

## Günlük kullanım
İçeriği değiştir (`lib/` altındaki metinler: site.ts, content.ts, articles.ts, corporate.ts) →
`git push` (main). Gerisi otomatik: ~1-2 dk içinde canlı.

## Domain
- Hostinger'da `vdmturizm.com` ↔ `www.vdmturizm.com` (301) + ücretsiz SSL.
- robots/sitemap kanonik adres `https://www.vdmturizm.com`.

## Alternatif (Hostinger Git yerine FTP)
GitHub'a Hostinger FTP bilgisi (host/user/pass) secret olarak eklenip Actions ile doğrudan
`public_html`'e yüklenebilir. İstenirse workflow'a eklenir.

# VDM Vize — Yayına Alma (Hostinger / statik)

Site artık **tamamen statik** olarak dışa aktarılır (`output: "export"`). Sunucu, Node.js
veya veritabanı gerektirmez — Hostinger'ın paylaşımlı web hosting'inde sorunsuz çalışır.
İletişim formu doğrudan WhatsApp'a yönlendirir (arka uç yok).

> CRM (Supabase + /admin) bu projeden çıkarıldı; ileride ayrı yapılacak. Kod git geçmişinde
> `f770e90` commit'inde duruyor.

## Adımlar

1. Projede build al:
   ```bash
   npm install
   npm run build
   ```
   Bu, `out/` klasörünü üretir (tüm HTML, CSS, JS, sitemap.xml, robots.txt).

2. **`out/` klasörünün İÇİNDEKİLERİNİ** Hostinger'da sitenin kök dizinine yükle
   (genelde `public_html/`). Yani `out/index.html` → `public_html/index.html` olacak şekilde
   (out klasörünü değil, içindekileri).
   - hPanel → Dosya Yöneticisi ile sürükle-bırak, veya FTP.

3. Bitti. `https://vdmturizm.com` açıldığında site stiller yüklü şekilde gelir.

## Notlar

- URL'ler klasör/`index.html` yapısında (`trailingSlash: true`) — Apache ile en uyumlusu.
- Domain: Hostinger'da `vdmturizm.com` → `www.vdmturizm.com` (301) yönlendirmesini bir kez
  tanımla (robots/sitemap `https://www.vdmturizm.com` kanonik adresini kullanıyor).
- HTTPS: Hostinger'ın ücretsiz SSL'ini etkinleştir.
- İçerik güncelleme: metinler `lib/` altında (site.ts, content.ts, articles.ts, corporate.ts).
  Değiştir → `npm run build` → yeni `out/`'u tekrar yükle.

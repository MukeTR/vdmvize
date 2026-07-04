"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { WaIcon, PhoneIcon, Arrow } from "@/components/ui/Cta";
import FlipCode from "@/components/FlipCode";

const VISA_OPTIONS = [
  "Schengen (Fransa, Almanya, İtalya…)",
  "İngiltere",
  "Amerika (ABD)",
  "Yunanistan",
  "Diğer / Emin değilim",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    visa: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.visa) {
      setError("Lütfen adınızı, telefonunuzu ve vize türünü doldurun.");
      return;
    }
    setError("");
    // save the lead to the CRM (best-effort — never block the user)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          visa: form.visa,
          note: form.note,
          source: "website",
        }),
      });
    } catch {
      // ignore — WhatsApp still opens below
    }
    const msg =
      `Yeni Ön Başvuru · VDM Vize\n` +
      `———————————————\n` +
      `Ad Soyad: ${form.name}\n` +
      `Telefon: ${form.phone}\n` +
      `E-posta: ${form.email || "-"}\n` +
      `Vize türü: ${form.visa}\n` +
      `Not: ${form.note || "-"}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-[color:var(--color-hairline-2)] bg-white px-4 py-3 text-[0.95rem] text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none transition-colors focus:border-[color:var(--color-gold)] focus:ring-2 focus:ring-[color:var(--color-gold)]/20";
  const label = "ticket mb-1.5 block text-[0.62rem] tracking-[0.18em] text-[color:var(--color-mist-2)]";

  return (
    <section id="iletisim" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">Biniş Kartınız</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-[2.7rem]">
            Ücretsiz ön değerlendirmenizi alın
          </h2>
          <p className="mt-4 text-[color:var(--color-mist)]">
            Formu doldurun, birkaç saat içinde WhatsApp veya telefonla dönüş yapalım.
            Acele eden varsa — direkt arayın, biz açığız.
          </p>
        </div>

        {/* boarding pass */}
        <div className="relative grid overflow-hidden rounded-[22px] border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] shadow-[0_50px_90px_-50px_rgba(20,32,60,0.5)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* seam notches — cut with page color */}
          <div className="pointer-events-none absolute top-0 z-20 hidden h-full md:block" style={{ left: "45%" }}>
            <span className="absolute -top-3 h-6 w-6 -translate-x-1/2 rounded-full bg-[color:var(--color-ink)]" />
            <span className="absolute -bottom-3 h-6 w-6 -translate-x-1/2 rounded-full bg-[color:var(--color-ink)]" />
          </div>

          {/* STUB — direct channels (dark night panel) */}
          <aside className="night-panel relative p-7 text-[color:var(--color-cloud-night)] sm:p-9">
            <div className="flex items-center justify-between">
              <span className="ticket text-[0.62rem] font-bold tracking-[0.22em] text-[color:var(--color-mist-night)]">
                BOARDING · VDM
              </span>
              <span className="stamp px-2 py-0.5 text-[0.6rem] font-bold">VİZE ONAY</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="ticket text-3xl font-bold text-[color:var(--color-cloud-night)]">IST</div>
              <div className="flex-1 border-t border-dashed border-white/25" />
              <WaIcon className="h-4 w-4 text-[color:var(--color-gold)]" />
              <div className="flex-1 border-t border-dashed border-white/25" />
              <FlipCode className="ticket text-3xl font-bold text-[color:var(--color-cloud-night)]" />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-mist-night)]">
              Formu beklemek istemiyorsanız, aşağıdaki kanallardan bize hemen ulaşın.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href={whatsappLink("Merhaba, vize sürecim hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[color:var(--color-wa)] px-4 py-3 font-semibold text-white transition-transform hover:-translate-y-px"
              >
                <WaIcon />
                <span className="flex-1">WhatsApp</span>
                <span className="ticket text-sm">{site.whatsappDisplay}</span>
              </a>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-semibold text-[color:var(--color-cloud-night)] transition-colors hover:bg-white/[0.12]"
              >
                <PhoneIcon />
                <span className="flex-1">Telefon</span>
                <span className="ticket text-sm">{site.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-semibold text-[color:var(--color-cloud-night)] transition-colors hover:bg-white/[0.12]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-[1.05em] w-[1.05em]" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <span className="ticket flex-1 text-sm">{site.email}</span>
              </a>
            </div>

            <div className="mt-7 space-y-1 text-[0.8rem] text-[color:var(--color-mist-night)]">
              <p className="font-semibold text-[color:var(--color-cloud-night)]">Ofis</p>
              <p>{site.address}</p>
              <p className="mt-2 font-semibold text-[color:var(--color-cloud-night)]">Çalışma Saatleri</p>
              {site.hours.map((h) => (
                <p key={h.d} className="flex justify-between gap-4">
                  <span>{h.d}</span>
                  <span className="ticket">{h.h}</span>
                </p>
              ))}
            </div>

            {/* barcode */}
            <div className="mt-7 border-t border-dashed border-white/20 pt-4">
              <div
                className="h-9 w-full opacity-90"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #eef3fc 0 2px, transparent 2px 4px, #eef3fc 4px 5px, transparent 5px 9px)",
                }}
                aria-hidden
              />
              <p className="ticket mt-2 text-center text-[0.6rem] tracking-[0.3em] text-[color:var(--color-mist-night)]">
                VDM · IST · EST. 2004
              </p>
            </div>
          </aside>

          {/* MAIN — the form */}
          <div className="perforation relative bg-[color:var(--color-ink-3)]">
            <div className="p-7 sm:p-9 md:pl-11">
              {sent ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--color-wa)]/15 text-[color:var(--color-wa-ink)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
                    Rotanız açıldı ✈
                  </h3>
                  <p className="mt-3 max-w-sm text-[color:var(--color-mist)]">
                    WhatsApp&apos;ta hazırladığımız mesajı gönderin, ekibimiz en kısa sürede
                    dönüş yapsın. Dilerseniz doğrudan da arayabilirsiniz.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--color-cloud)] hover:border-[color:var(--color-sky)]/60">
                      <PhoneIcon className="h-4 w-4" /> {site.phoneDisplay}
                    </a>
                    <button
                      onClick={() => setSent(false)}
                      className="ticket text-sm text-[color:var(--color-mist-2)] underline-offset-4 hover:text-[color:var(--color-sky)] hover:underline"
                    >
                      Formu tekrar doldur
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="mb-5 flex items-center justify-between">
                    <span className="ticket text-[0.62rem] tracking-[0.22em] text-[color:var(--color-sky)]">
                      ÖN BAŞVURU FORMU
                    </span>
                    <span className="ticket text-[0.62rem] tracking-[0.18em] text-[color:var(--color-mist-2)]">
                      SEAT · YOU
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={label} htmlFor="name">AD SOYAD *</label>
                      <input id="name" className={field} value={form.name} onChange={set("name")} placeholder="Adınız ve soyadınız" autoComplete="name" />
                    </div>
                    <div>
                      <label className={label} htmlFor="phone">TELEFON *</label>
                      <input id="phone" className={field} value={form.phone} onChange={set("phone")} placeholder="05xx xxx xx xx" inputMode="tel" autoComplete="tel" />
                    </div>
                    <div>
                      <label className={label} htmlFor="email">E-POSTA</label>
                      <input id="email" className={field} value={form.email} onChange={set("email")} placeholder="ornek@eposta.com" inputMode="email" autoComplete="email" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label} htmlFor="visa">HANGİ VİZE? *</label>
                      <select id="visa" className={`${field} appearance-none`} value={form.visa} onChange={set("visa")}>
                        <option value="" disabled>Seçiniz…</option>
                        {VISA_OPTIONS.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label} htmlFor="note">NOTUNUZ</label>
                      <textarea id="note" rows={3} className={`${field} resize-none`} value={form.note} onChange={set("note")} placeholder="Seyahat tarihiniz, durumunuz veya sorularınız…" />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 rounded-lg border border-[color:var(--color-stamp)]/40 bg-[color:var(--color-stamp)]/8 px-3 py-2 text-sm text-[color:var(--color-stamp)]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-gold group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.98rem] font-bold transition-all sm:w-auto"
                  >
                    <WaIcon />
                    Ön değerlendirmemi başlat
                    <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-[color:var(--color-mist-2)]">
                    Gönder&apos;e bastığınızda bilgileriniz WhatsApp üzerinden bize iletilir.
                    Verileriniz yalnızca başvurunuz için kullanılır.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

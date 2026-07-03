import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesDetail, getService } from "@/lib/content";
import { site } from "@/lib/site";
import { FormButton, WhatsAppButton, Arrow } from "@/components/ui/Cta";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return servicesDetail.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Hizmet bulunamadı" };
  return { title: s.title, description: s.intro };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const others = servicesDetail.filter((x) => x.slug !== s.slug);
  const dest = s.route.split("→")[1]?.trim() ?? "";

  return (
    <>
      {/* HERO — pitch + boarding-pass visual */}
      <section className="paper-bg relative overflow-hidden border-b border-[color:var(--color-hairline)] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#916410 1px, transparent 1px), linear-gradient(90deg, #916410 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            maskImage: "radial-gradient(circle at 20% 0%, black, transparent 68%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav className="ticket mb-8 flex flex-wrap items-center gap-2 text-[0.66rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">
            <Link href="/" className="hover:text-[color:var(--color-sky)]">ANASAYFA</Link>
            <span className="text-[color:var(--color-gold-ink)]">→</span>
            <Link href="/hizmetler" className="hover:text-[color:var(--color-sky)]">HİZMETLER</Link>
            <span className="text-[color:var(--color-gold-ink)]">→</span>
            <span className="text-[color:var(--color-mist)]">{s.title.toUpperCase()}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* left */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] text-3xl shadow-sm">
                  {s.flag}
                </span>
                <span className="eyebrow">Vize Hizmeti · {s.code}</span>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] font-bold leading-[1.03] tracking-tight text-[color:var(--color-cloud)] sm:text-[3.4rem]">
                {s.title}
              </h1>
              <p className="mt-3 text-lg font-semibold text-[color:var(--color-gold-ink)]">
                {s.tagline}
              </p>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[color:var(--color-mist)]">
                {s.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <FormButton label="Ücretsiz ön değerlendirme" />
                <WhatsAppButton message={`Merhaba, ${s.title} hakkında bilgi almak istiyorum.`} />
              </div>
            </div>

            {/* right — boarding pass to the destination */}
            <div className="relative">
              <div className="night-panel relative overflow-hidden rounded-[26px] border border-[color:var(--color-hairline-2)] p-7 shadow-[0_50px_90px_-50px_rgba(11,20,40,0.6)] sm:p-8">
                <div className="pointer-events-none absolute -right-6 -top-8 text-[8rem] leading-none opacity-[0.08]">{s.flag}</div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="ticket text-[0.6rem] font-bold tracking-[0.24em] text-[color:var(--color-mist-night)]">
                      BİNİŞ KARTI · VDM
                    </span>
                    <span className="stamp px-2 py-0.5 text-[0.58rem] font-bold">VİZE ONAY</span>
                  </div>

                  <div className="mt-7 flex items-end justify-between gap-3">
                    <div>
                      <div className="ticket text-[0.58rem] tracking-[0.18em] text-[color:var(--color-mist-night)]">KALKIŞ</div>
                      <div className="ticket text-3xl font-bold text-[color:var(--color-cloud-night)]">IST</div>
                    </div>
                    <div className="mb-1 flex-1">
                      <div className="flex items-center gap-1 text-[color:var(--color-gold)]">
                        <span className="h-px flex-1 bg-[color:var(--color-gold)]/40" />
                        ✈
                        <span className="h-px flex-1 bg-[color:var(--color-gold)]/40" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="ticket text-[0.58rem] tracking-[0.18em] text-[color:var(--color-mist-night)]">VARIŞ</div>
                      <div className="ticket text-3xl font-bold text-[color:var(--color-cloud-night)]">{dest}</div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-2.5 border-t border-dashed border-white/20 pt-5">
                    {[
                      ["HİZMET", s.title],
                      ["YOLCU", "SİZ"],
                      ["DURUM", "DANIŞMANLIK AKTİF"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4">
                        <span className="ticket text-[0.62rem] tracking-[0.16em] text-[color:var(--color-mist-night)]">{k}</span>
                        <span className={`ticket text-sm font-bold ${v === "DANIŞMANLIK AKTİF" ? "text-[#8ff0b8]" : "text-[color:var(--color-cloud-night)]"}`}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 h-8 w-full opacity-90" aria-hidden style={{ backgroundImage: "repeating-linear-gradient(90deg, #eef3fc 0 2px, transparent 2px 4px, #eef3fc 4px 5px, transparent 5px 9px)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — feature cards (2 per row) */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-8">
            <p className="eyebrow mb-3">Neler Yapıyoruz</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)] sm:text-[2rem]">
              {s.title} sürecini uçtan uca yönetiyoruz
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {s.points.map((p, i) => (
              <Reveal
                key={p}
                delay={i * 70}
                className="flex items-start gap-4 rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-6 shadow-[0_20px_50px_-42px_rgba(20,32,60,0.5)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--color-gold)]/12 font-[family-name:var(--font-mono)] text-sm font-bold text-[color:var(--color-gold-ink)]">
                  0{i + 1}
                </span>
                <p className="pt-1.5 text-[color:var(--color-cloud)]">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* who it's for — compact band */}
          <Reveal className="mt-6 flex flex-col gap-5 rounded-[var(--radius-card)] border border-dashed border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="ticket mb-3 text-[0.62rem] tracking-[0.2em] text-[color:var(--color-sky)]">KİMLER İÇİN</p>
              <div className="flex flex-wrap gap-2">
                {s.forWhom.map((f) => (
                  <span key={f} className="rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] px-4 py-2 text-sm font-medium text-[color:var(--color-cloud)]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[color:var(--color-mist)]">
              Durumunuz listede yok mu? Sizi dinleyip {s.title.toLowerCase()} için size özel
              bir yol haritası çıkarıyoruz.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface-2)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-8">
            <p className="eyebrow mb-3">Sık Sorulanlar</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)] sm:text-3xl">
              {s.title} hakkında merak edilenler
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {s.faq.map((f, i) => (
              <Reveal
                key={f.q}
                delay={i * 70}
                className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-6"
              >
                <h3 className="flex items-start gap-2.5 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                  <span className="mt-0.5 text-[color:var(--color-gold-ink)]">✦</span>
                  {f.q}
                </h3>
                <p className="mt-2 pl-6 text-[color:var(--color-mist)]">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + other services */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <CtaInline
            title={`${s.title} için hazır mısınız?`}
            text="Ücretsiz ön değerlendirmede profilinizi inceleyip en doğru başvuru stratejisini birlikte belirleyelim."
            wa={`Merhaba, ${s.title} hakkında bilgi almak istiyorum.`}
          />

          <div className="mt-12">
            <p className="ticket mb-4 text-[0.66rem] tracking-[0.18em] text-[color:var(--color-mist-2)]">
              DİĞER VİZE HİZMETLERİ
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/hizmetler/${o.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-gold)]/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--color-paper)] text-xl">{o.flag}</span>
                  <span className="flex-1">
                    <span className="block font-semibold text-[color:var(--color-cloud)]">{o.title}</span>
                    <span className="ticket text-[0.6rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">{o.route}</span>
                  </span>
                  <Arrow className="h-4 w-4 text-[color:var(--color-gold-ink)] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

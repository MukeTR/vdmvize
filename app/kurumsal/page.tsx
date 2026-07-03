import type { Metadata } from "next";
import { corporate } from "@/lib/corporate";
import PageHero from "@/components/PageHero";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Kurumsal Çözümler",
  description:
    "Şirketler için toplu ve öncelikli vize yönetimi: çalışan seyahatleri, fuar delegasyonları ve kurumsal hesap yöneticisi. Kurumsal teklif için iletişime geçin.",
};

const CORP_WA = "Merhaba, şirketimiz için kurumsal vize çözümleri ve teklif almak istiyorum.";

export default function KurumsalPage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal Çözümler"
        title={
          <>
            Şirketiniz için vize,{" "}
            <span className="text-[color:var(--color-gold-ink)]">tek elden.</span>
          </>
        }
        subtitle={corporate.intro}
        route="B2B · VDM"
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kurumsal" }]}
      />

      {/* VALUE PROPS — premium dark band, max two per row */}
      <section className="night-panel border-b border-[color:var(--color-hairline)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <p className="ticket mb-3 text-[0.62rem] tracking-[0.24em] text-[color:var(--color-gold)]">
              NEDEN KURUMSAL VDM
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud-night)] sm:text-4xl">
              Tek muhatap, öngörülebilir süreç.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {corporate.valueProps.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 70}
                className="flex gap-5 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 sm:p-7"
              >
                <span className="font-[family-name:var(--font-mono)] text-xl font-bold text-[color:var(--color-gold)]">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud-night)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-mist-night)]">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES — 2 per row */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4">Kimler İçin</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
              Ekibiniz nereye gidiyorsa
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {corporate.audiences.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 70}
                className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-7 shadow-[0_20px_50px_-42px_rgba(20,32,60,0.5)]"
              >
                <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-cloud)]">
                  <span className="text-[color:var(--color-gold-ink)]">✈</span>
                  {a.title}
                </h3>
                <p className="mt-2.5 text-[color:var(--color-mist)]">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — route timeline */}
      <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface-2)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="mb-10">
            <p className="eyebrow mb-4">Nasıl İşler</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
              Dört adımda kurumsal süreç
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-gradient-to-b from-[color:var(--color-gold)] via-[color:var(--color-sky)] to-transparent sm:left-[1.4rem]" />
            <ol className="space-y-5">
              {corporate.process.map((p, i) => (
                <Reveal key={p.title} delay={i * 80} as="li">
                  <div className="flex gap-5">
                    <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--color-gold)]/50 bg-[color:var(--color-night)] font-[family-name:var(--font-mono)] text-sm font-bold text-[color:var(--color-gold)] sm:h-12 sm:w-12">
                      0{i + 1}
                    </div>
                    <div className="flex-1 rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-5 shadow-[0_18px_44px_-40px_rgba(20,32,60,0.5)] sm:p-6">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[color:var(--color-mist)]">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-8">
            <p className="eyebrow mb-4">Sık Sorulanlar</p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)] sm:text-3xl">
              Kurumsal süreç hakkında
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {corporate.faq.map((f, i) => (
              <Reveal
                key={f.q}
                delay={i * 70}
                className="rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-6"
              >
                <h3 className="flex items-start gap-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                  <span className="text-[color:var(--color-gold-ink)]">•</span>
                  {f.q}
                </h3>
                <p className="mt-2 text-[color:var(--color-mist)]">{f.a}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <CtaInline
              title="Şirketiniz için kurumsal teklif alın"
              text="Çalışan sayınızı ve hedef ülkelerinizi konuşalım; size özel bir kurumsal vize planı ve teklif hazırlayalım."
              wa={CORP_WA}
            />
          </div>
        </div>
      </section>
    </>
  );
}

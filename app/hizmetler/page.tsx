import Link from "next/link";
import type { Metadata } from "next";
import { servicesDetail } from "@/lib/content";
import PageHero from "@/components/PageHero";
import CtaInline from "@/components/CtaInline";
import Reveal from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Cta";

export const metadata: Metadata = {
  title: "Vize Hizmetleri",
  description:
    "Schengen, İngiltere, Amerika, Almanya ve Yunanistan vize başvurularında uçtan uca danışmanlık. Ücretsiz ön değerlendirme için iletişime geçin.",
};

export default function HizmetlerPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetlerimiz"
        title={
          <>
            Vizeniz için{" "}
            <span className="text-[color:var(--color-gold-ink)]">tek adres.</span>
          </>
        }
        subtitle="Belge hazırlığından zor açılan randevulara, mülakat provasından seyahat planlamasına kadar sürecin her adımında yanınızdayız. Hizmetlerimizi kısa tuttuk — gerisini birlikte konuşalım."
        crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Hizmetler" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* max two per row */}
          <div className="grid gap-5 md:grid-cols-2">
            {servicesDetail.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-7 shadow-[0_20px_50px_-40px_rgba(20,32,60,0.5)] transition-all hover:-translate-y-1 hover:border-[color:var(--color-gold)]/60 hover:shadow-[0_28px_60px_-34px_rgba(145,100,16,0.3)] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--color-paper)] text-3xl">
                      {s.flag}
                    </span>
                    <span className="ticket rounded border border-[color:var(--color-hairline-2)] px-2 py-1 text-[0.6rem] tracking-[0.16em] text-[color:var(--color-sky)]">
                      {s.route}
                    </span>
                  </div>
                  <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--color-cloud)]">
                    {s.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[color:var(--color-gold-ink)]">
                    {s.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-[color:var(--color-mist)]">{s.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-gold-ink)]">
                    Detaylı bilgi
                    <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <CtaInline />
          </div>
        </div>
      </section>
    </>
  );
}

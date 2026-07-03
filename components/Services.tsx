import Link from "next/link";
import { servicesDetail } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Cta";
import { WhatsAppButton } from "@/components/ui/Cta";

export default function Services() {
  const shown = servicesDetail.slice(0, 4); // Schengen, İngiltere, Amerika, Almanya

  return (
    <section id="hizmetler" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4">Hizmet Rotaları</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-[2.6rem] sm:leading-[1.08]">
              Hangi vizeye ihtiyacınız varsa,
              <br className="hidden sm:block" /> sürecin tamamı bizde.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xl text-[color:var(--color-mist)] lg:pb-2">
              Detayları telefonda ya da WhatsApp&apos;ta konuşalım — her başvuru farklıdır,
              size özel yol haritasını birlikte çıkaralım.
            </p>
          </Reveal>
        </div>

        {/* max 2 per row */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {shown.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group relative flex h-full items-start gap-5 overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-6 shadow-[0_20px_50px_-38px_rgba(20,32,60,0.5)] transition-all hover:-translate-y-1 hover:border-[color:var(--color-gold)]/60 hover:shadow-[0_28px_60px_-34px_rgba(145,100,16,0.35)] sm:p-7"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[color:var(--color-paper)] text-3xl">
                  {s.flag}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[color:var(--color-cloud)]">
                      {s.title}
                    </h3>
                    <span className="ticket rounded border border-[color:var(--color-hairline-2)] px-1.5 py-0.5 text-[0.55rem] tracking-[0.14em] text-[color:var(--color-sky)]">
                      {s.route}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-mist)]">
                    {s.tagline} {s.forWhom.slice(0, 2).join(", ")} ve daha fazlası için yanınızdayız.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-gold-ink)]">
                    Detaylar
                    <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-dashed border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] px-6 py-5">
          <p className="text-sm text-[color:var(--color-mist)]">
            Yunanistan, İtalya, İspanya ve 40+ ülke için de buradayız.{" "}
            <Link href="/hizmetler" className="font-semibold text-[color:var(--color-gold-ink)] hover:underline">
              Tüm vize hizmetleri →
            </Link>
          </p>
          <WhatsAppButton className="!py-2.5 text-sm" />
        </div>
      </div>
    </section>
  );
}

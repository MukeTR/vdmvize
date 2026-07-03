import { steps } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { FormButton } from "@/components/ui/Cta";

export default function Process() {
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--color-hairline)] bg-[color:var(--color-surface-2)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow mb-4">Kalkış Prosedürü</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-[2.6rem] sm:leading-[1.08]">
              Üç durakta
              <br /> vizeniz hazır.
            </h2>
            <p className="mt-4 max-w-md text-[color:var(--color-mist)]">
              İlk görüşmeden pasaportunuza vize damgası düşene kadar tüm süreci biz
              yönetiriz. Siz sadece uçağa binin.
            </p>
            <div className="mt-8">
              <FormButton label="Sürece başlayın" />
            </div>
          </Reveal>

          <div className="relative">
            {/* connecting route line */}
            <div className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-[color:var(--color-gold)]/60 via-[color:var(--color-sky)]/40 to-transparent sm:left-[1.6rem]" />
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 110} as="li">
                  <div className="flex gap-5 rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-5 shadow-[0_20px_50px_-40px_rgba(20,32,60,0.5)] sm:p-6">
                    <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--color-gold)]/50 bg-[color:var(--color-night)] font-[family-name:var(--font-mono)] text-sm font-bold text-[color:var(--color-gold)]">
                      {s.n}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--color-cloud)]">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-mist)]">
                        {s.line}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

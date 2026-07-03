import { stats } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

export default function Stats() {
  return (
    <section className="border-y border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:py-20">
        {/* left — intro (asymmetric, not another card row) */}
        <Reveal>
          <p className="eyebrow mb-4">Uçuş Kaydı</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-cloud)] sm:text-4xl">
            Rakamlar,
            <br />
            <span className="text-[color:var(--color-gold-ink)]">tecrübenin kaydı.</span>
          </h2>
          <p className="mt-4 max-w-sm text-[color:var(--color-mist)]">
            İki binli yılların başından bu yana on binlerce yolcuyu doğru rotaya çıkardık.
          </p>
        </Reveal>

        {/* right — 2x2, max two per row */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)]">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="flex flex-col gap-1 bg-[color:var(--color-ink-3)] p-6 sm:p-8"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[color:var(--color-gold-ink)] sm:text-5xl">
                <Counter n={s.n} prefix={s.prefix} suffix={s.suffix} grouped={s.group} />
              </span>
              <span className="text-[0.82rem] leading-snug text-[color:var(--color-mist)]">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

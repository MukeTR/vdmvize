import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  route,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  route?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="paper-bg relative overflow-hidden border-b border-[color:var(--color-hairline)] pt-28 pb-14 sm:pt-32 sm:pb-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#916410 1px, transparent 1px), linear-gradient(90deg, #916410 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(circle at 15% 0%, black, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {crumbs && (
          <nav className="ticket mb-6 flex flex-wrap items-center gap-2 text-[0.66rem] tracking-[0.14em] text-[color:var(--color-mist-2)]">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-[color:var(--color-sky)]">
                    {c.label.toUpperCase()}
                  </Link>
                ) : (
                  <span className="text-[color:var(--color-mist)]">{c.label.toUpperCase()}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-[color:var(--color-gold-ink)]">→</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.5fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="font-[family-name:var(--font-display)] text-[2.4rem] font-bold leading-[1.04] tracking-tight text-[color:var(--color-cloud)] sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[color:var(--color-mist)]">
                {subtitle}
              </p>
            )}
          </div>

          {route && (
            <div className="hidden shrink-0 rounded-2xl border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] px-5 py-4 shadow-[0_20px_50px_-38px_rgba(20,32,60,0.5)] lg:block">
              <span className="ticket text-[0.58rem] tracking-[0.2em] text-[color:var(--color-mist-2)]">
                ROTA
              </span>
              <div className="ticket mt-1 text-2xl font-bold text-[color:var(--color-cloud)]">
                {route}
              </div>
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { Arrow } from "@/components/ui/Cta";

function fmtDate(iso: string) {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

export default function ArticleCard({ a, featured = false }: { a: Article; featured?: boolean }) {
  const base = a.kind === "blog" ? "/blog" : "/haberler";
  return (
    <Link
      href={`${base}/${a.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] shadow-[0_20px_50px_-40px_rgba(20,32,60,0.5)] transition-all hover:-translate-y-1 hover:border-[color:var(--color-gold)]/50 hover:shadow-[0_28px_60px_-36px_rgba(145,100,16,0.3)] ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      {/* boarding-pass style cover */}
      <div
        className={`night-panel relative flex shrink-0 items-end p-5 ${
          featured ? "sm:w-2/5 sm:min-h-[280px]" : "min-h-[150px]"
        }`}
      >
        <div className="pointer-events-none absolute right-4 top-4 text-4xl opacity-30">✈</div>
        <div>
          <span className="ticket inline-block rounded border border-[color:var(--color-gold)]/40 bg-[color:var(--color-gold)]/12 px-2 py-0.5 text-[0.6rem] tracking-[0.14em] text-[color:var(--color-gold)]">
            {a.tag.toUpperCase()}
          </span>
          <div className="ticket mt-3 text-[0.62rem] tracking-[0.2em] text-[color:var(--color-mist-night)]">
            {a.kind === "blog" ? "VDM · BLOG" : "VDM · HABER"}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="ticket flex items-center gap-3 text-[0.66rem] tracking-[0.1em] text-[color:var(--color-mist-2)]">
          <span>{fmtDate(a.date)}</span>
          <span className="text-[color:var(--color-gold-ink)]">·</span>
          <span>{a.readingMinutes} dk okuma</span>
        </div>
        <h3
          className={`mt-2 font-[family-name:var(--font-display)] font-semibold leading-snug text-[color:var(--color-cloud)] transition-colors group-hover:text-[color:var(--color-gold-ink)] ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {a.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-mist)] line-clamp-3">
          {a.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-gold-ink)]">
          Yazıyı oku
          <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

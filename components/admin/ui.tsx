import Link from "next/link";
import { statusMeta } from "@/lib/crm";

export function StatCard({
  label,
  value,
  hint,
  href,
  accent = "var(--color-gold-ink)",
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  accent?: string;
}) {
  const inner = (
    <>
      <div className="ticket text-[0.6rem] tracking-[0.16em] text-[color:var(--color-mist-2)]">
        {label.toUpperCase()}
      </div>
      <div
        className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold"
        style={{ color: accent }}
      >
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-[color:var(--color-mist)]">{hint}</div>}
    </>
  );
  const cls =
    "rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] p-5 shadow-[0_18px_44px_-38px_rgba(20,32,60,0.5)]";
  return href ? (
    <Link href={href} className={`${cls} block transition-colors hover:border-[color:var(--color-gold)]/50`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const m = statusMeta(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold"
      style={{ background: `${m.color}1a`, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud)]">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-[color:var(--color-mist)]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] shadow-[0_18px_44px_-38px_rgba(20,32,60,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}

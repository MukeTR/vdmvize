"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { signOutAction } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Panel", exact: true, icon: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { href: "/admin/leads", label: "Leadler", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/admin/customers", label: "Müşteriler", icon: "M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M21 20v-2a4 4 0 0 0-3-3.87" },
  { href: "/admin/reminders", label: "Hatırlatıcılar", icon: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" },
  { href: "/admin/reports", label: "Raporlar", icon: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
];

export default function AdminShell({
  userName,
  dueCount,
  children,
}: {
  userName: string;
  dueCount: number;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? path === href : path === href || path.startsWith(href + "/");

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {NAV.map((n) => {
        const active = isActive(n.href, n.exact);
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold-ink)]"
                : "text-[color:var(--color-mist)] hover:bg-black/[0.04] hover:text-[color:var(--color-cloud)]"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[1.15rem] w-[1.15rem]">
              <path d={n.icon} />
            </svg>
            <span className="flex-1">{n.label}</span>
            {n.href === "/admin/reminders" && dueCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--color-stamp)] px-1.5 text-[0.62rem] font-bold text-white">
                {dueCount}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)]">
      {/* sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)] px-4 py-6 lg:flex">
        <Link href="/admin" className="px-2">
          <Logo size="sm" />
        </Link>
        <p className="ticket mt-1 px-2 text-[0.55rem] tracking-[0.22em] text-[color:var(--color-mist-2)]">
          CRM PANELİ
        </p>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <NavLinks />
        </nav>
        <div className="border-t border-[color:var(--color-hairline)] pt-4">
          <div className="px-3 text-sm font-semibold text-[color:var(--color-cloud)]">{userName}</div>
          <div className="mt-2 flex items-center justify-between px-1">
            <Link href="/" className="ticket text-[0.66rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-sky)]">
              ← Siteyi gör
            </Link>
            <form action={signOutAction}>
              <button className="ticket text-[0.66rem] tracking-[0.1em] text-[color:var(--color-mist-2)] hover:text-[color:var(--color-stamp)]">
                Çıkış
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)]/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin"><Logo size="sm" /></Link>
        <form action={signOutAction}>
          <button className="ticket text-[0.66rem] tracking-[0.12em] text-[color:var(--color-mist-2)]">Çıkış</button>
        </form>
      </div>
      <nav className="sticky top-[57px] z-30 flex gap-1 overflow-x-auto border-b border-[color:var(--color-hairline)] bg-[color:var(--color-ink-2)] px-3 py-2 lg:hidden">
        <NavLinks />
      </nav>

      {/* content */}
      <div className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

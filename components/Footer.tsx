import Link from "next/link";
import { site } from "@/lib/site";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";
import Logo from "@/components/ui/Logo";

const NAV = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Blog", href: "/blog" },
  { label: "Haberler", href: "/haberler" },
  { label: "İletişim", href: "/#iletisim" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-surface-2)] pb-28 pt-16 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[color:var(--color-mist)]">
              {site.tagline}. Schengen, İngiltere ve Amerika vizelerinde 20 yılı aşkın
              tecrübeyle İstanbul Beyoğlu&apos;ndan hizmet veriyoruz.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="text-sm font-medium text-[color:var(--color-mist)] hover:text-[color:var(--color-gold-ink)]">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="ticket mb-4 text-[0.62rem] tracking-[0.22em] text-[color:var(--color-mist-2)]">
              İLETİŞİM
            </p>
            <ul className="space-y-2.5 text-sm text-[color:var(--color-mist)]">
              <li>
                <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[color:var(--color-wa-ink)]">
                  <WaIcon className="h-4 w-4" /> {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-[color:var(--color-sky)]">
                  <PhoneIcon className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-[color:var(--color-sky)]">{site.email}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[color:var(--color-sky)]">
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="ticket mb-4 text-[0.62rem] tracking-[0.22em] text-[color:var(--color-mist-2)]">
              OFİS
            </p>
            <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="text-sm leading-relaxed text-[color:var(--color-mist)] hover:text-[color:var(--color-sky)]">
              {site.address}
            </a>
            <div className="mt-4 space-y-1 text-sm text-[color:var(--color-mist)]">
              {site.hours.map((h) => (
                <p key={h.d} className="flex justify-between gap-6">
                  <span>{h.d}</span>
                  <span className="ticket text-[color:var(--color-mist-2)]">{h.h}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[color:var(--color-hairline)] pt-6 sm:flex-row">
          <p className="ticket text-[0.66rem] tracking-[0.16em] text-[color:var(--color-mist-2)]">
            © 2004–2026 {site.legal.toUpperCase()}
          </p>
          <p className="ticket text-[0.66rem] tracking-[0.16em] text-[color:var(--color-mist-2)]">
            VDM · IST → DÜNYA
          </p>
        </div>
      </div>
    </footer>
  );
}

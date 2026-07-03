"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { FormButton, WhatsAppButton, WaIcon, PhoneIcon } from "@/components/ui/Cta";
import Logo from "@/components/ui/Logo";

const NAV = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetler", href: "/#hizmetler" },
  { label: "Blog", href: "/blog" },
  { label: "Haberler", href: "/haberler" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color:var(--color-hairline)] bg-[color:var(--color-ink)]/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="VDM Vize Danışmanlık ana sayfa" className="shrink-0">
          <Logo size="sm" />
        </Link>

        {/* center nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-gold-ink)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="ticket hidden items-center gap-2 text-sm font-medium text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-sky)] xl:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>

          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-wa-ink)]/30 bg-[color:var(--color-wa)]/10 text-[color:var(--color-wa-ink)] sm:hidden"
          >
            <WaIcon />
          </a>

          <div className="hidden sm:block">
            <WhatsAppButton label="WhatsApp" className="!px-4 !py-2.5 text-sm" />
          </div>
          <FormButton label="Ön Değerlendirme" className="!px-4 !py-2.5 text-sm" />
        </div>
      </div>
    </header>
  );
}

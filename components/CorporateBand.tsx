import Link from "next/link";
import { corporate } from "@/lib/corporate";
import Reveal from "@/components/ui/Reveal";
import { WhatsAppButton, Arrow } from "@/components/ui/Cta";

export default function CorporateBand() {
  const highlights = corporate.valueProps.slice(0, 4);
  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="night-panel relative overflow-hidden rounded-[26px] border border-[color:var(--color-hairline-2)] shadow-[0_50px_100px_-55px_rgba(11,20,40,0.7)]">
          <div className="pointer-events-none absolute -right-10 -top-16 text-[16rem] leading-none opacity-[0.06]">🏢</div>
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* left */}
            <div>
              <p className="ticket mb-4 text-[0.62rem] tracking-[0.24em] text-[color:var(--color-gold)]">
                ŞİRKETLER İÇİN
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-cloud-night)] sm:text-[2.6rem]">
                Kurumsal vize çözümleri
              </h2>
              <p className="mt-4 max-w-md text-[color:var(--color-mist-night)]">
                Çalışan seyahatleri, fuar delegasyonları ve toplu başvurular — hepsini tek
                muhatap, öncelikli süreç ve faturalı hizmetle yönetiyoruz.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/kurumsal"
                  className="btn-gold group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold"
                >
                  Kurumsal çözümleri keşfedin
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <WhatsAppButton
                  label="Kurumsal teklif alın"
                  message="Merhaba, şirketimiz için kurumsal vize çözümleri ve teklif almak istiyorum."
                />
              </div>
            </div>

            {/* right — value chips, 2 per row */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <span className="text-[color:var(--color-gold)]">✈</span>
                  <p className="mt-2 text-sm font-semibold leading-snug text-[color:var(--color-cloud-night)]">
                    {h.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

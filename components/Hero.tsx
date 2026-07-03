import { site } from "@/lib/site";
import { FormButton, WhatsAppButton } from "@/components/ui/Cta";
import GlobeMount from "@/components/globe/GlobeMount";
import DepartureTicker from "@/components/DepartureTicker";

export default function Hero() {
  return (
    <section className="paper-bg relative overflow-hidden">
      {/* faint warm grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#916410 1px, transparent 1px), linear-gradient(90deg, #916410 1px, transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage: "radial-gradient(circle at 26% 42%, black, transparent 62%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[84vh] max-w-7xl items-center px-5 pt-28 pb-6 sm:px-8 lg:pt-24 lg:pb-16">
        <div className="max-w-xl lg:max-w-[38rem]">
          <p className="hero-rise eyebrow mb-6 gap-2" style={{ animationDelay: "0ms" }}>
            <span className="mr-2 h-px w-10 bg-[color:var(--color-sky)]/70" />
            {site.city} · 2004&apos;ten beri
          </p>

          <h1
            className="hero-rise font-[family-name:var(--font-display)] text-[3.1rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-[color:var(--color-cloud)] sm:text-[4.6rem] lg:text-[5.3rem]"
            style={{ animationDelay: "90ms" }}
          >
            Vizeniz için
            <br />
            <span className="relative inline-block text-[color:var(--color-gold-ink)]">
              doğru rota
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8 Q150 2 298 7" fill="none" stroke="var(--color-gold)" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p
            className="hero-rise mt-8 max-w-lg text-[1.12rem] leading-relaxed text-[color:var(--color-mist)]"
            style={{ animationDelay: "180ms" }}
          >
            Schengen, İngiltere ve Amerika vizelerinde{" "}
            <span className="font-semibold text-[color:var(--color-cloud)]">
              20 yılı aşkın tecrübe.
            </span>{" "}
            Dosyanızı biz hazırlar, zor açılan randevuyu sizin için buluruz.
          </p>

          <div className="hero-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "270ms" }}>
            <FormButton />
            <WhatsAppButton />
          </div>
          <p className="hero-rise mt-4 text-sm text-[color:var(--color-mist-2)]" style={{ animationDelay: "340ms" }}>
            ya da telefonla arayın{" "}
            <a href={site.phoneHref} className="ticket font-semibold text-[color:var(--color-sky)] hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      {/* GLOBE STAGE — Earth floats on the light page (no navy panel) */}
      <div className="relative z-0 -mt-2 h-[50vh] w-full sm:h-[54vh] lg:absolute lg:inset-auto lg:bottom-6 lg:right-0 lg:top-20 lg:mt-0 lg:h-auto lg:w-[56%]">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 lg:left-[4%]">
            <GlobeMount />
          </div>

          {/* floating stat chips — light cards, max two */}
          <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)]/92 px-4 py-3 shadow-[0_18px_44px_-26px_rgba(20,32,60,0.55)] backdrop-blur sm:left-8 lg:left-[12%]">
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-gold-ink)]">
              20+
            </div>
            <div className="ticket text-[0.56rem] tracking-[0.16em] text-[color:var(--color-mist-2)]">
              YIL TECRÜBE
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-2xl border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)]/92 px-4 py-3 shadow-[0_18px_44px_-26px_rgba(20,32,60,0.55)] backdrop-blur sm:right-8 lg:right-[12%]">
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-sky)]">
              9.500+
            </div>
            <div className="ticket text-[0.56rem] tracking-[0.16em] text-[color:var(--color-mist-2)]">
              BAŞARILI BAŞVURU
            </div>
          </div>
        </div>
      </div>

      {/* full-width departure ticker */}
      <div className="relative z-10">
        <DepartureTicker />
      </div>
    </section>
  );
}

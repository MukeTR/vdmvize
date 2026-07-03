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

      {/* GLOBE STAGE — bleeds on desktop, stacks on mobile */}
      <div className="relative z-0 h-[52vh] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%]">
        <div className="night-panel relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 lg:left-[8%]">
            <GlobeMount />
          </div>

          {/* clean ivory -> transparent seam (desktop only) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] lg:block"
            style={{
              background:
                "linear-gradient(to right, var(--color-ink) 0%, rgba(247,243,235,0.85) 30%, rgba(247,243,235,0) 100%)",
            }}
          />

          {/* floating glass stat chips — max two */}
          <div className="pointer-events-none absolute left-6 top-[15%] hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:block lg:left-[30%]">
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-gold)]">
              20+
            </div>
            <div className="ticket text-[0.56rem] tracking-[0.16em] text-[color:var(--color-cloud-night)]">
              YIL TECRÜBE
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-[16%] right-6 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:block lg:right-[12%]">
            <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-sky-bright)]">
              9.500+
            </div>
            <div className="ticket text-[0.56rem] tracking-[0.16em] text-[color:var(--color-cloud-night)]">
              BAŞARILI BAŞVURU
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-center px-5 pt-28 pb-10 sm:px-8 lg:pt-24 lg:pb-16">
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

      {/* full-width departure ticker */}
      <div className="relative z-10">
        <DepartureTicker />
      </div>
    </section>
  );
}

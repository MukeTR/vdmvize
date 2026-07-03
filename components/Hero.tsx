import { site } from "@/lib/site";
import { FormButton, WhatsAppButton } from "@/components/ui/Cta";
import GlobeMount from "@/components/globe/GlobeMount";
import DepartureBoard from "@/components/DepartureBoard";

export default function Hero() {
  return (
    <section className="paper-bg relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      {/* faint warm grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#916410 1px, transparent 1px), linear-gradient(90deg, #916410 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 62% 34%, black, transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left — the pitch */}
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow mb-5 gap-2">
            <span className="mr-2 h-px w-8 bg-[color:var(--color-sky)]/60" />
            {site.city} · Vize Danışmanlığı
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[2.6rem] font-bold leading-[1.02] tracking-tight text-[color:var(--color-cloud)] sm:text-6xl">
            Vizeniz için
            <br />
            <span className="text-[color:var(--color-gold-ink)]">doğru rota.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-[color:var(--color-mist)]">
            Schengen, İngiltere ve Amerika vizelerinde{" "}
            <span className="font-semibold text-[color:var(--color-cloud)]">
              20 yılı aşkın tecrübe.
            </span>{" "}
            Profilinizi ücretsiz değerlendirelim, dosyanızı biz hazırlayalım, zor açılan
            randevuyu sizin için bulalım.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <FormButton />
            <WhatsAppButton />
          </div>
          <p className="mt-4 text-sm text-[color:var(--color-mist-2)]">
            ya da telefonla arayın{" "}
            <a href={site.phoneHref} className="ticket font-semibold text-[color:var(--color-sky)] hover:underline">
              {site.phoneDisplay}
            </a>
          </p>

          <div className="mt-9 max-w-md">
            <DepartureBoard />
          </div>
        </div>

        {/* right — the globe porthole */}
        <div className="relative z-0">
          <div className="night-panel relative mx-auto overflow-hidden rounded-[28px] border border-[color:var(--color-hairline-2)] shadow-[0_40px_90px_-45px_rgba(11,20,40,0.55)]">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <GlobeMount />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3">
              <span className="ticket text-[0.6rem] tracking-[0.24em] text-[color:var(--color-mist-night)]">
                İSTANBUL → DÜNYA
              </span>
              <span className="ticket text-[0.6rem] tracking-[0.24em] text-[color:var(--color-mist-night)]">
                40+ ÜLKE · CANLI ROTALAR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

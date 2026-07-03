import Reveal from "@/components/ui/Reveal";
import { FormButton, WhatsAppButton } from "@/components/ui/Cta";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-[26px] border border-[color:var(--color-gold)]/35 bg-[linear-gradient(135deg,rgba(232,178,76,0.16),rgba(28,127,178,0.08))] px-6 py-14 text-center shadow-[0_40px_80px_-50px_rgba(145,100,16,0.5)] sm:px-14">
          {/* dashed flight path decoration */}
          <div className="pointer-events-none absolute inset-x-10 top-1/2 hidden h-px route-dash sm:block" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(232,178,76,0.25),transparent_70%)] blur-xl" />

          <p className="eyebrow mb-4 justify-center text-center">Randevu bulmak zor</p>
          <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-cloud)] sm:text-[2.7rem]">
            Randevu bulmak zor.
            <br />
            <span className="text-[color:var(--color-gold-ink)]">Biz buluyoruz.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[color:var(--color-mist)]">
            Bir mesaj kadar yakınız. Profilinizi ücretsiz değerlendirelim, en hızlı rotayı
            birlikte çizelim.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton solid label="WhatsApp'tan yazın" />
            <FormButton label="Formu doldurun" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

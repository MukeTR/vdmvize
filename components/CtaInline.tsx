import { FormButton, WhatsAppButton } from "@/components/ui/Cta";

/** Reusable "push to contact" block for article & service pages. Max two buttons. */
export default function CtaInline({
  title = "Sürecinizi birlikte planlayalım",
  text = "Profilinizi ücretsiz değerlendirelim, en doğru rotayı çizelim. Bir mesaj kadar yakınız.",
  wa = "Merhaba, vize sürecim hakkında bilgi almak istiyorum.",
}: {
  title?: string;
  text?: string;
  wa?: string;
}) {
  return (
    <aside className="night-panel relative overflow-hidden rounded-[22px] border border-[color:var(--color-hairline-2)] px-6 py-8 shadow-[0_40px_80px_-50px_rgba(11,20,40,0.6)] sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute -right-6 -top-8 text-[7rem] opacity-10">✈</div>
      <div className="relative">
        <p className="ticket mb-3 text-[0.62rem] tracking-[0.24em] text-[color:var(--color-gold)]">
          ÜCRETSİZ ÖN DEĞERLENDİRME
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-cloud-night)] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-[color:var(--color-mist-night)]">{text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <WhatsAppButton solid message={wa} />
          <FormButton />
        </div>
      </div>
    </aside>
  );
}

import { site, whatsappLink } from "@/lib/site";

function WaIcon({ className = "h-[1.05em] w-[1.05em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.05 2C6.5 2 2 6.5 2 12.05c0 1.77.46 3.5 1.35 5.03L2 22l5.05-1.32a10 10 0 0 0 4.99 1.27h.01c5.55 0 10.05-4.5 10.05-10.05C22.1 6.5 17.6 2 12.05 2zm5.86 15.91A8.3 8.3 0 0 1 12.05 20.4a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3 .78.8-2.92-.2-.31a8.3 8.3 0 0 1-1.27-4.41A8.34 8.34 0 0 1 12.05 3.7 8.34 8.34 0 0 1 20.4 12.05a8.3 8.3 0 0 1-2.49 5.86z" />
    </svg>
  );
}

function PhoneIcon({ className = "h-[1.05em] w-[1.05em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const WA_DEFAULT =
  "Merhaba, VDM Vize Danışmanlık'a vize sürecim hakkında bilgi almak istiyorum.";

/** Primary CTA — routes to the pre-application form. */
export function FormButton({
  label = "Ücretsiz Ön Değerlendirme",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href="/#iletisim"
      className={`btn-gold group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all ${className}`}
    >
      {label}
      <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

/** WhatsApp — direct chat. */
export function WhatsAppButton({
  label = "WhatsApp'tan yazın",
  message = WA_DEFAULT,
  className = "",
  solid = false,
}: {
  label?: string;
  message?: string;
  className?: string;
  solid?: boolean;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all hover:-translate-y-px ${
        solid
          ? "bg-[color:var(--color-wa)] text-white shadow-[0_10px_26px_-10px_rgba(34,184,92,0.7)]"
          : "border border-[color:var(--color-wa-ink)]/30 bg-[color:var(--color-wa)]/10 text-[color:var(--color-wa-ink)] hover:bg-[color:var(--color-wa)]/16"
      } ${className}`}
    >
      <WaIcon />
      {label}
    </a>
  );
}

/** Phone — direct call. */
export function CallButton({
  className = "",
  showNumber = true,
}: {
  className?: string;
  showNumber?: boolean;
}) {
  return (
    <a
      href={site.phoneHref}
      className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)] px-6 py-3 text-[0.95rem] font-semibold text-[color:var(--color-cloud)] transition-all hover:border-[color:var(--color-sky)]/60 hover:bg-white ${className}`}
    >
      <PhoneIcon />
      {showNumber ? site.phoneDisplay : "Hemen arayın"}
    </a>
  );
}

export { WaIcon, PhoneIcon, Arrow };

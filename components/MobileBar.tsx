import { site, whatsappLink } from "@/lib/site";
import { WaIcon, PhoneIcon } from "@/components/ui/Cta";

/** Sticky bottom action bar — mobile only, always one tap from contact. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-2)]/95 p-3 shadow-[0_-12px_30px_-20px_rgba(20,32,60,0.4)] backdrop-blur-lg md:hidden">
      <div className="flex gap-2.5">
        <a
          href={whatsappLink("Merhaba, vize sürecim hakkında bilgi almak istiyorum.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[color:var(--color-wa)] py-3 text-sm font-bold text-white"
        >
          <WaIcon /> WhatsApp
        </a>
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full btn-gold py-3 text-sm font-bold"
        >
          <PhoneIcon /> Ara
        </a>
      </div>
    </div>
  );
}

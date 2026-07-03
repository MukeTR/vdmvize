import { DESTINATIONS } from "@/lib/site";

// a few extra chips to fill the strip
const EXTRA = [
  { country: "Belçika", flag: "🇧🇪" },
  { country: "İsviçre", flag: "🇨🇭" },
  { country: "Çekya", flag: "🇨🇿" },
  { country: "Portekiz", flag: "🇵🇹" },
  { country: "Kanada", flag: "🇨🇦" },
];

export default function Destinations() {
  const chips = [
    ...DESTINATIONS.map((d) => ({ country: d.country, flag: d.flag })),
    ...EXTRA,
  ];
  const loop = [...chips, ...chips];

  return (
    <section className="py-14 sm:py-16" aria-label="Vize verdiğimiz ülkeler">
      <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-8">
        <p className="ticket text-center text-[0.66rem] tracking-[0.28em] text-[color:var(--color-mist-2)]">
          40+ ÜLKEYE VİZE · KISMİ LİSTE
        </p>
      </div>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-3">
          {loop.map((c, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] px-5 py-2.5 shadow-[0_10px_30px_-24px_rgba(20,32,60,0.5)]"
            >
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="text-sm font-medium text-[color:var(--color-cloud)]">
                {c.country}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

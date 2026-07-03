const ITEMS = [
  { r: "IST → CDG", v: "SCHENGEN", s: "ONAYLANDI" },
  { r: "IST → LHR", v: "İNGİLTERE", s: "RANDEVU ALINDI" },
  { r: "IST → JFK", v: "AMERİKA", s: "DS-160 TAMAM" },
  { r: "IST → BER", v: "ALMANYA", s: "DOSYA HAZIR" },
  { r: "IST → ATH", v: "YUNANİSTAN", s: "ONAYLANDI" },
  { r: "IST → AMS", v: "HOLLANDA", s: "MÜLAKAT HAZIR" },
  { r: "IST → MAD", v: "İSPANYA", s: "ONAYLANDI" },
];

export default function DepartureTicker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee night-panel relative overflow-hidden border-t border-white/10 py-3">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap pr-8">
        {loop.map((it, i) => (
          <span key={i} className="ticket flex items-center gap-3 text-[0.72rem] tracking-[0.12em]">
            <span className="font-bold text-[color:var(--color-cloud-night)]">{it.r}</span>
            <span className="text-[color:var(--color-mist-night)]">{it.v}</span>
            <span
              className={`rounded px-2 py-0.5 font-bold ${
                it.s === "ONAYLANDI"
                  ? "bg-[color:var(--color-wa)]/20 text-[#8ff0b8]"
                  : "bg-[color:var(--color-sky-bright)]/15 text-[color:var(--color-sky-bright)]"
              }`}
            >
              {it.s}
            </span>
            <span className="text-[color:var(--color-gold)]">✈</span>
          </span>
        ))}
      </div>
    </div>
  );
}

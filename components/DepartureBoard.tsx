"use client";

import { useEffect, useState } from "react";

type Row = { route: string; visa: string; statuses: string[] };

const ROWS: Row[] = [
  { route: "IST → CDG", visa: "SCHENGEN", statuses: ["ONAYLANDI", "RANDEVU ALINDI", "DOSYA HAZIR"] },
  { route: "IST → LHR", visa: "İNGİLTERE", statuses: ["ONAYLANDI", "MÜLAKAT HAZIR", "DOSYA HAZIR"] },
  { route: "IST → JFK", visa: "AMERİKA", statuses: ["ONAYLANDI", "DS-160 TAMAM", "RANDEVU ALINDI"] },
];

function StatusCell({ statuses, offset }: { statuses: string[]; offset: number }) {
  const [i, setI] = useState(offset % statuses.length);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlip(true);
      const t = setTimeout(() => {
        setI((v) => (v + 1) % statuses.length);
        setFlip(false);
      }, 260);
      return () => clearTimeout(t);
    }, 2600 + offset * 700);
    return () => clearInterval(id);
  }, [statuses.length, offset]);

  const label = statuses[i];
  const approved = label === "ONAYLANDI";

  return (
    <span
      className={`ticket inline-block min-w-[9.5rem] rounded-[5px] px-2.5 py-1 text-[0.72rem] font-bold transition-all duration-200 ${
        flip ? "translate-y-0.5 opacity-0" : "translate-y-0 opacity-100"
      } ${
        approved
          ? "bg-[color:var(--color-wa)]/12 text-[color:var(--color-wa-ink)]"
          : "bg-[color:var(--color-sky)]/12 text-[color:var(--color-sky)]"
      }`}
    >
      {label}
    </span>
  );
}

export default function DepartureBoard() {
  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--color-hairline-2)] bg-[color:var(--color-ink-3)] shadow-[0_18px_44px_-30px_rgba(20,32,60,0.4)]">
      <div className="flex items-center justify-between border-b border-[color:var(--color-hairline)] px-4 py-2">
        <span className="ticket text-[0.62rem] tracking-[0.24em] text-[color:var(--color-mist-2)]">
          KALKIŞ TAKİP · VDM
        </span>
        <span className="flex items-center gap-1.5">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-[color:var(--color-wa)]" />
          <span className="ticket text-[0.62rem] tracking-[0.2em] text-[color:var(--color-wa-ink)]">CANLI</span>
        </span>
      </div>
      <div className="divide-y divide-[color:var(--color-hairline)]/60">
        {ROWS.map((r, idx) => (
          <div key={r.route} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="ticket text-sm font-bold text-[color:var(--color-cloud)]">{r.route}</span>
              <span className="ticket hidden text-[0.62rem] tracking-[0.18em] text-[color:var(--color-mist-2)] sm:inline">
                {r.visa}
              </span>
            </div>
            <StatusCell statuses={r.statuses} offset={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}

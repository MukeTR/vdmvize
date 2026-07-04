"use client";

import { useEffect, useState } from "react";

// başkent / popüler varış havalimanı kodları — her saniye değişir
const CODES = [
  "CDG", "LHR", "JFK", "BER", "ATH", "AMS", "MAD", "VIE",
  "FCO", "BRU", "LIS", "CPH", "DUB", "PRG", "ZRH", "OSL",
];

export default function FlipCode({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => {
      if (reduce) {
        setI((v) => (v + 1) % CODES.length);
        return;
      }
      setFlip(true);
      const t = setTimeout(() => {
        setI((v) => (v + 1) % CODES.length);
        setFlip(false);
      }, 170);
      return () => clearTimeout(t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-block tabular-nums transition-all duration-200 ${
        flip ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
      aria-live="off"
    >
      {CODES[i]}
    </span>
  );
}

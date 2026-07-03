"use client";

import { useEffect, useRef, useState } from "react";

function group(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Counter({
  n,
  prefix = "",
  suffix = "",
  grouped = false,
  duration = 1400,
  className = "",
}: {
  n: number;
  prefix?: string;
  suffix?: string;
  grouped?: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(n);
      return;
    }

    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const step = (t: number) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * n));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {grouped ? group(val) : val}
      {suffix}
    </span>
  );
}

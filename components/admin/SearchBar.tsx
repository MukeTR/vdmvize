"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/admin/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <div className="relative">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-mist-2)]">
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: isim, telefon…"
          className="w-full rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-ink-3)] py-2 pl-9 pr-3 text-sm text-[color:var(--color-cloud)] placeholder:text-[color:var(--color-mist-2)] outline-none focus:border-[color:var(--color-gold)]/60"
        />
      </div>
    </form>
  );
}

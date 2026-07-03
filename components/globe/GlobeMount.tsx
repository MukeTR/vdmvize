"use client";

import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="ticket text-xs tracking-[0.3em] text-[color:var(--color-mist-2)]">
        ROTALAR YÜKLENİYOR…
      </div>
    </div>
  ),
});

export default function GlobeMount() {
  return <GlobeScene />;
}

"use client";

import { useEffect, useState } from "react";

export function MysterySection() {
  const [typed, setTyped] = useState("");
  const fullText = "SOMETHING.IS.COMING";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const glitchTextBaseClasses = "font-display text-5xl font-bold uppercase md:text-7xl lg:text-8xl";

  return (
    <section className="full-bleed relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <div className="scanline-anim absolute left-0 right-0 h-20 bg-linear-to-b from-transparent via-[#bcf954]/40 to-transparent" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(rgba(188,249,84,0.4) 1px,transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#bcf954]/30 bg-[#bcf954]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-[#bcf954]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bcf954] cursor-blink" />
            What&apos;s Next
          </div>
          <div className="relative select-none">
            <h2 className={`${glitchTextBaseClasses} text-white`}>
              {typed}
              <span className="cursor-blink text-[#bcf954]">_</span>
            </h2>
            <h2 className={`glitch-1 pointer-events-none absolute inset-0 ${glitchTextBaseClasses} text-[#bcf954]`}>
              {typed}
            </h2>
            <h2 className={`glitch-2 pointer-events-none absolute inset-0 ${glitchTextBaseClasses} text-[#cbb6ff]`}>
              {typed}
            </h2>
          </div>
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-6 font-mono text-left text-sm text-zinc-400">
            <p className="mb-2 text-xs tracking-widest text-[#bcf954]">{"//STAY TUNED"}</p>
            <p>
              event_name: <span className="text-zinc-600">██████████████</span>
            </p>
            <p>
              date: <span className="text-zinc-600">██ ███ 2026</span>
            </p>
            <p>
              location: <span className="text-zinc-600">████████████</span>
            </p>
            <p>
              Exciting rewards: <span className="text-zinc-600">██,███</span>
            </p>
            <p className="mt-3 text-[#bcf954]">
              status: <span className="text-emerald-400">BREWING...</span>
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
            Stay tuned. We don&apos;t announce until it&apos;s ready.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";
import CoreTeamCarousel from "./CoreTeamCarousel";

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
      <span>{number}</span>
      <span className="h-px w-10 bg-zinc-300 dark:bg-zinc-600" />
      <span>{label}</span>
    </div>
  );
}

export default function CoreTeamSection() {
  return (
    <section className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">

        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel number="02" label="The Builders" />
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-3">
              <span className="h-12 w-1 bg-emerald-600" />
              <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                Core <span className="italic">Team.</span>
              </h2>
              <p className="max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                The ones making decisions at midnight and shipping before the sun comes up.
                Figuring things out, meeting deadlines, and making it happen.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
              Currently Building
            </div>
          </div>
        </div>

        <CoreTeamCarousel />
      </div>
    </section>
  );
}

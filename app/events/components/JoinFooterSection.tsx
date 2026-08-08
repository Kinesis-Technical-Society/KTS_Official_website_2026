import Image from "next/image";

import { LinkedInIcon } from "./icons";
import FooterSection from "@/app/components/FooterSection";

export function JoinFooterSection() {
  return (
    <div>
      <section
        className="full-bleed border-y-2 border-[var(--section-border)] bg-[var(--background)]"
        style={{ backgroundImage: "radial-gradient(var(--contact-dot) 1px,transparent 1px)", backgroundSize: "16px 16px" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 text-center">
          <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
            Don&apos;t watch from the sidelines.
          </h2>
          <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
            Join KTS - and be part of building what comes next.
          </p>
          <a
            href="mailto:kts@kiet.edu"
            className="mx-auto flex w-fit items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]"
          >
            <span>Join KTS</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h12" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>
      <FooterSection />
    </div>
  );
}

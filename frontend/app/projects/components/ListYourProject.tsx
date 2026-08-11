import FooterSection from "@/app/components/FooterSection";

export function ListYourProject() { 
  return (
    <div>
      <section
        className="full-bleed border-y-2 border-[var(--section-border)] bg-[var(--background)] py-12"
        style={{
          backgroundImage:
            "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#121212] bg-[var(--accent-lime)] px-3 py-1 text-xs font-bold text-zinc-900 shadow-[2px_2px_0px_0px_#121212] dark:border-zinc-200/40">
            <span>🚀</span> GET YOUR PROJECT FEATURED
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-[#121212] md:text-5xl dark:text-[#f3f2eb]">
            Built Something <span className="bg-[var(--accent-lavender)] px-2 text-[#121212]">Amazing?</span>
          </h2>

          <p className="mt-4 text-base font-medium text-[#4b5563] md:text-lg dark:text-zinc-300">
            If you&apos;ve made something impressive, mail us at{" "}
            <a
              href="mailto:kts@kiet.edu"
              className="font-bold underline decoration-[var(--accent-lime)] underline-offset-4 text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              kts@kiet.edu
            </a>{" "}
            with the following details:
          </p>

          {/* Simple Text List */}
          <div className="mt-2 rounded-2xl border-2 border-zinc-900 bg-white p-6 text-left shadow-[4px_4px_0px_0px_#121212] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[4px_4px_0px_0px_#000]">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              📋 Details to include in your email:
            </p>
            <ul className="space-y-3 font-sans text-sm md:text-base text-zinc-800 dark:text-zinc-200">
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">Project Title</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Required)</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">Description</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Required)</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">Tech Stack</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Required)</span> — e.g. React, Node.js, Python
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">Domain</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Required)</span> — e.g. Web Development, Android, ML
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">LinkedIn Profile URL</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Required)</span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-400 dark:text-zinc-500">•</span>
                <span>
                  <strong className="font-bold text-zinc-900 dark:text-zinc-100">GitHub Link & Live Demo Link</strong>{" "}
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">(Atleast one is required)</span>
                </span>
              </li>
            </ul>
          </div> 
        </div>
      </section>
      <FooterSection />
    </div>
  );
}




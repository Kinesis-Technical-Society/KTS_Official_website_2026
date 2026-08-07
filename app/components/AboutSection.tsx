export default function AboutSection() {
  return (
    <section
      id="about"
      className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.9fr]">
        <div className="flex flex-col gap-4 border-zinc-900/20 lg:border-r lg:pr-10 dark:border-zinc-200/15">
          <span className="h-12 w-1 bg-emerald-600" />
          <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
            Built by students,
            <br />
            for <span className="italic">builders</span>.
          </h2>
          <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-300"> 
            KTS is more than just a club — it's a community of driven individuals who are passionate about technology, eager to innovate, and always ready to learn.
          </p>
        </div>

        <div className="grid overflow-hidden border border-zinc-900/20 bg-white/70 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 dark:border-zinc-200/15 dark:bg-[#141414]/80 divide-y divide-zinc-900/20 sm:divide-y-0 sm:divide-x-0 dark:divide-zinc-200/15">

          {/* Web Development */}
          <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 sm:border-r lg:border-b-0 dark:border-zinc-200/15">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              01
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111]">
              🌐
            </span>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Web Development
            </h3>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Build modern, responsive, and scalable web applications from scratch.
            </p>
          </div>

          {/* Android */}
          <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 md:border-r lg:border-b-0 dark:border-zinc-200/15">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              02
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-[var(--accent-lavender)] text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111]">
              🤖
            </span>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Android Development
            </h3>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Create powerful Android applications with modern development tools.
            </p>
          </div>

          {/* UI/UX */}
          <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 sm:border-r lg:border-b-0 dark:border-zinc-200/15">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              03
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-[var(--accent-sky)] text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111]">
              🎨
            </span>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              UI/UX Design
            </h3>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Design intuitive, user-friendly interfaces with exceptional experiences.
            </p>
          </div>

          {/* Competitive Programming */}
          <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 lg:border-r lg:border-b-0 dark:border-zinc-200/15">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              04
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-[var(--accent-amber)] text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111]">
              🧩
            </span>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Competitive Programming
            </h3>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Strengthen problem-solving skills through coding contests and DSA.
            </p>
          </div>

          {/* Machine Learning */}
          <div className="flex flex-col gap-4 p-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              05
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-pink-300 text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111]">
              🤖
            </span>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Machine Learning
            </h3>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Explore AI models, data-driven solutions, and intelligent applications.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <div
      className="full-bleed border-2 border-[var(--section-border)] bg-background"
      style={{
        backgroundImage:
          "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 text-center sm:px-6 sm:pb-12 sm:pt-8">
        <h2 className="mb-3 font-display text-3xl font-bold text-[#121212] sm:text-4xl md:text-5xl lg:text-6xl dark:text-[#f3f2eb]">
          Don&apos;t be a stranger.
        </h2>
        <p className="mb-6 text-base font-medium text-[#4b5563] sm:text-lg dark:text-zinc-300">
          Got an idea? Want to code? Just say hi...
        </p>
        <a
          className="inline-block max-w-full truncate rounded-lg border-2 border-[#121212] bg-[#bcf954] px-5 py-2 text-lg font-bold text-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:shadow-[6px_6px_0px_0px_#121212] sm:px-6 sm:py-2.5 sm:text-xl dark:border-[#f3f2eb] dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white dark:hover:shadow-[6px_6px_0px_0px_#f3f2eb]"
          href="mailto:kts@kiet.edu"
        >
          kts@kiet.edu
        </a>
      </div>
    </div>
  );
}

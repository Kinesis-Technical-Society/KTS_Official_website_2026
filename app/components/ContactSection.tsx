export default function ContactSection() {
  return (
    <div
      className="full-bleed border-t-2 border-(--section-border) bg-background"
      style={{
        backgroundImage:
          "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-8 text-center">
        <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
          Don&apos;t be a stranger.
        </h2>
        <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
          Got an idea? Want to code? Just say hi...
        </p>
        <a
          className="inline-block rounded-lg border-2 border-[#121212] bg-[#bcf954] px-6 py-2 text-xl font-bold text-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:shadow-[6px_6px_0px_0px_#121212] dark:border-[#f3f2eb] dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white dark:hover:shadow-[6px_6px_0px_0px_#f3f2eb]"
          href="mailto:hello@kts.edu"
        >
          kts@kiet.edu
        </a>
      </div>
    </div>
  );
}

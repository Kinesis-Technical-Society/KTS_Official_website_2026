import Image from "next/image";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const contributors = [
    { name: "Yash Aggarwal", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Avanish Prasad", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Lakshay Jain", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Vashu Jain", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Gurkirat Kaur", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Yash Pratap Singh", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Raj Maurya", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Nivedita Arya", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Nitin Shukla", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Vaishnavi", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Piyush", role: "Member", linkedin: "https://www.linkedin.com" },
    { name: "Yash Singhal", role: "Member", linkedin: "https://www.linkedin.com" },
  ];
  const avatarColors = [
    "from-zinc-700 to-zinc-400",
    "from-emerald-500 to-emerald-200",
    "from-sky-500 to-sky-200",
    "from-amber-400 to-yellow-200",
    "from-rose-500 to-rose-200",
    "from-purple-500 to-purple-200",
    "from-indigo-500 to-indigo-200",
    "from-teal-500 to-teal-200",
    "from-fuchsia-500 to-fuchsia-200",
    "from-lime-500 to-lime-200",
    "from-orange-500 to-orange-200",
    "from-cyan-500 to-cyan-200",
  ];
  const getInitials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <main className="hero-grid flex-1">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-4 pb-0 pt-6 sm:px-6">
        <header className="hero-rise sticky top-4 z-40 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-zinc-900 bg-white/90 px-5 py-3 shadow-[0_4px_0_#111] backdrop-blur dark:border-zinc-200/30 dark:bg-[#151515]/90">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
              <Image
                src="/kts-logo.webp"
                alt="Kinesis Technical Society logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className="text-base font-semibold leading-tight tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-100">
              Kinesis Technical Society
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 md:flex dark:text-zinc-300">
            <a
              className="nav-link nav-underline-lime transition hover:text-zinc-900 dark:hover:text-white"
              href="#about"
            >
              About
            </a>
            <a
              className="nav-link nav-underline-sky transition hover:text-zinc-900 dark:hover:text-white"
              href="/team"
            >
              Team
            </a>
            <a
              className="nav-link nav-underline-lavender transition hover:text-zinc-900 dark:hover:text-white"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="nav-link nav-underline-amber transition hover:text-zinc-900 dark:hover:text-white"
              href="/event"
            >
              Events
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="rounded-xl border-2 border-zinc-900 bg-(--accent-lime) px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/40"
              type="button"
            >
              Contact
            </button>
          </div>
        </header>

        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="hero-rise hero-rise-delay-1 flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center rounded-lg border-2 border-[#121212] bg-white px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#121212] lg:self-start dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#bcf954]" />
              RECRUITING NOW
            </div>

            <h1 className="relative mb-2 font-display text-5xl font-bold uppercase leading-[0.9] text-[#121212] md:text-7xl lg:text-8xl dark:text-[#f3f2eb]">
              <svg
                className="absolute -left-8 -top-8 h-16 w-16 -z-10 text-[#3b82f6] opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  fillRule="evenodd"
                />
              </svg>
              THINK{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px var(--hero-stroke)" }}
              >
                LOUD.
              </span>
              <br />
              BUILD <span className="bg-[#bcf954] px-2">RAW.</span>
            </h1>

            <p className="max-w-lg font-sans text-lg leading-relaxed text-gray-700 md:text-xl lg:mx-0 dark:text-zinc-300">
              Kinesis Technical Society is the university's open source and
              innovation club. We turn ideas into real software, fix real
              problems, and ship real products.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                className="flex items-center justify-center gap-2 rounded-xl bg-[#121212] px-8 py-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#bcf954] transition-transform hover:-translate-y-0.5 dark:bg-[#f3f2eb] dark:text-[#121212]"
                href="#join"
              >
                <span>Join KTS</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h12" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#121212] bg-white px-8 py-4 text-lg font-bold shadow-[4px_4px_0px_0px_#121212] transition-all hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:text-[#121212] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white"
                href="#projects"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="hero-rise hero-rise-delay-2 relative lg:flex lg:flex-col lg:justify-end">
            <div className="hero-float pointer-events-none absolute -right-2 top-[45%] h-16 w-16 -translate-y-1/2 rounded-2xl border-2 border-zinc-900 bg-(--accent-lavender) text-zinc-900 shadow-[0_4px_0_#111] dark:border-zinc-200/40 dark:text-zinc-100">
              <div className="flex h-full items-center justify-center text-lg font-bold">
                &lt;/&gt;
              </div>
            </div>
            <div className="hero-float pointer-events-none absolute -left-24 bottom-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-900 bg-(--accent-sky) text-2xl font-bold text-zinc-900 shadow-[0_4px_0_#111] dark:border-zinc-200/40 dark:text-zinc-100">
              *
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border hero-ring-1" />
              <div className="pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border hero-ring-2" />
              <div className="pointer-events-none absolute left-1/2 top-[calc(42%-100px)] -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border hero-ring-3" />

              <div className="hero-float-slow relative rounded-3xl border-2 border-zinc-900 bg-white shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515]">
                <div className="flex items-center justify-between rounded-t-3xl border-b-2 border-zinc-900 bg-zinc-900 px-4 py-3 dark:border-zinc-200/20 dark:bg-[#0b0b0b]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-rose-400" />
                    <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-amber-300" />
                    <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-zinc-200 dark:text-zinc-100">
                    terminal.exe
                  </span>
                </div>
                <div className="space-y-3 px-5 py-6 font-mono text-xs text-zinc-600 dark:text-zinc-300">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    $ npm install kts-community
                  </p>
                  <p>
                    <span className="text-emerald-600">&gt;</span> Installing
                    packages...
                  </p>
                  <div className="h-2 rounded-full border-2 border-zinc-900 bg-zinc-100 dark:border-zinc-200/30 dark:bg-zinc-800">
                    <div className="h-full w-3/4 rounded-full bg-(--accent-lime)" />
                  </div>
                  <p className="text-emerald-600">Success! Welcome to KTS.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="full-bleed mt-10 border-y border-zinc-900/30 bg-white/80 dark:border-zinc-200/20 dark:bg-[#151515]/80">
          <div className="flex items-center gap-4 px-2 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:px-4 sm:text-xs dark:text-zinc-400">
            <span className="shrink-0 text-zinc-900 dark:text-zinc-100">What we do</span>
            <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
            <div className="strip-marquee relative flex-1 overflow-hidden">
              <div className="strip-track flex items-center gap-4 whitespace-nowrap pr-8">
                <span>Development</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Competitive Programming</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Machine Learning</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>DevOps & Cloud</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Web Engineering</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Hackathons</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Development</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Competitive Programming</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Machine Learning</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>DevOps & Cloud</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Web Engineering</span>
                <span aria-hidden className="h-4 w-px bg-zinc-900/30 dark:bg-zinc-200/20" />
                <span>Hackathons</span>
              </div>
            </div>
          </div>
        </div>

        <section className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1.6fr]">
            <div className="flex flex-col gap-6 border-zinc-900/20 lg:border-r lg:pr-10 dark:border-zinc-200/15">
              <span className="h-12 w-1 bg-emerald-600" />
              <h2 className="font-serif text-4xl leading-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
                Built by students,
                <br />
                for <span className="italic">builders</span>.
              </h2>
              <p className="max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-300">
                We are a society of builders who ship at 2 AM not because we
                have to, but because we love what we are creating. Every
                semester brings new cohorts, new projects, and new problems
                worth solving.
              </p>
            </div>

            <div className="grid overflow-hidden border border-zinc-900/20 bg-white/70 sm:grid-cols-2 dark:border-zinc-200/15 dark:bg-[#141414]/80">
              <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 sm:border-r dark:border-zinc-200/15">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
                  01
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-lime) text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/30">
                  &lt;&gt;
                </span>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Community
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Peer-to-peer learning over lectures. Our seniors mentor
                  juniors, and everyone contributes something back.
                </p>
              </div>
              <div className="flex flex-col gap-4 border-b border-zinc-900/20 p-6 dark:border-zinc-200/15">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
                  02
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-lavender) text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/30">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 9l-4 3 4 3" />
                    <path d="M16 9l4 3-4 3" />
                    <path d="M10 19l4-14" />
                  </svg>
                </span>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Open Source
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Everything we build is public. Real commits, real reviews,
                  real contributions to the global codebase.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 sm:border-r dark:border-zinc-200/15">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
                  03
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-sky) text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/30">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 17l6-6 4 4 7-7" />
                    <path d="M14 8h6v6" />
                  </svg>
                </span>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Ship Fast
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Ideas get two weeks before they go to production. Velocity,
                  iteration, and learning by doing.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-400">
                  04
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-zinc-900 bg-(--accent-amber) text-lg font-bold text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/30 dark:bg-(--accent-amber) dark:text-zinc-900">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9l-5.2 2.1 1-5.8-4.2-4.1 5.8-.8z" />
                  </svg>
                </span>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Excellence
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  We do not cut corners on quality. Reviews, documentation, and
                  testing are part of the culture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/20">
          <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[1.1fr_1fr]">
            <div className="relative flex items-center justify-center bg-background px-6 py-14 text-emerald-900 dark:text-emerald-200">
              <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-6 top-6 h-4 w-4 border-l border-t border-emerald-700/40 dark:border-emerald-400/60" />
                <span className="absolute right-6 top-6 h-4 w-4 border-r border-t border-emerald-700/40 dark:border-emerald-400/60" />
                <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l border-emerald-700/40 dark:border-emerald-400/60" />
                <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r border-emerald-700/40 dark:border-emerald-400/60" />
              </div>
              <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2 rounded-md border border-emerald-700/40 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-900 dark:border-emerald-400/50 dark:bg-black/70 dark:text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-(--accent-lime) shadow-[0_0_8px_rgba(188,249,84,0.8)]" />
                Live
              </div>
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-700/25 bg-white/85 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-emerald-400/20 dark:bg-black/80 dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(188,249,84,0.12),transparent_55%)]" />
                <img
                  src="/kts-showcase.gif"
                  alt="KTS showcase animation"
                  className="relative z-10 h-auto w-full rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-background px-8 py-14 text-zinc-900 sm:px-12 dark:text-zinc-100 lg:border-l lg:border-zinc-900/10 dark:lg:border-zinc-200/10">
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                <span className="h-px w-12 bg-zinc-300 dark:bg-zinc-600" />
                The culture
              </div>
              <h3 className="font-serif text-4xl leading-tight sm:text-5xl">
                This is what <span className="text-emerald-700 dark:text-emerald-300">2 AM</span>
                <br />
                looks like for us.
              </h3>
              <p className="text-sm leading-6 text-zinc-600 sm:text-base dark:text-zinc-300">
                Late-night debugging sessions. Tabs stacked 40 deep. A cold
                coffee. A monitor full of code that finally works. KTS is not a
                club you attend - it is a habit you develop.
              </p>
              <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                <li className="flex items-start gap-2">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  We ship on weekends, not just weekdays
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Every semester brings a new project from scratch
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Hackathons, open source, real internship prep
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                  Your setup could be next
                </li>
              </ul>
              <a
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-none border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_4px_0_#111]"
                href="#join"
              >
                <span>Join the late-night club</span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h12" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section
          className="full-bleed border-y-2 border-(--section-border) bg-background"
          style={{
            backgroundImage: "radial-gradient(var(--contact-dot) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-8 text-center">
            <h2 className="mb-4 font-display text-[36px] font-bold text-[#121212] md:text-[60px] dark:text-[#f3f2eb]">
              Don't be a stranger.
            </h2>
            <p className="mb-8 text-[18px] font-medium text-[#4b5563] dark:text-zinc-300">
              Got an idea? Want to code? Just saying hi?
            </p>
            <a
              className="inline-block rounded-lg border-2 border-[#121212] bg-[#bcf954] px-6 py-2 text-xl font-bold text-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#cbb6ff] hover:shadow-[6px_6px_0px_0px_#121212] dark:border-[#f3f2eb] dark:shadow-[4px_4px_0px_0px_#f3f2eb] dark:hover:bg-[#7c3aed] dark:hover:text-white dark:hover:shadow-[6px_6px_0px_0px_#f3f2eb]"
              href="mailto:hello@kts.edu"
            >
              hello@kts.edu
            </a>
          </div>

          <footer className="border-t-2 border-(--section-border) bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-600 sm:px-6 dark:text-zinc-400">
              <div className="grid w-full gap-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
                    <Image
                      src="/kts-logo.webp"
                      alt="Kinesis Technical Society logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Kinesis Technical Society
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                    Our Amazing Contributors
                  </span>
                  <div className="flex items-center -space-x-2">
                    {contributors.map((person, index) => (
                      <a
                        key={person.name}
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${person.name} - ${person.role}`}
                        className="group relative"
                      >
                        <div
                          className={`contrib-avatar flex items-center justify-center text-[11px] font-semibold text-white bg-linear-to-br ${avatarColors[index % avatarColors.length]}
                            }`}
                        >
                          {getInitials(person.name)}
                        </div>
                        <span className="pointer-events-none absolute -top-10 left-1/2 z-10 w-max -translate-x-1/2 rounded-lg border border-zinc-900/30 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 opacity-0 shadow-[0_6px_14px_rgba(0,0,0,0.15)] transition group-hover:opacity-100 dark:border-zinc-200/20 dark:bg-[#151515] dark:text-zinc-100">
                          {person.name}
                          <span className="ml-2 text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                            {person.role}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-zinc-700 dark:text-zinc-300 lg:justify-end">
                  <a className="icon-link icon-instagram" href="#" aria-label="Instagram">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="17" cy="7" r="1" />
                    </svg>
                  </a>
                  <a className="icon-link icon-linkedin" href="#" aria-label="LinkedIn">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    </svg>
                  </a>
                  <a className="icon-link icon-email" href="mailto:hello@kts.edu">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 6l8 6 8-6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

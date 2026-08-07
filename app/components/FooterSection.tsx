import Image from "next/image";
import contributors from "../data/contributors.json";
import Link from "next/link";

interface Contributor {
  name: string;
  role: string;
  linkedin: string;
}

export default function FooterSection() {
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
    <footer className="full-bleed border-y-2 border-(--section-border) bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-600 sm:px-6 dark:text-zinc-400">
        <div className="grid w-full gap-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:text-left">
          <Link href="/" className="cursor-pointer hover:bg-transparent hover:text-inherit">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515]">
                <Image
                  src="/kts-logo.png"
                  alt="Kinesis Technical Society logo"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Kinesis Technical Society
              </span>
            </div>
          </Link>
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
              Our Amazing Contributors
            </span>
            <div className="flex items-center -space-x-2">
              {(contributors as Contributor[]).map((person, index) => (
                <a
                  key={person.name}
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${person.name} - ${person.role}`}
                  className="group relative"
                >
                  <div
                    className={`contrib-avatar flex items-center justify-center text-[11px] font-semibold text-white bg-linear-to-br ${avatarColors[index % avatarColors.length]}`}
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
            <a
              className="icon-link icon-instagram"
              href="https://www.instagram.com/kinesis_technical_society/"
              aria-label="Instagram"
            >
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
            <a
              className="icon-link icon-linkedin"
              href="https://www.linkedin.com/company/kinesis-technical-society/"
              aria-label="LinkedIn"
            >
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
            <a className="icon-link icon-email" href="mailto:kts@kiet.edu">
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
            <a
              className="icon-link icon-twitter"
              href="https://x.com/kts_kiet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.29 19.494h2.039L6.486 3.24H4.298L17.61 20.647Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

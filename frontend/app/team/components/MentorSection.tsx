"use client";

import mentorsData from "../../data/mentors.json";

interface Person {
  name: string;
  role?: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  domain?: string;
  photo?: string;
}

const mentors: Person[] = mentorsData;

const domainColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200",
  "Design × Dev": "bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200",
  Product: "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
  Community: "bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200",
  Dean: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  "Faculty Coordinator": "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
};

const getInitials = (name?: string) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "KTS";

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
      <span>{number}</span>
      <span className="h-px w-10 bg-zinc-300 dark:bg-zinc-600" />
      <span>{label}</span>
    </div>
  );
}

function MentorCard({ person, index }: { person: Person; index: number }) {
  const gradients = [
    "from-violet-900 via-indigo-800 to-zinc-900",
    "from-emerald-900 via-teal-800 to-zinc-900",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative flex flex-col md:flex-row w-full rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden shadow-[0_6px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]">
      <div className={`relative w-full h-64 sm:h-72 md:h-auto md:w-48 lg:w-56 shrink-0 overflow-hidden min-h-[220px] sm:min-h-[260px] bg-linear-to-br ${gradient}`}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name || "Mentor"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-90 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold tracking-tight text-white/20 select-none">
              {getInitials(person.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-black/30 pointer-events-none" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 gap-4 min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 min-w-0 break-words">
              {person.name}
            </h3>
            {person.role && (() => {
              const cleanRole = person.role.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
              return (
                <span className={`w-fit shrink-0 rounded-lg border-2 border-zinc-900 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-[1px_1px_0_#111] transition-transform hover:-translate-y-0.5 dark:border-zinc-200/30 text-center leading-snug ${domainColors[cleanRole] ?? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"}`}>
                  {cleanRole === "Faculty Coordinator" ? (
                    <>
                      Faculty
                      <br />
                      Coordinator
                    </>
                  ) : (
                    cleanRole
                  )}
                </span>
              );
            })()}
          </div>
          {person.bio && (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 mt-1 break-words">
              {person.bio}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 mt-auto">
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lime) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
            >
              <LinkedInIcon className="h-4 w-4 shrink-0" />
              <span>LinkedIn</span>
            </a>
          )}
          {person.github && (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lavender) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
            >
              <GitHubIcon className="h-4 w-4 shrink-0" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MentorSection() {
  return (
    <section id="mentors" className="full-bleed border-b border-zinc-900/20 bg-background dark:border-zinc-200/15">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-8 sm:mb-12 flex flex-col gap-4 border-zinc-900/20 lg:flex-row lg:items-end lg:justify-between dark:border-zinc-200/15">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SectionLabel number="01" label="The Guides" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-zinc-900 dark:text-zinc-100">
              Our <span className="italic">Mentors.</span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              The people who&apos;ve been where we&apos;re going — guiding every semester&apos;s batch
              with experience, patience, and the occasional reality check.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 items-stretch">
          {mentors.map((m, i) => (
            <MentorCard key={m.name || i} person={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
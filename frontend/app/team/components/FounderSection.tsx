import foundersData from "../../data/founders.json";

interface Person {
  name: string;
  linkedin: string;
  photo?: string;
}

const founders: Person[] = foundersData;

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    </svg>
  );
}

function FounderCard({ person, index }: { person: Person; index: number }) {
  const gradients = [
    "from-violet-900 via-indigo-800 to-zinc-900",
    "from-emerald-900 via-teal-800 to-zinc-900",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div className="group relative flex flex-col w-full rounded-2xl sm:rounded-3xl border-2 border-zinc-900 bg-white overflow-hidden shadow-[0_4px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_4px_0_#000]">
      <div className={`relative h-48 sm:h-52 lg:h-44 xl:h-48 w-full overflow-hidden bg-linear-to-br ${gradient}`}>
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="h-full w-full object-cover object-[center_20%] opacity-90 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white/20 select-none">
              {person.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-3.5 xl:p-4 justify-between gap-3 min-w-0">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-base sm:text-lg lg:text-sm xl:text-base font-bold leading-snug text-zinc-900 dark:text-zinc-100 break-words">
            {person.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 pt-1 mt-auto">
          {person.linkedin && (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg sm:rounded-xl border-2 border-zinc-900 bg-zinc-100 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[1.5px_1.5px_0_#111] transition hover:-translate-y-0.5 hover:bg-(--accent-lime) dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[1.5px_1.5px_0_#000]"
            >
              <LinkedInIcon className="h-3.5 w-3.5 shrink-0" /> <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FounderSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-3 xl:gap-4 items-stretch">
      {founders.map((person, index) => (
        <FounderCard key={person.name} person={person} index={index} />
      ))}
    </div>
  );
}
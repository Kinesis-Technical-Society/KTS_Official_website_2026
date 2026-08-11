export interface FormattedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  linkedinUrl: string;
}

interface ProjectCardProps {
  project: FormattedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border-2 border-zinc-900 bg-white p-6 shadow-[0_6px_0_#111] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_0_#111] dark:border-zinc-200/30 dark:bg-[#151515] dark:shadow-[0_6px_0_#000]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="rounded-lg border-2 border-zinc-900 bg-[var(--accent-lime)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-[1px_1px_0_#111] dark:border-zinc-200/30">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {project.title}
        </h3>

        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-900/20 bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-700 dark:border-zinc-200/20 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-zinc-900/10 pt-4 dark:border-zinc-200/10">
        {project.linkedinUrl ? (
          <a
            href={project.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 min-w-[80px] items-center justify-center gap-1.5 rounded-xl border-2 border-zinc-900 bg-[#0a66c2] py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-[#084e96] dark:border-zinc-200/40 dark:shadow-[2px_2px_0_#000]"
          >
            <span>Owner</span>
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 min-w-[80px] items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-100 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 hover:bg-[var(--accent-lavender)] dark:border-zinc-200/30 dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[2px_2px_0_#000]"
          >
            GitHub
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 min-w-[80px] items-center justify-center gap-2 rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-[2px_2px_0_#111] transition hover:-translate-y-0.5 dark:border-zinc-200/30 dark:shadow-[2px_2px_0_#000]"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    </div>
  );
}

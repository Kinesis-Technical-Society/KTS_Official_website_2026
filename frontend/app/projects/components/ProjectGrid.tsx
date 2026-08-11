import { ProjectCard, FormattedProject } from "./ProjectCard";

interface ProjectGridProps {
  loading: boolean;
  projects: FormattedProject[];
}

export function ProjectGrid({ loading, projects }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-white dark:border-t-transparent" />
        <p className="mt-4 font-semibold text-zinc-700 dark:text-zinc-300">
          Loading projects...
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

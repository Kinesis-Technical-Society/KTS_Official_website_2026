import { ProjectItem } from "../../services/api";

interface ProjectListTabProps {
  projectSearchQuery: string;
  setProjectSearchQuery: (val: string) => void;
  projectDomainFilter: string;
  setProjectDomainFilter: (val: string) => void;
  projectDomains: string[];
  loadingProjects: boolean;
  filteredProjects: ProjectItem[];
  onEdit: (project: ProjectItem) => void;
  onDelete: (project: ProjectItem) => void;
}

export function ProjectListTab({
  projectSearchQuery,
  setProjectSearchQuery,
  projectDomainFilter,
  setProjectDomainFilter,
  projectDomains,
  loadingProjects,
  filteredProjects,
  onEdit,
  onDelete,
}: ProjectListTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search projects by title, tech stack..."
          value={projectSearchQuery}
          onChange={(e) => setProjectSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm transition-all"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
          <span className="text-zinc-500">Domain:</span>
          <select
            value={projectDomainFilter}
            onChange={(e) => setProjectDomainFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm cursor-pointer"
          >
            <option value="all">All Domains</option>
            {projectDomains.map((dom) => (
              <option key={dom} value={dom}>
                {dom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingProjects ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl text-zinc-500 font-mono text-xs">
          No projects found. Click &quot;+ Add Project&quot; to publish your first community project!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((proj) => {
            const techTags = Array.isArray(proj.techStack)
              ? proj.techStack
              : String(proj.techStack || "")
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);

            return (
              <div
                key={proj._id || proj.id}
                className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[var(--accent-lime)] text-zinc-950 border border-zinc-900/30">
                      {proj.domain}
                    </span>
                    {proj.linkedinUrl && (
                      <a
                        href={proj.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[12px] font-mono text-[#0a66c2] hover:underline"
                      >
                        🔗 Owner
                      </a>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                    {proj.githubLink || proj.githubUrl ? (
                      <a
                        href={proj.githubLink || proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white font-bold hover:underline"
                      >
                        GitHub ↗
                      </a>
                    ) : null}
                    {proj.liveLink || proj.liveUrl ? (
                      <a
                        href={proj.liveLink || proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
                      >
                        Live Demo ↗
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => onEdit(proj)}
                    className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(proj)}
                    className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { ProjectItem } from "../../services/api";

interface ProjectEditModalProps {
  project: ProjectItem;
  setProject: (project: ProjectItem | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ProjectEditModal({
  project,
  setProject,
  onSubmit,
  isSubmitting,
}: ProjectEditModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transition-colors">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Project</h2>
          <button
            type="button"
            onClick={() => setProject(null)}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Domain</label>
            <input
              type="text"
              required
              value={project.domain}
              onChange={(e) =>
                setProject({ ...project, domain: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-1">
              Tech Stack (Comma Separated)
            </label>
            <input
              type="text"
              required
              value={
                Array.isArray(project.techStack)
                  ? project.techStack.join(", ")
                  : project.techStack || ""
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  techStack: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 mb-1">
              LinkedIn Owner URL
            </label>
            <input
              type="url"
              required
              value={project.linkedinUrl || ""}
              onChange={(e) =>
                setProject({ ...project, linkedinUrl: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 mb-1">GitHub Link</label>
              <input
                type="url"
                value={project.githubLink || project.githubUrl || ""}
                onChange={(e) =>
                  setProject({ ...project, githubLink: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Live Link</label>
              <input
                type="url"
                value={project.liveLink || project.liveUrl || ""}
                onChange={(e) =>
                  setProject({ ...project, liveLink: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setProject(null)}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-xl font-bold uppercase bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

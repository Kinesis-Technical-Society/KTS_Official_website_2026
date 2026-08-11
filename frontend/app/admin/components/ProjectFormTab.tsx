interface ProjectFormTabProps {
  projectFormData: {
    title: string;
    description: string;
    techStack: string;
    domain: string;
    linkedinUrl: string;
    githubLink: string;
    liveLink: string;
  };
  setProjectFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      techStack: string;
      domain: string;
      linkedinUrl: string;
      githubLink: string;
      liveLink: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  isSubmittingProject: boolean;
}

export function ProjectFormTab({
  projectFormData,
  setProjectFormData,
  onSubmit,
  isSubmittingProject,
}: ProjectFormTabProps) {
  return (
    <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          🚀 Add New Project
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
          Publish a community project to showcase on the main Projects page.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="StudyNotion – LMS Platform"
              value={projectFormData.title}
              onChange={(e) =>
                setProjectFormData({
                  ...projectFormData,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Domain / Category *
            </label>
            <select
              value={projectFormData.domain}
              onChange={(e) =>
                setProjectFormData({
                  ...projectFormData,
                  domain: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] cursor-pointer"
            >
              <option value="Web Development">Web Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Android Development">Android Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Blockchain / Web3">Blockchain / Web3</option>
              <option value="Cloud / DevOps">Cloud / DevOps</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
            Description *
          </label>
          <textarea
            rows={3}
            required
            placeholder="Detailed overview of what the project does, key features, and tools used..."
            value={projectFormData.description}
            onChange={(e) =>
              setProjectFormData({
                ...projectFormData,
                description: e.target.value,
              })
            }
            className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Tech Stack (Comma Separated) *
            </label>
            <input
              type="text"
              required
              placeholder="React, Node.js, Tailwind, MongoDB"
              value={projectFormData.techStack}
              onChange={(e) =>
                setProjectFormData({
                  ...projectFormData,
                  techStack: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              LinkedIn Owner Profile URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://www.linkedin.com/in/username"
              value={projectFormData.linkedinUrl}
              onChange={(e) =>
                setProjectFormData({
                  ...projectFormData,
                  linkedinUrl: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>
        </div>

        {/* Links box with notice */}
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider text-[11px]">
              Project Links (GitHub / Live Demo)
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
              * At least ONE link is required (both allowed)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                GitHub Link
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={projectFormData.githubLink}
                onChange={(e) =>
                  setProjectFormData({
                    ...projectFormData,
                    githubLink: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                Live Link
              </label>
              <input
                type="url"
                placeholder="https://project.vercel.app"
                value={projectFormData.liveLink}
                onChange={(e) =>
                  setProjectFormData({
                    ...projectFormData,
                    liveLink: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmittingProject}
          className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer shadow-md"
        >
          {isSubmittingProject ? "Publishing Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";

interface TeamFormTabProps {
  teamFormData: {
    name: string;
    category: "core" | "coordinator";
    role: string;
    domain: string;
    photo: string;
    bio: string;
    linkedin: string;
    github: string;
  };
  setTeamFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      category: "core" | "coordinator";
      role: string;
      domain: string;
      photo: string;
      bio: string;
      linkedin: string;
      github: string;
    }>
  >;
  handleImageFileRead: (
    file: File,
    callback: (base64Url: string) => void
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmittingTeam: boolean;
}

export function TeamFormTab({
  teamFormData,
  setTeamFormData,
  handleImageFileRead,
  onSubmit,
  isSubmittingTeam,
}: TeamFormTabProps) {
  return (
    <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          👥 Add New Team Member
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
          Add core team members or coordinators to display on the Team page.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Member Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vaibhav Mishra"
              value={teamFormData.name}
              onChange={(e) =>
                setTeamFormData({ ...teamFormData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Category / Team Type *
            </label>
            <select
              value={teamFormData.category}
              onChange={(e) =>
                setTeamFormData({
                  ...teamFormData,
                  category: e.target.value as any,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] cursor-pointer"
            >
              <option value="coordinator">Coordinator</option>
              <option value="core">Core Team</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Role / Designation
            </label>
            <input
              type="text"
              placeholder="e.g. President / Web Lead / Coordinator / Faculty Coordinator"
              value={teamFormData.role}
              onChange={(e) =>
                setTeamFormData({ ...teamFormData, role: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Domain (for Coordinators)
            </label>
            <select
              value={teamFormData.domain}
              onChange={(e) =>
                setTeamFormData({ ...teamFormData, domain: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] cursor-pointer"
            >
              <option value="Web">Web Development</option>
              <option value="Android">Android Development</option>
              <option value="ML">Machine Learning / AI</option>
              <option value="DSA">DSA / CP</option>
              <option value="UI/UX">UI / UX Design</option>
              <option value="">None / General</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
            Short Bio
          </label>
          <textarea
            rows={3}
            placeholder="Brief bio or description..."
            value={teamFormData.bio}
            onChange={(e) =>
              setTeamFormData({ ...teamFormData, bio: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
          />
        </div>

        {/* Photo Upload / URL */}
        <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800">
          <label className="block text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs">
            Member Photo
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-[11px] text-zinc-500 mb-1">Upload .webp Image (&lt; 1MB)</span>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-dashed border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 hover:border-[#bcf954] text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all">
                <span className="text-xs font-semibold">Choose .webp File...</span>
                <input
                  type="file"
                  accept="image/webp,.webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageFileRead(file, (base64) =>
                        setTeamFormData((prev) => ({ ...prev, photo: base64 }))
                      );
                    }
                  }}
                />
              </label>
            </div>

            <div>
              <span className="block text-[11px] text-zinc-500 mb-1">Or Photo URL</span>
              <input
                type="text"
                placeholder="/coordinators/name.webp or https://..."
                value={teamFormData.photo}
                onChange={(e) =>
                  setTeamFormData({ ...teamFormData, photo: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/username"
              value={teamFormData.linkedin}
              onChange={(e) =>
                setTeamFormData({ ...teamFormData, linkedin: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={teamFormData.github}
              onChange={(e) =>
                setTeamFormData({ ...teamFormData, github: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmittingTeam}
          className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer shadow-md"
        >
          {isSubmittingTeam ? "Adding Member..." : "Add Team Member"}
        </button>
      </form>
    </div>
  );
}

import { TeamMemberItem } from "../../services/api";

interface TeamEditModalProps {
  member: TeamMemberItem;
  setMember: (member: TeamMemberItem | null) => void;
  handleImageFileRead: (
    file: File,
    callback: (base64Url: string) => void
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function TeamEditModal({
  member,
  setMember,
  handleImageFileRead,
  onSubmit,
  isSubmitting,
}: TeamEditModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transition-colors">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Team Member</h2>
          <button
            type="button"
            onClick={() => setMember(null)}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Name</label>
              <input
                type="text"
                required
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Category</label>
              <select
                value={member.category}
                onChange={(e) =>
                  setMember({
                    ...member,
                    category: e.target.value as any,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              >
                <option value="coordinator">Coordinator</option>
                <option value="core">Core Team</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Role / Designation</label>
              <input
                type="text"
                value={member.role || ""}
                onChange={(e) => setMember({ ...member, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Domain</label>
              <input
                type="text"
                value={member.domain || ""}
                onChange={(e) => setMember({ ...member, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">Bio</label>
            <textarea
              rows={3}
              value={member.bio || ""}
              onChange={(e) => setMember({ ...member, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
            />
          </div>

          {/* Photo */}
          <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800">
            <label className="block text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs">
              Photo
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
                          setMember({ ...member, photo: base64 })
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
                  value={member.photo || ""}
                  onChange={(e) => setMember({ ...member, photo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={member.linkedin || ""}
                onChange={(e) => setMember({ ...member, linkedin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">GitHub URL</label>
              <input
                type="url"
                value={member.github || ""}
                onChange={(e) => setMember({ ...member, github: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setMember(null)}
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

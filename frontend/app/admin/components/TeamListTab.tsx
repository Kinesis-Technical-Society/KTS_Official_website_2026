import { TeamMemberItem } from "../../services/api";

interface TeamListTabProps {
  teamSearchQuery: string;
  setTeamSearchQuery: (val: string) => void;
  teamCategoryFilter: string;
  setTeamCategoryFilter: (val: string) => void;
  loadingTeam: boolean;
  filteredMembers: TeamMemberItem[];
  onEdit: (member: TeamMemberItem) => void;
  onDelete: (member: TeamMemberItem) => void;
}

export function TeamListTab({
  teamSearchQuery,
  setTeamSearchQuery,
  teamCategoryFilter,
  setTeamCategoryFilter,
  loadingTeam,
  filteredMembers,
  onEdit,
  onDelete,
}: TeamListTabProps) {
  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "mentor":
        return "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30";
      case "core":
        return "bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-500/30";
      case "coordinator":
        return "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30";
      case "founder":
        return "bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-500/30";
      default:
        return "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search team members by name, role, domain..."
          value={teamSearchQuery}
          onChange={(e) => setTeamSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm transition-all"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono flex-wrap">
          <span className="text-zinc-500">Category:</span>
          <select
            value={teamCategoryFilter}
            onChange={(e) => setTeamCategoryFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="core">Core Team</option>
            <option value="coordinator">Coordinators</option>
          </select>
        </div>
      </div>

      {loadingTeam ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          Loading team members...
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl text-zinc-500 font-mono text-xs">
          No team members found. Click &quot;+ Add Member&quot; to add a team member!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member._id || member.id}
              className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 shrink-0">
                    No Photo
                  </div>
                )}

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${getCategoryBadgeClass(
                        member.category
                      )}`}
                    >
                      {member.category}
                    </span>
                    {member.domain && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {member.domain}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {member.role || "Member"}
                  </p>

                  {member.bio && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-1 text-xs font-mono">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0a66c2] hover:underline font-semibold"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-700 dark:text-zinc-300 hover:underline font-semibold"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onEdit(member)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(member)}
                  className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

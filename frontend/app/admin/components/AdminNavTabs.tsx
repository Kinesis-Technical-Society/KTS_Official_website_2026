export type AdminTab =
  | "list"
  | "create"
  | "projects-list"
  | "create-project"
  | "team-list"
  | "create-team";

interface AdminNavTabsProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  eventsCount: number;
  projectsCount: number;
  teamCount: number;
}

export function AdminNavTabs({
  activeTab,
  setActiveTab,
  eventsCount,
  projectsCount,
  teamCount,
}: AdminNavTabsProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-4 overflow-x-auto">
      <div className="flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-300/60 dark:border-zinc-800 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "list"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          📅 Events ({eventsCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("create")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "create"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          + Add Event
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("projects-list")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "projects-list"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          🚀 Projects ({projectsCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("create-project")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "create-project"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          + Add Project
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("team-list")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "team-list"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          👥 Team ({teamCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("create-team")}
          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "create-team"
              ? "bg-[#bcf954] text-zinc-950 shadow-md"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          + Add Member
        </button>
      </div>
    </div>
  );
}


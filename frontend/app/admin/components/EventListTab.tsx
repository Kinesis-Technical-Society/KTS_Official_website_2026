import { EventItem } from "../../services/api";

interface EventListTabProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  loadingEvents: boolean;
  filteredEvents: EventItem[];
  onEdit: (event: EventItem) => void;
  onDelete: (event: EventItem) => void;
}

export function EventListTab({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  loadingEvents,
  filteredEvents,
  onEdit,
  onDelete,
}: EventListTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs font-mono text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm transition-all"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
          <span className="text-zinc-500">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 dark:bg-[#141418] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] shadow-sm cursor-pointer"
          >
            <option value="all">All Events</option>
            <option value="brewing">Brewing Only</option>
            <option value="upcoming">Upcoming Only</option>
          </select>
        </div>
      </div>

      {loadingEvents ? (
        <div className="text-center py-12 text-zinc-500 font-mono text-sm">
          Loading events from database...
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl text-zinc-500 font-mono text-xs">
          No events found matching your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {filteredEvents.map((event) => (
            <div
              key={event._id || event.id}
              className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800/90 p-4 sm:p-5 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400 shrink-0">
                    No Image
                  </div>
                )}

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        event.status === "brewing"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-[#bcf954]/20 text-lime-800 dark:text-[#bcf954] border border-lime-600/30 dark:border-[#bcf954]/40"
                      }`}
                    >
                      {event.status}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                    {event.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => onEdit(event)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-100 transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(event)}
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

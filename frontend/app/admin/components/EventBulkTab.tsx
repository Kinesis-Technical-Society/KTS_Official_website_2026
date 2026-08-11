interface EventBulkTabProps {
  bulkJson: string;
  setBulkJson: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function EventBulkTab({
  bulkJson,
  setBulkJson,
  onSubmit,
  isSubmitting,
}: EventBulkTabProps) {
  return (
    <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          ⚡ Bulk Import Events
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
          Paste JSON array of event objects to add multiple events at once.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
        <textarea
          rows={10}
          required
          value={bulkJson}
          onChange={(e) => setBulkJson(e.target.value)}
          className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer shadow-md"
        >
          {isSubmitting ? "Importing..." : "Import Events"}
        </button>
      </form>
    </div>
  );
}

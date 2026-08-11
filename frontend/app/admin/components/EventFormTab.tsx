interface EventFormTabProps {
  formData: {
    title: string;
    date: string;
    status: "upcoming" | "brewing";
    description: string;
    location: string;
    moreInfoUrl: string;
    prize: string;
    tags: string;
    highlights: string;
    image: string;
    accent: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      date: string;
      status: "upcoming" | "brewing";
      description: string;
      location: string;
      moreInfoUrl: string;
      prize: string;
      tags: string;
      highlights: string;
      image: string;
      accent: string;
    }>
  >;
  handleImageFileRead: (
    file: File,
    callback: (base64Url: string) => void
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function EventFormTab({
  formData,
  setFormData,
  handleImageFileRead,
  onSubmit,
  isSubmitting,
}: EventFormTabProps) {
  return (
    <div className="bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm transition-colors">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          Publish New Event
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-mono">
          Fill in details to display on website banner and brewing section.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 text-xs font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="Kode Kombat 6.0"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Date *
            </label>
            <input
              type="text"
              required
              placeholder="March 15–20, 2026"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as any,
                })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            >
              <option value="brewing">Brewing (Now Brewing)</option>
              <option value="upcoming">Upcoming Event</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="KIET Campus, Ghaziabad"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>

          <div>
            <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
              Registration Link (URL)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.moreInfoUrl}
              onChange={(e) =>
                setFormData({ ...formData, moreInfoUrl: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
            Description *
          </label>
          <textarea
            rows={3}
            required
            placeholder="Event overview..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954]"
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#09090b] dark:border-zinc-800">
          <label className="block text-zinc-700 dark:text-zinc-300 font-bold uppercase tracking-wider text-xs">
            Event Cover Image
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-[11px] text-zinc-500 mb-1">
                Upload File
              </span>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-dashed border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 hover:border-[#bcf954] text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all">
                <span className="text-xs font-semibold">Choose File...</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageFileRead(file, (base64) =>
                        setFormData((prev) => ({ ...prev, image: base64 }))
                      );
                    }
                  }}
                />
              </label>
            </div>

            <div>
              <span className="block text-[11px] text-zinc-500 mb-1">
                Or Image URL
              </span>
              <input
                type="text"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all cursor-pointer pointer-events-auto shadow-md"
        >
          {isSubmitting ? "Publishing..." : "Publish Event"}
        </button>
      </form>
    </div>
  );
}

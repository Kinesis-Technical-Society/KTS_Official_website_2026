interface ProjectFilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ProjectFilterTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: ProjectFilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b-2 border-zinc-900/20 pb-4 dark:border-zinc-200/20">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={`rounded-xl border-2 border-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_#111] transition-all hover:-translate-y-0.5 dark:border-zinc-200/40 ${
            activeCategory === category
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-[#151515] dark:text-zinc-200 dark:hover:bg-zinc-800"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

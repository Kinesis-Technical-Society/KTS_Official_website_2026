import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 dark:border-zinc-800/80 dark:bg-[#121215]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-mono font-bold text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>← Home</span>
          </Link>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#bcf954] animate-pulse" />
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
              KTS Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono font-bold text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer pointer-events-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

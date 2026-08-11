import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

interface AdminLoginFormProps {
  emailInput: string;
  setEmailInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  authError: string;
  isLoggingIn: boolean;
  onLoginSubmit: (e: React.FormEvent) => void;
}

export function AdminLoginForm({
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  authError,
  isLoggingIn,
  onLoginSubmit,
}: AdminLoginFormProps) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#0c0c0e] dark:text-zinc-100 flex items-center justify-center p-4 relative transition-colors duration-200 font-sans">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white border border-zinc-200 dark:bg-[#141418] dark:border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all duration-200">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#bcf954] via-emerald-400 to-[#cbb6ff]" />

        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-600/30 bg-lime-500/10 dark:border-[#bcf954]/30 dark:bg-[#bcf954]/10 text-xs font-mono font-semibold uppercase tracking-widest text-lime-700 dark:text-[#bcf954] mb-4 hover:scale-105 transition-transform"
          >
            ← Back to KTS Website
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Log in to manage events & community projects.
          </p>
        </div>

        {authError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-mono text-center">
            ⚠️ {authError}
          </div>
        )}

        <form onSubmit={onLoginSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter admin email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-zinc-50 border border-zinc-300 text-zinc-900 dark:bg-[#09090b] dark:border-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bcf954] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 px-4 rounded-2xl font-bold uppercase tracking-wider bg-[#bcf954] text-zinc-950 hover:bg-[#a6e63e] transition-all shadow-[0_0_20px_rgba(188,249,84,0.3)] disabled:opacity-50 cursor-pointer pointer-events-auto mt-2"
          >
            {isLoggingIn ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>
      </div>
    </main>
  );
}

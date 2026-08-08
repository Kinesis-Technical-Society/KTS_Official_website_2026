"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", colorClass: "nav-underline-lime" },
    { name: "Team", href: "/team", colorClass: "nav-underline-sky" },
    { name: "Projects", href: "/projects", colorClass: "nav-underline-lavender" },
    { name: "Events", href: "/events", colorClass: "nav-underline-amber" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    return pathname === href;
  };

  return (
    <header className="hero-rise sticky top-4 z-50 flex flex-col gap-3 rounded-2xl border-2 border-zinc-900 bg-white/90 p-3 shadow-[0_4px_0_#111] backdrop-blur dark:border-zinc-200/30 dark:bg-[#151515]/90">
      <div className="flex items-center justify-between gap-4 px-1">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[0_3px_0_#111] transition group-hover:-translate-y-0.5 dark:border-zinc-200/40 dark:bg-[#151515]">
            <Image
              src="/kts-logo.webp"
              alt="Kinesis Technical Society logo"
              width={36}
              height={36}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          {/* <span className="text-base font-semibold leading-tight tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-100">
            Kinesis Technical Society
          </span> */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 md:flex dark:text-zinc-300">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${item.colorClass} transition hover:text-zinc-900 dark:hover:text-white ${
                  active ? "text-zinc-900 font-bold dark:text-white border-b-2 border-zinc-900 dark:border-zinc-100" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="mailto:kts@kiet.edu"
            className="hidden rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 md:block dark:border-zinc-200/40"
          >
            Contact
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white p-2 shadow-[0_3px_0_#111] transition active:translate-y-0.5 md:hidden dark:border-zinc-200/40 dark:bg-[#151515] dark:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="flex flex-col gap-3 rounded-xl border-2 border-zinc-900 bg-white p-4 shadow-[0_4px_0_#111] md:hidden dark:border-zinc-200/30 dark:bg-[#1a1a1a]">
          <nav className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    active ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <a
            href="mailto:hello@kts.edu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-1 block w-full rounded-xl border-2 border-zinc-900 bg-[var(--accent-lime)] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-zinc-900 shadow-[0_3px_0_#111] transition active:translate-y-0.5 dark:border-zinc-200/40"
          >
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}


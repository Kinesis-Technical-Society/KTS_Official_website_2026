"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";

export default function NotFound() {
  const [gifError, setGifError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#ffffff] dark:bg-[#0f0f0c] text-zinc-900 dark:text-[#f3f2eb] transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(var(--grid-dot) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <Navbar />
      </div>

      {/* Main 404 Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 max-w-4xl mx-auto w-full">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-zinc-900 dark:border-zinc-200/40 bg-[#b7f04a] text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[0_3px_0_#111] dark:shadow-[0_3px_0_rgba(255,255,255,0.2)] mb-6 animate-bounce">
          <span>⚠️ ERR_404_PAGE_NOT_FOUND</span>
        </div>

        {/* Dynamic GIF / Funny Meme Section */}
        <div className="relative group my-4 max-w-md w-full aspect-video sm:aspect-square max-h-[320px] rounded-2xl border-4 border-zinc-900 dark:border-zinc-200/40 bg-zinc-100 dark:bg-zinc-900/90 p-3 shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_rgba(255,255,255,0.15)] overflow-hidden transition-all duration-300 hover:scale-[1.02]">
          {!gifError ? (
            <Image
              src="/404-funny.gif"
              alt="404 Funny Animation"
              fill
              unoptimized
              className="object-cover rounded-xl"
              onError={() => setGifError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-amber-400/20 via-purple-500/20 to-lime-400/20 rounded-xl border border-dashed border-zinc-400 dark:border-zinc-700">
              <div className="text-5xl sm:text-6xl mb-3 animate-wiggle">🤖 💥</div>
              <h3 className="font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 mb-1">
                404: Lost in Cyberspace!
              </h3> 
            </div>
          )}

          {/* Accent Badge on Image */}
          <div className="absolute bottom-4 right-4 bg-zinc-900/90 text-[#b7f04a] text-[10px] font-mono uppercase px-2.5 py-1 rounded-md border border-[#b7f04a]/40 backdrop-blur">
            KTS_404_BOT
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-zinc-900 dark:text-white mt-4 mb-2">
          4<span className="text-[#b7f04a] drop-shadow-[0_4px_0_#111] dark:drop-shadow-none">0</span>4
        </h1>

        <p className="text-lg sm:text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-3">
          Whoops! You&apos;ve ventured off the map.
        </p>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg mb-8 leading-relaxed">
          The page you are looking for might have not been found in the KTS servers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xs sm:max-w-md">
          <Link
            href="/"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-zinc-900 dark:border-zinc-100 bg-[#b7f04a] text-zinc-900 font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_0_#111] dark:shadow-[0_4px_0_#fff] transition-all hover:-translate-y-1 hover:shadow-[0_6px_0_#111] dark:hover:shadow-[0_6px_0_#fff] active:translate-y-0 active:shadow-none"
          >
            <span>⚡ Back to Homepage</span>
          </Link>

          <Link
            href="/events"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-zinc-900 dark:border-zinc-200/40 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_0_#111] dark:shadow-[0_4px_0_rgba(255,255,255,0.2)] transition-all hover:-translate-y-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:translate-y-0 active:shadow-none"
          >
            <span>📅 Browse Events</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10 w-full">
        <FooterSection />
      </div>
    </div>
  );
}

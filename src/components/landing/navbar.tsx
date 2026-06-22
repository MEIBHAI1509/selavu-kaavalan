"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <h1 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
            செலவுக் காவலன்
          </h1>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <a href="#features">Features</a>
          <a href="#stats">Stats</a>
          <a href="#cta">Get Started</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-4 py-2"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
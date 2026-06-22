"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            🇮🇳 Tamil Personal Finance Platform
          </span>

          <h1 className="mt-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-6xl font-bold text-transparent md:text-8xl">
            செலவுக் காவலன்
          </h1>

          <h2 className="mt-6 text-3xl font-semibold text-white md:text-5xl">
            Track Every Rupee.
            <br />
            Build Every Dream.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400">
            Manage expenses, wallets, budgets, savings goals and
            recurring investments from a single dashboard.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-700 px-8 py-4">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
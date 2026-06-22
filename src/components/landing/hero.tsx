export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 py-28">
                <div className="max-w-4xl">
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                        🇮🇳 தமிழ் நிதி மேலாண்மை
                    </span>

                    <h1 className="mt-8 text-6xl font-bold tracking-tight">
                        செலவுக் காவலன்
                    </h1>

                    <h2 className="mt-4 text-3xl text-zinc-400">
                        Track Every Rupee.
                        Build Every Dream.
                    </h2>

                    <p className="mt-8 max-w-2xl text-lg text-zinc-500">
                        Manage expenses, budgets, wallets,
                        investments and savings goals
                        from a single dashboard.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black">
                            Get Started
                        </button>

                        <button className="rounded-xl border border-zinc-700 px-6 py-3">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
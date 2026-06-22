export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <span className="text-green-400 font-semibold">
            Selavu Kaavalan
          </span>

          <h1 className="mt-4 text-6xl font-bold">
            Your Personal Expense Guardian
          </h1>

          <p className="mt-6 text-xl text-zinc-400">
            Track expenses, manage wallets, monitor budgets,
            and achieve your financial goals.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-lg bg-green-500 px-6 py-3 font-medium text-black">
              Get Started
            </button>

            <button className="rounded-lg border border-zinc-700 px-6 py-3">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
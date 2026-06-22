const stats = [
    { value: "10K+", label: "Transactions" },
    { value: "5+", label: "Wallet Types" },
    { value: "100%", label: "Privacy" },
    { value: "24/7", label: "Access" },
  ];
  
  export default function Stats() {
    return (
      <section id="stats" className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-[#0f172a] p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-emerald-400">
                {stat.value}
              </h3>
  
              <p className="mt-2 text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
import {
    Wallet,
    Receipt,
    PiggyBank,
    Goal,
    BarChart3,
    Repeat,
  } from "lucide-react";
  
  const features = [
    {
      icon: Receipt,
      title: "Expense Tracking",
      description: "Track every expense with categories and filters.",
    },
    {
      icon: Wallet,
      title: "Wallet Management",
      description: "Manage cash, bank accounts and UPI balances.",
    },
    {
      icon: PiggyBank,
      title: "Budget Planning",
      description: "Create monthly budgets and control spending.",
    },
    {
      icon: Goal,
      title: "Financial Goals",
      description: "Track savings goals and achievements.",
    },
    {
      icon: Repeat,
      title: "Recurring Investments",
      description: "Manage SIP, EMI, RD and FD payments.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Powerful charts and financial insights.",
    },
  ];
  
  export default function Features() {
    return (
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Powerful Features
          </h2>
  
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6 transition hover:border-emerald-500/30"
                >
                  <Icon className="mb-4 h-10 w-10 text-emerald-400" />
  
                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>
  
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
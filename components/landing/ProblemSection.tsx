import { PhoneMissed, Clock, TrendingDown, Users, Banknote, AlertCircle } from "lucide-react";

const problems = [
  { icon: PhoneMissed, title: "Missed Leads", desc: "Every missed call is a missed revenue opportunity." },
  { icon: Users, title: "Manual Calling", desc: "Your sales team spends hours dialing instead of closing." },
  { icon: Clock, title: "Slow Follow-ups", desc: "Leads go cold when follow-ups are delayed by hours or days." },
  { icon: Banknote, title: "High Operational Cost", desc: "Scaling human call centers is expensive and difficult." },
  { icon: AlertCircle, title: "Limited Working Hours", desc: "You lose international leads due to timezone differences." },
  { icon: TrendingDown, title: "Poor Customer Response", desc: "Customers hate waiting in long IVR queues." },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Stop Losing Customers Because Nobody Answered The Phone
          </h2>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Abstract Illustration */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-red-100/50 dark:bg-red-900/20 blur-3xl" />
              <div className="relative h-full w-full rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col items-center justify-center text-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mb-6 shadow-inner">
                  <PhoneMissed className="h-10 w-10 animate-pulse" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600 shadow-md dark:bg-zinc-800">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">3 Missed Calls Today</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Potential revenue lost: $4,500</p>
                
                <div className="mt-8 w-full space-y-3">
                  <div className="h-12 w-full rounded-xl bg-white shadow-sm dark:bg-zinc-950 flex items-center px-4 gap-3 opacity-50">
                     <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                     <div className="flex-1 h-3 rounded bg-zinc-100 dark:bg-zinc-800" />
                     <span className="text-xs text-red-500 font-medium">Missed</span>
                  </div>
                  <div className="h-12 w-full rounded-xl bg-white shadow-sm dark:bg-zinc-950 flex items-center px-4 gap-3 opacity-30">
                     <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                     <div className="flex-1 h-3 rounded bg-zinc-100 dark:bg-zinc-800" />
                     <span className="text-xs text-red-500 font-medium">Missed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {problems.map((problem) => {
                const Icon = problem.icon;
                return (
                  <div key={problem.title} className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-red-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-red-900/50">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-red-50 group-hover:text-red-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-red-900/30 dark:group-hover:text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {problem.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#6C4CF1]/10 to-indigo-500/10 p-6 border border-[#6C4CF1]/20">
               <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                 <span className="text-[#6C4CF1] font-bold">CallingGen</span> solves these challenges by automating your entire voice communication stack with intelligent AI agents.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { PhoneMissed, Clock, TrendingDown, Users, Banknote, AlertCircle, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value, prefix = "", suffix = "", duration = 3 }: { value: number, prefix?: string, suffix?: string, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(value * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const problems = [
  { icon: PhoneMissed, title: "Missed Leads", desc: "62% of calls to SMBs go unanswered. Every missed call is a missed revenue opportunity going straight to competitors." },
  { icon: Users, title: "Manual Calling Burnout", desc: "Your sales team spends 40% of their day dialing instead of closing. High turnover due to repetitive tasks." },
  { icon: Clock, title: "Slow Follow-ups", desc: "Leads go cold within 5 minutes. Delaying follow-ups by hours guarantees a massive drop in conversion rates." },
  { icon: Banknote, title: "Exorbitant Hiring Costs", desc: "Scaling human call centers requires hiring, training, benefits, and management. It's expensive and slow." },
  { icon: AlertCircle, title: "After-Hours Revenue Loss", desc: "Customers expect 24/7 support. You lose significant international and after-hours business." },
  { icon: TrendingDown, title: "No CRM Hygiene", desc: "Sales reps hate data entry. Crucial conversation details are forgotten, leading to poor customer experience." },
];

export default function ProblemSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              Stop Losing Revenue Because Nobody Answered The Phone
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Traditional calling methods are fundamentally broken. They are slow, expensive, and leak revenue at every stage of the customer journey.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Visual Data Representation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-5/12 perspective-1000"
          >
            <div className="relative rounded-3xl border border-red-200 bg-white p-8 shadow-2xl dark:border-red-900/30 dark:bg-zinc-950 overflow-hidden transform-gpu rotate-y-6 rotate-x-6">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-red-500/10 blur-[80px]" />
              
              <div className="relative z-10 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-2">
                    <PhoneMissed className="h-6 w-6" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Missed Calls (Monthly)</h3>
                  </div>
                  <div className="text-5xl font-black text-zinc-900 dark:text-white">
                    <AnimatedCounter value={432} />
                    <ArrowUpRight className="inline-block h-8 w-8 text-red-500 ml-2 animate-pulse" />
                  </div>
                </div>

                <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

                <div>
                  <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 mb-2">
                    <Banknote className="h-6 w-6" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Est. Revenue Lost</h3>
                  </div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500 drop-shadow-sm">
                    <AnimatedCounter value={124800} prefix="$" />
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-100 dark:bg-red-950/30 dark:border-red-900/50">
                  <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                    That's enough to hire 2 full-time employees, completely lost to competitors simply due to missed connections.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Problem Cards Grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {problems.map((problem, idx) => {
                const Icon = problem.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={problem.title} 
                    className="group relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-red-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-red-900/50 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="h-16 w-16 rounded-full bg-red-500/5 blur-2xl" />
                    </div>
                    <div className="relative z-10">
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-red-50 group-hover:text-red-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-red-900/30 dark:group-hover:text-red-400 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {problem.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

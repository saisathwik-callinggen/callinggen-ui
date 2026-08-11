"use client";

import { motion } from "framer-motion";
import { Clock, PhoneOff, TrendingUp, PiggyBank, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Runs 24/7",
    desc: "Never miss a lead, even after hours.",
  },
  {
    icon: PhoneOff,
    title: "No Manual Dialing",
    desc: "No manual dialing or hiring needed.",
  },
  {
    icon: TrendingUp,
    title: "Scales Instantly",
    desc: "10 or 10,000 calls, same setup.",
  },
  {
    icon: PiggyBank,
    title: "Affordable",
    desc: "A fraction of the cost of hiring a calling team.",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    desc: "Get analytics on every call instantly.",
  }
];

export default function WhyCallingGenSection() {
  return (
    <section className="bg-white py-24 sm:py-32 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              Why Choose CallingGen
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex items-center gap-4 rounded-2xl bg-zinc-50 p-6 border border-zinc-100 shadow-sm transition-all hover:border-[#4F6BFF]/30 dark:bg-zinc-900/50 dark:border-zinc-800 ${index === 3 ? "lg:col-start-1 lg:col-span-1 lg:translate-x-1/2" : ""} ${index === 4 ? "lg:col-start-2 lg:col-span-1 lg:translate-x-1/2" : ""}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4F6BFF]/10 text-[#4F6BFF] transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

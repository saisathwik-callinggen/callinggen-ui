"use client";

import { motion } from "framer-motion";
import { Home, Calculator, ShieldCheck, Megaphone, GraduationCap } from "lucide-react";

const industries = [
  {
    icon: Home,
    name: "Real Estate",
    description: "Follow up every lead instantly.",
  },
  {
    icon: Calculator,
    name: "Tax Consultancies",
    description: "Automate document reminders.",
  },
  {
    icon: ShieldCheck,
    name: "Insurance",
    description: "Pre-qualify policies 24/7.",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing Agencies",
    description: "Convert ad leads into booked meetings.",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Handle student enrollments automatically.",
  }
];

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-24 sm:py-32 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              Industries We Serve
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all hover:border-[#4F6BFF]/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 ${index === 3 ? "lg:col-start-1 lg:col-span-1 lg:translate-x-1/2" : ""} ${index === 4 ? "lg:col-start-2 lg:col-span-1 lg:translate-x-1/2" : ""}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-600 shadow-sm transition-colors group-hover:text-[#4F6BFF] dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                  <Icon className="h-6 w-6" />
                </div>
                
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white leading-tight mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {industry.description}
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
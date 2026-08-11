"use client";

import { motion } from "framer-motion";
import { PlusCircle, Rocket, Bot } from "lucide-react";

const workflowSteps = [
  { icon: PlusCircle, title: "Create a Campaign", desc: "Add your contacts and script in minutes." },
  { icon: Rocket, title: "Launch", desc: "Hit launch, no manual dialing needed." },
  { icon: Bot, title: "Calls Happen Automatically", desc: "CallingGen handles the rest and reports results." },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              How It Works
            </h2>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connecting Line (Horizontal) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 hidden lg:block z-0" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 relative z-10">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-2 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:-top-6 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-sm font-bold text-white dark:text-zinc-900 border-4 border-zinc-50 dark:border-zinc-950 z-20 shadow-sm transition-colors duration-300">
                    {index + 1}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border-2 border-[#4F6BFF] text-[#4F6BFF] shadow-lg mb-6 z-10 transition-transform hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Content Box */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 w-full h-full shadow-sm transition-colors duration-300">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                       {step.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                       {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

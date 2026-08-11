"use client";

import { motion } from "framer-motion";
import { Mic, Settings2, RefreshCcw, LayoutDashboard, MessageCircle, Globe } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "AI Voice Calling",
    desc: "Natural-sounding automated calls."
  },
  {
    icon: Settings2,
    title: "Smart Campaign Builder",
    desc: "Set up a campaign in a few clicks."
  },
  {
    icon: RefreshCcw,
    title: "Auto-Dial & Auto-Retry",
    desc: "Calls happen automatically, retries missed ones."
  },
  {
    icon: LayoutDashboard,
    title: "Real-Time Dashboard",
    desc: "Track calls, leads, and results live."
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Follow-ups",
    desc: "Auto-send WhatsApp messages after calls."
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    desc: "Reach customers in their preferred language."
  }
];

export default function Features() {
  return (
    <section id="features" className="bg-zinc-50 py-24 sm:py-32 dark:bg-zinc-900/50 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              Features
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full items-start">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-colors duration-300 group-hover:bg-[#4F6BFF] group-hover:text-white dark:bg-zinc-900 dark:text-zinc-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {feature.desc}
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
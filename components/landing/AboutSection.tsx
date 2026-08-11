"use client";

import { motion } from "framer-motion";
import { Bot, PhoneOff, TrendingUp } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              About CallingGen
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6 font-medium">
              CallingGen provides AI-powered calling automation for businesses that need to scale their outreach. Manual calling teams are expensive, slow, and can't scale efficiently, meaning missed follow-ups and lost leads. With CallingGen, businesses can run calling campaigns automatically, at scale, and 24/7 without needing extra staff.
            </p>
          </motion.div>

          {/* Right: Simple Icon Set */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 max-w-sm mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4F6BFF]/10 flex items-center justify-center text-[#4F6BFF]">
                <Bot className="w-6 h-6" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">AI-Powered Automation</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <PhoneOff className="w-6 h-6" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">Stop Missing Leads</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-white">Scale Without Staff</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-zinc-50 py-24 dark:bg-zinc-950 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              Simple, Usage-Based Pricing
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Only pay for the minutes your AI agents actually spend on the phone. No hidden fees.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center items-center gap-3"
          >
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors focus:outline-none"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-[#4F6BFF] transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-2 ${isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
              Annually <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Save 20%</span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none flex flex-col"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Starter</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              Perfect for small teams testing the waters with AI voice.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black text-zinc-900 dark:text-white">$0</span>
              <span className="text-zinc-500 font-medium">/mo + $0.12/min</span>
            </div>
            <button className="w-full py-3 px-6 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors mb-8">
              Start Free Trial
            </button>
            <ul className="space-y-4 mt-auto">
              {['1 Concurrent Call', 'Standard Voices', 'Basic Analytics', 'Email Support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111] dark:bg-zinc-900 rounded-[2rem] p-8 sm:p-10 border-2 border-[#4F6BFF] shadow-2xl shadow-[#4F6BFF]/20 flex flex-col relative transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-[#4F6BFF] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
            <p className="text-sm text-zinc-400 mb-6 border-b border-zinc-800 pb-6">
              For growing businesses scaling their outbound operations.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black text-white">${isAnnual ? '99' : '129'}</span>
              <span className="text-zinc-400 font-medium">/mo + $0.09/min</span>
            </div>
            <button className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF] hover:opacity-90 transition-opacity mb-8 shadow-lg shadow-[#4F6BFF]/25">
              Get Started
            </button>
            <ul className="space-y-4 mt-auto">
              {['10 Concurrent Calls', 'Premium Cloneable Voices', 'Advanced API Access', 'CRM Integrations', 'Priority Support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check className="w-5 h-5 text-[#4F6BFF] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none flex flex-col"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Enterprise</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              Custom limits and dedicated infrastructure for large scale.
            </p>
            <div className="mb-6">
              <span className="text-4xl font-black text-zinc-900 dark:text-white">Custom</span>
              <span className="text-zinc-500 font-medium"> Volume</span>
            </div>
            <button className="w-full py-3 px-6 rounded-xl font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 hover:border-[#4F6BFF] dark:hover:border-[#4F6BFF] transition-colors mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4 mt-auto">
              {['Unlimited Concurrency', 'Custom Voice Models', 'Volume Discounts ($0.05/min)', 'Dedicated Slack Channel', 'SLA Guarantee'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

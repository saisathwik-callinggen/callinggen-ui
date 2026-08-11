"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 font-sans text-zinc-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 py-24 sm:py-32 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] opacity-10 blur-[120px] dark:opacity-[0.05]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl mb-6">
                Simple, transparent pricing
              </h1>
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Choose the right plan to automate your customer conversations and scale your business.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Starter Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 flex flex-col transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Starter</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Perfect for small teams getting started with AI voice.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">₹XXXX</span>
                <span className="text-zinc-500 dark:text-zinc-400"> / Month</span>
                <p className="mt-2 text-sm font-semibold text-[#4F6BFF]">500 Calling Credits</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Basic Dashboard",
                  "Email Support"
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block w-full rounded-full border-2 border-zinc-200 bg-transparent py-3 px-4 text-center text-sm font-bold text-zinc-900 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:text-white dark:hover:border-zinc-700">
                Choose Plan
              </Link>
            </motion.div>

            {/* Growth Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl border-2 border-[#4F6BFF] bg-white p-8 shadow-2xl dark:bg-zinc-900 flex flex-col relative transform md:-translate-y-4 transition-colors"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6BFF] px-4 py-1 text-xs font-bold text-white uppercase tracking-wider">
                Most Popular
              </div>
              <div className="mb-8 mt-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Growth</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Everything you need to automate workflows at scale.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">₹XXXX</span>
                <span className="text-zinc-500 dark:text-zinc-400"> / Month</span>
                <p className="mt-2 text-sm font-semibold text-[#4F6BFF]">2000 Calling Credits</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "WhatsApp Integration",
                  "Real-Time Dashboard",
                  "Priority Support"
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    <Check className="h-5 w-5 shrink-0 text-[#4F6BFF]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block w-full rounded-full bg-[#4F6BFF] hover:bg-[#6c82ff] py-3 px-4 text-center text-sm font-bold text-white transition-all shadow-lg shadow-[#4F6BFF]/30">
                Choose Plan
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 flex flex-col transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Custom / Enterprise</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Custom solutions for large organizations and call centers.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">Contact Us</span>
                <p className="mt-2 text-sm font-semibold text-[#4F6BFF]">Unlimited Credits</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "All Features Unlocked",
                  "Dedicated Account Manager",
                  "Custom Integrations"
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    <Check className="h-5 w-5 shrink-0 text-purple-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full rounded-full border-2 border-zinc-200 bg-transparent py-3 px-4 text-center text-sm font-bold text-zinc-900 transition-all hover:border-zinc-300 dark:border-zinc-800 dark:text-white dark:hover:border-zinc-700">
                Contact Sales
              </Link>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
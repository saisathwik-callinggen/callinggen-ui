"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Hi, I'm calling from CallingGen. How can I help you automate your business today?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column (Copy & CTA) */}
          <div className="text-center lg:text-left lg:col-span-6 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl mb-6">
                Launch AI Calling Campaigns in Minutes
              </h1>
              
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0">
                CallingGen automates calls so businesses can run 24/7 without hiring a calling team.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-2 rounded-full bg-[#4F6BFF] px-8 py-4 text-base font-bold text-white overflow-hidden transition-transform hover:scale-105 shadow-lg shadow-[#4F6BFF]/30"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </Link>
                
                <Link
                  href="/#workflow"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-transparent px-8 py-4 text-base font-bold text-zinc-900 dark:text-white transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <Play className="h-4 w-4 fill-current" />
                  See How It Works
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Visual) */}
          <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[2rem] bg-zinc-900 border border-zinc-800 p-6 shadow-2xl aspect-[4/3] flex flex-col justify-end overflow-hidden"
            >
              {/* Abstract Glowing Orbs */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#7B61FF]/30 blur-[80px] rounded-full pointer-events-none animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#4F6BFF]/30 blur-[80px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

              {/* Floating Cards Mockup */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                 
                 {/* Live Call Card */}
                 <div className="self-end bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-64 shadow-2xl transform translate-x-4 -rotate-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">Live Campaign</span>
                      </div>
                      <span className="text-xs text-white/60">Active</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-2/3 rounded-full" />
                    </div>
                 </div>

              </div>

              {/* Transcript box at the bottom */}
              <div className="relative z-20 w-full rounded-xl bg-black/40 backdrop-blur-md border border-white/10 p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-3 bg-[#4F6BFF] rounded-full animate-[bounce_1s_infinite]" />
                    <div className="w-1.5 h-4 bg-[#7B61FF] rounded-full animate-[bounce_1.2s_infinite]" />
                    <div className="w-1.5 h-2 bg-[#4F6BFF] rounded-full animate-[bounce_0.8s_infinite]" />
                  </div>
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">AI Speaking</span>
                </div>
                <p className="text-sm text-white font-medium h-10">
                  {typedText}
                  <span className="inline-block w-1 h-4 ml-1 bg-[#4F6BFF] animate-pulse" />
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
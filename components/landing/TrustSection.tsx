"use client";

import { Building2, Globe2, Briefcase, Landmark, MonitorSmartphone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
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
    <span ref={ref} className="font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-white">
      {count}{suffix}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section className="bg-white py-16 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-10">
          Trusted by Industry Leaders
        </p>
        
        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-24 opacity-60 dark:opacity-50">
          <div className="flex items-center gap-2 text-zinc-800 transition-all hover:text-[#4F6BFF] dark:text-zinc-200">
            <Building2 className="h-7 w-7" />
            <span className="text-xl font-black tracking-tighter uppercase">Acme Corp</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800 transition-all hover:text-[#4F6BFF] dark:text-zinc-200">
            <Globe2 className="h-7 w-7" />
            <span className="text-xl font-black tracking-tighter uppercase">GlobalTech</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800 transition-all hover:text-[#4F6BFF] dark:text-zinc-200">
            <Briefcase className="h-7 w-7" />
            <span className="text-xl font-black tracking-tighter uppercase">Nexus CRM</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800 transition-all hover:text-[#4F6BFF] dark:text-zinc-200">
            <Landmark className="h-7 w-7" />
            <span className="text-xl font-black tracking-tighter uppercase">FirstBank</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800 transition-all hover:text-[#4F6BFF] dark:text-zinc-200">
            <MonitorSmartphone className="h-7 w-7" />
            <span className="text-xl font-black tracking-tighter uppercase">AppFlow</span>
          </div>
        </div>

        {/* Animated Statistics */}
        <div className="mt-24 grid grid-cols-2 gap-8 lg:grid-cols-4 sm:gap-12 rounded-3xl bg-zinc-50/50 p-8 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50">
          <div className="flex flex-col items-center text-center gap-2">
            <AnimatedCounter value={10} suffix="M+" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Calls Processed</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <AnimatedCounter value={250} suffix="+" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Businesses</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <AnimatedCounter value={98} suffix="%" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Customer Satisfaction</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <AnimatedCounter value={35} suffix="%" />
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Lower Op. Costs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

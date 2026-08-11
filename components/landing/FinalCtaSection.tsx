"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCtaSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]">
      {/* Intense Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF] opacity-40 blur-[150px] mix-blend-screen pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-white tracking-wide uppercase">Spots open for beta access</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Stop losing leads. <br className="hidden sm:block"/>
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF]">automating</span> today.
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-zinc-400 mb-12">
            Join 500+ innovative companies using CallingGen to scale their revenue without scaling their headcount.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/#demo"
              className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-base font-bold text-black overflow-hidden w-full sm:w-auto transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <PhoneCall className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Book Your Demo</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
              
              {/* Button Glow Drop Shadow */}
              <div className="absolute inset-0 -z-10 rounded-full bg-white blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/login"
              className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-5 text-base font-bold text-white backdrop-blur-md transition-all w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
          
          <p className="mt-8 text-sm text-zinc-500">
            No credit card required for demo. Setup takes less than 10 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

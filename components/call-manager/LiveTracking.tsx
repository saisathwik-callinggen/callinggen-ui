import React from "react";
import { Crosshair, Clock, Zap, CheckCircle2 } from "lucide-react";
import { LiveTrackingStats } from "./types";

interface LiveTrackingProps {
  stats: LiveTrackingStats;
  layout?: "vertical" | "horizontal";
}

export default function LiveTracking({ stats, layout = "vertical" }: LiveTrackingProps) {
  const steps = [
    { 
      key: "registry", 
      label: "REGISTRY", 
      value: stats.registry, 
      sub: "Input detected",
      icon: Crosshair, 
      color: "text-rose-500",
      bgLight: "bg-rose-100 ring-rose-200",
      bgDark: "dark:bg-rose-500/10 dark:ring-rose-500/30",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.1)] dark:shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    },
    { 
      key: "standby", 
      label: "STANDBY", 
      value: stats.standby, 
      sub: "Waiting in queue",
      icon: Clock, 
      color: "text-amber-500",
      bgLight: "bg-amber-100 ring-amber-200",
      bgDark: "dark:bg-amber-500/10 dark:ring-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    },
    { 
      key: "dialer", 
      label: "DIALER", 
      value: stats.dialer, 
      sub: "Active dialing",
      icon: Zap, 
      color: "text-cyan-500",
      bgLight: "bg-cyan-100 ring-cyan-200",
      bgDark: "dark:bg-cyan-500/10 dark:ring-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.1)] dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    },
    { 
      key: "analysis", 
      label: "ANALYSIS", 
      value: stats.analysis, 
      sub: "Finished calls",
      icon: CheckCircle2, 
      color: "text-purple-500",
      bgLight: "bg-purple-100 ring-purple-200",
      bgDark: "dark:bg-purple-500/10 dark:ring-purple-500/30",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.1)] dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    },
  ];



  if (layout === "horizontal") {
    return (
      <div className="flex w-full flex-col rounded-3xl bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/20 dark:bg-zinc-900/60 dark:border-white/10 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </div>
            <span className="text-xs font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase">Live Journey</span>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            Mission Control /
          </div>
        </div>

        {/* Pipeline Area */}
        <div className="relative flex items-center justify-between w-full py-2">
          
          {/* Horizontal Continuous Background Line */}
          <div className="absolute top-1/2 left-[5%] right-[20%] -mt-[1px] h-[2px] bg-gradient-to-r from-rose-400 via-cyan-400 to-purple-500 z-0 opacity-40 dark:opacity-80" />

          {/* Horizontal Steps */}
          <div className="flex flex-1 justify-between gap-4 z-10 pr-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`flex w-[160px] flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:hover:bg-zinc-800 ${step.glow}`}>
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${step.bgLight} ${step.bgDark}`}>
                      <Icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      {step.label}
                    </p>
                    <p className={`mt-0.5 text-2xl font-black ${step.color}`}>
                      {step.value}
                    </p>
                    <p className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500 truncate w-full text-center">
                      {step.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcomes Branching Area (Right side) */}
          <div className="relative flex flex-col justify-center gap-4 z-10 border-l-2 border-purple-400/30 dark:border-purple-500/40 pl-8">
            {/* Completed Card */}
            <div className="relative flex flex-col items-center justify-center w-[120px] rounded-2xl border border-white/40 bg-white/70 py-4 backdrop-blur-xl shadow-sm dark:border-white/10 dark:bg-zinc-900/70 hover:scale-105 transition-all cursor-default">
              <div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
              <p className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase mt-1">
                Completed
              </p>
            </div>

            {/* No Answer Card */}
            <div className="relative flex flex-col items-center justify-center w-[120px] rounded-2xl border border-white/40 bg-white/70 py-4 backdrop-blur-xl shadow-sm dark:border-white/10 dark:bg-zinc-900/70 hover:scale-105 transition-all cursor-default">
              <div className="absolute left-0 top-1/2 h-1/2 w-1 -translate-y-1/2 rounded-r-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <p className="text-xl font-black text-blue-600 dark:text-blue-400">{stats.failed}</p>
              <p className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase mt-1">
                No Answer
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl border border-white/20 dark:bg-zinc-900/60 dark:border-white/10 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/30">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </div>
          <span className="text-xs font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase">Live Journey</span>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
          Mission Control /
        </div>
      </div>

      {/* Center the pipeline vertically */}
      <div className="flex flex-1 flex-col items-center justify-center py-4 w-full">
        
        {/* Main Pipeline Area */}
        <div className="relative flex flex-col items-center w-full max-w-[240px]">
          
          {/* Continuous Gradient Background Line - precisely aligned behind icons */}
          <div className="absolute left-1/2 top-6 bottom-[10px] -ml-[1px] w-[2px] bg-gradient-to-b from-rose-400 via-cyan-400 to-purple-500 z-0 opacity-40 dark:opacity-80" />

          {/* Vertical Steps */}
          <div className="flex flex-col gap-5 w-full z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`flex w-[200px] flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/70 p-4 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:hover:bg-zinc-800 ${step.glow}`}>
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${step.bgLight} ${step.bgDark}`}>
                      <Icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      {step.label}
                    </p>
                    
                    <p className={`mt-0.5 text-2xl font-black ${step.color}`}>
                      {step.value}
                    </p>
                    
                    <p className="text-[9px] font-medium text-zinc-400 dark:text-zinc-500">
                      {step.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcomes Branching Area */}
          <div className="relative mt-5 flex w-[280px] justify-between gap-4 z-10">
            
            {/* SVG curves connecting the central line to the cards */}
            <div className="absolute -top-5 left-1/2 w-[180px] -translate-x-1/2 h-5 z-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 180 20" preserveAspectRatio="none">
                <path d="M90 0 C90 10 40 10 40 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400/50 dark:text-purple-500/80" />
                <path d="M90 0 C90 10 140 10 140 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400/50 dark:text-purple-500/80" />
              </svg>
            </div>

            {/* Completed Card */}
            <div className="relative flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/70 py-3.5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:hover:bg-zinc-800 shadow-sm cursor-default">
              <div className="absolute top-0 h-1 w-1/2 rounded-b-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
              <p className="text-[8px] font-bold tracking-wider text-zinc-500 uppercase mt-0.5">
                Completed
              </p>
            </div>

            {/* No Answer Card */}
            <div className="relative flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/70 py-3.5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:hover:bg-zinc-800 shadow-sm cursor-default">
              <div className="absolute top-0 h-1 w-1/2 rounded-b-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <p className="text-xl font-black text-blue-600 dark:text-blue-400">{stats.failed}</p>
              <p className="text-[8px] font-bold tracking-wider text-zinc-500 uppercase mt-0.5">
                No Answer
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

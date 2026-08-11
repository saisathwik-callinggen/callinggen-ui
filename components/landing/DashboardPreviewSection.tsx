"use client";

import { Activity, Users, PhoneCall, TrendingUp, Mic, FileText, CheckCircle2, ChevronRight, BarChart3, Database, Workflow, Settings, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPreviewSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-950 sm:py-32 overflow-hidden relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] opacity-20 blur-[120px] dark:opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              Command Central for Voice AI
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Track every campaign in real time from one simple dashboard.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-[1000px] mt-10 perspective-1000"
        >
          {/* MacBook Frame */}
          <div className="relative rounded-[2rem] bg-zinc-900 p-2 sm:p-4 shadow-2xl ring-1 ring-white/10 mx-auto w-full max-w-[900px] transform-gpu">
             
            {/* Screen Inner Bezel */}
            <div className="relative rounded-[1.5rem] bg-black overflow-hidden border border-zinc-800 flex flex-col">
               
              {/* Webcam Notch / Top bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-black rounded-b-xl z-20 flex justify-center items-center">
                 <div className="w-2 h-2 rounded-full bg-zinc-800/80" />
              </div>

              {/* Fake Browser/App Header */}
              <div className="h-10 w-full bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2 z-10">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-zinc-700" />
                   <div className="w-3 h-3 rounded-full bg-zinc-700" />
                   <div className="w-3 h-3 rounded-full bg-zinc-700" />
                 </div>
              </div>

              {/* Dark Mode UI Mockup */}
              <div className="bg-[#0a0a0a] text-white w-full h-[350px] sm:h-[500px] flex text-sm overflow-hidden relative">
                
                {/* Sidebar */}
                <div className="w-16 sm:w-56 bg-[#111] border-r border-zinc-800/50 flex flex-col py-6 shrink-0">
                  <div className="px-4 mb-8 hidden sm:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] flex items-center justify-center">
                      <span className="font-black text-white text-xs">CG</span>
                    </div>
                    <span className="font-bold text-base tracking-tight text-white">CallingGen</span>
                  </div>
                  <nav className="flex-1 space-y-2 px-2 sm:px-4">
                    {[
                      { icon: Activity, label: "Overview", active: true },
                      { icon: PhoneCall, label: "Campaigns" },
                      { icon: Database, label: "Contacts" },
                      { icon: BarChart3, label: "Analytics" },
                      { icon: Workflow, label: "Workflows" },
                      { icon: Settings, label: "Settings" }
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ${item.active ? 'bg-[#4F6BFF]/10 text-[#4F6BFF] border border-[#4F6BFF]/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium hidden sm:block">{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Overview</h1>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:block text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                        System Status: All Systems Operational
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Active Calls", value: "124", trend: "+12%", icon: PhoneCall, color: "text-blue-400", bg: "bg-blue-400/10" },
                      { label: "Meetings Booked", value: "853", trend: "+24%", icon: CalendarCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                      { label: "Avg. Duration", value: "4m 12s", trend: "-5%", icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" },
                      { label: "Success Rate", value: "68%", trend: "+2%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#111] border border-zinc-800/50 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
                        {/* Glow */}
                        <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} blur-2xl rounded-full -mr-8 -mt-8`} />
                        <div className="flex items-center justify-between">
                          <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          </div>
                          <span className="text-xs font-bold text-emerald-400">{stat.trend}</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Main Charts Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Big Chart */}
                    <div className="lg:col-span-2 bg-[#111] border border-zinc-800/50 rounded-xl p-6 h-[250px] flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-zinc-200">Call Volume vs Conversions</h3>
                      </div>
                      <div className="flex-1 w-full bg-gradient-to-t from-[#4F6BFF]/10 to-transparent border-b border-[#4F6BFF]/30 relative rounded-md overflow-hidden">
                        <svg className="absolute bottom-0 w-full h-full drop-shadow-[0_0_8px_rgba(79,107,255,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0 100 L 10 70 L 30 85 L 50 30 L 70 50 L 90 20 L 100 25" fill="none" stroke="#4F6BFF" strokeWidth="3" />
                        </svg>
                      </div>
                    </div>

                    {/* Live Feed */}
                    <div className="bg-[#111] border border-zinc-800/50 rounded-xl p-6 h-[250px] overflow-hidden flex flex-col">
                      <h3 className="text-sm font-bold text-zinc-200 mb-4">Live Activity</h3>
                      <div className="flex-1 space-y-3 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <div>
                                <p className="text-xs font-medium text-white">Call with +1 (555) 012...</p>
                                <p className="text-[10px] text-zinc-500">Sales Agent (James)</p>
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-400">Now</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Macbook bottom base */}
            <div className="h-4 sm:h-6 w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-b-3xl mx-auto border-t border-zinc-700/50 flex justify-center" />
            <div className="h-1 w-1/6 bg-zinc-950 mx-auto rounded-b-md" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

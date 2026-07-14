import { Activity, Users, PhoneCall, TrendingUp, Mic, FileText, CheckCircle2 } from "lucide-react";

export default function DashboardPreviewSection() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-950 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Everything You Need, In One Place
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A beautiful, intuitive dashboard that gives you complete control over your AI voice operations, analytics, and campaigns.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
           {/* Abstract Dashboard UI Mockup */}
           <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950/50 overflow-hidden backdrop-blur-sm">
             {/* Header */}
             <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white px-6 py-4 dark:border-zinc-800/80 dark:bg-zinc-900">
                <div className="flex items-center gap-6">
                  <div className="h-6 w-24 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="hidden sm:flex gap-4">
                     <div className="h-4 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
                     <div className="h-4 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
                     <div className="h-4 w-16 rounded bg-[#6C4CF1]/20" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                </div>
             </div>

             {/* Body */}
             <div className="flex">
               {/* Sidebar */}
               <div className="hidden w-64 flex-col gap-4 border-r border-zinc-200/80 p-6 dark:border-zinc-800/80 sm:flex">
                  <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-4 w-full rounded bg-[#6C4CF1]/10 border border-[#6C4CF1]/20" />
                  <div className="h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800" />
               </div>
               
               {/* Main Content */}
               <div className="flex-1 p-6 sm:p-8 space-y-8">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                     <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-500 mb-3">
                           <TrendingUp className="h-4 w-4 text-emerald-500" />
                           <span className="text-xs font-semibold uppercase tracking-wider">Revenue</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">$124,500</div>
                     </div>
                     <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-500 mb-3">
                           <PhoneCall className="h-4 w-4 text-[#6C4CF1]" />
                           <span className="text-xs font-semibold uppercase tracking-wider">Total Calls</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">45,210</div>
                     </div>
                     <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-500 mb-3">
                           <Users className="h-4 w-4 text-amber-500" />
                           <span className="text-xs font-semibold uppercase tracking-wider">Leads Gen</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">8,430</div>
                     </div>
                     <div className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-500 mb-3">
                           <Activity className="h-4 w-4 text-blue-500" />
                           <span className="text-xs font-semibold uppercase tracking-wider">Active Agents</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">12</div>
                     </div>
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                     {/* Chart Area */}
                     <div className="col-span-1 lg:col-span-2 rounded-xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 h-64 flex flex-col justify-between">
                       <div className="flex justify-between items-center mb-4">
                         <div className="h-5 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
                         <div className="h-5 w-16 rounded bg-zinc-100 dark:bg-zinc-800" />
                       </div>
                       <div className="flex-1 w-full bg-gradient-to-t from-[#6C4CF1]/10 to-transparent border-b-2 border-[#6C4CF1] relative">
                         {/* Abstract line chart */}
                         <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0 100 L 10 80 L 30 90 L 50 40 L 70 60 L 90 20 L 100 30" fill="none" stroke="#6C4CF1" strokeWidth="2" />
                         </svg>
                       </div>
                     </div>
                     
                     {/* Call Feed */}
                     <div className="col-span-1 rounded-xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="h-5 w-24 rounded bg-zinc-100 dark:bg-zinc-800 mb-6" />
                        <div className="space-y-4">
                           {[1, 2, 3, 4].map((i) => (
                             <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="h-8 w-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                                      <Mic className="h-4 w-4 text-zinc-400" />
                                   </div>
                                   <div>
                                      <div className="h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800 mb-1" />
                                      <div className="h-2 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                                   </div>
                                </div>
                                <div className="h-6 w-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-center">
                                   <span className="text-[10px] text-emerald-600 font-bold">SUCCESS</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             </div>
           </div>

           {/* Gradient glow */}
           <div className="absolute top-1/2 left-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#6C4CF1] to-purple-400 opacity-20 blur-[100px] dark:opacity-10" />
        </div>
      </div>
    </section>
  );
}

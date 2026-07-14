import { ArrowRight, CheckCircle2, Play, Users, PhoneCall, TrendingUp, Globe2, Activity } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 dark:bg-zinc-950 lg:pt-40 lg:pb-28">
      {/* Background Gradients */}
      <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[1000px] -translate-x-1/2 opacity-30 mix-blend-multiply blur-3xl dark:opacity-20">
        <div className="absolute left-1/2 top-0 h-full w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#6C4CF1] to-transparent opacity-50 blur-[100px]" />
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-[#8b75f2] to-transparent opacity-40 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left lg:w-1/2 lg:pr-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              <span>🚀</span>
              <span className="hidden sm:inline">AI Voice Calling Platform for Modern Businesses</span>
              <span className="sm:hidden">AI Voice Calling Platform</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              AI Voice Agents That <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C4CF1] to-[#a28af7]">
                Call, Talk, Follow Up
              </span>
              <br className="hidden lg:block" /> & Convert Customers Automatically
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
              CallingGen enables businesses to automate outbound calls, inbound customer support, lead qualification, appointment booking, multilingual conversations, and follow-up campaigns using human-like AI voice agents.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#demo"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#6C4CF1] px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-[#6C4CF1]/25 transition-all hover:bg-[#5b3ce0] hover:shadow-2xl hover:shadow-[#6C4CF1]/30 hover:-translate-y-0.5"
              >
                Book Free Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-base font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800/80"
              >
                Login
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {[
                "Human-like AI",
                "Multi-language",
                "CRM Integration",
                "Secure Platform",
                "24/7 Availability",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#6C4CF1]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Abstract UI Mockup */}
          <div className="relative lg:w-1/2">
            <div className="relative rounded-2xl border border-zinc-200/50 bg-white/40 p-2 shadow-2xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/40 sm:p-4">
              
              {/* Main Dashboard Card */}
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-5 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
                </div>
                
                {/* Body */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Top Stats */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-900 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-2">
                          <Activity className="h-4 w-4 text-[#6C4CF1]" />
                          <span className="text-xs font-semibold uppercase tracking-wider">Live Calls</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">124</div>
                     </div>
                     <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-900 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-2">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-semibold uppercase tracking-wider">Success Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">48.2%</div>
                     </div>
                  </div>

                  {/* Active Agents List */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Active AI Agents</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Sales Outreach Bot", status: "Calling", progress: "75%", color: "bg-[#6C4CF1]" },
                        { name: "Support Receptionist", status: "Listening", progress: "100%", color: "bg-emerald-500" },
                      ].map((agent, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                           <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full ${agent.color} flex items-center justify-center shadow-inner`}>
                                <PhoneCall className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{agent.name}</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-400">{agent.status}</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden hidden sm:block">
                                <div className={`h-full ${agent.color}`} style={{ width: agent.progress }} />
                              </div>
                              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">{agent.progress}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Card 1 */}
              <div className="absolute -left-6 top-1/4 animate-bounce-slow rounded-xl border border-white/40 bg-white/80 p-3 shadow-xl backdrop-blur-md dark:border-zinc-700/50 dark:bg-zinc-900/80 sm:-left-12 sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Globe2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Languages</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">30+ Supported</div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Card 2 */}
              <div className="absolute -right-4 bottom-1/4 animate-bounce-slow rounded-xl border border-white/40 bg-white/80 p-3 shadow-xl backdrop-blur-md dark:border-zinc-700/50 dark:bg-zinc-900/80 sm:-right-8" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <Play className="h-5 w-5 text-amber-600 dark:text-amber-400 ml-0.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Today's Calls</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">12,450+</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Server, Zap, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          {/* Left: Illustration */}
          <div className="lg:w-1/2">
             <div className="relative aspect-video rounded-3xl bg-white shadow-xl dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#6C4CF1_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] dark:opacity-[0.1]" />
                
                <div className="relative flex w-full items-center justify-between">
                  {/* Cloud Node */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 shadow-inner dark:bg-zinc-900">
                      <Server className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Platform</span>
                  </div>

                  {/* Connection Line */}
                  <div className="flex-1 px-4 relative">
                     <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-[#6C4CF1] shadow-sm dark:bg-zinc-950">
                        <Zap className="h-4 w-4 text-[#6C4CF1]" />
                     </div>
                  </div>

                  {/* AI Node */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C4CF1] to-[#8b75f2] shadow-lg shadow-[#6C4CF1]/20">
                      <ShieldCheck className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[#6C4CF1] uppercase tracking-widest">AI Engine</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Text */}
          <div className="lg:w-1/2 lg:pl-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
              AI Voice Automation Built For Modern Businesses
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
              CallingGen is a state-of-the-art cloud platform designed to completely automate your customer communication. Powered by advanced conversational AI, it handles complex workflows effortlessly.
            </p>
            
            <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Zero Infrastructure Required.</strong> Everything runs securely in the cloud with enterprise-grade reliability.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Seamless Scalability.</strong> Whether you need to make 100 calls a day or 100,000, our AI scales instantly to meet demand.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-zinc-100">Data Privacy First.</strong> All conversations and analytics are encrypted and securely stored in compliance with industry standards.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Bot, FileText, Phone, Rocket, Headphones, PieChart } from "lucide-react";

const steps = [
  { icon: Bot, title: "Create AI Agent", desc: "Select a voice and persona." },
  { icon: FileText, title: "Train With Data", desc: "Upload PDFs, FAQs, or Website." },
  { icon: Phone, title: "Connect Number", desc: "Buy or port a phone number." },
  { icon: Rocket, title: "Launch Campaign", desc: "Set schedule and upload leads." },
  { icon: Headphones, title: "AI Talks", desc: "Agent makes human-like calls." },
  { icon: PieChart, title: "View Analytics", desc: "Track ROI and transcripts." },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-white py-24 dark:bg-zinc-950 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Go Live In Minutes, Not Months
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A seamless workflow designed to get your AI voice operations up and running instantly.
          </p>
        </div>

        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#6C4CF1]/30 to-transparent" />
           
           <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center relative group">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#6C4CF1]/20 dark:bg-zinc-900 dark:ring-zinc-800">
                       <Icon className="h-10 w-10 text-[#6C4CF1]" />
                    </div>
                    
                    {/* Step Number Badge */}
                    <div className="absolute top-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#6C4CF1] text-sm font-bold text-white shadow-md ring-4 ring-white dark:ring-zinc-950">
                       {index + 1}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-[200px]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </section>
  );
}

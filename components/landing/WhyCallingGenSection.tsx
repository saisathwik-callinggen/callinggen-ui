import { Clock, ShieldCheck, Zap, Activity, Users, Settings, Database, Cloud, Star, Layers } from "lucide-react";

const reasons = [
  { icon: Clock, title: "24/7 AI Availability" },
  { icon: Users, title: "Human-like Conversations" },
  { icon: Layers, title: "Scalable Infrastructure" },
  { icon: Cloud, title: "Secure Cloud Platform" },
  { icon: Zap, title: "Easy Integrations" },
  { icon: Activity, title: "Powerful Analytics" },
  { icon: Settings, title: "Custom AI Agents" },
  { icon: ShieldCheck, title: "Fast Deployment" },
  { icon: Star, title: "White Label" },
  { icon: Database, title: "Enterprise Ready" },
];

export default function WhyCallingGenSection() {
  return (
    <section className="border-t border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Why Choose CallingGen?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            The most reliable and advanced AI voice platform on the market.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div 
                key={reason.title} 
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 text-center transition-colors hover:border-[#6C4CF1]/30 hover:bg-[#6C4CF1]/5 dark:border-zinc-800/50 dark:bg-zinc-900 dark:hover:border-[#6C4CF1]/30"
              >
                <Icon className="h-8 w-8 text-[#6C4CF1]" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{reason.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

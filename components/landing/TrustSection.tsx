import { Building2, Globe2, Briefcase, Landmark, MonitorSmartphone } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Trusted by Growing Businesses Worldwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {/* Placeholder Logos */}
          <div className="flex items-center gap-2 text-zinc-400 grayscale transition-all hover:grayscale-0 dark:text-zinc-500">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Acme Corp</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 grayscale transition-all hover:grayscale-0 dark:text-zinc-500">
            <Globe2 className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">GlobalTech</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 grayscale transition-all hover:grayscale-0 dark:text-zinc-500">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Nexus CRM</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 grayscale transition-all hover:grayscale-0 dark:text-zinc-500">
            <Landmark className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">FirstBank</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 grayscale transition-all hover:grayscale-0 dark:text-zinc-500">
            <MonitorSmartphone className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">AppFlow</span>
          </div>
        </div>
      </div>
    </section>
  );
}

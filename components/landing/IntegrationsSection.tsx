import { Database, MessageCircle, Webhook, Code, Calendar, FileSpreadsheet, Phone, PlusCircle } from "lucide-react";

export default function IntegrationsSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Connects With Your Favorite Tools
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Database className="h-6 w-6 text-blue-500" />
            <span className="font-semibold tracking-tight">CRM Systems</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <MessageCircle className="h-6 w-6 text-green-500" />
            <span className="font-semibold tracking-tight">WhatsApp</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Webhook className="h-6 w-6 text-purple-500" />
            <span className="font-semibold tracking-tight">Webhooks</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Code className="h-6 w-6 text-zinc-800 dark:text-zinc-100" />
            <span className="font-semibold tracking-tight">REST API</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Calendar className="h-6 w-6 text-yellow-500" />
            <span className="font-semibold tracking-tight">Google Calendar</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <FileSpreadsheet className="h-6 w-6 text-emerald-500" />
            <span className="font-semibold tracking-tight">Excel / CSV</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Phone className="h-6 w-6 text-indigo-500" />
            <span className="font-semibold tracking-tight">Phone Providers</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <PlusCircle className="h-6 w-6" />
            <span className="font-semibold tracking-tight">Custom Integrations</span>
          </div>
        </div>
      </div>
    </section>
  );
}

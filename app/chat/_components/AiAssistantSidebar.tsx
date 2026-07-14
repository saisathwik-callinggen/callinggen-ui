import { Brain, FileText, Send, Calendar, Settings, Sparkles, ChevronDown } from "lucide-react";
import { mockAiContext } from "../_mockData";

export default function AiAssistantSidebar() {
  return (
    <div className="flex h-full w-full flex-col border-l border-zinc-200 bg-[#f8f9fa] dark:border-zinc-800 dark:bg-[#111b21] sm:w-80 lg:w-96">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-[#202c33]">
        <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">
          <Brain className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          AI Assistant
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Context Analysis */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <FileText className="h-3.5 w-3.5" />
            Context Analysis
          </h3>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#202c33]">
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                Last Call Outcome
              </span>
              <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                "{mockAiContext.lastCallOutcome}"
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-800/50">
              <div>
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                  Intent
                </span>
                <p className="mt-0.5 font-semibold text-green-600 dark:text-green-400">
                  {mockAiContext.intent}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                  Budget
                </span>
                <p className="mt-0.5 font-semibold text-green-600 dark:text-green-400">
                  {mockAiContext.budget}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#202c33] dark:text-zinc-300 dark:hover:bg-[#2a3942]">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-500" />
                Send Brochure
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#202c33] dark:text-zinc-300 dark:hover:bg-[#2a3942]">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-500" />
                Share Pricing
              </span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#202c33] dark:text-zinc-300 dark:hover:bg-[#2a3942]">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-violet-500" />
                Schedule Visit
              </span>
            </button>
          </div>
        </div>

        {/* Smart Templates */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Smart Templates
          </h3>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#202c33]">
            <button className="flex w-full items-center justify-between rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-[#2a3942] dark:text-zinc-200">
              Follow-up after call
              <ChevronDown className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs italic text-zinc-600 dark:text-zinc-400">
              "Hi Rahul, as discussed during our call, I'm sharing the updated inventory for North Delhi. Let me know if you'd like to visit this weekend."
            </p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-[#2a3942] dark:text-zinc-200 dark:hover:bg-zinc-700">
                Schedule
              </button>
              <button className="flex-1 rounded-lg bg-violet-600 py-2 text-xs font-semibold text-white transition hover:bg-violet-700">
                Send Now
              </button>
            </div>
          </div>
        </div>

        {/* Automation Rules */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Settings className="h-3.5 w-3.5 text-green-500" />
            Automation Rules
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3">
              <div className="mt-0.5 relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full bg-violet-600">
                <span className="translate-x-3.5 inline-block h-3 w-3 transform rounded-full bg-white transition" />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">
                After successful outbound call, send summary message automatically.
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
               <div className="mt-0.5 relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full bg-zinc-300 dark:bg-zinc-700">
                <span className="translate-x-0.5 inline-block h-3 w-3 transform rounded-full bg-white transition" />
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-300">
                On meeting scheduled Sync with Google Calendar.
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

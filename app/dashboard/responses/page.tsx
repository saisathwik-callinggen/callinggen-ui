"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { MessageSquareText, Search, Filter, Download } from "lucide-react";

/* ── Dummy Responses ── */
const dummyResponses = [
  { id: "RSP-001", contact: "Ravi Kumar", phone: "+91 98765 43210", campaign: "Realty-June", response: "Interested", sentiment: "Positive", date: "2026-06-28", duration: "3m 12s" },
  { id: "RSP-002", contact: "Priya Shah", phone: "+91 87654 32109", campaign: "Insurance-Q2", response: "Callback Requested", sentiment: "Neutral", date: "2026-06-28", duration: "1m 45s" },
  { id: "RSP-003", contact: "Anil Mehta", phone: "+91 76543 21098", campaign: "Realty-June", response: "Not Interested", sentiment: "Negative", date: "2026-06-27", duration: "0m 52s" },
  { id: "RSP-004", contact: "Sneha Patel", phone: "+91 65432 10987", campaign: "EdTech-Summer", response: "Very Interested", sentiment: "Positive", date: "2026-06-27", duration: "4m 18s" },
  { id: "RSP-005", contact: "Karan Joshi", phone: "+91 54321 09876", campaign: "Insurance-Q2", response: "Already Has Plan", sentiment: "Neutral", date: "2026-06-26", duration: "2m 30s" },
  { id: "RSP-006", contact: "Meera Iyer", phone: "+91 43210 98765", campaign: "Realty-June", response: "Call Back Later", sentiment: "Neutral", date: "2026-06-26", duration: "1m 15s" },
  { id: "RSP-007", contact: "Raj Verma", phone: "+91 32109 87654", campaign: "EdTech-Summer", response: "Interested", sentiment: "Positive", date: "2026-06-25", duration: "3m 45s" },
  { id: "RSP-008", contact: "Lakshmi Nair", phone: "+91 21098 76543", campaign: "Realty-June", response: "Wrong Number", sentiment: "Negative", date: "2026-06-25", duration: "0m 18s" },
];

const sentimentStyles: Record<string, string> = {
  Positive: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Neutral: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ResponsesPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filtered = dummyResponses.filter((r) =>
    r.contact.toLowerCase().includes(search.toLowerCase()) ||
    r.response.toLowerCase().includes(search.toLowerCase()) ||
    r.campaign.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell title="Responses">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Call Responses</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Review all responses from your AI calling campaigns.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Responses", value: "8", color: "from-violet-500 to-indigo-500" },
            { label: "Positive", value: "3", color: "from-emerald-500 to-teal-500" },
            { label: "Neutral", value: "3", color: "from-amber-500 to-orange-500" },
            { label: "Negative", value: "2", color: "from-red-500 to-rose-500" },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{card.label}</p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
              <div className={`mt-2 h-1 w-full rounded-full bg-gradient-to-r ${card.color} opacity-60`} />
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search responses by contact, campaign, or response..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                  {["ID", "Contact", "Phone", "Campaign", "Response", "Sentiment", "Duration", "Date"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((row) => (
                  <tr key={row.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-5 py-3 font-mono text-xs text-zinc-400">{row.id}</td>
                    <td className="px-5 py-3 font-medium">{row.contact}</td>
                    <td className="px-5 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">{row.phone}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {row.campaign}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-700 dark:text-zinc-300">{row.response}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sentimentStyles[row.sentiment]}`}>
                        {row.sentiment}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{row.duration}</td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

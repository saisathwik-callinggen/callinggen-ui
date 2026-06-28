"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { Users2, Search, Filter, Download, Star, ArrowUpRight, MoreHorizontal } from "lucide-react";

/* ── Dummy Leads ── */
const dummyLeads = [
  { id: "LD-001", name: "Ravi Kumar", email: "ravi@example.com", phone: "+91 98765 43210", source: "AI Call", status: "Hot", score: 92, lastContact: "2026-06-28", campaign: "Realty-June" },
  { id: "LD-002", name: "Priya Shah", email: "priya@example.com", phone: "+91 87654 32109", source: "AI Call", status: "Warm", score: 74, lastContact: "2026-06-28", campaign: "Insurance-Q2" },
  { id: "LD-003", name: "Anil Mehta", email: "anil@example.com", phone: "+91 76543 21098", source: "Inbound", status: "Cold", score: 28, lastContact: "2026-06-27", campaign: "Realty-June" },
  { id: "LD-004", name: "Sneha Patel", email: "sneha@example.com", phone: "+91 65432 10987", source: "AI Call", status: "Hot", score: 88, lastContact: "2026-06-27", campaign: "EdTech-Summer" },
  { id: "LD-005", name: "Karan Joshi", email: "karan@example.com", phone: "+91 54321 09876", source: "Referral", status: "Warm", score: 65, lastContact: "2026-06-26", campaign: "Insurance-Q2" },
  { id: "LD-006", name: "Meera Iyer", email: "meera@example.com", phone: "+91 43210 98765", source: "AI Call", status: "New", score: 50, lastContact: "2026-06-26", campaign: "Realty-June" },
  { id: "LD-007", name: "Raj Verma", email: "raj@example.com", phone: "+91 32109 87654", source: "AI Call", status: "Hot", score: 95, lastContact: "2026-06-25", campaign: "EdTech-Summer" },
  { id: "LD-008", name: "Lakshmi Nair", email: "lakshmi@example.com", phone: "+91 21098 76543", source: "Inbound", status: "Cold", score: 15, lastContact: "2026-06-25", campaign: "Realty-June" },
  { id: "LD-009", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 10987 65432", source: "Referral", status: "Warm", score: 71, lastContact: "2026-06-24", campaign: "Insurance-Q2" },
  { id: "LD-010", name: "Anita Desai", email: "anita@example.com", phone: "+91 09876 54321", source: "AI Call", status: "New", score: 45, lastContact: "2026-06-24", campaign: "EdTech-Summer" },
];

const statusStyles: Record<string, string> = {
  Hot: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Warm: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Cold: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  New: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
}

export default function LeadsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filtered = dummyLeads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.campaign.toLowerCase().includes(search.toLowerCase()) ||
    l.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell title="Leads">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Lead Management</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Track and manage your qualified leads from AI calling campaigns.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Leads", value: "10", sub: "+3 this week" },
            { label: "Hot Leads", value: "3", sub: "Score > 80" },
            { label: "Warm Leads", value: "3", sub: "Score 50-80" },
            { label: "Avg Score", value: "62.3", sub: "Across all leads" },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{card.label}</p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
              <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">{card.sub}</p>
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
            placeholder="Search leads by name, email, campaign, or status..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                  {["ID", "Name", "Email", "Phone", "Source", "Status", "Score", "Campaign", "Last Contact", ""].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((row) => (
                  <tr key={row.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-400">{row.id}</td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">{row.email}</td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">{row.phone}</td>
                    <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">{row.source}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className={`h-3 w-3 ${getScoreColor(row.score)}`} />
                        <span className={`text-xs font-bold ${getScoreColor(row.score)}`}>{row.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {row.campaign}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">{row.lastContact}</td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { Megaphone, Search, Plus, Play, Pause, CheckCircle2, MoreHorizontal, Users, Phone, TrendingUp } from "lucide-react";

/* ── Dummy Campaigns ── */
const dummyCampaigns = [
  { id: "CMP-001", name: "Realty-June", agent: "Voice-A (Sales)", status: "Active", contacts: 312, called: 248, success: 187, startDate: "2026-06-10", endDate: "2026-06-30", successRate: "75.4%" },
  { id: "CMP-002", name: "Insurance-Q2", agent: "Voice-B (Support)", status: "Active", contacts: 180, called: 102, success: 71, startDate: "2026-06-15", endDate: "2026-07-15", successRate: "69.6%" },
  { id: "CMP-003", name: "EdTech-Summer", agent: "Voice-C (Followup)", status: "Paused", contacts: 450, called: 89, success: 62, startDate: "2026-06-20", endDate: "2026-07-20", successRate: "69.7%" },
  { id: "CMP-004", name: "SaaS-Trial-Activation", agent: "Voice-A (Sales)", status: "Completed", contacts: 200, called: 200, success: 158, startDate: "2026-05-01", endDate: "2026-05-30", successRate: "79.0%" },
  { id: "CMP-005", name: "FinServ-Renewal", agent: "Voice-D (Survey)", status: "Completed", contacts: 150, called: 150, success: 112, startDate: "2026-05-15", endDate: "2026-06-10", successRate: "74.7%" },
  { id: "CMP-006", name: "Healthcare-Checkup", agent: "Voice-B (Support)", status: "Draft", contacts: 0, called: 0, success: 0, startDate: "—", endDate: "—", successRate: "—" },
];

const statusStyles: Record<string, { bg: string; icon: React.ElementType }> = {
  Active: { bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: Play },
  Paused: { bg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Pause },
  Completed: { bg: "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300", icon: CheckCircle2 },
  Draft: { bg: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400", icon: Megaphone },
};

export default function CampaignPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filtered = dummyCampaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.agent.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell title="Campaign">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Campaigns</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Manage and track all your AI voice calling campaigns.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl hover:shadow-violet-500/30">
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Campaigns", value: "6", icon: Megaphone },
            { label: "Active", value: "2", icon: Play },
            { label: "Total Contacts", value: "1,292", icon: Users },
            { label: "Avg Success Rate", value: "73.7%", icon: TrendingUp },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{card.label}</p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Icon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{card.value}</p>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search campaigns by name, agent, or status..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                  {["ID", "Campaign Name", "Agent", "Status", "Contacts", "Called", "Success", "Success Rate", "Start Date", "End Date", ""].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((row) => {
                  const statusConfig = statusStyles[row.status];
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={row.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="px-4 py-3 font-mono text-xs text-zinc-400">{row.id}</td>
                      <td className="px-4 py-3 font-semibold">{row.name}</td>
                      <td className="px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400">{row.agent}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusConfig.bg}`}>
                          <StatusIcon className="h-3 w-3" />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.contacts}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.called}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.success}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold ${
                          row.successRate !== "—" && parseFloat(row.successRate) >= 75
                            ? "text-emerald-600 dark:text-emerald-400"
                            : row.successRate !== "—"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-zinc-400"
                        }`}>
                          {row.successRate}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">{row.startDate}</td>
                      <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">{row.endDate}</td>
                      <td className="px-4 py-3">
                        <button className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

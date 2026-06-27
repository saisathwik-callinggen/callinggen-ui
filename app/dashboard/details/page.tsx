"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  Clock,
  Download,
  Phone,
  PhoneMissed,
  TrendingUp,
} from "lucide-react";

/* ── Dummy Data ── */
const agentPerf = [
  { agent: "Voice-A", calls: 124, success: 91, duration: "2m 18s" },
  { agent: "Voice-B", calls: 98, success: 74, duration: "1m 58s" },
  { agent: "Voice-C", calls: 76, success: 60, duration: "2m 44s" },
  { agent: "Voice-D", calls: 56, success: 38, duration: "1m 33s" },
];

const agentChartData = agentPerf.map((a) => ({
  name: a.agent,
  Success: a.success,
  Failed: a.calls - a.success,
}));

const callLogs = [
  { id: "#4091", contact: "Ravi Kumar", duration: "3m 12s", outcome: "Interested", time: "10:24 AM" },
  { id: "#4090", contact: "Priya Shah", duration: "1m 45s", outcome: "Callback", time: "10:10 AM" },
  { id: "#4089", contact: "Anil Mehta", duration: "0m 52s", outcome: "Not Interested", time: "09:55 AM" },
  { id: "#4088", contact: "Sneha Patel", duration: "2m 30s", outcome: "Interested", time: "09:40 AM" },
  { id: "#4087", contact: "Karan Joshi", duration: "4m 01s", outcome: "Qualified", time: "09:22 AM" },
  { id: "#4086", contact: "Meera Iyer", duration: "1m 12s", outcome: "No Answer", time: "09:05 AM" },
  { id: "#4085", contact: "Raj Verma", duration: "2m 55s", outcome: "Callback", time: "08:50 AM" },
];

const outcomeStyle: Record<string, string> = {
  Interested: "bg-zinc-900 text-white dark:bg-white dark:text-black",
  Qualified: "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black",
  Callback: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200",
  "Not Interested": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  "No Answer": "bg-zinc-50 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700",
};

const summaryStats = [
  { label: "Total Calls", value: "354", icon: Phone },
  { label: "Success Rate", value: "77%", icon: TrendingUp },
  { label: "Avg Duration", value: "2m 14s", icon: Clock },
  { label: "Qualified", value: "87", icon: CheckCircle2 },
  { label: "No Answer", value: "46", icon: PhoneMissed },
];
/* ──────────────────────────────────────────────── */

export default function DetailsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <DashboardShell title="Details">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Call Analytics</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Detailed breakdown of agent performance and call outcomes.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {summaryStats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </div>
                <p className="mt-3 text-2xl font-bold">{s.value}</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Agent performance chart */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-1 text-sm font-semibold">Agent Performance</p>
          <p className="mb-4 text-xs text-zinc-400 dark:text-zinc-500">Success vs. Failed calls per agent</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agentChartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 12 }}
              />
              <Bar dataKey="Success" fill="#18181b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Failed" fill="#d4d4d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-sm bg-zinc-900 dark:bg-zinc-100" />Success</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-sm bg-zinc-300" />Failed</div>
          </div>
        </div>

        {/* Agent table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800">
            <p className="text-sm font-semibold">Agent Breakdown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                  <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Agent</th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Calls</th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Success</th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Success %</th>
                  <th className="px-5 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Avg Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {agentPerf.map((a) => (
                  <tr key={a.agent} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-5 py-3 font-medium">{a.agent}</td>
                    <td className="px-5 py-3 text-right text-zinc-600 dark:text-zinc-400">{a.calls}</td>
                    <td className="px-5 py-3 text-right text-zinc-600 dark:text-zinc-400">{a.success}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`inline-block w-12 rounded-full py-0.5 text-center text-xs font-semibold ${
                        (a.success / a.calls) > 0.75
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                      }`}>
                        {Math.round((a.success / a.calls) * 100)}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-zinc-600 dark:text-zinc-400">{a.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call logs table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800">
            <p className="text-sm font-semibold">Recent Call Logs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                  {["ID", "Contact", "Duration", "Outcome", "Time"].map((h) => (
                    <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {callLogs.map((row) => (
                  <tr key={row.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-5 py-3 font-mono text-xs text-zinc-400">{row.id}</td>
                    <td className="px-5 py-3 font-medium">{row.contact}</td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{row.duration}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${outcomeStyle[row.outcome]}`}>
                        {row.outcome}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{row.time}</td>
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

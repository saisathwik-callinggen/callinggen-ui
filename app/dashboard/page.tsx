"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Phone,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  PhoneOff,
  BarChart2,
  Target,
  PhoneCall,
} from "lucide-react";

/* ── Dummy Data ──────────────────────────────────── */
const callsByDay = [
  { day: "Mon", calls: 42, connected: 31 },
  { day: "Tue", calls: 58, connected: 44 },
  { day: "Wed", calls: 35, connected: 27 },
  { day: "Thu", calls: 67, connected: 52 },
  { day: "Fri", calls: 73, connected: 60 },
  { day: "Sat", calls: 24, connected: 18 },
  { day: "Sun", calls: 15, connected: 11 },
];

const leadStatus = [
  { name: "Interested", value: 38, color: "#18181b" },
  { name: "Callback", value: 24, color: "#52525b" },
  { name: "Not Interested", value: 21, color: "#a1a1aa" },
  { name: "No Answer", value: 17, color: "#d4d4d8" },
];

const successTrend = [
  { week: "W1", rate: 58 },
  { week: "W2", rate: 63 },
  { week: "W3", rate: 61 },
  { week: "W4", rate: 70 },
  { week: "W5", rate: 74 },
  { week: "W6", rate: 69 },
  { week: "W7", rate: 78 },
  { week: "W8", rate: 82 },
];

const recentActivity = [
  { time: "10:24 AM", msg: "Lead #1042 qualified — scheduled callback", status: "success" },
  { time: "10:10 AM", msg: "Bulk campaign 'Realty-June' launched (312 contacts)", status: "info" },
  { time: "09:55 AM", msg: "Agent 'Voice-A' completed 50 calls", status: "success" },
  { time: "09:30 AM", msg: "Lead #1038 marked Not Interested", status: "neutral" },
  { time: "09:12 AM", msg: "Follow-up reminder sent to 18 leads", status: "info" },
];

const metrics = [
  { label: "Total Calls", value: "314", icon: Phone, delta: "+12% vs last week" },
  { label: "Connected", value: "243", icon: CheckCircle2, delta: "+8% vs last week" },
  { label: "Leads Qualified", value: "87", icon: Target, delta: "+21% vs last week" },
  { label: "Avg. Duration", value: "2m 14s", icon: Clock, delta: "-3% vs last week" },
  { label: "Drop Rate", value: "6.4%", icon: PhoneOff, delta: "-2% vs last week" },
  { label: "Active Agents", value: "4", icon: Users, delta: "unchanged" },
  { label: "Success Rate", value: "77.4%", icon: TrendingUp, delta: "+4% vs last week" },
  { label: "Campaigns", value: "3", icon: BarChart2, delta: "1 active now" },
];
/* ────────────────────────────────────────────────── */

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <DashboardShell title="Dashboard">
      <div className="space-y-6">

        {/* ── Greeting banner ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Performance Overview</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Track your calling activity and agent performance in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </div>
            <Link
              href="/dashboard/call-manager"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <PhoneCall className="h-4 w-4" />
              Start Calling
            </Link>
          </div>
        </div>

        {/* ── Metrics grid ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Icon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">{m.value}</p>
                <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">{m.delta}</p>
              </div>
            );
          })}
        </div>

        {/* ── Charts row ── */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">

          {/* Bar Chart — Calls by Day */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Call Performance</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Total vs. Connected (last 7 days)</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={callsByDay} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" className="hidden dark:block" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e4e4e7",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="calls" name="Total" fill="#d4d4d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="connected" name="Connected" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-zinc-300" />
                Total Calls
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-zinc-900 dark:bg-zinc-100" />
                Connected
              </div>
            </div>
          </div>

          {/* Pie Chart — Lead Classification */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2">
              <p className="text-sm font-semibold">Lead Classification</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Outcome breakdown this week</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={leadStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {leadStatus.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val}%`, ""]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {leadStatus.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.name} <span className="font-semibold text-zinc-900 dark:text-zinc-100">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Success Rate Trend (Line Chart) ── */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Success Rate Trend</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Weekly call success rate (%) over 8 weeks</p>
            </div>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              +82% peak
            </span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={successTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 90]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e4e4e7", fontSize: 12 }}
                formatter={(v) => [`${v}%`, "Success Rate"]}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#18181b"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#18181b", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Recent Activity ── */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-4 text-sm font-semibold">Recent Activity</p>
          <div className="space-y-2">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50"
              >
                <div
                  className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    item.status === "success"
                      ? "bg-zinc-900 dark:bg-white"
                      : item.status === "info"
                      ? "bg-zinc-500"
                      : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-700 dark:text-zinc-300">{item.msg}</p>
                </div>
                <span className="shrink-0 text-[10px] text-zinc-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardShell>
  );
}

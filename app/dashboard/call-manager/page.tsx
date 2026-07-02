"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import {
  Upload,
  Calendar,
  Clock,
  ChevronDown,
  FileSpreadsheet,
  Phone,
  Crosshair,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  BarChart3,
} from "lucide-react";

/* ── Dummy Contacts ── */
type Contact = {
  id: number;
  name: string;
  phone: string;
  status: "pending" | "calling" | "completed" | "failed" | "no-answer";
  response: string;
};

const dummyContacts: Contact[] = [
  { id: 1, name: "Ravi Kumar", phone: "+91 98765 43210", status: "completed", response: "Interested" },
  { id: 2, name: "Priya Shah", phone: "+91 87654 32109", status: "completed", response: "Callback" },
  { id: 3, name: "Anil Mehta", phone: "+91 76543 21098", status: "no-answer", response: "—" },
  { id: 4, name: "Sneha Patel", phone: "+91 65432 10987", status: "calling", response: "—" },
  { id: 5, name: "Karan Joshi", phone: "+91 54321 09876", status: "pending", response: "—" },
];

const statusStyles: Record<string, string> = {
  pending: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  calling: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "no-answer": "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  calling: "Calling...",
  completed: "Completed",
  failed: "Failed",
  "no-answer": "No Answer",
};

const agents = ["Voice-A (Sales)", "Voice-B (Support)", "Voice-C (Followup)", "Voice-D (Survey)"];

/* ── Pipeline Stats ── */
const pipelineStats = [
  { label: "REGISTRY", value: 5, sub: "Input detected", icon: Crosshair, color: "text-violet-500" },
  { label: "STANDBY", value: 2, sub: "Waiting in queue", icon: Clock, color: "text-amber-500" },
  { label: "DIALER", value: 1, sub: "Active dialing", icon: Zap, color: "text-cyan-500" },
  { label: "ANALYSIS", value: 2, sub: "Finished calls", icon: CheckCircle2, color: "text-emerald-500" },
];

export default function CallManagerPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [campaignTitle, setCampaignTitle] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [singleContactName, setSingleContactName] = useState("");
  const [singleContactPhone, setSingleContactPhone] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFileUploaded(true);
    setContacts(dummyContacts);
  };

  const handleFileSelect = () => {
    setFileUploaded(true);
    setContacts(dummyContacts);
  };

  const handleScheduleCall = () => {
    const trimmedName = singleContactName.trim();
    const trimmedPhone = singleContactPhone.trim();

    if (!trimmedName || !trimmedPhone) {
      setScheduleMessage("Please enter both the contact name and phone number.");
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name: trimmedName,
      phone: trimmedPhone,
      status: "pending",
      response: "Scheduled",
    };

    setContacts((prev) => [newContact, ...prev]);
    setSingleContactName("");
    setSingleContactPhone("");
    setScheduleMessage(`Call scheduled for ${trimmedName}.`);
  };

  return (
    <DashboardShell title="Call Manager">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">

        {/* ══════════════════════════════════════
            LEFT PANEL — Campaign Setup
        ══════════════════════════════════════ */}
        <div className="space-y-5">

          {/* Campaign Title */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Campaign Title
            </label>
            <input
              type="text"
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              placeholder="Enter Campaign Title"
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-600"
            />
          </div>

          {/* Select Agent */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <User className="h-3.5 w-3.5" />
              Select Agent
            </label>
            <div className="relative">
              <button
                onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium dark:border-zinc-700 dark:bg-zinc-900"
              >
                <span className={selectedAgent ? "" : "text-zinc-400 dark:text-zinc-600"}>
                  {selectedAgent || "Select..."}
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </button>
              {showAgentDropdown && (
                <div className="absolute z-20 mt-1 w-full rounded-lg border border-zinc-200 bg-white py-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                  {agents.map((agent) => (
                    <button
                      key={agent}
                      onClick={() => { setSelectedAgent(agent); setShowAgentDropdown(false); }}
                      className="flex w-full px-4 py-2 text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      {agent}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Schedule Date & Time */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              Schedule Date & Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>{new Date().toISOString().split("T")[0]}</span>
                <ChevronDown className="ml-auto h-4 w-4 text-zinc-400" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span>6:04 PM</span>
                <ChevronDown className="ml-auto h-4 w-4 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Upload Contact Sheet */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <Upload className="h-3.5 w-3.5" />
              Upload Contact Sheet
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
                isDragging
                  ? "border-violet-400 bg-violet-50 dark:border-violet-500 dark:bg-violet-950/30"
                  : fileUploaded
                  ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-600 dark:bg-emerald-950/20"
                  : "border-zinc-300 bg-zinc-50 hover:border-violet-300 hover:bg-violet-50/30 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-600"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileSelect}
              />
              {fileUploaded ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2" />
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">File Uploaded!</p>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-500/50 mt-1">contacts.xlsx — 5 contacts</p>
                </>
              ) : (
                <>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
                    <Upload className="h-5 w-5 text-zinc-400" />
                  </div>
                  <p className="text-sm font-semibold">Drop your Excel file here</p>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500 text-center">
                    Supports .xlsx, .xls, .csv · needs<br />&quot;Name&quot; and &quot;Phone Number&quot; columns
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Single Contact Section */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <Phone className="h-3.5 w-3.5" />
              Or, Call a Single Contact
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <input
                type="text"
                value={singleContactName}
                onChange={(e) => setSingleContactName(e.target.value)}
                placeholder="Full Name"
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-600"
              />
              <input
                type="text"
                value={singleContactPhone}
                onChange={(e) => setSingleContactPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-600"
              />
            </div>
            <button
              onClick={handleScheduleCall}
              className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-xl hover:shadow-violet-500/30"
            >
              Schedule Call
            </button>
            {scheduleMessage && (
              <p className={`mt-2 text-xs ${scheduleMessage.startsWith("Please") ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                {scheduleMessage}
              </p>
            )}
            <p className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-600">
              Format: +91 XXXXX XXXXX — country code, space, then the 10-digit number
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — Contacts & Status
        ══════════════════════════════════════ */}
        <div className="space-y-5">

          {/* Contacts Table */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                <p className="text-sm font-semibold">Contacts</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {contacts.length} loaded
              </span>
            </div>

            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Phone className="h-7 w-7 text-zinc-300 dark:text-zinc-600" />
                </div>
                <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">Waiting for Contacts...</p>
                <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600 italic">
                  No contacts uploaded yet. Please upload a sheet to begin.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/40">
                      {["#", "Name", "Phone Number", "Status", "Response"].map((h) => (
                        <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {contacts.map((c) => (
                      <tr key={c.id} className="transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                        <td className="px-5 py-3 font-mono text-xs text-zinc-400">{c.id}</td>
                        <td className="px-5 py-3 font-medium">{c.name}</td>
                        <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400 font-mono text-xs">{c.phone}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[c.status]}`}>
                            {c.status === "calling" && <Loader2 className="h-3 w-3 animate-spin" />}
                            {statusLabels[c.status]}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{c.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Live Journey Pipeline */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Live Journey</p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Mission Control</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pipelineStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="relative rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center transition hover:border-violet-300 hover:bg-violet-50/30 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:border-violet-600/50"
                  >
                    <Icon className={`mx-auto h-5 w-5 ${stat.color} mb-2`} />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-[10px] text-zinc-400 dark:text-zinc-500">{stat.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Mission Control Results */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800/50 dark:bg-emerald-950/30">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Completed</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/50">SUCCESSFUL CALLS</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800/50 dark:bg-red-950/30">
                <XCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-xs font-bold text-red-700 dark:text-red-400">No Answer</p>
                  <p className="text-[10px] text-red-600/70 dark:text-red-500/50">MISSED / FAILED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Call Details", icon: BarChart3, href: "/dashboard/details", color: "text-emerald-500" },
              { label: "Responses", icon: Activity, href: "/dashboard/responses", color: "text-violet-500" },
              { label: "Leads", icon: User, href: "/dashboard/leads", color: "text-amber-500" },
              { label: "Report", icon: FileSpreadsheet, href: "/dashboard/report", color: "text-cyan-500" },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition hover:border-violet-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-600/50"
                >
                  <Icon className={`h-4 w-4 ${btn.color}`} />
                  {btn.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

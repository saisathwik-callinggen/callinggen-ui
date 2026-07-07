"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import DetailsDrawer from "@/components/shared/DetailsDrawer";
import { Calendar, PhoneCall, CheckCircle2, FileText, PlayCircle } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  date: string;
  schedule: string;
  sheetName: string;
  totalCalls: number;
  completedCalls: number;
  failedCalls: number;
  interested: number;
  callbacks: number;
  creditsUsed: number;
  agent: string;
  status: string;
  script: string;
  uploadSource: string;
  notes: string;
}

const dummyCampaigns: Campaign[] = [
  { id: "1", name: "Fall Promo 2023", date: "2023-10-01", schedule: "Oct 1, 2023 - 09:00 AM", sheetName: "fall_leads.xlsx", totalCalls: 500, completedCalls: 500, failedCalls: 0, interested: 45, callbacks: 20, creditsUsed: 75.50, agent: "Sarah (Sales)", status: "Completed", script: "Hi, we have a fall promo...", uploadSource: "Excel Upload", notes: "Very successful campaign." },
  { id: "2", name: "Q4 Outreach", date: "2023-10-15", schedule: "Oct 15, 2023 - 10:00 AM", sheetName: "q4_targets.csv", totalCalls: 1200, completedCalls: 450, failedCalls: 12, interested: 30, callbacks: 15, creditsUsed: 120.00, agent: "Mike (Support)", status: "Running", script: "Hello, checking in for Q4...", uploadSource: "CSV Upload", notes: "Currently pausing briefly at noon." },
  { id: "3", name: "Holiday Special", date: "2023-11-20", schedule: "Nov 20, 2023 - 08:30 AM", sheetName: "Google Sheet (xyz...)", totalCalls: 3000, completedCalls: 0, failedCalls: 0, interested: 0, callbacks: 0, creditsUsed: 0, agent: "Emma (Onboarding)", status: "Scheduled", script: "Happy holidays! We are offering...", uploadSource: "Google Sheets", notes: "Ready for launch." },
  { id: "4", name: "Inactive Users Reactivation", date: "2023-09-10", schedule: "Sep 10, 2023 - 11:00 AM", sheetName: "inactive_users_v2.xlsx", totalCalls: 800, completedCalls: 800, failedCalls: 45, interested: 10, callbacks: 5, creditsUsed: 105.20, agent: "Sarah (Sales)", status: "Completed", script: "Hi, we missed you...", uploadSource: "Excel Upload", notes: "Low conversion rate." },
  { id: "5", name: "New Feature Announcement", date: "2023-10-25", schedule: "Oct 25, 2023 - 02:00 PM", sheetName: "new_feature.csv", totalCalls: 150, completedCalls: 0, failedCalls: 0, interested: 0, callbacks: 0, creditsUsed: 0, agent: "Mike (Support)", status: "Draft", script: "Did you see our new feature?", uploadSource: "CSV Upload", notes: "Need to finalize script." },
];

const getStatusBadge = (status: string) => {
  const variantMap: Record<string, BadgeVariant> = {
    Completed: "success",
    Running: "info",
    Scheduled: "warning",
    Draft: "neutral",
    Paused: "warning",
    Failed: "error",
  };
  return <Badge variant={variantMap[status] || "neutral"}>{status}</Badge>;
};

export default function CampaignsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const columns: Column<Campaign>[] = [
    { key: "name", label: "Campaign Name", sortable: true, render: (c) => <span className="font-semibold text-zinc-900 dark:text-white">{c.name}</span> },
    { key: "date", label: "Date", sortable: true },
    { key: "sheetName", label: "Data Source", sortable: true, render: (c) => <span className="text-xs text-zinc-500">{c.sheetName}</span> },
    { key: "totalCalls", label: "Total Calls", sortable: true, render: (c) => <span className="font-mono">{c.totalCalls}</span> },
    { key: "creditsUsed", label: "Credits", sortable: true, render: (c) => <span className="font-mono">${c.creditsUsed.toFixed(2)}</span> },
    { key: "agent", label: "AI Agent", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
  ];

  // Stats
  const totalCampaigns = dummyCampaigns.length;
  const running = dummyCampaigns.filter(c => c.status === "Running").length;
  const scheduled = dummyCampaigns.filter(c => c.status === "Scheduled").length;
  const completed = dummyCampaigns.filter(c => c.status === "Completed").length;
  const draft = dummyCampaigns.filter(c => c.status === "Draft").length;

  return (
    <DashboardShell title="Campaigns">
      <div className="flex flex-col h-[calc(100vh-80px)] p-1 sm:p-4 overflow-y-auto">
        
        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 shrink-0">
          <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:bg-[#0B0F19] dark:hover:border-violet-700">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              <FileText className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{totalCampaigns}</h3>
          </div>
          <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-[#0B0F19] dark:hover:border-blue-700">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <PlayCircle className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Running</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{running}</h3>
          </div>
          <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-[#0B0F19] dark:hover:border-amber-700">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Calendar className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Scheduled</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{scheduled}</h3>
          </div>
          <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-[#0B0F19] dark:hover:border-emerald-700">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Completed</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{completed}</h3>
          </div>
          <div className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-[#0B0F19] dark:hover:border-zinc-600">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <FileText className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Drafts</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{draft}</h3>
          </div>
        </div>

        {/* Table Section */}
        <section className="flex flex-col flex-1 gap-4 min-h-[500px]">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">All Campaigns</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Manage your call campaigns, track live progress, and review past performance.
            </p>
          </div>
          <div className="flex-1 min-h-0">
            <DataTable 
              data={dummyCampaigns}
              columns={columns}
              searchableKeys={["name", "agent", "sheetName"]}
              filters={[
                { key: "status", label: "Status", options: [{label: "Running", value: "Running"}, {label: "Scheduled", value: "Scheduled"}, {label: "Completed", value: "Completed"}, {label: "Draft", value: "Draft"}] },
                { key: "agent", label: "Agent", options: [{label: "Sarah (Sales)", value: "Sarah (Sales)"}, {label: "Mike (Support)", value: "Mike (Support)"}, {label: "Emma (Onboarding)", value: "Emma (Onboarding)"}] }
              ]}
              exportFileName="campaigns_export.xlsx"
              onRowClick={setSelectedCampaign}
            />
          </div>
        </section>
      </div>

      <DetailsDrawer
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title="Campaign Details"
      >
        {selectedCampaign && (
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Overview</h3>
                {getStatusBadge(selectedCampaign.status)}
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div><span className="text-zinc-500">Name</span><p className="font-semibold dark:text-white">{selectedCampaign.name}</p></div>
                <div><span className="text-zinc-500">Created Date</span><p className="font-semibold dark:text-white">{selectedCampaign.date}</p></div>
                <div><span className="text-zinc-500">Schedule</span><p className="font-semibold dark:text-white">{selectedCampaign.schedule}</p></div>
                <div><span className="text-zinc-500">AI Agent</span><p className="font-semibold dark:text-white">{selectedCampaign.agent}</p></div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-sm">
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Total Contacts</span><p className="text-lg font-bold dark:text-white">{selectedCampaign.totalCalls}</p></div>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Completed</span><p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedCampaign.completedCalls}</p></div>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Failed</span><p className="text-lg font-bold text-red-600 dark:text-red-400">{selectedCampaign.failedCalls}</p></div>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Interested</span><p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{selectedCampaign.interested}</p></div>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Callbacks</span><p className="text-lg font-bold text-amber-600 dark:text-amber-400">{selectedCampaign.callbacks}</p></div>
                <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-[#121622]"><span className="text-zinc-500 text-xs">Credits Used</span><p className="text-lg font-bold text-zinc-900 dark:text-white">${selectedCampaign.creditsUsed.toFixed(2)}</p></div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Configuration</h3>
              <div className="mb-4">
                <span className="text-zinc-500 text-sm">Upload Source</span>
                <p className="font-medium dark:text-zinc-300 mt-1">{selectedCampaign.uploadSource} ({selectedCampaign.sheetName})</p>
              </div>
              <div className="mb-4">
                <span className="text-zinc-500 text-sm">Agent Script</span>
                <div className="mt-2 rounded-lg bg-white p-3 text-sm text-zinc-700 shadow-sm dark:bg-[#121622] dark:text-zinc-300 italic">
                  "{selectedCampaign.script}"
                </div>
              </div>
              <div>
                <span className="text-zinc-500 text-sm">Notes</span>
                <p className="font-medium dark:text-zinc-300 mt-1">{selectedCampaign.notes}</p>
              </div>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </DashboardShell>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import SendMessageModal from "@/components/chat/SendMessageModal";
import { Calendar, PhoneCall, CheckCircle2, FileText, PlayCircle, PauseCircle, Square, Send } from "lucide-react";

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
    "No Answer": "warning",
    Voicemail: "neutral",
  };
  return <Badge variant={variantMap[status] || "neutral"}>{status}</Badge>;
};

export default function CampaignsPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>(dummyCampaigns);
  
  // Send message modal state
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [selectedCampaignIdForModal, setSelectedCampaignIdForModal] = useState<string>("1");

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const updateCampaignStatus = (id: string, newStatus: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleOpenSendMessage = (campaignId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCampaignIdForModal(campaignId);
    setIsSendMessageOpen(true);
  };

  const columns: Column<Campaign>[] = [
    { key: "name", label: "Campaign Name", sortable: true, render: (c) => <span className="font-semibold text-zinc-900 dark:text-white">{c.name}</span> },
    { key: "date", label: "Date", sortable: true },
    { key: "sheetName", label: "Data Source", sortable: true, render: (c) => <span className="text-xs text-zinc-500">{c.sheetName}</span> },
    { key: "totalCalls", label: "Total Calls", sortable: true, render: (c) => <span className="font-mono">{c.totalCalls}</span> },
    { key: "creditsUsed", label: "Credits", sortable: true, render: (c) => <span className="font-mono">${c.creditsUsed.toFixed(2)}</span> },
    { key: "agent", label: "AI Agent", sortable: true },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
    { 
      key: "actions", 
      label: "Actions",
      render: (c) => (
        <div className="flex items-center gap-2">
          {c.status === "Completed" && (
            <button
              onClick={(e) => handleOpenSendMessage(c.id, e)}
              className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/50 transition border border-violet-200 dark:border-violet-800/50 shadow-xs"
              title="Send WhatsApp Message"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Message</span>
            </button>
          )}

          {c.status === "Scheduled" && (
             <button 
               onClick={(e) => updateCampaignStatus(c.id, "Running", e)}
               className="flex items-center justify-center h-8 w-8 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50 transition shadow-sm"
               title="Run Campaign"
             >
               <PlayCircle className="h-4 w-4" />
             </button>
          )}

          {c.status === "Running" && (
             <>
               <button 
                 onClick={(e) => updateCampaignStatus(c.id, "Paused", e)}
                 className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 transition shadow-sm"
                 title="Pause Campaign"
               >
                 <PauseCircle className="h-4 w-4" />
               </button>
               <button 
                 onClick={(e) => updateCampaignStatus(c.id, "Completed", e)}
                 className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition shadow-sm"
                 title="Stop Campaign"
               >
                 <Square className="h-4 w-4" />
               </button>
             </>
          )}
        </div>
      )
    },
  ];

  // Stats
  const totalCampaigns = campaigns.length;
  const running = campaigns.filter(c => c.status === "Running").length;
  const scheduled = campaigns.filter(c => c.status === "Scheduled").length;
  const completed = campaigns.filter(c => c.status === "Completed").length;
  const draft = campaigns.filter(c => c.status === "Draft").length;

  const activeCampaigns = campaigns.filter(c => c.status !== "Completed");
  const completedCampaigns = campaigns.filter(c => c.status === "Completed");

  const handleRowClick = (campaign: Campaign) => {
    router.push(`/campaign/${campaign.id}`);
  };

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

        {/* Scheduled / Active Campaigns Table Section */}
        <section className="flex flex-col gap-4 mt-2">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Active & Scheduled Campaigns</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Manage your upcoming and running call campaigns. Click on a campaign to view details.
            </p>
          </div>
          <div className="cursor-pointer">
            <DataTable 
              data={activeCampaigns}
              columns={columns}
              searchableKeys={["name", "agent", "sheetName"]}
              filters={[
                { key: "status", label: "Status", options: [{label: "Running", value: "Running"}, {label: "Scheduled", value: "Scheduled"}, {label: "Draft", value: "Draft"}] },
                { key: "agent", label: "Agent", options: [{label: "Sarah (Sales)", value: "Sarah (Sales)"}, {label: "Mike (Support)", value: "Mike (Support)"}, {label: "Emma (Onboarding)", value: "Emma (Onboarding)"}] }
              ]}
              exportFileName="active_campaigns.xlsx"
              onRowClick={handleRowClick}
            />
          </div>
        </section>

        {/* Completed Campaigns Table Section */}
        <section className="flex flex-col gap-4 mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Completed Campaigns</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Review performance and history of finished campaigns. Send follow-up WhatsApp messages to completed campaign leads.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCampaignIdForModal("1");
                setIsSendMessageOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/20 hover:opacity-90 transition shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Message to Completed Leads</span>
            </button>
          </div>
          <div className="cursor-pointer">
            <DataTable 
              data={completedCampaigns}
              columns={columns}
              searchableKeys={["name", "agent", "sheetName"]}
              filters={[
                { key: "agent", label: "Agent", options: [{label: "Sarah (Sales)", value: "Sarah (Sales)"}, {label: "Mike (Support)", value: "Mike (Support)"}, {label: "Emma (Onboarding)", value: "Emma (Onboarding)"}] }
              ]}
              exportFileName="completed_campaigns.xlsx"
              onRowClick={handleRowClick}
            />
          </div>
        </section>
      </div>

      {/* Campaign Broadcast Send Message Modal */}
      <SendMessageModal
        isOpen={isSendMessageOpen}
        onClose={() => setIsSendMessageOpen(false)}
        initialCampaignId={selectedCampaignIdForModal}
      />
    </DashboardShell>
  );
}

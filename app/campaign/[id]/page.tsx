"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import LiveTracking from "@/components/call-manager/LiveTracking";
import ContactsTable from "@/components/call-manager/ContactsTable";
import DataTable, { Column } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Clock, FileText, PlayCircle, Users2, Volume2, Mic, MoreHorizontal } from "lucide-react";
import { Contact, LiveTrackingStats } from "@/components/call-manager/types";

interface CallLog {
  id: string;
  campaignId: string;
  phoneNumber: string;
  contactName: string;
  type: "Inbound" | "Outbound";
  duration: string;
  timestamp: string;
  credits: number;
  response: string;
  status: string;
  humanResponse: string;
  aiClassification: string;
  agent: string;
  category: string;
}

const dummyCampaigns: Record<string, any> = {
  "1": { name: "Fall Promo 2023", date: "2023-10-01", schedule: "Oct 1, 2023 - 09:00 AM", sheetName: "fall_leads.xlsx", totalCalls: 500, completedCalls: 500, failedCalls: 0, interested: 45, callbacks: 20, creditsUsed: 75.50, agent: "Sarah (Sales)", status: "Completed", script: "Hi, we have a fall promo...", uploadSource: "Excel Upload", notes: "Very successful campaign." },
  "2": { name: "Q4 Outreach", date: "2023-10-15", schedule: "Oct 15, 2023 - 10:00 AM", sheetName: "q4_targets.csv", totalCalls: 1200, completedCalls: 450, failedCalls: 12, interested: 30, callbacks: 15, creditsUsed: 120.00, agent: "Mike (Support)", status: "Running", script: "Hello, checking in for Q4...", uploadSource: "CSV Upload", notes: "Currently pausing briefly at noon." },
  "3": { name: "Holiday Special", date: "2023-11-20", schedule: "Nov 20, 2023 - 08:30 AM", sheetName: "Google Sheet (xyz...)", totalCalls: 3000, completedCalls: 0, failedCalls: 0, interested: 0, callbacks: 0, creditsUsed: 0, agent: "Emma (Onboarding)", status: "Scheduled", script: "Happy holidays! We are offering...", uploadSource: "Google Sheets", notes: "Ready for launch." },
  "4": { name: "Inactive Users Reactivation", date: "2023-09-10", schedule: "Sep 10, 2023 - 11:00 AM", sheetName: "inactive_users_v2.xlsx", totalCalls: 800, completedCalls: 800, failedCalls: 45, interested: 10, callbacks: 5, creditsUsed: 105.20, agent: "Sarah (Sales)", status: "Completed", script: "Hi, we missed you...", uploadSource: "Excel Upload", notes: "Low conversion rate." },
  "5": { name: "New Feature Announcement", date: "2023-10-25", schedule: "Oct 25, 2023 - 02:00 PM", sheetName: "new_feature.csv", totalCalls: 150, completedCalls: 0, failedCalls: 0, interested: 0, callbacks: 0, creditsUsed: 0, agent: "Mike (Support)", status: "Draft", script: "Did you see our new feature?", uploadSource: "CSV Upload", notes: "Need to finalize script." },
};

const dummyContacts: Contact[] = [
  { id: 1, name: "Ravi Kumar", phone: "+91 98765 43210", status: "completed", response: "Interested", datetime: "2023-10-15 10:30" },
  { id: 2, name: "Priya Shah", phone: "+91 87654 32109", status: "completed", response: "Callback", datetime: "2023-10-15 11:00" },
  { id: 3, name: "Anil Mehta", phone: "+91 76543 21098", status: "no-answer", response: "—", datetime: "2023-10-15 11:15" },
  { id: 4, name: "Sneha Patel", phone: "+91 65432 10987", status: "calling", response: "—", datetime: "2023-10-15 11:20" },
  { id: 5, name: "Karan Joshi", phone: "+91 54321 09876", status: "pending", response: "—", datetime: "2023-10-15 11:25" },
];

const dummyCallLogs: CallLog[] = [
  { id: "c1", campaignId: "1", phoneNumber: "+1 234 567 8900", contactName: "John Doe", type: "Outbound", status: "Completed", duration: "02:15", timestamp: "2023-10-01 09:05 AM", credits: 12, response: "Interested", humanResponse: "Follow up needed", aiClassification: "High Intent", agent: "Sarah (Sales)", category: "Hot" },
  { id: "c2", campaignId: "1", phoneNumber: "+1 234 567 8901", contactName: "Jane Smith", type: "Outbound", status: "No Answer", duration: "00:00", timestamp: "2023-10-01 09:10 AM", credits: 2, response: "No Answer", humanResponse: "Unreachable", aiClassification: "Unresponsive", agent: "Sarah (Sales)", category: "Cold" },
  { id: "c3", campaignId: "1", phoneNumber: "+1 234 567 8902", contactName: "Bob Johnson", type: "Inbound", status: "Completed", duration: "05:30", timestamp: "2023-10-01 09:15 AM", credits: 24, response: "Callback", humanResponse: "Meeting scheduled", aiClassification: "Needs Information", agent: "Sarah (Sales)", category: "Warm" },
  { id: "c4", campaignId: "2", phoneNumber: "+1 987 654 3210", contactName: "Alice Williams", type: "Outbound", status: "Failed", duration: "00:00", timestamp: "2023-10-15 10:05 AM", credits: 0, response: "Invalid", humanResponse: "Wrong number", aiClassification: "Failed Connection", agent: "Mike (Support)", category: "Uncategorized" },
  { id: "c5", campaignId: "2", phoneNumber: "+1 987 654 3211", contactName: "Charlie Brown", type: "Outbound", status: "Completed", duration: "01:45", timestamp: "2023-10-15 10:12 AM", credits: 8, response: "Not Interested", humanResponse: "Too expensive", aiClassification: "Price objection", agent: "Mike (Support)", category: "Cold" },
  { id: "c6", campaignId: "3", phoneNumber: "+1 555 123 4567", contactName: "Eve Davis", type: "Outbound", status: "Scheduled", duration: "00:00", timestamp: "2023-11-20 08:35 AM", credits: 0, response: "—", humanResponse: "—", aiClassification: "—", agent: "Emma (Onboarding)", category: "Uncategorized" },
  { id: "c7", campaignId: "4", phoneNumber: "+1 888 999 0000", contactName: "Frank Miller", type: "Inbound", status: "Completed", duration: "03:20", timestamp: "2023-09-10 11:05 AM", credits: 15, response: "Interested", humanResponse: "Sent Proposal", aiClassification: "Ready to Buy", agent: "Sarah (Sales)", category: "Hot" },
  { id: "c8", campaignId: "4", phoneNumber: "+1 888 999 0001", contactName: "Grace Wilson", type: "Outbound", status: "Completed", duration: "01:10", timestamp: "2023-09-10 11:12 AM", credits: 4, response: "Busy", humanResponse: "Try again later", aiClassification: "Pending Follow-up", agent: "Sarah (Sales)", category: "Warm" },
];

export default function CampaignDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  useEffect(() => {
    // In a real app, fetch contacts based on id
    setContacts(dummyContacts);
  }, [id]);

  if (!isLoggedIn) return null;

  const campaignId = Array.isArray(id) ? id[0] : id;
  const campaign = dummyCampaigns[campaignId as string];

  if (!campaign) {
    return (
      <DashboardShell title="Campaign Not Found">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-zinc-500">The campaign you are looking for does not exist.</p>
          <button onClick={() => router.push('/campaign')} className="mt-4 text-violet-600 hover:underline">
            Go Back
          </button>
        </div>
      </DashboardShell>
    );
  }

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

  const getResponseBadge = (response: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      Interested: "success",
      "Not Interested": "neutral",
      "No Answer": "neutral",
      Callback: "warning",
      Busy: "error",
      Invalid: "error",
    };
    return <Badge variant={variantMap[response] || "neutral"}>{response}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      Hot: "error",
      Warm: "warning",
      Cold: "info",
      Uncategorized: "neutral",
    };
    return <Badge variant={variantMap[category] || "neutral"}>{category}</Badge>;
  };

  const callLogColumns: Column<CallLog>[] = [
    { key: "contactName", label: "Contact Name", sortable: true, render: (c) => <span className="font-semibold text-zinc-900 dark:text-white">{c.contactName}</span> },
    { key: "phoneNumber", label: "Phone Number", sortable: true, render: (c) => <span className="font-mono text-xs whitespace-nowrap">{c.phoneNumber}</span> },
    { key: "type", label: "Type", sortable: true, render: (c) => <Badge variant={c.type === "Inbound" ? "primary" : "neutral"}>{c.type}</Badge> },
    { key: "duration", label: "Duration", sortable: true, render: (c) => <span className="font-mono text-xs">{c.duration}</span> },
    { key: "timestamp", label: "Time", sortable: true, render: (c) => <span className="text-xs whitespace-nowrap">{c.timestamp}</span> },
    { key: "credits", label: "Credits", sortable: true, render: (c) => <span className="font-mono text-xs">{c.credits}</span> },
    { key: "response", label: "Response", sortable: true, render: (c) => getResponseBadge(c.response) },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
    { key: "humanResponse", label: "Human Response", sortable: true, render: (c) => <span className="text-xs">{c.humanResponse}</span> },
    {
      key: "recordingScript",
      label: "Recording / Script",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300" title="Play Recording">
            <PlayCircle className="h-4 w-4" />
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" title="View Script">
            <FileText className="h-4 w-4" />
          </button>
        </div>
      )
    },
    { key: "aiClassification", label: "AI Classification", sortable: true, render: (c) => <span className="text-xs whitespace-nowrap">{c.aiClassification}</span> },
    { key: "category", label: "Category", sortable: true, render: (c) => getCategoryBadge(c.category) },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <button className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      )
    },
  ];

  // Mock live stats based on campaign status
  let liveStats: LiveTrackingStats = { registry: 0, standby: 0, dialer: 0, analysis: 0, completed: 0, failed: 0 };
  if (campaign.status === "Running") {
    liveStats = { registry: 15, standby: 8, dialer: 3, analysis: 10, completed: 8, failed: 2 };
  } else if (campaign.status === "Completed") {
    liveStats = { registry: 0, standby: 0, dialer: 0, analysis: 0, completed: campaign.completedCalls, failed: campaign.failedCalls };
  } else if (campaign.status === "Scheduled") {
    liveStats = { registry: campaign.totalCalls, standby: 0, dialer: 0, analysis: 0, completed: 0, failed: 0 };
  }

  const campaignLogs = dummyCallLogs.filter(log => log.campaignId === campaignId);

  return (
    <DashboardShell title="Campaign Details">
      <div className="flex flex-col gap-6 p-1 sm:p-4 overflow-y-auto pb-10">
        
        {/* Header & Back Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/campaign')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 truncate">
              {campaign.name}
              {getStatusBadge(campaign.status)}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-1 truncate">
              <Clock className="h-4 w-4 shrink-0" />
              Scheduled for: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{campaign.schedule}</span>
            </p>
          </div>
        </div>

        {/* Top Section: Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/50 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2 text-violet-600 dark:text-violet-400">
              <Users2 className="h-5 w-5" />
              <h3 className="font-semibold text-sm">Total Contacts</h3>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{campaign.totalCalls}</p>
            <p className="text-[10px] text-zinc-500 mt-2 truncate">From: {campaign.uploadSource}</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/50 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
              <PlayCircle className="h-5 w-5" />
              <h3 className="font-semibold text-sm">AI Agent</h3>
            </div>
            <p className="text-xl font-bold text-zinc-900 dark:text-white">{campaign.agent}</p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/50 md:col-span-2">
            <div className="flex items-center gap-3 mb-2 text-emerald-600 dark:text-emerald-400">
              <FileText className="h-5 w-5" />
              <h3 className="font-semibold text-sm">Agent Script</h3>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-100 text-xs text-zinc-700 shadow-inner dark:bg-[#121622] dark:border-zinc-800/50 dark:text-zinc-300 italic h-[60px] overflow-y-auto">
              "{campaign.script}"
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/50">
          <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white text-sm">Performance Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
             <div className="flex flex-col"><span className="text-zinc-500 text-xs">Completed</span><span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{campaign.completedCalls || 0}</span></div>
             <div className="flex flex-col"><span className="text-zinc-500 text-xs">Failed</span><span className="text-xl font-bold text-red-600 dark:text-red-400">{campaign.failedCalls || 0}</span></div>
             <div className="flex flex-col"><span className="text-zinc-500 text-xs">Interested</span><span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{campaign.interested || 0}</span></div>
             <div className="flex flex-col"><span className="text-zinc-500 text-xs">Callbacks</span><span className="text-xl font-bold text-amber-600 dark:text-amber-400">{campaign.callbacks || 0}</span></div>
             <div className="flex flex-col"><span className="text-zinc-500 text-xs">Credits Used</span><span className="text-xl font-bold text-zinc-900 dark:text-white">${(campaign.creditsUsed || 0).toFixed(2)}</span></div>
          </div>
        </div>

        {/* Middle Section: Live Tracking */}
        <div className="mt-2 h-[220px]">
          <LiveTracking stats={liveStats} layout="horizontal" />
        </div>

        {/* Bottom Section: Call Logs */}
        <div className="flex flex-col mt-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Campaign Call Logs</h2>
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/60 rounded-xl overflow-hidden p-1 shadow-sm h-full min-h-[500px]">
            <DataTable 
              data={campaignLogs}
              columns={callLogColumns}
              searchableKeys={["phoneNumber", "contactName", "status"]}
              emptyStateMessage="No call logs available"
              emptyStateSubMessage="Calls will appear here once the campaign starts processing."
              disablePagination={true}
              onRowClick={setSelectedLog}
            />
          </div>
        </div>

      </div>

      <Dialog open={!!selectedLog} onOpenChange={(open) => { if (!open) setSelectedLog(null); }}>
        <DialogContent className="max-w-2xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          
          {selectedLog && (
            <div className="flex flex-col gap-6 mt-2">
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div><span className="text-zinc-500 text-xs">Contact Name</span><p className="font-semibold text-zinc-900 dark:text-white">{selectedLog.contactName}</p></div>
                <div><span className="text-zinc-500 text-xs">Phone Number</span><p className="font-semibold text-zinc-900 dark:text-white">{selectedLog.phoneNumber}</p></div>
                <div><span className="text-zinc-500 text-xs">Status</span><p className="mt-1">{getStatusBadge(selectedLog.status)}</p></div>
                <div><span className="text-zinc-500 text-xs">Duration & Time</span><p className="font-medium text-zinc-900 dark:text-white">{selectedLog.duration} • {selectedLog.timestamp}</p></div>
              </div>

              {/* Call Recording Player */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="mb-3 text-sm font-bold tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-violet-500" />
                  Call Recording
                </h3>
                
                <div className="flex items-center gap-4 bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-700/50 rounded-lg p-3">
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 shadow-sm transition">
                    <PlayCircle className="h-6 w-6" />
                  </button>
                  <div className="flex-1">
                     <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                       <div className="h-full bg-violet-500 w-[30%]" />
                     </div>
                     <div className="flex justify-between text-xs text-zinc-500 mt-2 font-medium">
                       <span>00:15</span>
                       <span>{selectedLog.duration}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Call Transcript */}
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <h3 className="mb-3 text-sm font-bold tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-500" />
                  Transcript
                </h3>
                
                <div className="flex flex-col gap-3 h-[200px] overflow-y-auto pr-2">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                      <Mic className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-700/50 p-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">
                      Hello, is this {selectedLog.contactName}?
                    </div>
                  </div>
                  
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
                      <Users2 className="h-3 w-3 text-zinc-600 dark:text-zinc-300" />
                    </div>
                    <div className="bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 p-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">
                      Yes, speaking. Who is this?
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                      <Mic className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-white dark:bg-[#121622] border border-zinc-200 dark:border-zinc-700/50 p-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">
                      I'm calling on behalf of the company to discuss our latest updates.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}

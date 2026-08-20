"use client";

import { useMemo } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column, FilterOption } from "@/components/shared/DataTable";

// --- Mock Data ---
interface BroadcastHistoryItem {
  id: string;
  name: string;
  type: "Campaign" | "Custom Upload";
  date: string;
  targetCount: number;
  status: "Completed" | "Sending" | "Failed" | "Scheduled";
  materialsSummary: string;
}

const mockHistoryData: BroadcastHistoryItem[] = [
  {
    id: "brd-001",
    name: "Summer Sale Promo",
    type: "Campaign",
    date: "2024-05-12T10:30:00",
    targetCount: 1540,
    status: "Completed",
    materialsSummary: "Text, Image",
  },
  {
    id: "brd-002",
    name: "Custom Export VIPs",
    type: "Custom Upload",
    date: "2024-05-14T14:15:00",
    targetCount: 120,
    status: "Completed",
    materialsSummary: "Text",
  },
  {
    id: "brd-003",
    name: "Q3 Webinar Invite",
    type: "Campaign",
    date: "2024-05-15T09:00:00",
    targetCount: 450,
    status: "Failed",
    materialsSummary: "Text, Doc",
  },
  {
    id: "brd-004",
    name: "Product Update Alpha",
    type: "Campaign",
    date: "2024-05-16T11:45:00",
    targetCount: 890,
    status: "Sending",
    materialsSummary: "Image",
  },
  {
    id: "brd-005",
    name: "Weekend Special",
    type: "Campaign",
    date: "2024-05-18T10:00:00",
    targetCount: 2100,
    status: "Scheduled",
    materialsSummary: "Text, Image",
  }
];

export default function BroadcastHistoryPage() {
  
  const columns: Column<BroadcastHistoryItem>[] = useMemo(() => [
    {
      key: "name",
      label: "Broadcast Name",
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.name}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.id}</p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Source Type",
      sortable: true,
      render: (item) => (
        <span className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold ${
          item.type === "Campaign" 
            ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400" 
            : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
        }`}>
          {item.type}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date & Time",
      sortable: true,
      render: (item) => (
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {new Date(item.date).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </span>
      ),
    },
    {
      key: "targetCount",
      label: "Recipients",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-zinc-700 dark:text-zinc-200">
          {item.targetCount.toLocaleString()}
        </span>
      ),
    },
    {
      key: "materialsSummary",
      label: "Payload",
      render: (item) => (
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {item.materialsSummary}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => {
        const statusStyles = {
          Completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-800/50",
          Failed: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800/50",
          Sending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-800/50",
          Scheduled: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800/50",
        };

        return (
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusStyles[item.status]}`}>
            {item.status === 'Sending' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>}
            {item.status}
          </span>
        );
      },
    },
  ], []);

  const uniqueStatuses = Array.from(new Set(mockHistoryData.map((d) => d.status)));
  const uniqueTypes = Array.from(new Set(mockHistoryData.map((d) => d.type)));

  const filters: FilterOption[] = useMemo(() => [
    { key: "status", label: "Status", options: uniqueStatuses.map(s => ({ label: s, value: s })) },
    { key: "type", label: "Source Type", options: uniqueTypes.map(t => ({ label: t, value: t })) },
  ], [uniqueStatuses, uniqueTypes]);

  return (
    <DashboardShell title="Broadcast History">
      <div className="flex flex-col h-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/chat" className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 transition-colors mb-2">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Chat
            </Link>
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3 tracking-tight">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <Clock className="h-5 w-5" />
              </div>
              Broadcast History
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              View all previously sent messages, broadcasts, and their delivery statuses.
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 min-h-0">
          <DataTable
            data={mockHistoryData}
            columns={columns}
            searchableKeys={["name", "id"]}
            filters={filters}
            exportFileName="broadcast_history.xlsx"
            emptyStateMessage="No broadcasts found"
            emptyStateSubMessage="You haven't sent any broadcast messages yet."
          />
        </div>
      </div>
    </DashboardShell>
  );
}

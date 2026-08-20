"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import DataTable, { Column, FilterOption } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import { PlayCircle, FileText, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { mockCallLogs, humanResponseOptions, CallLogEntry } from "./_mockData";

export default function CallLogsPage() {
  const [data, setData] = useState<CallLogEntry[]>(mockCallLogs);

  const handleHumanResponseChange = (id: string, newValue: string) => {
    setData((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, humanResponse: newValue } : log
      )
    );
    // In a real app, you would make an API call here and perhaps show a toast notification
    console.log(`Updated log ${id} human response to: ${newValue}`);
  };

  const getStatusBadge = (status: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      Completed: "success",
      Running: "info",
      Failed: "error",
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
      Hot: "error", // often Hot is red in sales
      Warm: "warning",
      Cold: "info",
      Uncategorized: "neutral",
    };
    return <Badge variant={variantMap[category] || "neutral"}>{category}</Badge>;
  };

  const columns: Column<CallLogEntry>[] = [
    { key: "name", label: "Name", sortable: true, render: (c) => <span className="font-semibold">{c.name}</span> },
    { key: "phone", label: "Phone", sortable: true, render: (c) => <span className="font-mono text-xs whitespace-nowrap">{c.phone}</span> },
    { key: "type", label: "Type", sortable: true, render: (c) => <Badge variant={c.type === "Inbound" ? "primary" : "neutral"}>{c.type}</Badge> },
    { key: "duration", label: "Duration", sortable: true, render: (c) => <span className="font-mono text-xs">{c.duration}</span> },
    {
      key: "dateTime",
      label: "Date & Time",
      sortable: true,
      render: (c) => {
        const d = new Date(c.dateTime);
        return (
          <div className="flex flex-col whitespace-nowrap">
            <span>{d.toLocaleDateString()}</span>
            <span className="text-[10px] text-zinc-500">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        );
      }
    },
    { key: "credits", label: "Credits", sortable: true, render: (c) => <span className="font-mono text-xs">{c.credits}</span> },
    { key: "response", label: "Response", sortable: true, render: (c) => getResponseBadge(c.response) },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
    {
      key: "humanResponse",
      label: "Human Response",
      render: (c) => (
        <select
          value={c.humanResponse}
          onChange={(e) => handleHumanResponseChange(c.id, e.target.value)}
          className="min-w-[140px] rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        >
          {humanResponseOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )
    },
    {
      key: "recordingScript",
      label: "Recording / Script",
      render: (c) => (
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
    { key: "agent", label: "Agent", sortable: true, render: (c) => <span className="text-xs whitespace-nowrap">{c.agent}</span> },
    { key: "category", label: "Category", sortable: true, render: (c) => getCategoryBadge(c.category) },
    {
      key: "actions",
      label: "Actions",
      render: (c) => (
        <button className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      )
    },
  ];

  const uniqueAgents = Array.from(new Set(data.map((d) => d.agent)));
  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));
  const uniqueCategories = Array.from(new Set(data.map((d) => d.category)));
  const uniqueResponses = Array.from(new Set(data.map((d) => d.response)));
  const uniqueStatuses = Array.from(new Set(data.map((d) => d.status)));
  const uniqueAiClassifications = Array.from(new Set(data.map((d) => d.aiClassification)));

  const filters: FilterOption[] = [
    { key: "type", label: "Type", options: uniqueTypes.map(t => ({ label: t, value: t })) },
    { key: "category", label: "Category", options: uniqueCategories.map(c => ({ label: c, value: c })) },
    { key: "response", label: "Response", options: uniqueResponses.map(r => ({ label: r, value: r })) },
    { key: "status", label: "Status", options: uniqueStatuses.map(s => ({ label: s, value: s })) },
    { key: "aiClassification", label: "AI Classification", options: uniqueAiClassifications.map(ai => ({ label: ai, value: ai })) },
    { key: "agent", label: "Agent", options: uniqueAgents.map(a => ({ label: a, value: a })) },
  ];

  const handleMultiSelectActions = (selectedItems: CallLogEntry[], clearSelection: () => void) => (
    <>
      <button className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
        <Trash2 className="h-3.5 w-3.5" />
        Delete Selected
      </button>
      <button
        onClick={clearSelection}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        Clear Selection
      </button>
    </>
  );

  return (
    <DashboardShell title="Call Logs">
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">All Call Logs</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            A comprehensive view of all inbound and outbound calls with detailed metrics.
          </p>
        </div>

        <div className="flex-1 min-h-0">
          <DataTable
            data={data}
            columns={columns}
            searchableKeys={["name", "phone", "agent", "aiClassification"]}
            filters={filters}
            enableMultiSelect={true}
            multiSelectActions={handleMultiSelectActions}
            exportFileName="all_call_logs.xlsx"
          />
        </div>
      </div>
    </DashboardShell>
  );
}

import React, { useState } from "react";
import {
  FileSpreadsheet,
  User,
  Calendar,
  Rocket,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Send,
  Image as ImageIcon,
  FileText,
  Paperclip,
  Check,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import EditableScript from "./EditableScript";
import UploadSource from "./UploadSource";
import { CampaignFormData, UploadSourceType } from "./types";
import {
  mockMaterialImages,
  mockMaterialTexts,
  mockMaterialDocs,
} from "@/app/chat/_mockData";

interface CampaignFormProps {
  formData: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  onSubmit: () => void;
  errors: Record<string, string>;

  // Upload specific props
  onFileUpload: (file: File) => void;
  fileUploaded: boolean;
  fileName?: string;
  fileSize?: string;
  totalContacts?: number;
  onGoogleSheetLoaded?: (contacts: any[], sheetId: string) => void;
}

const agents = [
  "Voice-A (Sales)",
  "Voice-B (Support)",
  "Voice-C (Followup)",
  "Voice-D (Survey)",
];

export default function CampaignForm({
  formData,
  onChange,
  onSubmit,
  errors,
  onFileUpload,
  fileUploaded,
  fileName,
  fileSize,
  totalContacts,
  onGoogleSheetLoaded,
}: CampaignFormProps) {
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);

  // Auto Send state fallback defaults
  const isAutoSendOn = formData.autoSendMessageEnabled ?? true;
  const currentTrigger = formData.autoSendTrigger || "interested";
  const currentMaterialType = formData.autoSendMaterialType || "text";
  const currentMaterialId = formData.autoSendMaterialId || "txt-1";
  const currentCategory = formData.autoSendTargetCategory || "all";

  // Helper to get selected material name
  const getSelectedMaterialTitle = () => {
    if (currentMaterialType === "text") {
      const found = mockMaterialTexts.find((m) => m.id === currentMaterialId);
      return found ? `Text: "${found.title}"` : "Text Message";
    } else if (currentMaterialType === "image") {
      const found = mockMaterialImages.find((m) => m.id === currentMaterialId);
      return found ? `Image: "${found.title}"` : "Image Asset";
    } else {
      const found = mockMaterialDocs.find((m) => m.id === currentMaterialId);
      return found ? `Document: "${found.title}"` : "PDF Document";
    }
  };

  const getTriggerLabel = () => {
    switch (currentTrigger) {
      case "interested":
        return "Lead Expresses Interest";
      case "completed":
        return "Call Completed";
      case "unanswered":
        return "Unanswered / Followup Needed";
      default:
        return "Any Call Outcome";
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/20 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/60 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col gap-8 relative z-10">
        <div>
          <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">
            Campaign Details
          </h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Configure your AI calling campaign and automated messaging rules.
          </p>
        </div>

        <div className="space-y-6">
          {/* Campaign Title */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
              <FileSpreadsheet className="h-4 w-4 text-violet-500" />
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.campaignTitle}
              onChange={(e) => onChange({ campaignTitle: e.target.value })}
              placeholder="e.g. Q3 Marketing Outreach"
              className={`w-full rounded-2xl border bg-white/80 px-5 py-3 text-sm font-medium transition-all placeholder:text-zinc-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/15 dark:bg-zinc-950/50 dark:hover:bg-zinc-950/80 dark:focus:bg-zinc-950/80 dark:placeholder:text-zinc-600 ${
                errors.campaignTitle
                  ? "border-red-400 dark:border-red-500/50"
                  : "border-zinc-200/80 focus:border-violet-400 dark:border-zinc-800/80"
              }`}
            />
            {errors.campaignTitle && (
              <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-red-500 inline-block" /> {errors.campaignTitle}
              </p>
            )}
          </div>

          {/* Select AI Agent */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
              <User className="h-4 w-4 text-indigo-500" />
              Select AI Agent <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                className={`flex w-full items-center justify-between rounded-2xl border bg-white/80 px-5 py-3 text-sm font-medium transition-all hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:bg-zinc-950/50 dark:hover:bg-zinc-950/80 dark:focus:bg-zinc-950/80 ${
                  errors.agent
                    ? "border-red-400 dark:border-red-500/50"
                    : "border-zinc-200/80 focus:border-indigo-400 dark:border-zinc-800/80"
                }`}
              >
                <span
                  className={
                    formData.agent ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600"
                  }
                >
                  {formData.agent || "Select an agent..."}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                    showAgentDropdown ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>
              {showAgentDropdown && (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-zinc-200/80 bg-white/95 py-2 shadow-xl backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/95 transform opacity-100 scale-100 transition-all origin-top">
                  {agents.map((agent) => (
                    <button
                      key={agent}
                      type="button"
                      onClick={() => {
                        onChange({ agent });
                        setShowAgentDropdown(false);
                      }}
                      className="flex w-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {agent}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.agent && (
              <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-red-500 inline-block" /> {errors.agent}
              </p>
            )}
          </div>

          {/* Schedule Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
              <Calendar className="h-4 w-4 text-emerald-500" />
              Schedule Date <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => onChange({ scheduleDate: e.target.value })}
                  className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm font-medium transition-all hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:bg-zinc-950/50 dark:hover:bg-zinc-950/80 dark:focus:bg-zinc-950/80 ${
                    errors.scheduleDate
                      ? "border-red-400 dark:border-red-500/50"
                      : "border-zinc-200/80 focus:border-emerald-400 dark:border-zinc-800/80"
                  }`}
                />
                {errors.scheduleDate && (
                  <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" /> {errors.scheduleDate}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="time"
                  value={formData.scheduleTime}
                  onChange={(e) => onChange({ scheduleTime: e.target.value })}
                  className={`w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm font-medium transition-all hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/15 dark:bg-zinc-950/50 dark:hover:bg-zinc-950/80 dark:focus:bg-zinc-950/80 ${
                    errors.scheduleTime
                      ? "border-red-400 dark:border-red-500/50"
                      : "border-zinc-200/80 focus:border-emerald-400 dark:border-zinc-800/80"
                  }`}
                />
                {errors.scheduleTime && (
                  <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500 inline-block" /> {errors.scheduleTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Upload Contacts */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white/40 p-1 dark:border-zinc-800/80 dark:bg-zinc-950/40 backdrop-blur-sm">
            <UploadSource
              sourceType={formData.uploadSource}
              onChangeSource={(type) => onChange({ uploadSource: type })}
              onFileUpload={onFileUpload}
              fileUploaded={fileUploaded}
              fileName={fileName}
              fileSize={fileSize}
              totalContacts={totalContacts}
              googleSheetUrl={formData.googleSheetUrl}
              onChangeGoogleSheetUrl={(url) => onChange({ googleSheetUrl: url })}
              singleContactName={formData.singleContactName}
              onChangeSingleName={(name) => onChange({ singleContactName: name })}
              singleContactPhone={formData.singleContactPhone}
              onChangeSinglePhone={(phone) =>
                onChange({ singleContactPhone: phone })
              }
              errors={errors}
              onGoogleSheetLoaded={onGoogleSheetLoaded}
            />
          </div>

          {/* Editable Script */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white/40 p-1 dark:border-zinc-800/80 dark:bg-zinc-950/40 backdrop-blur-sm">
            <EditableScript
              script={formData.script}
              onChange={(script) => onChange({ script })}
              error={errors.script}
            />
          </div>

          {/* AUTO SEND WHATSAPP MESSAGE SECTION & TOGGLE */}
          <div className="relative rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50/80 to-white/80 dark:border-zinc-800/80 dark:from-zinc-900/80 dark:to-zinc-950/80 p-5 transition-all shadow-sm overflow-hidden">
            {isAutoSendOn && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none translate-x-1/2 -translate-y-1/2 transition-opacity duration-500" />
            )}
            
            {/* Toggle Header */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${isAutoSendOn ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
                    WhatsApp Automation
                    {isAutoSendOn && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider border border-emerald-200/50 dark:border-emerald-700/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                      </span>
                    )}
                  </h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Send follow-ups immediately after calls
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() =>
                  onChange({ autoSendMessageEnabled: !isAutoSendOn })
                }
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 ${
                  isAutoSendOn ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${
                    isAutoSendOn ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Expanded Options when Toggle is ON */}
            {isAutoSendOn && (
              <div className="relative z-10 space-y-5 pt-5 mt-5 border-t border-zinc-200/60 dark:border-zinc-800/60 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* 1. Trigger Rule */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest flex items-center justify-between">
                    <span>1. Trigger Condition</span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                      When to send
                    </span>
                  </label>
                  <select
                    value={currentTrigger}
                    onChange={(e) =>
                      onChange({ autoSendTrigger: e.target.value })
                    }
                    className="w-full appearance-none rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition-all hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100"
                  >
                    <option value="interested">
                      🎯 On Outcome: Lead Expresses Interest (Recommended)
                    </option>
                    <option value="completed">
                      ✅ On Outcome: Call Completed (All Contacts)
                    </option>
                    <option value="unanswered">
                      📞 On Outcome: Unanswered / Followup Needed
                    </option>
                    <option value="all">🌐 On Any Call Completion Event</option>
                  </select>
                </div>

                {/* 2. Select Material Type & Content */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">
                    2. Select Material Asset
                  </label>

                  {/* Material Type Tabs */}
                  <div className="flex gap-2 rounded-xl bg-zinc-200/50 p-1.5 dark:bg-zinc-800/50">
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          autoSendMaterialType: "text",
                          autoSendMaterialId: mockMaterialTexts[0].id,
                        })
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                        currentMaterialType === "text"
                          ? "bg-white text-emerald-700 shadow-md dark:bg-zinc-700 dark:text-emerald-400"
                          : "text-zinc-600 hover:bg-white/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      Text
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          autoSendMaterialType: "image",
                          autoSendMaterialId: mockMaterialImages[0].id,
                        })
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                        currentMaterialType === "image"
                          ? "bg-white text-emerald-700 shadow-md dark:bg-zinc-700 dark:text-emerald-400"
                          : "text-zinc-600 hover:bg-white/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          autoSendMaterialType: "doc",
                          autoSendMaterialId: mockMaterialDocs[0].id,
                        })
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                        currentMaterialType === "doc"
                          ? "bg-white text-emerald-700 shadow-md dark:bg-zinc-700 dark:text-emerald-400"
                          : "text-zinc-600 hover:bg-white/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <Paperclip className="h-4 w-4" />
                      Document
                    </button>
                  </div>

                  {/* Material Asset Dropdown */}
                  <div className="relative mt-2">
                    <select
                      value={currentMaterialId}
                      onChange={(e) =>
                        onChange({ autoSendMaterialId: e.target.value })
                      }
                      className="w-full appearance-none rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition-all hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100"
                    >
                      {currentMaterialType === "text" &&
                        mockMaterialTexts.map((txt) => (
                          <option key={txt.id} value={txt.id}>
                            📝 {txt.title} — "{txt.body.substring(0, 45)}..."
                          </option>
                        ))}
                      {currentMaterialType === "image" &&
                        mockMaterialImages.map((img) => (
                          <option key={img.id} value={img.id}>
                            🖼️ {img.title} ({img.size})
                          </option>
                        ))}
                      {currentMaterialType === "doc" &&
                        mockMaterialDocs.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            📄 {doc.title} ({doc.fileName})
                          </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Target Category Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">
                    3. Scope Target Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Contacts" },
                      { id: "hot", label: "🔥 Hot Leads" },
                      { id: "warm", label: "☀️ Warm Leads" },
                      { id: "cold", label: "❄️ Cold Leads" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          onChange({ autoSendTargetCategory: cat.id as any })
                        }
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                          currentCategory === cat.id
                            ? "bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] scale-105"
                            : "bg-white/80 text-zinc-600 border border-zinc-200/80 hover:bg-white hover:shadow-sm dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700/80 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Automation Summary Card */}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/20 p-4 text-sm text-emerald-950 dark:text-emerald-100 flex items-start gap-3 backdrop-blur-sm shadow-inner mt-2">
                  <Zap className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-extrabold block mb-1">Active Automation Rule:</span>
                    When a call ends with outcome <strong className="font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-1 rounded">{getTriggerLabel()}</strong>, CallingGen will automatically send <strong className="font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-1 rounded">{getSelectedMaterialTitle()}</strong> to the lead via WhatsApp Web.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="relative z-10 mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-[length:200%_auto] hover:bg-right py-4 text-sm font-bold text-white shadow-xl shadow-zinc-900/20 transition-all hover:-translate-y-0.5 dark:from-white dark:via-zinc-200 dark:to-white dark:text-zinc-900 dark:shadow-white/10"
      >
        <Rocket className="h-5 w-5" />
        Launch Campaign
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import ChatSidebar from "./_components/ChatSidebar";
import ChatWindow from "./_components/ChatWindow";
import SendMessageModal from "@/components/chat/SendMessageModal";
import WhatsAppQRModal from "@/components/chat/WhatsAppQRModal";
import { Send, QrCode, LogOut, MessageSquare, FolderOpen, History } from "lucide-react";

export default function ChatPage() {
  const [activeContactId, setActiveContactId] = useState("1");
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(true);

  return (
    <DashboardShell title="Chats">
      <div className="-m-4 md:-m-6 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-white dark:bg-zinc-950 relative">
        {/* Top Navigation / Action Bar for Chats */}
        <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-zinc-200/50 bg-white/80 px-5 py-3 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                WhatsApp Messaging Center
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {isWhatsAppConnected ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    WhatsApp Connected (+1 555-019-2831)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500">
                    <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                    WhatsApp Disconnected
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: Send Message, Material Base & WhatsApp Logout / QR */}
          <div className="flex items-center gap-3">
            <Link
              href="/chat/materials"
              className="group flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/50 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-white hover:border-violet-200 hover:text-violet-700 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-violet-800/50 dark:hover:text-violet-300 transition-all"
            >
              <FolderOpen className="h-4 w-4 text-violet-600 transition-transform group-hover:scale-110 dark:text-violet-400" />
              <span>Material Base</span>
            </Link>

            <Link
              href="/chat/history"
              className="group flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/50 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-white hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-indigo-800/50 dark:hover:text-indigo-300 transition-all"
            >
              <History className="h-4 w-4 text-indigo-600 transition-transform group-hover:-rotate-45 dark:text-indigo-400" />
              <span>History</span>
            </Link>

            <button
              onClick={() => setIsSendMessageOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_auto] hover:bg-right px-4 py-2 text-xs font-bold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>

            {isWhatsAppConnected ? (
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="group flex items-center gap-2 rounded-xl border border-red-200/50 bg-red-50/50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-md dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:hover:border-red-800/50 transition-all"
              >
                <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all"
              >
                <QrCode className="h-4 w-4" />
                <span>Scan QR Code</span>
              </button>
            )}
          </div>
        </div>

        {/* Clean 2-Column Split UI (Names Sidebar + Chat Window) */}
        <div className="flex flex-1 overflow-hidden relative z-10">
          <ChatSidebar
            activeContactId={activeContactId}
            onSelectContact={setActiveContactId}
          />
          <ChatWindow activeContactId={activeContactId} />
        </div>
      </div>

      {/* Modals */}
      <SendMessageModal
        isOpen={isSendMessageOpen}
        onClose={() => setIsSendMessageOpen(false)}
      />

      <WhatsAppQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        isConnected={isWhatsAppConnected}
        onStatusChange={setIsWhatsAppConnected}
      />
    </DashboardShell>
  );
}

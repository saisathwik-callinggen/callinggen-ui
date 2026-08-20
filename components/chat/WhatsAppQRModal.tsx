"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QrCode, RefreshCw, CheckCircle2, AlertCircle, Smartphone, ShieldCheck, X } from "lucide-react";

interface WhatsAppQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
  onStatusChange: (status: boolean) => void;
}

export default function WhatsAppQRModal({
  isOpen,
  onClose,
  isConnected,
  onStatusChange,
}: WhatsAppQRModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [justConnected, setJustConnected] = useState(false);

  const handleSimulateConnect = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onStatusChange(true);
      setJustConnected(true);
      setTimeout(() => {
        setJustConnected(false);
        onClose();
      }, 1200);
    }, 1500);
  };

  const handleDisconnect = () => {
    onStatusChange(false);
    setJustConnected(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl">
        {/* Top Accent Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-white">
                WhatsApp Connection
              </DialogTitle>
              <p className="text-xs text-emerald-100">
                {isConnected ? "Device Linked & Synced" : "Link WhatsApp Web Account"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {justConnected ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">WhatsApp Connected!</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Your WhatsApp number +1 (555) 019-2831 is active and ready to dispatch messages.
              </p>
            </div>
          ) : isConnected ? (
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <ShieldCheck className="h-8 w-8" />
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">WhatsApp Web Active</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Connected as: <span className="font-semibold text-emerald-600 dark:text-emerald-400">+1 (555) 019-2831</span>
                </p>
              </div>

              <div className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 text-xs text-zinc-600 dark:text-zinc-400 text-left space-y-2 border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Sync:</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Just now</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Daily Message Quota:</span>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300"> Unlimited</span>
                </div>
              </div>

              <div className="flex gap-3 w-full pt-2">
                <button
                  onClick={handleDisconnect}
                  className="flex-1 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/60 transition"
                >
                  Logout WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-zinc-900 dark:bg-zinc-100 py-2.5 text-xs font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-5">
              {/* QR Container */}
              <div className="relative group p-4 bg-white rounded-2xl border-2 border-emerald-500/30 shadow-lg flex flex-col items-center">
                <div className="relative h-56 w-56 bg-zinc-900 p-3 rounded-xl flex items-center justify-center">
                  {/* Dummy SVG QR Code */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    {/* Corners */}
                    <rect x="5" y="5" width="25" height="25" fill="none" stroke="white" strokeWidth="3" />
                    <rect x="10" y="10" width="15" height="15" fill="white" />
                    <rect x="70" y="5" width="25" height="25" fill="none" stroke="white" strokeWidth="3" />
                    <rect x="75" y="10" width="15" height="15" fill="white" />
                    <rect x="5" y="70" width="25" height="25" fill="none" stroke="white" strokeWidth="3" />
                    <rect x="10" y="75" width="15" height="15" fill="white" />

                    {/* Random Grid Blocks to represent QR pattern */}
                    <rect x="35" y="10" width="8" height="8" />
                    <rect x="50" y="10" width="8" height="18" />
                    <rect x="10" y="35" width="18" height="8" />
                    <rect x="35" y="35" width="12" height="12" />
                    <rect x="55" y="35" width="10" height="10" />
                    <rect x="75" y="35" width="15" height="8" />
                    <rect x="35" y="55" width="8" height="18" />
                    <rect x="50" y="50" width="15" height="15" />
                    <rect x="70" y="55" width="10" height="25" />
                    <rect x="35" y="78" width="18" height="8" />
                    <rect x="58" y="78" width="8" height="8" />
                  </svg>

                  {/* Center WhatsApp Logo Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-md">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center text-white p-4">
                      <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin mb-2" />
                      <p className="text-xs font-semibold">Scanning QR Code...</p>
                      <p className="text-[10px] text-emerald-200 mt-1">Connecting to WhatsApp</p>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Auto-refreshing QR code
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2 w-full text-left">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  How to connect:
                </h4>
                <ol className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-decimal pl-4">
                  <li>Open <strong>WhatsApp</strong> on your mobile phone</li>
                  <li>Tap <strong>Menu</strong> (⋮) or <strong>Settings</strong> & select <strong>Linked Devices</strong></li>
                  <li>Tap <strong>Link a Device</strong></li>
                  <li>Point your camera at this QR code to scan</li>
                </ol>
              </div>

              {/* Action */}
              <button
                onClick={handleSimulateConnect}
                disabled={isScanning}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:opacity-95 transition disabled:opacity-50"
              >
                <QrCode className="h-4 w-4" />
                {isScanning ? "Linking Account..." : "Simulate QR Scan & Connect"}
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

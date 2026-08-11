"use client";

import DashboardShell from "@/components/DashboardShell";
import { useState } from "react";
import { 
  Building2, 
  CreditCard, 
  Bot, 
  Save,
  Lock,
  PhoneCall
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 1000);
  };

  return (
    <DashboardShell title="User Profile">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Profile Overview</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            View your account details, subscription, and AI agent configuration.
          </p>
        </div>

        {/* Company & Personal Details */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <Building2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Company & Personal Details</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Your organization and contact information.</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Company Name</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">CallingGen Corp</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Industry / Sector</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Technology & Software</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Full Name</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user?.name ?? "Admin User"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Email Address</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user?.email ?? "admin@callinggen.com"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Mobile Number</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">+1 (555) 019-2834</p>
            </div>
          </div>
        </div>

        {/* Subscription & Connectivity */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Subscription & Connectivity</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Your current plan and telephony configuration.</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Subscription Plan</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                  Starter Plan
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Allocated Credits</p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">75 Credits</p>
            </div>
            <div className="md:col-span-1">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Primary Phone Number</p>
              <div className="mt-1 flex items-center gap-2">
                <PhoneCall className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">+1 (555) 123-4567</span>
                <span className="ml-1 text-xs text-zinc-500">(Vobiz)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agent Configuration */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-6 shadow-sm dark:bg-emerald-950/10">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <Bot className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Active AI Agents</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Your configured AI calling assistants.</p>
            </div>
          </div>
          
          <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              AGENT 1 (Primary)
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Agent Name</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sales Assistant</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Language</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">English</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Voice Profile</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Female 1 (Professional)</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Agent Script / System Prompt</p>
                <div className="mt-2 rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300">
                  <p>
                    You are a professional sales assistant calling on behalf of CallingGen Corp. Your goal is to introduce our new AI telephony services to potential clients and schedule a demo if they show interest. Keep responses concise, friendly, and helpful. Always confirm their email address before ending the call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <form onSubmit={handlePasswordSave} className="rounded-xl border border-red-500/20 bg-red-50/50 p-6 shadow-sm dark:bg-red-950/10">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Change Password</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Update your account password securely.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
             <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="Create a strong password"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-500/20 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

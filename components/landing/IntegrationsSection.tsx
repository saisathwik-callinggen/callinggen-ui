"use client";

import { Database, MessageCircle, Webhook, Code, Calendar, FileSpreadsheet, Phone, PlusCircle, CreditCard, MessageSquare, Mail, Briefcase, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

const integrationsRow1 = [
  { icon: Database, label: "Salesforce", color: "text-blue-500" },
  { icon: Database, label: "HubSpot", color: "text-orange-500" },
  { icon: MessageCircle, label: "WhatsApp", color: "text-green-500" },
  { icon: Webhook, label: "Zapier", color: "text-orange-600" },
  { icon: Calendar, label: "Google Calendar", color: "text-yellow-500" },
  { icon: MessageSquare, label: "Slack", color: "text-purple-600" },
  { icon: Mail, label: "Gmail", color: "text-red-500" },
  { icon: CreditCard, label: "Stripe", color: "text-indigo-500" },
];

const integrationsRow2 = [
  { icon: Zap, label: "Make.com", color: "text-purple-500" },
  { icon: Phone, label: "Twilio", color: "text-red-600" },
  { icon: Database, label: "Pipedrive", color: "text-emerald-500" },
  { icon: Briefcase, label: "Zendesk", color: "text-teal-600" },
  { icon: Calendar, label: "Calendly", color: "text-blue-600" },
  { icon: FileSpreadsheet, label: "Airtable", color: "text-yellow-400" },
  { icon: Code, label: "REST API", color: "text-zinc-800 dark:text-zinc-200" },
  { icon: Globe, label: "Shopify", color: "text-green-600" },
];

export default function IntegrationsSection() {
  return (
    <section className="bg-white py-24 dark:bg-zinc-950 sm:py-32 overflow-hidden border-t border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Works With Your Existing Stack
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              CallingGen integrates seamlessly with over 100+ tools, CRMs, and APIs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent dark:from-zinc-950 z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent dark:from-zinc-950 z-10 pointer-events-none" />

        {/* Row 1 - Moving Left */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 shrink-0 pr-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...integrationsRow1, ...integrationsRow1].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 min-w-max hover:border-[#4F6BFF]/30 transition-colors"
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-6 shrink-0 pr-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...integrationsRow2, ...integrationsRow2].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 min-w-max hover:border-[#4F6BFF]/30 transition-colors"
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

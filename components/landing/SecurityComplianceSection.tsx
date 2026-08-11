"use client";

import { ShieldCheck, Lock, Server, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityComplianceSection() {
  return (
    <section className="bg-[#0a0a0a] py-24 sm:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-6">
              Enterprise-Grade Security
            </h2>
            <p className="text-lg text-zinc-400">
              We take data protection seriously. CallingGen is built from the ground up to meet the strict security and privacy requirements of healthcare, finance, and enterprise organizations.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111] border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors"
          >
            <Lock className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">End-to-End Encryption</h3>
            <p className="text-sm text-zinc-400">
              All data is encrypted in transit and at rest using AES-256 and TLS 1.3 standards.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111] border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors"
          >
            <FileCheck className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">SOC 2 Type II Compliant</h3>
            <p className="text-sm text-zinc-400">
              Regularly audited by third parties to ensure we maintain the highest security protocols.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#111] border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">HIPAA Ready</h3>
            <p className="text-sm text-zinc-400">
              We sign BAAs. Our platform is fully equipped to handle sensitive Protected Health Information (PHI).
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#111] border border-zinc-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors"
          >
            <Server className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">GDPR & CCPA Compliant</h3>
            <p className="text-sm text-zinc-400">
              Full control over data residency, retention policies, and automated PII redaction.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

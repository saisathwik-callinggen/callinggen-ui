"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is CallingGen?",
    answer: "CallingGen is a modern AI voice calling platform that enables businesses to automate inbound and outbound phone calls using human-like conversational AI."
  },
  {
    question: "How does AI calling work?",
    answer: "Our system uses advanced language models combined with ultra-realistic text-to-speech engines. You configure an agent's persona and knowledge base, and it converses naturally with your customers over standard phone networks."
  },
  {
    question: "Can it receive inbound calls?",
    answer: "Yes, you can provision a dedicated phone number or port your existing number to handle 24/7 inbound customer support, appointment bookings, and inquiries."
  },
  {
    question: "Can I customize the AI?",
    answer: "Absolutely. You can customize the agent's voice, accent, language, tone, and provide specific knowledge bases (PDFs, URLs) for it to draw answers from."
  },
  {
    question: "Does it support multiple languages?",
    answer: "Yes, our AI agents can converse fluently in over 30 languages, automatically detecting the caller's language and responding accordingly."
  },
  {
    question: "Can it integrate with CRM?",
    answer: "Yes, CallingGen offers seamless integrations with major CRMs like Salesforce, HubSpot, and GoHighLevel, as well as a robust REST API and Webhooks for custom integrations."
  },
  {
    question: "Is call recording available?",
    answer: "Yes, all calls are recorded and transcribed with high accuracy. You can review audio playback and read transcripts directly from your dashboard."
  },
  {
    question: "How secure is CallingGen?",
    answer: "We employ enterprise-grade security protocols, including end-to-end encryption for data in transit and at rest, SOC2 compliance measures, and strict access controls to protect your data."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white py-24 dark:bg-zinc-950 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`rounded-2xl border transition-all ${
                openIndex === i 
                  ? "border-[#6C4CF1]/30 bg-indigo-50/50 dark:border-[#6C4CF1]/30 dark:bg-[#6C4CF1]/5" 
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-zinc-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180 text-[#6C4CF1]" : ""
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

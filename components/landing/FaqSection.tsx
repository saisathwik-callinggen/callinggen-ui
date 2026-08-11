"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is CallingGen and how does it work?",
    answer: "CallingGen is an AI calling platform. You simply upload your contacts and a script, and our human-like AI automatically calls them, qualifies leads, and updates your CRM."
  },
  {
    question: "Do I need any technical knowledge to launch a campaign?",
    answer: "Not at all. Our Smart Campaign Builder lets anyone set up and launch a campaign in just a few clicks without writing a single line of code."
  },
  {
    question: "Can CallingGen send WhatsApp messages after a call?",
    answer: "Yes, it can automatically trigger personalized WhatsApp follow-ups immediately after a call ends."
  },
  {
    question: "Is there a free trial or demo available?",
    answer: "Yes, you can book a live demo with our team or sign up for a free trial to test the AI voice quality yourself."
  },
  {
    question: "What industries can use CallingGen?",
    answer: "It works great for Real Estate, Tax Consultancies, Insurance, Digital Marketing Agencies, Education, and any business doing high-volume outreach."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-zinc-50 py-24 dark:bg-zinc-950 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              FAQs
            </h2>
          </motion.div>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180 text-[#4F6BFF]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Phone, Briefcase, Camera, MessageCircle, Mail, Phone as PhoneIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] shadow-lg shadow-[#4F6BFF]/25">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                CallingGen
              </span>
            </Link>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 font-medium max-w-xs">
              AI-powered outbound & inbound calling platform that automates your business outreach 24/7.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-zinc-500 hover:text-[#4F6BFF] dark:text-zinc-400 dark:hover:text-[#4F6BFF]">
                <span className="sr-only">LinkedIn</span>
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-[#4F6BFF] dark:text-zinc-400 dark:hover:text-[#4F6BFF]">
                <span className="sr-only">Instagram</span>
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-[#4F6BFF] dark:text-zinc-400 dark:hover:text-[#4F6BFF]">
                <span className="sr-only">Twitter/X</span>
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Quick Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/#about" },
                    { name: "Features", href: "/#features" },
                    { name: "Pricing", href: "/pricing" }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-medium leading-6 text-zinc-600 hover:text-[#4F6BFF] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* More Links */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {[
                    { name: "FAQs", href: "/#faq" },
                    { name: "Contact", href: "/contact" }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm font-medium leading-6 text-zinc-600 hover:text-[#4F6BFF] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Contact Us</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="mailto:hello@callinggen.com" className="group flex items-center gap-3 text-sm font-medium leading-6 text-zinc-600 dark:text-zinc-400 hover:text-[#4F6BFF] dark:hover:text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-[#4F6BFF]/10">
                        <Mail className="h-4 w-4" />
                      </div>
                      hello@callinggen.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+15550000000" className="group flex items-center gap-3 text-sm font-medium leading-6 text-zinc-600 dark:text-zinc-400 hover:text-[#4F6BFF] dark:hover:text-white">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 group-hover:bg-[#4F6BFF]/10">
                        <PhoneIcon className="h-4 w-4" />
                      </div>
                      +1 (555) 000-0000
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400 font-medium">
            &copy; {new Date().getFullYear()} CallingGen, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
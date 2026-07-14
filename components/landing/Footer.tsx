import Link from "next/link";
import { Phone, MessageCircle, Globe, Briefcase, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Workflow", href: "/#workflow" },
    { name: "Pricing", href: "/pricing" },
    { name: "API", href: "#" },
    { name: "Documentation", href: "#" },
  ],
  industries: [
    { name: "Real Estate", href: "/#industries" },
    { name: "Healthcare", href: "/#industries" },
    { name: "Education", href: "/#industries" },
    { name: "Finance", href: "/#industries" },
    { name: "Retail", href: "/#industries" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "FAQs", href: "/#faqs" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 dark:bg-zinc-950 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 xl:gap-8">
          {/* Brand & Socials */}
          <div className="space-y-8 xl:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6C4CF1]">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                CallingGen
              </span>
            </Link>
            <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400 max-w-sm">
              The world's most advanced AI voice calling platform for modern businesses. Automate outbound and inbound calls with human-like AI agents.
            </p>
            <div className="flex gap-x-6">
              <a href="#" className="text-zinc-400 hover:text-[#6C4CF1] dark:hover:text-[#6C4CF1]">
                <span className="sr-only">Twitter</span>
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#6C4CF1] dark:hover:text-[#6C4CF1]">
                <span className="sr-only">GitHub</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#6C4CF1] dark:hover:text-[#6C4CF1]">
                <span className="sr-only">LinkedIn</span>
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#6C4CF1] dark:hover:text-[#6C4CF1]">
                <span className="sr-only">Mail</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-500 hover:text-[#6C4CF1] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Industries</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.industries.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-500 hover:text-[#6C4CF1] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-500 hover:text-[#6C4CF1] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-zinc-500 hover:text-[#6C4CF1] dark:text-zinc-400 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-zinc-400 text-center">
            &copy; {new Date().getFullYear()} CallingGen, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
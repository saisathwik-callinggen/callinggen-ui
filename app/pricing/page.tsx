import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle2, Minus } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Demo",
    price: "XXXX",
    description: "For individuals wanting to test the AI capabilities.",
    features: ["50 AI Calls / month", "1 Active Agent", "Basic Analytics", "Community Support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Starter",
    price: "XXXX",
    description: "For small teams automating their first workflows.",
    features: ["1,000 AI Calls / month", "5 Active Agents", "CRM Integration", "Email Support"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Professional",
    price: "XXXX",
    description: "For growing businesses scaling their outreach.",
    features: ["10,000 AI Calls / month", "Unlimited Agents", "Custom Voices", "Priority Support"],
    cta: "Upgrade to Pro",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with complex needs.",
    features: ["Unlimited Calls", "White Labeling", "Dedicated Account Manager", "SLA & 24/7 Phone Support"],
    cta: "Contact Sales",
    popular: false,
  },
];

const featureCompare = [
  { feature: "AI Voice Agents", demo: "1", starter: "5", pro: "Unlimited", ent: "Unlimited" },
  { feature: "Call Volume", demo: "50/mo", starter: "1,000/mo", pro: "10,000/mo", ent: "Custom" },
  { feature: "Languages", demo: "English only", starter: "5 Languages", pro: "30+ Languages", ent: "30+ Languages" },
  { feature: "Custom Voices", demo: false, starter: false, pro: true, ent: true },
  { feature: "CRM Integration", demo: false, starter: true, pro: true, ent: true },
  { feature: "API Access", demo: false, starter: false, pro: true, ent: true },
  { feature: "White Labeling", demo: false, starter: false, pro: false, ent: true },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="mx-auto max-w-4xl text-center mb-20">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              Simple Pricing That Grows With Your Business
            </h1>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
              Flexible plans designed for businesses of every size. No hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 mb-32">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 sm:p-10 ${
                  plan.popular 
                    ? "ring-[#6C4CF1] dark:bg-zinc-900 dark:ring-[#6C4CF1] scale-105 shadow-[#6C4CF1]/20 z-10" 
                    : "ring-zinc-200 dark:bg-zinc-900/50 dark:ring-zinc-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-[#6C4CF1] to-[#8b75f2] px-3 py-1 text-center text-xs font-semibold text-white shadow-sm">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold leading-8 text-zinc-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400 min-h-[48px]">
                    {plan.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {plan.price !== "Custom" ? `$${plan.price}` : plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">/month</span>
                    )}
                  </div>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckCircle2 className="h-6 w-5 flex-none text-[#6C4CF1]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/login"}
                  className={`mt-8 block rounded-xl px-3 py-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all ${
                    plan.popular
                      ? "bg-[#6C4CF1] text-white hover:bg-[#5b3ce0] shadow-md hover:shadow-lg"
                      : "bg-indigo-50 text-[#6C4CF1] hover:bg-indigo-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-10">
              Compare Features
            </h2>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
                <thead className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">Features</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-center">Demo</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-center">Starter</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-center">Professional</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {featureCompare.map((row) => (
                    <tr key={row.feature} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.demo === 'boolean' ? (
                          row.demo ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#6C4CF1]" /> : <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        ) : row.demo}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#6C4CF1]" /> : <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        ) : row.starter}
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#6C4CF1]" /> : <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        ) : row.pro}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.ent === 'boolean' ? (
                          row.ent ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#6C4CF1]" /> : <Minus className="mx-auto h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                        ) : row.ent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-32 rounded-3xl bg-gradient-to-br from-[#6C4CF1] to-[#4c2bb8] px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
             <div className="relative z-10">
               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                 Not sure which plan is right for you?
               </h2>
               <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                 Talk to our experts to get a custom solution tailored for your specific workflow.
               </p>
               <div className="mt-10 flex items-center justify-center gap-x-4">
                 <Link
                   href="/contact"
                   className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#6C4CF1] shadow-sm hover:bg-zinc-50 transition-all hover:scale-105"
                 >
                   Contact Sales
                 </Link>
                 <Link
                   href="/#demo"
                   className="rounded-full px-8 py-3.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-all"
                 >
                   Book Demo
                 </Link>
               </div>
             </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
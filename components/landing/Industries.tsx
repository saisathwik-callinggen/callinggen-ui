import { Home, GraduationCap, HeartPulse, Briefcase, Landmark, ShoppingBag, Car, Hotel, Headset } from "lucide-react";

const industries = [
  { icon: Home, title: "Real Estate", useCases: ["Lead Qualification", "Property Viewing Follow-ups", "Payment Reminders"] },
  { icon: GraduationCap, title: "Education", useCases: ["Admissions Inquiry", "Fees Collection", "Alumni Outreach"] },
  { icon: HeartPulse, title: "Healthcare", useCases: ["Appointment Scheduling", "Post-Care Follow-ups", "Insurance Reminders"] },
  { icon: Briefcase, title: "Recruitment", useCases: ["Initial Screening", "Interview Scheduling", "Candidate Reactivation"] },
  { icon: Landmark, title: "Finance", useCases: ["Loan Application Updates", "Collections", "Fraud Verification"] },
  { icon: ShoppingBag, title: "Retail", useCases: ["Abandoned Cart Calls", "Delivery Updates", "Customer Feedback"] },
  { icon: Car, title: "Automotive", useCases: ["Service Reminders", "Test Drive Booking", "Lease Expiry Follow-up"] },
  { icon: Hotel, title: "Hospitality", useCases: ["Booking Confirmations", "Concierge Services", "Review Requests"] },
  { icon: Headset, title: "BPO & Contact Centers", useCases: ["Tier 1 Support", "Outbound Telesales", "Overflow Handling"] },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Built For Every Industry
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Discover how CallingGen automates voice operations across different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div 
                key={industry.title} 
                className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-[#6C4CF1]/50 hover:shadow-xl hover:shadow-[#6C4CF1]/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                  {industry.title}
                </h3>
                <ul className="space-y-3">
                  {industry.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6C4CF1]" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
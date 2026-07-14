import { CheckCircle2 } from "lucide-react";

const services = [
  "Sales Calls",
  "Customer Support",
  "Lead Qualification",
  "Appointment Scheduling",
  "Payment Reminders",
  "Property Enquiries",
  "Recruitment Screening",
  "Healthcare Appointments",
  "Education Admissions",
  "Survey Calls",
  "Feedback Collection",
  "Follow-up Campaigns"
];

export default function ServicesSection() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            What Can CallingGen Automate?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Our AI voice agents are highly adaptable and can be trained for almost any conversational workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <div 
              key={service}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#6C4CF1]/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <CheckCircle2 className="h-5 w-5 text-[#6C4CF1] shrink-0" />
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

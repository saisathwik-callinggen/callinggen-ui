import { 
  PhoneOutgoing, 
  HeadphonesIcon, 
  CalendarCheck, 
  Target, 
  Workflow, 
  Mic, 
  FileText, 
  PieChart, 
  Globe2, 
  Settings2, 
  Webhook, 
  Palette 
} from "lucide-react";

const features = [
  { icon: PhoneOutgoing, title: "AI Outbound Calling", desc: "Automate thousands of personalized outbound calls instantly to reach prospects faster." },
  { icon: HeadphonesIcon, title: "AI Inbound Receptionist", desc: "Never miss a call. Our AI answers instantly, routes queries, and solves problems 24/7." },
  { icon: CalendarCheck, title: "Appointment Booking", desc: "The AI checks calendar availability and schedules meetings directly with your leads." },
  { icon: Target, title: "Lead Qualification", desc: "Ask qualifying questions and score leads automatically before passing them to human agents." },
  { icon: Workflow, title: "CRM Integration", desc: "Sync calls, transcripts, and lead statuses directly to HubSpot, Salesforce, or your custom CRM." },
  { icon: Mic, title: "Call Recording", desc: "Every conversation is recorded in high quality for compliance, training, and quality assurance." },
  { icon: FileText, title: "Transcriptions", desc: "Get highly accurate, searchable text transcriptions of every call within seconds." },
  { icon: PieChart, title: "Analytics Dashboard", desc: "Track success rates, call durations, and campaign ROI with beautiful, real-time analytics." },
  { icon: Globe2, title: "Multi-language Support", desc: "Converse fluently in over 30 languages with native-sounding accents and perfect grammar." },
  { icon: Settings2, title: "Workflow Automation", desc: "Trigger emails, SMS, or webhooks automatically based on call outcomes." },
  { icon: Webhook, title: "API Integration", desc: "Build custom integrations and control your AI agents programmatically via REST API." },
  { icon: Palette, title: "White Label Support", desc: "Offer AI voice calling to your own clients under your brand with our enterprise white-label solution." },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 dark:bg-zinc-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Everything You Need To Scale Voice Operations
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            A comprehensive suite of powerful features designed to make AI calling indistinguishable from human interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="group relative rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-all hover:-translate-y-1 hover:border-[#6C4CF1]/50 hover:bg-white hover:shadow-xl hover:shadow-[#6C4CF1]/10 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 transition-colors group-hover:bg-[#6C4CF1] group-hover:ring-[#6C4CF1] dark:bg-zinc-800 dark:ring-zinc-700 dark:group-hover:bg-[#6C4CF1] dark:group-hover:ring-[#6C4CF1]">
                  <Icon className="h-6 w-6 text-zinc-600 transition-colors group-hover:text-white dark:text-zinc-400" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
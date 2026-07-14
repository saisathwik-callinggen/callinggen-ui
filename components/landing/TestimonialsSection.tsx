import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "VP of Sales, TechCorp",
    content: "CallingGen completely transformed our outbound strategy. We scaled from 500 calls a day to over 10,000 without hiring a single new rep. The AI sounds incredibly human.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Michael Chang",
    role: "Customer Success Director, FinServe",
    content: "Our customer support wait times dropped from 15 minutes to zero. The AI handles all tier-1 queries perfectly and only routes complex issues to our human team. A game changer.",
    avatar: "https://i.pravatar.cc/150?u=michael",
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, GrowthEstate",
    content: "We use CallingGen to instantly qualify real estate leads. The AI asks all the right questions and books appointments directly into my calendar. It's like having an army of SDRs.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Loved By Innovative Teams
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-[#6C4CF1] text-[#6C4CF1]" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Real Estate Agency Owner",
    content: "CallingGen saved us countless hours. We now qualify property leads on autopilot while our agents focus on closing.",
    avatar: "https://i.pravatar.cc/150?u=rohan",
  },
  {
    name: "Priya Nair",
    role: "Tax Consultant",
    content: "We haven't missed a single client follow-up since using this. The automation is flawless and sounds incredibly natural.",
    avatar: "https://i.pravatar.cc/150?u=priyanair",
  },
  {
    name: "Arjun Desai",
    role: "Insurance Advisor",
    content: "We booked more policy consultation meetings in our first week with CallingGen than we did in the entire previous month.",
    avatar: "https://i.pravatar.cc/150?u=arjun",
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-24 dark:bg-zinc-950 sm:py-32 relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-6">
              Testimonials
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-[#4F6BFF]/40 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8 font-medium">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                <div>
                  <div className="font-bold text-zinc-900 dark:text-white leading-tight">{testimonial.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

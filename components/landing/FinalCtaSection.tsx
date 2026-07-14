import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C4CF1] to-[#4c2bb8]" />
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-5xl">
          Ready To Automate Your Business Calls?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
          Book a personalized demo and discover how CallingGen can automate customer conversations, increase productivity, and improve business growth.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#demo"
            className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-[#6C4CF1] shadow-xl transition-all hover:scale-105 hover:bg-zinc-50 hover:shadow-2xl"
          >
            Book Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

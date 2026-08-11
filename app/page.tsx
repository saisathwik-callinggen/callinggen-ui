import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AboutSection from "@/components/landing/AboutSection";
import Features from "@/components/landing/Features";
import Industries from "@/components/landing/Industries";
import WorkflowSection from "@/components/landing/WorkflowSection";
import WhyCallingGenSection from "@/components/landing/WhyCallingGenSection";
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 font-sans text-zinc-900 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Features />
        <Industries />
        <WorkflowSection />
        <WhyCallingGenSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
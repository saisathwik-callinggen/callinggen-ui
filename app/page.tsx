import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustSection from "@/components/landing/TrustSection";
import ProblemSection from "@/components/landing/ProblemSection";
import AboutSection from "@/components/landing/AboutSection";
import Features from "@/components/landing/Features";
import ServicesSection from "@/components/landing/ServicesSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import Industries from "@/components/landing/Industries";
import WhyCallingGenSection from "@/components/landing/WhyCallingGenSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import DashboardPreviewSection from "@/components/landing/DashboardPreviewSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ProblemSection />
        <AboutSection />
        <Features />
        <ServicesSection />
        <WorkflowSection />
        <Industries />
        <WhyCallingGenSection />
        <IntegrationsSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
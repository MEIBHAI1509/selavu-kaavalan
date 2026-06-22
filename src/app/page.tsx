import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Stats from "@/components/landing/stats";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
import DashboardPreview from "@/components/landing/dashboard-preview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <DashboardPreview />
      <CTA />
      <Footer />
    </main>
  );
}
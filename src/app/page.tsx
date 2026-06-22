import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
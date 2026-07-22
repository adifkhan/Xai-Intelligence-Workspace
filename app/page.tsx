import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/features/hero/Hero";
import InsightFlow from "@/components/features/insight-flow/InsightFlow";
import Dashboard from "@/components/features/dashboard/Dashboard";
import SignatureInteraction from "@/components/features/signature-interaction/SignatureInteraction";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <InsightFlow />
      <Dashboard />
      <SignatureInteraction />
      <Footer />
    </main>
  );
}

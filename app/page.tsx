import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InsightFlow from "@/components/InsightFlow";
import Navbar from "@/components/Navbar";
import SignatureInteraction from "@/components/SignatureInteraction";

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

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
// import Benefits from '../components/Benefits';
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#080d1a] min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Benefits /> */}
      <CTA />
      <Footer />
    </div>
  );
}

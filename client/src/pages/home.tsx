import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProductSection from "@/components/product-section";
import HistorySection from "@/components/history-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-black text-white font-inter overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProductSection />
      <HistorySection />
      <ContactSection />
      <Footer />
    </div>
  );
}

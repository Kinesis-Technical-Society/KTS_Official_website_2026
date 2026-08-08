import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import CultureSection from "./components/CultureSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <main className="hero-grid flex-1 w-full overflow-x-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 sm:gap-20 px-4 pb-0 pt-4 sm:pt-6 sm:px-6">
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <CultureSection />
        <div className="flex flex-col">
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </main>
  );
}

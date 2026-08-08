import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import CultureSection from "../components/CultureSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export const metadata = {
  title: "About Us | Kinesis Technical Society",
  description: "Learn about Kinesis Technical Society (KTS), our mission, domains, and culture.",
};

export default function AboutPage() {
  return (
    <main className="hero-grid flex-1">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 sm:gap-20 px-4 pb-0 pt-6 sm:px-6">
        <Navbar />
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

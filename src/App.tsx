"use client";

import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { ThriverHero } from "@/components/hero/ThriverHero";
import { GalacticPortfolioSection } from "@/components/portfolio/GalacticPortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionTone } from "@/components/layout/SectionTone";

export default function App() {
  return (
    <main className="min-h-screen text-white relative overflow-x-hidden">
      {/* Cortina de abertura (Hero intocável) */}
      <div
        className="intro-overlay fixed inset-0 z-[100] bg-[#08000E]"
        aria-hidden
      />

      <div className="intro-content relative z-10 bg-transparent">
        {/* Navbar + Hero: sem SectionTone */}
        <div className="relative z-10">
          <SiteNavbar />
          <ThriverHero />
        </div>

        <SectionTone id="solucoes" variant="light" className="py-16 md:py-24">
          <ServicesSection />
        </SectionTone>

        <SectionTone id="cases" variant="dark" className="py-16 md:py-24">
          <GalacticPortfolioSection />
        </SectionTone>

        <SectionTone id="processo" variant="light" className="py-16 md:py-24">
          <ProcessSection />
        </SectionTone>

        <SectionTone id="sobre" variant="dark" className="py-16 md:py-24">
          <AboutSection />
        </SectionTone>

        <SectionTone id="contato" variant="light" className="py-16 md:py-24">
          <ContactSection />
        </SectionTone>

        <SiteFooter />
      </div>
    </main>
  );
}

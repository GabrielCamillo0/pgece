import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GalacticPortfolioSection } from "@/components/portfolio/GalacticPortfolioSection";
import { SectionTone } from "@/components/layout/SectionTone";

export const metadata: Metadata = {
  title: "Portfolio – pgece",
  description:
    "Projects that blend aesthetics and performance to drive real results.",
};

export default function PortifolioPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteNavbar />
      <SectionTone variant="light" className="pt-24 py-16 md:py-24">
        <GalacticPortfolioSection showViewMore={false} />
      </SectionTone>
      <SiteFooter />
    </div>
  );
}

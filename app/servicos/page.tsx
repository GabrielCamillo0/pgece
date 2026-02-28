import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ServicosPageContent } from "@/components/pages/ServicosPageContent";

export const metadata: Metadata = {
  title: "Services – pgece",
  description:
    "Web development services: landing pages, multi-section websites, UI/UX, performance, integrations, and an agency-friendly format.",
};

export default function ServicosPage() {
  return (
    <div className="min-h-screen text-white relative">
      <SiteNavbar />
      <div className="pt-24 min-h-full">
        <ServicosPageContent />
      </div>
      <SiteFooter />
    </div>
  );
}

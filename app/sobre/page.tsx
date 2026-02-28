import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SobrePageContent } from "@/components/pages/SobrePageContent";

export const metadata: Metadata = {
  title: "About – pgece",
  description:
    "Technical partner for agencies and digital businesses. Development with clear scope, realistic timelines, and transparent communication.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen text-white">
      <SiteNavbar />
      <div className="pt-24">
        <SobrePageContent />
      </div>
      <SiteFooter />
    </div>
  );
}

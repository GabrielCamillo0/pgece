import type { Metadata } from "next";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContatoPageContent } from "@/components/pages/ContatoPageContent";

export const metadata: Metadata = {
  title: "Contact – pgece",
  description:
    "Get in touch for quotes and projects. Send project type, deadline, and references.",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen text-white">
      <SiteNavbar />
      <div className="pt-24">
        <ContatoPageContent />
      </div>
      <SiteFooter />
    </div>
  );
}

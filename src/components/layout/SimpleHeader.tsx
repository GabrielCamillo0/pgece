"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export function SimpleHeader() {
  const { t } = useTranslation();
  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/servicos" },
    { label: t("nav.portfolio"), href: "/#cases" },
    { label: t("nav.about"), href: "/sobre" },
    { label: t("nav.contact"), href: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08000E]/95 backdrop-blur supports-[backdrop-filter]:bg-[#08000E]/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8 gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
          aria-label={t("nav.goHomeAria")}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_0_10px_rgba(255,72,32,0.5)] opacity-90" />
          <span className="text-lg md:text-xl font-medium tracking-tight">gece</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-8 text-base md:text-lg text-white/60">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-white/50 after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08000E] rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
        </div>
        <Link href="/contato" className="md:hidden">
          <Button variant="ghost" size="sm">
            {t("nav.contact")}
          </Button>
        </Link>
      </div>
    </header>
  );
}

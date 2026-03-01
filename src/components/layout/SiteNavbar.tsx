"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

const SCROLL_THRESHOLD = 60;

type SiteNavbarProps = {
  /** Atrasa a aparição da navbar (ms); use na home para aparecer depois da hero */
  delayAppearanceMs?: number;
};

export function SiteNavbar({ delayAppearanceMs = 0 }: SiteNavbarProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const delayed = delayAppearanceMs > 0;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current =
          typeof window !== "undefined"
            ? window.scrollY ?? document.documentElement.scrollTop
            : 0;
        const prev = lastScrollY.current;
        lastScrollY.current = current;
        setVisible(() => {
          if (current <= SCROLL_THRESHOLD) return true;
          if (current > prev) return false; // descendo → ocultar
          return true; // subindo ou no topo → mostrar
        });
        ticking = false;
      });
    };

    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/servicos" },
    { label: t("nav.portfolio"), href: "/portifolio" },
    { label: t("nav.about"), href: "/sobre" },
    { label: t("nav.contact"), href: "/contato" },
  ];

  return (
    <motion.header
      initial={{
        opacity: delayed ? 0 : 1,
        y: delayed ? -120 : 0,
      }}
      animate={{
        opacity: 1,
        y: visible ? 0 : -120,
      }}
      transition={{
        opacity: {
          duration: 0.95,
          delay: delayed ? delayAppearanceMs / 1000 : 0,
          ease: [0.22, 1, 0.36, 1],
        },
        y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-6xl px-4 md:px-6 pt-4 pb-2">
        <div className="nav-glass nav-glass-transparent rounded-2xl px-8 py-4 md:px-10 md:py-5 flex items-center justify-between relative min-h-[56px] md:min-h-[64px]">
          <Link
            href="/"
            className="flex items-center gap-3 z-10 text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            aria-label={t("nav.goHomeAria")}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_0_10px_rgba(255,72,32,0.5)] opacity-90" />
            <span className="text-lg md:text-xl font-medium tracking-tight">gece</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-base md:text-lg text-white/60 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delayed ? 0.2 : 0, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  className="relative hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08000E] rounded-sm after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-white/50 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-3 z-10">
            <LanguageToggle className="hidden md:inline-flex" />
            <Link href="/contato" className="md:hidden">
              <Button variant="ghost" size="sm">
                {t("nav.contact")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

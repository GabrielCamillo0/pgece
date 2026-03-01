"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Menu, X } from "lucide-react";

const SCROLL_THRESHOLD = 60;

/** Fallback em inglês para evitar hydration mismatch (server e primeiro paint iguais) */
const FALLBACK_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/servicos" },
  { label: "Portfolio", href: "/portifolio" },
  { label: "About", href: "/sobre" },
  { label: "Contact", href: "/contato" },
] as const;
const FALLBACK_HOME_ARIA = "Go to home";

type SiteNavbarProps = {
  delayAppearanceMs?: number;
};

const linkClass =
  "relative hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08000E] rounded-sm after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-white/50 after:transition-all after:duration-300 hover:after:w-full";

export function SiteNavbar({ delayAppearanceMs = 0 }: SiteNavbarProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const delayed = delayAppearanceMs > 0;

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
          if (current > prev) return false;
          return true;
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

  const navItems = hydrated
    ? [
        { label: t("nav.home"), href: "/" },
        { label: t("nav.services"), href: "/servicos" },
        { label: t("nav.portfolio"), href: "/portifolio" },
        { label: t("nav.about"), href: "/sobre" },
        { label: t("nav.contact"), href: "/contato" },
      ]
    : FALLBACK_NAV.map((item) => ({ label: item.label, href: item.href }));
  const homeAria = hydrated ? t("nav.goHomeAria") : FALLBACK_HOME_ARIA;

  const closeMobile = () => setMobileOpen(false);

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
      <div className="pointer-events-auto mx-auto max-w-6xl px-4 md:px-6 lg:px-8 pt-4 pb-2">
        <div className="nav-glass nav-glass-transparent rounded-2xl px-4 py-3 sm:px-6 md:px-8 md:py-4 lg:px-10 lg:py-5 flex items-center justify-between relative min-h-[56px] md:min-h-[64px]">
          <Link
            href="/"
            className="flex items-center gap-3 z-10 text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            aria-label={homeAria}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_0_10px_rgba(255,72,32,0.5)] opacity-90" />
            <span className="text-lg md:text-xl font-medium tracking-tight">gece</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9 text-base md:text-lg text-white/60 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delayed ? 0.2 : 0, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right: desktop = LanguageToggle | mobile = menu button */}
          <div className="flex items-center gap-3 z-10">
            <LanguageToggle className="hidden md:inline-flex" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden text-white/80 hover:text-white"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? (hydrated ? t("nav.closeMenu") : "Close menu") : (hydrated ? t("nav.openMenu") : "Open menu")}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu: mesmo estilo (glass, links iguais) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
              aria-hidden
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[280px] md:hidden nav-glass nav-glass-transparent border-l border-white/10 rounded-l-2xl shadow-2xl pointer-events-auto"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-8">
                <nav className="flex flex-col gap-1 text-white/60" aria-label="Menu principal">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`py-3 text-lg ${linkClass} text-white/70 hover:text-white`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <LanguageToggle className="inline-flex" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

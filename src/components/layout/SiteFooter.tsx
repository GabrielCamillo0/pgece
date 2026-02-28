"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export function SiteFooter() {
  const { t } = useTranslation();
  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.services"), href: "/servicos" },
    { label: t("nav.portfolio"), href: "/portifolio" },
    { label: t("nav.about"), href: "/sobre" },
    { label: t("nav.contact"), href: "/contato" },
  ];

  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-[#05000a]/70 to-black/75">
      {/* Main footer grid */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_0_12px_rgba(255,72,32,0.5)]" />
              <span className="text-lg font-semibold tracking-tight text-white">gece</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              {t("footer.description")}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {t("footer.contact")}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a href="mailto:contato@exemplo.com" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm">
                  contato@exemplo.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                >
                  {t("footer.whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
 
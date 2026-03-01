"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/i18n/i18n";

/** Fallback para evitar hydration mismatch: servidor e primeiro paint usam inglês */
const FALLBACK_LANGUAGE_ARIA = "Language";
const FALLBACK_LABELS: Record<SupportedLanguage, string> = { en: "EN", pt: "PT", es: "ES" };

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { t, i18n } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const currentLangRaw = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0];
  const currentLang: SupportedLanguage = hydrated
    ? supportedLanguages.includes(currentLangRaw as SupportedLanguage)
      ? (currentLangRaw as SupportedLanguage)
      : "en"
    : "en"; // servidor e primeiro paint: fixo "en" para bater com o HTML

  const handleChange = (lng: SupportedLanguage) => {
    if (lng === currentLang) return;
    i18n.changeLanguage(lng);
  };

  const ariaLabel = hydrated ? t("nav.languageAria") : FALLBACK_LANGUAGE_ARIA;
  const label = (lng: SupportedLanguage) =>
    hydrated ? t(`language.${lng}`) : FALLBACK_LABELS[lng];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-1 py-1 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] ${className ?? ""}`.trim()}
      aria-label={ariaLabel}
    >
      {supportedLanguages.map((lng) => (
        <Button
          key={lng}
          type="button"
          size="sm"
          variant={lng === currentLang ? "default" : "ghost"}
          className={`h-7 min-h-[28px] rounded-full px-2.5 text-[10px] font-medium tracking-[0.12em] sm:text-[10px] md:h-6 md:min-h-[24px] md:px-2 ${
            lng === currentLang
              ? "bg-brand-red/30 text-white border border-brand-red/35 hover:bg-brand-red/35"
              : "text-white/45 hover:text-white/75 hover:bg-white/5"
          }`}
          onClick={() => handleChange(lng)}
        >
          {label(lng)}
        </Button>
      ))}
    </div>
  );
}


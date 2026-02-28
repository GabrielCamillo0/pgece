"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/i18n/i18n";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { t, i18n } = useTranslation();
  const currentLangRaw = (i18n.resolvedLanguage ?? i18n.language ?? "en").split("-")[0];
  const currentLang: SupportedLanguage = supportedLanguages.includes(
    currentLangRaw as SupportedLanguage
  )
    ? (currentLangRaw as SupportedLanguage)
    : "en";

  const handleChange = (lng: SupportedLanguage) => {
    if (lng === currentLang) return;
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-1.5 py-1 backdrop-blur ${className ?? ""}`.trim()}
      aria-label={t("nav.languageAria")}
    >
      {supportedLanguages.map((lng) => (
        <Button
          key={lng}
          type="button"
          size="sm"
          variant={lng === currentLang ? "default" : "ghost"}
          className={`h-7 px-3 text-[11px] font-medium tracking-wide ${
            lng === currentLang
              ? "bg-white text-black hover:bg-white"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => handleChange(lng)}
        >
          {t(`language.${lng}`)}
        </Button>
      ))}
    </div>
  );
}


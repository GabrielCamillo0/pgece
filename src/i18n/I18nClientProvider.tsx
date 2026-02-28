"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export function I18nClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const apply = (lng?: string) => {
      if (typeof document === "undefined") return;
      document.documentElement.lang = lng || "en";
    };

    apply(i18n.resolvedLanguage ?? i18n.language);
    const onChanged = (lng: string) => apply(lng);
    i18n.on("languageChanged", onChanged);
    return () => {
      i18n.off("languageChanged", onChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

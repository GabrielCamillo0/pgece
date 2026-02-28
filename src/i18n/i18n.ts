import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es },
} as const;

export const supportedLanguages = ["en", "pt", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: [...supportedLanguages],
      fallbackLng: "en",
      defaultNS: "translation",
      returnEmptyString: false,
      detection: {
        order: ["localStorage"],
        lookupLocalStorage: "pgece_lang",
        caches: ["localStorage"],
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
}

export default i18n;

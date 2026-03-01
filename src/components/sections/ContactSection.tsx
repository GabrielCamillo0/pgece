"use client";

import { ContactForm } from "./ContactForm";
import { useTranslation } from "react-i18next";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 text-center">
        <SectionReveal>
        <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
          {t("contactSection.label")}
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
          {t("contactSection.title")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base max-w-xl mx-auto">
          {t("contactSection.description")}
        </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
        <ContactForm className="mt-12" />
        </SectionReveal>
    </div>
  );
}

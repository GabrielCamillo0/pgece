"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SectionTone } from "@/components/layout/SectionTone";

export function SobrePageContent() {
  const { t } = useTranslation();
  const chips = t("aboutSection.chips", { returnObjects: true }) as string[] | undefined;
  const oQueVoceGanha = t("aboutSection.oQueVoceGanha", { returnObjects: true }) as string[] | undefined;

  return (
    <SectionTone variant="light" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
          {t("aboutSection.label")}
        </p>
        <h1 className="mb-6 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
          {t("aboutSection.title")}
        </h1>
        <div className="space-y-4 text-sm leading-relaxed text-white/65 md:text-base">
          <p>{t("aboutSection.paragraph1")}</p>
          <p>{t("aboutSection.paragraph2")}</p>
          <p className="text-white/80">
            <span className="bg-gradient-to-r from-brand-red/90 via-brand-orange/80 to-amber-300/80 bg-clip-text font-medium text-transparent">
              {t("aboutSection.highlight")}
            </span>
          </p>
        </div>

        {chips && chips.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3" role="list" aria-label={t("aboutSection.label")}>
            {chips.map((chip) => (
              <span
                key={chip}
                role="listitem"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-sm sm:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {oQueVoceGanha && oQueVoceGanha.length > 0 && (
          <ul className="mt-8 flex flex-col gap-2 sm:max-w-xl" aria-label={t("aboutSection.oQueVoceGanhaLabel")}>
            {oQueVoceGanha.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/80" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link href="/#cases">{t("aboutSection.ctaPrimary")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contato">{t("aboutSection.ctaSecondary")}</Link>
          </Button>
        </div>
      </div>
    </SectionTone>
  );
}

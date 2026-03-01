"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function ForAgenciesSection() {
  const { t } = useTranslation();
  return (
    <div className="relative bg-[#05000a]/55 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
            {t("forAgenciesSection.label")}
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            {t("forAgenciesSection.title")}
            <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
              {" "}
              {t("forAgenciesSection.titleAccent")}
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            {t("forAgenciesSection.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("forAgenciesSection.card1Title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <p>{t("forAgenciesSection.card1Intro")}</p>
              <ul className="space-y-1 list-inside list-disc">
                <li>{t("forAgenciesSection.card1Bullet1")}</li>
                <li>{t("forAgenciesSection.card1Bullet2")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("forAgenciesSection.card2Title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <ul className="space-y-1 list-inside list-disc">
                <li>{t("forAgenciesSection.card2Bullet1")}</li>
                <li>{t("forAgenciesSection.card2Bullet2")}</li>
                <li>{t("forAgenciesSection.card2Bullet3")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("forAgenciesSection.card3Title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <ul className="space-y-1 list-inside list-disc">
                <li>{t("forAgenciesSection.card3Bullet1")}</li>
                <li>{t("forAgenciesSection.card3Bullet2")}</li>
                <li>{t("forAgenciesSection.card3Bullet3")}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#contato">{t("forAgenciesSection.ctaPrimary")}</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#contato">{t("forAgenciesSection.ctaSecondary")}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import { StackSection } from "@/components/sections/StackSection";
import { useTranslation } from "react-i18next";
import { SectionTone } from "@/components/layout/SectionTone";

export function ServicosPageContent() {
  const { t } = useTranslation();

  return (
    <>
      <SectionTone variant="light" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-brand-red to-brand-orange" />
              <span className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
                {t("servicesSection.label")}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              {t("servicesSection.title")}
              <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
                {" "}
                {t("servicesSection.titleAccent")}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
              {t("servicesSection.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="border-white/10 bg-card/80">
                <CardHeader>
                  <Badge variant="outline" className="mb-3">
                    {t(`services.items.${service.id}.pill`)}
                  </Badge>
                  <CardTitle className="text-lg">
                    {t(`services.items.${service.id}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`services.items.${service.id}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mt-2 space-y-1.5 text-sm text-white/70">
                    {service.deliverablesKeys.map((key) => (
                      <li key={key} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-brand-red/70" />
                        <span>{t(`services.items.${service.id}.deliverables.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionTone>

      <SectionTone variant="dark" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
              {t("agenciesSection.label")}
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              {t("agenciesSection.title")}
              <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
                {t("agenciesSection.titleAccent")}
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
              {t("agenciesSection.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Card className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>{t("agenciesSection.cards.card1Title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>{t("agenciesSection.cards.card1Desc")}</p>
                <ul className="space-y-1.5" aria-label={t("agenciesSection.cards.card1Title")}>
                  {(t("agenciesSection.cards.card1Bullets", { returnObjects: true }) as string[]).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>{t("agenciesSection.cards.card2Title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>{t("agenciesSection.cards.card2Desc")}</p>
                <ul className="space-y-1.5" aria-label={t("agenciesSection.cards.card2Title")}>
                  {(t("agenciesSection.cards.card2Bullets", { returnObjects: true }) as string[]).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle>{t("agenciesSection.cards.card3Title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>{t("agenciesSection.cards.card3Desc")}</p>
                <ul className="space-y-1.5" aria-label={t("agenciesSection.cards.card3Title")}>
                  {(t("agenciesSection.cards.card3Bullets", { returnObjects: true }) as string[]).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/contato">{t("agenciesSection.ctaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </SectionTone>

      <SectionTone variant="light" className="py-16 md:py-24">
        <StackSection>
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <Card className="border-brand-red/30 bg-card/80 p-5 sm:p-6 md:p-10">
            <CardHeader className="p-0 pb-4 md:pb-6">
              <CardTitle className="text-xl md:text-3xl text-balance">
                {t("quickProject.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-0 pt-2 text-sm text-white/70 md:text-base">
              <p className="leading-relaxed">
                {t("quickProject.description")}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 font-medium text-white text-sm">
                    {t("quickProject.youGetTitle")}
                  </p>
                  <ul className="space-y-1.5" aria-label={t("quickProject.youGetTitle")}>
                    {(t("quickProject.youGet", { returnObjects: true }) as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/70" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-medium text-white text-sm">
                    {t("quickProject.needTitle")}
                  </p>
                  <ul className="space-y-1.5" aria-label={t("quickProject.needTitle")}>
                    {(t("quickProject.need", { returnObjects: true }) as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/70" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="mb-2 font-medium text-white text-sm">
                  {t("quickProject.howItWorksTitle")}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/65" aria-label={t("quickProject.howItWorksTitle")}>
                  {(t("quickProject.howItWorks", { returnObjects: true }) as string[]).map((step, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red/80" aria-hidden />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Button asChild>
                  <Link href="/contato">{t("quickProject.cta")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </StackSection>
      </SectionTone>
    </>
  );
}

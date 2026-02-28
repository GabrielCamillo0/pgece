import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import { useTranslation } from "react-i18next";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionReveal>
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-brand-red to-brand-orange" />
              <span className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
                {t("servicesSection.label")}
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              {t("servicesSection.title")}
              <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
                {" "}
                {t("servicesSection.titleAccent")}
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              {t("servicesSection.description")}
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {services.map((service, i) => (
            <SectionReveal key={service.id} delay={i * 0.06}>
              <Card className="border-white/10 bg-card/80 section-card-hover">
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
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.15}>
        <div className="mt-12 flex flex-wrap gap-3 justify-end">
            <Button asChild>
              <Link href="/servicos">{t("servicesSection.ctaServices")}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contato">{t("servicesSection.ctaContact")}</Link>
            </Button>
        </div>
        </SectionReveal>
    </div>
  );
}


"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

type StackSectionProps = { children?: React.ReactNode };

export function StackSection({ children }: StackSectionProps) {
  const { t } = useTranslation();
  const frontend = t("stackSection.items.frontend", { returnObjects: true }) as string[];
  const backend = t("stackSection.items.backend", { returnObjects: true }) as string[];
  const deploy = t("stackSection.items.deploy", { returnObjects: true }) as string[];
  const quality = t("stackSection.items.quality", { returnObjects: true }) as string[];

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
              {t("stackSection.label")}
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl text-balance">
              {t("stackSection.title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
              {t("stackSection.description")}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("stackSection.cards.frontend")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Array.isArray(frontend) && frontend.map((item) => (
                <Badge key={item} variant="default">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("stackSection.cards.backend")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Array.isArray(backend) && backend.map((item) => (
                <Badge key={item} variant="default">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("stackSection.cards.deploy")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Array.isArray(deploy) && deploy.map((item) => (
                <Badge key={item} variant="default">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>{t("stackSection.cards.quality")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Array.isArray(quality) && quality.map((item) => (
                <Badge key={item} variant="default">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {children && <div className="mt-12">{children}</div>}
    </div>
  );
}


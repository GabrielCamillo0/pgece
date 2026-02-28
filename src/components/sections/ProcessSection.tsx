import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { SectionReveal } from "@/components/layout/SectionReveal";

export function ProcessSection() {
  const { t } = useTranslation();
  const steps = t("processSection.steps", { returnObjects: true }) as {
    title: string;
    text: string;
    youReceive?: string;
  }[];
  const chips = t("processSection.chips", { returnObjects: true }) as string[];
  const guarantees = t("processSection.guarantees", { returnObjects: true }) as string[];

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionReveal>
        <header className="mb-12 max-w-2xl">
          <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
            {t("processSection.label")}
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            {t("processSection.title")}
            <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
              {t("processSection.titleAccent")}
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            {t("processSection.description")}
          </p>
          {chips?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 sm:gap-3" role="list" aria-label={t("processSection.label")}>
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
        </header>
        </SectionReveal>

        <div className="mb-10 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-brand-red/25 to-transparent" aria-hidden />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <SectionReveal key={step.title} delay={i * 0.06}>
            <Card className="border-white/10 bg-card/80 section-card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm leading-relaxed text-white/70">
                  {step.text}
                </CardDescription>
                {step.youReceive && (
                  <p className="flex items-start gap-2 text-xs leading-snug text-white/50">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/80" aria-hidden />
                    <span>{step.youReceive}</span>
                  </p>
                )}
              </CardContent>
            </Card>
            </SectionReveal>
          ))}
        </div>

        {guarantees?.length > 0 && (
          <SectionReveal delay={0.12}>
          <ul className="mt-12 flex flex-col gap-3 text-center sm:mx-auto sm:max-w-xl md:mt-16" aria-label={t("processSection.guaranteesLabel")}>
            {guarantees.map((item) => (
              <li key={item} className="flex items-center justify-center gap-2 text-sm text-white/70">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/80" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </SectionReveal>
        )}
    </div>
  );
}


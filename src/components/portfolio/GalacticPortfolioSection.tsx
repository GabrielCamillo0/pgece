"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

const CARD_WIDTH = 760;
const GAP = 36;
const MARQUEE_DURATION = 42;

/** Fallback em inglês para evitar hydration mismatch */
const FALLBACK_PORTFOLIO = {
  label: "Our work",
  titlePrefix: "Portfolio",
  titleAccent: "selected",
  subtitle:
    "Projects that blend aesthetics and performance to drive real results.",
  intro:
    "My portfolio brings together all my digital creations — from professional sites built for real projects to sample sites, blogs and experiments made for fun or to test new ideas. Here you get an overview of my style, evolution and how I build products: with a focus on quality, organization and great experience on any screen.",
  introWithTags:
    "My portfolio brings together all my digital creations — from <strong>professional sites</strong> built for real projects to <strong>sample sites</strong>, <strong>blogs</strong> and experiments made for fun or to test new ideas. Here you get an overview of my style, evolution and how I build products: with a focus on <strong>quality</strong>, <strong>organization</strong> and <strong>great experience on any screen</strong>.",
  cta: "See more",
} as const;

const row1Projects = projects.slice(0, 3);
const row2Projects = projects.slice(3, 6);

function getTrackWidth(n: number) {
  return n * CARD_WIDTH + (n - 1) * GAP;
}

type GalacticPortfolioSectionProps = { showViewMore?: boolean };

export function GalacticPortfolioSection({ showViewMore = true }: GalacticPortfolioSectionProps) {
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const label = hydrated ? t("portfolioSection.label") : FALLBACK_PORTFOLIO.label;
  const titlePrefix = hydrated
    ? t("portfolioSection.titlePrefix")
    : FALLBACK_PORTFOLIO.titlePrefix;
  const titleAccent = hydrated
    ? t("portfolioSection.titleAccent")
    : FALLBACK_PORTFOLIO.titleAccent;
  const subtitle = hydrated
    ? t("portfolioSection.subtitle")
    : FALLBACK_PORTFOLIO.subtitle;
  const cta = hydrated ? t("portfolioSection.cta") : FALLBACK_PORTFOLIO.cta;

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* ── Section header ── */}
        <div className="mb-10 md:mb-16">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-brand-red to-brand-orange" />
            <span className="text-sm tracking-[0.28em] uppercase text-brand-red font-medium font-mono">
              {label}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.05]">
            {titlePrefix}{" "}
            <span className="bg-gradient-to-r from-brand-red/70 via-brand-orange/60 to-transparent bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-base text-white/50 max-w-sm leading-relaxed">
            {subtitle}
          </p>

          {/* Intro do portfólio */}
          <p className="mt-4 md:mt-6 text-sm md:text-lg text-white/80 leading-relaxed max-w-3xl">
            {hydrated ? (
              <Trans
                i18nKey="portfolioSection.intro"
                ns="translation"
                defaultValue={FALLBACK_PORTFOLIO.introWithTags}
                components={{
                  strong: <strong className="text-white font-medium" />,
                }}
              />
            ) : (
              FALLBACK_PORTFOLIO.intro
            )}
          </p>

          {/* Decorative divider */}
          <div className="mt-10 h-px bg-gradient-to-r from-brand-red/30 via-white/8 to-transparent" />
        </div>
      </div>

      {/* ── Mobile: grid vertical (scroll natural da página) ── */}
      <div className="relative z-10 block md:hidden px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 pb-6">
          {projects.map((p) => (
            <div key={p.id} className="w-full max-w-[420px] mx-auto">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: duas filas de cards (marquee) ── */}
      <div className="relative z-10 w-full overflow-hidden hidden md:block">
          {/* Fila 1: cards entrando pela direita e saindo pela esquerda */}
          <div className="overflow-hidden py-3" aria-hidden>
            <motion.div
              className="flex w-max"
              style={{ gap: GAP }}
              animate={{ x: [0, -getTrackWidth(row1Projects.length)] }}
              transition={{
                x: {
                  duration: MARQUEE_DURATION,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
            >
              {[1, 2].map((copy) => (
                <div key={copy} className="flex shrink-0" style={{ gap: GAP }}>
                  {row1Projects.map((p) => (
                    <div
                      key={`r1-${copy}-${p.id}`}
                      className="shrink-0"
                      style={{ width: CARD_WIDTH }}
                    >
                      <ProjectCard project={p} />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Fila 2: mesma direção, sem atraso de entrada */}
          <div className="overflow-hidden py-3" aria-hidden>
            <motion.div
              className="flex w-max"
              style={{ gap: GAP }}
              animate={{ x: [0, -getTrackWidth(row2Projects.length)] }}
              transition={{
                x: {
                  duration: MARQUEE_DURATION * 1.08,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
            >
              {[1, 2].map((copy) => (
                <div key={copy} className="flex shrink-0" style={{ gap: GAP }}>
                  {row2Projects.map((p) => (
                    <div
                      key={`r2-${copy}-${p.id}`}
                      className="shrink-0"
                      style={{ width: CARD_WIDTH }}
                    >
                      <ProjectCard project={p} />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradientes sutis nas bordas */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 md:w-8 bg-gradient-to-r from-[#0d0020]/50 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 md:w-8 bg-gradient-to-l from-[#0d0020]/50 to-transparent"
            aria-hidden
          />
      </div>

      {showViewMore && (
        <div className="relative z-10 flex justify-center pt-12 pb-8 md:pt-14 md:pb-10">
          <Button asChild variant="outline" size="default" className="w-fit">
            <Link href="/portifolio">{cta}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

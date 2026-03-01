"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
        <div className="mb-16">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-brand-red to-brand-orange" />
            <span className="text-sm tracking-[0.28em] uppercase text-brand-red font-medium font-mono">
              {label}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.05]">
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
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
            Meu portfólio reúne todas as minhas criações digitais — desde{" "}
            <strong className="text-white font-medium">sites profissionais</strong> desenvolvidos
            para projetos reais até{" "}
            <strong className="text-white font-medium">sites de exemplo</strong>,{" "}
            <strong className="text-white font-medium">blogs</strong> e experimentos feitos por
            lazer ou para testar novas ideias. Aqui você encontra uma visão geral do meu estilo, da
            minha evolução e da forma como eu construo produtos: com foco em{" "}
            <strong className="text-white font-medium">qualidade</strong>,{" "}
            <strong className="text-white font-medium">organização</strong> e{" "}
            <strong className="text-white font-medium">boa experiência em qualquer tela</strong>.
          </p>

          {/* Decorative divider */}
          <div className="mt-10 h-px bg-gradient-to-r from-brand-red/30 via-white/8 to-transparent" />
        </div>
      </div>

      {/* ── Duas filas de cards (marquee) ── */}
      <div className="relative z-10 w-full overflow-hidden">
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

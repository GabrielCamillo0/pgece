"use client";

import type { ReactNode } from "react";

type Variant = "a" | "b";

type SectionBackgroundProps = {
  variant?: Variant;
  /** Optional: add light noise overlay for texture */
  noise?: boolean;
  /** Optional: thin highlight line at top of section */
  topGlow?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Sistema de fundo por seção: base + blobs de glow (laranja/roxo) + opcional noise.
 * Variante A: glow laranja mais à esquerda. Variante B: glow roxo mais à direita.
 * Não altera o fluxo do conteúdo; camadas em absolute, conteúdo em relative z-10.
 */
export function SectionBackground({
  variant = "a",
  noise = true,
  topGlow = false,
  children,
  className = "",
}: SectionBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      {/* 1) Base: gradiente radial sutil (transparente para o cósmico aparecer) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30, 10, 50, 0.12) 0%, transparent 55%)",
        }}
      />

      {/* 2) Accent: 1 blob de glow (opacidade baixa, blur controlado) */}
      {variant === "a" && (
        <div
          aria-hidden
          className="absolute top-0 left-0 w-[min(100%,480px)] h-[280px] pointer-events-none opacity-[0.07]"
          style={{
            background: "radial-gradient(circle at 20% 30%, rgba(255, 72, 32, 0.9) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      )}
      {variant === "b" && (
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[min(100%,400px)] h-[240px] pointer-events-none opacity-[0.08]"
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(139, 31, 204, 0.8) 0%, transparent 65%)",
            filter: "blur(55px)",
          }}
        />
      )}

      {/* 3) Texture: noise leve (reutiliza padrão do site) */}
      {noise && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      )}

      <div className="relative z-10">
        {topGlow && <div className="section-top-glow" aria-hidden />}
        {children}
      </div>
    </div>
  );
}

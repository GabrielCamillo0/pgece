"use client";

import type { ReactNode } from "react";

type ToneVariant = "light" | "dark" | "none";

type SectionToneProps = {
  /** "light" = overlay muito leve/claro; "dark" = overlay ligeiramente mais escuro; "none" = sem overlay (ex.: Hero) */
  variant?: ToneVariant;
  children: ReactNode;
  className?: string;
  /** Semântica: id para âncoras */
  id?: string;
};

/**
 * Wrapper que aplica apenas um overlay de luminosidade MUITO sutil por seção.
 * Não desenha separador; alterna só o "tone" para dar ritmo sem faixas.
 * Use variant="none" no Hero (intocável).
 */
export function SectionTone({
  variant = "light",
  children,
  className = "",
  id,
}: SectionToneProps) {
  if (variant === "none") {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  const toneClass = variant === "dark" ? "section-tone--dark" : "section-tone--light";
  return (
    <section
      id={id}
      className={`section-tone ${toneClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}

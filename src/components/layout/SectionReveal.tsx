"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay em segundos para stagger */
  delay?: number;
};

const defaultTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

/**
 * Reveal suave ao entrar no viewport (fade + translateY).
 * Respeita prefers-reduced-motion: sem animação de entrada quando ativo.
 */
export function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px -40px 0px" }}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

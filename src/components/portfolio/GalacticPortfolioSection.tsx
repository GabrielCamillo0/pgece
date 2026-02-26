import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

const CARD_WIDTH = 520;
const GAP = 28;
const MARQUEE_DURATION = 42;

/** Divide os projetos em duas filas para duas colunas horizontais */
const row1Projects = projects.slice(0, 3);
const row2Projects = projects.slice(3, 6);

function getTrackWidth(n: number) {
  return n * CARD_WIDTH + (n - 1) * GAP;
}

export function GalacticPortfolioSection() {
  return (
    <section
      id="cases"
      className="relative overflow-hidden galactic-bg min-h-screen"
      style={{
        /* Smooth gradient bridge from hero's dark bottom */
        paddingTop: "0",
      }}
    >
      {/* ── Top gradient bridge from hero ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #05000a 0%, rgba(5,0,12,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 galactic-noise" aria-hidden />

      {/* Galaxy video */}
      <video
        className="absolute inset-0 z-20 h-full w-full object-cover opacity-25 mix-blend-screen pointer-events-none"
        autoPlay muted loop playsInline aria-hidden
      >
        <source src="/galaxy.webm" type="video/webm" />
        <source src="/galaxy.mp4" type="video/mp4" />
      </video>

      {/* Glow accents */}
      <div aria-hidden className="absolute top-32 right-16 h-[380px] w-[380px] rounded-full bg-brand-purple/10 blur-[110px] pointer-events-none z-10 animate-glow-pulse" />
      <div aria-hidden className="absolute bottom-24 left-16 h-[280px] w-[280px] rounded-full bg-brand-red/8 blur-[90px] pointer-events-none z-10 animate-glow-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-30 mx-auto max-w-6xl px-6 py-28">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          {/* Label row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-brand-red to-brand-orange" />
            <span className="text-xs tracking-[0.28em] uppercase text-brand-red font-medium font-mono">
              Nosso trabalho
            </span>
          </div>

          {/* Title */}
          <h2 className="text-[42px] md:text-[58px] font-semibold tracking-[-0.02em] text-white leading-[1.05]">
            Portfolio{" "}
            <span className="bg-gradient-to-r from-brand-red/70 via-brand-orange/60 to-transparent bg-clip-text text-transparent">
              selecionado
            </span>
          </h2>

          {/* Subtitle + CTA row */}
          <div className="mt-4">
            <p className="text-[15px] text-white/50 max-w-sm leading-relaxed">
              Projetos que combinam estética e performance para gerar
              resultados reais.
            </p>
          </div>

          {/* Decorative divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-brand-red/30 via-white/8 to-transparent" />
        </motion.div>
      </div>

      {/* ── Duas filas de cards: movimento ocupa a tela inteira (entram e saem pelas bordas) ── */}
      <div className="relative z-30 w-full overflow-hidden">
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

          {/* Fila 2: mesma direção, levemente atrasada para não ficar sincronizada */}
          <div className="overflow-hidden py-3" aria-hidden>
            <motion.div
              className="flex w-max"
              style={{ gap: GAP }}
              animate={{ x: [0, -getTrackWidth(row2Projects.length)] }}
              transition={{
                x: {
                  duration: MARQUEE_DURATION * 1.15,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: MARQUEE_DURATION * 0.12,
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
    </section>
  );
}

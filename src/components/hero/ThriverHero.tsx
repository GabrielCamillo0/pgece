import { useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type NavItem = { label: string; href: string };

/* ── Framer-motion variants ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay } },
});

/* ── Sphere ─────────────────────────────────────────────────────────── */
function Sphere({
  size,
  className,
  variant = "purple",
  delay = 0,
}: {
  size: number;
  className?: string;
  variant?: "purple" | "orange";
  delay?: number;
}) {
  const cls = variant === "orange" ? "opium-sphere-orange" : "opium-sphere";
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute rounded-full animate-float ${cls} ${className ?? ""}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ── Orbit ring ─────────────────────────────────────────────────────── */
function OrbitRing({
  size,
  tiltX,
  tiltY,
  className,
  delay = 0,
}: {
  size: number;
  tiltX: number;
  tiltY: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay }}
      className={`orbit-ring animate-orbit ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
    />
  );
}

/* ── Navbar totalmente transparente ─────────────────────────────────── */
function Navbar({ navItems }: { navItems: NavItem[] }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-6xl px-5 pt-6 pb-2">
        <div className="nav-glass nav-glass-transparent rounded-2xl px-8 py-4 md:px-10 md:py-5 flex items-center justify-between relative min-h-[56px] md:min-h-[64px]">
          <div className="flex items-center gap-3 z-10">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-red to-brand-orange shadow-[0_0_10px_rgba(255,72,32,0.5)] opacity-90" />
            <span className="text-[16px] md:text-[17px] font-medium tracking-tight text-white/90">gece</span>
          </div>
          <nav className="hidden md:flex items-center gap-9 text-[13px] md:text-[14px] text-white/60 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                className="relative hover:text-white transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-white/50 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-3 z-10">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-1.5 text-[13px] py-2 px-4 text-white/60 hover:text-white/90">
              PT <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────────── */
export function ThriverHero() {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "Cases", href: "#cases" },
      { label: "Soluções", href: "#solucoes" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Contato", href: "#contato" },
    ],
    []
  );

  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden bg-[#08000E] text-white"
        style={{ perspective: "1200px" }}
      >
        <Navbar navItems={navItems} />
        {/* ── Background gradients ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(900px 560px at 5% 8%,  rgba(139,31,204,0.50), transparent 55%)",
              "radial-gradient(700px 500px at 72% 0%,  rgba(255,72,32,0.22),  transparent 55%)",
              "radial-gradient(600px 400px at 95% 65%, rgba(255,107,53,0.14), transparent 55%)",
              "linear-gradient(180deg, #0d0020 0%, #08000e 55%, #05000a 100%)",
            ].join(","),
          }}
        />

        {/* ── Darker vignette overlay ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            boxShadow: "inset 0 0 280px rgba(0,0,0,0.75)",
            background: "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.90) 100%)",
          }}
        />

        {/* ── Animated glow orbs ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[130px] animate-glow-pulse"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute -top-12 right-1/4 h-[380px] w-[380px] rounded-full bg-brand-red/15 blur-[110px] animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* ── 3-D Spheres (desktop) ── */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-[520px] h-[600px] pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Sphere size={230} variant="purple" className="right-[80px] top-[80px]" delay={0.3} />
          <Sphere size={95}  variant="orange" className="right-[38px] top-[22px]"  delay={0.5} />
          <Sphere size={55}  variant="purple" className="right-[290px] top-[190px]" delay={0.7} />
          <OrbitRing size={330} tiltX={68} tiltY={-18} className="right-[-15px] top-[-35px]" delay={0.6} />
          <OrbitRing size={225} tiltX={52} tiltY={14}  className="right-[45px]  top-[35px]"  delay={0.9} />
        </div>

        {/* ── Hero content (fundo desde o topo) ── */}
        <div className="relative z-20 mx-auto max-w-6xl px-6 pt-20 md:pt-24">
          <div className="grid min-h-[580px] grid-cols-1 md:grid-cols-[1.15fr_0.85fr] items-center py-16 md:py-24">

            {/* Left */}
            <div>
              {/* Pills */}
              <motion.div
                variants={fadeIn(0.2)}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-3"
              >
                <Badge variant="primary">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-brand-red animate-glow-pulse" />
                  gece Studio
                </Badge>
                <Badge variant="default">
                  Descubra o poder de um design bem elaborado
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp(0.35)}
                initial="hidden"
                animate="visible"
                className="mt-10 font-sans text-[46px] leading-[1.03] tracking-[-0.02em] md:text-[70px] font-semibold text-white"
              >
                Experiência digital
                <br />
                <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-400 bg-clip-text text-transparent">
                  que transforma
                </span>
                <br />
                sua empresa.
              </motion.h1>

              {/* Sub-text */}
              <motion.p
                variants={fadeUp(0.5)}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55"
              >
                Seu sucesso digital começa com uma interface bem projetada.
                <br />
                Vamos criar algo incrível juntos!
              </motion.p>


              {/* Stats */}
              <motion.div
                variants={fadeIn(0.85)}
                initial="hidden"
                animate="visible"
                className="mt-14 flex flex-wrap gap-8 border-t border-white/8 pt-8"
              >
                {[
                  { value: "30+",  label: "Projetos entregues" },
                  { value: "10+",  label: "Clientes satisfeitos" },
                  { value: "100%", label: "Comprometimento" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                  >
                    <p className="text-2xl font-semibold text-white">{s.value}</p>
                    <p className="text-xs text-white/40 mt-0.5 tracking-wide">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — space for 3D spheres */}
            <div className="relative hidden md:flex items-end justify-end pb-8 pr-4" />
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="relative z-20 flex justify-center pb-10"
        >
          <a
            href="#cases"
            className="flex flex-col items-center gap-2 text-white/25 hover:text-white/55 transition-colors duration-300"
            aria-label="Scroll para baixo"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </motion.div>

        {/* ── Bottom gradient fade into next section ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(5,0,12,0.7) 50%, #05000a 100%)",
          }}
        />
      </section>
    </>
  );
}

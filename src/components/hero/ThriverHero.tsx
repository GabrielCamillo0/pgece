import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { HERO_REVEAL_DELAY_S } from "@/constants/timing";

const VIDEO_SRC = "/210884_medium.mp4";

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

/* ── Main Hero ──────────────────────────────────────────────────────── */
export function ThriverHero() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.55;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative isolate overflow-hidden bg-[#08000E] text-white min-h-[85vh] md:min-h-[90vh] flex flex-col"
        style={{ perspective: "1200px" }}
      >
        {/* ── Vídeo: z-[1] para ficar acima dos gradientes (z-0), rola com a seção ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
          aria-hidden
          style={{ minHeight: "100%", minWidth: "100%" }}
        >
          <video
            ref={videoRef}
            className="absolute top-0 left-0 h-full w-full object-cover select-none"
            style={{
              transform: "translateZ(0)",
              opacity: 0.42,
              mixBlendMode: "screen",
            }}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        {/* ── Gradientes por baixo do vídeo ── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: HERO_REVEAL_DELAY_S, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: [
              "radial-gradient(900px 560px at 5% 8%,  rgba(139,31,204,0.50), transparent 55%)",
              "radial-gradient(700px 500px at 72% 0%,  rgba(255,72,32,0.22),  transparent 55%)",
              "radial-gradient(600px 400px at 95% 65%, rgba(255,107,53,0.14), transparent 55%)",
              "linear-gradient(180deg, #0d0020 0%, #08000e 55%, #05000a 100%)",
            ].join(","),
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 1.5, delay: 2.1 }}
          className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[130px] animate-glow-pulse"
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.4 }}
          className="absolute -top-12 right-1/4 h-[380px] w-[380px] rounded-full bg-brand-red/15 blur-[110px] animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* ── 3-D Spheres (desktop) ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 2.5 }}
          className="absolute right-0 top-0 w-[520px] h-[600px] pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Sphere size={230} variant="purple" className="right-[80px] top-[80px]" delay={0} />
          <Sphere size={95}  variant="orange" className="right-[38px] top-[22px]"  delay={0.1} />
          <Sphere size={55}  variant="purple" className="right-[290px] top-[190px]" delay={0.2} />
          <OrbitRing size={330} tiltX={68} tiltY={-18} className="right-[-15px] top-[-35px]" delay={0.1} />
          <OrbitRing size={225} tiltX={52} tiltY={14}  className="right-[45px]  top-[35px]"  delay={0.2} />
        </motion.div>

        {/* ── Hero content: entra por último ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto max-w-6xl px-4 md:px-6 pt-24 md:pt-28 flex-1 flex flex-col"
        >
            <div className="grid min-h-[520px] md:min-h-[640px] grid-cols-1 md:grid-cols-[1.15fr_0.85fr] items-center py-16 md:py-24">

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
                  {t("hero.badge")}
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp(0.35)}
                initial="hidden"
                animate="visible"
                className="mt-8 font-sans text-[clamp(2.25rem,9vw,4.75rem)] leading-[1.08] tracking-[-0.02em] md:text-[4.5rem] md:leading-[1.05] font-semibold text-white"
              >
                {t("hero.headline.line1")}{" "}
                <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-400 bg-clip-text text-transparent">
                  {t("hero.headline.accent")}
                </span>
              </motion.h1>

              {/* Sub-text */}
              <motion.p
                variants={fadeUp(0.5)}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-md text-base leading-relaxed text-white/55"
              >
                {t("hero.subtext")}
              </motion.p>


            </div>

            {/* Right — space for 3D spheres */}
            <div className="relative hidden md:flex items-end justify-end pb-8 pr-4" />
          </div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 1 }}
          className="relative z-20 flex justify-center pb-12 md:pb-16"
        >
          <a
            href="#cases"
            className="flex flex-col items-center gap-2 text-white/95 hover:text-white transition-colors duration-300"
            aria-label={t("hero.scrollAria")}
          >
            <span className="text-xs tracking-[0.3em] uppercase font-mono">
              {t("hero.scrollLabel")}
            </span>
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

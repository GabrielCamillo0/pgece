"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

function TiltFallback(props: { children?: ReactNode; className?: string; style?: React.CSSProperties }) {
  const { children, className, style } = props;
  return <div className={className} style={style}>{children}</div>;
}

const Tilt = dynamic(
  () =>
    import("react-parallax-tilt").then((m) => {
      const C = m?.default;
      return C ?? TiltFallback;
    }),
  { ssr: false }
);
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectModal project={project}>
      {(_, setOpen) => (
        <Tilt
          glareEnable
          glareMaxOpacity={0.10}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.02}
          className="rounded-[22px] block w-full"
          style={{ willChange: "transform" }}
        >
          <article
            className="portfolio-card overflow-hidden p-6 min-h-[220px] flex flex-col justify-between cursor-pointer group"
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          >
            {/* Área do GIF/preview do site — adicione previewGif em cada projeto em projects.ts */}
            <div className="relative -mx-6 -mt-6 mb-4 h-[140px] overflow-hidden rounded-t-[22px] bg-white/5">
              {project.previewGif ? (
                <img
                  src={project.previewGif}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/5 to-transparent" />
              )}
            </div>

            {/* Top */}
            <div>
              {/* Number tag */}
              <span className="text-[11px] text-white/25 font-mono tabular-nums">
                {String(parseInt(project.id.replace("p", ""))).padStart(2, "0")}
              </span>

              <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/55 leading-relaxed">
                {project.short}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((t) => (
                  <Badge key={t} variant="default">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
                Ver detalhes
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 group-hover:border-brand-red/50 group-hover:bg-brand-red/15 transition-all">
                <ArrowUpRight className="h-3.5 w-3.5 text-white/60 group-hover:text-brand-red transition-colors" />
              </span>
            </div>

            {/* Bottom gradient accent line */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </article>
        </Tilt>
      )}
    </ProjectModal>
  );
}

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
      {(setOpen) => (
        <div className="w-full h-full cursor-pointer [&_article]:block">
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
              className="portfolio-card overflow-hidden min-h-[480px] flex flex-col cursor-pointer group h-full"
              role="button"
              tabIndex={0}
              onClick={() => setOpen(true)}
              onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
            >
            {/* Imagem ocupa a maior parte do card */}
            <div className="relative flex-1 min-h-[400px] -mx-6 -mt-6 overflow-hidden rounded-t-[22px] bg-white/5">
              {project.previewGif ? (
                <img
                  src={project.previewGif}
                  alt=""
                  className="h-full w-full object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/5 to-transparent" />
              )}
              {/* Gradiente suave na base para legibilidade do texto abaixo */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>

            {/* Faixa compacta com dados do projeto */}
            <div className="shrink-0 px-6 pb-5 pt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-white/25 font-mono tabular-nums shrink-0">
                  {String(parseInt(project.id.replace("p", ""))).padStart(2, "0")}
                </span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 group-hover:border-brand-red/50 group-hover:bg-brand-red/15 transition-all">
                  <ArrowUpRight className="h-3 w-3 text-white/60 group-hover:text-brand-red transition-colors" />
                </span>
              </div>
              <h3 className="text-base font-semibold text-white leading-tight line-clamp-1 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((t) => (
                  <Badge key={t} variant="default" className="text-[10px] px-1.5 py-0 h-4">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            </article>
          </Tilt>
        </div>
      )}
    </ProjectModal>
  );
}

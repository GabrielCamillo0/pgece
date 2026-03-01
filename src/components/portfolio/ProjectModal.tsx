"use client";

import type { Project } from "@/data/projects";
import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function ProjectModal({
  project,
  children,
}: {
  project: Project;
  children: ReactNode | ((setOpen: (value: boolean) => void) => ReactNode);
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = typeof children === "function" ? children(setOpen) : children;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, mounted]);

  const modal = open ? (
    <div className="fixed inset-0 z-[9999]">
      <button
        aria-label="Fechar modal"
        className="absolute inset-0 bg-black/80"
        onClick={() => setOpen(false)}
      />

      <div
        className="absolute left-1/2 top-1/2 z-[10000] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0d0022] shadow-[0_0_80px_rgba(139,31,204,0.25)]"
        style={{ width: "92vw", maxWidth: "72rem", height: "88vh", minHeight: "400px" }}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button
          aria-label="Fechar"
          className="absolute right-4 top-4 z-[120] rounded-full bg-black/70 p-2 text-white/80 hover:text-white"
          onClick={() => setOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {project.previewGif ? (
              <img
                src={project.previewGif}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0022] via-[#0d0022]/45 to-transparent pointer-events-none" />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 max-h-[55vh] overflow-y-auto rounded-t-2xl bg-[#0d0022]/95 backdrop-blur-xl border-t border-x border-white/10 px-6 pt-5 pb-6 text-white">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />

            <div className="p-0 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_6px_rgba(255,72,32,0.8)]" />
                <span className="text-xs text-white/40 uppercase tracking-widest">Projeto</span>
              </div>
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-white/55 mt-1">{project.short}</p>
            </div>

            <p className="text-white/75 leading-relaxed mt-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((t) => (
                <Badge key={t} variant="default">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button asChild>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Visitar site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
              <span className="text-xs text-white/35">Abre em nova aba</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {trigger}
      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}

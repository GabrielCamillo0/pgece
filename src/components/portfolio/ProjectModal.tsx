"use client";

import type { Project } from "@/data/projects";
import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        aria-label={t("project.closeModalAria")}
        className="absolute inset-0 bg-black/80 touch-manipulation"
        onClick={() => setOpen(false)}
      />

      <div
        className="absolute left-0 top-0 z-[10000] w-full h-[100dvh] max-w-none overflow-hidden rounded-none border-0 bg-[#0d0022] shadow-2xl md:left-1/2 md:top-1/2 md:h-[88vh] md:min-h-[400px] md:w-[92vw] md:max-w-[72rem] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:border md:border-white/10"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button
          aria-label={t("project.closeAria")}
          className="absolute right-3 top-3 z-[120] rounded-full bg-black/70 p-3 text-white/80 hover:text-white touch-manipulation md:right-4 md:top-4 md:p-2"
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

          <div className="absolute inset-x-0 bottom-0 z-10 max-h-[60vh] md:max-h-[55vh] overflow-y-auto overflow-x-hidden rounded-t-2xl bg-[#0d0022]/95 backdrop-blur-xl border-t border-x border-white/10 px-4 pt-4 pb-6 text-white touch-manipulation md:px-6 md:pt-5">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />

            <div className="p-0 text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_6px_rgba(255,72,32,0.8)]" />
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("project.modalLabel")}</span>
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
                  {t("project.visitSite")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
              <span className="text-xs text-white/35">{t("project.opensNewTab")}</span>
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

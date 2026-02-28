"use client";

import type { Project } from "@/data/projects";
import { type ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function ProjectModal({
  project,
  children,
}: {
  project: Project;
  children: ReactNode | ((open: boolean, setOpen: (v: boolean) => void) => ReactNode);
}) {
  const [open, setOpen] = useState(false);
  const trigger =
    typeof children === "function" ? children(open, setOpen) : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}

      <DialogContent className="max-w-xl bg-[#0d0022]/90 backdrop-blur-2xl text-white border border-white/10 shadow-[0_0_80px_rgba(139,31,204,0.25)]">
        {/* Gradient top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />

        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_6px_rgba(255,72,32,0.8)]" />
            <span className="text-xs text-white/40 uppercase tracking-widest">Projeto</span>
          </div>
          <DialogTitle className="text-2xl font-semibold">{project.title}</DialogTitle>
          <DialogDescription className="text-white/55 mt-1">
            {project.short}
          </DialogDescription>
        </DialogHeader>

        <p className="text-white/75 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="default">
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button asChild>
            <a href={project.url} target="_blank" rel="noreferrer">
              Visitar site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          <span className="text-xs text-white/35">Abre em nova aba</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  url: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Visa SaaS",
    short: "Plataforma de classificação e plano de ação.",
    description:
      "Sistema com fluxo guiado, coleta de dados, geração de relatório e limites por créditos.",
    tags: ["React", "Postgres", "Stripe"],
    url: "https://seu-link-aqui.com",
  },
  {
    id: "p2",
    title: "Experience Florida",
    short: "Guia de experiências locais.",
    description: "PWA com páginas de locais, rotas e funil para WhatsApp.",
    tags: ["React", "PWA", "SEO"],
    url: "https://seu-link-aqui.com",
  },
  {
    id: "p3",
    title: "Landing Agência",
    short: "Página de conversão de leads.",
    description: "Landing com seções, CTA forte e tracking.",
    tags: ["Tailwind", "UI", "Forms"],
    url: "https://seu-link-aqui.com",
  },
  {
    id: "p4",
    title: "Admin Dashboard",
    short: "Painel de gestão moderno.",
    description: "Dashboard com cards, tabela e filtros.",
    tags: ["shadcn/ui", "Table", "Auth"],
    url: "https://seu-link-aqui.com",
  },
  {
    id: "p5",
    title: "Marketplace MVP",
    short: "Vagas por card + aplicação rápida.",
    description: "Listagem com moderação e contato via WhatsApp.",
    tags: ["React", "DB", "Moderation"],
    url: "https://seu-link-aqui.com",
  },
  {
    id: "p6",
    title: "Portfolio 3D",
    short: "Seção 3D estilo galáxia.",
    description: "Layout inspirado em UI sci-fi com overlay animado.",
    tags: ["3D", "Motion", "Design"],
    url: "https://seu-link-aqui.com",
  },
];

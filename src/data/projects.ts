export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  url: string;
  /** URL do GIF/preview do site (ex.: /previews/visa-saas.gif). Adicione depois. */
  previewGif?: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Visa SaaS",
    short: "Plataforma de classificação e plano de ação.",
    description:
      "Sistema com fluxo guiado, coleta de dados, geração de relatório e limites por créditos.",
    tags: ["React", "Postgres", "Stripe"],
    url: "https://visa.gecesaas.com",
    previewGif: "/previews/visasaas.png",
  },
  {
    id: "p2",
    title: "Minhas Redes Sociais",
    short: "Minhas Redes Sociais em um website.",
    description: "Página com   ituito de centralizar redes sociais em um único lugar com um design moderno e responsivo.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://bio.gecesaas.com/",
    previewGif: "/previews/biogecesaas.png",
  }, 
  {
    id: "p3",
    title: "Blog SMindst",
    short: "Blog de tecnologia e novidades gerais.",
    description: "Blog com posts de tecnologia e novidades gerais.",
    tags: ["shadcn/ui", "Table", "Auth"],
    url: "https://gecesaas.com",
    previewGif: "/previews/gecesaas.png",
  },
  {
    id: "p4",
    title: "Nails Studio",
    short: "Studio de unhas com um design moderno e responsivo.",
    description: "Site de Studio de unhas com um design moderno e responsivo ligado com plataforma de agendamento.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://nails-s.vercel.app/",
    previewGif: "/previews/nails.png",
  },
  {
    id: "p5",
    title: "Best Solutions Yesterday",
    short: "Soluções para o seu negócio.",
    description: "Site de soluções de  limpeza e higienização com um design moderno e responsivo e   integracoes.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://www.bestsolutionsyesterday.com",
    previewGif: "/previews/best.png",
  },
  {
    id: "p6",
    title: "Cleaning Orlando",
    short: "Site de limpeza e higienização.",
    description: "Site de limpeza e higienização com um design moderno e responsivo mod.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://ericas-cleaning-orlando.vercel.app/",
    previewGif: "/previews/erica.png",
  },
  {
    id: "p7",
    title: "Cleaning GOAT Orlando",
    short: "Site de limpeza e higienização.",
    description: "Site de soluções de  limpeza e higienização com um design moderno e responsivo  mod.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://the-cleaning-goat-orlando.vercel.app/",
    previewGif: "/previews/goat.png",
  },
  {
    id: "p8",
    title: "Brazlian style  cleaning",
    short: "Site de limpeza e higienização.",
    description: "Site de limpeza e higienização com um design moderno e responsivo mod.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://brazlian-style-cleaning.vercel.app/",
    previewGif: "/previews/brazilianstyle.png",
  },
  {
      id: "p9",
    title: "Experience Florida",
    short: "Guia de experiências locais.",
    description: "PWA com páginas de locais, rotas e funil para WhatsApp.",
    tags: ["Next.js", "Tailwind", "Shadcn", "React", "PWA", "SEO"],
    url: "https://experience-florida.vercel.app/",
    previewGif: "/previews/experience.png",
  },
  
];

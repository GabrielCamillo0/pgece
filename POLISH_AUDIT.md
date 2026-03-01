# Polish — Auditoria e checklist

## Estrutura do projeto
- **Rotas:** `/` (App), `/servicos`, `/sobre`, `/contato`, `/portifolio`
- **Home:** ThriverHero, ServicesSection, GalacticPortfolioSection, ProcessSection, AboutSection, ContactSection, SiteFooter
- **UI:** shadcn-like (Button, Card, Badge, Dialog) em `src/components/ui`
- **Estilos:** `index.css` (tokens + base), `galactic.css` (vignette, section-bridge, portfolio-card, galactic-bg)

---

## Inconsistências encontradas

### Spacing (Alta)
- Seções home: `py-12 md:py-16` (App) vs `py-28 md:py-36` (ServicesSection, ProcessSection, etc.) vs `py-20 md:py-24` (ServicosPageContent, Sobre, Contato).
- Containers: `px-6` em quase tudo; navbar `px-5`; sem `px-4` no mobile.
- Header blocks: `mb-20`, `mb-16`, `mb-12`, `mb-10`, `mb-6` misturados.

### Tipografia (Média)
- Hero H1: `text-[46px] md:text-[70px]`; seções: `text-3xl md:text-4xl`; portfolio: `text-[42px] md:text-[58px]`.
- Line-height e pesos consistentes; pequena variação em subtítulos.

### Componentes (Média)
- Cards: maioria `border-white/10 bg-card/80`; Card base tem `rounded-[22px]` e sombra com purple; alguns `border-brand-red/30`.
- Formulário: inputs nativos com classes manuais (sem componente Input); labels/ids ok.
- Placeholders reais: footer `[seu-email-aqui]`, `[Link do WhatsApp aqui]`; ContatoPageContent `[seu-github-aqui]` etc.

### Responsivo (Alta)
- Portfolio: largura fixa 520px por card + marquee; overflow-hidden evita scroll horizontal (ok).
- Hero `min-h-[580px]` pode apertar em telas muito pequenas.
- Grids: 1/2/3 colunas já usadas; conferir gaps em 360px.

### Performance (Média)
- Vídeo full-screen em GalacticPortfolioSection (galaxy).
- Vários `blur-[110px]`/`blur-[130px]`.
- Body ::after vignette fixa.

### A11y (Média)
- Headings: algumas páginas H1 depois H2; manter ordem.
- Focus visível em Button; links precisam focus visível.
- Form: labels + ids + aria-invalid/describedby ok.

---

## Checklist priorizado

### Alta
1. Unificar padding de seção (py-20 md:py-24 ou py-24 md:py-32) em todas as sections.
2. Unificar container (max-w-6xl + px-4 md:px-6) e header spacing (eyebrow/título/desc).
3. Garantir overflow-x: nenhum scroll horizontal; revisar em 360px.
4. Padronizar focus visível em links (navbar, footer).

### Média
5. Design tokens em CSS: --section-padding, --container-px (opcional; ou só Tailwind).
6. Tipografia: escala única para H1/H2 (text-3xl md:text-4xl) exceto hero.
7. Cards: mesma borda/radius (já ok); reduzir sombras pesadas se necessário.
8. Placeholders: trocar [seu-email-aqui] por texto claro "Substitua pelo seu e-mail".

### Baixa
9. Pré-carregar fonte principal se for externa.
10. Revisar animações (manter leves).
11. Line-clamp em cards com texto longo (se houver).
12. html lang no layout (já pt-BR em algum lugar? layout tem lang="en").

---

## Resumo da execução (após polish)

### Arquivos alterados
- `src/index.css` — tokens de layout (--section-padding-y, --container-max, etc.); body overflow-x: hidden.
- `tailwind.config.js` — maxWidth.container, spacing.section, borderRadius.card.
- `app/layout.tsx` — html lang="pt-BR".
- `src/App.tsx` — padding das sections py-20 md:py-24.
- `src/components/sections/ServicesSection.tsx` — padding, container px-4 md:px-6, header/grid spacing.
- `src/components/sections/ProcessSection.tsx` — idem.
- `src/components/sections/AboutSection.tsx` — idem.
- `src/components/sections/ContactSection.tsx` — idem.
- `src/components/sections/StackSection.tsx` — idem.
- `src/components/pages/ServicosPageContent.tsx` — container px, grids gap, card padding responsivo.
- `src/components/pages/SobrePageContent.tsx` — container px, eyebrow spacing.
- `src/components/pages/ContatoPageContent.tsx` — container px; placeholders redes (URLs exemplo + comentário “Substitua”).
- `src/components/layout/SiteFooter.tsx` — container px; focus visível em links; placeholders de contato substituídos por exemplo (contato@exemplo.com, wa.me).
- `src/components/layout/SiteNavbar.tsx` — container px-4 md:px-6; focus visível em logo e links.
- `src/components/hero/ThriverHero.tsx` — container px; min-h responsivo; título com clamp + tamanhos ajustados.
- `src/components/portfolio/GalacticPortfolioSection.tsx` — container px; padding vertical; video preload="metadata"; spacing header/CTA.
- `src/components/sections/ContactForm.tsx` — focus ring inputs (ring-offset).
- `src/components/ui/button.tsx` — focus-visible ring-offset.
- `src/components/ui/dialog.tsx` — focus visível no botão fechar.
- `src/components/portfolio/ProjectCard.tsx` — fallback Tilt para tipo do dynamic() (correção TypeScript pré-existente).

### Melhorias aplicadas
- **UI/UX:** Padding de seção unificado (py-20 md:py-24); hierarquia eyebrow → título → descrição (mb-4, mt-4); containers com px-4 md:px-6; grids com gap-6 md:gap-8.
- **Responsivo:** overflow-x: hidden no body; hero com min-h e título fluidos; card “Projeto rápido” com padding responsivo (p-5 sm:p-6 md:p-10).
- **Acessibilidade:** focus-visible em todos os links (navbar, footer), botões e inputs; ring brand-red/60 + ring-offset; html lang="pt-BR".
- **Consistência:** Mesmo padrão de container e seção em todas as páginas; placeholders claros ou exemplos substituíveis.
- **Performance:** Video da seção portfólio com preload="metadata"; correção de tipo no ProjectCard para build limpo.

### Próximas etapas (opcional)
- Trocar contato@exemplo.com e wa.me/5511999999999 pelos dados reais.
- Revisar links de redes em ContatoPageContent (comentários “Substitua pela sua URL”).
- Se quiser shadcn Input/Label no formulário, adicionar depois sem quebrar o atual.

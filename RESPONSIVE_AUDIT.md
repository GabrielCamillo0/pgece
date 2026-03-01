# Auditoria responsiva – Diagnóstico e checklist

## 1. Rotas mapeadas

| Rota        | Arquivo              | Conteúdo principal                          |
|------------|----------------------|---------------------------------------------|
| `/`        | app/page.tsx → App   | Hero, Serviços, Portfólio, Processo, Sobre, Contato |
| `/servicos`| app/servicos/page.tsx| ServicosPageContent (header, grid serviços, agencies, quick project) |
| `/portifolio` | app/portifolio/page.tsx | SiteNavbar, GalacticPortfolioSection, Footer |
| `/sobre`   | app/sobre/page.tsx  | SobrePageContent                            |
| `/contato` | app/contato/page.tsx| ContatoPageContent (form + card lateral)    |

---

## 2. Problemas por breakpoint (anotados via análise de código)

### 360px (mobile pequeno)
- **Navbar**: `px-8` no glass pode apertar; botão "Contato" com `size="sm"` (py-2) < 44px altura.
- **SimpleHeader**: só `px-5`; links sem focus-visible.
- **QuickProjectSection / ForAgenciesSection / TestimonialsSection**: usam só `px-6` (sem `px-4`).
- **Card**: `p-6` em todo lugar pode ser apertado.

### 390/414px (mobile comum)
- Mesmos que 360px; grid de serviços/cards já 1 coluna (OK).
- Contato: grid empilha (OK).

### 768px (tablet)
- **GalacticPortfolioSection**: marquee com cards fixos 520px – área com `overflow-hidden` (sem scroll horizontal da página).
- **ProcessSection**: `sm:grid-cols-2` + `md:grid-cols-3` – 2 colunas em tablet podem ficar estreitas.
- **Footer**: `md:grid-cols-2` – 2 colunas OK.

### 1024px / 1280–1440px (desktop)
- Containers mistos: `max-w-6xl`, `max-w-4xl`, `max-w-3xl` – sem padrão único de padding lateral `lg:px-8`.
- Tipografia: h2 variam entre `text-3xl md:text-4xl` e `text-4xl md:text-5xl` – inconsistente.

---

## 3. Checklist priorizado

### P0 (crítico)
- [x] **overflow-x**: body já tem `overflow-x: hidden`; seções hero/portfolio com `overflow-hidden`.
- [x] **Botões tap-friendly**: min-height 44px no Button (base) e 48px em size lg; icon 44px.
- [x] **Navbar mobile**: padding lateral `px-4 py-3 sm:px-6 md:px-8 lg:px-10` no glass.
- [x] **LanguageToggle**: `min-h-[40px]` nos botões e `py-1.5` no wrapper; `text-xs` em mobile.

### P1 (premium)
- [x] **Container padrão**: `px-4 md:px-6 lg:px-8` + `max-w-6xl` (ou 4xl/3xl onde já existia) em todas as seções; CSS vars `--container-px` e utilitário `.site-container` em index.css.
- [x] **Spacing vertical**: `py-16 md:py-24` mantido na App e páginas.
- [x] **Tipografia**: H1/H2 de seção = `text-2xl md:text-4xl`; CardTitle = `text-lg md:text-xl`; grids com `gap-4 md:gap-6 lg:gap-8`.
- [x] **Cards**: CardHeader/CardContent/CardFooter com `p-4 md:p-6`.
- [x] **CTAs**: Services e About com `flex-col gap-3 sm:flex-row sm:flex-wrap` em mobile.
- [x] **Formulário contato**: já full-width e com mensagens de erro; sem alteração.
- [x] **Headers de seção**: títulos padronizados; espaçamento mantido.

### P2 (micro)
- [x] **Focus ring**: global `:focus-visible` em index.css; SimpleHeader links com `focus-visible:ring-2 focus-visible:ring-brand-red/60`.
- [x] **SimpleHeader**: `px-4 md:px-6 lg:px-8` e focus em links.

---

## 4. O que NÃO foi alterado (por regra)

- **Hero (ThriverHero)**: nenhuma mudança além de possível ajuste mínimo se houver bug crítico (não foi encontrado).
- **Rotas e estrutura de páginas**: inalteradas.
- **Lógica de negócio**: forms, i18n, navegação – intocadas.
- **Novas animações**: não adicionadas.
- **GalacticPortfolioSection marquee**: layout intencional com overflow interno; não alterado para não mudar identidade visual.

---

## 5. Entrega – Resumo da implementação

### Arquivos alterados
- `src/index.css` – variáveis de container/spacing, utilitário `.site-container`, `:focus-visible` global
- `src/components/ui/button.tsx` – min-height 44px (base), 48px (lg), icon 44px
- `src/components/ui/card.tsx` – padding responsivo p-4 md:p-6 em Header/Content/Footer; CardTitle text-lg md:text-xl
- `src/components/layout/SiteNavbar.tsx` – padding lateral responsivo (px-4 → lg:px-10)
- `src/components/layout/SimpleHeader.tsx` – px-4 md:px-6 lg:px-8; focus-visible em links
- `src/components/layout/SiteFooter.tsx` – lg:px-8; grid gap-10 md:gap-12
- `src/components/layout/LanguageToggle.tsx` – min-h-[40px] nos botões, text-xs em mobile
- `src/components/sections/ServicesSection.tsx` – container lg:px-8; h2 text-2xl md:text-4xl; grid gap-4 md:gap-6 lg:gap-8; CTAs flex-col em mobile
- `src/components/sections/ProcessSection.tsx` – container lg:px-8; h2 text-2xl md:text-4xl; grid gap-4 md:gap-6 lg:gap-8
- `src/components/sections/AboutSection.tsx` – container lg:px-8; h2 text-2xl md:text-4xl; CTAs flex-col em mobile
- `src/components/sections/ContactSection.tsx` – container lg:px-8; h2 text-2xl md:text-4xl
- `src/components/sections/QuickProjectSection.tsx` – px-4 md:px-6 lg:px-8
- `src/components/sections/ForAgenciesSection.tsx` – px-4 md:px-6 lg:px-8
- `src/components/sections/TestimonialsSection.tsx` – px-4 md:px-6 lg:px-8
- `src/components/sections/StackSection.tsx` – container lg:px-8
- `src/components/portfolio/GalacticPortfolioSection.tsx` – container lg:px-8
- `src/components/pages/ContatoPageContent.tsx` – container lg:px-8; h1 text-2xl md:text-4xl
- `src/components/pages/ServicosPageContent.tsx` – containers lg:px-8; h1/h2 text-2xl md:text-4xl; max-w-4xl com px
- `src/components/pages/SobrePageContent.tsx` – container lg:px-8; h1 text-2xl md:text-4xl
- `RESPONSIVE_AUDIT.md` – diagnóstico e checklist (este arquivo)

### Padronização aplicada
| Item | Padrão |
|------|--------|
| Container | `max-w-6xl` (ou 4xl/3xl) + `px-4 md:px-6 lg:px-8` |
| Spacing vertical seções | `py-16 md:py-24` |
| Títulos de seção (H1/H2) | `text-2xl md:text-4xl` |
| Grid de cards | `gap-4 md:gap-6 lg:gap-8`; 1 col mobile, 2 col tablet, 3 col desktop onde já existia |
| Cards | `p-4 md:p-6` em header/content/footer |
| Botões | min-height 44px (48px em lg); tap-friendly |
| Focus | `:focus-visible` global + rings em links/buttons |

### Problemas resolvidos por prioridade
- **P0**: Overflow já controlado; botões e navbar com área de toque adequada; LanguageToggle acessível.
- **P1**: Container único, tipografia e grids responsivos, cards e CTAs ajustados em mobile/tablet.
- **P2**: Focus visível e SimpleHeader alinhado ao padrão.

### Validação
- `npm run build` executado com sucesso (Next.js 16.1.6).
- Recomendado testar manualmente em 360px, 390px, 768px, 1024px e 1280px.

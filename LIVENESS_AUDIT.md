# Auditoria — Site mais “vivo” e premium

## Problemas identificados
1. **Fundos vazios**: ServicesSection (#08000e), ProcessSection (#05000a), AboutSection (#05000a), ContactSection (#08000e) — chapados, sem profundidade (só Portfolio tem galactic-bg).
2. **Pouca separação entre seções**: Apenas section-bridge após hero; entre Soluções/Processo/Sobre/Contato não há divisor visual.
3. **Contraste**: text-white/55 e /65 em descrições — subir para /60–/70 em áreas críticas.
4. **Cards**: Transição genérica; falta hover com leve elevação + borda/glow sutil.
5. **Sem “respirar”**: Títulos e cards entram estáticos; falta reveal suave ao scroll.
6. **Fundo base**: Muito preto (#08000E); dar leve nuance (evitar preto puro).
7. **CTAs**: Botão primário ok; outline pode ganhar hover mais elegante.
8. **Reduced motion**: Não há verificação de prefers-reduced-motion nas animações.

## Plano (6–10 mudanças prioritárias)
1. **Alta** — Criar SectionBackground (variantes A/B) com base + blobs + noise opcional.
2. **Alta** — Adicionar divisor de seção (gradient line / top glow) entre blocos.
3. **Alta** — Aplicar SectionBackground nas seções da home (alternando A/B).
4. **Média** — Reveal ao scroll (fade + translateY) em títulos e cards; respeitar reduced-motion.
5. **Média** — Card hover: elevar 2–4px + borda + glow sutil (CSS).
6. **Média** — Ajustar contraste: descrições text-white/60 ou /70; cards bg um pouco mais claro.
7. **Baixa** — Botão outline: hover mais visível (borda/background).
8. **Baixa** — Garantir tokens/classes documentados para uso futuro.

---

## Implementação realizada

### Arquivos alterados
- **`src/components/layout/SectionBackground.tsx`** (novo) — Sistema de fundo por seção (base + blobs A/B + noise + topGlow).
- **`src/components/layout/SectionReveal.tsx`** (novo) — Reveal ao scroll (fade + translateY) com `useReducedMotion`.
- **`src/styles/galactic.css`** — Classes `.section-divider`, `.section-top-glow`, `.section-card-hover` (hover com elevação + borda + glow; `prefers-reduced-motion`).
- **`src/App.tsx`** — Divisores entre seções; remoção de padding duplicado das `<section>`.
- **`src/components/sections/ServicesSection.tsx`** — SectionBackground (variant a), SectionReveal (header, cards, CTAs), `section-card-hover` nos cards, texto descrição `text-white/60`.
- **`src/components/sections/ProcessSection.tsx`** — SectionBackground (variant b), SectionReveal (header, cards, guarantees), `section-card-hover` nos cards, CardDescription `text-white/70`.
- **`src/components/sections/AboutSection.tsx`** — SectionBackground (variant a), SectionReveal (blocos), parágrafos `text-white/70` e `max-w-2xl`, lista `text-white/70`.
- **`src/components/sections/ContactSection.tsx`** — SectionBackground (variant b), SectionReveal (header, form), descrição `text-white/70` e `max-w-xl mx-auto`.
- **`src/components/ui/button.tsx`** — Outline: hover com `border-brand-red/70` e `transition-colors duration-200`.

### Padrões visuais criados
1. **SectionBackground** — Uso: `<SectionBackground variant="a"|"b" topGlow className="bg-... py-...">`. Variante A: glow laranja à esquerda; B: glow roxo à direita. Props: `noise` (default true), `topGlow` (default false).
2. **SectionReveal** — Uso: envolver blocos que devem aparecer ao scroll. Respeita `prefers-reduced-motion`. Props: `delay` para stagger.
3. **Divisor** — `<div className="py-4"><div className="section-divider" /></div>` entre seções.
4. **Card hover** — Classe `section-card-hover` nos cards de conteúdo (não no portfolio-card, que já tem seu próprio hover).

### Onde aplicar no futuro
- **Novas seções:** Envolver o wrapper da seção em `SectionBackground` (alternar variant a/b) e usar `SectionReveal` em títulos e blocos de conteúdo.
- **Novos cards:** Adicionar `section-card-hover` se quiser o mesmo hover (elevação + borda + glow).
- **Tokens/classes:** Glow e cores dos blobs estão em `SectionBackground.tsx` (opacidade ~0.07–0.08, blur 55–60px). Ajustar lá se quiser mais/menos intensidade. Divisor e top glow em `galactic.css`.

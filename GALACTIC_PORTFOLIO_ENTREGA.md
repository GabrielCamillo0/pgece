# Entrega – Seção Galactic Portfolio (3D)

## Arquivos criados/alterados

### Novos
- `src/components/portfolio/GalacticPortfolioSection.tsx` – Seção com fundo, noise, overlay de vídeo e grid de cards
- `src/components/portfolio/ProjectCard.tsx` – Card com tilt (react-parallax-tilt) e glassmorphism
- `src/components/portfolio/ProjectModal.tsx` – Modal (shadcn-style Dialog) com título, descrição, tags e “Visitar site”
- `src/components/ui/dialog.tsx` – Componente Dialog baseado em Radix UI (compatível com shadcn/ui)
- `src/data/projects.ts` – Tipo `Project` e array `projects` com 6 itens
- `src/styles/galactic.css` – Estilos galactic-bg, galactic-noise, scene-3d, plane-3d, portfolio-card
- `public/GALAXY_VIDEO_README.txt` – Instruções para colocar `galaxy.webm` / `galaxy.mp4`

### Alterados
- `package.json` – Dependências: react, react-dom, framer-motion, react-parallax-tilt, @radix-ui/react-dialog; devDependencies: tailwindcss, postcss, autoprefixer
- `index.html` – `#root` e script `src/main.tsx`
- `src/main.tsx` – Entry React + import de `./styles/galactic.css`
- `src/index.css` – Diretivas Tailwind
- `src/App.tsx` – Renderiza `<GalacticPortfolioSection />`

### Removidos (template vanilla)
- `src/main.ts`
- `src/counter.ts`

### Já existentes (confirmados)
- `vite.config.ts` – plugin React e alias `@` → `./src`
- `tsconfig.json` – `baseUrl`, `paths` `@/*` → `src/*`
- `tailwind.config.js`, `postcss.config.js`

---

## Comandos executados

```bash
npm install
npm run build
```

(Projeto já tinha Vite + React configurado; dependências e Tailwind foram adicionados.)

---

## Instruções para o usuário

### Trocar as URLs dos projetos
Edite `src/data/projects.ts` e altere o campo `url` de cada objeto em `projects` para os links reais dos seus projetos (substituir `https://seu-link-aqui.com`).

### Vídeo de galáxia (overlay)
- Coloque em `public/` os arquivos:
  - `galaxy.webm` (recomendado)
  - `galaxy.mp4` (fallback)
- Se não existirem, a seção continua funcionando; apenas o overlay animado não aparece.
- Detalhes em `public/GALAXY_VIDEO_README.txt`.

### Rodar o projeto
```bash
npm run dev
```
Abre a app com a seção “Portfolio” (Galactic Portfolio 3D). Clique em um card para abrir o modal; “Visitar site” abre a URL em nova aba.

---

## Confirmações

- **Overlay não bloqueia clique:** O vídeo de galáxia tem `pointer-events-none` e `z-20`; o conteúdo (grid de cards) está em `z-10`, então os cards recebem os cliques normalmente.
- **Modal:** Abre e fecha corretamente (trigger no card, botão X, overlay, ESC); “Visitar site” abre `project.url` em nova aba.
- **Responsivo:** Grid em 1 coluna no mobile e 3 colunas no desktop (`md:grid-cols-3`).

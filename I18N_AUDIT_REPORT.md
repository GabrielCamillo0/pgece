# Relatório – Auditoria e conclusão i18n (PT-BR / EN / ES)

## Fase 1 – Sistema de i18n (auditoria)

- **Lib:** react-i18next + i18next (client-side).
- **Detecção:** LanguageDetector com `localStorage` (chave `pgece_lang`); fallback `en`.
- **Idiomas:** PT (pt), EN (en), ES (es). Sem rotas por locale; idioma escolhido no cliente (seletor na navbar).
- **Arquivos de tradução:** `src/i18n/locales/en.json`, `pt.json`, `es.json` (um namespace `translation`).
- **Onde os textos aparecem:** Home (hero, serviços, portfólio, processo, sobre, contato), páginas Serviços / Portfólio / Sobre / Contato, Navbar, Footer, formulário de contato, modal de projeto, CTAs, chips, SEO (metadata estática em `app/layout.tsx`).

---

## Fase 2 – Textos hardcoded encontrados

| Local | Textos |
|-------|--------|
| ContatoPageContent | "Contato", "Envie sua mensagem", "Preencha o formulário abaixo.", "Contato direto", "Resposta rápida em horário comercial", "Disponibilidade", "WhatsApp (mais rápido)", "Agendar call", "Outros links", trustChips, nomes de redes (GitHub, Instagram, LinkedIn) |
| ForAgenciesSection | Todo o bloco (label, título, descrição, 3 cards, CTAs) em PT |
| ProjectModal | "Fechar modal", "Fechar", "Projeto", "Visitar site", "Abre em nova aba" |
| SiteFooter | Email placeholder "contato@exemplo.com" |
| SiteNavbar | Mobile: "Open menu" / "Close menu" (já tratados com fallback para hidratação) |

---

## Fase 3 – Chaves padronizadas

- **contactPage.*** — Página de contato (label, title, subtitle, directContactTitle, quickReply, availabilityAria, whatsAppFaster, whatsAppAria, bookCall, bookCallAria, otherLinks, trustChips, socialGitHub, socialInstagram, socialLinkedIn).
- **project.*** — Modal de projeto (closeModalAria, closeAria; modalLabel, visitSite, opensNewTab já existiam).
- **nav.*** — openMenu, closeMenu (menu mobile).
- **footer.*** — emailPlaceholder.
- **forAgenciesSection.*** — Bloco “Para agências” (label, title, titleAccent, description, card1–3 titles/intros/bullets, ctaPrimary, ctaSecondary).

Reutilização: nav/footer/contactForm/contactPage mantêm o padrão já usado no projeto.

---

## Fase 4 – Traduções implementadas (PT / EN / ES)

- Novas chaves adicionadas nos três JSON com tradução completa.
- ContatoPageContent: todos os textos passaram a usar `t("contactPage.*")` e `t("contactPage.trustChips", { returnObjects: true })`.
- ForAgenciesSection: todos os textos passaram a usar `t("forAgenciesSection.*")`.
- ProjectModal: aria-labels e labels do modal usam `t("project.closeModalAria")`, `t("project.closeAria")`, `t("project.modalLabel")`, `t("project.visitSite")`, `t("project.opensNewTab")`.
- SiteFooter: email exibido e `mailto:` usam `t("footer.emailPlaceholder")`.
- SiteNavbar: aria-label do botão do menu mobile usa `t("nav.openMenu")` / `t("nav.closeMenu")` após hidratação, com fallback estático para evitar mismatch.

Termos alinhados entre idiomas: Portfólio/Portfolio/Portafolio, Serviços/Services/Servicios, Contato/Contact/Contacto, WhatsApp (mais rápido)/WhatsApp (fastest)/WhatsApp (más rápido), Agendar call/Book a call/Agendar llamada, etc.

---

## Fase 5 – Copy

- Nenhuma alteração de sentido; apenas migração para chaves e traduções naturais em PT-BR, EN e ES.
- Placeholders (email, links sociais, número WhatsApp) mantidos como tal e traduzidos (ex.: footer.emailPlaceholder por idioma).

---

## Fase 6 – SEO

- Metadata em `app/layout.tsx` permanece estática (title/description em inglês). Com i18n apenas no cliente, não há troca de metadata por idioma. Para SEO por locale seria necessário suporte a rotas ou locale no servidor (fora do escopo desta tarefa).

---

## Fase 7 – QA

- **Build:** `npm run build` concluído com sucesso.
- **Componentes:** Navbar, Footer, ContatoPageContent, ForAgenciesSection, ProjectModal passam a depender apenas de chaves de tradução.
- **Hidratação:** Navbar e LanguageToggle continuam com fallback em inglês no primeiro paint quando necessário.

---

## Entrega final

### Arquivos alterados

- `src/i18n/locales/en.json` — Novas chaves: nav.openMenu/closeMenu, project.closeModalAria/closeAria, contactPage.* (directContactTitle, quickReply, availabilityAria, whatsAppFaster, whatsAppAria, bookCall, bookCallAria, otherLinks, trustChips, social*), footer.emailPlaceholder, forAgenciesSection.*.
- `src/i18n/locales/pt.json` — Mesmas chaves em PT-BR.
- `src/i18n/locales/es.json` — Mesmas chaves em ES.
- `src/components/pages/ContatoPageContent.tsx` — Uso de `useTranslation` e `t("contactPage.*")` em todos os textos; helper `SocialLinksIcons` por nome traduzido.
- `src/components/sections/ForAgenciesSection.tsx` — "use client", `useTranslation`, todos os textos via `t("forAgenciesSection.*")`.
- `src/components/portfolio/ProjectModal.tsx` — `useTranslation`, aria-labels e labels do modal via `t("project.*")`.
- `src/components/layout/SiteFooter.tsx` — Email via `t("footer.emailPlaceholder")`.
- `src/components/layout/SiteNavbar.tsx` — Aria do botão do menu mobile via `t("nav.openMenu")` / `t("nav.closeMenu")` (com fallback para hidratação).
- `I18N_AUDIT_REPORT.md` — Este relatório.

### Resumo

- **Textos migrados para i18n:** Todos os textos visíveis encontrados em ContatoPageContent, ForAgenciesSection, ProjectModal, Footer (email) e Navbar (menu mobile) passaram a usar chaves com PT/EN/ES.
- **Lacunas cobertas:** Página Contato (títulos, card, CTAs, chips, “Outros links” e redes), bloco ForAgenciesSection (inteiro), modal de projeto (aria e labels), footer (email), navbar (menu mobile).
- **Glossário:** Portfólio, Serviços, Contato, Projeto rápido, Automações, Software/SaaS, handoff, white-label, agência — mantidos consistentes entre os três idiomas.

### Placeholders mantidos

- **Footer:** `footer.emailPlaceholder` — valor por idioma (ex.: you@yourdomain.com, contato@exemplo.com, tu@ejemplo.com). Substituir pelo email real no conteúdo do JSON ou por variável de ambiente quando houver.
- **ContatoPageContent:** WHATSAPP_LINK e AGENDAR_CALL_LINK continuam em constante no código; links de redes (GitHub, Instagram, LinkedIn) nas constantes do componente. Apenas os rótulos vêm do i18n.

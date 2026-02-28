import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ForAgenciesSection() {
  return (
    <div className="relative bg-[#05000a]/55 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
            Para agências
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            White-label para você vender,
            <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
              {" "}
              eu entrego.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
            Você mantém o relacionamento e a estratégia com o cliente. Eu cuido da implementação
            e da experiência digital, com handoff organizado e previsível.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>Formato white-label</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <p>Você assina o projeto, eu fico em segundo plano.</p>
              <ul className="space-y-1 list-inside list-disc">
                <li>Comunicação via Slack / WhatsApp / email.</li>
                <li>Arquitetura e implementação alinhadas com o stack da agência.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>Handoff organizado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <ul className="space-y-1 list-inside list-disc">
                <li>Repositório no GitHub ou similar.</li>
                <li>Deploy configurado (Vercel/Netlify/etc.).</li>
                <li>Anotações de setup e variáveis de ambiente.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/80">
            <CardHeader>
              <CardTitle>Modelos de trabalho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-white/70">
              <ul className="space-y-1 list-inside list-disc">
                <li>Por projeto fechado.</li>
                <li>Pacote mensal de horas.</li>
                <li>Sprints semanais focadas em entregas específicas.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#contato">Pedir orçamento para agência</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#contato">Ver disponibilidade de agenda</a>
          </Button>
        </div>
      </div>
    </div>
  );
}


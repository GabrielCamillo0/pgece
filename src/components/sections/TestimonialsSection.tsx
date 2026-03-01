import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Depoimento (placeholder)",
    role: "[Cargo / empresa]",
    text: "[Depoimento real aqui sobre qualidade, prazo e comunicação.]",
  },
  {
    name: "Depoimento (placeholder)",
    role: "[Cargo / empresa]",
    text: "[Depoimento real aqui focado em trabalho com agência / white-label.]",
  },
  {
    name: "Depoimento (placeholder)",
    role: "[Cargo / empresa]",
    text: "[Depoimento real aqui sobre cuidado com detalhes e handoff.]",
  },
];

export function TestimonialsSection() {
  return (
    <div className="relative bg-[#08000e]/55 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-medium uppercase tracking-[0.28em] text-brand-red">
            Depoimentos
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            Credibilidade construída
            <span className="bg-gradient-to-r from-brand-red via-brand-orange to-amber-300 bg-clip-text text-transparent">
              {" "}
              projeto a projeto.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
            Substitua os textos abaixo por depoimentos reais de clientes ou parceiros.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-white/10 bg-card/80">
              <CardHeader>
                <CardTitle className="text-base">{t.name}</CardTitle>
                <p className="text-xs text-white/45">{t.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-white/70">{t.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


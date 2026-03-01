import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function QuickProjectSection() {
  return (
    <div className="relative bg-[#05000a]/55 py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <Card className="border-brand-red/30 bg-card/80 p-8 md:p-10">
          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-2xl md:text-3xl">
              Projeto rápido: landing em 48–72h
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-white/70 md:text-base p-0 pt-2">
            <p>
              Ideal para campanhas, validação de oferta ou MVP de serviço. Entrega focada em
              clareza, estrutura e conversão.
            </p>
            <div>
              <p className="mb-2 font-medium text-white">
                O que eu preciso para começar:
              </p>
              <ul className="space-y-1 list-inside list-disc">
                <li>Link da marca / redes sociais.</li>
                <li>Oferta principal (o que está sendo vendido).</li>
                <li>Prazo desejado e referências de layout.</li>
              </ul>
            </div>
            <Button asChild>
              <a href="#contato">Pedir projeto rápido</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { Card, CardContent } from '@/components/ui/card'
import { Target, Flag, Brain, HeartPulse } from 'lucide-react'

export default function About() {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Sobre a <span className="text-primary">ALG</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Nascemos da convicção de que a gestão patrimonial deve ser técnica e humana.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 container max-w-4xl">
        <div className="prose prose-invert prose-lg mx-auto">
          <p className="text-muted-foreground leading-relaxed text-center">
            A ALG Planejamento e Controle de Finanças Pessoais Ltda-me foi fundada com um propósito
            claro: transcender as planilhas. Compreendemos que por trás de cada número existe um
            projeto de vida, uma família, um sonho. Nossa trajetória é marcada pela união da mais
            alta precisão analítica do mercado com um atendimento genuinamente dedicado e
            transparente.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="card-glass overflow-hidden border-t-4 border-t-primary">
            <CardContent className="p-8 flex flex-col items-center text-center h-full">
              <Target className="h-12 w-12 text-primary mb-6" />
              <h2 className="text-2xl font-display font-bold mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground">
                "Oferecemos planejamento financeiro personalizado e soluções inovadoras para sua
                estabilidade e realização."
              </p>
            </CardContent>
          </Card>

          <Card className="card-glass overflow-hidden border-t-4 border-t-[#cbd5e1]">
            <CardContent className="p-8 flex flex-col items-center text-center h-full">
              <Flag className="h-12 w-12 text-[#cbd5e1] mb-6" />
              <h2 className="text-2xl font-display font-bold mb-4">Nossa Visão</h2>
              <p className="text-muted-foreground">
                "Ser referência nacional em gestão patrimonial, reconhecida pela excelência técnica
                e pela transformação positiva na vida dos nossos clientes."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The meaning of ALG */}
      <section className="py-24 bg-secondary/30 mt-8 border-y border-border/40">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              O Significado de <span className="text-primary">ALG</span>
            </h2>
            <p className="text-muted-foreground">
              Uma dualidade perfeita entre a razão e a emoção.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <Brain className="h-8 w-8 text-[#cbd5e1]" />
                <h3 className="text-2xl font-display font-bold border-b border-border/50 pb-2 flex-1 text-[#cbd5e1]">
                  O Racional
                </h3>
              </div>
              <ul className="space-y-6">
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    A - Análise Financeira
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Rigor técnico na avaliação de cenários e modelagem de carteiras.
                  </span>
                </li>
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    L - Liderança de Mercado
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Estratégias proativas para manter o portfólio à frente das tendências.
                  </span>
                </li>
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    G - Gestão de Recursos
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Alocação eficiente, proteção e otimização fiscal do patrimônio.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <HeartPulse className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-display font-bold border-b border-border/50 pb-2 flex-1 text-primary">
                  O Emocional
                </h3>
              </div>
              <ul className="space-y-6">
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    A - Amor
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Dedicação real ao propósito e bem-estar financeiro de cada cliente.
                  </span>
                </li>
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    L - Lealdade
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Compromisso inegociável com a ética e a parceria de longo prazo.
                  </span>
                </li>
                <li>
                  <strong className="text-lg font-display text-foreground block mb-1">
                    G - Gratidão
                  </strong>
                  <span className="text-muted-foreground text-sm">
                    Reconhecimento do privilégio de guiar famílias rumo à independência.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

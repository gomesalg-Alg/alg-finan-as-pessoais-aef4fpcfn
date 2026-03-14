import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProcessTimeline } from '@/components/services/Timeline'
import { Compass, LineChart, ShieldAlert, GraduationCap } from 'lucide-react'

const catalog = [
  {
    title: 'Planejamento Financeiro Personalizado',
    icon: Compass,
    content:
      'Criamos um roteiro financeiro exclusivo. Analisamos fluxo de caixa, despesas, e projetamos metas de curto a longo prazo para garantir que cada decisão financeira aproxime você da independência.',
  },
  {
    title: 'Consultoria em Investimentos',
    icon: LineChart,
    content:
      'Foco no crescimento financeiro com segurança. Estruturamos carteiras diversificadas, otimizando a relação risco-retorno com base em cenários macroeconômicos e no seu perfil investidor.',
  },
  {
    title: 'Análise de Risco',
    icon: ShieldAlert,
    content:
      'Proteção é tão importante quanto rentabilidade. Avaliamos vulnerabilidades financeiras, estruturamos proteções e seguros para blindar suas conquistas contra imprevistos.',
  },
  {
    title: 'Educação Financeira',
    icon: GraduationCap,
    content:
      'O verdadeiro poder está no conhecimento. Oferecemos mentoria para que você compreenda as dinâmicas do mercado, empoderando suas decisões para o longo prazo.',
  },
]

export default function Services() {
  return (
    <div className="pb-16">
      {/* Page Header */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-secondary/50 to-background border-b border-border/40">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Catálogo de <span className="text-primary">Serviços</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Soluções integradas desenhadas para proporcionar clareza, segurança e excelência em
            Gestão de Controle Financeiro Pessoal.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 container">
        <div className="grid md:grid-cols-2 gap-8">
          {catalog.map((item, idx) => (
            <Card
              key={idx}
              className="card-glass border-border/40 hover:border-primary/50 transition-colors"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mt-4">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <ProcessTimeline />
    </div>
  )
}

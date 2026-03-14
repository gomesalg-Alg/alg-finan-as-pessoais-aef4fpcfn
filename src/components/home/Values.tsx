import { Shield, Star, Lightbulb, Eye, HeartHandshake } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const values = [
  {
    title: 'Responsabilidade',
    desc: 'Agir com ética e comprometimento em todas as nossas ações.',
    icon: Shield,
  },
  {
    title: 'Excelência',
    desc: 'Buscar sempre a melhor solução para nossos clientes, com qualidade e eficiência.',
    icon: Star,
  },
  {
    title: 'Inovação',
    desc: 'Estar à frente das tendências e oferecer ferramentas financeiras modernas e eficazes.',
    icon: Lightbulb,
  },
  {
    title: 'Transparência',
    desc: 'Manter uma comunicação clara e aberta com nossos clientes.',
    icon: Eye,
  },
  {
    title: 'Zelo',
    desc: 'Tratar as finanças dos nossos clientes com o mesmo cuidado e atenção que tratamos as nossas próprias.',
    icon: HeartHandshake,
  },
]

export function Values() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-y border-border/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Nossos <span className="text-primary">Valores</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Os pilares que sustentam cada recomendação e estratégia que entregamos aos nossos
            clientes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((val, idx) => (
            <Card
              key={idx}
              className="card-glass border-t-2 border-t-primary/50 animate-fade-in-up card-hover bg-secondary/30"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-6">
                <val.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

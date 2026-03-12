import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Compass, LineChart, ShieldAlert, GraduationCap, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'planejamento',
    title: 'Planejamento Personalizado',
    icon: Compass,
    desc: 'Estratégias sob medida para seus objetivos de curto, médio e longo prazo.',
  },
  {
    id: 'consultoria',
    title: 'Consultoria de Investimentos',
    icon: LineChart,
    desc: 'Análise e recomendação de portfólios para maximizar rentabilidade com segurança.',
  },
  {
    id: 'risco',
    title: 'Análise de Risco',
    icon: ShieldAlert,
    desc: 'Identificação e mitigação de vulnerabilidades financeiras no seu patrimônio.',
  },
  {
    id: 'educacao',
    title: 'Educação Financeira',
    icon: GraduationCap,
    desc: 'Capacitação para tomadas de decisão conscientes e independentes.',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Nossas <span className="text-primary">Especialidades</span>
            </h2>
            <p className="text-muted-foreground">
              Soluções completas para estruturar, proteger e multiplicar seu patrimônio com
              inteligência.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            <Link to="/servicos">
              Ver todos os serviços <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden bg-secondary/50 border-border/50 hover:border-primary/50 transition-colors h-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
              <img
                src={`https://img.usecurling.com/p/400/400?q=finance&color=black&seed=${service.id}`}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-105 duration-700"
              />
              <CardContent className="relative z-20 flex flex-col justify-end h-full p-6">
                <service.icon className="h-10 w-10 text-primary mb-4 transform group-hover:-translate-y-2 transition-transform duration-300" />
                <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
                <div className="h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2">
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

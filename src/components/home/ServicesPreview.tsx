import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Landmark,
  Briefcase,
  Calculator,
} from 'lucide-react'

const services = [
  {
    title: 'Planejamento Financeiro',
    description:
      'Análise completa da sua situação atual com criação de rotas claras para alcançar seus objetivos de curto, médio e longo prazo.',
    icon: TrendingUp,
  },
  {
    title: 'Gestão de Controle Financeiro Pessoal',
    description:
      'Estratégias avançadas para proteção, diversificação e sucessão do seu patrimônio com foco em segurança e rentabilidade.',
    icon: Landmark,
  },
  {
    title: 'Organização de Orçamento',
    description:
      'Estruturação do fluxo de caixa pessoal, identificando vazamentos financeiros e otimizando seus recursos mensais.',
    icon: Wallet,
  },
  {
    title: 'Análise de Investimentos',
    description:
      'Avaliação isenta e profissional do seu portfólio atual e recomendação de ativos alinhados ao seu perfil de risco.',
    icon: Briefcase,
  },
  {
    title: 'Proteção Patrimonial',
    description:
      'Mapeamento de riscos e estruturação de blindagem patrimonial através de seguros e ferramentas jurídicas adequadas.',
    icon: ShieldCheck,
  },
  {
    title: 'Planejamento Tributário',
    description:
      'Estratégias legais para otimizar sua carga tributária, garantindo mais eficiência financeira nos seus rendimentos.',
    icon: Calculator,
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossas Soluções</h2>
            <p className="text-lg text-muted-foreground">
              Na ALG Finanças Pessoais, oferecemos um portfólio completo de serviços desenhados para
              trazer clareza, controle e crescimento para sua vida financeira.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="shrink-0 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to="/servicos">
              Ver todos os serviços
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/50 bg-white"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

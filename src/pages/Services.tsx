import {
  TrendingUp,
  ShieldCheck,
  Wallet,
  Landmark,
  Briefcase,
  Calculator,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Planejamento Financeiro',
    description:
      'Um diagnóstico completo da sua vida financeira, criando um mapa personalizado para alcançar seus objetivos.',
    details: [
      'Diagnóstico de fluxo de caixa',
      'Definição de metas de curto a longo prazo',
      'Criação de fundo de emergência',
      'Estratégias para quitação de dívidas',
    ],
    icon: TrendingUp,
  },
  {
    title: 'Gestão de Controle Financeiro Pessoal',
    description:
      'Cuidamos do seu patrimônio com a visão holística necessária para preservá-lo e multiplicá-lo para as próximas gerações.',
    details: [
      'Consolidação de patrimônio',
      'Planejamento sucessório',
      'Estruturas offshore (quando aplicável)',
      'Gestão de riscos do portfólio',
    ],
    icon: Landmark,
  },
  {
    title: 'Análise de Investimentos',
    description:
      'Avaliamos sua carteira atual e recomendamos os melhores ativos do mercado, alinhados ao seu perfil e objetivos.',
    details: [
      'Análise de perfil de investidor',
      'Rebalanceamento de carteira',
      'Acesso a produtos exclusivos',
      'Acompanhamento de rentabilidade',
    ],
    icon: Briefcase,
  },
  {
    title: 'Proteção Patrimonial',
    description:
      'Garantimos que tudo o que você construiu esteja protegido contra imprevistos jurídicos, fiscais ou de saúde.',
    details: [
      'Seguro de vida resgatável',
      'Seguros de responsabilidade civil',
      'Estruturação de holdings familiares',
      'Blindagem legal e societária',
    ],
    icon: ShieldCheck,
  },
]

export default function Services() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossas Soluções</h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Na ALG Finanças Pessoais, oferecemos serviços especializados em Gestão de Controle
              Financeiro Pessoal que cobrem todos os aspectos da sua vida financeira.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="aspect-video bg-secondary/30 rounded-2xl border border-border flex items-center justify-center p-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Icon className="w-32 h-32 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 pt-4">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6">
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link to="/contato">
                          Agendar Análise
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para assumir o controle?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agende uma reunião inicial gratuita com um de nossos especialistas em Gestão de Controle
            Financeiro Pessoal e descubra como podemos ajudar a otimizar seus resultados.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg"
          >
            <Link to="/contato">Quero falar com um especialista</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

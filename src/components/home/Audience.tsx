import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Building2, Users, Landmark } from 'lucide-react'

const personas = [
  {
    title: 'Profissionais Liberais',
    icon: Briefcase,
    desc: 'Organização de fluxo de caixa e planejamento para independência financeira.',
  },
  {
    title: 'Empresários',
    icon: Building2,
    desc: 'Separação de finanças pessoais e empresariais, com foco em sucessão e proteção.',
  },
  {
    title: 'Famílias',
    icon: Users,
    desc: 'Construção de controle financeiro geracional, educação financeira para filhos e segurança.',
  },
  {
    title: 'Investidores',
    icon: Landmark,
    desc: 'Otimização de carteira, análise avançada de riscos e busca por estabilidade financeira sustentável.',
  },
]

export function Audience() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Para Quem <span className="text-primary">Trabalhamos</span>
          </h2>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-4">
            {personas.map((persona, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="card-glass h-[220px]">
                  <CardContent className="p-6 flex flex-col h-full">
                    <persona.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-display font-semibold text-lg mb-2">{persona.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{persona.desc}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

import { Users, Building2, GraduationCap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const audiences = [
  {
    title: 'Profissionais Liberais',
    description:
      'Médicos, advogados, engenheiros e arquitetos que buscam organizar o fluxo de caixa instável e construir patrimônio sólido.',
    icon: GraduationCap,
  },
  {
    title: 'Empresários e Empreendedores',
    description:
      'Proprietários de negócios que precisam separar as finanças pessoais das empresariais e proteger seu legado.',
    icon: Building2,
  },
  {
    title: 'Famílias',
    description:
      'Casais e famílias buscando alinhamento financeiro, planejamento para a educação dos filhos e sucessão patrimonial.',
    icon: Users,
  },
]

export default function Audience() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Para quem é a ALG Finanças Pessoais?
          </h2>
          <p className="text-lg text-muted-foreground">
            Nossa metodologia de Gestão de Controle Financeiro Pessoal foi desenvolvida para atender
            necessidades específicas de diferentes perfis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="border-none shadow-lg bg-secondary/20 hover:-translate-y-2 transition-transform duration-300"
              >
                <CardContent className="pt-8 text-center px-6">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

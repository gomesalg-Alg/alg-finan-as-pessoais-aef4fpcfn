import { ShieldCheck, TrendingUp, Rocket, BarChart, Landmark, Lock } from 'lucide-react'

const valuesList = [
  {
    title: 'Responsabilidade',
    description: 'Agir com ética e comprometimento em todas as nossas ações.',
    icon: ShieldCheck,
  },
  {
    title: 'Excelência',
    description: 'Buscar sempre a melhor solução para nossos clientes, com qualidade e eficiência.',
    icon: TrendingUp,
  },
  {
    title: 'Inovação',
    description:
      'Estar à frente das tendências e oferecer ferramentas financeiras modernas e eficazes.',
    icon: Rocket,
  },
  {
    title: 'Transparência',
    description: 'Manter uma comunicação clara e aberta com nossos clientes.',
    icon: BarChart,
  },
  {
    title: 'Zelo',
    description:
      'Tratar as finanças dos nossos clientes com o mesmo cuidado e atenção que tratamos as nossas próprias.',
    icon: Landmark,
  },
  {
    title: 'Confidencialidade',
    description:
      'Garantir o sigilo absoluto e a segurança das informações financeiras de nossos clientes em todas as etapas.',
    icon: Lock,
  },
]

export function Values() {
  return (
    <section className="py-24 bg-card relative overflow-hidden border-t border-border">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Nossos Pilares
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6 text-foreground">
            Nossos Valores
          </h2>
          <p className="text-lg text-muted-foreground">
            A fundação da ALG Finanças Pessoais é construída sobre princípios sólidos que orientam
            cada decisão, análise e recomendação que fazemos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {valuesList.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-background hover:bg-secondary hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 group"
              >
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-8 shadow-inner shadow-black/5 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary">
                  <Icon
                    className="h-10 w-10 text-primary group-hover:text-primary-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/50 rounded-full pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-border/30 rounded-full pointer-events-none opacity-20" />
    </section>
  )
}

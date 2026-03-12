const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Análise profunda da sua situação financeira atual, histórico e compreensão detalhada dos seus objetivos de vida e tolerância ao risco.',
  },
  {
    num: '02',
    title: 'Estratégia',
    desc: 'Desenvolvimento de um plano de ação estruturado, com alocação de ativos inteligente e modelagem financeira de cenários futuros.',
  },
  {
    num: '03',
    title: 'Execução',
    desc: 'Implementação cuidadosa da estratégia definida, com seleção dos melhores instrumentos financeiros alinhados ao seu perfil.',
  },
  {
    num: '04',
    title: 'Acompanhamento',
    desc: 'Monitoramento contínuo, relatórios periódicos de performance e rebalanceamento tático conforme as mudanças do mercado ou da sua vida.',
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-16 text-center">
          Nosso <span className="text-primary">Processo</span>
        </h2>

        <div className="relative border-l border-border/50 ml-4 md:ml-8 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-10 md:pl-16 group">
              <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <span className="text-xs font-bold font-display">{step.num}</span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

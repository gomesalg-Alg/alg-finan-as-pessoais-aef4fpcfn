import { CheckCircle2 } from 'lucide-react'

const values = ['Responsabilidade', 'Excelência', 'Inovação', 'Transparência', 'Zelo']

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

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 w-32 md:w-40 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="h-16 w-16 rounded-2xl bg-secondary border border-border flex items-center justify-center transform rotate-45 hover:rotate-0 hover:border-primary transition-all duration-300">
                <div className="transform -rotate-45 hover:rotate-0 transition-transform duration-300">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <span className="font-display font-semibold text-sm tracking-wide uppercase text-center">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

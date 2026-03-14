import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] opacity-[0.03] pointer-events-none flex items-center justify-center select-none">
        <span className="font-display font-black text-[250px] md:text-[350px] leading-none text-primary">
          AlLG
        </span>
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in-down">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          Excelência em Gestão de Controle Financeiro Pessoal
        </div>

        <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-in-up">
          Transformando números em{' '}
          <span className="text-gradient-primary">conquistas pessoais.</span>
        </h1>

        <p
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Oferecemos planejamento financeiro personalizado e soluções inovadoras para sua
          estabilidade e realização a longo prazo.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <Button asChild size="lg" className="btn-primary h-14 px-8 text-base">
            <Link to="/servicos">
              Conheça nossos serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base border-primary/50 hover:bg-primary/10"
          >
            <Link to="/contato">Fale com um especialista</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

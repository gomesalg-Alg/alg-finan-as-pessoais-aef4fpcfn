import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lock } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
      <div className="absolute inset-0 z-0 bg-background" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Gestão Financeira Inteligente
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            Transforme dados em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              decisões de liderança
            </span>
          </h1>

          <p
            className="text-xl text-muted-foreground max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Plataforma completa de planejamento e controle financeiro pessoal e empresarial com foco
            em análise, liderança e gestão de recursos.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <Button
              size="lg"
              className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link to="/login">
                <Lock className="mr-2 h-5 w-5" />
                Área restrita
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 glass-effect" asChild>
              <Link to="/contato">
                Fale com Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

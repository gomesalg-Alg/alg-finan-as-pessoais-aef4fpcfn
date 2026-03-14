import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-primary">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-primary text-sm font-medium mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Gestão de Controle Financeiro Pessoal
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Controle absoluto do seu <span className="text-gradient">futuro financeiro</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              A ALG Finanças Pessoais oferece estratégias personalizadas de análise e liderança para
              transformar seus recursos em patrimônio sólido e duradouro.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 border-0"
              >
                <Link to="/contato">
                  Solicitar Consultoria
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-border bg-card/50 hover:bg-secondary text-foreground"
              >
                <a href="https://wa.me/5511992459400" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 text-[#25D366]" />
                  Iniciar Conversa
                </a>
              </Button>
            </div>

            <div
              className="mt-12 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">100%</span>
                <span>Foco no Cliente</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">Transparência</span>
                <span>Total em Ações</span>
              </div>
            </div>
          </div>

          <div
            className="hidden lg:flex justify-center items-center relative animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <div className="relative w-full max-w-md aspect-square rounded-full border border-border bg-card/30 flex items-center justify-center p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-border animate-[spin_40s_linear_infinite_reverse]" />
              <img
                src={logoUrl}
                alt="ALG Finanças Pessoais"
                className="w-full h-full object-cover rounded-full shadow-2xl z-10 border-4 border-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

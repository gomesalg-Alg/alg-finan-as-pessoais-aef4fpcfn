import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Duality() {
  return (
    <section className="py-24 bg-gradient-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">A Escolha é Sua</h2>
          <p className="text-lg text-slate-300">
            A diferença entre sobreviver financeiramente e construir verdadeira riqueza está na
            qualidade das suas decisões e na gestão do seu controle financeiro pessoal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Without ALG */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-slate-300 flex items-center gap-3">
              <XCircle className="h-6 w-6 text-red-400" />
              Sem Gestão Profissional
            </h3>
            <ul className="space-y-4">
              {[
                'Decisões baseadas em emoção ou intuição',
                'Falta de clareza sobre o fluxo de caixa',
                'Investimentos inadequados ao seu perfil',
                'Patrimônio desprotegido contra riscos',
                'Estresse constante com dinheiro',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400">
                  <span className="h-6 w-6 rounded-full bg-red-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With ALG */}
          <div className="bg-white rounded-2xl p-8 md:p-10 text-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3 relative z-10">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              Com a ALG Finanças
            </h3>
            <ul className="space-y-4 relative z-10">
              {[
                'Estratégia clara e baseada em dados',
                'Controle total de receitas e despesas',
                'Portfólio otimizado e rentável',
                'Blindagem patrimonial estruturada',
                'Paz de espírito e segurança futura',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium">
                  <span className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg"
          >
            <Link to="/contato">
              Transformar minha vida financeira hoje
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

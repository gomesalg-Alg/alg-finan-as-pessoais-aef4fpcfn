import { CheckCircle2, Target, Eye } from 'lucide-react'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Sobre a ALG Finanças Pessoais
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Somos especialistas em Gestão de Controle Financeiro Pessoal, dedicados a transformar
              a complexidade das finanças em estratégias claras para o seu sucesso.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-accent/10 rounded-3xl transform -rotate-3 scale-105" />
              <img
                src={logoUrl}
                alt="ALG Finanças Pessoais"
                className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover border-4 border-white"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-primary">Nossa História</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fundada em 30/10/2024, a ALG Finanças Pessoais nasceu da percepção de que muitas
                pessoas bem-sucedidas em suas carreiras enfrentavam dificuldades na gestão do
                próprio patrimônio.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa abordagem não se limita a planilhas; nós atuamos como verdadeiros parceiros
                estratégicos. Analisamos profundamente seu cenário atual, exercemos liderança na
                proposição de soluções e realizamos a gestão diligente de seus recursos.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  'Metodologia exclusiva de planejamento',
                  'Independência e isenção nas recomendações',
                  'Foco em resultados de longo prazo',
                  'Confidencialidade absoluta',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <Target className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Proporcionar tranquilidade e segurança financeira aos nossos clientes através de um
                planejamento personalizado, estratégico e transparente, garantindo a construção e
                preservação do seu patrimônio.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <Eye className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                Ser reconhecida como a principal referência em Gestão de Controle Financeiro
                Pessoal, transformando a relação das pessoas com o dinheiro e impactando
                positivamente gerações.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

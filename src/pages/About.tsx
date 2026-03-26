import {
  CheckCircle2,
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  Rocket,
  BarChart,
  Landmark,
} from 'lucide-react'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

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
]

export default function About() {
  return (
    <div className="pt-24 pb-16 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
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
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-3 scale-105" />
              <img
                src={logoUrl}
                alt="ALG Finanças Pessoais"
                className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto object-cover border-4 border-card"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Nossa História</h2>
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
                  <li key={i} className="flex items-center gap-3 text-muted-foreground font-medium">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="py-16 md:py-24 bg-gradient-primary border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg text-center flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-8 shadow-inner">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Proporcionar tranquilidade e segurança financeira aos nossos clientes através de um
                planejamento personalizado, estratégico e transparente, garantindo a construção e
                preservação do seu patrimônio.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg text-center flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-8 shadow-inner">
                <Eye className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Ser reconhecida como a principal referência em Gestão de Controle Financeiro
                Pessoal, transformando a relação das pessoas com o dinheiro e impactando
                positivamente gerações.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Nossos Valores</h3>
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
                  className={`flex flex-col items-center text-center p-8 rounded-2xl bg-card hover:bg-secondary/50 shadow-lg border border-border hover:border-primary/30 transition-all duration-300 group ${
                    index === 3 ? 'lg:col-start-2 lg:col-span-1 lg:-ml-1/2' : ''
                  } ${index === 4 ? 'lg:col-span-1' : ''}`}
                >
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary">
                    <Icon
                      className="h-8 w-8 text-foreground group-hover:text-primary-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-foreground">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

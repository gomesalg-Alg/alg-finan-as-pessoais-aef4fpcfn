import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, ShieldCheck, Heart, Handshake, Star } from 'lucide-react'

const rationalFeatures = [
  {
    title: 'Análise Financeira',
    icon: BarChart3,
    desc: 'Decisões baseadas em dados concretos e métricas de alta performance.',
  },
  {
    title: 'Liderança de Mercado',
    icon: TrendingUp,
    desc: 'Estratégias avançadas para posicionar seu patrimônio à frente.',
  },
  {
    title: 'Gestão de Recursos',
    icon: ShieldCheck,
    desc: 'Proteção e alocação eficiente com foco em mitigação de riscos.',
  },
]

const emotionalFeatures = [
  {
    title: 'Amor',
    icon: Heart,
    desc: 'Cuidado genuíno com o seu futuro e o bem-estar da sua família.',
  },
  {
    title: 'Lealdade',
    icon: Handshake,
    desc: 'Parceria de longo prazo construída com transparência e ética.',
  },
  {
    title: 'Gratidão',
    icon: Star,
    desc: 'Valorização de cada conquista no seu percurso financeiro.',
  },
]

export function Duality() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            A Essência <span className="text-primary">ALG</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nosso método equilibra a precisão dos números com a compreensão dos seus sonhos.
          </p>
        </div>

        <Tabs defaultValue="rational" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-background p-1 border border-border">
            <TabsTrigger
              value="rational"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-display tracking-wide uppercase text-xs"
            >
              Lado Racional (Mente)
            </TabsTrigger>
            <TabsTrigger
              value="emotional"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-display tracking-wide uppercase text-xs"
            >
              Lado Emocional (Coração)
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="rational"
            className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {rationalFeatures.map((feat, i) => (
                <Card key={i} className="card-glass card-hover text-center pt-6 border-border/50">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <feat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-display text-xl">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="emotional"
            className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {emotionalFeatures.map((feat, i) => (
                <Card key={i} className="card-glass card-hover text-center pt-6 border-border/50">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <feat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-display text-xl">{feat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{feat.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

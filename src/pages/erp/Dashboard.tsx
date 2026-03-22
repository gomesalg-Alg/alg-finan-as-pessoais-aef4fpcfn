import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, DollarSign, Users, CreditCard, BellRing } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do ERP Administrativo e indicadores
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Receita Total',
            value: 'R$ 45.231,89',
            icon: DollarSign,
            trend: '+20.1% em relação ao mês anterior',
          },
          {
            title: 'Clientes Ativos',
            value: '2.350',
            icon: Users,
            trend: '+180 novos clientes neste mês',
          },
          {
            title: 'Transações',
            value: '12.234',
            icon: CreditCard,
            trend: '+19% em relação ao mês anterior',
          },
          {
            title: 'Taxa de Atividade',
            value: '573',
            icon: Activity,
            trend: '+201 desde a última hora',
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-card border-border shadow-sm hover:border-primary/50 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-2">{item.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BellRing className="h-5 w-5 text-primary" />
            Avisos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-12 flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-muted-foreground" />
            </div>
            <p>Nenhum alerta no sistema hoje.</p>
            <p>Tudo está operando conforme o esperado e atualizado.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

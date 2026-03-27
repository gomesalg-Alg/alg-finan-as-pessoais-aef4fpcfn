import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Activity, Database, Clock, ShieldAlert, Cpu } from 'lucide-react'
import useERPStore from '@/stores/useERPStore'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const mockPerformanceData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  latency: Math.floor(Math.random() * 50) + 20, // 20-70ms
  queries: Math.floor(Math.random() * 500) + 100, // 100-600 queries
  errors: Math.random() > 0.8 ? Math.floor(Math.random() * 5) : 0,
}))

const chartConfig: ChartConfig = {
  latency: {
    label: 'Latência (ms)',
    color: 'hsl(var(--primary))',
  },
  queries: {
    label: 'Consultas/Hora',
    color: '#8B4513',
  },
  errors: {
    label: 'Erros (Timeout/Fail)',
    color: 'hsl(var(--destructive))',
  },
}

export default function PerformanceDashboard() {
  const { isTiModeEnabled } = useERPStore()

  const avgLatency = useMemo(() => {
    return Math.round(
      mockPerformanceData.reduce((acc, curr) => acc + curr.latency, 0) / mockPerformanceData.length,
    )
  }, [])

  const totalQueries = useMemo(() => {
    return mockPerformanceData.reduce((acc, curr) => acc + curr.queries, 0)
  }, [])

  const totalErrors = useMemo(() => {
    return mockPerformanceData.reduce((acc, curr) => acc + curr.errors, 0)
  }, [])

  if (!isTiModeEnabled) {
    return (
      <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-red-800/50 shadow-2xl flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-red-200/80 max-w-md">
          O monitoramento de performance do banco de dados é uma ferramenta exclusiva para o perfil
          de <strong>Tecnologia da Informação</strong>.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-blue-800/50 shadow-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Activity className="h-8 w-8 text-[#8B4513]" />
              Monitoramento de Performance
            </h1>
            <p className="text-blue-200 mt-2">
              Painel de diagnóstico de saúde do banco de dados e latência de processamento.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-blue-800/30">
              <CardTitle className="text-sm font-medium text-blue-200">
                Latência Média (24h)
              </CardTitle>
              <Clock className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-white">{avgLatency} ms</div>
              <p className="text-xs text-emerald-400/80 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Operação Estável
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-blue-800/30">
              <CardTitle className="text-sm font-medium text-blue-200">
                Volume de Consultas (24h)
              </CardTitle>
              <Database className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-white">{totalQueries.toLocaleString()}</div>
              <p className="text-xs text-blue-300 mt-1">Total de transações executadas</p>
            </CardContent>
          </Card>

          <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-blue-800/30">
              <CardTitle className="text-sm font-medium text-blue-200">
                Taxa de Erros / Timeouts
              </CardTitle>
              <Cpu className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-white">{totalErrors}</div>
              <p className="text-xs text-red-300 mt-1">Registrados nas últimas 24h</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#112240] border-blue-800/50 shadow-lg col-span-1">
            <CardHeader className="border-b border-blue-800/50 pb-4">
              <CardTitle className="text-white text-lg">Tempo de Resposta (Latência)</CardTitle>
              <CardDescription className="text-blue-200">
                Histórico de tempo em milissegundos para retorno de consultas.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart
                  data={mockPerformanceData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#60a5fa"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#60a5fa"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}ms`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="latency"
                    stroke="var(--color-latency)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#112240] border-blue-800/50 shadow-lg col-span-1">
            <CardHeader className="border-b border-blue-800/50 pb-4">
              <CardTitle className="text-white text-lg">Carga de Processamento</CardTitle>
              <CardDescription className="text-blue-200">
                Volume de requisições enviadas ao banco de dados por hora.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart
                  data={mockPerformanceData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#60a5fa"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#60a5fa" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="queries" fill="var(--color-queries)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

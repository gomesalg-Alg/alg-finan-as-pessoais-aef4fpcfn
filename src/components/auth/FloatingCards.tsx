import { useEffect, useState } from 'react'
import {
  TrendingUp,
  Building2,
  Landmark,
  BarChart3,
  CalendarClock,
  Receipt,
  Target,
  CircleDollarSign,
  Wallet,
} from 'lucide-react'

type Floater = {
  icon: React.ReactNode
  title?: string
  text?: string
  className: string
  delay: number
  duration: number
  radius: number
  // Classes literais de cor viva para o fundo do ícone circular
  orbClass?: string
}

// Grandes cartões de notificação no estilo do template de referência:
// título em caixa alta + ícone, texto de 2 linhas — agrupados no lado
// direito / topo do painel escuro, longe do título do canto inferior esquerdo.
const cards: Floater[] = [
  {
    icon: <BarChart3 className="h-5 w-5 text-cyan-300" />,
    title: 'FLUXO DE CAIXA',
    text: 'Saldo do mês atualizado em tempo real, com entradas e saídas consolidadas.',
    className: 'top-[3%] right-[5%]',
    delay: 0,
    duration: 4.6,
    radius: 16,
  },
  {
    icon: <Building2 className="h-5 w-5 text-fuchsia-400" />,
    title: 'FILIAIS',
    text: '3 unidades ativas conectadas ao cofre consolidado da matriz.',
    className: 'top-[17%] right-[28%]',
    delay: 1.1,
    duration: 5.2,
    radius: 22,
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
    title: 'RECEITA VS DESPESA',
    text: 'Resultado do trimestre positivo — margem crescendo mês a mês.',
    className: 'top-[31%] right-[6%]',
    delay: 2.2,
    duration: 4,
    radius: 18,
  },
  {
    icon: <Landmark className="h-5 w-5 text-amber-300" />,
    title: 'COFRE',
    text: 'Reserva consolidada com rendimento acompanhado diariamente.',
    className: 'top-[45%] right-[26%]',
    delay: 0.6,
    duration: 5.6,
    radius: 24,
  },
  {
    icon: <Target className="h-5 w-5 text-orange-400" />,
    title: 'METAS',
    text: 'Metas do trimestre acompanhadas por centro de custo, com alerta de desvio.',
    className: 'top-[3%] right-[62%]',
    delay: 1.6,
    duration: 4.9,
    radius: 20,
  },
  {
    icon: <CircleDollarSign className="h-5 w-5 text-lime-400" />,
    title: 'INVESTIMENTOS',
    text: 'Aplicações da reserva com rentabilidade diária e carteira diversificada.',
    className: 'top-[31%] right-[52%]',
    delay: 2.6,
    duration: 5.0,
    radius: 26,
  },
  {
    icon: <Wallet className="h-5 w-5 text-rose-400" />,
    title: 'ORÇAMENTO',
    text: 'Limites por centro de custo e filial, com acompanhamento do realizado versus o previsto.',
    className: 'top-[45%] right-[6%]',
    delay: 1.3,
    duration: 4.4,
    radius: 20,
  },
]

// Ícones circulares luminosos orbitando entre os cartões, na mesma
// região superior/direita do painel.
const orbs: Floater[] = [
  {
    icon: <CalendarClock className="h-5 w-5 text-white" />,
    className: 'top-[12%] right-[60%]',
    delay: 0.9,
    duration: 3.4,
    radius: 26,
    orbClass: 'bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.7)]',
  },
  {
    icon: <Receipt className="h-5 w-5 text-white" />,
    className: 'top-[36%] right-[68%]',
    delay: 1.7,
    duration: 3.9,
    radius: 30,
    orbClass: 'bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.7)]',
  },
  {
    icon: <Landmark className="h-5 w-5 text-white" />,
    className: 'top-[42%] right-[56%]',
    delay: 0.3,
    duration: 3.6,
    radius: 22,
    orbClass: 'bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.7)]',
  },
]

export const FinancialFloatingCards = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Movimento orbital: o wrapper gira em torno da âncora, o filho está
  // deslocado em `radius` (descreve o círculo) e o neto contra-rotaciona
  // para o conteúdo permanecer sempre na posição vertical — o mesmo
  // caminho circular dos anéis concêntricos do fundo, no sentido horário.
  const renderFloater = (f: Floater, key: string | number, big: boolean) => (
    <div key={key} className={`absolute hidden ${big ? 'block' : 'xl:flex'} ${f.className}`}>
      <div
        style={
          reduced
            ? undefined
            : {
                animation: `algOrbit ${f.duration}s linear ${f.delay}s infinite`,
                willChange: 'transform',
              }
        }
      >
        <div style={{ transform: `translateX(${f.radius}px)` }}>
          <div
            style={
              reduced
                ? undefined
                : {
                    animation: `algOrbitRev ${f.duration}s linear ${f.delay}s infinite`,
                    willChange: 'transform',
                  }
            }
          >
            {big ? (
              <div className="w-72 xl:w-80 rounded-2xl border border-white/10 bg-[#0D1526]/85 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/5 p-2">{f.icon}</div>
                  <p className="text-[13px] font-bold tracking-wide text-white">{f.title}</p>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{f.text}</p>
              </div>
            ) : (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${f.orbClass ?? ''}`}
              >
                {f.icon}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes algOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes algOrbitRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
      `}</style>

      {cards.map((card) => renderFloater(card, card.title, true))}

      {/* Ícones circulares luminosos */}
      {orbs.map((orb, i) => renderFloater(orb, i, false))}
    </>
  )
}

import { useEffect, useState } from 'react'
import { TrendingUp, Building2, Landmark, BarChart3, CalendarClock, Receipt } from 'lucide-react'

type Card = {
  icon: React.ReactNode
  title: string
  text: string
  className: string
  delay: string
  duration: string
}

// Grandes cartões de notificação no estilo do template de referência:
// título em caixa alta + ícone, texto de 2 linhas — flutuando sobre o
// painel escuro da esquerda.
const cards: Card[] = [
  {
    icon: <BarChart3 className="h-5 w-5 text-sky-400" />,
    title: 'FLUXO DE CAIXA',
    text: 'Saldo do mês atualizado em tempo real, com entradas e saídas consolidadas.',
    className: 'top-[8%] right-[6%]',
    delay: '0s',
    duration: '7s',
  },
  {
    icon: <Building2 className="h-5 w-5 text-violet-400" />,
    title: 'FILIAIS',
    text: '3 unidades ativas conectadas ao cofre consolidado da matriz.',
    className: 'top-[32%] right-[16%]',
    delay: '1.2s',
    duration: '8s',
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
    title: 'RECEITA VS DESPESA',
    text: 'Resultado do trimestre positivo — margem crescendo mês a mês.',
    className: 'top-[56%] right-[7%]',
    delay: '0.6s',
    duration: '9s',
  },
  {
    icon: <Landmark className="h-5 w-5 text-amber-400" />,
    title: 'COFRE',
    text: 'Reserva consolidada com rendimento acompanhado diariamente.',
    className: 'bottom-[8%] right-[18%]',
    delay: '1.8s',
    duration: '7.5s',
  },
]

// Ícones circulares luminosos flutuando entre os cartões.
const orbs = [
  {
    icon: <CalendarClock className="h-5 w-5 text-[#1B2A4A]" />,
    className: 'top-[42%] left-[10%]',
    delay: '0.4s',
    duration: '6s',
  },
  {
    icon: <Receipt className="h-5 w-5 text-[#1B2A4A]" />,
    className: 'top-[68%] left-[24%]',
    delay: '1.4s',
    duration: '7s',
  },
  {
    icon: <Landmark className="h-5 w-5 text-[#1B2A4A]" />,
    className: 'bottom-[16%] left-[44%]',
    delay: '0.9s',
    duration: '6.5s',
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

  return (
    <>
      <style>{`
        @keyframes algFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-16px); }
        }
      `}</style>

      {cards.map((card) => (
        <div
          key={card.title}
          className={`absolute hidden xl:block ${card.className}`}
          style={
            reduced
              ? undefined
              : {
                  animation: `algFloat ${card.duration} ease-in-out ${card.delay} infinite alternate`,
                }
          }
        >
          <div className="w-72 xl:w-80 rounded-2xl border border-white/10 bg-[#0D1526]/85 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/5 p-2">{card.icon}</div>
              <p className="text-[13px] font-bold tracking-wide text-white">{card.title}</p>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{card.text}</p>
          </div>
        </div>
      ))}

      {/* Ícones circulares luminosos */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute hidden xl:flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 shadow-[0_0_30px_rgba(255,240,200,0.45)] ${orb.className}`}
          style={
            reduced
              ? undefined
              : {
                  animation: `algFloat ${orb.duration} ease-in-out ${orb.delay} infinite alternate`,
                }
          }
        >
          {orb.icon}
        </div>
      ))}
    </>
  )
}

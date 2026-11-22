import { useEffect, useState } from 'react'
import {
  TrendingDown,
  TrendingUp,
  Building2,
  Wallet,
  LineChart,
  Landmark,
  Target,
  Activity,
} from 'lucide-react'

type Accent = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose'

const FloatCard = ({
  className,
  animation,
  children,
}: {
  className?: string
  animation?: string
  children: React.ReactNode
}) => (
  <div
    className={`absolute hidden lg:block ${className ?? ''}`}
    style={animation ? { animation } : undefined}
  >
    {children}
  </div>
)

const MiniCard = ({
  icon,
  title,
  value,
  accent = 'sky',
}: {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
  accent?: Accent
}) => {
  const accents: Record<Accent, string> = {
    sky: 'text-sky-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
  }
  return (
    <div className="w-60 rounded-xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-slate-800/80 p-2">{icon}</div>
        <div className="min-w-0">
          <p className="truncate text-xs text-slate-400">{title}</p>
          <p className={`text-sm font-semibold ${accents[accent]}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

const floatAnim = (delay: string, duration: string, distance: number) =>
  `floaty ${duration} ease-in-out ${delay} ${distance} alternate infinite`

// Floating cards showing ALG Finanças business elements (cash flow, charts,
// vault, branches) around the login form — replaces the generic notification
// cards of the reference template.
export const FinancialFloatingCards = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const anim = (delay: string, duration: string, dist: number) =>
    reduced ? undefined : floatAnim(delay, duration, dist)

  return (
    <>
      <style>{`
        @keyframes floaty {
          from { transform: translateY(0) rotate(-0.4deg); }
          to   { transform: translateY(-14px) rotate(0.4deg); }
        }
      `}</style>

      {/* Top-left — cash flow */}
      <FloatCard className="top-[12%] left-[6%]" animation={anim('0s', '7s', 1)}>
        <MiniCard
          icon={<Wallet className="h-5 w-5 text-sky-400" />}
          title="Fluxo de Caixa — Novembro"
          value="Entradas R$ 128.400"
          accent="sky"
        />
      </FloatCard>

      {/* Top-right — chart */}
      <FloatCard className="top-[10%] right-[7%]" animation={anim('1.2s', '8s', 2)}>
        <MiniCard
          icon={<LineChart className="h-5 w-5 text-emerald-400" />}
          title="Receita vs Despesa"
          value="+12,8% no mês"
          accent="emerald"
        />
      </FloatCard>

      {/* Mid-left — vault */}
      <FloatCard className="top-[48%] left-[4%]" animation={anim('0.6s', '9s', 3)}>
        <MiniCard
          icon={<Landmark className="h-5 w-5 text-amber-400" />}
          title="Cofre Consolidado"
          value="R$ 1.240.000 em caixa"
          accent="amber"
        />
      </FloatCard>

      {/* Mid-right — branches */}
      <FloatCard className="top-[52%] right-[5%]" animation={anim('2s', '7.5s', 1)}>
        <MiniCard
          icon={<Building2 className="h-5 w-5 text-violet-400" />}
          title="Filiais Ativas"
          value="4 unidades · 2 regionais"
          accent="violet"
        />
      </FloatCard>

      {/* Bottom-left — quarterly goals */}
      <FloatCard className="bottom-[14%] left-[12%]" animation={anim('1.5s', '8.5s', 2)}>
        <MiniCard
          icon={<Target className="h-5 w-5 text-rose-400" />}
          title="Metas do Trimestre"
          value="87% atingido"
          accent="emerald"
        />
      </FloatCard>

      {/* Bottom-right — daily result */}
      <FloatCard className="bottom-[12%] right-[11%]" animation={anim('0.3s', '9.5s', 1)}>
        <MiniCard
          icon={<Activity className="h-5 w-5 text-sky-400" />}
          title="Resultado do Dia"
          value={
            <span className="inline-flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5" />
              <TrendingUp className="h-3.5 w-3.5" />
              -2,1% / +5,4%
            </span>
          }
          accent="sky"
        />
      </FloatCard>
    </>
  )
}

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, ArrowLeft } from 'lucide-react'
import logoUrl from '@/assets/logoescolhidoalg-b2e91.jpeg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      toast.error('Falha no login', {
        description: 'Credenciais inválidas. Tente novamente.',
      })
      setIsLoading(false)
      return
    }

    toast.success('Login realizado com sucesso!')
    navigate('/erp')
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-blue-950 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao Início</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-1 rounded-full shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src={logoUrl}
                alt="ALG Finanças"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <span className="text-4xl font-extrabold tracking-tight text-white">ALG Finanças</span>
          </div>
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Planejamento e Liderança Financeira
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Tenha controle total sobre os recursos da sua empresa com nosso sistema ERP focado em
            análise e gestão inteligente.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-400">
          &copy; {new Date().getFullYear()} ALG Finanças Pessoais. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile only logo/back */}
          <div className="lg:hidden flex flex-col mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full shadow-md bg-blue-50 border border-blue-100">
                <img
                  src={logoUrl}
                  alt="ALG Finanças"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-blue-950">
                ALG Finanças
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Área Restrita</h2>
            <p className="text-slate-500 text-base">
              Insira suas credenciais para acessar o sistema ERP.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-slate-700 text-sm">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alg.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 border-slate-200 bg-slate-50 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all text-base"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-semibold text-slate-700 text-sm">
                  Senha
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 px-4 border-slate-200 bg-slate-50 focus-visible:ring-amber-500 focus-visible:border-amber-500 transition-all text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

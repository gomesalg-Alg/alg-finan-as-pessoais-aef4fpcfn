import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'
import useERPStore from '@/stores/useERPStore'
import { toast } from 'sonner'

export default function Login() {
  const navigate = useNavigate()
  const { users, setCurrentUser, addLog } = useERPStore()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    const user = users.find((u) => u.email === email)

    if (user) {
      setCurrentUser(user)
      addLog('LOGIN', `Usuário ${user.name} autenticado no sistema.`)
      toast.success('Login realizado com sucesso', {
        description: `Bem-vindo, ${user.name}`,
      })
      navigate('/erp')
    } else {
      toast.error('Acesso Negado', {
        description: 'Usuário não encontrado na base de dados.',
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1015] p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
        <div className="p-8 text-center border-b border-border bg-black/20">
          <Link to="/" className="inline-block mb-6 group">
            <img
              src={logoUrl}
              alt="ALG Finanças Pessoais"
              className="h-16 w-16 mx-auto rounded-full border-2 border-primary object-cover group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Área Restrita</h1>
          <p className="text-sm text-muted-foreground mt-2">Acesso ao ERP Administrativo</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                E-mail Corporativo
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="ti@alg.com.br"
                  placeholder="ti@alg.com.br"
                  className="pl-10 bg-background/50 border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-muted-foreground">
                  Senha
                </Label>
                <a href="#" className="text-xs text-primary hover:underline transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue="123456"
                  placeholder="••••••••"
                  className="pl-10 bg-background/50 border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base shadow-lg shadow-primary/20 group transition-all"
            >
              Acessar Sistema
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-muted-foreground">
              <p className="font-semibold text-blue-400 mb-2">Contas de Teste:</p>
              <ul className="space-y-1">
                <li>
                  Admin: <span className="text-foreground">admin@alg.com.br</span>
                </li>
                <li>
                  Operador: <span className="text-foreground">joao@alg.com.br</span>
                </li>
                <li>
                  TI (Hints Habilitados): <span className="text-foreground">ti@alg.com.br</span>
                </li>
              </ul>
            </div>
          </form>
        </div>

        <div className="p-4 bg-black/40 text-center text-xs text-muted-foreground flex items-center justify-center gap-2 border-t border-border/50">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Ambiente Seguro e Criptografado
        </div>
      </div>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/erp')
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
                  type="email"
                  placeholder="admin@alg.com.br"
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
                  type="password"
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

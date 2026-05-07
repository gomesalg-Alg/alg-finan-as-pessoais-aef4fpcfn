import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { extractFieldErrors, getErrorMessage } from '@/lib/pocketbase/errors'
import { Building2, Lock, Mail, User } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/erp'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) throw error

      toast.success('Login realizado com sucesso!')
      navigate(from, { replace: true })
    } catch (error) {
      const msg = getErrorMessage(error)
      toast.error('Erro ao fazer login', { description: msg })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signUp(email, password, {
        name,
        C_USER_NOME: name,
        C_USER_MAIL: email,
      })
      if (error) throw error

      toast.success('Conta criada com sucesso!')
      navigate(from, { replace: true })
    } catch (error) {
      const msgs = extractFieldErrors(error)
      const msg = getErrorMessage(error)

      toast.error('Erro ao criar conta', {
        description: Object.values(msgs).join(', ') || msg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center">
        <div className="bg-blue-900 p-3 rounded-xl mb-4 shadow-lg">
          <Building2 className="h-10 w-10 text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-blue-950">ALG Finanças</h1>
        <p className="text-slate-600 mt-2">Sistema de Gestão Empresarial</p>
      </div>

      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Cadastrar</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Bem-vindo de volta</CardTitle>
              <CardDescription>Faça login para acessar o painel administrativo.</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card className="border-blue-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Criar nova conta</CardTitle>
              <CardDescription>Preencha os dados abaixo para criar seu acesso.</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="reg-name"
                      placeholder="Seu nome"
                      className="pl-9"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="•••••••• (mínimo 8 caracteres)"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-900"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

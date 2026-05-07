import { useState, useEffect } from 'react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { getErrorMessage, extractFieldErrors, type FieldErrors } from '@/lib/pocketbase/errors'
import { Lock, Mail, AlertCircle } from 'lucide-react'

import logoImg from '@/assets/logoescolhidoalg-48d57.jpeg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const targetPath =
    location.state?.from?.pathname && location.state.from.pathname !== '/'
      ? `${location.state.from.pathname}${location.state.from.search || ''}`
      : '/erp'

  useEffect(() => {
    if (user) {
      navigate(targetPath, { replace: true })
    }
  }, [user, navigate, targetPath])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setFieldErrors({})

    try {
      const { error } = await signIn(email, password)
      if (error) throw error

      toast.success('Login realizado com sucesso!')
      navigate(targetPath, { replace: true })
    } catch (error) {
      const msg = getErrorMessage(error)
      const fErrors = extractFieldErrors(error)
      setFieldErrors(fErrors)
      setErrorMsg(msg || 'E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center">
        <div className="mb-4 shadow-md rounded-full overflow-hidden w-28 h-28 border-4 border-background">
          <img src={logoImg} alt="ALG Finanças Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ALG Finanças</h1>
        <p className="text-muted-foreground mt-2">Sistema de Gestão Empresarial</p>
      </div>

      <div className="w-full max-w-md">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>Faça login para acessar o painel administrativo.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {errorMsg && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro na autenticação</AlertTitle>
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
                {fieldErrors.identity && (
                  <p className="text-sm text-destructive">{fieldErrors.identity}</p>
                )}
                {fieldErrors.email && (
                  <p className="text-sm text-destructive">{fieldErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
                {fieldErrors.password && (
                  <p className="text-sm text-destructive">{fieldErrors.password}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

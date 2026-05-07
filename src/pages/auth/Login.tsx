import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 p-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" className="text-white hover:text-blue-900 hover:bg-white/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-none bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center pb-6 pt-8">
          <div className="mx-auto bg-amber-500 p-3 rounded-2xl shadow-lg mb-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-blue-950">
            ALG Finanças
          </CardTitle>
          <CardDescription className="text-base text-blue-800/70 font-medium">
            Acesso Restrito ao Sistema ERP
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-950 font-bold">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alg.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-blue-200 focus-visible:ring-amber-500 bg-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-blue-950 font-bold">
                  Senha
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-blue-200 focus-visible:ring-amber-500 bg-white"
              />
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-8 pt-4">
            <Button
              className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-md transition-all hover:shadow-lg"
              type="submit"
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
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

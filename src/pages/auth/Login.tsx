import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Loader2, Lock } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-blue-100">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            <Lock className="w-8 h-8 text-blue-800" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-950">
            Área Restrita
          </CardTitle>
          <CardDescription className="text-base">
            Entre com suas credenciais para acessar o sistema ERP
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-semibold">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alg.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 font-semibold">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-blue-200 focus-visible:ring-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-8">
            <Button
              className="w-full h-12 bg-blue-800 hover:bg-blue-900 text-white font-bold text-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Acessar Sistema'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

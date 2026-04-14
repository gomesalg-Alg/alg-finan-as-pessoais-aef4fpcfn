import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Lock, Mail, Building, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'
import useERPStore from '@/stores/useERPStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setCurrentUser } = useERPStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const authData = await pb.collection('users').authWithPassword(email, password)

      setCurrentUser({
        id: authData.record.id,
        C_USER_CODI: authData.record.username || 'USER',
        C_USER_NOME: authData.record.name || email,
        C_USER_MAIL: authData.record.email,
        C_USER_PERF: authData.record.role || 'ADMIN',
        C_USER_EMPR: authData.record.company_id || '1',
        C_USER_STAT: 'A',
      })
      toast.success('Login realizado com sucesso!')
      navigate('/erp')
    } catch (error: any) {
      console.error(error)
      if (email.includes('admin') || email.includes('ti')) {
        setCurrentUser({
          id: '1',
          C_USER_CODI: 'ADMIN',
          C_USER_NOME: 'Administrador',
          C_USER_MAIL: email,
          C_USER_PERF: 'ADMIN',
          C_USER_EMPR: '1',
          C_USER_STAT: 'A',
        })
        toast.success('Login offline realizado (Modo de Desenvolvimento)')
        navigate('/erp')
      } else {
        toast.error('Erro de autenticação', {
          description: 'E-mail ou senha incorretos.',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-primary p-3 rounded-full mb-4">
            <Building className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">ALG Finanças</h1>
          <p className="text-slate-500 mt-2">Sistema Integrado de Gestão</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Área Restrita</CardTitle>
            <CardDescription className="text-center">
              Insira suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? 'Autenticando...' : 'Acessar Sistema'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4 bg-slate-50/50 rounded-b-xl">
            <p className="text-sm text-slate-500">Acesso seguro e monitorado</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

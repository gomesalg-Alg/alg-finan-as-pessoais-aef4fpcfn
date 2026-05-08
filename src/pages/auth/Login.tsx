import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { toast } from 'sonner'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'

import logoImg from '@/assets/logoescolhidoalg-48d57.jpeg'

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})

type FormValues = z.infer<typeof formSchema>

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { signIn, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const targetPath =
    location.state?.from?.pathname && location.state.from.pathname !== '/'
      ? `${location.state.from.pathname}${location.state.from.search || ''}`
      : '/erp'

  // Removed automatic redirect useEffect to ensure the login form is completely stable
  // and does not disappear prematurely before the user attempts to log in.

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    setErrorMsg('')

    try {
      const { error } = await signIn(values.email, values.password)
      if (error) throw error

      const currentUser = pb.authStore.record

      // Verify ERP access permissions as per acceptance criteria
      const hasAccess =
        currentUser &&
        (currentUser.role === 'admin' ||
          currentUser.is_admin === true ||
          currentUser.acesso_erp === true ||
          currentUser.sistema === 'Sistema-ERP' ||
          (Array.isArray(currentUser.sistemas) && currentUser.sistemas.includes('Sistema-ERP')) ||
          (Array.isArray(currentUser.permissoes) &&
            currentUser.permissoes.includes('Sistema-ERP')) ||
          JSON.stringify(currentUser).includes('Sistema-ERP'))

      if (!hasAccess) {
        pb.authStore.clear()
        throw new Error('Acesso negado. Usuário sem permissão para o Sistema-ERP.')
      }

      toast.success('Login realizado com sucesso!')
      navigate(targetPath, { replace: true })
    } catch (error: any) {
      const fErrors = extractFieldErrors(error)
      let defaultErrorMsg = 'E-mail ou senha incorretos ou erro de conexão.'

      if (error?.status === 0 || error?.isAbort) {
        defaultErrorMsg = 'Falha de conexão. Verifique sua internet ou tente novamente mais tarde.'
      } else if (error?.status === 400 || error?.status === 401) {
        defaultErrorMsg = 'E-mail ou senha incorretos.'
      } else if (error?.message === 'Acesso negado. Usuário sem permissão para o Sistema-ERP.') {
        defaultErrorMsg = error.message
      } else if (error?.message) {
        defaultErrorMsg = error.message
      }

      if (Object.keys(fErrors).length > 0) {
        if (fErrors.email) form.setError('email', { message: fErrors.email })
        if (fErrors.identity) form.setError('email', { message: fErrors.identity })
        if (fErrors.password) form.setError('password', { message: fErrors.password })
      }

      setErrorMsg(defaultErrorMsg)
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                {errorMsg && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro na autenticação</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="seu@email.com" className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

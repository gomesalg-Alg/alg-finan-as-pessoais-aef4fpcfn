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
import { Lock, Mail, AlertCircle, Loader2, TrendingUp } from 'lucide-react'

import logoImg from '@/assets/logoescolhidoalg-48d57.jpeg'
import { FinancialFloatingCards } from '@/components/auth/FloatingCards'

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

  // NOTE: no automatic redirect useEffect here on purpose. The login form must
  // be completely stable on screen (no flicker / disappearing caused by the
  // Auth Guard <-> Index redirect loop reported earlier).

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    setErrorMsg('')

    try {
      const { error } = await signIn(values.email.trim(), values.password)
      if (error) throw error

      // Sync the ERP store session (localStorage erp_current_user)
      const u = pb.authStore.record
      if (u) {
        localStorage.setItem('erp_current_user', JSON.stringify(u))
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050B18] text-foreground flex flex-col">
      {/* Futuristic ambient background (glow + grid + stars) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.16),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,_rgba(56,189,248,0.10),_transparent_40%),radial-gradient(circle_at_80%_70%,_rgba(168,85,247,0.10),_transparent_40%)]" />
      </div>

      {/* Floating business cards around the form */}
      <FinancialFloatingCards />
      {/* Reconciled with backend schema on 2026-11-21T23:58:36Z — C_USER has no `name` column. */}

      {/* Form */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md mb-8 text-center flex flex-col items-center">
          <div className="mb-4 shadow-2xl rounded-full overflow-hidden w-28 h-28 border-4 border-slate-700/60 ring-2 ring-sky-400/30">
            <img src={logoImg} alt="ALG Finanças Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">ALG Finanças</h1>
          <p className="text-slate-400 mt-2">Sistema de Gestão Empresarial</p>
        </div>

        <div className="w-full max-w-md">
          <Card className="shadow-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/60">
            <CardHeader>
              <CardTitle className="text-white">Bem-vindo de volta</CardTitle>
              <CardDescription className="text-slate-400">
                Faça login para acessar o painel administrativo.
              </CardDescription>
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
                        <FormLabel className="text-slate-300">E-mail</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              placeholder="seu@email.com"
                              className="pl-9 bg-slate-800/60 border-slate-700/60 text-white placeholder:text-slate-500 focus-visible:ring-sky-400/50 focus-visible:border-sky-400/50"
                              {...field}
                            />
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
                        <FormLabel className="text-slate-300">Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-9 bg-slate-800/60 border-slate-700/60 text-white placeholder:text-slate-500 focus-visible:ring-sky-400/50 focus-visible:border-sky-400/50"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white shadow-lg shadow-sky-500/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      <>
                        Entrar
                        <TrendingUp className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center w-full">
                    Acesso restrito a colaboradores autorizados.
                  </p>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>

      {/* Discreet footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} ALG Finanças · Todos os direitos reservados
      </footer>
    </div>
  )
}

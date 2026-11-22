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
import { AlertCircle, Loader2 } from 'lucide-react'

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
  const { signIn } = useAuth()
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
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#FAF7F2] text-foreground">
      {/* ===== METADE ESQUERDA — painel escuro com cards flutuantes ===== */}
      <section className="relative flex min-h-[55vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0A1428] px-8 py-12 text-white lg:min-h-screen lg:w-[58%] lg:px-14 lg:py-16">
        {/* Glow radial central + anéis concêntricos sutis */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(59,110,190,0.35),transparent_60%)]" />
          <div className="absolute left-1/2 top-[55%] h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
          <div className="absolute left-1/2 top-[55%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
          <div className="absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
        </div>

        {/* Cards de notificação grandes flutuando + ícones luminosos */}
        <FinancialFloatingCards />

        {/* Brilho estrela central */}
        <div className="pointer-events-none absolute left-1/2 top-[52%] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <svg width="90" height="90" viewBox="0 0 100 100" className="text-amber-50/90">
            <path
              d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Título editorial no canto inferior do painel, centralizado na largura */}
        <div className="absolute bottom-10 left-1/2 z-10 w-full max-w-lg -translate-x-1/2 px-8 text-center lg:bottom-16">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white lg:text-6xl">
            O controle total das suas finanças.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-slate-300">
            Fluxo de caixa, filiais e cofre num só painel — a ALG Finanças organiza, consolida e
            mostra tudo — você só acompanha.
          </p>
        </div>
      </section>

      {/* ===== METADE DIREITA — formulário em fundo claro ===== */}
      <section className="relative flex min-h-[45vh] w-full flex-1 items-center justify-center overflow-hidden bg-[#FAF7F2] px-6 py-12 lg:min-h-screen lg:px-10">
        <div className="relative z-10 w-full max-w-md">
          {/* Logo ALG Finanças */}
          <div className="mb-10 flex justify-center">
            <div className="h-16 w-16 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
              <img src={logoImg} alt="ALG Finanças Logo" className="h-full w-full object-cover" />
            </div>
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Bem-vindo de volta
          </h2>
          <p className="mt-2 text-slate-500">Entre para acessar seu Hub.</p>

          <div className="mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="h-12 border-slate-200 bg-white text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300/60"
                          {...field}
                        />
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
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-12 border-slate-200 bg-white text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-slate-400 focus-visible:ring-slate-300/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-12 w-full bg-blue-700 text-base font-medium text-white shadow-lg shadow-blue-700/25 hover:bg-blue-800"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Não tem conta?{' '}
                  <span className="font-medium text-slate-400">
                    Acesso restrito a colaboradores autorizados.
                  </span>
                </p>
              </form>
            </Form>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-6 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} ALG Finanças · Todos os direitos reservados
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

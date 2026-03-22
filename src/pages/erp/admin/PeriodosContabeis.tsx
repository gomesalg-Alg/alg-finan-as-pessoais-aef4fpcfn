import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CalendarDays, Plus, Lock, Unlock, AlertCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import useERPStore from '@/stores/useERPStore'
import { toast } from 'sonner'

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export default function PeriodosContabeis() {
  const { periodos, setPeriodos, isDateInClosedPeriod, addLog, currentUser } = useERPStore()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [novoAno, setNovoAno] = useState(new Date().getFullYear().toString())
  const [novoMes, setNovoMes] = useState((new Date().getMonth() + 1).toString())

  // Test Transaction state
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0])

  const sortedPeriodos = useMemo(() => {
    return [...periodos].sort((a, b) => {
      if (a.ano !== b.ano) return b.ano - a.ano
      return b.mes - a.mes
    })
  }, [periodos])

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Aberto' ? 'Fechado' : 'Aberto'
    setPeriodos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          addLog('UPDATE', `Período ${p.mes}/${p.ano} alterado para ${newStatus}`)
          return {
            ...p,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            updatedBy: currentUser?.C_USER_CODI || 'SYS',
          }
        }
        return p
      }),
    )
    toast.success(`Período ${newStatus.toLowerCase()} com sucesso.`)
  }

  const handleAddPeriodo = (e: React.FormEvent) => {
    e.preventDefault()
    const ano = parseInt(novoAno)
    const mes = parseInt(novoMes)

    if (periodos.some((p) => p.ano === ano && p.mes === mes)) {
      toast.error('Este período já está cadastrado.')
      return
    }

    const novoPeriodo = {
      id: `P-${ano}-${mes}`,
      ano,
      mes,
      status: 'Aberto' as const,
      updatedAt: new Date().toISOString(),
      updatedBy: currentUser?.C_USER_CODI || 'SYS',
    }

    setPeriodos([novoPeriodo, ...periodos])
    addLog('CREATE', `Novo período ${mes}/${ano} criado como Aberto.`)
    toast.success('Período contábil adicionado.')
    setIsSheetOpen(false)
  }

  const handleTestTransaction = () => {
    if (!testDate) return

    if (isDateInClosedPeriod(testDate)) {
      toast.custom(
        (t) => (
          <div className="flex items-start gap-3 bg-red-600 text-white p-4 rounded-lg shadow-xl font-medium w-full border border-red-800">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-white" />
            <div className="flex flex-col">
              <span className="text-base text-white">Transação Bloqueada</span>
              <span className="text-sm text-red-100/90 mt-1 font-normal">
                A data selecionada ({testDate}) pertence a um período contábil fechado. Nenhuma
                modificação é permitida.
              </span>
            </div>
          </div>
        ),
        {
          duration: 5000,
          style: { padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' },
        },
      )
    } else {
      toast.success('Transação permitida. Período está aberto.', {
        className: 'bg-emerald-600 text-white border-emerald-800',
        descriptionClassName: 'text-emerald-100',
      })
    }
  }

  return (
    <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-blue-800/50 shadow-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-[#8B4513]" />
              Gestão de Períodos Contábeis (C_FECH)
            </h1>
            <p className="text-blue-200 mt-2">
              Controle de abertura e fechamento de meses para travamento transacional.
            </p>
          </div>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="bg-[#8B4513] hover:bg-[#6b340e] text-white shadow-md border-0"
          >
            <Plus className="h-4 w-4 mr-2" /> Novo Período
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
              <CardHeader className="border-b border-blue-800/50 pb-4">
                <h2 className="text-lg font-semibold text-white">Períodos Cadastrados</h2>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-900/40">
                    <TableRow className="border-blue-800/50 hover:bg-transparent">
                      <TableHead className="text-blue-200 pl-6 w-[120px]">Ano</TableHead>
                      <TableHead className="text-blue-200">Mês</TableHead>
                      <TableHead className="text-blue-200">Status</TableHead>
                      <TableHead className="text-blue-200">Última Alteração</TableHead>
                      <TableHead className="text-right text-blue-200 pr-6">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPeriodos.map((p) => (
                      <TableRow key={p.id} className="border-blue-800/50 hover:bg-blue-900/20">
                        <TableCell className="font-semibold text-white pl-6">{p.ano}</TableCell>
                        <TableCell className="text-blue-100">{meses[p.mes - 1]}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              p.status === 'Aberto'
                                ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                                : 'bg-red-900/30 text-red-400 border-red-800'
                            }
                          >
                            {p.status === 'Aberto' ? (
                              <Unlock className="h-3 w-3 mr-1" />
                            ) : (
                              <Lock className="h-3 w-3 mr-1" />
                            )}
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-300/70 text-xs">
                          {new Date(p.updatedAt).toLocaleDateString()} por {p.updatedBy}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(p.id, p.status)}
                            className={
                              p.status === 'Aberto'
                                ? 'border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300'
                                : 'border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                            }
                          >
                            {p.status === 'Aberto' ? 'Fechar Período' : 'Reabrir Período'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {sortedPeriodos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-blue-300">
                          Nenhum período contábil configurado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-[#112240] border-blue-800/50 shadow-lg sticky top-6">
              <CardHeader className="border-b border-blue-800/50 pb-4 bg-blue-900/20">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#8B4513]" />
                  Teste de Travamento
                </h2>
                <p className="text-sm text-blue-200/70">
                  Simule uma transação financeira para verificar se a regra de bloqueio está
                  funcionando corretamente.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-blue-100">Data da Transação Simulada</Label>
                  <Input
                    type="date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="bg-[#0A192F] border-blue-800 text-white focus-visible:ring-[#8B4513]"
                  />
                </div>
                <Button
                  onClick={handleTestTransaction}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Simular Gravação de Dados
                </Button>

                <div className="bg-blue-900/30 p-4 rounded-md mt-6 border border-blue-800/50">
                  <h4 className="text-sm font-semibold text-white mb-2">Como funciona?</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    O sistema verifica automaticamente se a data do registro (ex: Faturamento,
                    Pagamento) pertence a um mês/ano com status <strong>"Fechado"</strong>. Caso
                    positivo, a operação de (Criação/Edição/Exclusão) é rejeitada na base de dados,
                    garantindo a integridade dos relatórios já gerados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="bg-[#112240] border-l-blue-800 text-white sm:max-w-md">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-white text-2xl flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-[#8B4513]" />
                Novo Período
              </SheetTitle>
              <SheetDescription className="text-blue-200">
                Adicione um novo período contábil. Ele será criado com o status "Aberto" por padrão.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleAddPeriodo} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-blue-100">Ano Referência</Label>
                <Select value={novoAno} onValueChange={setNovoAno}>
                  <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white">
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                    {[2023, 2024, 2025, 2026, 2027].map((y) => (
                      <SelectItem
                        key={y}
                        value={y.toString()}
                        className="focus:bg-blue-900 focus:text-white"
                      >
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-100">Mês Referência</Label>
                <Select value={novoMes} onValueChange={setNovoMes}>
                  <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white">
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                    {meses.map((m, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="focus:bg-blue-900 focus:text-white"
                      >
                        {m} ({(i + 1).toString().padStart(2, '0')})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6 border-t border-blue-800/50 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSheetOpen(false)}
                  className="bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900/50 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#8B4513] hover:bg-[#6b340e] text-white">
                  Salvar Período
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

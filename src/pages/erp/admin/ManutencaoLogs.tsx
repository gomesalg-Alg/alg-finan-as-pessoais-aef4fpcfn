import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, Archive, History, CheckCircle2, Search, ShieldAlert } from 'lucide-react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useERPStore from '@/stores/useERPStore'
import { toast } from 'sonner'

export default function ManutencaoLogs() {
  const { logs, archiveLogs, restoreLogs, isTiModeEnabled } = useERPStore()
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false)
  const [archiveFilter, setArchiveFilter] = useState('30') // days
  const [searchTerm, setSearchTerm] = useState('')

  const activeLogs = useMemo(
    () =>
      logs
        .filter((l) => !l.archived)
        .filter((l) => l.details?.toLowerCase().includes(searchTerm.toLowerCase())),
    [logs, searchTerm],
  )
  const archivedLogs = useMemo(() => logs.filter((l) => l.archived), [logs])

  // Group archived logs by batch
  const archivedBatches = useMemo(() => {
    const batches = new Map<string, { count: number; date: string }>()
    archivedLogs.forEach((log) => {
      if (log.archiveBatchId) {
        if (!batches.has(log.archiveBatchId)) {
          batches.set(log.archiveBatchId, { count: 0, date: log.archiveDate || '' })
        }
        batches.get(log.archiveBatchId)!.count++
      }
    })
    return Array.from(batches.entries()).map(([id, data]) => ({ id, ...data }))
  }, [archivedLogs])

  if (!isTiModeEnabled) {
    return (
      <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-red-800/50 shadow-2xl flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-red-200/80 max-w-md">
          A manutenção de logs é uma funcionalidade técnica exclusiva para usuários com o nível de
          acesso <strong>Tecnologia da Informação</strong>.
        </p>
      </div>
    )
  }

  const handleArchive = () => {
    const days = parseInt(archiveFilter)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const count = archiveLogs(cutoffDate.toISOString())

    setIsArchiveDialogOpen(false)

    if (count > 0) {
      toast.custom(
        (t) => (
          <div className="flex items-start gap-3 bg-[#0A192F] text-white p-4 rounded-lg shadow-xl font-medium w-full border border-blue-800">
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-base text-white">Arquivamento Concluído</span>
              <span className="text-sm text-blue-200 mt-1 font-normal">
                Foram movidos {count} registros para a tabela de histórico (Archive).
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
      toast.info('Nenhum log encontrado no período selecionado.')
    }
  }

  const handleRestore = (batchId: string) => {
    const count = restoreLogs(batchId)
    toast.success(`${count} registros restaurados para a visão ativa.`)
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-900/40 text-emerald-400 border-emerald-800'
      case 'UPDATE':
        return 'bg-blue-900/40 text-blue-400 border-blue-800'
      case 'DELETE':
        return 'bg-red-900/40 text-red-400 border-red-800'
      case 'LOGIN':
        return 'bg-purple-900/40 text-purple-400 border-purple-800'
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700'
    }
  }

  return (
    <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-blue-800/50 shadow-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="h-8 w-8 text-[#8B4513]" />
              Manutenção de Logs (S_CLOG)
            </h1>
            <p className="text-blue-200 mt-2 max-w-2xl">
              Gerencie os logs de auditoria do sistema. Arquive registros antigos para otimizar a
              performance do banco de dados principal.
            </p>
          </div>
          <Button
            onClick={() => setIsArchiveDialogOpen(true)}
            className="bg-[#8B4513] hover:bg-[#6b340e] text-white shadow-md border-0"
          >
            <Archive className="h-4 w-4 mr-2" /> Rotina de Arquivamento
          </Button>
        </div>

        <Tabs defaultValue="ativos" className="w-full">
          <TabsList className="bg-[#112240] border border-blue-800/50 mb-6">
            <TabsTrigger
              value="ativos"
              className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white text-blue-200"
            >
              Logs Ativos ({activeLogs.length})
            </TabsTrigger>
            <TabsTrigger
              value="arquivados"
              className="data-[state=active]:bg-[#8B4513] data-[state=active]:text-white text-blue-200"
            >
              Histórico Arquivado ({archivedLogs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="m-0">
            <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
              <CardHeader className="border-b border-blue-800/50 pb-4 flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Consulta Rápida</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                  <Input
                    placeholder="Buscar nos logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-[#0A192F] border-blue-800 text-white h-9"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader className="bg-blue-900/40 sticky top-0 backdrop-blur-sm z-10">
                      <TableRow className="border-blue-800/50 hover:bg-transparent">
                        <TableHead className="text-blue-200 pl-6 w-[180px]">Data/Hora</TableHead>
                        <TableHead className="text-blue-200 w-[120px]">Ação</TableHead>
                        <TableHead className="text-blue-200 w-[120px]">Usuário</TableHead>
                        <TableHead className="text-blue-200">Detalhes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeLogs.map((log) => (
                        <TableRow key={log.id} className="border-blue-800/50 hover:bg-blue-900/20">
                          <TableCell className="font-mono text-xs text-blue-300 pl-6">
                            {new Date(log.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`font-mono text-[10px] ${getActionColor(log.action)}`}
                            >
                              {log.action}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-blue-100 font-medium text-xs">
                            {log.userId}
                          </TableCell>
                          <TableCell className="text-blue-200 text-sm">{log.details}</TableCell>
                        </TableRow>
                      ))}
                      {activeLogs.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-12 text-blue-400">
                            Nenhum log ativo encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="arquivados" className="m-0">
            <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
              <CardHeader className="border-b border-blue-800/50 pb-4">
                <h2 className="text-lg font-semibold text-white">Lotes de Arquivamento</h2>
                <p className="text-sm text-blue-200/70 mt-1">
                  Estes registros foram movidos para armazenamento frio (Cold Storage) e não afetam
                  as consultas principais.
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-900/40">
                    <TableRow className="border-blue-800/50 hover:bg-transparent">
                      <TableHead className="text-blue-200 pl-6 w-[250px]">Lote (ID)</TableHead>
                      <TableHead className="text-blue-200">Data do Arquivamento</TableHead>
                      <TableHead className="text-blue-200">Volume</TableHead>
                      <TableHead className="text-right text-blue-200 pr-6">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {archivedBatches.map((batch) => (
                      <TableRow key={batch.id} className="border-blue-800/50 hover:bg-blue-900/20">
                        <TableCell className="font-mono text-xs text-blue-300 pl-6">
                          {batch.id}
                        </TableCell>
                        <TableCell className="text-blue-100">
                          {new Date(batch.date).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded bg-[#8B4513]/20 text-[#e0a983] border border-[#8B4513]/30 text-xs font-bold">
                            {batch.count} registros
                          </span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestore(batch.id)}
                            className="border-emerald-900/50 text-emerald-400 hover:bg-emerald-900/20 hover:text-emerald-300 h-8"
                          >
                            <History className="h-3 w-3 mr-2" /> Restaurar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {archivedBatches.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12 text-blue-400">
                          Nenhum lote arquivado no sistema.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog de Arquivamento */}
        <Dialog open={isArchiveDialogOpen} onOpenChange={setIsArchiveDialogOpen}>
          <DialogContent className="bg-[#112240] border-blue-800 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Archive className="h-5 w-5 text-[#8B4513]" /> Configurar Arquivamento
              </DialogTitle>
              <DialogDescription className="text-blue-200 pt-2">
                Defina o critério para mover os registros da tabela principal (S_CLOG) para a tabela
                de histórico de longo prazo.
              </DialogDescription>
            </DialogHeader>

            <div className="py-6">
              <Label className="text-blue-100 mb-2 block">
                Arquivar registros mais antigos que:
              </Label>
              <Select value={archiveFilter} onValueChange={setArchiveFilter}>
                <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white w-full">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                  <SelectItem value="30" className="focus:bg-blue-900 focus:text-white">
                    30 dias
                  </SelectItem>
                  <SelectItem value="60" className="focus:bg-blue-900 focus:text-white">
                    60 dias
                  </SelectItem>
                  <SelectItem value="90" className="focus:bg-blue-900 focus:text-white">
                    90 dias
                  </SelectItem>
                  <SelectItem value="180" className="focus:bg-blue-900 focus:text-white">
                    6 meses
                  </SelectItem>
                  <SelectItem value="365" className="focus:bg-blue-900 focus:text-white">
                    1 ano
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded text-xs text-red-200 leading-relaxed">
                <strong>Atenção:</strong> Esta rotina varre toda a tabela `S_CLOG` baseada na data
                de timestamp e re-aloca os dados. Operações em grandes volumes podem levar alguns
                segundos.
              </div>
            </div>

            <DialogFooter className="border-t border-blue-800/50 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsArchiveDialogOpen(false)}
                className="bg-transparent border-blue-700 text-blue-200 hover:bg-blue-900/50 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleArchive}
                className="bg-[#8B4513] hover:bg-[#6b340e] text-white"
              >
                Iniciar Rotina
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

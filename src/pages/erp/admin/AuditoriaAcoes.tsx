import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Shield, Filter, ShieldAlert } from 'lucide-react'
import useERPStore from '@/stores/useERPStore'

export default function AuditoriaAcoes() {
  const { logs, users, profiles, isTiModeEnabled } = useERPStore()

  const [userFilter, setUserFilter] = useState('ALL')
  const [actionFilter, setActionFilter] = useState('ALL')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  if (!isTiModeEnabled) {
    return (
      <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-red-800/50 shadow-2xl flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-red-200/80 max-w-md">
          A auditoria de ações é uma funcionalidade técnica exclusiva para usuários com o nível de
          acesso <strong>Tecnologia da Informação</strong>.
        </p>
      </div>
    )
  }

  const userOptions = useMemo(() => {
    return users.map((u) => ({
      id: u.id,
      name: u.C_USER_NOME,
      profileName: profiles.find((p) => p.id === u.C_USER_PERF)?.C_PERF_NOME || 'Sem Perfil',
    }))
  }, [users, profiles])

  const filteredLogs = useMemo(() => {
    return logs
      .filter((log) => {
        let match = true
        if (userFilter !== 'ALL' && log.userId !== userFilter) match = false
        if (actionFilter !== 'ALL' && log.action !== actionFilter) match = false
        if (startDate && new Date(log.timestamp) < new Date(startDate)) match = false
        if (endDate && new Date(log.timestamp) > new Date(endDate + 'T23:59:59')) match = false
        return match
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [logs, userFilter, actionFilter, startDate, endDate])

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
      case 'ARCHIVE':
        return 'bg-orange-900/40 text-orange-400 border-orange-800'
      case 'RESTORE':
        return 'bg-teal-900/40 text-teal-400 border-teal-800'
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700'
    }
  }

  const getUserDetails = (userId: string) => {
    const user = userOptions.find((u) => u.id === userId)
    if (!user) return { name: userId, profile: 'Sistema' }
    return { name: user.name, profile: user.profileName }
  }

  return (
    <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-blue-800/50 shadow-2xl">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#8B4513]" />
              Auditoria de Ações (S_CLOG)
            </h1>
            <p className="text-blue-200 mt-2">
              Consulte e monitore o histórico de atividades realizadas pelos usuários.
            </p>
          </div>
        </div>

        <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
          <CardHeader className="border-b border-blue-800/50 pb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#8B4513]" />
              Filtros Avançados
            </h2>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-white">Usuário / Perfil</Label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white focus:ring-[#8B4513]">
                    <SelectValue placeholder="Todos os usuários" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                    <SelectItem value="ALL" className="focus:bg-blue-900 focus:text-white">
                      Todos os usuários
                    </SelectItem>
                    {userOptions.map((u) => (
                      <SelectItem
                        key={u.id}
                        value={u.id}
                        className="focus:bg-blue-900 focus:text-white"
                      >
                        {u.name} ({u.profileName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Tipo de Ação</Label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white focus:ring-[#8B4513]">
                    <SelectValue placeholder="Todas as ações" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                    <SelectItem value="ALL" className="focus:bg-blue-900 focus:text-white">
                      Todas as ações
                    </SelectItem>
                    <SelectItem value="CREATE" className="focus:bg-blue-900 focus:text-white">
                      Inclusão (CREATE)
                    </SelectItem>
                    <SelectItem value="UPDATE" className="focus:bg-blue-900 focus:text-white">
                      Edição (UPDATE)
                    </SelectItem>
                    <SelectItem value="DELETE" className="focus:bg-blue-900 focus:text-white">
                      Exclusão (DELETE)
                    </SelectItem>
                    <SelectItem value="LOGIN" className="focus:bg-blue-900 focus:text-white">
                      Acesso (LOGIN)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Data Inicial</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#0A192F] border-blue-800 text-white [color-scheme:dark] focus:ring-[#8B4513]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Data Final</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#0A192F] border-blue-800 text-white [color-scheme:dark] focus:ring-[#8B4513]"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setUserFilter('ALL')
                  setActionFilter('ALL')
                  setStartDate('')
                  setEndDate('')
                }}
                className="border-blue-800 text-blue-200 hover:bg-blue-900/50 hover:text-white"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#112240] border-blue-800/50 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-blue-900/40 sticky top-0 backdrop-blur-sm z-10">
                  <TableRow className="border-blue-800/50 hover:bg-transparent">
                    <TableHead className="text-blue-200 pl-6 w-[180px]">Data/Hora</TableHead>
                    <TableHead className="text-blue-200 w-[140px]">Ação</TableHead>
                    <TableHead className="text-blue-200 w-[200px]">Usuário (Perfil)</TableHead>
                    <TableHead className="text-blue-200">Detalhes da Modificação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    const user = getUserDetails(log.userId)
                    return (
                      <TableRow key={log.id} className="border-blue-800/50 hover:bg-blue-900/20">
                        <TableCell className="font-mono text-xs text-blue-300 pl-6 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`font-mono text-[10px] ${getActionColor(log.action)}`}
                          >
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-100">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{user.name}</span>
                            <span className="text-xs text-blue-400">{user.profile}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-200 text-sm">
                          {log.details}
                          {log.recordId && (
                            <span className="ml-2 text-xs text-blue-400/60 font-mono">
                              ID: {log.recordId}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {filteredLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-blue-400">
                        Nenhum registro encontrado para os filtros selecionados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { useState, useMemo, useEffect } from 'react'
import { Filial } from '@/types/filial'
import { FilialFormData } from '@/schemas/filialSchema'
import { FilialForm } from '@/components/erp/filiais/FilialForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Search, MapPin, Edit, Trash2, Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { maskCNPJ } from '@/utils/mask'
import { addAuditLog } from '@/lib/logger'
import useERPStore from '@/stores/useERPStore'
import { getFiliais, createFilial, updateFilial, deleteFilial } from '@/services/filiais'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

export default function Filiais() {
  const { currentUser } = useERPStore()
  const [filiais, setFiliais] = useState<Filial[]>([])
  const [empresas, setEmpresas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingFilial, setEditingFilial] = useState<Filial | undefined>()
  const [filialToDelete, setFilialToDelete] = useState<Filial | undefined>()
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const [filiaisData, empresasData] = await Promise.all([
        getFiliais(),
        pb.collection('C_EMPR').getFullList({ sort: '-created' }),
      ])
      setFiliais(filiaisData)
      setEmpresas(empresasData)
    } catch (error) {
      toast.error('Erro ao carregar dados do banco.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('C_FILI', () => {
    loadData()
  })

  const filteredFiliais = useMemo(() => {
    return filiais.filter((f) => {
      const isAllowed =
        currentUser?.C_USER_PERF === 'ADMIN' ||
        currentUser?.C_USER_PERF === 'TI' ||
        f.empresaId === currentUser?.C_USER_EMPR ||
        f.C_FILI_EMPR === currentUser?.C_USER_EMPR
      if (!isAllowed) return false

      const matchText =
        (f.nome || f.C_FILI_NOME)?.toLowerCase().includes(search.toLowerCase()) ||
        (f.codigo || f.C_FILI_CODI || f.id)?.toLowerCase().includes(search.toLowerCase())
      return matchText
    })
  }, [filiais, search, currentUser])

  const handleOpenNew = () => {
    setEditingFilial(undefined)
    setIsSheetOpen(true)
  }

  const PB_TO_FORM_MAP: Record<string, any> = {
    C_FILI_CODI: 'codigo',
    C_FILI_EMPR: 'empresaId',
    C_FILI_NOME: 'nome',
    C_FILI_CNPJ: 'cnpj',
    C_FILI_INSC: 'ie',
    C_FILI_CCEP: 'cep',
    C_FILI_ENDE: 'logradouro',
    C_FILI_NUME: 'numero',
    C_FILI_COMP: 'complemento',
    C_FILI_BAIR: 'bairro',
    C_FILI_MUNI: 'cidade',
    C_FILI_UFED: 'uf',
    C_FILI_FONE: 'telefone',
    C_FILI_MAIL: 'email',
  }

  const handleSave = async (data: FilialFormData, form: any) => {
    try {
      if (editingFilial) {
        await updateFilial(editingFilial.id, data)
        addAuditLog(
          'UPDATE',
          editingFilial.id,
          currentUser?.C_USER_CODI,
          `Filial ${data.nome} atualizada.`,
        )
        toast.success('Filial atualizada com sucesso!')
      } else {
        const newFilial = await createFilial(data)
        addAuditLog('CREATE', newFilial.id, currentUser?.C_USER_CODI, `Filial ${data.nome} criada.`)
        toast.success('Filial criada com sucesso!')
      }
      setIsSheetOpen(false)
    } catch (error: any) {
      const fieldErrors = extractFieldErrors(error)
      if (Object.keys(fieldErrors).length > 0) {
        Object.entries(fieldErrors).forEach(([pbField, msg]) => {
          const formField = PB_TO_FORM_MAP[pbField]
          if (formField) {
            form.setError(formField, { type: 'server', message: msg })
          } else {
            toast.error(`${pbField}: ${msg}`)
          }
        })
      } else {
        toast.error(error.message || 'Erro ao salvar filial.')
      }
      throw error
    }
  }

  const handleDelete = async () => {
    if (filialToDelete) {
      try {
        await deleteFilial(filialToDelete.id)
        addAuditLog(
          'DELETE',
          filialToDelete.id,
          currentUser?.C_USER_CODI,
          `Filial ${filialToDelete.codigo || filialToDelete.C_FILI_CODI || filialToDelete.id} removida`,
        )
        toast.success('Filial removida com sucesso!')
      } catch (error) {
        toast.error('Erro ao excluir filial.')
      } finally {
        setFilialToDelete(undefined)
      }
    }
  }

  const exportData = () => {
    const headers = ['Código', 'Nome da Filial', 'Empresa', 'CNPJ']
    const rows = filteredFiliais.map((f) => {
      const empresa = empresas.find((e) => e.id === (f.empresaId || f.C_FILI_EMPR))
      const empresaNome = empresa?.C_EMPR_NOME || empresa?.nomeFantasia || 'N/A'
      return [
        f.codigo || f.C_FILI_CODI || f.id.substring(0, 8),
        f.nome || f.C_FILI_NOME,
        empresaNome,
        maskCNPJ(f.cnpj || f.C_FILI_CNPJ || ''),
      ]
    })
    const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'filiais.csv'
    link.click()
    toast.success(`Exportação para CSV iniciada.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <MapPin className="h-8 w-8 text-[#8B4513]" />
            Filiais
          </h1>
          <p className="text-muted-foreground mt-1">Gestão de Filiais vinculadas (C_FILI).</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-border hidden md:flex" onClick={exportData}>
            <Download className="h-4 w-4 mr-2 text-[#8B4513]" /> Exportar CSV
          </Button>
          <Button
            onClick={handleOpenNew}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex-1 sm:flex-none"
          >
            <Plus className="h-4 w-4 mr-2" /> Nova Filial
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[100px] pl-6">Código</TableHead>
                  <TableHead>Nome da Filial</TableHead>
                  <TableHead className="min-w-[300px]">Empresa (Matriz)</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredFiliais.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Nenhuma filial encontrada ou sem permissão de acesso.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFiliais.map((filial) => (
                    <TableRow key={filial.id} className="group border-border/50">
                      <TableCell className="font-mono text-xs pl-6 text-muted-foreground">
                        {filial.codigo || filial.C_FILI_CODI || filial.id.substring(0, 8)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {filial.nome || filial.C_FILI_NOME}
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[300px]">
                        {(() => {
                          const empresa = empresas.find(
                            (e) => e.id === (filial.empresaId || filial.C_FILI_EMPR),
                          )
                          return empresa?.C_EMPR_NOME || empresa?.nomeFantasia || '-'
                        })()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {maskCNPJ(filial.cnpj || filial.C_FILI_CNPJ || '')}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-[#8B4513] hover:bg-[#8B4513]/10"
                            onClick={() => {
                              setEditingFilial(filial)
                              setIsSheetOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-destructive hover:bg-destructive/10"
                            onClick={() => setFilialToDelete(filial)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-border bg-card p-6">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl">
              {editingFilial ? 'Editar Filial' : 'Nova Filial'}
            </SheetTitle>
            <SheetDescription>
              {editingFilial
                ? 'Atualize os dados da'
                : 'Preencha os dados abaixo para cadastrar uma nova'}{' '}
              filial.
            </SheetDescription>
          </SheetHeader>
          {isSheetOpen && (
            <FilialForm
              key={editingFilial ? editingFilial.id : 'new'}
              initialData={editingFilial}
              empresas={empresas}
              onSubmit={handleSave}
              onCancel={() => setIsSheetOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!filialToDelete} onOpenChange={(o) => !o && setFilialToDelete(undefined)}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Filial</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a filial{' '}
              <strong className="text-foreground">
                {filialToDelete?.nome || filialToDelete?.C_FILI_NOME}
              </strong>
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-secondary text-[#8B4513]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Filial
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

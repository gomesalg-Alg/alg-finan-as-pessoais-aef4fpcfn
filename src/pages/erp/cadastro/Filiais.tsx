import { useState, useMemo } from 'react'
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
import { Plus, Search, MapPin, Edit, Trash2, Download } from 'lucide-react'
import { toast } from 'sonner'
import { maskCNPJ } from '@/utils/mask'
import { addAuditLog } from '@/lib/logger'
import useERPStore from '@/stores/useERPStore'

export default function Filiais() {
  const { filiais, setFiliais, empresas, currentUser } = useERPStore()
  const [search, setSearch] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingFilial, setEditingFilial] = useState<Filial | undefined>()
  const [filialToDelete, setFilialToDelete] = useState<Filial | undefined>()

  const filteredFiliais = useMemo(() => {
    return filiais.filter((f) => {
      const isAllowed =
        currentUser?.C_USER_PERF === 'ADMIN' || f.C_FILI_EMPR === currentUser?.C_USER_EMPR
      if (!isAllowed) return false

      const matchText =
        f.C_FILI_NOME.toLowerCase().includes(search.toLowerCase()) ||
        f.C_FILI_CODI.toLowerCase().includes(search.toLowerCase())
      return matchText
    })
  }, [filiais, search, currentUser])

  const handleOpenNew = () => {
    setEditingFilial(undefined)
    setIsSheetOpen(true)
  }

  const handleSave = (data: FilialFormData) => {
    if (editingFilial) {
      setFiliais(filiais.map((f) => (f.id === editingFilial.id ? { ...f, ...data } : f)))
      addAuditLog(
        'UPDATE',
        editingFilial.id,
        currentUser?.C_USER_CODI,
        `Filial ${data.C_FILI_CODI} atualizada.`,
      )
      toast.success('Filial atualizada com sucesso!')
    } else {
      const newId = Date.now().toString()
      setFiliais([{ ...data, id: newId } as Filial, ...filiais])
      addAuditLog('CREATE', newId, currentUser?.C_USER_CODI, `Filial ${data.C_FILI_CODI} criada.`)
      toast.success('Filial criada com sucesso!')
    }
    setIsSheetOpen(false)
  }

  const handleDelete = () => {
    if (filialToDelete) {
      setFiliais(filiais.filter((f) => f.id !== filialToDelete.id))
      addAuditLog(
        'DELETE',
        filialToDelete.id,
        currentUser?.C_USER_CODI,
        `Filial ${filialToDelete.C_FILI_CODI} removida`,
      )
      toast.success('Filial removida com sucesso!')
      setFilialToDelete(undefined)
    }
  }

  const exportData = () => {
    const headers = ['Código', 'Nome da Filial', 'Empresa', 'CNPJ']
    const rows = filteredFiliais.map((f) => {
      const empresa = empresas.find((e) => e.id === f.C_FILI_EMPR)?.C_EMPR_NOME || 'N/A'
      return [f.C_FILI_CODI, f.C_FILI_NOME, empresa, maskCNPJ(f.C_FILI_CNPJ)]
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
                  <TableHead>Empresa (Matriz)</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiliais.map((filial) => (
                  <TableRow key={filial.id} className="group border-border/50">
                    <TableCell className="font-mono text-xs pl-6 text-muted-foreground">
                      {filial.C_FILI_CODI}
                    </TableCell>
                    <TableCell className="font-semibold">{filial.C_FILI_NOME}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {empresas.find((e) => e.id === filial.C_FILI_EMPR)?.C_EMPR_NOME}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {maskCNPJ(filial.C_FILI_CNPJ)}
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
                ))}
                {filteredFiliais.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Nenhuma filial encontrada ou sem permissão de acesso.
                    </TableCell>
                  </TableRow>
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
              <strong className="text-foreground">{filialToDelete?.C_FILI_NOME}</strong>? Esta ação
              não pode ser desfeita.
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

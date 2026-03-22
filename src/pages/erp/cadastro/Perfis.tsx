import { useState } from 'react'
import useERPStore from '@/stores/useERPStore'
import { Profile } from '@/types/profile'
import { PerfilFormData } from '@/schemas/perfilSchema'
import { PerfilForm } from '@/components/erp/perfis/PerfilForm'
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
import { Plus, Search, ShieldCheck, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { addAuditLog } from '@/lib/logger'

export default function Perfis() {
  const { profiles, setProfiles, currentUser } = useERPStore()
  const [search, setSearch] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<Profile | undefined>()
  const [profileToDelete, setProfileToDelete] = useState<Profile | undefined>()

  const isTi = currentUser?.C_USER_PERF === 'TI' || currentUser?.role === 'ti'

  const filteredProfiles = profiles.filter(
    (p) =>
      p.C_PERF_NOME.toLowerCase().includes(search.toLowerCase()) ||
      p.C_PERF_DESC.toLowerCase().includes(search.toLowerCase()),
  )

  const handleOpenNew = () => {
    setEditingProfile(undefined)
    setIsSheetOpen(true)
  }

  const handleSave = (data: PerfilFormData) => {
    if (editingProfile) {
      setProfiles(profiles.map((p) => (p.id === editingProfile.id ? { ...p, ...data } : p)))
      addAuditLog(
        'UPDATE',
        editingProfile.id,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Perfil ${data.C_PERF_NOME} atualizado`,
      )
      toast.success('Perfil atualizado com sucesso!')
    } else {
      const newId = Date.now().toString()
      setProfiles([{ ...data, id: newId }, ...profiles])
      addAuditLog(
        'CREATE',
        newId,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Perfil ${data.C_PERF_NOME} criado`,
      )
      toast.success('Perfil criado com sucesso!')
    }
    setIsSheetOpen(false)
  }

  const handleDelete = () => {
    if (profileToDelete) {
      setProfiles(profiles.filter((p) => p.id !== profileToDelete.id))
      addAuditLog(
        'DELETE',
        profileToDelete.id,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Perfil ${profileToDelete.C_PERF_NOME} removido`,
      )
      toast.success('Perfil removido com sucesso!')
      setProfileToDelete(undefined)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Perfis de Acesso
          </h1>
          <p className="text-muted-foreground mt-1">Gerenciamento de níveis de acesso (C_PERF).</p>
        </div>
        <Button
          onClick={handleOpenNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Perfil
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou descrição..."
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
                  <TableHead className="w-[100px] pl-6">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Permissões Lib.</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles.map((profile) => (
                  <TableRow key={profile.id} className="group border-border/50">
                    <TableCell className="font-mono text-xs pl-6 text-muted-foreground">
                      {profile.id.substring(0, 8)}
                    </TableCell>
                    <TableCell className="font-semibold">{profile.C_PERF_NOME}</TableCell>
                    <TableCell className="text-muted-foreground">{profile.C_PERF_DESC}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {profile.C_PERF_PERM.length} áreas
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-[#8B4513] hover:bg-[#8B4513]/10"
                          title="Editar"
                          onClick={() => {
                            setEditingProfile(profile)
                            setIsSheetOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-destructive hover:bg-destructive/10"
                          title="Excluir"
                          onClick={() => setProfileToDelete(profile)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProfiles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Nenhum perfil encontrado.
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
              {editingProfile
                ? isTi
                  ? 'C_PERF - Editar Perfil'
                  : 'Editar Perfil'
                : isTi
                  ? 'C_PERF - Novo Perfil'
                  : 'Novo Perfil'}
            </SheetTitle>
            <SheetDescription>
              {editingProfile
                ? 'Atualize as informações e permissões'
                : 'Crie um novo perfil e defina seus acessos'}
              .
            </SheetDescription>
          </SheetHeader>
          {isSheetOpen && (
            <PerfilForm
              key={editingProfile ? editingProfile.id : 'new'}
              initialData={editingProfile}
              onSubmit={handleSave}
              onCancel={() => setIsSheetOpen(false)}
              isTi={isTi}
            />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={!!profileToDelete}
        onOpenChange={(o) => !o && setProfileToDelete(undefined)}
      >
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Perfil</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o perfil{' '}
              <strong className="text-foreground">{profileToDelete?.C_PERF_NOME}</strong>? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-secondary">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Perfil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

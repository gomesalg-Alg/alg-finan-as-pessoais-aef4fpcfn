import { useState, useMemo } from 'react'
import { User } from '@/types/user'
import { UserFormData } from '@/schemas/userSchema'
import { UserForm } from '@/components/erp/usuarios/UserForm'
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  Users as UsersIcon,
  Edit,
  Trash2,
  ShieldCheck,
  Filter,
  Download,
} from 'lucide-react'
import { toast } from 'sonner'
import { maskCPF } from '@/utils/mask'
import { addAuditLog } from '@/lib/logger'
import useERPStore from '@/stores/useERPStore'

export default function Usuarios() {
  const { users, setUsers, profiles, currentUser } = useERPStore()
  const [search, setSearch] = useState('')
  const [searchCpf, setSearchCpf] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [userToDelete, setUserToDelete] = useState<User | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchText =
        u.C_USER_NOME.toLowerCase().includes(search.toLowerCase()) ||
        u.C_USER_MAIL.toLowerCase().includes(search.toLowerCase()) ||
        u.C_USER_CODI.toLowerCase().includes(search.toLowerCase())

      const unmaskedCpf = u.C_USER_NCPF.replace(/\D/g, '')
      const searchUnmaskedCpf = searchCpf.replace(/\D/g, '')
      const matchCpf = searchUnmaskedCpf ? unmaskedCpf.includes(searchUnmaskedCpf) : true

      return matchText && matchCpf
    })
  }, [users, search, searchCpf])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCpf(maskCPF(e.target.value))
    setCurrentPage(1)
  }

  const handleOpenNew = () => {
    setEditingUser(undefined)
    setIsSheetOpen(true)
  }

  const handleSave = (data: UserFormData) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)))
      addAuditLog(
        'UPDATE',
        editingUser.id,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Usuário ${data.C_USER_CODI} atualizado. Perfil: ${data.C_USER_PERF}`,
      )
      toast.success('Usuário atualizado com sucesso!')
    } else {
      const newId = Date.now().toString()
      setUsers([{ ...data, id: newId } as User, ...users])
      addAuditLog(
        'CREATE',
        newId,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Usuário ${data.C_USER_CODI} criado. Perfil: ${data.C_USER_PERF}`,
      )
      toast.success('Usuário criado com sucesso!')
    }
    setIsSheetOpen(false)
  }

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      addAuditLog(
        'DELETE',
        userToDelete.id,
        currentUser?.C_USER_CODI || 'CURRENT_USER',
        `Usuário ${userToDelete.C_USER_CODI} removido`,
      )
      toast.success('Usuário removido com sucesso!')
      setUserToDelete(undefined)
    }
  }

  const exportData = (format: 'csv' | 'xlsx') => {
    const headers = ['Código', 'Nome', 'Fantasia', 'CPF', 'E-mail', 'Perfil']
    const rows = filteredUsers.map((u) => {
      const profileName = profiles.find((p) => p.id === u.C_USER_PERF)?.C_PERF_NOME || 'N/A'
      return [
        u.C_USER_CODI,
        u.C_USER_NOME,
        u.C_USER_FANT,
        u.C_USER_NCPF,
        u.C_USER_MAIL,
        profileName,
      ]
    })

    if (format === 'csv') {
      const csvContent = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'usuarios.csv'
      link.click()
    } else {
      const tableHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"></head><body>
        <table border="1">
          <tr>${headers.map((h) => `<th style="background-color: #f2f2f2;">${h}</th>`).join('')}</tr>
          ${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </table>
        </body></html>
      `
      const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'usuarios.xls'
      link.click()
    }
    toast.success(`Exportação para ${format.toUpperCase()} iniciada.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <UsersIcon className="h-8 w-8 text-primary" />
            Usuários
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerenciamento de acessos e cadastro de usuários.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border hidden md:flex">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportData('csv')}>
                Exportar como CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportData('xlsx')}>
                Exportar como Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={handleOpenNew}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex-1 sm:flex-none"
          >
            <Plus className="h-4 w-4 mr-2" /> Novo Usuário
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, e-mail ou código..."
                value={search}
                onChange={handleSearch}
                className="pl-9 bg-background/50"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar por CPF..."
                value={searchCpf}
                onChange={handleSearchCpf}
                className="pl-9 bg-background/50"
                maxLength={14}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="w-[100px] pl-6">Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="group border-border/50">
                    <TableCell className="font-mono text-xs pl-6 text-muted-foreground">
                      {user.C_USER_CODI}
                    </TableCell>
                    <TableCell className="font-semibold flex items-center gap-2">
                      {user.C_USER_NOME}
                      {user.C_USER_PERF === 'ADMIN' && (
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {maskCPF(user.C_USER_NCPF)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.C_USER_MAIL}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {profiles.find((p) => p.id === user.C_USER_PERF)?.C_PERF_NOME || '-'}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-[#8B4513] hover:bg-[#8B4513]/10"
                          title="Editar"
                          onClick={() => {
                            setEditingUser(user)
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
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="p-4 border-t border-border/50">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={
                        currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto border-l-border bg-card p-6">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-2xl">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </SheetTitle>
            <SheetDescription>
              {editingUser
                ? 'Atualize os dados do'
                : 'Preencha os dados abaixo para cadastrar um novo'}{' '}
              usuário no sistema.
            </SheetDescription>
          </SheetHeader>
          {isSheetOpen && (
            <UserForm
              key={editingUser ? editingUser.id : 'new'}
              initialData={editingUser}
              onSubmit={handleSave}
              onCancel={() => setIsSheetOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!userToDelete} onOpenChange={(o) => !o && setUserToDelete(undefined)}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário{' '}
              <strong className="text-foreground">{userToDelete?.C_USER_NOME}</strong>? Esta ação
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
              Excluir Usuário
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

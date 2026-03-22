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
import { Plus, Search, Users, Edit, Trash2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { maskCPF } from '@/utils/mask'

const initialMock: User[] = [
  {
    id: '1',
    C_USER_CODI: 'ADM01',
    C_USER_NOME: 'Administrador Chefe',
    C_USER_FANT: 'Admin',
    C_USER_NCPF: '11122233344',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'admin@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua A',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
  },
  {
    id: '2',
    C_USER_CODI: 'OP002',
    C_USER_NOME: 'Operador Sistema',
    C_USER_FANT: 'Operador',
    C_USER_NCPF: '99988877766',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'operador@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua B',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
  },
]

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>(initialMock)
  const [search, setSearch] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | undefined>()
  const [userToDelete, setUserToDelete] = useState<User | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.C_USER_NOME.toLowerCase().includes(search.toLowerCase()) ||
        u.C_USER_MAIL.toLowerCase().includes(search.toLowerCase()) ||
        u.C_USER_CODI.toLowerCase().includes(search.toLowerCase()),
    )
  }, [users, search])

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleOpenNew = () => {
    setEditingUser(undefined)
    setIsSheetOpen(true)
  }

  const handleSave = (data: UserFormData) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u)))
      toast.success('Usuário atualizado com sucesso!')
    } else {
      setUsers([{ ...data, id: Date.now().toString() }, ...users])
      toast.success('Usuário criado com sucesso!')
    }
    setIsSheetOpen(false)
  }

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id))
      toast.success('Usuário removido com sucesso!')
      setUserToDelete(undefined)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Usuários
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerenciamento de acessos e cadastro de usuários.
          </p>
        </div>
        <Button
          onClick={handleOpenNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Usuário
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail ou código..."
              value={search}
              onChange={handleSearch}
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
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>E-mail</TableHead>
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
                      {user.C_USER_CODI.startsWith('ADM') && (
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {maskCPF(user.C_USER_NCPF)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.C_USER_MAIL}</TableCell>
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
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
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

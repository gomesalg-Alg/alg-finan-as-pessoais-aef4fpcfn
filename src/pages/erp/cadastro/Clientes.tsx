import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plus, Search, Filter, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const mockClients = [
  {
    id: '1001',
    name: 'João Silva Oliveira',
    email: 'joao.silva@empresa.com',
    status: 'Ativo',
    plan: 'Premium',
  },
  {
    id: '1002',
    name: 'Maria Fernandes',
    email: 'maria.f@contato.com',
    status: 'Inativo',
    plan: 'Basic',
  },
  {
    id: '1003',
    name: 'Carlos Almeida Junior',
    email: 'carlos.al@negocios.com',
    status: 'Ativo',
    plan: 'Pro',
  },
  {
    id: '1004',
    name: 'Ana Paula Costa',
    email: 'anap@startup.com.br',
    status: 'Ativo',
    plan: 'Premium',
  },
]

export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Clientes
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie a base de clientes e perfis de acesso.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou e-mail..." className="pl-9 bg-background/50" />
            </div>
            <Button variant="outline" className="w-full md:w-auto border-border">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[100px] pl-6">ID</TableHead>
                  <TableHead>Nome Completo</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClients.map((client) => (
                  <TableRow key={client.id} className="group border-border/50">
                    <TableCell className="font-medium pl-6 text-muted-foreground">
                      {client.id}
                    </TableCell>
                    <TableCell className="font-semibold">{client.name}</TableCell>
                    <TableCell className="text-muted-foreground">{client.email}</TableCell>
                    <TableCell>{client.plan}</TableCell>
                    <TableCell>
                      <Badge
                        variant={client.status === 'Ativo' ? 'default' : 'secondary'}
                        className={
                          client.status === 'Ativo'
                            ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20'
                            : 'border-muted'
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plus, Search, Building2, Download } from 'lucide-react'
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

const mockData = [
  {
    id: '101',
    name: 'Tech Solutions LTDA',
    cnpj: '12.345.678/0001-90',
    category: 'Tecnologia da Informação',
    status: 'Homologado',
  },
  {
    id: '102',
    name: 'Papelaria Central',
    cnpj: '98.765.432/0001-10',
    category: 'Material de Escritório',
    status: 'Homologado',
  },
  {
    id: '103',
    name: 'Consultoria Financeira ABC',
    cnpj: '45.123.890/0001-55',
    category: 'Serviços Profissionais',
    status: 'Pendente',
  },
]

export default function Fornecedores() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Fornecedores
          </h1>
          <p className="text-muted-foreground mt-1">Cadastro e gestão de fornecedores parceiros.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 sm:flex-none shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Novo Fornecedor
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por razão social ou CNPJ..."
                className="pl-9 bg-background/50"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] pl-6">ID</TableHead>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.id} className="group border-border/50">
                    <TableCell className="font-medium pl-6 text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.cnpj}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal text-xs">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === 'Homologado' ? 'default' : 'secondary'}
                        className={
                          item.status === 'Homologado'
                            ? 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20'
                            : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Detalhes
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

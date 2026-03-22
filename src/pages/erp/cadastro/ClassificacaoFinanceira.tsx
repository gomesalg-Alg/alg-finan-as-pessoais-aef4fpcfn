import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Tags, MoveRight, ArrowRight } from 'lucide-react'
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
  { id: '1', code: '1.0.0.00', name: 'Receitas Operacionais', type: 'Receita', level: 1 },
  { id: '2', code: '1.1.0.00', name: 'Venda de Serviços', type: 'Receita', level: 2 },
  { id: '3', code: '1.1.1.00', name: 'Consultoria Financeira', type: 'Receita', level: 3 },
  { id: '4', code: '2.0.0.00', name: 'Despesas Operacionais', type: 'Despesa', level: 1 },
  { id: '5', code: '2.1.0.00', name: 'Despesas com Pessoal', type: 'Despesa', level: 2 },
  { id: '6', code: '2.1.1.00', name: 'Folha de Pagamento', type: 'Despesa', level: 3 },
]

export default function ClassificacaoFinanceira() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Tags className="h-8 w-8 text-primary" />
            Classificação Financeira
          </h1>
          <p className="text-muted-foreground mt-1">
            Plano de contas e categorias hierárquicas de lançamentos.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[150px] pl-6">Código</TableHead>
                  <TableHead>Descrição da Conta</TableHead>
                  <TableHead className="w-[150px]">Natureza</TableHead>
                  <TableHead className="text-right pr-6 w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.id} className="group border-border/50">
                    <TableCell className="font-mono text-xs pl-6 text-muted-foreground">
                      {item.code}
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center"
                        style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
                      >
                        {item.level > 1 && (
                          <ArrowRight className="h-3 w-3 mr-2 text-muted-foreground/50 shrink-0" />
                        )}
                        <span className={item.level === 1 ? 'font-bold' : 'font-medium'}>
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={item.type === 'Receita' ? 'default' : 'destructive'}
                        className={
                          item.type === 'Receita'
                            ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 font-normal'
                            : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 font-normal'
                        }
                      >
                        {item.type}
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

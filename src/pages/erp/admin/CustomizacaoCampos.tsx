import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { dataDictionary } from '@/utils/metadata'
import useERPStore from '@/stores/useERPStore'
import { Settings, Edit2 } from 'lucide-react'
import { toast } from 'sonner'

export default function CustomizacaoCampos() {
  const { fieldConfigs, updateFieldConfig, addLog, currentUser } = useERPStore()
  const [selectedEntity, setSelectedEntity] = useState<string>('users')
  const [editingField, setEditingField] = useState<any>(null)

  const [customLabel, setCustomLabel] = useState('')
  const [isRequired, setIsRequired] = useState(false)
  const [maxLength, setMaxLength] = useState<number | ''>('')

  const handleEdit = (fieldDef: any) => {
    const config = fieldConfigs.find(
      (c) => c.entity === selectedEntity && c.field === fieldDef.field,
    )
    setCustomLabel(config?.customLabel || '')
    setIsRequired(config?.isRequired || false)
    setMaxLength(config?.maxLength || '')
    setEditingField(fieldDef)
  }

  const handleSave = () => {
    if (!editingField) return

    const configId = `${selectedEntity}.${editingField.field}`
    updateFieldConfig({
      id: configId,
      entity: selectedEntity,
      field: editingField.field,
      customLabel: customLabel || undefined,
      isRequired,
      maxLength: maxLength ? Number(maxLength) : undefined,
    })

    addLog(
      'UPDATE',
      `Customização alterada para o campo ${editingField.field} da entidade ${selectedEntity}`,
      currentUser?.id,
    )
    toast.success('Configurações do campo salvas com sucesso!')
    setEditingField(null)
  }

  const entityOptions = [
    { value: 'users', label: 'Usuários' },
    { value: 'empresas', label: 'Empresas' },
    { value: 'filiais', label: 'Filiais' },
    { value: 'perfis', label: 'Perfis de Acesso' },
  ]

  const fields = dataDictionary[selectedEntity as keyof typeof dataDictionary] || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Customização de Campos
        </h1>
        <p className="text-muted-foreground mt-1">
          Altere labels, obrigatoriedade e limite de caracteres dos formulários sem alterar o
          código.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle>Campos da Entidade</CardTitle>
              <CardDescription>
                Selecione uma entidade para visualizar e customizar seus campos.
              </CardDescription>
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a entidade" />
                </SelectTrigger>
                <SelectContent>
                  {entityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campo (Original)</TableHead>
                  <TableHead>Nome Técnico</TableHead>
                  <TableHead>Label Customizado</TableHead>
                  <TableHead>Obrigatório</TableHead>
                  <TableHead>Tam. Máx</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field) => {
                  const config = fieldConfigs.find(
                    (c) => c.entity === selectedEntity && c.field === field.field,
                  )
                  return (
                    <TableRow key={field.field}>
                      <TableCell className="font-medium">{field.description}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {field.techName}
                      </TableCell>
                      <TableCell>{config?.customLabel || '-'}</TableCell>
                      <TableCell>
                        {config?.isRequired ? (
                          <span className="text-red-500 font-medium">Sim</span>
                        ) : (
                          'Não'
                        )}
                      </TableCell>
                      <TableCell>{config?.maxLength || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(field)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingField} onOpenChange={(o) => !o && setEditingField(null)}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle>Customizar Campo: {editingField?.description}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Label Customizado (Descrição em Tela)</Label>
              <Input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder={`Padrão: ${editingField?.description}`}
              />
            </div>
            <div className="space-y-2">
              <Label>Tamanho Máximo (Caracteres)</Label>
              <Input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                placeholder="Ex: 50"
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="required"
                checked={isRequired}
                onCheckedChange={(c) => setIsRequired(c === true)}
              />
              <Label htmlFor="required">Forçar campo como Obrigatório</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingField(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

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
import { Settings, Edit2, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { FieldConfig } from '@/types/fieldConfig'

export default function CustomizacaoCampos() {
  const { fieldConfigs, updateFieldConfig, addLog, currentUser, isTiModeEnabled } = useERPStore()
  const [selectedEntity, setSelectedEntity] = useState<string>('users')
  const [editingField, setEditingField] = useState<any>(null)

  const [customLabel, setCustomLabel] = useState('')
  const [isRequired, setIsRequired] = useState(false)
  const [maxLength, setMaxLength] = useState<number | ''>('')
  const [maskType, setMaskType] = useState<FieldConfig['maskType']>('none')

  if (!isTiModeEnabled) {
    return (
      <div className="bg-[#0A192F] min-h-[50vh] p-6 rounded-xl border border-red-800/50 shadow-2xl flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
        <p className="text-red-200/80 max-w-md">
          A customização de campos é uma funcionalidade técnica avançada exclusiva para usuários com
          o nível de acesso <strong>Tecnologia da Informação</strong>.
        </p>
      </div>
    )
  }

  const handleEdit = (fieldDef: any) => {
    const config = fieldConfigs.find(
      (c) => c.entity === selectedEntity && c.field === fieldDef.field,
    )
    setCustomLabel(config?.customLabel || '')
    setIsRequired(config?.isRequired || false)
    setMaxLength(config?.maxLength || '')
    setMaskType(config?.maskType || 'none')
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
      maskType: maskType !== 'none' ? maskType : undefined,
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

  const getMaskLabel = (type?: string) => {
    switch (type) {
      case 'cpf':
        return 'CPF'
      case 'cnpj':
        return 'CNPJ'
      case 'cep':
        return 'CEP'
      case 'phone':
        return 'Telefone'
      default:
        return 'Nenhuma'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Customização de Campos e Máscaras
        </h1>
        <p className="text-muted-foreground mt-1">
          Altere labels, obrigatoriedade, máscaras de entrada e limite de caracteres dinamicamente.
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
                  <TableHead>Máscara</TableHead>
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
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                          {getMaskLabel(config?.maskType)}
                        </span>
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
        <DialogContent className="border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customizar Campo: {editingField?.description}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label>Label Customizado (Descrição em Tela)</Label>
              <Input
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder={`Padrão: ${editingField?.description}`}
              />
            </div>

            <div className="space-y-2">
              <Label>Máscara de Entrada (Formatação Automática)</Label>
              <Select
                value={maskType || 'none'}
                onValueChange={(v) => setMaskType(v as FieldConfig['maskType'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhuma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  <SelectItem value="cpf">CPF (000.000.000-00)</SelectItem>
                  <SelectItem value="cnpj">CNPJ (00.000.000/0000-00)</SelectItem>
                  <SelectItem value="cep">CEP (00000-000)</SelectItem>
                  <SelectItem value="phone">Telefone / Celular</SelectItem>
                </SelectContent>
              </Select>
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

            <div className="flex items-center space-x-2 pt-2 border-t border-border/50">
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

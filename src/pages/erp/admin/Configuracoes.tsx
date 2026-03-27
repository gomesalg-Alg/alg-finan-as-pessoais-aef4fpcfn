import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, FileJson, FileSpreadsheet, Settings, ShieldAlert } from 'lucide-react'
import { dataDictionary } from '@/utils/metadata'
import { toast } from 'sonner'
import useERPStore from '@/stores/useERPStore'

export default function Configuracoes() {
  const { isTiModeEnabled } = useERPStore()

  if (!isTiModeEnabled) {
    return (
      <div className="bg-card min-h-[50vh] p-6 rounded-xl border border-destructive/50 shadow-sm flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Acesso Restrito</h2>
        <p className="text-muted-foreground max-w-md">
          As configurações técnicas e exportação de metadados são exclusivas para usuários com o
          nível de acesso <strong>Tecnologia da Informação</strong>.
        </p>
      </div>
    )
  }

  const handleExportJSON = () => {
    try {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(dataDictionary, null, 2))
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', 'dicionario_de_dados.json')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
      toast.success('Exportação Concluída', {
        description: 'O dicionário de dados foi exportado em JSON.',
      })
    } catch (e) {
      toast.error('Erro na Exportação', { description: 'Não foi possível exportar os metadados.' })
    }
  }

  const handleExportCSV = () => {
    try {
      let csv = 'Entidade,Campo Formulario,Nome Tecnico (DB),Tipo,Descricao\n'
      Object.entries(dataDictionary).forEach(([entity, fields]) => {
        fields.forEach((f) => {
          csv += `${entity},${f.field},${f.techName},${f.type},"${f.description}"\n`
        })
      })
      const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', 'dicionario_de_dados.csv')
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
      toast.success('Exportação Concluída', {
        description: 'O dicionário de dados foi exportado em CSV.',
      })
    } catch (e) {
      toast.error('Erro na Exportação', { description: 'Não foi possível exportar os metadados.' })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações Técnicas</h1>
        <p className="text-muted-foreground mt-1">
          Gerenciamento e exportação de metadados do sistema (Acesso restrito TI)
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Dicionário de Dados
            </CardTitle>
            <CardDescription>
              Exporte o mapeamento completo dos campos de formulário para as respectivas colunas no
              banco de dados. Utilize estes relatórios para documentação interna e auditoria de
              integrações.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 p-4 rounded-lg border border-border">
              <p className="text-sm text-foreground font-medium mb-2">
                Opções de Exportação Disponíveis:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                <li>
                  Formato JSON: Ideal para consumo por APIs ou importação em outras ferramentas.
                </li>
                <li>Formato CSV: Ideal para visualização em planilhas (Excel, Google Sheets).</li>
              </ul>
            </div>
            <div className="flex gap-4 pt-2">
              <Button
                onClick={handleExportJSON}
                className="flex-1 bg-blue-800 hover:bg-blue-900 text-white"
              >
                <FileJson className="w-4 h-4 mr-2" />
                Exportar JSON
              </Button>
              <Button
                onClick={handleExportCSV}
                className="flex-1 bg-green-800 hover:bg-green-900 text-white"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Customização de Interface
            </CardTitle>
            <CardDescription>
              Ajuste dinamicamente as propriedades dos campos nos formulários (labels, tamanhos e
              obrigatoriedade) sem a necessidade de alterar o código-fonte do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Permite que a equipe de TI personalize a experiência de preenchimento dos cadastros
                para os usuários finais, garantindo agilidade.
              </p>
            </div>
            <div className="pt-2">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/erp/admin/customizacao-campos">
                  <Settings className="w-4 h-4 mr-2" />
                  Acessar Painel de Customização
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

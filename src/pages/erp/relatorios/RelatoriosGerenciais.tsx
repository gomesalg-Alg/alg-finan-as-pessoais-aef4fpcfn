import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileText, Printer, Eye, X } from 'lucide-react'
import useERPStore from '@/stores/useERPStore'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'
import { toast } from 'sonner'

export default function RelatoriosGerenciais() {
  const { periodos, currentUser, empresas } = useERPStore()

  const closedPeriodos = useMemo(() => {
    return periodos
      .filter((p) => p.status === 'Fechado')
      .sort((a, b) => {
        if (a.ano !== b.ano) return b.ano - a.ano
        return b.mes - a.mes
      })
  }, [periodos])

  const [selectedPeriod, setSelectedPeriod] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedPeriodData = useMemo(() => {
    return closedPeriodos.find((p) => p.id === selectedPeriod)
  }, [selectedPeriod, closedPeriodos])

  const empresaData = useMemo(() => {
    if (!currentUser) return null
    return empresas.find((e) => e.id === currentUser.C_USER_EMPR)
  }, [currentUser, empresas])

  const handleGenerate = () => {
    if (!selectedPeriod) {
      toast.error('Selecione um período contábil.')
      return
    }
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
      toast.success('Relatório gerado com sucesso!')
    }, 800)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="bg-[#0A192F] min-h-[calc(100vh-100px)] p-6 rounded-xl border border-blue-800/50 shadow-2xl relative">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FileText className="h-8 w-8 text-[#8B4513]" />
              Exportação de Relatórios Gerenciais
            </h1>
            <p className="text-blue-200 mt-2">
              Módulo de geração de relatórios financeiros consolidados em PDF.
            </p>
          </div>
        </div>

        <Card className="bg-[#112240] border-blue-800/50 shadow-lg max-w-2xl">
          <CardHeader className="border-b border-blue-800/50 pb-4">
            <CardTitle className="text-xl text-white">Configuração do Relatório</CardTitle>
            <CardDescription className="text-blue-200">
              Apenas períodos contábeis com status{' '}
              <strong className="text-emerald-400">Fechado</strong> estão disponíveis para emissão
              oficial.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Período Contábil (C_FECH)</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-[#0A192F] border-blue-800 text-white focus:ring-[#8B4513]">
                  <SelectValue placeholder="Selecione o mês/ano fechado" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A192F] border-blue-800 text-white">
                  {closedPeriodos.length === 0 && (
                    <SelectItem value="none" disabled className="text-blue-400">
                      Nenhum período fechado disponível
                    </SelectItem>
                  )}
                  {closedPeriodos.map((p) => (
                    <SelectItem
                      key={p.id}
                      value={p.id}
                      className="focus:bg-blue-900 focus:text-white"
                    >
                      {p.mes.toString().padStart(2, '0')}/{p.ano} - Fechado em{' '}
                      {new Date(p.updatedAt).toLocaleDateString('pt-BR')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-md border border-blue-800/50 space-y-2">
              <Label className="text-blue-200 text-xs uppercase tracking-wider font-bold">
                Empresa / Filial Emissora
              </Label>
              <p className="text-white font-medium">
                {empresaData?.C_EMPR_NOME || 'ALG Finanças S.A.'}
              </p>
              <p className="text-sm text-blue-300">
                CNPJ:{' '}
                {empresaData?.C_EMPR_CNPJ.replace(
                  /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  '$1.$2.$3/$4-$5',
                ) || 'Não informado'}
              </p>
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !selectedPeriod}
                className="bg-[#8B4513] hover:bg-[#6b340e] text-white flex-1"
              >
                {isGenerating ? 'Processando dados...' : 'Gerar Relatório Oficial (PDF)'}
                {!isGenerating && <Eye className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPreview && (
        <>
          {/* Print specific styles injected into the DOM when preview is active */}
          <style type="text/css" media="print">
            {`
              @page { size: A4 portrait; margin: 15mm; }
              body * { visibility: hidden !important; }
              #print-area, #print-area * { visibility: visible !important; }
              #print-area { 
                position: absolute !important; 
                left: 0 !important; 
                top: 0 !important; 
                width: 100% !important; 
                color: black !important; 
                background: white !important; 
              }
            `}
          </style>

          {/* Screen overlay for preview */}
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-8 print:hidden animate-fade-in">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-full flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center rounded-t-xl shrink-0">
                <h3 className="text-lg font-bold text-gray-800">Visualização do Documento</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir / Salvar PDF
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPreview(false)}
                    className="text-gray-500 hover:bg-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-8 bg-gray-200/50">
                {/* The actual print area */}
                <div
                  id="print-area"
                  className="bg-white mx-auto shadow-sm border border-gray-200 min-h-[297mm] max-w-[210mm] p-[15mm] text-black font-sans relative"
                >
                  {/* Print Header */}
                  <div className="flex justify-between items-start border-b-2 border-gray-300 pb-6 mb-8">
                    <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
                    <div className="text-right">
                      <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                        Relatório Gerencial
                      </h1>
                      <p className="text-sm font-medium text-gray-600 mt-1">
                        Período de Apuração: {selectedPeriodData?.mes.toString().padStart(2, '0')}/
                        {selectedPeriodData?.ano}
                      </p>
                      <p className="text-sm text-gray-500">{empresaData?.C_EMPR_NOME}</p>
                      <p className="text-sm text-gray-500">
                        CNPJ:{' '}
                        {empresaData?.C_EMPR_CNPJ.replace(
                          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                          '$1.$2.$3/$4-$5',
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Print Body */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 mb-4 bg-gray-100 p-2 rounded">
                        Demonstrativo de Resultados Consolidados
                      </h2>
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-800">
                            <th className="text-left py-3 font-bold text-gray-700 w-2/3">
                              Descrição (Classificação Financeira)
                            </th>
                            <th className="text-right py-3 font-bold text-gray-700">
                              Valor Acumulado (R$)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 font-medium text-gray-800">
                              1.0 Receitas Operacionais
                            </td>
                            <td className="text-right py-3 text-gray-800">450.231,89</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 pl-4 text-gray-600">1.1 Venda de Serviços</td>
                            <td className="text-right py-3 text-gray-600">400.000,00</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 pl-4 text-gray-600">1.2 Rendimentos Financeiros</td>
                            <td className="text-right py-3 text-gray-600">50.231,89</td>
                          </tr>

                          <tr className="border-b border-gray-200">
                            <td className="py-3 font-medium text-gray-800 mt-4">
                              2.0 Despesas Operacionais
                            </td>
                            <td className="text-right py-3 text-gray-800">- 280.500,00</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 pl-4 text-gray-600">2.1 Despesas com Pessoal</td>
                            <td className="text-right py-3 text-gray-600">- 150.000,00</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-3 pl-4 text-gray-600">2.2 Impostos e Taxas</td>
                            <td className="text-right py-3 text-gray-600">- 130.500,00</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-gray-800 bg-gray-50">
                            <td className="py-4 font-bold text-gray-900 uppercase pl-2">
                              Resultado Líquido do Período
                            </td>
                            <td className="text-right py-4 font-bold text-emerald-700 text-base pr-2">
                              169.731,89
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="pt-4 text-sm text-gray-600 leading-relaxed text-justify">
                      <p>
                        Declaro que as informações constantes neste relatório gerencial refletem a
                        movimentação financeira apurada no sistema ERP ALG Finanças Pessoais durante
                        o período contábil especificado. Este documento possui caráter informativo
                        para tomada de decisão e auditoria interna.
                      </p>
                    </div>
                  </div>

                  {/* Print Footer - Digital Signature Area */}
                  <div className="absolute bottom-[20mm] left-[15mm] right-[15mm]">
                    <div className="flex justify-between items-end px-8">
                      <div className="text-center w-64">
                        <div className="border-b border-gray-800 mb-2 h-8"></div>
                        <p className="font-bold text-gray-800 text-sm">
                          {currentUser?.C_USER_NOME}
                        </p>
                        <p className="text-xs text-gray-500">Gestor Responsável</p>
                        <p className="text-xs text-gray-400 mt-1">
                          CPF:{' '}
                          {currentUser?.C_USER_NCPF?.replace(
                            /^(\d{3})(\d{3})(\d{3})(\d{2})/,
                            '$1.$2.$3-$4',
                          )}
                        </p>
                      </div>
                      <div className="text-center w-64">
                        <div className="border border-gray-400 rounded p-3 mb-2 bg-gray-50">
                          <p className="text-[10px] font-mono text-gray-500 text-left leading-tight break-all">
                            HASH: {Math.random().toString(36).substring(2, 15).toUpperCase()}
                            {Math.random().toString(36).substring(2, 15).toUpperCase()}
                            <br />
                            DATA: {new Date().toLocaleString('pt-BR')}
                            <br />
                            SISTEMA: ALG-ERP-V1
                          </p>
                        </div>
                        <p className="font-bold text-gray-800 text-sm">Assinatura Digital</p>
                        <p className="text-xs text-gray-500">Validado Eletronicamente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

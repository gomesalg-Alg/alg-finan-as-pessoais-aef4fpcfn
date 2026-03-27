import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Layout } from '@/components/Layout'

import Index from '@/pages/Index'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

import Login from '@/pages/auth/Login'
import { ERPLayout } from '@/components/erp/ERPLayout'
import Dashboard from '@/pages/erp/Dashboard'
import Clientes from '@/pages/erp/cadastro/Clientes'
import Fornecedores from '@/pages/erp/cadastro/Fornecedores'
import Usuarios from '@/pages/erp/cadastro/Usuarios'
import Perfis from '@/pages/erp/cadastro/Perfis'
import Empresas from '@/pages/erp/cadastro/Empresas'
import Filiais from '@/pages/erp/cadastro/Filiais'
import ClassificacaoFinanceira from '@/pages/erp/cadastro/ClassificacaoFinanceira'
import PeriodosContabeis from '@/pages/erp/admin/PeriodosContabeis'
import ManutencaoLogs from '@/pages/erp/admin/ManutencaoLogs'
import AuditoriaAcoes from '@/pages/erp/admin/AuditoriaAcoes'
import Configuracoes from '@/pages/erp/admin/Configuracoes'
import CustomizacaoCampos from '@/pages/erp/admin/CustomizacaoCampos'
import RelatoriosGerenciais from '@/pages/erp/relatorios/RelatoriosGerenciais'

import { ERPProvider } from '@/stores/useERPStore'

const App = () => (
  <ERPProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" theme="dark" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/erp" element={<ERPLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cadastro/empresas" element={<Empresas />} />
            <Route path="cadastro/filiais" element={<Filiais />} />
            <Route path="cadastro/usuarios" element={<Usuarios />} />
            <Route path="cadastro/perfis" element={<Perfis />} />
            <Route path="cadastro/clientes" element={<Clientes />} />
            <Route path="cadastro/fornecedores" element={<Fornecedores />} />
            <Route path="cadastro/classificacao-financeira" element={<ClassificacaoFinanceira />} />

            {/* Relatórios Routes */}
            <Route path="relatorios/gerenciais" element={<RelatoriosGerenciais />} />

            {/* Admin Routes */}
            <Route path="admin/periodos-contabeis" element={<PeriodosContabeis />} />
            <Route path="admin/manutencao-logs" element={<ManutencaoLogs />} />
            <Route path="admin/auditoria" element={<AuditoriaAcoes />} />
            <Route path="admin/configuracoes" element={<Configuracoes />} />
            <Route path="admin/customizacao-campos" element={<CustomizacaoCampos />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </ERPProvider>
)

export default App

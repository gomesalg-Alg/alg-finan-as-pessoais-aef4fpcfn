import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Building2,
  Tags,
  Settings,
  FileText,
  Wrench,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

export function ERPSidebar() {
  const location = useLocation()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar shadow-2xl">
      <SidebarHeader className="bg-sidebar p-4 border-b border-sidebar-border h-16 flex justify-center">
        <Link to="/erp" className="flex items-center gap-3 overflow-hidden group w-full px-2">
          <img
            src={logoUrl}
            alt="ALG ERP"
            className="w-8 h-8 rounded-full border-2 border-primary shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col truncate">
            <span className="font-bold text-sm text-sidebar-foreground truncate tracking-tight">
              ALG ERP
            </span>
            <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">
              Color Admin
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase text-[10px] font-bold tracking-widest px-2 mb-2">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === '/erp'}
                tooltip="Dashboard"
              >
                <Link to="/erp">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Collapsible
              defaultOpen={location.pathname.includes('/cadastro')}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Cadastro">
                    <ShieldCheck />
                    <span>Cadastro</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === '/erp/cadastro/clientes'}
                      >
                        <Link to="/erp/cadastro/clientes">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Clientes</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === '/erp/cadastro/fornecedores'}
                      >
                        <Link to="/erp/cadastro/fornecedores">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span>Fornecedores</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === '/erp/cadastro/classificacao-financeira'}
                      >
                        <Link to="/erp/cadastro/classificacao-financeira">
                          <Tags className="h-4 w-4 mr-2" />
                          <span className="truncate">Classificação Financeira</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Operação">
                <Settings />
                <span>Operação</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Relatórios">
                <FileText />
                <span>Relatórios</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Ferramentas">
                <Wrench />
                <span>Ferramentas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

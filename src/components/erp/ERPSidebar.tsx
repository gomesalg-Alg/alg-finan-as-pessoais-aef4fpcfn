import { Link, useLocation } from 'react-router-dom'
import {
  Building2,
  Users,
  Store,
  PieChart,
  CalendarDays,
  Database,
  FileText,
  Shield,
  LogOut,
  Tags,
} from 'lucide-react'
import profileImg from '@/assets/image-6ef14.png'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useERPStore from '@/stores/useERPStore'

const navItems = [
  { title: 'Dashboard', icon: PieChart, path: '/erp', perm: 'dashboard' },
  { title: 'Empresas', icon: Building2, path: '/erp/cadastro/empresas', perm: 'empresas' },
  { title: 'Filiais', icon: Store, path: '/erp/cadastro/filiais', perm: 'filiais' },
  { title: 'Usuários', icon: Users, path: '/erp/cadastro/usuarios', perm: 'usuarios' },
  { title: 'Perfis de Acesso', icon: Shield, path: '/erp/cadastro/perfis', perm: 'perfis' },
  { title: 'Clientes', icon: Users, path: '/erp/cadastro/clientes', perm: 'clientes' },
  { title: 'Fornecedores', icon: Store, path: '/erp/cadastro/fornecedores', perm: 'fornecedores' },
  {
    title: 'Classif. Financeira',
    icon: Tags,
    path: '/erp/cadastro/classificacao-financeira',
    perm: 'classificacao-financeira',
  },
]

const relatoriosItems = [
  {
    title: 'Relatórios Gerenciais',
    icon: FileText,
    path: '/erp/relatorios/gerenciais',
    perm: 'relatorios',
  },
]

const adminItems = [
  {
    title: 'Períodos Contábeis',
    icon: CalendarDays,
    path: '/erp/admin/periodos-contabeis',
    perm: 'admin-periodos',
  },
  {
    title: 'Manutenção de Logs',
    icon: Database,
    path: '/erp/admin/manutencao-logs',
    perm: 'admin-logs',
  },
  {
    title: 'Auditoria de Ações',
    icon: Shield,
    path: '/erp/admin/auditoria',
    perm: 'admin-auditoria',
  },
]

export function ERPSidebar() {
  const location = useLocation()
  const { hasPermission, currentUser } = useERPStore()

  const renderMenu = (items: typeof navItems) => {
    return items.map((item) => {
      if (!hasPermission(item.perm)) return null

      const isActive =
        location.pathname === item.path ||
        (item.path !== '/erp' && location.pathname.startsWith(item.path))
      return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
            <Link to={item.path} className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-[#8B4513] shrink-0" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })
  }

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="bg-sidebar-accent border-b border-sidebar-border p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-[#8B4513] shadow-md bg-white">
            <AvatarImage
              src={profileImg}
              alt={currentUser?.C_USER_NOME || 'Admin'}
              className="object-cover"
            />
            <AvatarFallback className="bg-[#8B4513]/20 text-[#8B4513] font-bold">
              {currentUser?.C_USER_NOME?.substring(0, 2).toUpperCase() || 'AC'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sidebar-accent-foreground font-bold text-sm leading-tight">
              {currentUser?.C_USER_NOME || 'Administrador Chefe'}
            </span>
            <span className="text-sidebar-foreground text-xs mt-0.5">Gestão de Recursos</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-bold text-xs uppercase tracking-wider mb-2">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(navItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-sidebar-foreground font-bold text-xs uppercase tracking-wider mb-2">
            Relatórios
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(relatoriosItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-sidebar-foreground font-bold text-xs uppercase tracking-wider mb-2">
            Administração
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(adminItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar-accent border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-sidebar-foreground hover:bg-red-500/10 hover:text-red-500 font-semibold transition-colors"
            >
              <Link to="/login" className="flex items-center gap-3">
                <LogOut className="h-5 w-5 text-[#8B4513] shrink-0" />
                <span>Sair do Sistema</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

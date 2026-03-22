import { Link, useLocation } from 'react-router-dom'
import { Building2, Users, Store, Settings, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'
import profileImg from '@/assets/image-6ef14.png'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { title: 'Dashboard', icon: PieChart, path: '/erp' },
  { title: 'Usuários', icon: Users, path: '/erp/usuarios' },
  { title: 'Empresas', icon: Building2, path: '/erp/empresas' },
  { title: 'Filiais', icon: Store, path: '/erp/filiais' },
  { title: 'Configurações', icon: Settings, path: '/erp/configuracoes' },
]

export function ERPSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-blue-900/20 bg-blue-50">
      <SidebarHeader className="border-b border-blue-200 bg-blue-900 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-amber-600 shadow-md">
            <AvatarImage src={profileImg} alt="Administrador Chefe" className="object-cover" />
            <AvatarFallback className="bg-amber-100 text-amber-900 font-bold">AC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-tight">Administrador Chefe</span>
            <span className="text-blue-200 text-xs mt-0.5">Gestão de Recursos</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-blue-50/50 pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-800 font-bold text-xs uppercase tracking-wider mb-2">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/erp' && location.pathname.startsWith(item.path))
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors',
                          isActive
                            ? 'bg-blue-200/60 text-blue-900 font-semibold shadow-sm'
                            : 'text-blue-800 hover:bg-blue-100/80',
                        )}
                      >
                        <item.icon
                          className={cn('h-5 w-5', isActive ? 'text-amber-700' : 'text-amber-600')}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, User, Bell } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'
import useERPStore from '@/stores/useERPStore'

const breadcrumbMap: Record<string, string> = {
  erp: 'Dashboard',
  cadastro: 'Cadastro',
  clientes: 'Clientes',
  fornecedores: 'Fornecedores',
  usuarios: 'Usuários',
  perfis: 'Perfis de Acesso',
  empresas: 'Empresas',
  filiais: 'Filiais',
  'classificacao-financeira': 'Classificação Financeira',
}

export function ERPHeader() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)
  const { currentUser, empresas, filiais, notifications, setNotifications } = useERPStore()

  const userEmpresa = empresas.find((e) => e.id === currentUser?.C_USER_EMPR)
  const userFilial = filiais.find((f) => f.id === currentUser?.C_USER_FILI)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-card/80 backdrop-blur-md px-4 md:px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-2 md:ml-0" />

        <div className="hidden md:flex items-center gap-4">
          <div className="h-6 w-px bg-border/50" />
          <Breadcrumb>
            <BreadcrumbList>
              {paths.map((path, index) => {
                const isLast = index === paths.length - 1
                const href = `/${paths.slice(0, index + 1).join('/')}`
                const label = breadcrumbMap[path] || path

                return (
                  <React.Fragment key={path}>
                    <BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbLink asChild>
                          <Link
                            to={href}
                            className="capitalize hover:text-primary transition-colors"
                          >
                            {label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="capitalize font-semibold text-foreground">
                          {label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2 md:hidden">
        <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-full border border-primary" />
      </div>

      <div className="flex items-center gap-4">
        {userEmpresa && (
          <div className="hidden lg:flex flex-col items-end text-xs mr-2 text-muted-foreground">
            <span className="font-semibold text-foreground">{userEmpresa.C_EMPR_FANT}</span>
            <span>{userFilial?.C_FILI_NOME}</span>
          </div>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors outline-none">
              <Bell className="h-5 w-5 text-[#8B4513]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 border-border">
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h4 className="font-semibold text-foreground">Notificações</h4>
              {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/20 text-primary hover:bg-primary/30"
                >
                  {unreadCount} não lidas
                </Badge>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto bg-card">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Nenhuma notificação
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      'p-4 border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors',
                      !n.read && 'bg-primary/5',
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5
                        className={cn(
                          'text-sm font-medium',
                          !n.read ? 'text-primary font-bold' : 'text-foreground',
                        )}
                      >
                        {n.title}
                      </h5>
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                    <span className="text-[10px] text-muted-foreground/70 mt-2 block">
                      {new Date(n.date).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 outline-none hover:opacity-80 transition-opacity ml-2">
              <div className="hidden md:flex flex-col items-end text-sm">
                <span className="font-semibold text-foreground">
                  {currentUser?.C_USER_NOME || 'Usuário'}
                </span>
                <span className="text-xs text-muted-foreground">{currentUser?.C_USER_MAIL}</span>
              </div>
              <Avatar className="h-9 w-9 border-2 border-[#8B4513]/50 shadow-sm">
                <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 bg-card border-border shadow-xl">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="cursor-pointer text-muted-foreground focus:bg-secondary focus:text-foreground">
              <User className="mr-2 h-4 w-4 text-[#8B4513]" />
              <span>Perfil Profissional</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              asChild
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <Link to="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair do Sistema</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

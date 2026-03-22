import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
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
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

const breadcrumbMap: Record<string, string> = {
  erp: 'Dashboard',
  cadastro: 'Cadastro',
  clientes: 'Clientes',
  fornecedores: 'Fornecedores',
  usuarios: 'Usuários',
  'classificacao-financeira': 'Classificação Financeira',
}

export function ERPHeader() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 outline-none hover:opacity-80 transition-opacity">
              <div className="hidden md:flex flex-col items-end text-sm">
                <span className="font-semibold text-foreground">Administrador</span>
                <span className="text-xs text-muted-foreground">admin@alg.com.br</span>
              </div>
              <Avatar className="h-9 w-9 border-2 border-primary/50 shadow-sm">
                <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 bg-card border-border shadow-xl">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="cursor-pointer text-muted-foreground focus:bg-secondary focus:text-foreground">
              <User className="mr-2 h-4 w-4" />
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

import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const routes = [
  { name: 'Início', path: '/' },
  { name: 'Sobre Nós', path: '/sobre' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Contato', path: '/contato' },
]

export function Header() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-16 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-700 overflow-hidden shadow-lg border border-primary/20">
              <span className="font-display font-extrabold text-background text-lg z-10">AlLG</span>
              <div className="absolute inset-0 animate-shine opacity-50" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:inline-block">
              Finanças <span className="text-primary">Pessoais</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === route.path ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {route.name}
            </Link>
          ))}
          <Button asChild className="btn-primary rounded-full px-6">
            <Link to="/contato">Solicitar Consultoria</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l-border bg-background"
            >
              <SheetTitle className="text-left font-display">Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === route.path ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                <Button asChild className="btn-primary w-full mt-4">
                  <Link to="/contato" onClick={() => setIsOpen(false)}>
                    Solicitar Consultoria
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

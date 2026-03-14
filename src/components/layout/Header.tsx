import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre Nós', href: '/sobre' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Contato', href: '/contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-effect py-2' : 'bg-transparent py-4',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Desktop Navigation / Mobile Menu Button */}
          <div className="flex-1 flex justify-start items-center">
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full',
                    location.pathname === item.href
                      ? 'text-primary after:w-full'
                      : 'text-foreground/90',
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <button
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Center: Centered Logo */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <Link to="/" className="flex flex-col items-center gap-1 group">
              <img
                src={logoUrl}
                alt="ALG Finanças Pessoais Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border-2 border-primary shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-bold text-xs md:text-sm tracking-tight text-foreground hidden sm:block">
                ALG Finanças Pessoais
              </span>
            </Link>
          </div>

          {/* Right: CTA */}
          <div className="flex-1 flex justify-end items-center">
            <Button
              asChild
              className="shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/contato">
                <span className="hidden lg:inline">Solicitar Consultoria</span>
                <span className="lg:hidden">Consultoria</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl animate-fade-in-down">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-lg font-medium p-3 rounded-lg transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-secondary hover:text-primary',
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

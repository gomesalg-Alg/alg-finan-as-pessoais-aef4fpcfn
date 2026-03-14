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

export default function Header() {
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
        isScrolled ? 'glass-effect py-3' : 'bg-transparent py-5',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoUrl}
              alt="ALG Finanças Pessoais Logo"
              className="h-10 w-10 object-cover rounded-full border-2 border-accent shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className={cn(
                'font-bold text-xl tracking-tight transition-colors',
                isScrolled ? 'text-primary' : 'text-primary md:text-white',
              )}
            >
              ALG Finanças Pessoais
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full',
                  isScrolled ? 'text-foreground/80' : 'text-white/90 hover:text-white',
                  location.pathname === item.href &&
                    (isScrolled ? 'text-primary after:w-full' : 'text-white after:w-full'),
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className={cn(
                'shadow-lg hover:shadow-xl transition-all',
                !isScrolled && 'bg-white text-primary hover:bg-white/90',
              )}
            >
              <Link to="/contato">Agendar Consultoria</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn('h-6 w-6', !isScrolled && 'text-white')} />
            ) : (
              <Menu className={cn('h-6 w-6', !isScrolled && 'text-white')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl animate-fade-in-down">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-lg font-medium p-3 rounded-lg transition-colors',
                  location.pathname === item.href
                    ? 'bg-primary/5 text-primary'
                    : 'text-foreground/80 hover:bg-secondary/50 hover:text-primary',
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <Button asChild className="w-full shadow-md">
                <Link to="/contato">Agendar Consultoria</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

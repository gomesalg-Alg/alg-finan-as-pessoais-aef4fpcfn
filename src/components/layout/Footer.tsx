import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Calendar, ArrowRight } from 'lucide-react'
import logoUrl from '@/assets/logo_escolhido_alg-bc19d.jpeg'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="ALG Finanças Pessoais Logo"
                className="h-12 w-12 object-cover rounded-full border border-primary/50"
              />
              <span className="font-bold text-xl text-foreground tracking-tight">
                ALG Finanças Pessoais
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Especialistas em Gestão de Controle Financeiro Pessoal, ajudando você a organizar,
              planejar e multiplicar seu patrimônio com segurança e inteligência.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Calendar className="h-4 w-4" />
              <span>Fundada em 30/10/2024</span>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">Navegação</h3>
            <ul className="space-y-4">
              {[
                { name: 'Início', href: '/' },
                { name: 'Sobre Nós', href: '/sobre' },
                { name: 'Serviços', href: '/servicos' },
                { name: 'Contato', href: '/contato' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">Especialidades</h3>
            <ul className="space-y-4">
              <li className="text-sm text-muted-foreground">Planejamento Financeiro</li>
              <li className="text-sm text-muted-foreground">
                Gestão de Controle Financeiro Pessoal
              </li>
              <li className="text-sm text-muted-foreground">Consultoria de Investimentos</li>
              <li className="text-sm text-muted-foreground">Organização de Dívidas</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 text-lg">Contato</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:gomesalg@gmail.com"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span>gomesalg@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511992459400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <span>11 99245-9400</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  Rua Domingos Pires de Oliveira Dias, 32
                  <br />
                  São Paulo - SP
                  <br />
                  CEP: 04821-230
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ALG Finanças Pessoais Ltda-me. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

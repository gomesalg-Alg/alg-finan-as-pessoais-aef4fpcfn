import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-700">
              <span className="font-display font-bold text-background text-sm">AlLG</span>
            </div>
            <span className="font-display font-bold text-lg">Finanças Pessoais</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Gestão de Controle Financeiro Pessoal. Transformando números em conquistas pessoais com
            excelência e zelo.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-foreground">Links Rápidos</h3>
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Sobre Nós
            </Link>
            <Link
              to="/servicos"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Serviços
            </Link>
            <Link
              to="/contato"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contato
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-foreground">Contato</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>
                Rua Domingos Pires de Oliveira Dias, 32
                <br />
                São Paulo - SP
                <br />
                CEP: 04821-230
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <a
                href="https://wa.me/5511992459400"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                (11) 99245-9400
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>contato@allgfinancas.com.br</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display font-semibold text-foreground">Newsletter</h3>
          <p className="text-sm text-muted-foreground">Receba dicas financeiras exclusivas.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="bg-secondary/50 border-border"
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Assinar
            </Button>
          </form>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4 text-center md:text-left">
        <p>
          AlLG Planejamento e Controle de Finanças Pessoais Ltda-me © {new Date().getFullYear()}.
          Todos os direitos reservados.
        </p>
        <p className="font-medium bg-secondary/50 px-4 py-1.5 rounded-full">
          Fundada em 30/10/2024
        </p>
      </div>
    </footer>
  )
}

import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Vamos conversar</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dê o primeiro passo para assumir o controle total do seu futuro financeiro. Nossa
              equipe de especialistas da ALG Finanças Pessoais está pronta para entender suas
              necessidades.
            </p>
          </div>

          {/* Contact Info Centered */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg border border-border mb-12">
            <h3 className="text-2xl font-bold mb-10 text-center text-foreground">
              Informações de Contato
            </h3>

            <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="flex flex-col items-center pt-6 md:pt-0 first:pt-0">
                <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-5">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Telefone / WhatsApp
                </p>
                <a
                  href="https://wa.me/5511992459400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  11 99245-9400
                </a>
              </div>

              <div className="flex flex-col items-center pt-6 md:pt-0">
                <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-5">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">E-mail</p>
                <a
                  href="mailto:gomesalg@gmail.com"
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors truncate w-full max-w-[250px]"
                >
                  gomesalg@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center pt-6 md:pt-0">
                <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-5">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Endereço Sede</p>
                <p className="text-base font-medium text-foreground leading-relaxed">
                  Rua Domingos Pires de Oliveira Dias, 32
                  <br />
                  São Paulo - SP
                  <br />
                  CEP: 04821-230
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-col items-center text-center">
              <p className="text-sm text-muted-foreground mb-4">Prefere um contato rápido?</p>
              <Button
                asChild
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md border-0"
              >
                <a href="https://wa.me/5511992459400" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Iniciar Conversa no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg border border-border">
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">
              Solicitar Consultoria
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

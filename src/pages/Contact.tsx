import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Vamos conversar</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dê o primeiro passo para assumir o controle total do seu futuro financeiro. Nossa
              equipe de especialistas da ALG Finanças Pessoais está pronta para entender suas
              necessidades.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Telefone / WhatsApp
                      </p>
                      <a
                        href="https://wa.me/5511992459400"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:text-accent transition-colors"
                      >
                        (11) 99245-9400
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">E-mail</p>
                      <a
                        href="mailto:gomesalg@gmail.com"
                        className="text-lg font-semibold hover:text-accent transition-colors break-all"
                      >
                        gomesalg@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Endereço Sede
                      </p>
                      <p className="text-base font-medium leading-relaxed">
                        Rua Domingos Pires de Oliveira Dias, 32
                        <br />
                        São Paulo - SP
                        <br />
                        CEP: 04821-230
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Prefere um contato rápido?</p>
                  <Button
                    asChild
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md"
                  >
                    <a href="https://wa.me/5511992459400" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chamar no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Solicitar Consultoria</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

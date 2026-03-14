import { ContactForm } from '@/components/contact/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <div className="pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Fale com um <span className="text-primary">Especialista</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Dê o primeiro passo para a transformação da sua vida financeira. Estamos prontos para
            entender seu momento.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="card-glass border-border/40">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-display font-semibold text-xl mb-4">Informações de Contato</h3>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefone / WhatsApp</p>
                    <p className="text-muted-foreground text-sm mt-1">(11) 99245-9400</p>
                    <a
                      href="https://wa.me/5511992459400"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary text-sm hover:underline mt-1 inline-block"
                    >
                      Iniciar conversa
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">E-mail Corporativo</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      contato@allgfinancas.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Sede Operacional</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Rua Domingos Pires de Oliveira Dias, 32
                      <br />
                      São Paulo - SP
                      <br />
                      CEP: 04821-230
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Horário de Atendimento</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Segunda a Sexta
                      <br />
                      09:00 às 18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-border/50 h-[300px] relative">
              <img
                src="https://img.usecurling.com/p/600/400?q=sao%20paulo%20map&color=black"
                alt="Localização no mapa"
                className="w-full h-full object-cover opacity-70 grayscale"
              />
              <div className="absolute inset-0 bg-background/40 mix-blend-multiply" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full shadow-lg border border-primary/20">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

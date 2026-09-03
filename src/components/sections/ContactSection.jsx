import { COMPANY_INFO } from '@/constants/companyData'
import { Badge, Button } from '@/components/ui'
import { MessageSquare } from 'lucide-react'

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-charcoal-deep text-canvas relative overflow-hidden py-20"
    >
      <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
        <Badge variant="charcoal">{COMPANY_INFO.conversionCta.badge}</Badge>
        <h2 className="text-canvas font-serif text-3xl leading-tight font-bold sm:text-5xl">
          {COMPANY_INFO.conversionCta.heading}
        </h2>
        <p className="text-text-inverse-muted mx-auto max-w-xl text-base">
          {COMPANY_INFO.conversionCta.description}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button
            as="a"
            href={COMPANY_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="brass"
            animation="shimmer"
            className="w-full sm:w-auto"
          >
            <MessageSquare className="h-4 w-4" />
            {COMPANY_INFO.conversionCta.whatsappAction}
          </Button>

          <Button
            as="a"
            href={`tel:${COMPANY_INFO.contact.phoneClean}`}
            size="lg"
            variant="outlineDark"
            className="w-full sm:w-auto"
          >
            Call: {COMPANY_INFO.contact.phone}
          </Button>
        </div>
      </div>
    </section>
  )
}

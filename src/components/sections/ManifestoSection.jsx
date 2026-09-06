import { COMPANY_INFO } from '@/constants/companyData'
import { Badge, Card } from '@/components/ui'
import {
  Sparkles,
  Ruler,
  Hammer,
  Store,
  Truck,
  CreditCard,
  ShieldCheck,
} from 'lucide-react'

const iconMap = {
  Sparkles,
  Ruler,
  Hammer,
  Store,
  Truck,
  CreditCard,
  ShieldCheck,
}

export const ManifestoSection = () => {
  return (
    <section
      id="why-us"
      className="border-border-subtle border-y bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <Badge variant="brass">{COMPANY_INFO.brandIntro.label}</Badge>
            <h2 className="text-charcoal-deep font-serif text-3xl leading-tight font-bold sm:text-4xl">
              {COMPANY_INFO.brandIntro.heading}
            </h2>
            <p className="text-text-secondary text-base leading-relaxed sm:text-lg">
              {COMPANY_INFO.brandIntro.description}
            </p>
            <div className="bg-canvas border-brass space-y-3 rounded-xl border-l-4 p-6">
              <p className="text-text-primary font-serif text-base leading-relaxed italic">
                "{COMPANY_INFO.brandIntro.quote.text}"
              </p>
              <p className="text-wood-walnut text-xs font-semibold tracking-widest uppercase">
                — {COMPANY_INFO.brandIntro.quote.author},{' '}
                {COMPANY_INFO.brandIntro.quote.role}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {COMPANY_INFO.trustPoints.slice(0, 4).map((point) => {
              const Icon = iconMap[point.icon] || Sparkles
              return (
                <Card key={point.id} className="p-5" hover>
                  <div className="bg-canvas border-border-subtle mb-3 flex h-10 w-10 items-center justify-center rounded-lg border">
                    <Icon className="text-brass h-5 w-5" />
                  </div>
                  <h3 className="text-charcoal-deep mb-1 font-serif text-base font-semibold">
                    {point.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {point.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

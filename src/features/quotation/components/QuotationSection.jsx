import {
  Clock,
  Sparkles,
  ClipboardList,
  ArrowRight,
  MessageSquare,
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Briefcase,
  Hammer,
  Package,
} from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { COMPANY_INFO } from '@/constants/companyData'
import {
  QUOTATION_CATEGORIES,
  QUOTATION_JOURNEY,
  QUOTATION_PROMISE,
} from '@/constants/quotationData'
import { useQuotation } from '../hooks/useQuotation'

const PROMISE_ICONS = { Clock, Sparkles, ClipboardList }
const CATEGORY_ICONS = {
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Briefcase,
  Hammer,
  Package,
}

export const QuotationSection = () => {
  const { openQuotation, hasDraft } = useQuotation()

  return (
    <section
      id="quotation"
      className="bg-canvas section-y relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-paper-grain pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-16">
          <div className="space-y-6">
            <Badge>Free Quotation</Badge>

            <h2 className="text-text-primary font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Tell us the room.
              <br />
              We will price the whole thing.
            </h2>

            <p className="text-text-secondary max-w-lg text-base leading-relaxed">
              Answer five short questions — the pieces you have in mind, your
              space, a budget, and when you would like a call or a showroom
              visit. It lands on our studio WhatsApp as one organised brief, and
              a design consultant takes it from there.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {QUOTATION_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.icon] || Package
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => openQuotation({ categories: [category.id] })}
                    className="border-border-subtle bg-surface text-text-secondary hover:border-brass/50 hover:text-brass-dark group flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 hover:shadow-xs active:scale-[0.97]"
                  >
                    <Icon className="text-brass h-3.5 w-3.5" />
                    {category.name}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                variant="brass"
                animation="shimmer"
                onClick={() => openQuotation()}
                className="w-full sm:w-auto"
              >
                <ClipboardList className="h-4 w-4" />
                {hasDraft ? 'Resume My Quotation' : 'Start My Quotation'}
              </Button>

              <Button
                as="a"
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <MessageSquare className="text-whatsapp h-4 w-4" />
                Just Chat With Us
              </Button>
            </div>

            <dl className="border-border-subtle grid gap-5 border-t pt-6 sm:grid-cols-3">
              {QUOTATION_PROMISE.map((promise) => {
                const Icon = PROMISE_ICONS[promise.icon]
                return (
                  <div key={promise.id} className="space-y-1.5">
                    <dt className="text-text-primary text-label-md flex items-center gap-2 font-semibold">
                      <Icon className="text-brass h-4 w-4 shrink-0" />
                      {promise.title}
                    </dt>
                    <dd className="text-text-muted text-xs leading-relaxed">
                      {promise.description}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>

          <div className="border-border-subtle bg-surface shadow-editorial relative overflow-hidden rounded-3xl border p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="bg-brass/10 pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl"
            />

            <p className="text-brass-dark text-label-sm relative font-semibold tracking-[0.2em] uppercase">
              How it works
            </p>

            <ol className="relative mt-6 space-y-7">
              {QUOTATION_JOURNEY.map((stage, index) => (
                <li key={stage.id} className="relative flex gap-4">
                  {index < QUOTATION_JOURNEY.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="bg-border-subtle absolute top-11 left-[19px] h-[calc(100%+0.75rem)] w-px"
                    />
                  )}

                  <span className="border-brass-border bg-brass-light text-brass-dark relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold">
                    {stage.step}
                  </span>

                  <div className="min-w-0 space-y-1 pt-1.5">
                    <h3 className="text-text-primary font-serif text-lg">
                      {stage.title}
                    </h3>
                    <p className="text-text-secondary text-label-md leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => openQuotation()}
              className="border-border-subtle bg-surface-muted/60 hover:border-brass/50 hover:bg-brass-light/50 group mt-8 flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200"
            >
              <span>
                <span className="text-text-primary text-label-md block font-semibold">
                  {hasDraft
                    ? 'Pick up where you left off'
                    : 'Takes about two minutes'}
                </span>
                <span className="text-text-muted text-label-sm block">
                  No account, no forms in your inbox — just WhatsApp.
                </span>
              </span>
              <ArrowRight className="text-brass h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

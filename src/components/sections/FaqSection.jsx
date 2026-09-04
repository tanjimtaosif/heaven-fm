import { useState, useEffect } from 'react'
import { Badge, Button } from '@/components/ui'
import { COMPANY_INFO } from '@/constants/companyData'
import { FAQS, fetchFaqs } from '@/constants/faq'
import { MessageSquare, Phone, ChevronDown, Sparkles, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const FaqSection = () => {
  const [faqsList, setFaqsList] = useState(FAQS)
  const [openId, setOpenId] = useState(FAQS[0]?.id || null)

  // Fetch FAQs using the async loader from faq.js
  useEffect(() => {
    let isMounted = true
    fetchFaqs().then((data) => {
      if (isMounted && data) {
        setFaqsList(data)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="bg-charcoal-deep text-canvas relative border-t border-charcoal-border/60 py-20 sm:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      {/* Ambient Atelier Lighting & Background Accents */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-brass/5 absolute -top-40 right-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-charcoal-surface/40 absolute -bottom-40 left-1/10 h-80 w-80 rounded-full blur-2xl" />
        <div className="bg-atelier-rules absolute inset-0 [mask-image:linear-gradient(180deg,transparent_0%,#000_20%,#000_80%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* =================================================================
              LEFT COLUMN: STICKY FLOATING ATELIER PANEL (DESKTOP)
              Pins at top-28 on desktop while FAQs scroll smoothly up & down.
              Parent column matches height of right column; sticky container
              aligns with bottom of Question 08 at the end of scroll.
             ================================================================= */}
          <div className="relative lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="space-y-3">
                <Badge variant="brass">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Atelier Inquiries
                </Badge>
                <h2
                  id="faq-heading"
                  className="text-canvas font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]"
                >
                  Questions Answered with Atelier Clarity
                </h2>
              </div>

              <p className="text-text-inverse-muted max-w-lg text-base leading-relaxed sm:text-lg">
                Every commission we sculpt is tailored to your spatial layout,
                lifestyle, and individual taste in Chattogram. Here is clear,
                uncompromising guidance on our bespoke process, Agrabad showroom,
                materials, and white-glove delivery.
              </p>

              {/* Quick Stat / Reading Indicator */}
              <div className="flex items-center gap-3 pt-1 text-xs text-text-inverse-muted">
                <span className="flex h-2 w-2 rounded-full bg-brass animate-pulse" />
                <span>
                  {faqsList.length} Curated Questions Available
                </span>
              </div>

              {/* Desktop Concierge Callout Box */}
              <div className="hidden space-y-4 rounded-2xl border border-charcoal-border/80 bg-charcoal-surface/70 p-6 backdrop-blur-md lg:block">
                <div className="flex items-center gap-2 text-brass">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Direct Atelier Support
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-canvas">
                    Have a specific architectural drawing or custom inquiry?
                  </h3>
                  <p className="text-text-inverse-muted text-xs leading-relaxed">
                    Our principal design consultants in Agrabad are available to
                    review blueprints and furnish custom proposals.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <Button
                    as="a"
                    href={COMPANY_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="brass"
                    className="w-full justify-center rounded-full text-xs font-semibold tracking-wider uppercase hover:brightness-105"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Chat on WhatsApp
                  </Button>

                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                    className="hover:text-canvas text-text-inverse-muted flex items-center justify-center gap-2 rounded-full py-1.5 text-xs font-medium transition-colors"
                  >
                    <Phone className="text-brass h-3.5 w-3.5" />
                    Studio Desk: {COMPANY_INFO.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: INTERACTIVE ACCORDION LIST
              Scrolls smoothly alongside the sticky left column on desktop.
             ================================================================= */}
          <div
            className="flex flex-col gap-3.5 lg:col-span-7"
            role="region"
            aria-label="FAQ Accordion"
          >
            {faqsList.map((faq, index) => {
              const isOpen = openId === faq.id
              const accordionButtonId = `faq-btn-${faq.id}`
              const accordionPanelId = `faq-panel-${faq.id}`

              return (
                <div
                  key={faq.id}
                  className={cn(
                    'group rounded-2xl border transition-all duration-300',
                    isOpen
                      ? 'border-brass/50 bg-charcoal-surface/90 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)]'
                      : 'border-charcoal-border/70 bg-charcoal-surface/40 hover:border-brass/30 hover:bg-charcoal-surface/60'
                  )}
                >
                  <h3>
                    <button
                      id={accordionButtonId}
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={accordionPanelId}
                      className="focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-6"
                    >
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-medium text-brass/70">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] font-semibold tracking-widest text-brass uppercase">
                            {faq.categoryLabel}
                          </span>
                        </div>
                        <p
                          className={cn(
                            'font-serif text-base font-medium transition-colors sm:text-lg lg:text-xl',
                            isOpen
                              ? 'text-canvas'
                              : 'text-canvas/90 group-hover:text-canvas'
                          )}
                        >
                          {faq.question}
                        </p>
                      </div>

                      {/* Rotating Satin Brass Chevron Indicator */}
                      <div
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-9 sm:w-9',
                          isOpen
                            ? 'border-brass bg-brass text-charcoal-deep rotate-180 shadow-xs'
                            : 'border-charcoal-border bg-charcoal-deep/80 text-text-inverse-muted group-hover:border-brass/50 group-hover:text-canvas rotate-0'
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4 transition-transform duration-300" />
                      </div>
                    </button>
                  </h3>

                  {/* Smooth Expandable Answer Body (CSS Grid 0fr -> 1fr) */}
                  <div
                    id={accordionPanelId}
                    role="region"
                    aria-labelledby={accordionButtonId}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-charcoal-border/40 px-5 pt-4 pb-6 sm:px-6">
                        <div className="text-canvas/80 space-y-2 text-sm leading-relaxed sm:text-base sm:leading-relaxed">
                          {faq.answer.split('\n').map((line, idx) => {
                            if (line.startsWith('•')) {
                              return (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2.5 pt-1 pl-1"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                                  <span>{line.replace('•', '').trim()}</span>
                                </div>
                              )
                            }
                            return <p key={idx}>{line}</p>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Concierge Card: Positioned beneath FAQs on mobile for fluid conversion */}
        <div className="mt-8 space-y-4 rounded-2xl border border-charcoal-border/80 bg-charcoal-surface/70 p-5 backdrop-blur-md sm:p-6 lg:hidden">
          <div className="flex items-center gap-2 text-brass">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              Atelier Concierge
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-canvas">
              Still have questions about your spatial layout?
            </h3>
            <p className="text-text-inverse-muted text-xs leading-relaxed">
              Chat directly with our design consultants or visit our
              flagship studio on Agrabad Access Road.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2 sm:flex-row">
            <Button
              as="a"
              href={COMPANY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="brass"
              className="w-full justify-center rounded-full text-xs font-semibold tracking-wider uppercase hover:brightness-105"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp Concierge
            </Button>

            <Button
              as="a"
              href={`tel:${COMPANY_INFO.contact.phoneClean}`}
              size="sm"
              variant="outlineDark"
              className="w-full justify-center rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Studio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

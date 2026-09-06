import { Fragment } from 'react'
import heroBg from '@/assets/hero-bg.webp'
import { COMPANY_INFO } from '@/constants/companyData'
import { Button, Badge } from '@/components/ui'
import { Sparkles, ArrowRight, ClipboardList } from 'lucide-react'
import { useIsCompact, useIsDesktop } from '@/hooks'
import { HeroInlineFilm } from './HeroInlineFilm'
import { useQuotation } from '@/features/quotation'

const CREDENTIALS = [
  'Agrabad Atelier',
  '100% Bespoke',
  'Free Design Consultation',
]

export const HeroSection = () => {
  const { openQuotation } = useQuotation()
  const words = COMPANY_INFO.hero.headline.split(' ')

  const isDesktop = useIsDesktop()

  const isCompact = useIsCompact()

  return (
    <section
      id="hero"
      className="relative flex w-full flex-col items-center justify-center overflow-x-clip pt-28 pb-12 sm:pt-32 sm:pb-14 lg:min-h-dvh lg:pt-28 lg:pb-10"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-dvh overflow-hidden mask-[linear-gradient(180deg,black_0%,black_65%,transparent_100%)] select-none lg:inset-0 lg:h-full"
        aria-hidden="true"
      >
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-center opacity-38 mix-blend-multiply"
        />
        <div className="45% absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-[#f0eae1]/85" />
      </div>
      <div
        className="animate-veil-lift pointer-events-none absolute inset-y-0 left-7 hidden items-center xl:flex"
        style={{ animationDelay: '900ms' }}
        aria-hidden="true"
      >
        <div className="flex h-[44vh] flex-col items-center gap-6">
          <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
          <span className="text-text-muted text-label-xs rotate-180 tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
            Est. {COMPANY_INFO.foundedYear}
          </span>
        </div>
      </div>

      <div
        className="animate-veil-lift pointer-events-none absolute inset-y-0 right-7 hidden items-center xl:flex"
        style={{ animationDelay: '900ms' }}
        aria-hidden="true"
      >
        <div className="flex h-[44vh] flex-col items-center gap-6">
          <span className="text-text-muted text-label-xs tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
            Agrabad · Chattogram
          </span>
          <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
        </div>
      </div>

      <div className="container-page relative py-1 sm:py-2">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="animate-veil-lift flex items-center justify-center gap-4"
            style={{ animationDelay: '60ms' }}
          >
            <span
              className="to-brass/45 hidden h-px w-12 bg-linear-to-r from-transparent sm:block lg:w-16"
              aria-hidden="true"
            />
            <Badge
              variant="brass"
              className="border-brass-border/60 text-wood-walnut/90 shadow-subtle sm:text-label-xs gap-1.5 bg-white/75 px-2.5 py-1 text-[10px] tracking-[0.15em] whitespace-nowrap backdrop-blur-sm sm:px-4 sm:py-1.5 sm:tracking-[0.24em]"
            >
              <Sparkles className="text-brass h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
              <span>{COMPANY_INFO.hero.badge}</span>
            </Badge>
            <span
              className="to-brass/45 hidden h-px w-12 bg-linear-to-l from-transparent sm:block lg:w-16"
              aria-hidden="true"
            />
          </div>

          <h1 className="text-charcoal-deep text-display-lg relative mt-4 font-serif font-semibold text-balance sm:mt-5">
            {words.map((word, index) => {
              const isLast = index === words.length - 1
              return (
                <Fragment key={`${word}-${index}`}>
                  <span className="mx-[-0.08em] mt-[-0.08em] mb-[-0.2em] inline-block overflow-hidden px-[0.08em] pt-[0.08em] pb-[0.2em] align-bottom">
                    <span
                      className="animate-word-rise inline-block"
                      style={{ animationDelay: `${140 + index * 80}ms` }}
                    >
                      {isLast ? (
                        <span className="text-brass-dark relative font-serif italic">
                          {word}
                          <span
                            className="from-brass/0 via-brass/70 to-brass/0 animate-hairline-draw absolute inset-x-0 bottom-[-0.04em] h-px bg-linear-to-r"
                            style={{
                              animationDelay: `${360 + words.length * 70}ms`,
                            }}
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  </span>
                  {!isLast && ' '}
                </Fragment>
              )
            })}

            <span
              className="animate-satin-pass pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/55 to-transparent mix-blend-overlay"
              aria-hidden="true"
            />
          </h1>

          <div
            className="animate-veil-lift mt-4 flex items-center justify-center gap-3 sm:mt-5"
            style={{ animationDelay: `${300 + words.length * 70}ms` }}
            aria-hidden="true"
          >
            <span className="to-brass/40 h-px w-10 bg-linear-to-r from-transparent sm:w-14" />
            <span className="bg-brass/70 h-1 w-1 rotate-45" />
            <span className="to-brass/40 h-px w-10 bg-linear-to-l from-transparent sm:w-14" />
          </div>

          <p
            className="text-text-secondary animate-veil-lift mx-auto mt-4 max-w-xl text-sm leading-[1.75] font-light text-pretty sm:mt-5 sm:text-base"
            style={{ animationDelay: `${380 + words.length * 70}ms` }}
          >
            {COMPANY_INFO.hero.subheadline}
          </p>

          <div
            className="animate-veil-lift mt-6 flex flex-row items-center justify-center gap-3 sm:mt-7 sm:gap-4"
            style={{ animationDelay: `${470 + words.length * 70}ms` }}
          >
            <Button
              onClick={() => openQuotation()}
              size="lg"
              variant="primary"
              animation="shimmer"
              textRoll={true}
              rollType="stagger"
              className="flex-1 px-4 shadow-[0_14px_30px_-12px_rgba(15,30,33,0.55)] sm:flex-none sm:px-6"
            >
              <ClipboardList className="text-brass h-4 w-4" />
              {COMPANY_INFO.hero.primaryCta}
            </Button>

            <Button
              as="a"
              href="#collections"
              size="lg"
              variant="outline"
              animation="slide-arrow"
              textRoll={true}
              rollType="phrase"
              className="border-border-warm/90 flex-1 bg-white/50 px-4 backdrop-blur-sm sm:flex-none sm:px-6"
            >
              {isCompact
                ? COMPANY_INFO.hero.secondaryCtaShort
                : COMPANY_INFO.hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="text-text-muted animate-veil-lift text-label-xs sm:text-label-sm mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 tracking-[0.24em] uppercase sm:mt-6"
            style={{ animationDelay: `${560 + words.length * 70}ms` }}
          >
            {CREDENTIALS.map((item, index) => (
              <Fragment key={item}>
                {index > 0 && (
                  <span
                    className="bg-brass/60 h-0.75 w-0.75 rotate-45"
                    aria-hidden="true"
                  />
                )}
                <span>{item}</span>
              </Fragment>
            ))}
          </div>

          <div
            className="animate-veil-lift mt-5 flex justify-center sm:mt-6"
            style={{ animationDelay: `${650 + words.length * 70}ms` }}
            aria-hidden="true"
          >
            <div className="from-border-warm relative h-8 w-px overflow-hidden bg-linear-to-b to-transparent sm:h-10">
              <span className="via-brass animate-thread-fall absolute inset-x-0 top-0 h-4 bg-linear-to-b from-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {!isDesktop && <HeroInlineFilm />}
    </section>
  )
}

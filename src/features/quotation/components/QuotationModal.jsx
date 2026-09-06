import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Send,
  Copy,
  Check,
  Mail,
  Layers,
  Palette,
  User,
  CalendarDays,
  CheckCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { COMPANY_INFO } from '@/constants/companyData'
import { QUOTATION_STEPS } from '@/constants/quotationData'
import { useCart } from '@/features/cart'
import { cn } from '@/lib/utils'
import { useQuotation } from '../hooks/useQuotation'
import { generateReference, validateStep } from '../utils/quotationSchema'
import {
  buildQuotationMessage,
  buildWhatsappUrl,
  buildMailtoUrl,
} from '../utils/buildQuotationMessage'
import { ScopeStep } from './steps/ScopeStep'
import { SpecsStep } from './steps/SpecsStep'
import { ContactStep } from './steps/ContactStep'
import { AppointmentStep } from './steps/AppointmentStep'
import { ReviewStep } from './steps/ReviewStep'

const STEP_ICONS = { Layers, Palette, User, CalendarDays, Send }

/**
 * Mounted only while the dialog is open, so every session starts on step one
 * with a fresh reference — the answers themselves live on in the provider.
 */
const QuotationDialog = () => {
  const { closeQuotation, form, updateForm, toggleInArray, resetForm } =
    useQuotation()
  const { items: bagItems, subtotalFormatted } = useCart()

  const [stepIndex, setStepIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [isSent, setIsSent] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [reference] = useState(generateReference)

  const panelRef = useRef(null)
  const scrollRef = useRef(null)

  const step = QUOTATION_STEPS[stepIndex]
  const isLastStep = stepIndex === QUOTATION_STEPS.length - 1
  const remaining = QUOTATION_STEPS.length - stepIndex - 1

  const message = useMemo(
    () => buildQuotationMessage({ form, reference, bagItems }),
    [form, reference, bagItems]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeQuotation()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [closeQuotation])

  // Every step change starts at the top of the panel, not mid-form.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stepIndex])

  const goToStep = useCallback((stepId) => {
    const index = QUOTATION_STEPS.findIndex((s) => s.id === stepId)
    if (index > -1) {
      setErrors({})
      setStepIndex(index)
    }
  }, [])

  const handleNext = () => {
    const stepErrors = validateStep(step.id, form)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    setStepIndex((prev) => Math.min(prev + 1, QUOTATION_STEPS.length - 1))
  }

  const handleBack = () => {
    setErrors({})
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  /** Jumping ahead via the rail must not skip an unfinished earlier step. */
  const handleRailClick = (targetIndex) => {
    if (targetIndex <= stepIndex) {
      setErrors({})
      setStepIndex(targetIndex)
      return
    }

    for (let i = stepIndex; i < targetIndex; i += 1) {
      const stepErrors = validateStep(QUOTATION_STEPS[i].id, form)
      if (Object.keys(stepErrors).length > 0) {
        setStepIndex(i)
        setErrors(stepErrors)
        return
      }
    }
    setErrors({})
    setStepIndex(targetIndex)
  }

  const handleSend = () => {
    // Re-check everything — a rail jump or a restored draft can leave a gap.
    for (const candidate of QUOTATION_STEPS) {
      const stepErrors = validateStep(candidate.id, form)
      if (Object.keys(stepErrors).length > 0) {
        goToStep(candidate.id)
        setErrors(stepErrors)
        return
      }
    }

    window.open(buildWhatsappUrl(message), '_blank', 'noopener,noreferrer')
    setIsSent(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2200)
    } catch (err) {
      console.error('Could not copy the quotation message', err)
    }
  }

  const handleStartOver = () => {
    resetForm()
    setStepIndex(0)
    setErrors({})
    setIsSent(false)
  }

  const stepProps = {
    form,
    errors,
    updateForm,
    toggleInArray,
    bagItems,
    bagSubtotalFormatted: subtotalFormatted,
  }

  const progress = ((stepIndex + 1) / QUOTATION_STEPS.length) * 100

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={closeQuotation}
      role="dialog"
      aria-modal="true"
      aria-label="Request a quotation"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in border-border-subtle bg-canvas relative flex h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border shadow-2xl outline-none sm:h-auto sm:max-h-[92vh] sm:rounded-3xl md:flex-row"
      >
        <button
          type="button"
          onClick={closeQuotation}
          className="bg-surface/90 text-text-primary hover:bg-surface-muted absolute top-4 right-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur-xs transition-colors"
          aria-label="Close quotation form"
        >
          <X className="h-5 w-5" />
        </button>

        <aside className="bg-charcoal-deep text-canvas hidden w-64 shrink-0 flex-col justify-between p-6 md:flex lg:w-72">
          <div>
            <p className="text-brass text-label-xs font-semibold tracking-[0.22em] uppercase">
              {COMPANY_INFO.name}
            </p>
            <h2 className="text-canvas mt-2 font-serif text-2xl leading-tight">
              Request a Quotation
            </h2>
            <p className="text-text-inverse-muted mt-2 text-xs leading-relaxed">
              Five short steps. It reaches our design desk on WhatsApp the
              moment you send it.
            </p>

            <ol className="mt-8 space-y-1">
              {QUOTATION_STEPS.map((entry, index) => {
                const Icon = STEP_ICONS[entry.icon]
                const isActive = index === stepIndex
                const isDone = index < stepIndex

                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => handleRailClick(index)}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                        isActive
                          ? 'bg-charcoal-surface'
                          : 'hover:bg-charcoal-surface/60'
                      )}
                    >
                      <span
                        className={cn(
                          'text-label-sm flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-bold transition-colors',
                          isActive
                            ? 'border-brass bg-brass text-charcoal-deep'
                            : isDone
                              ? 'border-brass/50 text-brass'
                              : 'border-charcoal-border text-text-inverse-muted'
                        )}
                      >
                        {isDone ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : (
                          <Icon className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            'block text-xs font-semibold',
                            isActive ? 'text-canvas' : 'text-text-inverse-muted'
                          )}
                        >
                          {entry.title}
                        </span>
                        <span className="text-text-inverse-muted/70 text-label-xs block">
                          {entry.caption}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="border-charcoal-border mt-8 border-t pt-4">
            <p className="text-text-inverse-muted/80 text-label-sm">
              Prefer to talk first?
            </p>
            <a
              href={`tel:${COMPANY_INFO.contact.phoneClean}`}
              className="text-brass hover:text-brass-hover mt-1 block text-xs font-semibold"
            >
              {COMPANY_INFO.contact.phone}
            </a>
            <p className="text-text-inverse-muted/50 text-label-xs mt-3 flex items-center gap-1 font-mono">
              <Sparkles className="h-2.5 w-2.5" />
              {reference}
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 grow flex-col">
          <header className="border-border-subtle bg-surface shrink-0 border-b px-5 py-4 md:hidden">
            <div className="flex items-center gap-3 pr-12">
              <span className="bg-charcoal-deep text-brass text-label-sm flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold">
                {stepIndex + 1}
              </span>
              <div className="min-w-0">
                <p className="text-text-primary text-label-md truncate font-semibold">
                  {step.title}
                </p>
                <p className="text-text-muted text-label-sm truncate">
                  Step {stepIndex + 1} of {QUOTATION_STEPS.length} ·{' '}
                  {step.caption}
                </p>
              </div>
            </div>
          </header>

          <div className="bg-surface-muted h-0.5 shrink-0">
            <div
              className="bg-brass h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {isSent ? (
            <div className="flex grow flex-col items-center justify-center gap-5 p-8 text-center">
              <span className="bg-brass-light text-brass-dark animate-scale-in flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCheck className="h-8 w-8" />
              </span>

              <div className="space-y-2">
                <h3 className="text-text-primary font-serif text-2xl">
                  Your brief is on its way
                </h3>
                <p className="text-text-secondary text-label-md mx-auto max-w-sm leading-relaxed">
                  WhatsApp should be open with everything filled in — press send
                  there and a consultant replies within business hours. Keep
                  reference{' '}
                  <span className="text-text-primary font-semibold">
                    {reference}
                  </span>{' '}
                  handy.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="border-border-warm text-text-primary hover:bg-surface-muted flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors"
                >
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {isCopied ? 'Copied' : 'Copy the message'}
                </button>

                <a
                  href={buildMailtoUrl(message, reference)}
                  className="border-border-warm text-text-primary hover:bg-surface-muted flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email it instead
                </a>

                <button
                  type="button"
                  onClick={handleStartOver}
                  className="text-text-muted hover:text-text-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start a new quote
                </button>
              </div>

              <button
                type="button"
                onClick={closeQuotation}
                className="bg-charcoal-deep text-brass hover:bg-charcoal-surface mt-2 cursor-pointer rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="min-h-0 grow overflow-y-auto px-5 py-6 sm:px-7 sm:py-7"
              >
                {step.id === 'scope' && <ScopeStep {...stepProps} />}
                {step.id === 'specs' && <SpecsStep {...stepProps} />}
                {step.id === 'contact' && <ContactStep {...stepProps} />}
                {step.id === 'appointment' && (
                  <AppointmentStep {...stepProps} />
                )}
                {step.id === 'review' && (
                  <ReviewStep
                    form={form}
                    reference={reference}
                    bagItems={bagItems}
                    bagSubtotalFormatted={subtotalFormatted}
                    message={message}
                    onEditStep={goToStep}
                  />
                )}
              </div>

              <footer className="border-border-subtle bg-surface flex shrink-0 items-center gap-3 border-t px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="border-border-warm text-text-primary hover:bg-surface-muted flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <p className="text-text-muted text-label-sm hidden grow sm:block">
                  {isLastStep
                    ? 'Opens WhatsApp with the full brief ready to send.'
                    : `${remaining} step${remaining === 1 ? '' : 's'} to go`}
                </p>

                {isLastStep ? (
                  <button
                    type="button"
                    onClick={handleSend}
                    className="bg-whatsapp hover:bg-whatsapp-hover ml-auto flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-colors active:scale-[0.98] sm:ml-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send on WhatsApp
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-charcoal-deep text-brass hover:bg-charcoal-surface ml-auto flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide shadow-sm transition-colors active:scale-[0.98] sm:ml-0"
                  >
                    Continue
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </footer>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export const QuotationModal = () => {
  const { isQuotationOpen } = useQuotation()

  if (!isQuotationOpen) return null

  return <QuotationDialog />
}

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
  CheckCheck,
  RotateCcw,
} from 'lucide-react'
import { QUOTATION_STEPS } from '@/constants/quotationData'
import { COMPANY_INFO } from '@/constants/companyData'
import { useCart } from '@/features/cart'
import { useLenis } from '@/components/providers'
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

/**
 * Mounted only while the dialog is open, so every session starts on step one
 * with a fresh reference — the answers themselves live on in the provider.
 */
const QuotationDialog = () => {
  const { closeQuotation, form, updateForm, toggleInArray, resetForm } =
    useQuotation()
  const { items: bagItems, subtotalFormatted } = useCart()
  const lenis = useLenis()

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
    if (lenis) lenis.stop()
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (lenis) lenis.start()
      document.body.style.overflow = ''
    }
  }, [closeQuotation, lenis])

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

  /** Jumping ahead via the progress rail must not skip an unfinished step. */
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

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={closeQuotation}
      role="dialog"
      aria-modal="true"
      aria-label="Request a quotation"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in border-border-subtle bg-canvas relative flex h-[92dvh] max-h-[92dvh] min-h-0 w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border shadow-2xl outline-none sm:h-auto sm:rounded-3xl"
      >
        <header className="border-border-subtle bg-surface shrink-0 border-b px-5 pt-4 pb-3.5 sm:px-8 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-text-primary font-serif text-lg leading-tight sm:text-xl">
                Request a Quotation
              </h2>
              <p className="text-text-muted text-label-md mt-1 truncate">
                Step {stepIndex + 1} of {QUOTATION_STEPS.length} ·{' '}
                {step.caption}
              </p>
            </div>

            <button
              type="button"
              onClick={closeQuotation}
              className="text-text-muted hover:bg-surface-muted hover:text-text-primary -mt-1 -mr-1.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
              aria-label="Close quotation form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-4 flex gap-1.5" aria-label="Quotation steps">
            {QUOTATION_STEPS.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleRailClick(index)}
                aria-label={`Step ${index + 1}, ${entry.title}`}
                aria-current={index === stepIndex ? 'step' : undefined}
                className="group flex-1 cursor-pointer py-1.5"
              >
                <span
                  className={cn(
                    'block h-0.5 rounded-full transition-colors duration-300',
                    index <= stepIndex
                      ? 'bg-brass'
                      : 'bg-border-warm group-hover:bg-brass/40'
                  )}
                />
              </button>
            ))}
          </nav>
        </header>

        {isSent ? (
          <div className="flex min-h-0 grow flex-col items-center justify-center gap-5 overflow-y-auto overscroll-contain p-6 text-center sm:p-10">
            <span className="bg-brass-light text-brass-dark animate-scale-in flex h-14 w-14 items-center justify-center rounded-full">
              <CheckCheck className="h-7 w-7" />
            </span>

            <div className="space-y-2">
              <h3 className="text-text-primary font-serif text-2xl">
                Your brief is on its way
              </h3>
              <p className="text-text-secondary text-label-md mx-auto max-w-sm leading-relaxed">
                WhatsApp should be open with everything filled in. Press send
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

            <a
              href={`tel:${COMPANY_INFO.contact.phoneClean}`}
              className="text-text-muted hover:text-brass-dark text-label-sm transition-colors"
            >
              Prefer to talk? Call {COMPANY_INFO.contact.phone}
            </a>
          </div>
        ) : (
          <>
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="min-h-0 grow overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7"
            >
              {step.id === 'scope' && <ScopeStep {...stepProps} />}
              {step.id === 'specs' && <SpecsStep {...stepProps} />}
              {step.id === 'contact' && <ContactStep {...stepProps} />}
              {step.id === 'appointment' && <AppointmentStep {...stepProps} />}
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

            <footer className="border-border-subtle bg-surface flex shrink-0 items-center gap-3 border-t px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={stepIndex === 0}
                className="border-border-warm text-text-primary hover:bg-surface-muted flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-40"
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
    </div>,
    document.body
  )
}

export const QuotationModal = () => {
  const { isQuotationOpen } = useQuotation()

  if (!isQuotationOpen) return null

  return <QuotationDialog />
}

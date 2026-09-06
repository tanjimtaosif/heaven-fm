import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Form controls now live in the shared UI layer so the checkout page and the
// quotation flow render identical fields. Re-exported here so the existing
// step imports keep working.
export {
  FieldShell,
  TextField,
  SelectField,
  TextAreaField,
} from '@/components/ui'

/** Pill toggle used for every multi-select list of tags. */
export const Chip = ({ selected, className, children, ...props }) => (
  <button
    type="button"
    aria-pressed={selected}
    className={cn(
      'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 active:scale-[0.97]',
      selected
        ? 'border-brass bg-brass-light text-wood-walnut shadow-xs'
        : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/50 hover:bg-surface-muted',
      className
    )}
    {...props}
  >
    {children}
  </button>
)

/** Larger card option — single or multi select, with an optional icon. */
export const OptionCard = ({
  selected,
  icon: Icon,
  title,
  hint,
  compact,
  ...props
}) => (
  <button
    type="button"
    aria-pressed={selected}
    className={cn(
      'group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.99]',
      compact && 'p-3',
      selected
        ? 'border-brass bg-brass-light/70 shadow-xs'
        : 'border-border-subtle bg-surface hover:border-brass/45 hover:bg-surface-muted/60'
    )}
    {...props}
  >
    {Icon && (
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors',
          selected
            ? 'bg-charcoal-deep text-brass'
            : 'bg-surface-muted text-text-secondary group-hover:text-brass-dark'
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
    )}

    <span className="min-w-0 grow">
      <span className="text-text-primary text-label-md block font-semibold">
        {title}
      </span>
      {hint && (
        <span className="text-text-muted text-label-sm mt-0.5 block leading-snug">
          {hint}
        </span>
      )}
    </span>

    <span
      className={cn(
        'mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all',
        selected
          ? 'border-brass bg-brass text-charcoal-deep'
          : 'border-border-warm bg-transparent'
      )}
    >
      {selected && <Check className="h-3 w-3" strokeWidth={3} />}
    </span>
  </button>
)

export const SwitchRow = ({ checked, onChange, title, hint }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="border-border-subtle bg-surface hover:border-brass/40 flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors"
  >
    <span className="min-w-0 grow">
      <span className="text-text-primary text-label-md block font-semibold">
        {title}
      </span>
      {hint && (
        <span className="text-text-muted text-label-sm mt-0.5 block leading-snug">
          {hint}
        </span>
      )}
    </span>
    <span
      className={cn(
        'relative h-5.5 w-10 shrink-0 rounded-full transition-colors duration-200',
        checked ? 'bg-brass' : 'bg-border-warm'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </span>
  </button>
)

export const StepIntro = ({ eyebrow, title, description }) => (
  <header className="space-y-1.5">
    <p className="text-brass-dark text-label-sm font-semibold tracking-[0.18em] uppercase">
      {eyebrow}
    </p>
    <h3 className="text-text-primary font-serif text-xl sm:text-2xl">
      {title}
    </h3>
    <p className="text-text-secondary text-label-md leading-relaxed">
      {description}
    </p>
  </header>
)

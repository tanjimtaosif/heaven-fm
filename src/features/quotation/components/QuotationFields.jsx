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
  DatePickerField,
} from '@/components/ui'

/** Pill toggle used for every multi-select list of tags. */
export const Chip = ({ selected, className, children, ...props }) => (
  <button
    type="button"
    aria-pressed={selected}
    className={cn(
      'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 active:scale-[0.97]',
      selected
        ? 'border-brass bg-brass-light text-wood-walnut'
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
      'group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition-colors duration-200 active:scale-[0.99]',
      compact && 'items-center p-3',
      selected
        ? 'border-brass bg-brass-light/50'
        : 'border-border-subtle bg-surface hover:border-brass/45'
    )}
    {...props}
  >
    {Icon && (
      <Icon
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 transition-colors',
          selected ? 'text-brass-dark' : 'text-text-muted'
        )}
      />
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
        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
        compact && 'mt-0',
        selected
          ? 'border-brass bg-brass text-charcoal-deep'
          : 'border-border-warm bg-transparent'
      )}
    >
      {selected && <Check className="h-2.5 w-2.5" strokeWidth={3.5} />}
    </span>
  </button>
)

export const SwitchRow = ({ checked, onChange, title, hint }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="border-border-subtle bg-surface hover:border-brass/40 flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-left transition-colors"
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

export const StepIntro = ({ title, description }) => (
  <header className="space-y-1.5">
    <h3 className="text-text-primary font-serif text-xl leading-snug sm:text-2xl">
      {title}
    </h3>
    <p className="text-text-secondary text-label-md leading-relaxed">
      {description}
    </p>
  </header>
)

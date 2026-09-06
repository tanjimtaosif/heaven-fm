import { useId } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { controlStyles, inputStyles } from './fieldStyles'

export const FieldShell = ({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <label
        htmlFor={htmlFor}
        className="text-text-primary text-label-md font-semibold tracking-wide"
      >
        {label}
        {required && <span className="text-brass-dark ml-1">*</span>}
      </label>
      {hint && <span className="text-text-muted text-label-sm">{hint}</span>}
    </div>

    {children}

    {error && (
      <p
        role="alert"
        className="text-destructive text-label-sm flex items-center gap-1.5 font-medium"
      >
        <CircleAlert className="h-3.5 w-3.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
)

export const TextField = ({ label, hint, error, required, ...props }) => {
  const id = useId()
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={id}
    >
      <input
        id={id}
        className={controlStyles(!!error)}
        aria-invalid={!!error}
        {...props}
      />
    </FieldShell>
  )
}

export const SelectField = ({
  label,
  hint,
  error,
  required,
  options,
  ...props
}) => {
  const id = useId()
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={id}
    >
      <select
        id={id}
        className={cn(controlStyles(!!error), 'cursor-pointer appearance-none')}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export const TextAreaField = ({ label, hint, error, required, ...props }) => {
  const id = useId()
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={id}
    >
      <textarea
        id={id}
        rows={3}
        className={cn(inputStyles(!!error), 'resize-y py-2.5 leading-relaxed')}
        aria-invalid={!!error}
        {...props}
      />
    </FieldShell>
  )
}

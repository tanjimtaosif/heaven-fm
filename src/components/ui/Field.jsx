import { useState, useEffect, useRef, useId, useMemo } from 'react'
import { CircleAlert, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { controlStyles, inputStyles } from './fieldStyles'
export { DatePickerField } from './DatePickerField'

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
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  icon: Icon,
  className,
  id: customId,
  name,
}) => {
  const generatedId = useId()
  const id = customId || generatedId
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'object' && opt !== null) {
        return { value: opt.value, label: opt.label || opt.value }
      }
      return { value: opt, label: opt }
    })
  }, [options])

  const selectedOption = normalizedOptions.find((opt) => opt.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (val) => {
    if (onChange) {
      onChange({
        target: { value: val, name },
        currentTarget: { value: val, name },
        value: val,
      })
    }
    setIsOpen(false)
  }

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      htmlFor={id}
      className={className}
    >
      <div ref={containerRef} className="relative w-full">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={cn(
            controlStyles(!!error),
            'flex cursor-pointer items-center justify-between gap-2.5 text-left transition-all duration-200 select-none',
            isOpen && 'border-brass ring-brass/35 ring-2',
            !selectedOption && 'text-text-muted',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            {Icon && (
              <Icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  selectedOption ? 'text-brass-dark' : 'text-text-muted'
                )}
              />
            )}
            <span
              className={cn(
                'truncate text-sm',
                selectedOption
                  ? 'text-text-primary font-medium'
                  : 'text-text-muted'
              )}
            >
              {displayText}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'text-text-muted h-4 w-4 shrink-0 transition-transform duration-200',
              isOpen && 'text-brass-dark rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className="animate-in fade-in zoom-in-95 border-border-warm/80 bg-surface shadow-wood-walnut/12 absolute top-[calc(100%+6px)] left-0 z-50 w-full overflow-hidden rounded-xl border p-1.5 shadow-xl backdrop-blur-sm duration-150"
          >
            <div className="max-h-56 space-y-0.5 overflow-y-auto">
              {normalizedOptions.map((opt) => {
                const isSelected = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      isSelected
                        ? 'bg-brass-light text-brass-dark font-medium'
                        : 'text-text-primary hover:bg-surface-muted hover:text-wood-walnut'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="text-brass-dark h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
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

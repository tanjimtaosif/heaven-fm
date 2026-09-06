import { useState, useEffect, useRef, useId, useMemo } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldShell } from './Field'
import { controlStyles } from './fieldStyles'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function parseKey(key) {
  if (!key) return null
  const [y, m, d] = key.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function defaultFormatDate(key) {
  const parsed = parseKey(key)
  if (!parsed) return ''
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const DatePickerField = ({
  label,
  hint,
  error,
  required,
  value = '',
  onChange,
  min,
  max,
  placeholder = 'Choose a preferred date',
  formatDate = defaultFormatDate,
  className,
  id: customId,
  name,
  disabled = false,
}) => {
  const generatedId = useId()
  const id = customId || generatedId
  const containerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const today = useMemo(() => new Date(), [])
  const todayKey = useMemo(
    () => toKey(today.getFullYear(), today.getMonth(), today.getDate()),
    [today]
  )

  // Current calendar view month and year
  const initialView = useMemo(() => {
    const fromVal = parseKey(value)
    if (fromVal)
      return { year: fromVal.getFullYear(), month: fromVal.getMonth() }
    const fromMin = parseKey(min)
    if (fromMin)
      return { year: fromMin.getFullYear(), month: fromMin.getMonth() }
    return { year: today.getFullYear(), month: today.getMonth() }
  }, [value, min, today])

  const [viewDate, setViewDate] = useState(initialView)

  const handleToggleOpen = () => {
    if (disabled) return
    if (!isOpen) {
      const parsed = parseKey(value) || parseKey(min)
      if (parsed) {
        setViewDate({ year: parsed.getFullYear(), month: parsed.getMonth() })
      }
    }
    setIsOpen((prev) => !prev)
  }

  // Close when clicking outside or pressing Escape
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

  // Month navigation restrictions
  const minDate = useMemo(() => parseKey(min), [min])
  const maxDate = useMemo(() => parseKey(max), [max])

  const canGoPrev = useMemo(() => {
    if (!minDate) return true
    const currentMonthIndex = viewDate.year * 12 + viewDate.month
    const minMonthIndex = minDate.getFullYear() * 12 + minDate.getMonth()
    return currentMonthIndex > minMonthIndex
  }, [minDate, viewDate])

  const canGoNext = useMemo(() => {
    if (!maxDate) return true
    const currentMonthIndex = viewDate.year * 12 + viewDate.month
    const maxMonthIndex = maxDate.getFullYear() * 12 + maxDate.getMonth()
    return currentMonthIndex < maxMonthIndex
  }, [maxDate, viewDate])

  const handlePrevMonth = () => {
    if (!canGoPrev) return
    setViewDate((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 }
    )
  }

  const handleNextMonth = () => {
    if (!canGoNext) return
    setViewDate((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 }
    )
  }

  const handleSelectDate = (dateKey) => {
    if (onChange) {
      onChange({
        target: { value: dateKey, name },
        currentTarget: { value: dateKey, name },
        value: dateKey,
      })
    }
    setIsOpen(false)
  }

  // Days calculations
  const { paddingDays, daysInMonth } = useMemo(() => {
    const firstDayOfWeek = new Date(viewDate.year, viewDate.month, 1).getDay()
    const days = new Date(viewDate.year, viewDate.month + 1, 0).getDate()
    return {
      paddingDays: firstDayOfWeek,
      daysInMonth: days,
    }
  }, [viewDate])

  const displayText = value ? formatDate(value) : placeholder
  const isTodayBookable = (!min || todayKey >= min) && (!max || todayKey <= max)

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
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={handleToggleOpen}
          className={cn(
            controlStyles(!!error),
            'flex cursor-pointer items-center justify-between gap-2.5 text-left transition-all duration-200 select-none',
            isOpen && 'border-brass ring-brass/35 ring-2',
            !value && 'text-text-muted',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <Calendar
              className={cn(
                'h-4 w-4 shrink-0 transition-colors',
                value ? 'text-brass-dark' : 'text-text-muted'
              )}
            />
            <span
              className={cn(
                'truncate text-sm',
                value ? 'text-text-primary font-medium' : 'text-text-muted'
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
            role="dialog"
            aria-label="Choose date"
            className="animate-in fade-in zoom-in-95 border-border-warm/80 bg-surface shadow-wood-walnut/12 absolute top-[calc(100%+6px)] left-0 z-50 w-full rounded-2xl border p-4 shadow-xl backdrop-blur-sm duration-150 select-none sm:w-[320px]"
          >
            {/* Calendar Header */}
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-text-primary font-serif text-sm font-semibold tracking-wide">
                {MONTH_NAMES[viewDate.month]} {viewDate.year}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={!canGoPrev}
                  aria-label="Previous month"
                  className="hover:bg-surface-muted text-text-muted hover:text-text-primary flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  disabled={!canGoNext}
                  aria-label="Next month"
                  className="hover:bg-surface-muted text-text-muted hover:text-text-primary flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-20"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="mb-1.5 grid grid-cols-7 text-center">
              {WEEKDAY_NAMES.map((day) => (
                <span
                  key={day}
                  className="text-text-muted/75 text-[11px] font-semibold tracking-wider uppercase"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 place-items-center gap-1">
              {Array.from({ length: paddingDays }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8.5 w-8.5" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const dateKey = toKey(viewDate.year, viewDate.month, day)
                  const isDisabled =
                    (min && dateKey < min) || (max && dateKey > max)
                  const isSelected = dateKey === value
                  const isToday = dateKey === todayKey

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleSelectDate(dateKey)}
                      className={cn(
                        'flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl text-xs font-medium transition-colors duration-150',
                        isSelected
                          ? 'bg-brass text-charcoal-deep ring-brass/30 font-bold shadow-xs ring-2'
                          : isToday
                            ? 'border-brass/50 text-brass-dark bg-brass-light/40 border font-semibold'
                            : isDisabled
                              ? 'text-text-muted/30 pointer-events-none cursor-not-allowed opacity-35'
                              : 'text-text-primary hover:bg-brass-light hover:text-wood-walnut'
                      )}
                    >
                      {day}
                    </button>
                  )
                }
              )}
            </div>

            {/* Footer Bar */}
            <div className="border-border-subtle/80 text-label-sm mt-3 flex items-center justify-between border-t pt-2.5">
              {isTodayBookable ? (
                <button
                  type="button"
                  onClick={() => handleSelectDate(todayKey)}
                  className="text-brass-dark cursor-pointer font-medium hover:underline"
                >
                  {value === todayKey ? 'Today selected' : 'Choose today'}
                </button>
              ) : (
                <span className="text-text-muted text-[11px]">
                  Appointments 45d window
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </FieldShell>
  )
}

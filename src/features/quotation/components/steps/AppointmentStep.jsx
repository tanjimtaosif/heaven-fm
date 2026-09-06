import { useMemo } from 'react'
import { Phone, Video, Store, MapPin, Info } from 'lucide-react'
import {
  CONSULTATION_MODES,
  REFERRAL_SOURCES,
  TIME_SLOTS,
} from '@/constants/quotationData'
import { COMPANY_INFO } from '@/constants/companyData'
import {
  Chip,
  FieldShell,
  OptionCard,
  StepIntro,
  TextAreaField,
} from '../QuotationFields'
import {
  formatLongDate,
  getAvailableSlots,
  getBookingRange,
  getDayNote,
} from '../../utils/quotationSchema'
import { cn } from '@/lib/utils'

const ICONS = { Phone, Video, Store, MapPin }

export const AppointmentStep = ({ form, errors, updateForm }) => {
  const { min, max } = useMemo(() => getBookingRange(), [])
  const availableSlots = useMemo(
    () => getAvailableSlots(form.preferredDate),
    [form.preferredDate]
  )
  const dayNote = getDayNote(form.preferredDate)

  const handleDateChange = (value) => {
    // A slot that no longer exists on the new date must not silently survive.
    const stillValid = getAvailableSlots(value).some(
      (slot) => slot.id === form.timeSlot
    )
    updateForm({
      preferredDate: value,
      timeSlot: stillValid ? form.timeSlot : '',
    })
  }

  return (
    <div className="space-y-7">
      <StepIntro
        eyebrow="Step 4 of 5"
        title="A call, or shall we meet?"
        description="Pick how you would like to talk it through, then a day and a window that suits you. We confirm on WhatsApp."
      />

      <FieldShell
        label="Preferred way to talk"
        error={errors.consultationMode}
        required
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {CONSULTATION_MODES.map((mode) => (
            <OptionCard
              key={mode.id}
              icon={ICONS[mode.icon]}
              title={mode.label}
              hint={mode.hint}
              selected={form.consultationMode === mode.id}
              onClick={() => updateForm({ consultationMode: mode.id })}
            />
          ))}
        </div>
      </FieldShell>

      {form.consultationMode === 'showroom-visit' && (
        <p className="border-brass-border bg-brass-light/60 text-wood-walnut animate-fade-in text-label-sm flex items-start gap-2 rounded-2xl border p-3.5 leading-relaxed">
          <MapPin className="mt-px h-4 w-4 shrink-0" />
          {COMPANY_INFO.location} — ask for the design desk when you arrive.
        </p>
      )}

      <FieldShell
        label="Preferred date"
        hint="Up to 45 days ahead"
        error={errors.preferredDate}
        required
      >
        <input
          type="date"
          min={min}
          max={max}
          value={form.preferredDate}
          onChange={(e) => handleDateChange(e.target.value)}
          aria-invalid={!!errors.preferredDate}
          className={cn(
            'bg-surface text-text-primary focus:ring-brass/35 w-full cursor-pointer rounded-xl border px-3.5 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none',
            errors.preferredDate
              ? 'border-destructive/60'
              : 'border-border-subtle focus:border-brass'
          )}
        />
        {form.preferredDate && !errors.preferredDate && (
          <p className="text-text-muted text-label-sm">
            {formatLongDate(form.preferredDate)}
          </p>
        )}
      </FieldShell>

      {dayNote && (
        <p className="border-border-subtle bg-surface-muted/60 text-text-secondary text-label-sm flex items-start gap-2 rounded-2xl border p-3">
          <Info className="text-brass mt-px h-3.5 w-3.5 shrink-0" />
          {dayNote}
        </p>
      )}

      <FieldShell
        label="Preferred time"
        hint={form.preferredDate ? '' : 'Pick a date first'}
        error={errors.timeSlot}
        required
      >
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => {
            const isAvailable = availableSlots.some((s) => s.id === slot.id)
            const isDisabled = !form.preferredDate || !isAvailable

            return (
              <Chip
                key={slot.id}
                disabled={isDisabled}
                selected={form.timeSlot === slot.id}
                onClick={() => updateForm({ timeSlot: slot.id })}
                className={cn(isDisabled && 'cursor-not-allowed opacity-40')}
              >
                {slot.label}
              </Chip>
            )
          })}
        </div>
        {form.preferredDate && availableSlots.length === 0 && (
          <p className="text-text-muted text-label-sm">
            Every slot on this day has passed — please choose the next day.
          </p>
        )}
      </FieldShell>

      <TextAreaField
        label="Anything else we should know?"
        hint="Optional"
        rows={4}
        placeholder="Reference photos, a colour scheme you love, an awkward corner, a deadline we should plan around…"
        value={form.notes}
        onChange={(e) => updateForm({ notes: e.target.value })}
      />

      <FieldShell label="How did you find us?" hint="Optional">
        <div className="flex flex-wrap gap-2">
          {REFERRAL_SOURCES.map((source) => (
            <Chip
              key={source.id}
              selected={form.referralSource === source.id}
              onClick={() =>
                updateForm({
                  referralSource:
                    form.referralSource === source.id ? '' : source.id,
                })
              }
            >
              {source.label}
            </Chip>
          ))}
        </div>
      </FieldShell>
    </div>
  )
}

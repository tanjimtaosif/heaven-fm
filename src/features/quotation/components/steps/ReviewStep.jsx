import { CalendarDays, Hash, PenLine } from 'lucide-react'
import { StepIntro } from '../QuotationFields'
import {
  getBudgetLabel,
  getCategoryLabels,
  getConsultationLabel,
  getFinishLabels,
  getPieceLabels,
  getProjectTypeLabel,
  getSlotLabel,
  getSpaceTypeLabel,
  getTimelineLabel,
} from '../../utils/buildQuotationMessage'
import { formatLongDate, normalisePhone } from '../../utils/quotationSchema'

const SummaryRow = ({ label, value }) =>
  value ? (
    <div className="border-border-subtle/70 flex gap-3 border-b py-2 last:border-b-0">
      <span className="text-text-muted text-label-sm w-32 shrink-0 font-semibold tracking-wide uppercase">
        {label}
      </span>
      <span className="text-text-primary text-label-md min-w-0 grow break-words">
        {value}
      </span>
    </div>
  ) : null

const SummaryCard = ({ title, onEdit, children }) => (
  <section className="border-border-subtle bg-surface rounded-2xl border p-4">
    <div className="mb-1 flex items-center justify-between gap-3">
      <h4 className="text-text-primary font-serif text-base">{title}</h4>
      <button
        type="button"
        onClick={onEdit}
        className="text-brass-dark hover:text-brass text-label-sm flex cursor-pointer items-center gap-1 font-semibold transition-colors"
      >
        <PenLine className="h-3 w-3" />
        Edit
      </button>
    </div>
    <div>{children}</div>
  </section>
)

export const ReviewStep = ({
  form,
  reference,
  bagItems,
  bagSubtotalFormatted,
  message,
  onEditStep,
}) => {
  const includedBagItems = form.includeBagItems ? bagItems : []
  const pieceLabels = getPieceLabels(form.pieces)
  const finishLabels = getFinishLabels(form.finishes)

  return (
    <div className="space-y-6">
      <StepIntro
        eyebrow="Step 5 of 5"
        title="One last look"
        description="This is exactly what lands in our studio WhatsApp. Edit anything that needs changing, then send."
      />

      <div className="border-brass-border bg-brass-light/50 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border p-3.5">
        <span className="text-wood-walnut flex items-center gap-1.5 text-xs font-semibold">
          <Hash className="h-3.5 w-3.5" />
          {reference}
        </span>
        <span className="text-wood-walnut/80 flex items-center gap-1.5 text-xs">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatLongDate(form.preferredDate)} · {getSlotLabel(form.timeSlot)}
        </span>
      </div>

      <div className="space-y-3">
        <SummaryCard title="Project" onEdit={() => onEditStep('scope')}>
          <SummaryRow
            label="Collections"
            value={getCategoryLabels(form.categories).join(', ')}
          />
          <SummaryRow label="Pieces" value={pieceLabels.join(', ')} />
          <SummaryRow
            label="Scale"
            value={getProjectTypeLabel(form.projectType)}
          />
          {includedBagItems.length > 0 && (
            <SummaryRow
              label="From bag"
              value={`${includedBagItems.length} saved piece${includedBagItems.length > 1 ? 's' : ''} · ${bagSubtotalFormatted}`}
            />
          )}
        </SummaryCard>

        <SummaryCard title="Details" onEdit={() => onEditStep('specs')}>
          <SummaryRow label="Space" value={getSpaceTypeLabel(form.spaceType)} />
          <SummaryRow label="Room size" value={form.roomDimensions.trim()} />
          <SummaryRow
            label="Finish"
            value={
              finishLabels.length
                ? finishLabels.join(', ')
                : 'Open to suggestions'
            }
          />
          <SummaryRow label="Budget" value={getBudgetLabel(form.budget)} />
          <SummaryRow
            label="Timeline"
            value={getTimelineLabel(form.timeline)}
          />
          <SummaryRow
            label="Installation"
            value={form.needsInstallation ? 'Included' : 'Not required'}
          />
        </SummaryCard>

        <SummaryCard title="You" onEdit={() => onEditStep('contact')}>
          <SummaryRow label="Name" value={form.fullName.trim()} />
          <SummaryRow label="Phone" value={normalisePhone(form.phone)} />
          <SummaryRow
            label="WhatsApp"
            value={
              form.whatsappSameAsPhone
                ? 'Same as phone'
                : normalisePhone(form.whatsappNumber)
            }
          />
          <SummaryRow label="Email" value={form.email.trim()} />
          <SummaryRow
            label="Address"
            value={`${form.address.trim()}, ${form.city}`}
          />
        </SummaryCard>

        <SummaryCard
          title="Call or meeting"
          onEdit={() => onEditStep('appointment')}
        >
          <SummaryRow
            label="Format"
            value={getConsultationLabel(form.consultationMode)}
          />
          <SummaryRow label="Date" value={formatLongDate(form.preferredDate)} />
          <SummaryRow label="Time" value={getSlotLabel(form.timeSlot)} />
          <SummaryRow label="Notes" value={form.notes.trim()} />
        </SummaryCard>
      </div>

      <details className="border-border-subtle bg-surface-muted/40 group rounded-2xl border p-4">
        <summary className="text-text-primary text-label-md cursor-pointer list-none font-semibold select-none">
          Preview the WhatsApp message
          <span className="text-text-muted ml-1.5 font-normal">
            (tap to expand)
          </span>
        </summary>
        <pre className="text-text-secondary border-border-subtle bg-surface text-label-sm mt-3 max-h-64 overflow-auto rounded-xl border p-3 font-mono leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
      </details>
    </div>
  )
}

import { PenLine } from 'lucide-react'
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
    <div className="flex gap-4 py-1.5">
      <span className="text-text-muted text-label-md w-24 shrink-0 sm:w-28">
        {label}
      </span>
      <span className="text-text-primary text-label-md min-w-0 grow break-words">
        {value}
      </span>
    </div>
  ) : null

const SummaryGroup = ({ title, onEdit, children }) => (
  <section className="border-border-subtle/70 border-t pt-4 first:border-t-0 first:pt-0">
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <h4 className="text-text-primary text-label-md font-semibold tracking-[0.14em] uppercase">
        {title}
      </h4>
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
        title="One last look"
        description="This is exactly what lands in our studio WhatsApp. Edit anything that needs changing, then send."
      />

      <p className="text-text-muted text-label-sm">
        Reference{' '}
        <span className="text-text-primary font-semibold">{reference}</span>
      </p>

      <div className="space-y-4">
        <SummaryGroup title="Project" onEdit={() => onEditStep('scope')}>
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
              value={`${includedBagItems.length} saved piece${includedBagItems.length > 1 ? 's' : ''}, ${bagSubtotalFormatted}`}
            />
          )}
        </SummaryGroup>

        <SummaryGroup title="Details" onEdit={() => onEditStep('specs')}>
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
        </SummaryGroup>

        <SummaryGroup title="You" onEdit={() => onEditStep('contact')}>
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
        </SummaryGroup>

        <SummaryGroup
          title="Call or visit"
          onEdit={() => onEditStep('appointment')}
        >
          <SummaryRow
            label="Format"
            value={getConsultationLabel(form.consultationMode)}
          />
          <SummaryRow label="Date" value={formatLongDate(form.preferredDate)} />
          <SummaryRow label="Time" value={getSlotLabel(form.timeSlot)} />
          <SummaryRow label="Notes" value={form.notes.trim()} />
        </SummaryGroup>
      </div>

      <details className="border-border-subtle/70 group border-t pt-4">
        <summary className="text-text-secondary text-label-md hover:text-text-primary cursor-pointer list-none font-medium transition-colors select-none">
          Preview the WhatsApp message
        </summary>
        <pre className="text-text-secondary border-border-subtle bg-surface text-label-sm mt-3 max-h-64 overflow-auto rounded-xl border p-3 leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
      </details>
    </div>
  )
}

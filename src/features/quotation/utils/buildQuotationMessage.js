import { COMPANY_INFO } from '@/constants/companyData'
import {
  QUOTATION_CATEGORIES,
  PROJECT_TYPES,
  SPACE_TYPES,
  FINISH_PREFERENCES,
  BUDGET_RANGES,
  TIMELINES,
  CONSULTATION_MODES,
  TIME_SLOTS,
  REFERRAL_SOURCES,
} from '@/constants/quotationData'
import { formatLongDate, normalisePhone } from './quotationSchema'

function labelOf(collection, id, key = 'label') {
  return collection.find((entry) => entry.id === id)?.[key] || ''
}

function labelsOf(collection, ids, key = 'label') {
  return ids.map((id) => labelOf(collection, id, key)).filter(Boolean)
}

const ALL_PIECES = QUOTATION_CATEGORIES.flatMap((category) =>
  category.pieces.map((piece) => ({ ...piece, categoryId: category.id }))
)

export function getCategoryLabels(ids) {
  return labelsOf(QUOTATION_CATEGORIES, ids, 'name')
}

export function getPieceLabels(ids) {
  return ids
    .map((id) => ALL_PIECES.find((piece) => piece.id === id)?.name)
    .filter(Boolean)
}

export function getConsultationLabel(id) {
  return labelOf(CONSULTATION_MODES, id)
}

export function getSlotLabel(id) {
  return labelOf(TIME_SLOTS, id)
}

export function getBudgetLabel(id) {
  return labelOf(BUDGET_RANGES, id)
}

export function getTimelineLabel(id) {
  return labelOf(TIMELINES, id)
}

export function getProjectTypeLabel(id) {
  return labelOf(PROJECT_TYPES, id)
}

export function getSpaceTypeLabel(id) {
  return labelOf(SPACE_TYPES, id)
}

export function getFinishLabels(ids) {
  return labelsOf(FINISH_PREFERENCES, ids)
}

/**
 * Amounts are written as "BDT 45,000" rather than with the taka sign, which
 * some Android keyboards and desktop WhatsApp fonts render as a blank box.
 */
function formatAmount(amount) {
  return `BDT ${amount.toLocaleString('en-US')}`
}

/** Budget labels carry the taka sign for the web UI; the brief spells it out. */
function plainAmountText(label) {
  return label.replace(/৳\s?/g, 'BDT ')
}

function formatSentAt(date) {
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Renders the whole brief as one WhatsApp message. Plain sentences and simple
 * "Label: value" lines only — no emoji, rules, or bullet glyphs, so it reads
 * as a professional enquiry in the studio inbox and stays legible if a phone
 * strips the formatting. Ordered the way the studio reads it: who, what, how
 * it should look, then when to meet.
 */
export function buildQuotationMessage({ form, reference, bagItems = [] }) {
  const lines = []
  const push = (...entries) => lines.push(...entries)
  const section = (title) => push('', `*${title}*`)

  const includedBagItems = form.includeBagItems ? bagItems : []
  const bagSubtotal = includedBagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  push(
    `*Quotation Request | ${COMPANY_INFO.name}*`,
    `Reference: ${reference}`,
    `Sent: ${formatSentAt(new Date())}`,
    '',
    'Assalamu Alaikum. I would like a quotation for the following.'
  )

  section('Client')
  push(`Name: ${form.fullName.trim()}`)
  push(`Phone: ${normalisePhone(form.phone)}`)
  if (!form.whatsappSameAsPhone && form.whatsappNumber.trim()) {
    push(`WhatsApp: ${normalisePhone(form.whatsappNumber)}`)
  }
  if (form.email.trim()) push(`Email: ${form.email.trim()}`)
  push(`Address: ${form.address.trim()}, ${form.city}`)

  section('Project')
  push(`Scale: ${getProjectTypeLabel(form.projectType)}`)
  push(`Collections: ${getCategoryLabels(form.categories).join(', ')}`)
  const pieceLabels = getPieceLabels(form.pieces)
  if (pieceLabels.length) push(`Pieces: ${pieceLabels.join(', ')}`)
  push(`Space: ${getSpaceTypeLabel(form.spaceType)}`)
  if (form.roomDimensions.trim()) {
    push(`Room size: ${form.roomDimensions.trim()}`)
  }

  if (includedBagItems.length) {
    section(`Pieces saved in my bag (${includedBagItems.length})`)
    includedBagItems.forEach((item, index) => {
      push(
        `${index + 1}. ${item.name}${item.sku ? ` (${item.sku})` : ''}`,
        `   Quantity ${item.quantity} at ${formatAmount(item.price)} each, total ${formatAmount(item.price * item.quantity)}`
      )
      if (item.notes && item.notes.trim()) {
        push(`   Note: ${item.notes.trim()}`)
      }
    })
    push(`Subtotal: ${formatAmount(bagSubtotal)}`)
  }

  section('Preferences')
  const finishes = getFinishLabels(form.finishes)
  push(
    `Finish and timber: ${finishes.length ? finishes.join(', ') : 'Open to suggestions'}`
  )
  push(`Budget: ${plainAmountText(getBudgetLabel(form.budget))}`)
  push(`Timeline: ${getTimelineLabel(form.timeline)}`)
  push(
    `Delivery and installation: ${form.needsInstallation ? 'Required' : 'Not required'}`
  )

  section('Preferred appointment')
  push(`Format: ${getConsultationLabel(form.consultationMode)}`)
  push(`Date: ${formatLongDate(form.preferredDate)}`)
  push(`Time: ${getSlotLabel(form.timeSlot)}`)

  if (form.notes.trim()) {
    section('Notes')
    push(form.notes.trim())
  }

  if (form.referralSource) {
    push('', `Found you via: ${labelOf(REFERRAL_SOURCES, form.referralSource)}`)
  }

  push(
    '',
    'Please confirm this appointment and share an itemised estimate with the lead time.',
    'Thank you.'
  )

  return lines.join('\n')
}

export function buildWhatsappUrl(message) {
  const phone = COMPANY_INFO.contact.phoneClean.replace(/[^0-9]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(message, reference) {
  const subject = `Quotation Request ${reference} | ${COMPANY_INFO.name}`
  return `mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message.replace(/\*/g, ''))}`
}

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

const RULE = '━━━━━━━━━━━━━━━━━━━━'

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

function formatTaka(amount) {
  return `৳${amount.toLocaleString('en-US')}`
}

/**
 * Renders the whole brief as one WhatsApp message. Ordered the way the studio
 * reads it: who, what, how it should look, then when to meet.
 */
export function buildQuotationMessage({ form, reference, bagItems = [] }) {
  const lines = []
  const push = (...entries) => lines.push(...entries)

  const includedBagItems = form.includeBagItems ? bagItems : []
  const bagSubtotal = includedBagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  push(
    '🪑 *HEAVEN FURNITURE MART — QUOTATION REQUEST*',
    RULE,
    `*Ref:* ${reference}`,
    `*Sent:* ${new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    '',
    'Assalamu Alaikum / Hello Heaven Furniture Mart,',
    'I would like a quotation for the following.',
    ''
  )

  push('👤 *CLIENT*', `• Name: ${form.fullName.trim()}`)
  push(`• Phone: ${normalisePhone(form.phone)}`)
  if (!form.whatsappSameAsPhone && form.whatsappNumber.trim()) {
    push(`• WhatsApp: ${normalisePhone(form.whatsappNumber)}`)
  }
  if (form.email.trim()) push(`• Email: ${form.email.trim()}`)
  push(`• Address: ${form.address.trim()}, ${form.city}`, '')

  push('🛋️ *PROJECT SCOPE*')
  push(`• Scale: ${getProjectTypeLabel(form.projectType)}`)
  push(`• Collections: ${getCategoryLabels(form.categories).join(', ')}`)
  const pieceLabels = getPieceLabels(form.pieces)
  if (pieceLabels.length) push(`• Pieces: ${pieceLabels.join(', ')}`)
  push(`• Space: ${getSpaceTypeLabel(form.spaceType)}`)
  if (form.roomDimensions.trim()) {
    push(`• Room size: ${form.roomDimensions.trim()}`)
  }
  push('')

  if (includedBagItems.length) {
    push(`🛍️ *PIECES SAVED IN MY BAG* (${includedBagItems.length})`)
    includedBagItems.forEach((item, index) => {
      const lineTotal = formatTaka(item.price * item.quantity)
      push(
        `${index + 1}. ${item.name}${item.sku ? ` (${item.sku})` : ''} — Qty ${item.quantity} × ${formatTaka(item.price)} = ${lineTotal}`
      )
      if (item.notes && item.notes.trim()) {
        push(`   ↳ Note: ${item.notes.trim()}`)
      }
    })
    push(`*Bag subtotal:* ${formatTaka(bagSubtotal)}`, '')
  }

  push('🎨 *PREFERENCES*')
  const finishes = getFinishLabels(form.finishes)
  push(
    `• Finish / timber: ${finishes.length ? finishes.join(', ') : 'Open to suggestions'}`
  )
  push(`• Budget: ${getBudgetLabel(form.budget)}`)
  push(`• Timeline: ${getTimelineLabel(form.timeline)}`)
  push(
    `• Delivery & installation: ${form.needsInstallation ? 'Yes, please handle it' : 'Not required'}`,
    ''
  )

  push('📅 *CALL / MEETING REQUEST*')
  push(`• Preferred: ${getConsultationLabel(form.consultationMode)}`)
  push(`• Date: ${formatLongDate(form.preferredDate)}`)
  push(`• Time: ${getSlotLabel(form.timeSlot)}`, '')

  if (form.notes.trim()) {
    push('📝 *NOTES*', form.notes.trim(), '')
  }

  if (form.referralSource) {
    push(
      `• Found you via: ${labelOf(REFERRAL_SOURCES, form.referralSource)}`,
      ''
    )
  }

  push(
    RULE,
    'Please confirm this slot and share an itemised estimate with the lead time.',
    'Thank you.'
  )

  return lines.join('\n')
}

export function buildWhatsappUrl(message) {
  const phone = COMPANY_INFO.contact.phoneClean.replace(/[^0-9]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(message, reference) {
  const subject = `Quotation Request ${reference} — Heaven Furniture Mart`
  return `mailto:${COMPANY_INFO.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message.replace(/\*/g, ''))}`
}

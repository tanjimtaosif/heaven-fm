import { COMPANY_INFO } from '@/constants/companyData'

const formatAmount = (value) =>
  `BDT ${Number(value || 0).toLocaleString('en-US')}`

/**
 * Generates a clean, minimal, easy-to-read WhatsApp order message.
 * Plain text with short labelled lines, no decorative separators or emojis.
 *
 * @param {Object} params
 * @param {string} params.orderRef - Unique order reference ID (e.g. HFM-ORD-829134)
 * @param {Object} params.customerInfo - { name, phone, email }
 * @param {Object} params.deliveryAddress - { street, area, city, landmark }
 * @param {Object} params.paymentMethod - { label, name, description }
 * @param {Array} params.items - Ordered products { name, sku, category, finish, dimensions, quantity, price, notes }
 * @param {number} params.subtotal - Items subtotal
 * @param {string} [params.customNotes] - Optional special requests or instructions
 * @returns {string} Clean plain-text message for WhatsApp
 */
export function generateWhatsAppOrderMessage({
  orderRef,
  customerInfo = {},
  deliveryAddress = {},
  paymentMethod = {},
  items = [],
  subtotal = 0,
  customNotes = '',
}) {
  const blocks = []

  // Header
  const header = ['New Order Request', 'Heaven Furniture Mart']
  if (orderRef) header.push(`Order Ref: ${orderRef}`)
  header.push(
    `Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
  )
  blocks.push(header.join('\n'))

  // Customer
  const customer = ['Customer']
  customer.push(`Name: ${customerInfo.name || 'Not provided'}`)
  customer.push(`Phone: ${customerInfo.phone || 'Not provided'}`)
  if (customerInfo.email?.trim()) {
    customer.push(`Email: ${customerInfo.email.trim()}`)
  }
  blocks.push(customer.join('\n'))

  // Delivery address
  const address = ['Delivery Address']
  if (deliveryAddress.street?.trim())
    address.push(deliveryAddress.street.trim())
  if (deliveryAddress.area?.trim()) address.push(deliveryAddress.area.trim())
  address.push(deliveryAddress.city?.trim() || 'Chattogram')
  if (deliveryAddress.landmark?.trim()) {
    address.push(`Landmark: ${deliveryAddress.landmark.trim()}`)
  }
  blocks.push(address.join('\n'))

  // Items
  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 1), 0)
  const itemLines = [`Items (${items.length})`]
  items.forEach((item, index) => {
    const quantity = item.quantity || 1
    const unitPrice = Number(item.price) || 0

    if (index > 0) itemLines.push('')
    itemLines.push(`${index + 1}. ${item.name}`)
    itemLines.push(
      `Qty ${quantity} x ${formatAmount(unitPrice)} = ${formatAmount(unitPrice * quantity)}`
    )

    const specs = []
    if (item.category) specs.push(item.category)
    if (item.finish) specs.push(item.finish)
    if (item.dimensions) specs.push(item.dimensions)
    if (specs.length) itemLines.push(specs.join(', '))

    if (item.sku) itemLines.push(`SKU: ${item.sku}`)
    if (item.notes?.trim()) itemLines.push(`Note: ${item.notes.trim()}`)
  })
  blocks.push(itemLines.join('\n'))

  // Summary
  const summary = ['Summary']
  summary.push(`Total Pieces: ${totalQuantity}`)
  summary.push(`Subtotal: ${formatAmount(subtotal)}`)
  summary.push('Delivery: Free white-glove service in Chattogram')
  summary.push(`Total Payable: ${formatAmount(subtotal)}`)
  blocks.push(summary.join('\n'))

  // Payment
  const payment = ['Payment Method']
  payment.push(
    paymentMethod.label || paymentMethod.name || 'bKash Mobile Banking'
  )
  blocks.push(payment.join('\n'))

  // Notes
  if (customNotes?.trim()) {
    blocks.push(['Special Instructions', customNotes.trim()].join('\n'))
  }

  blocks.push(
    'Please confirm availability, production timeline and payment details.'
  )

  return blocks.join('\n\n')
}

/**
 * Creates the complete wa.me URL with pre-filled message text.
 *
 * @param {Object} orderData - Parameters accepted by generateWhatsAppOrderMessage
 * @param {string} [phoneOverride] - Optional phone number override
 * @returns {string} WhatsApp direct message URL
 */
export function createWhatsAppOrderUrl(orderData, phoneOverride) {
  const cleanPhone = (
    phoneOverride ||
    COMPANY_INFO.contact.phoneClean ||
    '8801960481983'
  ).replace(/[^0-9]/g, '')
  const message = generateWhatsAppOrderMessage(orderData)
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

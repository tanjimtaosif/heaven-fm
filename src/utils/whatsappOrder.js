import { COMPANY_INFO } from '@/constants/companyData'

/**
 * Generates a clean, professional, and structured WhatsApp order message
 * strictly avoiding unnecessary emojis, decorative symbols, or messy formatting.
 *
 * @param {Object} params
 * @param {string} params.orderRef - Unique order reference ID (e.g. HFM-ORD-2026-8291)
 * @param {Object} params.customerInfo - { name, phone, email }
 * @param {Object} params.deliveryAddress - { street, area, city, landmark }
 * @param {Object} params.paymentMethod - { label, id, description }
 * @param {Array} params.items - Array of ordered products { name, sku, category, finish, dimensions, quantity, price, notes }
 * @param {number} params.subtotal - Total order amount
 * @param {string} [params.customNotes] - Optional special requests or instructions
 * @returns {string} Clean, structured plain-text message for WhatsApp
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
  const lines = []

  lines.push('HEAVEN FURNITURE MART - BESPOKE ORDER REQUEST')
  lines.push('========================================')
  if (orderRef) {
    lines.push(`Order Reference: ${orderRef}`)
    lines.push(
      `Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
    )
    lines.push('----------------------------------------')
  }

  // 1. Customer Personal Information
  lines.push('CUSTOMER INFORMATION')
  lines.push(`Full Name: ${customerInfo.name || 'N/A'}`)
  lines.push(`Contact Phone: ${customerInfo.phone || 'N/A'}`)
  if (customerInfo.email && customerInfo.email.trim()) {
    lines.push(`Email Address: ${customerInfo.email.trim()}`)
  }
  lines.push('')

  // 2. Customer Delivery Address
  lines.push('DELIVERY ADDRESS')
  lines.push(`Street / House / Building: ${deliveryAddress.street || 'N/A'}`)
  lines.push(`Area / Neighborhood: ${deliveryAddress.area || 'N/A'}`)
  lines.push(`City / District: ${deliveryAddress.city || 'Chattogram'}`)
  if (deliveryAddress.landmark && deliveryAddress.landmark.trim()) {
    lines.push(`Landmark / Instructions: ${deliveryAddress.landmark.trim()}`)
  }
  lines.push('')

  // 3. Ordered Products Information
  lines.push('ORDERED PRODUCTS')
  lines.push('----------------------------------------')
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`)
    if (item.sku) {
      lines.push(`   SKU: ${item.sku}`)
    }
    if (item.category) {
      lines.push(`   Category: ${item.category}`)
    }
    if (item.finish) {
      lines.push(`   Finish / Material: ${item.finish}`)
    }
    if (item.dimensions) {
      lines.push(`   Dimensions: ${item.dimensions}`)
    }
    const unitPrice = Number(item.price) || 0
    const itemTotal = unitPrice * (item.quantity || 1)
    lines.push(`   Quantity: ${item.quantity || 1}`)
    lines.push(`   Unit Price: BDT ${unitPrice.toLocaleString('en-US')}`)
    lines.push(`   Line Total: BDT ${itemTotal.toLocaleString('en-US')}`)
    if (item.notes && item.notes.trim()) {
      lines.push(`   Item Notes: ${item.notes.trim()}`)
    }
    lines.push('')
  })

  // 4. Payment Method
  lines.push('----------------------------------------')
  lines.push('PAYMENT METHOD')
  lines.push(
    `Selected Method: ${paymentMethod.label || paymentMethod.name || 'bKash Mobile Banking'}`
  )
  if (paymentMethod.description) {
    lines.push(`Payment Details: ${paymentMethod.description}`)
  }
  lines.push('')

  // 5. Cart / Order Summary
  lines.push('----------------------------------------')
  lines.push('ORDER FINANCIAL SUMMARY')
  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 1), 0)
  lines.push(`Total Items Count: ${totalQuantity}`)
  lines.push(`Items Subtotal: BDT ${Number(subtotal).toLocaleString('en-US')}`)
  lines.push('Delivery: Complimentary White-Glove Service across Chattogram')
  lines.push('Atelier Consultation: Included')
  lines.push(`Total Amount: BDT ${Number(subtotal).toLocaleString('en-US')}`)
  lines.push('----------------------------------------')

  // 6. Custom Instructions / Notes
  if (customNotes && customNotes.trim()) {
    lines.push('')
    lines.push('SPECIAL INSTRUCTIONS / CUSTOM REQUESTS')
    lines.push(customNotes.trim())
    lines.push('----------------------------------------')
  }

  lines.push('')
  lines.push('========================================')
  lines.push(
    'Kindly confirm piece availability, atelier production timeline, and invoice instructions.'
  )

  return lines.join('\n')
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

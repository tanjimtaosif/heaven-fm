import bKashLogo from '@/assets/payment-mathod/bKash-logo.svg'
import visaLogo from '@/assets/payment-mathod/visa-logo.svg'
import mastercardLogo from '@/assets/payment-mathod/mastercard-logo.svg'
import sslcommerzLogo from '@/assets/payment-mathod/sslcommerz-logo.svg'

export const PAYMENT_METHODS = [
  {
    id: 'bkash',
    name: 'bKash',
    label: 'bKash Mobile Banking',
    badge: 'Popular MFS',
    logo: bKashLogo,
    logoAlt: 'bKash Logo',
    description: 'Pay securely via bKash personal or merchant account.',
    notice:
      'Our atelier concierge will share our verified bKash number on WhatsApp for order confirmation.',
  },
  {
    id: 'sslcommerz',
    name: 'SSLCommerz',
    label: 'SSLCommerz Multi-Gateway',
    badge: 'All Cards & MFS',
    logo: sslcommerzLogo,
    logoAlt: 'SSLCommerz Gateway Logo',
    description:
      'Pay via Visa, Mastercard, AMEX, Internet Banking, or Mobile Wallets.',
    notice:
      'A secure SSLCommerz payment invoice link will be generated and provided on WhatsApp.',
  },
  {
    id: 'visa',
    name: 'Visa',
    label: 'Visa Card',
    badge: 'Debit / Credit',
    logo: visaLogo,
    logoAlt: 'Visa Card Logo',
    description: 'Pay using your domestic or international Visa card.',
    notice:
      'Direct card payment link or atelier POS slip coordination will be sent to your WhatsApp.',
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    label: 'Mastercard',
    badge: 'Debit / Credit',
    logo: mastercardLogo,
    logoAlt: 'Mastercard Logo',
    description: 'Pay using your Mastercard credit or debit card.',
    notice:
      'Secure Mastercard payment invoice link will be provided on WhatsApp.',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    label: 'Cash on Delivery (COD)',
    badge: 'Pay Upon Delivery',
    logo: null,
    isCod: true,
    description:
      'Pay upon white-glove delivery across Chattogram (booking deposit applies).',
    notice:
      'Our dispatch team will coordinate delivery timing and collect payment upon handover.',
  },
]

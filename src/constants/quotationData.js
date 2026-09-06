import { PRODUCT_CATEGORIES } from './productsData'

const CATEGORY_ICONS = {
  'living-room': 'Sofa',
  bedroom: 'BedDouble',
  dining: 'UtensilsCrossed',
  'office-study': 'Briefcase',
  'bespoke-commissions': 'Hammer',
}

const CATEGORY_ORDER = [
  'living-room',
  'bedroom',
  'dining',
  'office-study',
  'bespoke-commissions',
]

const EXTRA_PIECES = {
  'living-room': [{ id: 'consoles', name: 'Consoles' }],
  dining: [{ id: 'dining-chairs', name: 'Dining Chairs' }],
  'office-study': [{ id: 'bookshelves', name: 'Bookshelves' }],
  'bespoke-commissions': [
    { id: 'built-ins', name: 'Built-in Storage' },
    { id: 'kitchen-cabinetry', name: 'Kitchen Cabinetry' },
    { id: 'wall-paneling', name: 'Wall Paneling' },
    { id: 'walk-in-closet', name: 'Walk-in Closet' },
    { id: 'staircase-railing', name: 'Staircase & Railing' },
    { id: 'other-custom', name: 'Something Else' },
  ],
}

function mergePieces(categoryId, subcategories = []) {
  const merged = [...subcategories, ...(EXTRA_PIECES[categoryId] || [])]
  const seen = new Set()
  return merged.filter((piece) => {
    if (seen.has(piece.id)) return false
    seen.add(piece.id)
    return true
  })
}

export const QUOTATION_CATEGORIES = CATEGORY_ORDER.map((categoryId) => {
  const source = PRODUCT_CATEGORIES.find((c) => c.id === categoryId)
  if (!source) return null

  return {
    id: source.id,
    name: source.name,
    description: source.description,
    icon: CATEGORY_ICONS[source.id] || 'Package',
    pieces: mergePieces(source.id, source.subcategories),
  }
}).filter(Boolean)

export const PROJECT_TYPES = [
  {
    id: 'single-piece',
    label: 'A Single Piece',
    hint: 'One statement piece, made to measure.',
  },
  {
    id: 'full-room',
    label: 'A Full Room',
    hint: 'A coordinated set for one space.',
  },
  {
    id: 'full-home',
    label: 'A Whole Home',
    hint: 'Turnkey furnishing, room by room.',
  },
  {
    id: 'commercial',
    label: 'Office / Commercial',
    hint: 'Workspaces, hospitality, retail floors.',
  },
]

export const SPACE_TYPES = [
  { id: 'apartment', label: 'Apartment / Flat' },
  { id: 'duplex', label: 'Duplex' },
  { id: 'independent-house', label: 'Independent House' },
  { id: 'office', label: 'Office' },
  { id: 'restaurant', label: 'Restaurant / Café' },
  { id: 'hotel', label: 'Hotel / Resort' },
  { id: 'retail', label: 'Showroom / Retail' },
  { id: 'other-space', label: 'Other' },
]

export const FINISH_PREFERENCES = [
  { id: 'teak', label: 'Teak' },
  { id: 'oak', label: 'Oak' },
  { id: 'walnut', label: 'Walnut' },
  { id: 'mahogany', label: 'Mahogany' },
  { id: 'veneer', label: 'Veneer / Laminate' },
  { id: 'fabric', label: 'Fabric Upholstery' },
  { id: 'leather', label: 'Leather Upholstery' },
  { id: 'marble', label: 'Marble Top' },
  { id: 'glass', label: 'Glass & Metal' },
  { id: 'guide-me', label: 'Not sure yet, guide me' },
]

export const BUDGET_RANGES = [
  { id: 'under-50k', label: 'Under ৳50,000' },
  { id: '50k-1l', label: '৳50,000 to ৳1,00,000' },
  { id: '1l-3l', label: '৳1,00,000 to ৳3,00,000' },
  { id: '3l-5l', label: '৳3,00,000 to ৳5,00,000' },
  { id: 'above-5l', label: 'Above ৳5,00,000' },
  { id: 'not-sure', label: 'Not sure yet, advise me' },
]

export const TIMELINES = [
  { id: 'asap', label: 'Within 2 weeks (urgent)' },
  { id: 'one-month', label: 'Within 1 month' },
  { id: 'one-three-months', label: '1 to 3 months' },
  { id: 'planning', label: 'Just planning ahead' },
]

export const CONSULTATION_MODES = [
  {
    id: 'phone-call',
    label: 'Phone Call',
    hint: 'A design consultant calls you back.',
    icon: 'Phone',
  },
  {
    id: 'whatsapp-video',
    label: 'WhatsApp Video Call',
    hint: 'Walk us through your space live.',
    icon: 'Video',
  },
  {
    id: 'showroom-visit',
    label: 'Showroom Visit',
    hint: 'Meet us at our Agrabad showroom.',
    icon: 'Store',
  },
  {
    id: 'home-visit',
    label: 'Home / Site Visit',
    hint: 'We measure your space in person.',
    icon: 'MapPin',
  },
]

export const TIME_SLOTS = [
  { id: '10-12', label: '10:00 AM to 12:00 PM', startHour: 10 },
  { id: '12-14', label: '12:00 PM to 2:00 PM', startHour: 12 },
  { id: '14-16', label: '2:00 PM to 4:00 PM', startHour: 14 },
  { id: '16-18', label: '4:00 PM to 6:00 PM', startHour: 16 },
  { id: '18-20', label: '6:00 PM to 8:00 PM', startHour: 18 },
]

// Day index follows Date.getDay() — 0 Sunday through 6 Saturday.
// Friday opens on an afternoon shift only; the atelier closes for Jumu'ah.
export const SHOWROOM_HOURS = {
  0: { earliestHour: 10 },
  1: { earliestHour: 10 },
  2: { earliestHour: 10 },
  3: { earliestHour: 10 },
  4: { earliestHour: 10 },
  5: {
    earliestHour: 15,
    note: 'Friday opens for the afternoon shift only, from 3 PM.',
  },
  6: { earliestHour: 10 },
}

export const BOOKING_WINDOW_DAYS = 45

export const SERVICE_CITIES = [
  'Chattogram',
  'Dhaka',
  "Cox's Bazar",
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Other district',
]

export const REFERRAL_SOURCES = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'google', label: 'Google Search' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'referral', label: 'Friend / Family' },
  { id: 'showroom', label: 'Walked past the showroom' },
  { id: 'other-source', label: 'Somewhere else' },
]

export const QUOTATION_STEPS = [
  { id: 'scope', title: 'Your project', caption: 'What are we building' },
  { id: 'specs', title: 'The details', caption: 'Space, finish, budget' },
  { id: 'contact', title: 'Your details', caption: 'Where we reach you' },
  { id: 'appointment', title: 'Call or visit', caption: 'A day and a time' },
  { id: 'review', title: 'Review', caption: 'Check, then send' },
]

export const QUOTATION_PROMISE = [
  {
    id: 'reply',
    title: 'Reply within 2 hours',
    description:
      'Send during showroom hours and a design consultant answers the same day.',
    icon: 'Clock',
  },
  {
    id: 'free',
    title: 'Consultation is free',
    description:
      'Measurements, layout advice, and material guidance cost you nothing.',
    icon: 'Sparkles',
  },
  {
    id: 'itemised',
    title: 'An itemised quote',
    description:
      'Timber, joinery, upholstery, delivery — priced line by line, no surprises.',
    icon: 'ClipboardList',
  },
]

export const QUOTATION_JOURNEY = [
  {
    id: 'share',
    step: '01',
    title: 'Share your brief',
    description:
      'Four short steps — the pieces, your space, a budget, and when suits you for a call or a visit.',
  },
  {
    id: 'consult',
    step: '02',
    title: 'We reach out',
    description:
      'A design consultant confirms your slot on WhatsApp, then talks through layout and timber.',
  },
  {
    id: 'quote',
    step: '03',
    title: 'Your quote arrives',
    description:
      'An itemised estimate with drawings, lead time, and material swatches to approve.',
  },
]

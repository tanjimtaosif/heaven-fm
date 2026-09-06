import {
  SHOWROOM_HOURS,
  TIME_SLOTS,
  BOOKING_WINDOW_DAYS,
} from '@/constants/quotationData'

export const INITIAL_QUOTATION_FORM = {
  categories: [],
  pieces: [],
  projectType: '',
  includeBagItems: true,

  spaceType: '',
  roomDimensions: '',
  finishes: [],
  budget: '',
  timeline: '',
  needsInstallation: true,

  fullName: '',
  phone: '',
  whatsappSameAsPhone: true,
  whatsappNumber: '',
  email: '',
  city: 'Chattogram',
  address: '',

  consultationMode: '',
  preferredDate: '',
  timeSlot: '',
  referralSource: '',
  notes: '',
}

/** Local YYYY-MM-DD — never UTC, so "today" matches the client's calendar. */
export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDateKey(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  const parsed = new Date(year, month - 1, day)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function getBookingRange() {
  const today = new Date()
  const last = new Date(today)
  last.setDate(last.getDate() + BOOKING_WINDOW_DAYS)
  return { min: toDateKey(today), max: toDateKey(last) }
}

export function formatLongDate(value) {
  const parsed = parseDateKey(value)
  if (!parsed) return ''
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Slots still bookable on the chosen day: after the showroom opens, and — for
 * today — at least an hour out so nobody books a slot already underway.
 */
export function getAvailableSlots(dateValue) {
  const parsed = parseDateKey(dateValue)
  if (!parsed) return TIME_SLOTS

  const hours = SHOWROOM_HOURS[parsed.getDay()] || { earliestHour: 10 }
  const now = new Date()
  const isToday = toDateKey(now) === dateValue
  const cutoffHour = isToday ? now.getHours() + 1 : -1

  return TIME_SLOTS.filter(
    (slot) =>
      slot.startHour >= hours.earliestHour && slot.startHour > cutoffHour
  )
}

export function getDayNote(dateValue) {
  const parsed = parseDateKey(dateValue)
  if (!parsed) return ''
  return SHOWROOM_HOURS[parsed.getDay()]?.note || ''
}

const BD_PHONE = /^(?:\+?88)?01[3-9]\d{8}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function normalisePhone(value) {
  return (value || '').replace(/[\s()-]/g, '')
}

export function isValidBdPhone(value) {
  return BD_PHONE.test(normalisePhone(value))
}

/** Errors for one step only, so a half-filled form never shouts at the user. */
export function validateStep(stepId, form) {
  const errors = {}

  if (stepId === 'scope') {
    if (form.categories.length === 0) {
      errors.categories = 'Pick at least one collection to quote.'
    }
    if (!form.projectType) {
      errors.projectType = 'Let us know the size of the project.'
    }
  }

  if (stepId === 'specs') {
    if (!form.spaceType) errors.spaceType = 'Tell us what kind of space it is.'
    if (!form.budget)
      errors.budget = 'Choose a budget range — “not sure” works.'
    if (!form.timeline) errors.timeline = 'When would you like it delivered?'
  }

  if (stepId === 'contact') {
    if (form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.'
    }
    if (!isValidBdPhone(form.phone)) {
      errors.phone = 'Enter a valid Bangladeshi number, e.g. 01712 345678.'
    }
    if (!form.whatsappSameAsPhone && !isValidBdPhone(form.whatsappNumber)) {
      errors.whatsappNumber = 'Enter a valid WhatsApp number.'
    }
    if (form.email.trim() && !EMAIL.test(form.email.trim())) {
      errors.email = 'That email address does not look right.'
    }
    if (!form.city.trim()) errors.city = 'Select your city or district.'
    if (form.address.trim().length < 4) {
      errors.address = 'Add your area or full delivery address.'
    }
  }

  if (stepId === 'appointment') {
    if (!form.consultationMode) {
      errors.consultationMode = 'Choose how you would like to meet.'
    }
    if (!form.preferredDate) {
      errors.preferredDate = 'Pick a preferred date.'
    } else {
      const { min, max } = getBookingRange()
      if (form.preferredDate < min) {
        errors.preferredDate = 'Please pick today or a later date.'
      } else if (form.preferredDate > max) {
        errors.preferredDate = `We book up to ${BOOKING_WINDOW_DAYS} days ahead.`
      } else if (getAvailableSlots(form.preferredDate).length === 0) {
        errors.preferredDate = 'No slots left on that day — try the next one.'
      }
    }
    if (!form.timeSlot) {
      errors.timeSlot = 'Choose a time that suits you.'
    } else if (
      form.preferredDate &&
      !getAvailableSlots(form.preferredDate).some((s) => s.id === form.timeSlot)
    ) {
      errors.timeSlot = 'That slot is no longer available on this date.'
    }
  }

  return errors
}

/** Human-readable reference both sides can quote back: HFM-Q-260906-4KX9 */
export function generateReference(date = new Date()) {
  const stamp = toDateKey(date).slice(2).replace(/-/g, '')
  const suffix = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `HFM-Q-${stamp}-${suffix}`
}

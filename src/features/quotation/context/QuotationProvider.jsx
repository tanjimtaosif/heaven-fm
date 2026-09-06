import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuotationContext } from './QuotationContext'
import { INITIAL_QUOTATION_FORM } from '../utils/quotationSchema'

const DRAFT_STORAGE_KEY = 'heaven_quotation_draft_v1'

function readDraft() {
  if (typeof window === 'undefined') return INITIAL_QUOTATION_FORM
  try {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!stored) return INITIAL_QUOTATION_FORM
    // Spread over the defaults so a draft saved by an older build never
    // leaves a field undefined and flips an input to uncontrolled.
    return { ...INITIAL_QUOTATION_FORM, ...JSON.parse(stored) }
  } catch (err) {
    console.error('Error loading quotation draft from storage', err)
    return INITIAL_QUOTATION_FORM
  }
}

export const QuotationProvider = ({ children }) => {
  const [isQuotationOpen, setIsQuotationOpen] = useState(false)
  const [form, setForm] = useState(readDraft)
  const [hasDraft, setHasDraft] = useState(
    () =>
      typeof window !== 'undefined' && !!localStorage.getItem(DRAFT_STORAGE_KEY)
  )

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(form))
    } catch (err) {
      console.error('Error saving quotation draft to storage', err)
    }
  }, [form])

  const updateForm = useCallback((patch) => {
    setForm((prev) => ({ ...prev, ...patch }))
    setHasDraft(true)
  }, [])

  const toggleInArray = useCallback((field, value) => {
    setForm((prev) => {
      const current = prev[field] || []
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((entry) => entry !== value)
          : [...current, value],
      }
    })
    setHasDraft(true)
  }, [])

  const resetForm = useCallback(() => {
    setForm(INITIAL_QUOTATION_FORM)
    setHasDraft(false)
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch (err) {
      console.error('Error clearing quotation draft', err)
    }
  }, [])

  /** `prefill` lets a product card or collection tile seed the brief. */
  const openQuotation = useCallback((prefill) => {
    if (prefill) {
      setForm((prev) => ({
        ...prev,
        ...prefill,
        categories: prefill.categories
          ? Array.from(new Set([...prev.categories, ...prefill.categories]))
          : prev.categories,
        pieces: prefill.pieces
          ? Array.from(new Set([...prev.pieces, ...prefill.pieces]))
          : prev.pieces,
      }))
      setHasDraft(true)
    }
    setIsQuotationOpen(true)
  }, [])

  const closeQuotation = useCallback(() => setIsQuotationOpen(false), [])

  const value = useMemo(
    () => ({
      isQuotationOpen,
      openQuotation,
      closeQuotation,
      form,
      updateForm,
      toggleInArray,
      resetForm,
      hasDraft,
    }),
    [
      isQuotationOpen,
      openQuotation,
      closeQuotation,
      form,
      updateForm,
      toggleInArray,
      resetForm,
      hasDraft,
    ]
  )

  return (
    <QuotationContext.Provider value={value}>
      {children}
    </QuotationContext.Provider>
  )
}

import { useContext } from 'react'
import { QuotationContext } from '../context/QuotationContext'

export const useQuotation = () => {
  const context = useContext(QuotationContext)
  if (!context) {
    throw new Error('useQuotation must be used within a QuotationProvider')
  }
  return context
}

import { SmoothScrollProvider } from '@/components/providers'
import { CartProvider } from '@/features/cart'
import { QuotationProvider } from '@/features/quotation'
import { AppRoutes } from '@/routes'

export default function App() {
  return (
    <SmoothScrollProvider>
      <CartProvider>
        <QuotationProvider>
          <AppRoutes />
        </QuotationProvider>
      </CartProvider>
    </SmoothScrollProvider>
  )
}

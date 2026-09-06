import { SmoothScrollProvider } from '@/components/providers'
import { CartProvider } from '@/features/cart'
import { AppRoutes } from '@/routes'

export default function App() {
  return (
    <SmoothScrollProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </SmoothScrollProvider>
  )
}

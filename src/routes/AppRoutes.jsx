import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { HomePage } from '@/pages/Home'

const ShopPage = lazy(() =>
  import('@/pages/Shop').then((m) => ({ default: m.ShopPage }))
)
const CheckoutPage = lazy(() =>
  import('@/pages/Checkout').then((m) => ({ default: m.CheckoutPage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage }))
)

function SuspenseWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="bg-canvas flex min-h-[60vh] items-center justify-center">
          <div className="border-brass/30 border-t-brass h-8 w-8 animate-spin rounded-full border-2" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: (
          <SuspenseWrapper>
            <ShopPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'checkout',
        element: (
          <SuspenseWrapper>
            <CheckoutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}

import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '@/context'
import { Button, controlStyles, inputStyles } from '@/components/ui'
import { PAYMENT_METHODS } from './paymentMethods'
import { createWhatsAppOrderUrl } from '@/utils/whatsappOrder'
import { COMPANY_INFO } from '@/constants/companyData'
import {
  ShoppingBag,
  Check,
  ChevronRight,
  Home,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  Banknote,
  FileText,
  CircleAlert,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CUSTOMER_STORAGE_KEY = 'heaven_checkout_customer_v1'
const BUY_NOW_STORAGE_KEY = 'heaven_buy_now_item'

const CITY_OPTIONS = ['Chattogram', 'Dhaka', 'Sylhet', 'Other']

export function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart()

  // Determine whether this checkout is for a single "Buy Now" item or full Cart
  const [buyNowItem, setBuyNowItem] = useState(() => {
    if (location.state?.buyNowItem) {
      return location.state.buyNowItem
    }
    try {
      const stored = sessionStorage.getItem(BUY_NOW_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  // Mode: 'single' (Buy Now) or 'cart' (Full cart)
  const [checkoutMode, setCheckoutMode] = useState(() => {
    if (location.state?.buyNowItem) return 'single'
    try {
      const stored = sessionStorage.getItem(BUY_NOW_STORAGE_KEY)
      if (stored) return 'single'
    } catch {
      /* ignore */
    }
    return 'cart'
  })

  // Determine effective mode without cascading setState in an effect
  const effectiveCheckoutMode =
    checkoutMode === 'single' && buyNowItem ? 'single' : 'cart'

  // Active items and subtotal based on effectiveCheckoutMode
  const activeItems = useMemo(() => {
    if (effectiveCheckoutMode === 'single' && buyNowItem) {
      return [
        {
          id: buyNowItem.id,
          name: buyNowItem.name,
          sku: buyNowItem.sku || '',
          category: buyNowItem.category || '',
          price: Number(buyNowItem.price) || 0,
          image: buyNowItem.image || '',
          finish: buyNowItem.finish || 'Standard Bespoke Finish',
          dimensions: buyNowItem.dimensions || 'Standard Atelier Dimensions',
          quantity: buyNowItem.quantity || 1,
          notes: buyNowItem.notes || '',
        },
      ]
    }
    return cartItems
  }, [effectiveCheckoutMode, buyNowItem, cartItems])

  const activeSubtotal = useMemo(() => {
    if (effectiveCheckoutMode === 'single' && buyNowItem) {
      return (Number(buyNowItem.price) || 0) * (buyNowItem.quantity || 1)
    }
    return cartSubtotal
  }, [effectiveCheckoutMode, buyNowItem, cartSubtotal])

  // Form State
  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      /* ignore */
    }
    return {
      name: '',
      phone: '',
      email: '',
      street: '',
      area: '',
      city: 'Chattogram',
      customCity: '',
      landmark: '',
      notes: '',
    }
  })

  // Selected Payment Method
  const [selectedPaymentId, setSelectedPaymentId] = useState('bkash')

  // Validation Errors
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState(null)

  // Field refs for scrolling to errors
  const nameRef = useRef(null)
  const phoneRef = useRef(null)
  const streetRef = useRef(null)
  const areaRef = useRef(null)

  // Persist customer info to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerInfo))
    } catch {
      /* ignore */
    }
  }, [customerInfo])

  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const selectedPaymentMethod = useMemo(() => {
    return (
      PAYMENT_METHODS.find((pm) => pm.id === selectedPaymentId) ||
      PAYMENT_METHODS[0]
    )
  }, [selectedPaymentId])

  const validateForm = () => {
    const newErrors = {}

    if (!customerInfo.name || customerInfo.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name'
    }

    const phoneDigits = customerInfo.phone
      ? customerInfo.phone.replace(/[^0-9]/g, '')
      : ''
    if (!customerInfo.phone || phoneDigits.length < 7) {
      newErrors.phone = 'Please provide a valid contact/WhatsApp phone number'
    }

    if (!customerInfo.street || customerInfo.street.trim().length < 4) {
      newErrors.street =
        'Please provide your street, building, or house details'
    }

    if (!customerInfo.area || customerInfo.area.trim().length < 2) {
      newErrors.area = 'Please provide your delivery area or neighborhood'
    }

    if (
      customerInfo.city === 'Other' &&
      (!customerInfo.customCity || customerInfo.customCity.trim().length < 2)
    ) {
      newErrors.city = 'Please specify your district or city'
    }

    if (!selectedPaymentId) {
      newErrors.payment = 'Please select a preferred payment method'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name && nameRef.current) {
        nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        nameRef.current.focus()
      } else if (newErrors.phone && phoneRef.current) {
        phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        phoneRef.current.focus()
      } else if (newErrors.street && streetRef.current) {
        streetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        streetRef.current.focus()
      } else if (newErrors.area && areaRef.current) {
        areaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        areaRef.current.focus()
      }
      return false
    }

    return true
  }

  const handleSwitchToCart = () => {
    setCheckoutMode('cart')
    try {
      sessionStorage.removeItem(BUY_NOW_STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setBuyNowItem(null)
  }

  const handleOrderSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault()

    if (activeItems.length === 0) return

    if (!validateForm()) return

    const orderReference = `HFM-ORD-${Math.floor(100000 + Math.random() * 900000)}`
    const resolvedCity =
      customerInfo.city === 'Other'
        ? customerInfo.customCity?.trim() || 'Chattogram'
        : customerInfo.city

    const orderPayload = {
      orderRef: orderReference,
      customerInfo: {
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        email: customerInfo.email?.trim() || '',
      },
      deliveryAddress: {
        street: customerInfo.street.trim(),
        area: customerInfo.area.trim(),
        city: resolvedCity,
        landmark: customerInfo.landmark?.trim() || '',
      },
      paymentMethod: selectedPaymentMethod,
      items: activeItems,
      subtotal: activeSubtotal,
      customNotes: customerInfo.notes?.trim() || '',
    }

    // Generate clean, structured WhatsApp URL
    const whatsappUrl = createWhatsAppOrderUrl(orderPayload)

    // Save submitted order state for the success view
    setSubmittedOrder({
      ...orderPayload,
      whatsappUrl,
      checkoutMode: effectiveCheckoutMode,
    })
    setIsSubmitted(true)

    // Clear single purchase storage
    try {
      sessionStorage.removeItem(BUY_NOW_STORAGE_KEY)
    } catch {
      /* ignore */
    }

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // If order was successfully submitted, show confirmation screen matching brand theme
  if (isSubmitted && submittedOrder) {
    return (
      <div className="bg-canvas min-h-screen pt-24 pb-20 sm:pt-28 md:pt-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="border-border-subtle bg-surface shadow-card rounded-3xl border p-7 text-center sm:p-10">
            <div className="border-brass/30 bg-brass-light text-brass-dark mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border">
              <Check className="h-8 w-8 stroke-[2.5]" />
            </div>

            <span className="text-brass-dark text-xs font-semibold tracking-[0.2em] uppercase">
              Order Transferred to WhatsApp
            </span>

            <h1 className="text-text-primary mt-2 font-serif text-2xl font-normal sm:text-3xl">
              Thank You, {submittedOrder.customerInfo.name}
            </h1>

            <p className="text-text-secondary mx-auto mt-2 max-w-md text-xs leading-relaxed sm:text-sm">
              Your bespoke commission details have been formatted and dispatched
              to our official Heaven Furniture Mart WhatsApp atelier desk.
            </p>

            <div className="border-border-subtle bg-surface-muted/60 text-text-secondary mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs">
              <span>Order Ref:</span>
              <span className="text-brass-dark font-bold">
                {submittedOrder.orderRef}
              </span>
            </div>

            {/* Summary details */}
            <div className="border-border-subtle bg-surface-muted/40 my-7 rounded-2xl border p-4 text-left text-xs sm:text-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-text-muted text-label-sm block font-semibold tracking-wider uppercase">
                    Contact Phone
                  </span>
                  <span className="text-text-primary font-medium">
                    {submittedOrder.customerInfo.phone}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted text-label-sm block font-semibold tracking-wider uppercase">
                    Payment Selection
                  </span>
                  <span className="text-brass-dark font-medium">
                    {submittedOrder.paymentMethod.name}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-text-muted text-label-sm block font-semibold tracking-wider uppercase">
                    Delivery Destination
                  </span>
                  <span className="text-text-primary font-medium">
                    {submittedOrder.deliveryAddress.street},{' '}
                    {submittedOrder.deliveryAddress.area},{' '}
                    {submittedOrder.deliveryAddress.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons using brand components */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                as="a"
                href={submittedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                <MessageCircle className="text-brass h-4 w-4 shrink-0" />
                <span>Open WhatsApp Again</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  if (submittedOrder.checkoutMode === 'cart') {
                    clearCart()
                  }
                  navigate('/shop')
                }}
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>Return to Shop</span>
              </Button>
            </div>

            <p className="text-text-muted text-label-sm mt-6">
              Direct studio line:{' '}
              <a
                href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                className="text-brass-dark font-medium hover:underline"
              >
                {COMPANY_INFO.contact.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Empty Bag state
  if (activeItems.length === 0) {
    return (
      <div className="bg-canvas flex min-h-[75vh] items-center justify-center pt-24 pb-20 sm:pt-28 md:pt-32">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="border-border-warm bg-surface text-text-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border shadow-xs">
            <ShoppingBag className="h-8 w-8 stroke-1" />
          </div>
          <span className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase">
            Atelier Checkout
          </span>
          <h1 className="text-text-primary mt-2 font-serif text-3xl font-normal">
            Your Bag is Empty
          </h1>
          <p className="text-text-secondary mt-3 text-sm leading-relaxed">
            There are no bespoke items currently selected for checkout. Explore
            our artisanal collections to begin your order.
          </p>
          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => navigate('/shop')}
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span>Explore Furniture Collections</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-20 sm:pt-28 md:pt-32">
      <div className="container-page">
        {/* Breadcrumb matching ShopPage */}
        <nav
          aria-label="Breadcrumb"
          className="text-text-muted mb-4 flex items-center gap-1.5 text-xs select-none"
        >
          <Link
            to="/"
            className="hover:text-text-primary flex items-center gap-1 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <Link
            to="/shop"
            className="hover:text-text-primary transition-colors"
          >
            Shop
          </Link>
          <ChevronRight className="h-3 w-3 opacity-40" />
          <span className="text-text-primary font-medium">Checkout</span>
        </nav>

        {/* Atelier Header matching Heaven FM design language */}
        <header className="pt-2 pb-6 md:pt-4 md:pb-8">
          <div className="border-brass/30 bg-brass-light/60 text-brass-dark inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="text-brass h-3.5 w-3.5" />
            <span>Atelier Order Confirmation</span>
          </div>

          <h1 className="text-text-primary mt-3 font-serif text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
            Checkout
          </h1>

          <p className="text-text-secondary mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
            Confirm your delivery information and preferred payment method. Your
            order details will be cleanly prepared and forwarded to our WhatsApp
            atelier desk.
          </p>
        </header>

        {/* Switcher if user came from Buy Now single item, but also has cart items */}
        {effectiveCheckoutMode === 'single' && cartItems.length > 0 && (
          <div className="border-brass/30 bg-brass-light/40 mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <span className="bg-brass/20 text-brass-dark flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <div>
                <p className="text-text-primary text-xs font-semibold sm:text-sm">
                  Checking out single piece:{' '}
                  <span className="italic">{buyNowItem?.name}</span>
                </p>
                <p className="text-text-muted text-label-sm">
                  You also have {cartItems.length}{' '}
                  {cartItems.length === 1 ? 'item' : 'items'} in your shopping
                  bag.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSwitchToCart}
              className="text-brass-dark hover:text-charcoal-deep border-brass/40 hover:bg-brass/20 inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all"
            >
              <span>Switch to Full Bag ({cartItems.length} items)</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Two-Column Grid: Form (7 cols) & Sticky Summary (5 cols) */}
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-10">
          {/* Left Column: Form Sections */}
          <form
            onSubmit={handleOrderSubmit}
            className="space-y-6 lg:col-span-7"
          >
            {/* Section 1: Personal Information */}
            <div className="border-border-subtle bg-surface shadow-subtle rounded-2xl border p-5 sm:p-7">
              <div className="border-border-subtle mb-5 border-b pb-3">
                <span className="text-label-sm text-text-muted font-semibold tracking-[0.18em] uppercase">
                  Section 01
                </span>
                <h2 className="text-text-primary font-serif text-lg font-medium sm:text-xl">
                  Personal Information
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label
                    htmlFor="customer-name"
                    className="text-text-primary text-label-md font-semibold tracking-wide"
                  >
                    Full Name <span className="text-brass-dark">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="customer-name"
                      ref={nameRef}
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="e.g. Abul Kalam"
                      className={cn(controlStyles(!!errors.name), 'pl-10')}
                    />
                    <User className="text-text-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  </div>
                  {errors.name && (
                    <p className="text-destructive text-label-sm flex items-center gap-1.5 font-medium">
                      <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Contact Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="customer-phone"
                    className="text-text-primary text-label-md font-semibold tracking-wide"
                  >
                    Phone / WhatsApp <span className="text-brass-dark">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="customer-phone"
                      ref={phoneRef}
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      placeholder="e.g. +880 1960-481983"
                      className={cn(controlStyles(!!errors.phone), 'pl-10')}
                    />
                    <Phone className="text-text-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  </div>
                  {errors.phone ? (
                    <p className="text-destructive text-label-sm flex items-center gap-1.5 font-medium">
                      <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  ) : (
                    <span className="text-text-muted text-label-sm block">
                      WhatsApp coordination line
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="customer-email"
                      className="text-text-primary text-label-md font-semibold tracking-wide"
                    >
                      Email Address
                    </label>
                    <span className="text-text-muted text-label-sm">
                      Optional
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="customer-email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      placeholder="e.g. kalam@example.com"
                      className={cn(controlStyles(false), 'pl-10')}
                    />
                    <Mail className="text-text-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Address Information */}
            <div className="border-border-subtle bg-surface shadow-subtle rounded-2xl border p-5 sm:p-7">
              <div className="border-border-subtle mb-5 border-b pb-3">
                <span className="text-label-sm text-text-muted font-semibold tracking-[0.18em] uppercase">
                  Section 02
                </span>
                <h2 className="text-text-primary font-serif text-lg font-medium sm:text-xl">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-4">
                {/* City Chips */}
                <div className="space-y-1.5">
                  <label className="text-text-primary text-label-md font-semibold tracking-wide">
                    City / Division <span className="text-brass-dark">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {CITY_OPTIONS.map((cityOpt) => {
                      const isSelected = customerInfo.city === cityOpt
                      return (
                        <button
                          key={cityOpt}
                          type="button"
                          onClick={() => handleInputChange('city', cityOpt)}
                          className={cn(
                            'cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all select-none',
                            isSelected
                              ? 'bg-charcoal-deep text-canvas shadow-xs'
                              : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/40 border'
                          )}
                        >
                          {cityOpt}
                          {cityOpt === 'Chattogram' && (
                            <span className="py-0.2 text-label-xs ml-1.5 rounded-full bg-emerald-800/80 px-1.5 font-bold text-emerald-200 uppercase">
                              Free Delivery
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {customerInfo.city === 'Other' && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={customerInfo.customCity}
                        onChange={(e) =>
                          handleInputChange('customCity', e.target.value)
                        }
                        placeholder="Type district / city name (e.g. Cox's Bazar, Cumilla)"
                        className={controlStyles(!!errors.city)}
                      />
                      {errors.city && (
                        <p className="text-destructive text-label-sm mt-1 flex items-center gap-1.5 font-medium">
                          <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.city}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Area / Neighborhood */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="delivery-area"
                    className="text-text-primary text-label-md font-semibold tracking-wide"
                  >
                    Area / Neighborhood{' '}
                    <span className="text-brass-dark">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="delivery-area"
                      ref={areaRef}
                      type="text"
                      value={customerInfo.area}
                      onChange={(e) =>
                        handleInputChange('area', e.target.value)
                      }
                      placeholder="e.g. Agrabad, Khulshi, Nasirabad, GEC, Halishahar"
                      className={cn(controlStyles(!!errors.area), 'pl-10')}
                    />
                    <Building className="text-text-muted absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
                  </div>
                  {errors.area && (
                    <p className="text-destructive text-label-sm flex items-center gap-1.5 font-medium">
                      <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.area}</span>
                    </p>
                  )}
                </div>

                {/* Street Address / House */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="delivery-street"
                    className="text-text-primary text-label-md font-semibold tracking-wide"
                  >
                    Street Address / Building{' '}
                    <span className="text-brass-dark">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="delivery-street"
                      ref={streetRef}
                      rows={2}
                      value={customerInfo.street}
                      onChange={(e) =>
                        handleInputChange('street', e.target.value)
                      }
                      placeholder="e.g. House 14, Road 5, Block B, Flat 3A"
                      className={cn(controlStyles(!!errors.street), 'pl-10')}
                    />
                    <MapPin className="text-text-muted absolute top-3.5 left-3.5 h-4 w-4" />
                  </div>
                  {errors.street && (
                    <p className="text-destructive text-label-sm flex items-center gap-1.5 font-medium">
                      <CircleAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.street}</span>
                    </p>
                  )}
                </div>

                {/* Landmark (Optional) */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="delivery-landmark"
                      className="text-text-primary text-label-md font-semibold tracking-wide"
                    >
                      Landmark / Directions
                    </label>
                    <span className="text-text-muted text-label-sm">
                      Optional
                    </span>
                  </div>
                  <input
                    id="delivery-landmark"
                    type="text"
                    value={customerInfo.landmark}
                    onChange={(e) =>
                      handleInputChange('landmark', e.target.value)
                    }
                    placeholder="e.g. Opposite Central Mosque, near Agrabad Hotel"
                    className={controlStyles(false)}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Sized and Minimal Payment Method */}
            <div className="border-border-subtle bg-surface shadow-subtle rounded-2xl border p-5 sm:p-7">
              <div className="border-border-subtle mb-4 border-b pb-3">
                <span className="text-label-sm text-text-muted font-semibold tracking-[0.18em] uppercase">
                  Section 03
                </span>
                <h2 className="text-text-primary font-serif text-lg font-medium sm:text-xl">
                  Payment Method
                </h2>
              </div>

              {/* Sized and Minimal Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PAYMENT_METHODS.map((pm) => {
                  const isSelected = selectedPaymentId === pm.id
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setSelectedPaymentId(pm.id)}
                      className={cn(
                        'relative flex h-12 cursor-pointer items-center justify-between rounded-xl border px-3 transition-all duration-200 select-none',
                        isSelected
                          ? 'border-brass bg-brass-light/50 ring-brass/50 shadow-2xs ring-1'
                          : 'border-border-subtle bg-surface hover:border-brass/40 hover:bg-surface-muted/40'
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2 pr-1">
                        <div className="border-border-subtle/70 flex h-6 w-10 shrink-0 items-center justify-center rounded border bg-white p-0.5">
                          {pm.logo ? (
                            <img
                              src={pm.logo}
                              alt={pm.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <Banknote className="h-3.5 w-3.5 text-emerald-700" />
                          )}
                        </div>
                        <span className="text-text-primary truncate text-xs font-semibold">
                          {pm.name}
                        </span>
                      </div>

                      <div
                        className={cn(
                          'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-all',
                          isSelected
                            ? 'border-brass bg-brass text-charcoal-deep'
                            : 'border-border-warm bg-surface'
                        )}
                      >
                        {isSelected && <Check className="h-2 w-2 stroke-3" />}
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-text-muted text-label-sm mt-3 leading-relaxed">
                Payment details and verification will be coordinated directly
                with our atelier on WhatsApp.
              </p>
            </div>

            {/* Section 4: Special Instructions (Optional) */}
            <div className="border-border-subtle bg-surface shadow-subtle rounded-2xl border p-5 sm:p-7">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="text-brass h-4 w-4" />
                  <h2 className="text-text-primary font-serif text-base font-medium">
                    Special Atelier Instructions
                  </h2>
                </div>
                <span className="text-text-muted text-label-sm">Optional</span>
              </div>
              <textarea
                rows={2}
                value={customerInfo.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Specific room dimensions, fabric swatch requests, or delivery date preferences."
                className={cn(inputStyles(false), 'py-2.5 leading-relaxed')}
              />
            </div>

            {/* Mobile Submit CTA Button */}
            <div className="pt-2 lg:hidden">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                <MessageCircle className="text-brass h-4 w-4 shrink-0" />
                <span>Confirm &amp; Order on WhatsApp</span>
              </Button>
              <p className="text-text-muted text-label-sm mt-2 text-center">
                Prepares complete order, address, and payment information for
                WhatsApp
              </p>
            </div>
          </form>

          {/* Right Column: Sticky Order Summary (5 cols) */}
          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <aside className="border-border-subtle bg-surface shadow-card sticky top-24 rounded-2xl border p-5 sm:top-28 sm:p-7 md:top-32">
              <div className="border-border-subtle flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-text-muted text-label-xs font-semibold tracking-wider uppercase">
                    Order Summary
                  </span>
                  <h2 className="text-text-primary font-serif text-xl font-normal">
                    {effectiveCheckoutMode === 'single'
                      ? 'Single Piece Order'
                      : `Bespoke Bag (${activeItems.length})`}
                  </h2>
                </div>

                {effectiveCheckoutMode === 'single' ? (
                  <span className="border-brass/30 bg-brass-light text-brass-dark text-label-xs rounded-full border px-2.5 py-0.5 font-bold tracking-wider uppercase">
                    Buy Now
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="text-brass-dark hover:text-text-primary text-xs font-medium underline underline-offset-2"
                  >
                    Add pieces
                  </button>
                )}
              </div>

              {/* Ordered Items List */}
              <div className="divide-border-subtle/70 max-h-85 divide-y overflow-y-auto overscroll-contain py-2 pr-1">
                {activeItems.map((item, idx) => {
                  const lineTotal =
                    (Number(item.price) || 0) * (item.quantity || 1)
                  return (
                    <div
                      key={item.id || idx}
                      className="flex gap-3 py-3.5 first:pt-1 last:pb-1"
                    >
                      {/* Image Thumbnail */}
                      <div className="bg-surface-muted border-border-subtle relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-xl border">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="text-text-muted h-5 w-5" />
                          </div>
                        )}
                        <span className="bg-charcoal-deep text-brass text-label-xs absolute right-1 bottom-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-bold shadow-xs">
                          {item.quantity}×
                        </span>
                      </div>

                      {/* Item Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-text-primary line-clamp-1 font-serif text-sm font-medium">
                            {item.name}
                          </h3>
                          <span className="text-text-primary shrink-0 text-xs font-bold tabular-nums">
                            ৳{lineTotal.toLocaleString('en-US')}
                          </span>
                        </div>

                        <div className="text-label-sm text-text-secondary mt-0.5 flex flex-wrap items-center gap-1.5">
                          {item.sku && (
                            <span className="border-border-subtle bg-surface-muted text-text-muted text-label-xs rounded border px-1 font-mono">
                              {item.sku}
                            </span>
                          )}
                          <span className="truncate">{item.category}</span>
                        </div>

                        {item.finish && (
                          <p className="text-text-muted text-label-xs mt-0.5 truncate">
                            {item.finish}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="border-border-subtle space-y-2 border-t pt-4 text-xs">
                <div className="text-text-secondary flex items-center justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-text-primary font-semibold tabular-nums">
                    ৳{activeSubtotal.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="text-text-secondary flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>White-Glove Delivery</span>
                    <span className="text-text-muted text-label-xs">
                      (Chattogram)
                    </span>
                  </span>
                  <span className="text-label-sm font-semibold tracking-wider text-emerald-700 uppercase">
                    Complimentary
                  </span>
                </div>

                <div className="text-text-secondary flex items-center justify-between">
                  <span>3D Atelier Consultation</span>
                  <span className="text-label-sm font-semibold tracking-wider text-emerald-700 uppercase">
                    Included
                  </span>
                </div>

                <div className="border-border-subtle flex items-baseline justify-between border-t pt-3">
                  <span className="text-text-primary text-sm font-semibold">
                    Total
                  </span>
                  <span className="text-text-primary font-serif text-2xl font-normal tracking-tight tabular-nums">
                    ৳{activeSubtotal.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* Primary WhatsApp Order CTA using brand Button component */}
              <div className="mt-6">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleOrderSubmit}
                >
                  <MessageCircle className="text-brass h-4 w-4 shrink-0" />
                  <span>Confirm &amp; Order on WhatsApp</span>
                </Button>

                <p className="text-text-muted text-label-sm mt-2.5 text-center leading-normal">
                  Transfers customer, address &amp; payment details to our
                  official WhatsApp atelier desk.
                </p>
              </div>

              {/* Trust Details */}
              <div className="border-border-subtle/80 bg-surface-muted/50 text-label-sm text-text-secondary mt-5 rounded-xl border p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="text-brass mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <span className="text-text-primary font-semibold">
                      Atelier Guarantee:{' '}
                    </span>
                    Seasoned solid timber, traditional mortise-and-tenon
                    joinery, and tailored ergonomics.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

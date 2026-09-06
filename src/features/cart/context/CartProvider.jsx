import { useState, useEffect, useCallback, useMemo } from 'react'
import { CartContext } from './CartContext'
import { COMPANY_INFO } from '@/constants/companyData'
import { BESPOKE_PRODUCTS } from '@/constants/productsData'

const CART_STORAGE_KEY = 'heaven_bespoke_cart_v1'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error('Error loading cart from storage', err)
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [clientInfo, setClientInfo] = useState({
    name: '',
    location: '',
    notes: '',
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Error saving cart to storage', err)
    }
  }, [items])

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), [])

  const addItem = useCallback((product, quantity = 1, options = {}) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id
      )
      const stockLimit = product.stock ?? 99

      if (existingIndex > -1) {
        const updated = [...prevItems]
        const currentQty = updated[existingIndex].quantity
        const newQty = Math.min(currentQty + quantity, stockLimit)
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.max(1, newQty),
          stock: stockLimit,
          sku: product.sku || updated[existingIndex].sku || '',
          ...(options.notes ? { notes: options.notes } : {}),
        }
        return updated
      }

      return [
        ...prevItems,
        {
          id: product.id,
          sku: product.sku || '',
          stock: stockLimit,
          name: product.name,
          category: product.category,
          price: product.price,
          priceFormatted: product.priceFormatted,
          image: product.image,
          finish: product.finish,
          dimensions: product.dimensions,
          quantity: Math.min(Math.max(1, quantity), stockLimit),
          notes: options.notes || '',
        },
      ]
    })
    setIsCartOpen(true)
  }, [])

  const updateQuantity = useCallback((id, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const stockLimit = item.stock ?? 99
            const newQty = item.quantity + delta
            if (newQty <= 0) return null
            return { ...item, quantity: Math.min(newQty, stockLimit) }
          }
          return item
        })
        .filter(Boolean)
    })
  }, [])

  const setItemQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id))
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const stockLimit = item.stock ?? 99
          return { ...item, quantity: Math.min(quantity, stockLimit) }
        }
        return item
      })
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateItemNotes = useCallback((id, notes) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0)
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [items])

  const subtotalFormatted = useMemo(() => {
    return `৳${subtotal.toLocaleString('en-US')}`
  }, [subtotal])

  const generateWhatsAppUrl = useCallback(() => {
    if (items.length === 0) {
      return COMPANY_INFO.contact.whatsappUrl
    }

    const cleanPhone = COMPANY_INFO.contact.phoneClean.replace(/[^0-9]/g, '')
    const lines = [
      '👑 *HEAVEN FURNITURE MART — BESPOKE COMMISSION ORDER*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Assalamu Alaikum / Hello Heaven Furniture Atelier,',
      'I would like to place an order / request consultation for the following pieces:',
      '',
      '📋 *SELECTED BESPOKE PIECES:*',
    ]

    items.forEach((item, idx) => {
      const lineTotal = item.price * item.quantity
      lines.push(
        `${idx + 1}. *${item.name}* (SKU: ${item.sku || 'N/A'}, ${item.category})`,
        `   • Specs: ${item.finish || 'Standard Bespoke'}`,
        item.dimensions ? `   • Dimensions: ${item.dimensions}` : '',
        `   • Qty: ${item.quantity} × ৳${item.price.toLocaleString('en-US')} = *৳${lineTotal.toLocaleString('en-US')}*`
      )
      if (item.notes && item.notes.trim()) {
        lines.push(`   • Bespoke Note: "${item.notes.trim()}"`)
      }
      lines.push('')
    })

    lines.push(
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `💰 *ESTIMATED SUBTOTAL:* *${subtotalFormatted} BDT*`,
      '🚚 *White-Glove Delivery:* Complimentary across Chattogram',
      '📐 *Atelier Consultation & 3D Modeling:* Included',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    )

    if (clientInfo.name || clientInfo.location || clientInfo.notes) {
      lines.push('👤 *CLIENT INFORMATION:*')
      if (clientInfo.name.trim()) {
        lines.push(`• Name: ${clientInfo.name.trim()}`)
      }
      if (clientInfo.location.trim()) {
        lines.push(`• Delivery Location: ${clientInfo.location.trim()}`)
      }
      if (clientInfo.notes.trim()) {
        lines.push(`• Additional Requests: ${clientInfo.notes.trim()}`)
      }
      lines.push('')
    }

    lines.push(
      'Kindly confirm atelier workshop production timeline, material swatches, and next steps for our consultation.',
      '',
      'Thank you,'
    )

    const fullMessage = lines.filter((l) => l !== '').join('\n')
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`
  }, [items, subtotalFormatted, clientInfo])

  const value = {
    items,
    isCartOpen,
    totalCount,
    subtotal,
    subtotalFormatted,
    clientInfo,
    setClientInfo,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    updateQuantity,
    setItemQuantity,
    updateItemNotes,
    clearCart,
    generateWhatsAppUrl,
    sampleProducts: BESPOKE_PRODUCTS,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

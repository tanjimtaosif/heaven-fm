import { useState, useEffect, useRef } from 'react'
import heavenLogo from '@/assets/logo/heaven_logo.svg'
import { COMPANY_INFO } from '@/constants/companyData'
import { Button } from '@/components/ui'
import { ShoppingBag, Menu, X, Phone, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation Links in required sequence: Shop, About Us, Contact Us
const NAV_LINKS = [
  { label: 'Shop', href: '#collections', id: 'collections' },
  { label: 'About Us', href: '#why-us', id: 'why-us' },
  { label: 'Contact Us', href: '#contact', id: 'contact' },
]

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const cartRef = useRef(null)
  const mobileRef = useRef(null)
  const lastScrollYRef = useRef(0)

  // Detect scroll direction + elevation + active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      // Hide/show based on scroll direction (10px threshold to avoid jitter)
      const delta = currentScrollY - lastScrollYRef.current
      if (delta > 10 && currentScrollY > 80) {
        setIsNavHidden(true)
      } else if (delta < -10) {
        setIsNavHidden(false)
      }
      lastScrollYRef.current = currentScrollY

      const scrollPos = currentScrollY + 140
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const section = document.getElementById(NAV_LINKS[i].id)
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id)
          return
        }
      }
      if (currentScrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close modals on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false)
        setIsMobileOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false)
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Smooth scroll handler with offset for floating navbar
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileOpen(false)
    setIsCartOpen(false)

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const headerOffset = 90
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed top-3 right-0 left-0 z-50 w-full px-3 transition-all duration-500 ease-out sm:top-5 sm:px-6',
          isNavHidden && !isMobileOpen && !isCartOpen
            ? '-translate-y-[calc(100%+2rem)] opacity-0'
            : 'translate-y-0 opacity-100'
        )}
      >
        <div className="mx-auto max-w-5xl">
          {/* Main Floating Pill Navbar (Noir Atelier Dark Theme) */}
          <div
            className={cn(
              'pointer-events-auto flex items-center justify-between rounded-full border px-3.5 py-2 backdrop-blur-2xl transition-all duration-300 sm:px-5 sm:py-2.5',
              isScrolled
                ? 'bg-charcoal-deep/98 border-charcoal-border shadow-[0_14px_36px_-6px_rgba(0,0,0,0.55),0_4px_14px_-2px_rgba(0,0,0,0.3)]'
                : 'bg-charcoal-deep/92 border-charcoal-border/80 hover:border-brass/40 shadow-[0_10px_28px_-4px_rgba(0,0,0,0.4),0_2px_8px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.55)]'
            )}
          >
            {/* Left: Heaven Logo Asset */}
            <div className="flex shrink-0 items-center">
              <a
                href="#"
                onClick={(e) => handleNavClick(e, '#')}
                className="group focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep flex items-center rounded-full px-1 py-0.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-2"
                aria-label="Heaven Furniture Mart — Home"
              >
                <img
                  src={heavenLogo}
                  alt="Heaven Furniture Mart"
                  className="h-7 w-auto max-w-28.75 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-8 sm:max-w-35"
                />
              </a>
            </div>

            {/* Center: Desktop Nav Links [Shop] [About Us] [Contact Us] */}
            <nav
              aria-label="Primary Navigation"
              className="hidden items-center gap-1 md:flex lg:gap-2"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-sm',
                      isActive
                        ? 'bg-charcoal-surface text-brass border-charcoal-border/70 border font-semibold shadow-xs'
                        : 'text-text-inverse-muted hover:text-canvas hover:bg-charcoal-surface/80'
                    )}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>

            {/* Right: [Cart Icon] — [Get Quote CTA] + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Interactive Cart Icon Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(!isCartOpen)
                  setIsMobileOpen(false)
                }}
                className={cn(
                  'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep relative cursor-pointer rounded-full p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-2.5',
                  isCartOpen
                    ? 'bg-charcoal-surface text-brass border-charcoal-border border'
                    : 'text-canvas hover:text-brass hover:bg-charcoal-surface/80'
                )}
                aria-label="View shopping bag, 0 bespoke items"
                aria-expanded={isCartOpen}
              >
                <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                <span className="bg-brass text-charcoal-deep absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-xs">
                  0
                </span>
              </button>

              {/* Primary CTA: Get Quote (Satin Brass Button) */}
              <Button
                as="a"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                size="sm"
                variant="brass"
                className="hidden rounded-full px-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:brightness-105 active:scale-[0.98] sm:inline-flex lg:px-5"
              >
                Get Quote
              </Button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(!isMobileOpen)
                  setIsCartOpen(false)
                }}
                className="text-canvas hover:bg-charcoal-surface focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep cursor-pointer rounded-full p-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
                aria-label={
                  isMobileOpen
                    ? 'Close Navigation Menu'
                    : 'Open Navigation Menu'
                }
                aria-expanded={isMobileOpen}
                aria-controls="mobile-nav-panel"
              >
                {isMobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Floating Mobile Navigation Drawer (Dark Theme) */}
          {isMobileOpen && (
            <div
              id="mobile-nav-panel"
              ref={mobileRef}
              className="bg-charcoal-deep/98 border-charcoal-border text-canvas shadow-editorial-lg animate-fade-down pointer-events-auto mt-2 space-y-4 rounded-3xl border p-5 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-charcoal-surface text-brass border-charcoal-border/60 border font-semibold'
                          : 'text-canvas hover:bg-charcoal-surface/70 hover:text-brass'
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="text-brass h-4 w-4" />
                    </a>
                  )
                })}
              </div>

              {/* Quick Contact & Action */}
              <div className="border-charcoal-border space-y-3 border-t pt-3">
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                  className="bg-charcoal-surface/80 hover:bg-charcoal-surface text-text-inverse-muted hover:text-canvas flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs transition-colors"
                >
                  <Phone className="text-brass h-4 w-4 shrink-0" />
                  <span className="font-medium">
                    Agrabad Studio: {COMPANY_INFO.contact.phone}
                  </span>
                </a>

                <Button
                  as="a"
                  href="#contact"
                  size="md"
                  variant="brass"
                  className="w-full justify-center rounded-full text-xs font-semibold tracking-wider uppercase hover:brightness-105"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Interactive Floating Mini-Cart Drawer (Dark Theme) */}
      {isCartOpen && (
        <div className="pointer-events-auto fixed inset-0 z-50">
          {/* Backdrop Dim */}
          <div
            className="bg-charcoal-deep/40 animate-fade-in fixed inset-0 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Cart Panel */}
          <div
            ref={cartRef}
            className="bg-charcoal-deep/98 border-charcoal-border text-canvas shadow-editorial-lg animate-scale-in fixed top-18 right-3 z-50 w-[calc(100%-1.5rem)] space-y-5 rounded-3xl border p-6 backdrop-blur-2xl sm:top-20 sm:right-6 sm:w-96 lg:right-10"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag & Bespoke Selections"
          >
            {/* Header */}
            <div className="border-charcoal-border flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brass h-4 w-4" />
                <h3 className="text-canvas font-serif text-lg font-semibold tracking-tight">
                  Bespoke Selections
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-text-inverse-muted hover:text-canvas hover:bg-charcoal-surface cursor-pointer rounded-full p-1.5 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Body: Empty State with Bespoke Prompt */}
            <div className="space-y-3 py-6 text-center">
              <div className="bg-charcoal-surface text-brass border-charcoal-border shadow-subtle mx-auto flex h-12 w-12 items-center justify-center rounded-full border">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-canvas text-sm font-semibold">
                  Your Curated Bag is Empty
                </p>
                <p className="text-text-inverse-muted mx-auto max-w-xs text-xs leading-relaxed">
                  Every Heaven piece is custom designed & crafted to measure.
                  Explore our collections or request an atelier consultation.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-charcoal-border space-y-2.5 border-t pt-2">
              <Button
                as="a"
                href="#collections"
                variant="outlineDark"
                size="sm"
                className="w-full justify-center rounded-full text-xs font-semibold tracking-wide"
                onClick={(e) => handleNavClick(e, '#collections')}
              >
                Browse Collections
              </Button>

              <Button
                as="a"
                href="#contact"
                variant="brass"
                size="sm"
                className="w-full justify-center rounded-full text-xs font-semibold tracking-wide hover:brightness-105"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Get Quote for Custom Piece
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

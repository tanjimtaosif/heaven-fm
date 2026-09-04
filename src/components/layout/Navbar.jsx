import { useState, useEffect, useRef, useCallback } from 'react'
import { useLenis } from '@/components/providers'
import { useCart } from '@/context'
import heavenLogo from '@/assets/logo/heaven_logo.svg'
import { COMPANY_INFO } from '@/constants/companyData'
import { Button } from '@/components/ui'
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Navigation Links in required sequence: Shop, About Us, Contact Us
// `mega: true` marks the entry that reveals the collections mega menu.
const NAV_LINKS = [
  { label: 'Shop', href: '#/shop', id: 'shop', mega: true },
  { label: 'About Us', href: '#why-us', id: 'why-us' },
  { label: 'Contact Us', href: '#contact', id: 'contact' },
]

// The mega menu is driven by the same category source as the Collections
// section, so the two can never drift apart.
const CATEGORIES = COMPANY_INFO.categories
const ROOM_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'bespoke-commissions')
const BESPOKE_CATEGORY = CATEGORIES.find((c) => c.id === 'bespoke-commissions')

// In shop mode, category links filter the catalog directly
const categoryHref = (id) =>
  id === 'bespoke-commissions' ? '#contact' : `#/shop?category=${id}`

// Shared reveal curve — the same expo-out the rest of the site scrolls with.
const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export const Navbar = ({ isShopView = false, onNavigateHome }) => {
  const lenis = useLenis()
  const { isCartOpen, toggleCart, openCart, closeCart, totalCount } = useCart()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isCompactViewport, setIsCompactViewport] = useState(false)
  const headerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const megaTimerRef = useRef(null)

  /* ------------------------------------------------------------------ *
   * Mega menu open/close with hover intent.
   * The short close delay keeps the panel alive while the pointer
   * crosses the gap between the pill and the panel below it.
   * ------------------------------------------------------------------ */
  const clearMegaTimer = () => {
    if (megaTimerRef.current) {
      clearTimeout(megaTimerRef.current)
      megaTimerRef.current = null
    }
  }

  const openMegaMenu = () => {
    clearMegaTimer()
    setIsMegaOpen(true)
  }

  const closeMegaMenu = useCallback(() => {
    clearMegaTimer()
    setIsMegaOpen(false)
    setActiveCategory(null)
  }, [])

  const scheduleMegaClose = (delay = 160) => {
    clearMegaTimer()
    megaTimerRef.current = setTimeout(() => {
      megaTimerRef.current = null
      setIsMegaOpen(false)
      setActiveCategory(null)
    }, delay)
  }

  useEffect(() => clearMegaTimer, [])

  // Track the phone breakpoint (Tailwind `md`), which governs how the
  // pill behaves once the hero is behind the reader.
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767.98px)')
    const sync = () => setIsCompactViewport(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // Detect scroll direction + elevation + active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      const delta = currentScrollY - lastScrollYRef.current

      if (isCompactViewport) {
        // On phones the pill stands down for good once the hero is behind
        // the reader — direction no longer matters — and comes back only
        // when they scroll into the hero again.
        const hero = document.getElementById('hero')
        const heroBottom = hero
          ? hero.offsetTop + hero.offsetHeight
          : window.innerHeight
        setIsNavHidden(currentScrollY + 100 > heroBottom)
      } else if (delta > 10 && currentScrollY > 80) {
        // Desktop keeps the scroll-direction reveal (10px threshold to
        // avoid jitter)
        setIsNavHidden(true)
      } else if (delta < -10) {
        setIsNavHidden(false)
      }
      // A panel anchored to the pill has no business riding the page
      // down — dismiss it as soon as the reader moves.
      if (Math.abs(delta) > 6) {
        closeMegaMenu()
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
  }, [closeMegaMenu, isCompactViewport])

  // Close drawer / mega menu on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        closeMegaMenu()
      }
    }

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMobileOpen(false)
        closeMegaMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeMegaMenu])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (!lenis) return
    if (isMobileOpen) {
      lenis.stop()
    } else if (!isCartOpen) {
      lenis.start()
    }
  }, [isMobileOpen, isCartOpen, lenis])

  // Collapse the Shop accordion only once the drawer has finished closing,
  // so the panel never snaps shorter mid-animation.
  useEffect(() => {
    if (isMobileOpen) return
    const timer = setTimeout(() => setIsMobileShopOpen(false), 460)
    return () => clearTimeout(timer)
  }, [isMobileOpen])

  // Keyboard users tabbing out of the header should not strand the panel
  const handleHeaderBlur = (e) => {
    if (!headerRef.current) return
    if (!headerRef.current.contains(e.relatedTarget)) {
      closeMegaMenu()
    }
  }

  // Smooth scroll handler with offset for floating navbar
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileOpen(false)
    closeMegaMenu()
    closeCart()

    const easeOutExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    if (href === '#' || href === '') {
      if (isShopView && onNavigateHome) {
        onNavigateHome()
        return
      }
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5, easing: easeOutExpo })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (href.startsWith('#/shop') || href === '#shop') {
      window.location.hash = href
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (isShopView) {
      window.location.hash = href
      setTimeout(() => {
        const targetId = href.replace('#', '')
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return
    }

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -90,
          duration: 1.5,
          easing: easeOutExpo,
        })
      } else {
        const headerOffset = 90
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }


  return (
    <>
      <header
        ref={headerRef}
        onBlur={handleHeaderBlur}
        className={cn(
          'pointer-events-none fixed top-3 right-0 left-0 z-50 w-full px-3 transition-all duration-500 ease-out sm:top-5 sm:px-6',
          isNavHidden && !isMobileOpen && !isCartOpen && !isMegaOpen
            ? '-translate-y-[calc(100%+2rem)] opacity-0'
            : 'translate-y-0 opacity-100'
        )}
      >
        <div className="mx-auto max-w-5xl">
          {/* Main Floating Pill Navbar (Noir Atelier Dark Theme) */}
          <div
            className={cn(
              'pointer-events-auto flex items-center justify-between rounded-full border px-3.5 py-2 backdrop-blur-2xl transition-all duration-300 sm:px-5 sm:py-2.5',
              isScrolled || isMegaOpen
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

            {/* Center: Desktop Nav Links [Shop ⌄] [About Us] [Contact Us] */}
            <nav
              aria-label="Primary Navigation"
              className="hidden items-center gap-1 md:flex lg:gap-2"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id

                // Shop — anchor plus a chevron toggle sharing one pill, so
                // pointer users hover and keyboard users can still open it.
                if (link.mega) {
                  return (
                    <div
                      key={link.label}
                      onMouseEnter={openMegaMenu}
                      onMouseLeave={() => scheduleMegaClose()}
                      className={cn(
                        'flex items-center rounded-full border transition-all duration-200',
                        isActive || isMegaOpen
                          ? 'bg-charcoal-surface border-charcoal-border/70 shadow-xs'
                          : 'hover:bg-charcoal-surface/80 border-transparent'
                      )}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep rounded-full py-1.5 pr-1 pl-4 text-xs font-medium tracking-wide transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-sm',
                          isActive || isMegaOpen
                            ? 'text-brass font-semibold'
                            : 'text-text-inverse-muted hover:text-canvas'
                        )}
                      >
                        {link.label}
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          isMegaOpen ? closeMegaMenu() : openMegaMenu()
                        }
                        className={cn(
                          'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep cursor-pointer rounded-full py-1.5 pr-3 pl-0.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                          isActive || isMegaOpen
                            ? 'text-brass'
                            : 'text-text-inverse-muted hover:text-canvas'
                        )}
                        aria-label={
                          isMegaOpen
                            ? 'Close collections menu'
                            : 'Open collections menu'
                        }
                        aria-expanded={isMegaOpen}
                        aria-controls="shop-mega-menu"
                        aria-haspopup="true"
                      >
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-300',
                            EASE,
                            isMegaOpen && 'rotate-180'
                          )}
                        />
                      </button>
                    </div>
                  )
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onMouseEnter={() => scheduleMegaClose(80)}
                    className={cn(
                      'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-sm',
                      isActive
                        ? 'bg-charcoal-surface text-brass border-charcoal-border/70 font-semibold shadow-xs'
                        : 'text-text-inverse-muted hover:text-canvas hover:bg-charcoal-surface/80 border-transparent'
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
                  toggleCart()
                  setIsMobileOpen(false)
                  closeMegaMenu()
                }}
                className={cn(
                  'focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep relative cursor-pointer rounded-full p-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-2.5',
                  isCartOpen
                    ? 'bg-charcoal-surface text-brass border-charcoal-border shadow-glow-brass border'
                    : 'text-canvas hover:text-brass hover:bg-charcoal-surface/80'
                )}
                aria-label={`View shopping bag, ${totalCount} bespoke items`}
                aria-expanded={isCartOpen}
              >
                <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                {totalCount > 0 && (
                  <span className="bg-brass text-charcoal-deep animate-scale-in absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-xs">
                    {totalCount}
                  </span>
                )}
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
                {/* Both glyphs stay mounted and cross-rotate, so the toggle
                    turns into its counterpart instead of blinking */}
                <span className="relative block h-5 w-5">
                  <Menu
                    className={cn(
                      'absolute inset-0 h-5 w-5 transition-all duration-300 motion-reduce:transition-none',
                      EASE,
                      isMobileOpen
                        ? 'scale-75 rotate-90 opacity-0'
                        : 'scale-100 rotate-0 opacity-100'
                    )}
                  />
                  <X
                    className={cn(
                      'absolute inset-0 h-5 w-5 transition-all duration-300 motion-reduce:transition-none',
                      EASE,
                      isMobileOpen
                        ? 'scale-100 rotate-0 opacity-100'
                        : 'scale-75 -rotate-90 opacity-0'
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* ============================================================ *
           * Desktop Mega Menu — Collections
           * The 0fr → 1fr grid row is what lets this open smoothly at
           * whatever height the content happens to be, with no measuring.
           * ============================================================ */}
          <div
            className={cn(
              'hidden transition-all duration-500 motion-reduce:transition-none md:grid',
              EASE,
              isMegaOpen
                ? 'mt-2 grid-rows-[1fr] opacity-100'
                : 'mt-0 grid-rows-[0fr] opacity-0'
            )}
            aria-hidden={!isMegaOpen}
          >
            <div className="overflow-hidden">
              <div
                id="shop-mega-menu"
                inert={!isMegaOpen}
                onMouseEnter={openMegaMenu}
                onMouseLeave={() => scheduleMegaClose()}
                className={cn(
                  'bg-charcoal-deep/98 border-charcoal-border shadow-editorial-lg rounded-3xl border p-4 backdrop-blur-2xl transition-transform duration-500 motion-reduce:transition-none',
                  EASE,
                  isMegaOpen
                    ? 'pointer-events-auto translate-y-0'
                    : 'pointer-events-none -translate-y-3'
                )}
              >
                <div className="grid gap-2 lg:grid-cols-3">
                  {/* Room categories */}
                  <div className="grid gap-2 sm:grid-cols-2 lg:col-span-2">
                    {ROOM_CATEGORIES.map((category, index) => (
                      <div
                        key={category.id}
                        style={{
                          transitionDelay: isMegaOpen
                            ? `${70 + index * 55}ms`
                            : '0ms',
                        }}
                        className={cn(
                          'transition-[opacity,transform] duration-500 motion-reduce:transition-none',
                          EASE,
                          isMegaOpen
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-2.5 opacity-0'
                        )}
                      >
                        <a
                          href={categoryHref(category.id)}
                          onClick={(e) =>
                            handleNavClick(e, categoryHref(category.id))
                          }
                          onMouseEnter={() => setActiveCategory(category.id)}
                          onMouseLeave={() => setActiveCategory(null)}
                          onFocus={() => setActiveCategory(category.id)}
                          className="group border-charcoal-border/60 bg-charcoal-surface/45 hover:border-brass/45 hover:bg-charcoal-surface focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep flex h-full flex-col rounded-2xl border p-3.5 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-canvas group-hover:text-brass font-serif text-[15px] leading-snug transition-colors duration-300">
                              {category.title}
                            </span>
                            <ArrowRight className="text-brass mt-0.5 h-3.5 w-3.5 shrink-0 -translate-x-1.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </div>
                          <span className="text-text-inverse-muted mt-1 text-[11px] leading-relaxed">
                            {category.subtitle}
                          </span>
                          <span className="text-text-inverse-muted/65 mt-2.5 text-[10px] tracking-wide">
                            {category.items.slice(0, 3).join('  ·  ')}
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Bespoke commissions — the signature branch */}
                  {BESPOKE_CATEGORY && (
                    <div
                      style={{ transitionDelay: isMegaOpen ? '290ms' : '0ms' }}
                      className={cn(
                        'transition-[opacity,transform] duration-500 motion-reduce:transition-none',
                        EASE,
                        isMegaOpen
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-2.5 opacity-0'
                      )}
                    >
                      <a
                        href={categoryHref(BESPOKE_CATEGORY.id)}
                        onClick={(e) =>
                          handleNavClick(e, categoryHref(BESPOKE_CATEGORY.id))
                        }
                        onMouseEnter={() =>
                          setActiveCategory(BESPOKE_CATEGORY.id)
                        }
                        onMouseLeave={() => setActiveCategory(null)}
                        onFocus={() => setActiveCategory(BESPOKE_CATEGORY.id)}
                        className="group border-brass/35 from-brass/15 to-charcoal-surface/60 hover:border-brass/60 focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep flex h-full flex-col justify-between rounded-2xl border bg-linear-to-b p-3.5 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <div>
                          <span className="text-brass inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase">
                            <Sparkles className="h-2.5 w-2.5" />
                            Atelier Signature
                          </span>
                          <p className="text-canvas mt-2 font-serif text-[15px] leading-snug">
                            {BESPOKE_CATEGORY.title}
                          </p>
                          <p className="text-text-inverse-muted mt-1 text-[11px] leading-relaxed">
                            {BESPOKE_CATEGORY.note || BESPOKE_CATEGORY.subtitle}
                          </p>
                        </div>
                        <span className="text-canvas/90 group-hover:text-brass mt-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300">
                          {BESPOKE_CATEGORY.ctaLabel}
                          <ArrowRight className="text-brass h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Panel footer: studio line + quote CTA */}
                <div
                  style={{ transitionDelay: isMegaOpen ? '350ms' : '0ms' }}
                  className={cn(
                    'border-charcoal-border mt-3 flex items-center justify-between gap-4 border-t pt-3 transition-[opacity,transform] duration-500 motion-reduce:transition-none',
                    EASE,
                    isMegaOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  )}
                >
                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                    className="text-text-inverse-muted hover:text-canvas inline-flex items-center gap-2 text-[11px] transition-colors duration-200"
                  >
                    <Phone className="text-brass h-3.5 w-3.5 shrink-0" />
                    <span className="font-medium">
                      Agrabad Studio: {COMPANY_INFO.contact.phone}
                    </span>
                  </a>
                  <Button
                    as="a"
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    size="sm"
                    variant="brass"
                    className="shrink-0 rounded-full px-4 text-[11px] font-semibold tracking-wider uppercase hover:brightness-105"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>


          {/* ============================================================ *
           * Floating Mobile Navigation Drawer (Dark Theme)
           * Kept mounted so it animates on the way out as well as in.
           * ============================================================ */}
          <div
            className={cn(
              'grid transition-all duration-500 motion-reduce:transition-none md:hidden',
              EASE,
              isMobileOpen
                ? 'mt-2 grid-rows-[1fr] opacity-100'
                : 'mt-0 grid-rows-[0fr] opacity-0'
            )}
            aria-hidden={!isMobileOpen}
          >
            <div className="overflow-hidden">
              <div
                id="mobile-nav-panel"
                inert={!isMobileOpen}
                data-lenis-prevent
                className={cn(
                  'bg-charcoal-deep/98 border-charcoal-border text-canvas shadow-editorial-lg max-h-[calc(100dvh-7rem)] space-y-4 overflow-y-auto rounded-3xl border p-5 backdrop-blur-2xl transition-transform duration-500 motion-reduce:transition-none',
                  EASE,
                  isMobileOpen
                    ? 'pointer-events-auto translate-y-0'
                    : 'pointer-events-none -translate-y-3'
                )}
              >
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id

                    // Shop expands into the same collections tree the
                    // desktop mega menu shows.
                    if (link.mega) {
                      return (
                        <div key={link.label}>
                          <button
                            type="button"
                            onClick={() => setIsMobileShopOpen((v) => !v)}
                            aria-expanded={isMobileShopOpen}
                            aria-controls="mobile-shop-tree"
                            className={cn(
                              'flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-base font-medium transition-colors',
                              isActive || isMobileShopOpen
                                ? 'bg-charcoal-surface text-brass border-charcoal-border/60 font-semibold'
                                : 'text-canvas hover:bg-charcoal-surface/70 hover:text-brass border-transparent'
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={cn(
                                'text-brass h-4 w-4 transition-transform duration-300 motion-reduce:transition-none',
                                EASE,
                                isMobileShopOpen && 'rotate-180'
                              )}
                            />
                          </button>

                          <div
                            id="mobile-shop-tree"
                            className={cn(
                              'grid transition-all duration-500 motion-reduce:transition-none',
                              EASE,
                              isMobileShopOpen
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0'
                            )}
                          >
                            <div className="overflow-hidden">
                              <div className="border-charcoal-border mt-1 ml-4 space-y-0.5 border-l pl-3">
                                <a
                                  href="#collections"
                                  onClick={(e) =>
                                    handleNavClick(e, '#collections')
                                  }
                                  className="text-text-inverse-muted hover:bg-charcoal-surface/70 hover:text-brass flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors"
                                >
                                  <span>All Collections</span>
                                  <ArrowRight className="text-brass h-3.5 w-3.5" />
                                </a>
                                {CATEGORIES.map((category, index) => (
                                  <a
                                    key={category.id}
                                    href={categoryHref(category.id)}
                                    onClick={(e) =>
                                      handleNavClick(
                                        e,
                                        categoryHref(category.id)
                                      )
                                    }
                                    style={{
                                      transitionDelay: isMobileShopOpen
                                        ? `${60 + index * 40}ms`
                                        : '0ms',
                                    }}
                                    className={cn(
                                      'text-text-inverse-muted hover:bg-charcoal-surface/70 hover:text-brass flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-[opacity,transform,color,background-color] duration-400 motion-reduce:transition-none',
                                      EASE,
                                      isMobileShopOpen
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-2 opacity-0'
                                    )}
                                  >
                                    <span>{category.title}</span>
                                    <ChevronRight className="text-brass/70 h-3.5 w-3.5" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          'flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-charcoal-surface text-brass border-charcoal-border/60 font-semibold'
                            : 'text-canvas hover:bg-charcoal-surface/70 hover:text-brass border-transparent'
                        )}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="text-brass h-4 w-4" />
                      </a>
                    )
                  })}

                  {/* Mobile Bespoke Bag Shortcut */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileOpen(false)
                      openCart()
                    }}
                    className="hover:bg-charcoal-surface/70 text-canvas flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShoppingBag className="text-brass h-4 w-4" />
                      <span>Bespoke Bag</span>
                    </div>
                    <span className="bg-brass/20 text-brass border-brass/40 rounded-full border px-2 py-0.5 text-xs font-bold">
                      {totalCount} {totalCount === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </button>
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
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

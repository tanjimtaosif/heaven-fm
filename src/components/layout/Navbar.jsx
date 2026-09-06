import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLenis } from '@/components/providers'
import { useCart } from '@/context'
import { useQuotation } from '@/features/quotation'
import heavenLogo from '@/assets/logo/heaven_logo_dark.svg'
import { COMPANY_INFO } from '@/constants/companyData'
import { Button } from '@/components/ui'
import { useIsMobile } from '@/hooks'
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

import sofaCat from '@/assets/category/sofa-cat.webp'
import bedCat from '@/assets/category/bed-cat.webp'
import diningCat from '@/assets/category/dining-cat.webp'
import officeCat from '@/assets/category/office-cat.webp'
import { PRODUCT_CATEGORIES } from '@/constants/productsData'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop', id: 'shop', mega: true },
  { label: 'About Us', href: '#why-us', id: 'why-us' },
  { label: 'Contact Us', href: '#contact', id: 'contact' },
]

const CATEGORIES = COMPANY_INFO.categories
const ROOM_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'bespoke-commissions')
const BESPOKE_CATEGORY = CATEGORIES.find((c) => c.id === 'bespoke-commissions')

const CATEGORY_THUMBNAILS = {
  'living-room': sofaCat,
  bedroom: bedCat,
  dining: diningCat,
  'office-study': officeCat,
}

const getCategoryCount = (id) =>
  PRODUCT_CATEGORIES.find((c) => c.id === id)?.count || 0

const TOTAL_PIECES = getCategoryCount('all')

const categoryHref = (id) =>
  id === 'bespoke-commissions'
    ? '/shop?category=bespoke'
    : `/shop?category=${id}`

const subcategoryHref = (catId, subId) =>
  `/shop?category=${catId}&subcategory=${subId}`

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

const PANEL_SHELL =
  'bg-surface border-border-subtle rounded-3xl border shadow-[0_28px_60px_-28px_rgba(31,26,23,0.30),0_6px_18px_-12px_rgba(31,26,23,0.14)]'

export const Navbar = ({ onNavigateHome }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const lenis = useLenis()
  const { isCartOpen, toggleCart, openCart, closeCart, totalCount } = useCart()
  const { openQuotation } = useQuotation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isCompactViewport = useIsMobile()
  const headerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const megaTimerRef = useRef(null)

  const searchParams = new URLSearchParams(location.search)
  const rawCategory = searchParams.get('category') || 'all'
  const activeCategoryFromUrl =
    rawCategory === 'bespoke-commissions' ? 'bespoke' : rawCategory
  const activeSubcategoryFromUrl =
    searchParams.get('subcategory') || searchParams.get('sub') || 'all'
  const isShopActive = location.pathname.startsWith('/shop')

  const isPanelOpen = isMegaOpen || isMobileOpen

  const isLinkActive = (link) => {
    if (link.id === 'shop') {
      return isShopActive || activeSection === 'shop'
    }
    return activeSection === link.id
  }

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
  }, [])

  const scheduleMegaClose = (delay = 220) => {
    clearMegaTimer()
    megaTimerRef.current = setTimeout(() => {
      megaTimerRef.current = null
      setIsMegaOpen(false)
    }, delay)
  }

  useEffect(() => clearMegaTimer, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      const delta = currentScrollY - lastScrollYRef.current

      if (isCompactViewport) {
        const hero = document.getElementById('hero')
        const heroBottom = hero
          ? hero.offsetTop + hero.offsetHeight
          : window.innerHeight
        setIsNavHidden(currentScrollY + 100 > heroBottom)
      } else if (delta > 10 && currentScrollY > 80) {
        setIsNavHidden(true)
      } else if (delta < -10) {
        setIsNavHidden(false)
      }
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

  useEffect(() => {
    if (!lenis) return
    if (isMobileOpen) {
      lenis.stop()
    } else if (!isCartOpen) {
      lenis.start()
    }
  }, [isMobileOpen, isCartOpen, lenis])

  useEffect(() => {
    if (isMobileOpen) return
    const timer = setTimeout(() => setIsMobileShopOpen(false), 460)
    return () => clearTimeout(timer)
  }, [isMobileOpen])

  const handleQuoteClick = (prefill) => {
    setIsMobileOpen(false)
    closeMegaMenu()
    closeCart()
    openQuotation(prefill)
  }

  const handleHeaderBlur = (e) => {
    if (!headerRef.current) return
    if (!headerRef.current.contains(e.relatedTarget)) {
      closeMegaMenu()
    }
  }

  const handleNavClick = (e, href) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    setIsMobileOpen(false)
    closeMegaMenu()
    closeCart()

    const easeOutExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

    if (href === '#' || href === '' || href === '/') {
      if (location.pathname !== '/') {
        navigate('/')
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2, easing: easeOutExpo })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }
      if (onNavigateHome) {
        onNavigateHome()
        return
      }
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2, easing: easeOutExpo })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (
      href.startsWith('/shop') ||
      href.startsWith('#/shop') ||
      href === '#shop'
    ) {
      const targetUrl = href.replace(/^#/, '')
      const isAlreadyOnShop = location.pathname === '/shop'
      navigate(targetUrl)

      if (isAlreadyOnShop) {
        // Smoothly scroll down to the product catalog grid
        setTimeout(() => {
          const gridTop =
            document.getElementById('product-catalog-grid') ||
            document.querySelector('.scroll-mt-28')
          if (gridTop) {
            if (lenis) {
              lenis.scrollTo(gridTop, {
                offset: -110,
                duration: 1.0,
                easing: easeOutExpo,
              })
            } else {
              gridTop.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          } else {
            if (lenis) {
              lenis.scrollTo(0, { duration: 0.8, easing: easeOutExpo })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }
        }, 50)
      } else {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
      return
    }

    const hashMatch = href.includes('#') ? href.slice(href.indexOf('#')) : href
    const targetId = hashMatch.replace('#', '')

    if (location.pathname !== '/') {
      navigate(`/${hashMatch}`)
      setTimeout(() => {
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          if (lenis) {
            lenis.scrollTo(targetElement, {
              offset: -90,
              duration: 1.2,
              easing: easeOutExpo,
            })
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }, 100)
      return
    }

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
    <header
      ref={headerRef}
      onBlur={handleHeaderBlur}
      className={cn(
        'pointer-events-none fixed top-3 right-0 left-0 z-50 w-full px-3 transition-all duration-500 ease-out sm:top-5 sm:px-6',
        isNavHidden && !isPanelOpen && !isCartOpen
          ? '-translate-y-[calc(100%+2rem)] opacity-0'
          : 'translate-y-0 opacity-100'
      )}
    >
      <div className="relative mx-auto max-w-5xl">
        <div
          className={cn(
            'pointer-events-auto relative z-20 flex items-center justify-between rounded-full border px-3.5 py-2 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 sm:py-2.5',
            isPanelOpen
              ? 'bg-surface border-border-warm shadow-[0_10px_28px_-18px_rgba(31,26,23,0.22)]'
              : isScrolled
                ? 'bg-surface/92 border-border-subtle shadow-[0_12px_32px_-16px_rgba(31,26,23,0.24)] backdrop-blur-xl'
                : 'bg-surface/70 border-border-subtle/70 hover:border-brass/40 shadow-[0_8px_24px_-16px_rgba(31,26,23,0.18)] backdrop-blur-xl'
          )}
        >
          <div className="flex shrink-0 items-center">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className={cn(
                'group flex items-center rounded-full px-1 py-0.5 transition-opacity duration-200 hover:opacity-75 sm:px-2',
                FOCUS_RING
              )}
              aria-label="Heaven Furniture Mart — Home"
            >
              <img
                src={heavenLogo}
                alt="Heaven Furniture Mart"
                className="h-7 w-auto max-w-28.75 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-8 sm:max-w-35"
              />
            </a>
          </div>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-1 md:flex lg:gap-1.5"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link)

              if (link.mega) {
                const isHighlighted = isActive || isMegaOpen

                return (
                  <div
                    key={link.label}
                    onMouseEnter={openMegaMenu}
                    onMouseLeave={() => scheduleMegaClose()}
                    className={cn(
                      'flex items-center rounded-full border transition-colors duration-200',
                      isHighlighted
                        ? 'border-brass-border bg-brass-light'
                        : 'hover:bg-surface-muted border-transparent'
                    )}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'rounded-full py-1.5 pr-1 pl-4 text-xs font-medium tracking-wide transition-colors duration-200 lg:text-sm',
                        FOCUS_RING,
                        isHighlighted
                          ? 'text-brass-dark font-semibold'
                          : 'text-text-secondary hover:text-text-primary'
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
                        'cursor-pointer rounded-full py-1.5 pr-3 pl-0.5 transition-colors duration-200',
                        FOCUS_RING,
                        isHighlighted
                          ? 'text-brass-dark'
                          : 'text-text-muted hover:text-text-primary'
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
                          'h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none',
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
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 lg:text-sm',
                    FOCUS_RING,
                    isActive
                      ? 'border-brass-border bg-brass-light text-brass-dark font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted border-transparent'
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={() => {
                toggleCart()
                setIsMobileOpen(false)
                closeMegaMenu()
              }}
              onMouseEnter={() => scheduleMegaClose(80)}
              className={cn(
                'relative cursor-pointer rounded-full border p-2 transition-colors duration-200 sm:p-2.5',
                FOCUS_RING,
                isCartOpen
                  ? 'border-brass-border bg-brass-light text-brass-dark'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted border-transparent'
              )}
              aria-label={`View shopping bag, ${totalCount} bespoke items`}
              aria-expanded={isCartOpen}
            >
              <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {totalCount > 0 && (
                <span className="bg-brass text-charcoal-deep ring-surface animate-scale-in text-label-xs absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 font-bold ring-2">
                  {totalCount}
                </span>
              )}
            </button>

            <Button
              onClick={() => handleQuoteClick()}
              onMouseEnter={() => scheduleMegaClose(80)}
              size="sm"
              variant="brass"
              className="hidden rounded-full px-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:brightness-105 active:scale-[0.98] sm:inline-flex lg:px-5"
            >
              Get Quote
            </Button>

            <button
              type="button"
              onClick={() => {
                setIsMobileOpen(!isMobileOpen)
              }}
              className={cn(
                'text-text-primary hover:bg-surface-muted cursor-pointer rounded-full p-2 transition-colors md:hidden',
                FOCUS_RING
              )}
              aria-label={
                isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'
              }
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-panel"
            >
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

        {/* Absolutely positioned so opening never reflows the bar, and no
            ancestor clips it — nothing to bleed a shadow or a corner. The
            pt-2 gutter doubles as the hover bridge across the gap. */}
        <div
          onMouseEnter={openMegaMenu}
          onMouseLeave={() => scheduleMegaClose()}
          className={cn(
            'absolute inset-x-0 top-full z-10 hidden pt-2 md:block',
            isMegaOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          <div
            id="shop-mega-menu"
            inert={!isMegaOpen}
            className={cn(
              PANEL_SHELL,
              'origin-top p-4 transition-[opacity,transform] will-change-[opacity,transform] motion-reduce:transition-none',
              EASE,
              isMegaOpen
                ? 'translate-y-0 scale-100 opacity-100 duration-400'
                : '-translate-y-2 scale-[0.985] opacity-0 duration-200'
            )}
          >
            <div className="grid gap-2.5 lg:grid-cols-3">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:col-span-2">
                {ROOM_CATEGORIES.map((category, index) => {
                  const isCurrentCat =
                    isShopActive && activeCategoryFromUrl === category.id
                  const count = getCategoryCount(category.id)
                  const thumbnail = CATEGORY_THUMBNAILS[category.id]

                  return (
                    <div
                      key={category.id}
                      style={{
                        transitionDelay: isMegaOpen
                          ? `${70 + index * 40}ms`
                          : '0ms',
                      }}
                      className={cn(
                        'transition-[opacity,transform] motion-reduce:transition-none',
                        EASE,
                        isMegaOpen
                          ? 'translate-y-0 opacity-100 duration-400'
                          : 'translate-y-1.5 opacity-0 duration-150'
                      )}
                    >
                      <div
                        className={cn(
                          'group border-border-subtle bg-canvas hover:border-brass/45 hover:bg-brass-light/60 relative flex h-full flex-col justify-between rounded-2xl border p-3.5 transition-colors duration-300',
                          isCurrentCat &&
                            'border-brass/55 bg-brass-light ring-brass/20 ring-1'
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            {thumbnail && (
                              <img
                                src={thumbnail}
                                alt={category.title}
                                className="ring-border-subtle group-hover:ring-brass/40 h-11 w-11 shrink-0 rounded-xl object-cover ring-1 transition-all duration-300"
                                loading="lazy"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <a
                                  href={categoryHref(category.id)}
                                  onClick={(e) =>
                                    handleNavClick(e, categoryHref(category.id))
                                  }
                                  className="group/link focus-visible:ring-brass text-text-primary group-hover:text-brass-dark flex items-center gap-1.5 font-serif text-base leading-snug font-medium transition-colors duration-200 focus-visible:outline-none"
                                >
                                  <span className="truncate">
                                    {category.title}
                                  </span>
                                  <ArrowRight className="text-brass-dark h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                                </a>
                                {count > 0 && (
                                  <span className="text-text-muted border-border-subtle bg-surface text-label-xs shrink-0 rounded-full border px-1.5 py-0.5 font-medium tracking-wide">
                                    {count} pieces
                                  </span>
                                )}
                              </div>
                              <p className="text-text-muted text-label-sm line-clamp-1 leading-relaxed">
                                {category.subtitle}
                              </p>
                            </div>
                          </div>

                          {category.subcategories &&
                            category.subcategories.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {category.subcategories.map((sub) => {
                                  const isCurrentSub =
                                    isCurrentCat &&
                                    activeSubcategoryFromUrl === sub.id
                                  return (
                                    <a
                                      key={sub.id}
                                      href={subcategoryHref(
                                        category.id,
                                        sub.id
                                      )}
                                      onClick={(e) =>
                                        handleNavClick(
                                          e,
                                          subcategoryHref(category.id, sub.id)
                                        )
                                      }
                                      className={cn(
                                        'focus-visible:ring-brass text-label-sm rounded-lg border px-2 py-0.5 transition-colors duration-200 select-none focus-visible:outline-none',
                                        isCurrentSub
                                          ? 'border-brass bg-brass/15 text-brass-dark font-semibold'
                                          : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/45 hover:bg-brass-light hover:text-brass-dark'
                                      )}
                                    >
                                      {sub.name}
                                    </a>
                                  )
                                })}
                              </div>
                            )}
                        </div>

                        <div className="border-border-subtle mt-3 flex items-center justify-between border-t pt-2">
                          <a
                            href={categoryHref(category.id)}
                            onClick={(e) =>
                              handleNavClick(e, categoryHref(category.id))
                            }
                            className="text-brass-dark hover:text-charcoal-deep text-label-sm inline-flex items-center gap-1 font-medium transition-colors"
                          >
                            <span>View all {category.title}</span>
                            <ChevronRight className="h-3 w-3" />
                          </a>
                          {isCurrentCat && (
                            <span className="text-brass-dark text-label-xs inline-flex items-center gap-1 font-semibold tracking-wider uppercase">
                              <span className="bg-brass h-1.5 w-1.5 animate-pulse rounded-full" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {BESPOKE_CATEGORY && (
                <div
                  style={{ transitionDelay: isMegaOpen ? '230ms' : '0ms' }}
                  className={cn(
                    'transition-[opacity,transform] motion-reduce:transition-none',
                    EASE,
                    isMegaOpen
                      ? 'translate-y-0 opacity-100 duration-400'
                      : 'translate-y-1.5 opacity-0 duration-150'
                  )}
                >
                  <div className="group border-brass-border from-brass-light to-surface hover:border-brass/60 flex h-full flex-col justify-between rounded-2xl border bg-linear-to-b p-4 transition-colors duration-300">
                    <div>
                      <span className="text-brass-dark text-label-xs inline-flex items-center gap-1.5 font-semibold tracking-[0.2em] uppercase">
                        <Sparkles className="h-2.5 w-2.5" />
                        Atelier Signature
                      </span>
                      <p className="text-text-primary mt-2 font-serif text-base leading-snug font-medium">
                        {BESPOKE_CATEGORY.title}
                      </p>
                      <p className="text-text-muted text-label-sm mt-1 leading-relaxed">
                        {BESPOKE_CATEGORY.note || BESPOKE_CATEGORY.subtitle}
                      </p>

                      <div className="mt-3.5 space-y-1.5">
                        {BESPOKE_CATEGORY.items.map((item) => (
                          <div
                            key={item}
                            className="text-text-secondary text-label-sm flex items-center gap-2"
                          >
                            <div className="bg-brass h-1 w-1 shrink-0 rounded-full" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-brass-border mt-4 flex flex-col gap-2 border-t pt-3">
                      <Button
                        onClick={() =>
                          handleQuoteClick({
                            categories: ['bespoke-commissions'],
                          })
                        }
                        size="sm"
                        variant="brass"
                        className="w-full justify-center rounded-xl text-xs font-semibold tracking-wider uppercase hover:brightness-105"
                      >
                        Commission Custom Piece
                      </Button>
                      <a
                        href="/shop?category=bespoke"
                        onClick={(e) =>
                          handleNavClick(e, '/shop?category=bespoke')
                        }
                        className="text-text-secondary hover:text-brass-dark text-label-sm text-center transition-colors"
                      >
                        View Signature Atelier Pieces
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{ transitionDelay: isMegaOpen ? '280ms' : '0ms' }}
              className={cn(
                'border-border-subtle mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3 transition-[opacity,transform] motion-reduce:transition-none',
                EASE,
                isMegaOpen
                  ? 'translate-y-0 opacity-100 duration-400'
                  : 'translate-y-1 opacity-0 duration-150'
              )}
            >
              <a
                href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                className="text-text-secondary hover:text-text-primary text-label-sm inline-flex items-center gap-2 transition-colors duration-200"
              >
                <Phone className="text-brass-dark h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">
                  Agrabad Studio: {COMPANY_INFO.contact.phone}
                </span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="/shop"
                  onClick={(e) => handleNavClick(e, '/shop')}
                  className="text-text-secondary hover:text-brass-dark flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <span>Browse Full Catalog ({TOTAL_PIECES} Pieces)</span>
                  <ArrowRight className="text-brass-dark h-3.5 w-3.5" />
                </a>
                <Button
                  onClick={() => handleQuoteClick()}
                  size="sm"
                  variant="brass"
                  className="text-label-sm shrink-0 rounded-full px-4 font-semibold tracking-wider uppercase hover:brightness-105"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'absolute inset-x-0 top-full z-10 pt-2 md:hidden',
            isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          <div
            id="mobile-nav-panel"
            inert={!isMobileOpen}
            data-lenis-prevent
            className={cn(
              PANEL_SHELL,
              'text-text-primary max-h-[calc(100dvh-7rem)] origin-top space-y-4 overflow-y-auto p-5',
              'transition-[opacity,transform] will-change-[opacity,transform] motion-reduce:transition-none',
              EASE,
              isMobileOpen
                ? 'translate-y-0 scale-100 opacity-100 duration-400'
                : '-translate-y-2 scale-[0.985] opacity-0 duration-200'
            )}
          >
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link)

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
                            ? 'border-brass-border bg-brass-light text-brass-dark font-semibold'
                            : 'text-text-primary hover:bg-surface-muted border-transparent'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            'text-brass-dark h-4 w-4 transition-transform duration-300 motion-reduce:transition-none',
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
                          <div className="border-border-subtle mt-1 ml-4 space-y-1 border-l pl-3">
                            <a
                              href="/shop"
                              onClick={(e) => handleNavClick(e, '/shop')}
                              className={cn(
                                'hover:bg-surface-muted flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                isShopActive && activeCategoryFromUrl === 'all'
                                  ? 'bg-brass-light text-brass-dark font-semibold'
                                  : 'text-text-secondary'
                              )}
                            >
                              <span>All Products / Catalog</span>
                              <ArrowRight className="text-brass-dark h-3.5 w-3.5" />
                            </a>
                            {CATEGORIES.map((category, index) => {
                              const isCurrentCat =
                                isShopActive &&
                                activeCategoryFromUrl === category.id

                              return (
                                <div
                                  key={category.id}
                                  style={{
                                    transitionDelay: isMobileShopOpen
                                      ? `${60 + index * 35}ms`
                                      : '0ms',
                                  }}
                                  className={cn(
                                    'space-y-1 transition-[opacity,transform] duration-400 motion-reduce:transition-none',
                                    EASE,
                                    isMobileShopOpen
                                      ? 'translate-x-0 opacity-100'
                                      : '-translate-x-2 opacity-0'
                                  )}
                                >
                                  <a
                                    href={categoryHref(category.id)}
                                    onClick={(e) =>
                                      handleNavClick(
                                        e,
                                        categoryHref(category.id)
                                      )
                                    }
                                    className={cn(
                                      'hover:bg-surface-muted flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                                      isCurrentCat
                                        ? 'bg-brass-light text-brass-dark font-semibold'
                                        : 'text-text-secondary'
                                    )}
                                  >
                                    <span>{category.title}</span>
                                    <ChevronRight className="text-brass-dark/70 h-3.5 w-3.5" />
                                  </a>

                                  {category.subcategories &&
                                    category.subcategories.length > 0 && (
                                      <div className="ml-3 flex flex-wrap gap-1 pb-1">
                                        {category.subcategories.map((sub) => {
                                          const isCurrentSub =
                                            isCurrentCat &&
                                            activeSubcategoryFromUrl === sub.id
                                          return (
                                            <a
                                              key={sub.id}
                                              href={subcategoryHref(
                                                category.id,
                                                sub.id
                                              )}
                                              onClick={(e) =>
                                                handleNavClick(
                                                  e,
                                                  subcategoryHref(
                                                    category.id,
                                                    sub.id
                                                  )
                                                )
                                              }
                                              className={cn(
                                                'text-label-xs rounded-md border px-2 py-0.5 transition-colors',
                                                isCurrentSub
                                                  ? 'border-brass bg-brass/15 text-brass-dark font-semibold'
                                                  : 'border-border-subtle text-text-muted hover:text-text-primary'
                                              )}
                                            >
                                              {sub.name}
                                            </a>
                                          )
                                        })}
                                      </div>
                                    )}
                                </div>
                              )
                            })}
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
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-medium transition-colors',
                      isActive
                        ? 'border-brass-border bg-brass-light text-brass-dark font-semibold'
                        : 'text-text-primary hover:bg-surface-muted border-transparent'
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="text-brass-dark h-4 w-4" />
                  </a>
                )
              })}

              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(false)
                  openCart()
                }}
                className="hover:bg-surface-muted text-text-primary flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="text-brass-dark h-4 w-4" />
                  <span>Bespoke Bag</span>
                </div>
                <span className="bg-brass-light text-brass-dark border-brass-border rounded-full border px-2 py-0.5 text-xs font-bold">
                  {totalCount} {totalCount === 1 ? 'Piece' : 'Pieces'}
                </span>
              </button>
            </div>

            <div className="border-border-subtle space-y-3 border-t pt-3">
              <a
                href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                className="bg-surface-muted hover:bg-brass-light text-text-secondary hover:text-text-primary flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs transition-colors"
              >
                <Phone className="text-brass-dark h-4 w-4 shrink-0" />
                <span className="font-medium">
                  Agrabad Studio: {COMPANY_INFO.contact.phone}
                </span>
              </a>

              <Button
                size="md"
                variant="brass"
                className="w-full justify-center rounded-full text-xs font-semibold tracking-wider uppercase hover:brightness-105"
                onClick={() => handleQuoteClick()}
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

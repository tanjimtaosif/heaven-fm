import { forwardRef, useState, useRef, Children } from 'react'
import { cn } from '@/lib/utils'

export const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      as = 'button',
      animation = 'none',
      textRoll = true,
      rollType = 'stagger',
      rollColor,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const Component = as
    const internalRef = useRef(null)
    const resolvedRef = ref || internalRef

    const [tiltStyle, setTiltStyle] = useState({})
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

    const handleMouseMove = (e) => {
      if (animation === 'magnetic' && resolvedRef.current) {
        const rect = resolvedRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        setTiltStyle({
          transform: `perspective(600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: 'transform 0.1s ease-out',
        })

        setSpotlight({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
          opacity: 1,
        })
      }
      onMouseMove?.(e)
    }

    const handleMouseLeave = (e) => {
      if (animation === 'magnetic') {
        setTiltStyle({
          transform:
            'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: 'transform 0.4s ease-out',
        })
        setSpotlight((prev) => ({ ...prev, opacity: 0 }))
      }
      onMouseLeave?.(e)
    }

    // Every variant carries a 1px border (transparent when the variant does
    // not draw one) so swapping variants never shifts a button's geometry.
    const baseStyles =
      'group relative inline-flex items-center justify-center border border-transparent font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none'

    const variants = {
      primary:
        'bg-charcoal-deep text-canvas hover:bg-charcoal-surface shadow-sm active:scale-[0.98]',
      brass:
        'bg-brass text-charcoal-deep hover:bg-brass-hover font-semibold shadow-sm active:scale-[0.98]',
      outline:
        'border-border-warm text-text-primary bg-transparent hover:bg-surface-muted hover:border-brass/50 active:scale-[0.98]',
      outlineDark:
        'border-canvas/30 text-canvas bg-transparent hover:bg-canvas/10 active:scale-[0.98]',
      ghost:
        'text-text-primary hover:bg-surface-muted hover:text-charcoal-deep',
      whatsapp:
        'bg-whatsapp text-white hover:bg-whatsapp-hover font-semibold shadow-sm active:scale-[0.98]',
      atelierShimmer:
        'bg-charcoal-deep text-canvas border-brass/40 hover:border-brass hover:shadow-glow-brass',
      borderBeam: 'text-canvas bg-charcoal-deep hover:shadow-glow-brass',
      liquidBrass:
        'border-brass text-charcoal-deep bg-transparent overflow-hidden',
      pulseGlow: 'bg-brass text-charcoal-deep font-semibold shadow-glow-brass',
    }

    // Height comes from the shared control scale, not from padding, so a
    // button's height is independent of its variant, line-height and
    // textRoll setting -- and matches an input of the same size.
    const heights = {
      sm: 'h-control-sm',
      md: 'h-control-md',
      lg: 'h-control-lg',
    }

    const sizes = {
      sm: 'text-xs tracking-wider uppercase px-3.5 rounded-full gap-1.5',
      md: 'text-sm tracking-wide px-5 rounded-full gap-2',
      lg: 'text-sm tracking-wide px-6 rounded-full gap-2',
    }

    // An unrecognised variant or size used to render an unstyled button
    // (base styles only). Fall back to the defaults instead.
    const resolvedVariant = variant in variants ? variant : 'primary'
    const resolvedSize = size in sizes ? size : 'md'

    const resolvedRollColor =
      rollColor ||
      (resolvedVariant === 'brass'
        ? 'text-charcoal-deep font-bold'
        : resolvedVariant === 'whatsapp'
          ? 'text-white'
          : 'text-brass font-semibold')

    const renderContent = () => {
      return Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          const text = String(child)

          if (textRoll) {
            if (rollType === 'stagger') {
              return (
                <span className="inline-flex items-center align-middle font-medium select-none">
                  {text.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-flex h-[1.35em] flex-col overflow-hidden leading-[1.35em]"
                    >
                      <span
                        style={{ transitionDelay: `${index * 12}ms` }}
                        className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ transitionDelay: `${index * 12}ms` }}
                        className={cn(
                          'inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full',
                          resolvedRollColor
                        )}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </span>
              )
            }

            return (
              <span className="inline-flex h-[1.35em] flex-col overflow-hidden align-middle leading-[1.35em] font-medium select-none">
                <span className="inline-block transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  {text}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-block transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full',
                    resolvedRollColor
                  )}
                >
                  {text}
                </span>
              </span>
            )
          }

          return <span className="inline-block">{text}</span>
        }

        return child
      })
    }

    if (animation === 'border-beam' || variant === 'borderBeam') {
      return (
        <Component
          ref={resolvedRef}
          className={cn(
            'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full p-[1.5px] transition-all duration-300 active:scale-[0.98]',
            heights[resolvedSize],
            className
          )}
          {...props}
        >
          <span
            className="animate-spin-slow pointer-events-none absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#c49f66_360deg)] opacity-90 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span
            className="bg-brass/25 pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <span
            className={cn(
              'bg-charcoal-deep text-canvas group-hover:bg-charcoal-surface relative z-10 inline-flex h-full w-full items-center justify-center rounded-full font-medium transition-colors duration-200',
              sizes[resolvedSize]
            )}
          >
            {renderContent()}
          </span>
        </Component>
      )
    }

    return (
      <Component
        ref={resolvedRef}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          baseStyles,
          variants[resolvedVariant],
          heights[resolvedSize],
          sizes[resolvedSize],
          animation === 'liquid-fill' &&
            'border-brass text-text-primary overflow-hidden',
          animation === 'shimmer' &&
            'border-brass/40 hover:border-brass hover:shadow-glow-brass overflow-hidden',
          animation === 'underglow' && 'hover:shadow-glow-brass',
          className
        )}
        {...props}
      >
        {animation === 'shimmer' && (
          <>
            <span
              className="via-brass/40 animate-shimmer-sweep pointer-events-none absolute inset-0 -translate-x-full skew-x-[-22deg] bg-linear-to-r from-transparent to-transparent"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-22deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              aria-hidden="true"
            />
          </>
        )}

        {animation === 'liquid-fill' && (
          <span
            className="bg-brass pointer-events-none absolute inset-0 translate-y-[102%] transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0"
            aria-hidden="true"
          />
        )}

        {animation === 'pulse-halo' && (
          <>
            <span
              className="border-brass animate-pulse-ring pointer-events-none absolute inset-0 rounded-full border"
              aria-hidden="true"
            />
            <span
              className="bg-brass/30 pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </>
        )}

        {animation === 'underglow' && (
          <span
            className="bg-brass/40 pointer-events-none absolute -inset-1 rounded-full opacity-40 blur-lg transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
            aria-hidden="true"
          />
        )}

        {animation === 'magnetic' && spotlight.opacity > 0 && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 80px at ${spotlight.x}% ${spotlight.y}%, rgba(255, 255, 255, 0.25), transparent)`,
            }}
            aria-hidden="true"
          />
        )}

        <span
          className={cn(
            'relative z-10 inline-flex items-center justify-center gap-2 select-none',
            'group-hover:[&_svg]:text-brass [&_svg]:transition-all [&_svg]:duration-300 group-hover:[&_svg]:scale-110',
            animation === 'liquid-fill' &&
              'group-hover:text-charcoal-deep font-semibold transition-colors duration-300',
            animation === 'slide-arrow' && 'group-hover:[&_svg]:translate-x-1.5'
          )}
        >
          {renderContent()}
        </span>
      </Component>
    )
  }
)

Button.displayName = 'Button'

import React from 'react'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Store,
  Ruler,
  Hammer,
  ShieldCheck,
  Truck,
} from 'lucide-react'

const DEFAULT_MARQUEE_ITEMS = [
  {
    label: 'Agrabad Showroom',
    detail: 'Chattogram Core Design Hub',
    icon: Store,
  },
  {
    label: '100% Fully Bespoke',
    detail: 'Architectural Customization',
    icon: Ruler,
  },
  {
    label: 'Master Joinery Heritage',
    detail: 'Seasoned Solid Teak & Oak',
    icon: Hammer,
  },
  {
    label: 'Free Design Consultation',
    detail: 'Expert Spatial Layout',
    icon: Sparkles,
  },
  {
    label: 'Nationwide BFIOA Recognition',
    detail: 'Industry Craft Excellence',
    icon: ShieldCheck,
  },
  {
    label: 'White-Glove Delivery',
    detail: 'Precision Assembly Included',
    icon: Truck,
  },
]

const SPEED_MAP = {
  slow: '50s',
  normal: '35s',
  fast: '20s',
}

export const Marquee = ({
  items = DEFAULT_MARQUEE_ITEMS,
  children,
  renderItem,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  fade = true,
  repeat = 2,
  gap = 'gap-8 sm:gap-12',
  separator = (
    <span className="text-brass/40 ml-4 select-none sm:ml-6" aria-hidden="true">
      ✦
    </span>
  ),
  as: Component = 'aside',
  ariaLabel = 'Heaven Furniture Mart Highlights Marquee',
  className,
  trackClassName,
  itemClassName,
  ...props
}) => {
  const duration =
    typeof speed === 'number' ? `${speed}s` : SPEED_MAP[speed] || speed || '35s'

  const durationStyle = {
    animationDuration: duration,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  }

  const repeatArray = Array.from({ length: Math.max(2, repeat) })

  return (
    <Component
      aria-label={ariaLabel}
      className={cn(
        'border-border-subtle/80 bg-surface/75 w-full overflow-hidden border-t py-3 backdrop-blur-md select-none sm:py-3.5',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          fade &&
            'mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'
        )}
      >
        <div
          style={durationStyle}
          className={cn(
            'animate-marquee flex w-max items-center',
            gap,
            pauseOnHover && 'hover:[animation-play-state:paused]',
            trackClassName
          )}
        >
          {repeatArray.map((_, repeatIdx) => (
            <React.Fragment key={`rep-${repeatIdx}`}>
              {children
                ? children
                : items.map((item, itemIdx) => {
                    if (renderItem) {
                      return (
                        <React.Fragment key={`item-${repeatIdx}-${itemIdx}`}>
                          {renderItem(item, itemIdx)}
                          {separator}
                        </React.Fragment>
                      )
                    }

                    if (typeof item === 'string') {
                      return (
                        <div
                          key={`item-${repeatIdx}-${itemIdx}`}
                          className={cn(
                            'text-charcoal-deep flex shrink-0 items-center gap-3 text-xs font-medium tracking-wide sm:text-[13px]',
                            itemClassName
                          )}
                        >
                          <span>{item}</span>
                          {separator}
                        </div>
                      )
                    }

                    const Icon = item.icon

                    return (
                      <div
                        key={`item-${repeatIdx}-${itemIdx}`}
                        className={cn(
                          'text-text-secondary group flex shrink-0 items-center gap-3 text-xs transition-colors duration-200 sm:text-[13px]',
                          itemClassName
                        )}
                      >
                        {Icon && (
                          <span className="bg-brass/10 text-brass group-hover:bg-brass group-hover:text-charcoal-deep rounded-full p-1.5 transition-all duration-300">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        )}
                        {item.label && (
                          <span className="text-charcoal-deep font-sans font-semibold tracking-wide">
                            {item.label}
                          </span>
                        )}
                        {item.detail && (
                          <>
                            <span className="text-border-warm hidden sm:inline">
                              •
                            </span>
                            <span className="text-text-muted hidden text-xs sm:inline">
                              {item.detail}
                            </span>
                          </>
                        )}
                        {separator}
                      </div>
                    )
                  })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Component>
  )
}

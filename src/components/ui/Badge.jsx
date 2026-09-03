import { cn } from '@/lib/utils'

export const Badge = ({ className, variant = 'brass', children, ...props }) => {
  const variants = {
    brass: 'bg-brass-light text-wood-walnut border border-brass-border',
    charcoal: 'bg-charcoal-surface text-canvas border border-charcoal-border',
    ivory:
      'bg-white/80 backdrop-blur-sm text-text-secondary border border-border-subtle',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-widest uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

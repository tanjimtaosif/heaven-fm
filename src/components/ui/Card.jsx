import { cn } from '@/lib/utils'

export const Card = ({ className, children, hover = true, ...props }) => {
  return (
    <div
      className={cn(
        'border-border-subtle rounded-2xl border bg-white p-6 md:p-8',
        'transition-all duration-300',
        hover &&
          'hover:border-brass/40 hover:shadow-text-primary/5 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

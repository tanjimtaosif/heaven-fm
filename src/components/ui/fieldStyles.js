import { cn } from '@/lib/utils'

/**
 * Shared form control styling.
 *
 * This used to live inside the quotation feature while the checkout page kept
 * its own retyped copy of the same string -- which had already drifted
 * (`py-2` on one field, `py-2.5` on the rest). Both now share this.
 */
export const inputStyles = (hasError) =>
  cn(
    'w-full rounded-xl border bg-surface px-3.5 text-sm text-text-primary transition-colors',
    'placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brass/35',
    hasError
      ? 'border-destructive/60 focus:border-destructive'
      : 'border-border-subtle focus:border-brass'
  )

/**
 * Single-line controls (input, select). Height comes from
 * `--spacing-control-lg`, the same token `<Button size="lg">` uses, so a
 * field and the button that submits it are exactly the same height.
 */
export const controlStyles = (hasError) =>
  cn(inputStyles(hasError), 'h-control-lg')

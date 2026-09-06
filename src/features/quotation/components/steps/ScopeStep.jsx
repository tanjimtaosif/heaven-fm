import {
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Briefcase,
  Hammer,
  Package,
  ShoppingBag,
} from 'lucide-react'
import { QUOTATION_CATEGORIES, PROJECT_TYPES } from '@/constants/quotationData'
import {
  Chip,
  FieldShell,
  OptionCard,
  StepIntro,
  SwitchRow,
} from '../QuotationFields'

const ICONS = { Sofa, BedDouble, UtensilsCrossed, Briefcase, Hammer, Package }

export const ScopeStep = ({
  form,
  errors,
  updateForm,
  toggleInArray,
  bagItems,
  bagSubtotalFormatted,
}) => {
  const selectedCategories = QUOTATION_CATEGORIES.filter((category) =>
    form.categories.includes(category.id)
  )

  const handleCategoryToggle = (categoryId) => {
    const isRemoving = form.categories.includes(categoryId)
    toggleInArray('categories', categoryId)

    // Dropping a collection should drop the pieces that belonged to it,
    // otherwise the brief lists pieces the studio can no longer place.
    if (isRemoving) {
      const orphaned = QUOTATION_CATEGORIES.find(
        (c) => c.id === categoryId
      )?.pieces.map((piece) => piece.id)
      updateForm({
        pieces: form.pieces.filter((id) => !orphaned?.includes(id)),
      })
    }
  }

  return (
    <div className="space-y-6">
      <StepIntro
        title="What would you like us to build?"
        description="Choose every collection you are considering — you can pick more than one, and narrow down to specific pieces below."
      />

      <FieldShell
        label="Collections"
        hint="Select all that apply"
        error={errors.categories}
        required
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {QUOTATION_CATEGORIES.map((category) => (
            <OptionCard
              key={category.id}
              icon={ICONS[category.icon] || Package}
              title={category.name}
              hint={category.description}
              selected={form.categories.includes(category.id)}
              onClick={() => handleCategoryToggle(category.id)}
            />
          ))}
        </div>
      </FieldShell>

      {selectedCategories.length > 0 && (
        <div className="animate-fade-up space-y-4">
          <FieldShell
            label="Specific pieces"
            hint="Optional — helps us price faster"
          >
            <div className="space-y-3.5">
              {selectedCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <p className="text-text-muted text-label-sm font-semibold tracking-[0.14em] uppercase">
                    {category.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.pieces.map((piece) => (
                      <Chip
                        key={piece.id}
                        selected={form.pieces.includes(piece.id)}
                        onClick={() => toggleInArray('pieces', piece.id)}
                      >
                        {piece.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FieldShell>
        </div>
      )}

      <FieldShell
        label="How big is the project?"
        error={errors.projectType}
        required
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {PROJECT_TYPES.map((type) => (
            <OptionCard
              key={type.id}
              compact
              title={type.label}
              hint={type.hint}
              selected={form.projectType === type.id}
              onClick={() => updateForm({ projectType: type.id })}
            />
          ))}
        </div>
      </FieldShell>

      {bagItems.length > 0 && (
        <div className="space-y-2.5">
          <SwitchRow
            checked={form.includeBagItems}
            onChange={(value) => updateForm({ includeBagItems: value })}
            title={`Include the ${bagItems.length} piece${bagItems.length > 1 ? 's' : ''} saved in my bag`}
            hint={`We will attach them to the quote — ${bagSubtotalFormatted} at list price.`}
          />

          {form.includeBagItems && (
            <ul className="border-border-subtle bg-surface-muted/40 animate-fade-in space-y-1.5 rounded-xl border p-3.5">
              {bagItems.map((item) => (
                <li
                  key={item.id}
                  className="text-text-secondary flex items-center gap-2 text-xs"
                >
                  <ShoppingBag className="text-brass h-3.5 w-3.5 shrink-0" />
                  <span className="text-text-primary truncate font-medium">
                    {item.name}
                  </span>
                  <span className="text-text-muted ml-auto shrink-0 tabular-nums">
                    × {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

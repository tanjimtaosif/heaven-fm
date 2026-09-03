import { COMPANY_INFO } from '@/constants/companyData'
import { Badge, Card } from '@/components/ui'

export const CollectionsSection = () => {
  return (
    <section id="collections" className="bg-canvas py-20">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <Badge variant="brass">Curated Portfolios</Badge>
        <h2 className="text-charcoal-deep font-serif text-3xl font-bold sm:text-4xl">
          Architectural Collections
        </h2>
        <p className="text-text-secondary mx-auto max-w-xl text-sm sm:text-base">
          From bespoke living room seating to custom master suites, each piece
          is handcrafted to harmony.
        </p>

        <div className="grid grid-cols-1 gap-6 pt-8 text-left sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY_INFO.categories.map((cat) => (
            <Card key={cat.id} className="group relative overflow-hidden">
              <div className="space-y-3">
                <span className="text-brass text-xs font-semibold tracking-wider uppercase">
                  {cat.subtitle}
                </span>
                <h3 className="text-charcoal-deep font-serif text-2xl font-bold">
                  {cat.title}
                </h3>
                <ul className="text-text-secondary space-y-1 text-xs">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="bg-brass h-1 w-1 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

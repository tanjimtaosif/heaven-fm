import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { Button } from '@/components/ui'

export function NotFoundPage() {
  return (
    <div className="bg-canvas flex min-h-[80vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="bg-sand/60 border-border-warm/60 mb-6 flex h-16 w-16 items-center justify-center rounded-full border shadow-xs">
        <Compass className="text-brass-dark h-8 w-8 animate-pulse" />
      </div>

      <span className="text-brass-dark font-mono text-xs font-semibold tracking-widest uppercase">
        Error 404 &bull; Uncharted Space
      </span>

      <h1 className="font-display text-text-primary mt-3 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
        Piece Not Found
      </h1>

      <p className="text-text-secondary mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base">
        The curated room, archive item, or edition you requested is not
        currently on display in our studio gallery.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          as={Link}
          to="/"
          variant="brass"
          size="md"
          className="rounded-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Gallery
        </Button>
        <Button
          as={Link}
          to="/shop"
          variant="secondary"
          size="md"
          className="rounded-full"
        >
          Browse Catalog
        </Button>
      </div>
    </div>
  )
}

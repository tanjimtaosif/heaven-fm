/**
 * Heaven Furniture Mart — Master Products Catalog Data
 *
 * Categorized strictly according to company-details.pdf:
 *  - Living Room: Sofas, Coffee Tables, TV Units, Consoles
 *  - Bedroom: Beds, Wardrobes, Dressing Tables, Bedside Tables
 *  - Dining: Dining Tables, Dining Chairs, Cabinets
 *  - Office & Study: Executive Tables, Bookshelves, Workstations
 *  - Bespoke / Custom: Anything built to custom dimensions & taste
 *
 * Designed for shop catalog filtering, bento featured showcase, and cart integration.
 */

// Eagerly resolve all product photography assets via Vite
const productImages = import.meta.glob(
  '../assets/products/**/*.{png,jpg,jpeg,webp}',
  {
    eager: true,
    import: 'default',
  }
)

const getImg = (relPath) => productImages[`../assets/products/${relPath}`] || ''

export const PRODUCTS = [
  // ==========================================
  // BEDROOM — BEDS (Multi-shot photography)
  // ==========================================
  {
    id: 'noir-fluted-arch-bed',
    name: 'The Noir Fluted Arch Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 135000,
    priceFormatted: '৳135,000',
    pricePrefix: 'from',
    image: getImg('beds/black-shot-1.webp'),
    images: [
      getImg('beds/black-shot-1.webp'),
      getImg('beds/black-shot-2.webp'),
      getImg('beds/black-shot-3.webp'),
    ],
    colors: [
      { name: 'Obsidian Noir', hex: '#232323' },
      { name: 'Warm Charcoal', hex: '#3B3B3B' },
    ],
    shortDescription:
      'Architectural arched headboard with plush channeled bouclé upholstery.',
    dimensions: '6.5ft × 7ft King Suite',
    material: 'Seasoned Hardwood Frame • Matte Bouclé',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
  },
  {
    id: 'emerald-oasis-platform-bed',
    name: 'The Emerald Oasis Platform Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 142000,
    priceFormatted: '৳142,000',
    pricePrefix: 'from',
    image: getImg('beds/green-shot-1.webp'),
    images: [getImg('beds/green-shot-1.webp'), getImg('beds/green-shot-2.webp')],
    colors: [
      { name: 'Deep Emerald', hex: '#264639' },
      { name: 'Moss Velvet', hex: '#4B6354' },
    ],
    shortDescription:
      'Low-profile platform base with fluted forest velvet headboard.',
    dimensions: '6.5ft × 7ft King Suite',
    material: 'Kiln-Dried Mahogany • Italian Velvet',
    leadTime: '14–21 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
  },
  {
    id: 'celestial-sky-bedstead',
    name: 'The Celestial Sky Upholstered Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 128000,
    priceFormatted: '৳128,000',
    pricePrefix: 'from',
    image: getImg('beds/sky-shot-1.webp'),
    images: [
      getImg('beds/sky-shot-1.webp'),
      getImg('beds/sky-shot-2.webp'),
      getImg('beds/sky-shot-3.webp'),
    ],
    colors: [
      { name: 'Sky Ash', hex: '#879CA8' },
      { name: 'Muted Slate', hex: '#5D737E' },
    ],
    shortDescription:
      'Floating perimeter profile with textured cloud-tone upholstery.',
    dimensions: '6.5ft × 7ft King Suite',
    material: 'Solid Teak Base • Textured Weave',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
  },
  {
    id: 'nordic-minimal-teak-bed',
    name: 'The Nordic Minimal Solid Teak Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 148000,
    priceFormatted: '৳148,000',
    pricePrefix: 'from',
    image: getImg('beds/wooden-shot-1.webp'),
    images: [
      getImg('beds/wooden-shot-1.webp'),
      getImg('beds/wooden-shot-2.webp'),
      getImg('beds/wooden-shot-3.webp'),
      getImg('beds/wooden-shot-4.webp'),
    ],
    colors: [
      { name: 'Natural Teak', hex: '#B8860B' },
      { name: 'Honey Wood', hex: '#D29953' },
    ],
    shortDescription:
      'Solid Burma teak platform bedstead with seamless joinery and cantilever ledge.',
    dimensions: '6.5ft × 7ft King Suite',
    material: 'Solid Burma Teak • Satin Wax Finish',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
  },

  // ==========================================
  // BEDROOM — BEDSIDE TABLES (Multi-shot)
  // ==========================================
  {
    id: 'brunello-walnut-nightstand',
    name: 'The Brunello Walnut Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 26000,
    priceFormatted: '৳26,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/brown-shot-1.webp'),
    images: [
      getImg('bedside-tables/brown-shot-1.webp'),
      getImg('bedside-tables/brown-shot-2.webp'),
      getImg('bedside-tables/brown-shot-3.webp'),
    ],
    colors: [
      { name: 'Warm Walnut', hex: '#5D4037' },
      { name: 'Natural Teak', hex: '#8D6E63' },
    ],
    shortDescription:
      'Compact dual-drawer nightstand with concealed soft-close glides.',
    dimensions: 'W 50cm × D 42cm × H 48cm',
    material: 'Seasoned Walnut • Solid Brass Pulls',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
  },
  {
    id: 'cortona-espresso-nightstand',
    name: 'The Cortona Espresso Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 28000,
    priceFormatted: '৳28,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/choco-shot-1.webp'),
    images: [
      getImg('bedside-tables/choco-shot-1.webp'),
      getImg('bedside-tables/choco-shot-2.webp'),
      getImg('bedside-tables/choco-shot-3.webp'),
    ],
    colors: [
      { name: 'Smoked Truffle', hex: '#3E2723' },
      { name: 'Mocha', hex: '#4E342E' },
    ],
    shortDescription:
      'Rich espresso tone bedside table with open display cubby and drawer.',
    dimensions: 'W 52cm × D 44cm × H 50cm',
    material: 'Solid Hardwood • Natural Oil Wax',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 18,
    inStock: true,
  },
  {
    id: 'alabaster-floating-nightstand',
    name: 'The Alabaster Floating Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 24000,
    priceFormatted: '৳24,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/white-shot-1.webp'),
    images: [
      getImg('bedside-tables/white-shot-1.webp'),
      getImg('bedside-tables/white-shot-2.webp'),
      getImg('bedside-tables/white-shot-3.webp'),
    ],
    colors: [
      { name: 'Warm Ivory', hex: '#FAF9F6' },
      { name: 'Brushed Brass', hex: '#C5A059' },
    ],
    shortDescription:
      'Minimalist ivory lacquer finish with integrated brass accent trim.',
    dimensions: 'W 48cm × D 40cm × H 46cm',
    material: 'Lacquered Core • Solid Brass Trim',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 35,
    inStock: true,
  },

  // ==========================================
  // BEDROOM — DRESSING TABLES (Multi-shot)
  // ==========================================
  {
    id: 'riviera-navy-vanity-suite',
    name: 'The Riviera Navy Vanity Suite',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 68000,
    priceFormatted: '৳68,000',
    pricePrefix: 'from',
    image: getImg('dressing-table/navy-shot-1.webp'),
    images: [
      getImg('dressing-table/navy-shot-1.webp'),
      getImg('dressing-table/navy-shot-2.webp'),
      getImg('dressing-table/navy-shot-3.webp'),
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#1C2833' },
      { name: 'Muted Gold', hex: '#C5A059' },
    ],
    shortDescription:
      'Bespoke vanity console featuring velvet-lined jewelry drawers.',
    dimensions: 'W 120cm × D 48cm × H 78cm',
    material: 'Kiln-Dried Mahogany • Satin Lacquer',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
  },
  {
    id: 'sienna-oak-dressing-console',
    name: 'The Sienna Warm Oak Dressing Console',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 62000,
    priceFormatted: '৳62,000',
    pricePrefix: 'from',
    image: getImg('dressing-table/peanut-shot-1.webp'),
    images: [
      getImg('dressing-table/peanut-shot-1.webp'),
      getImg('dressing-table/peanut-shot-2.webp'),
      getImg('dressing-table/peanut-shot-3.webp'),
    ],
    colors: [{ name: 'Caramel Teak', hex: '#C68B59' }],
    shortDescription:
      'Warm natural wood dressing desk with rounded corners and fluted drawers.',
    dimensions: 'W 115cm × D 46cm × H 76cm',
    material: 'Solid Teak Veneer • Solid Wood Legs',
    leadTime: '14–18 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 24,
    inStock: true,
  },
  {
    id: 'aethelgard-fluted-vanity',
    name: 'The Aethelgard Fluted Vanity Console',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 65000,
    priceFormatted: '৳65,000',
    pricePrefix: 'from',
    image: getImg('dressing-table/white-shot-1.webp'),
    images: [
      getImg('dressing-table/white-shot-1.webp'),
      getImg('dressing-table/white-shot-2.webp'),
      getImg('dressing-table/white-shot-3.webp'),
    ],
    colors: [
      { name: 'Alabaster White', hex: '#FAF9F6' },
      { name: 'Soft Gold', hex: '#D4AF37' },
    ],
    shortDescription:
      'Sculptural fluted dressing console with soft-glide drawers and slim brass legs.',
    dimensions: 'W 120cm × D 45cm × H 76cm',
    material: 'Fluted Wood Panels • Brass Accents',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 37,
    inStock: true,
  },

  // ==========================================
  // BEDROOM — WARDROBES (Multi-shot)
  // ==========================================
  {
    id: 'palazzo-choco-modular-wardrobe',
    name: 'The Palazzo Choco Modular Wardrobe',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 165000,
    priceFormatted: '৳165,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/choco-shot-1.webp'),
    images: [
      getImg('wardrobes/choco-shot-1.webp'),
      getImg('wardrobes/choco-shot-2.webp'),
      getImg('wardrobes/choco-shot-3.webp'),
    ],
    colors: [
      { name: 'Deep Truffle', hex: '#3E2723' },
      { name: 'Bronze Hardware', hex: '#5D4037' },
    ],
    shortDescription:
      'Floor-to-ceiling modular wardrobe suite with integrated internal lighting.',
    dimensions: 'W 200cm × D 60cm × H 220cm',
    material: 'Treated Hardwood Frame • Soft-Close Hinges',
    leadTime: '21–28 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
  },
  {
    id: 'varese-espresso-wardrobe',
    name: 'The Varese Espresso Glass-Door Wardrobe',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 178000,
    priceFormatted: '৳178,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/coffee-shot-1.webp'),
    images: [
      getImg('wardrobes/coffee-shot-1.webp'),
      getImg('wardrobes/coffee-shot-2.webp'),
      getImg('wardrobes/coffee-shot-3.webp'),
    ],
    colors: [
      { name: 'Smoked Espresso', hex: '#4E342E' },
      { name: 'Tinted Glass', hex: '#2B2B2B' },
    ],
    shortDescription:
      'Smoked glass casement doors with internal LED channels and velvet organizers.',
    dimensions: 'W 220cm × D 62cm × H 225cm',
    material: 'Smoked Tempered Glass • Seasoned Teak',
    leadTime: '21–30 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
  },
  {
    id: 'aris-scandinavian-wardrobe',
    name: 'The Aris Natural Teak 4-Door Wardrobe',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 155000,
    priceFormatted: '৳155,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/wood-shot-1.webp'),
    images: [
      getImg('wardrobes/wood-shot-1.webp'),
      getImg('wardrobes/wood-shot-2.webp'),
      getImg('wardrobes/wood-shot-3.webp'),
    ],
    colors: [
      { name: 'Golden Teak', hex: '#C2A378' },
      { name: 'Raw Grain', hex: '#8D6E63' },
    ],
    shortDescription:
      'Clean Scandinavian aesthetic with custom interior hanging and shelving layouts.',
    dimensions: 'W 190cm × D 60cm × H 215cm',
    material: 'Solid Teak Veneer • Brass Bar Handles',
    leadTime: '20–25 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 30,
    inStock: true,
  },

  // ==========================================
  // LIVING ROOM — SOFAS
  // ==========================================
  {
    id: 'sovereign-curved-chesterfield',
    name: 'The Sovereign Royal Velvet Chesterfield Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 145000,
    priceFormatted: '৳145,000',
    pricePrefix: 'from',
    image: getImg('sofa/blue-shot-1.webp'),
    images: [
      getImg('sofa/blue-shot-1.webp'),
      getImg('sofa/blue-shot-2.webp'),
      getImg('sofa/blue-shot-3.webp'),
    ],
    colors: [
      { name: 'Royal Navy', hex: '#1C2833' },
      { name: 'Sapphire Velvet', hex: '#0F2C59' },
      { name: 'Matte Slate', hex: '#4A5568' },
    ],
    shortDescription:
      'Deep diamond button-tufted silhouette with kiln-dried solid mahogany framing and plush velvet upholstery.',
    dimensions: 'W 225cm × D 95cm × H 82cm',
    material: 'Kiln-Dried Mahogany • Premium Royal Velvet',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
  },
  {
    id: 'milano-fluted-sofa',
    name: 'The Milano Fluted Curved Studio Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 135000,
    priceFormatted: '৳135,000',
    pricePrefix: 'from',
    image: getImg('sofa/white-shot-1.webp'),
    images: [
      getImg('sofa/white-shot-1.webp'),
      getImg('sofa/white-shot-2.webp'),
    ],
    colors: [
      { name: 'Cream Bouclé', hex: '#F5F5DC' },
      { name: 'Warm Chalk', hex: '#FAF9F6' },
      { name: 'Ivory Weave', hex: '#ECE7E1' },
    ],
    shortDescription:
      'Continuous fluted backrest with sculptural curved monolithic silhouette and tactile textured bouclé.',
    dimensions: 'W 215cm × D 90cm × H 78cm',
    material: 'Mahogany Frame • Tactile Textured Bouclé',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewsCount: 44,
    inStock: true,
  },

  // ==========================================
  // LIVING ROOM — COFFEE TABLES
  // ==========================================
  {
    id: 'solarium-marble-coffee-table',
    name: 'The Solarium Calacatta Marble Coffee Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 48000,
    priceFormatted: '৳48,000',
    pricePrefix: 'from',
    image: getImg('coffee-tables/white-shot-1.webp'),
    images: [
      getImg('coffee-tables/white-shot-1.webp'),
      getImg('coffee-tables/white-shot-2.webp'),
    ],
    colors: [
      { name: 'Calacatta White', hex: '#F5F5F0' },
      { name: 'Carrara Vein', hex: '#D8D8D8' },
    ],
    shortDescription:
      'Solid honed marble top rested on hand-rubbed brass and architectural fluted pedestal framework.',
    dimensions: 'W 110cm × D 60cm × H 42cm',
    material: 'Natural Honed Marble • Solid Brass Frame',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
  },
  {
    id: 'monolith-travertine-coffee-table',
    name: 'The Monolith Fluted Teak & Timber Center Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 52000,
    priceFormatted: '৳52,000',
    pricePrefix: 'from',
    image: getImg('coffee-tables/wood-shot-1.webp'),
    images: [
      getImg('coffee-tables/wood-shot-1.webp'),
      getImg('coffee-tables/wood-shot-2.webp'),
      getImg('coffee-tables/wood-shot-3.webp'),
    ],
    colors: [
      { name: 'Burma Teak', hex: '#B8860B' },
      { name: 'Natural Walnut', hex: '#5D4037' },
      { name: 'Smoked Oak', hex: '#423732' },
    ],
    shortDescription:
      'Sculptural rounded plinth center table handcrafted in solid timber with rich natural oil-wax finish.',
    dimensions: 'W 120cm × D 65cm × H 44cm',
    material: 'Seasoned Teakwood • Hand-Rubbed Oil Wax Finish',
    leadTime: '12–16 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
  },

  // ==========================================
  // LIVING ROOM — TV UNITS & MEDIA CONSOLES
  // ==========================================
  {
    id: 'horizon-slat-media-console',
    name: 'The Horizon Slat Acoustic Media Console & TV Unit',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 68000,
    priceFormatted: '৳68,000',
    pricePrefix: 'from',
    image: getImg('tv-units/tv-unit-1.webp'),
    images: [
      getImg('tv-units/tv-unit-1.webp'),
      getImg('tv-units/tv-unit-2.webp'),
      getImg('tv-units/tv-unit-3.webp'),
    ],
    colors: [
      { name: 'Teak & Charcoal Slat', hex: '#3E2723' },
      { name: 'Natural White Oak', hex: '#D2B48C' },
      { name: 'Matte Obsidian', hex: '#262626' },
    ],
    shortDescription:
      'Acoustic precision-slatted front media console with concealed wiring ports and satin brass hardware.',
    dimensions: 'W 200cm × D 45cm × H 52cm',
    material: 'Solid Teak & Acoustic Fluted Slats • Satin Brass Base',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 24,
    inStock: true,
  },

  // ==========================================
  // DINING — DINING TABLES
  // ==========================================
  {
    id: 'heritage-8-seater-dining-table',
    name: 'The Heritage Solid Teak Banquet Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 110000,
    priceFormatted: '৳110,000',
    pricePrefix: 'from',
    image: getImg('dining-tables/choco-shot-1.webp'),
    images: [
      getImg('dining-tables/choco-shot-1.webp'),
      getImg('dining-tables/choco-shot-2.webp'),
      getImg('dining-tables/choco-shot-3.webp'),
    ],
    colors: [
      { name: 'Burma Teak', hex: '#B8860B' },
      { name: 'Deep Truffle', hex: '#3E2723' },
      { name: 'Honey Mahogany', hex: '#8B4513' },
    ],
    shortDescription:
      'Expansive 8-seater handcrafted solid teakwood banquet table with sculptural pedestal legs.',
    dimensions: 'L 240cm × W 100cm × H 76cm',
    material: '100% Solid Seasoned Teak • Natural Polyurethane Seal',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 39,
    inStock: true,
  },
  {
    id: 'solaria-marble-top-dining-table',
    name: 'The Solaria Modernist Marble Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 128000,
    priceFormatted: '৳128,000',
    pricePrefix: 'from',
    image: getImg('dining-tables/white-shot-1.webp'),
    images: [
      getImg('dining-tables/white-shot-1.webp'),
      getImg('dining-tables/white-shot-2.webp'),
    ],
    colors: [
      { name: 'Carrara White & Brass', hex: '#EFEFEF' },
      { name: 'Nordic Truffle', hex: '#4A3B32' },
    ],
    shortDescription:
      'Engineered white stone-composite surface on chamfered hardwood under-structure and brass accents.',
    dimensions: 'L 210cm × W 95cm × H 75cm',
    material: 'Sintered Marble Stone • Hardwood Subframe • Brushed Brass',
    leadTime: '16–22 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
  },

  // ==========================================
  // DINING — DINING CHAIRS
  // ==========================================
  {
    id: 'verona-leather-dining-armchair',
    name: 'The Verona Sculptural Upholstered Dining Armchair',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    room: 'dining',
    price: 34000,
    priceFormatted: '৳34,000',
    pricePrefix: 'from',
    image: getImg('chair/chair-shot-1.webp'),
    images: [
      getImg('chair/chair-shot-1.webp'),
      getImg('chair/chair-shot-2.webp'),
      getImg('chair/chair-shot-3.webp'),
      getImg('chair/chair-shot-4.webp'),
    ],
    colors: [
      { name: 'Teak Frame & Cognac', hex: '#8B4513' },
      { name: 'Walnut Frame & Olive', hex: '#556B2F' },
      { name: 'Ash Frame & Ivory', hex: '#FAF9F6' },
    ],
    shortDescription:
      'Ergonomic contoured dining armchair with solid timber arms and premium cushioned leather seating.',
    dimensions: 'W 58cm × D 56cm × H 82cm (Seat H 46cm)',
    material: 'Solid Teak & Oak • Italian Full-Grain Leather',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 47,
    inStock: true,
  },

  // ==========================================
  // DINING — CABINETS & SIDEBOARDS
  // ==========================================
  {
    id: 'castello-fluted-sideboard-credenza',
    name: 'The Castello Fluted Sideboard & Credenza Cabinet',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets & Sideboards',
    room: 'dining',
    price: 82000,
    priceFormatted: '৳82,000',
    pricePrefix: 'from',
    image: getImg('cabinets/cabinets-shot-1.webp'),
    images: [
      getImg('cabinets/cabinets-shot-1.webp'),
      getImg('cabinets/cabinets-shot-2.webp'),
      getImg('cabinets/cabinets-shot-3.webp'),
      getImg('cabinets/cabinets-shot-4.webp'),
    ],
    colors: [
      { name: 'Burma Teak & Brass', hex: '#B8860B' },
      { name: 'Smoked Walnut & Fluted Glass', hex: '#3E2723' },
    ],
    shortDescription:
      'Four-door architectural buffet credenza with ribbed tambour fluting, interior drawers, and soft-close German hinges.',
    dimensions: 'W 180cm × D 48cm × H 84cm',
    material: 'Seasoned Teakwood • Fluted Detail • Soft-Close Hardware',
    leadTime: '18–24 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — EXECUTIVE DESKS
  // ==========================================
  {
    id: 'chancellor-executive-desk',
    name: 'The Chancellor Monolith Executive Director Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive Desks',
    room: 'office-study',
    price: 95000,
    priceFormatted: '৳95,000',
    pricePrefix: 'from',
    image: getImg('ex-tables/ex-table-1.webp'),
    images: [
      getImg('ex-tables/ex-table-1.webp'),
      getImg('ex-tables/ex-table-2.webp'),
      getImg('ex-tables/ex-table-3.webp'),
    ],
    colors: [
      { name: 'Dark Oak & Leather Inset', hex: '#3E2723' },
      { name: 'Brushed Brass & Teak', hex: '#B8860B' },
    ],
    shortDescription:
      'Authoritative executive director desk featuring monolithic timber construction, concealed cable management, and side storage pedenza.',
    dimensions: 'W 210cm × D 90cm × H 76cm',
    material: 'Kiln-Dried Hardwood Frame • Saddle Leather Blotter • Brass Accents',
    leadTime: '16–22 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — STUDY DESKS
  // ==========================================
  {
    id: 'solitude-artisan-study-desk',
    name: 'The Solitude Artisan Hardwood Study Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'study-tables',
    subcategoryLabel: 'Study Desks',
    room: 'office-study',
    price: 54000,
    priceFormatted: '৳54,000',
    pricePrefix: 'from',
    image: getImg('study-table/study-shot-1.webp'),
    images: [
      getImg('study-table/study-shot-1.webp'),
    ],
    colors: [
      { name: 'Natural Honey Oak', hex: '#D29953' },
      { name: 'Smoked Ash', hex: '#4A4A4A' },
    ],
    shortDescription:
      'Dedicated home study desk with dual dovetailed stationery drawers and minimalist architectural leg stance.',
    dimensions: 'W 140cm × D 65cm × H 75cm',
    material: 'Solid Teak & Oak • Hand-Rubbed Matte Wax',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 16,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — WORKSTATIONS
  // ==========================================
  {
    id: 'apex-dual-executive-workstation',
    name: 'The Apex Dual Executive Collaborative Workstation',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 115000,
    priceFormatted: '৳115,000',
    pricePrefix: 'from',
    image: getImg('work-station/office-shot-1.webp'),
    images: [
      getImg('work-station/office-shot-1.webp'),
      getImg('work-station/office-shot-2.webp'),
    ],
    colors: [
      { name: 'White Oak & Matte Charcoal', hex: '#8E918F' },
      { name: 'Natural Teak & Black Steel', hex: '#333333' },
    ],
    shortDescription:
      'Commercial-grade collaborative executive workstation with integrated wire raceway channels and privacy partition channels.',
    dimensions: 'W 240cm × D 120cm × H 75cm',
    material: 'Heavy Gauge Matte Steel Base • High-Density Teak Worktops',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewsCount: 20,
    inStock: true,
  },
]

// =========================================================================
// FEATURED PRODUCTS (Directly ready for the Featured Section)
// =========================================================================
export const FEATURED_PRODUCTS = PRODUCTS.filter((item) => item.isFeatured)

// =========================================================================
// CATEGORIES METADATA (Derived from company-details.pdf)
// =========================================================================
export const PRODUCT_CATEGORIES = [
  {
    id: 'all',
    name: 'All Products',
    slug: 'all',
    count: PRODUCTS.length,
    description: 'Explore the full bespoke furniture catalog.',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    slug: 'bedroom',
    count: PRODUCTS.filter((p) => p.categoryId === 'bedroom').length,
    description: 'Beds, wardrobes, dressing tables, bedside tables.',
    subcategories: [
      { id: 'beds', name: 'Beds' },
      { id: 'bedside-tables', name: 'Bedside Tables' },
      { id: 'dressing-tables', name: 'Dressing Tables' },
      { id: 'wardrobes', name: 'Wardrobes' },
    ],
  },
  {
    id: 'living-room',
    name: 'Living Room',
    slug: 'living-room',
    count: PRODUCTS.filter((p) => p.categoryId === 'living-room').length,
    description: 'Sofas, coffee tables, TV units, consoles.',
    subcategories: [
      { id: 'sofas', name: 'Sofas' },
      { id: 'coffee-tables', name: 'Coffee Tables' },
      { id: 'tv-units', name: 'TV Units' },
    ],
  },
  {
    id: 'dining',
    name: 'Dining',
    slug: 'dining',
    count: PRODUCTS.filter((p) => p.categoryId === 'dining').length,
    description: 'Dining tables, dining chairs, cabinets.',
    subcategories: [
      { id: 'dining-tables', name: 'Dining Tables' },
      { id: 'dining-chairs', name: 'Dining Chairs' },
      { id: 'cabinets', name: 'Cabinets & Credenzas' },
    ],
  },
  {
    id: 'office-study',
    name: 'Office & Study',
    slug: 'office-study',
    count: PRODUCTS.filter((p) => p.categoryId === 'office-study').length,
    description: 'Executive tables, study desks, workstations.',
    subcategories: [
      { id: 'executive-tables', name: 'Executive Desks' },
      { id: 'study-tables', name: 'Study Desks' },
      { id: 'workstations', name: 'Workstations' },
    ],
  },
  {
    id: 'bespoke-commissions',
    name: 'Bespoke / Custom',
    slug: 'bespoke',
    count: 'Custom',
    description: 'Anything built to a customer’s own space, size, and taste.',
    isCustom: true,
  },
]

// =========================================================================
// FILTER & SORT OPTIONS (Matching standard ecommerce catalog standards)
// =========================================================================
export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured Pieces' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest Additions' },
]

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-50k', label: 'Under ৳50,000', min: 0, max: 50000 },
  { id: '50k-100k', label: '৳50,000 – ৳100,000', min: 50000, max: 100000 },
  { id: '100k-150k', label: '৳100,000 – ৳150,000', min: 100000, max: 150000 },
  { id: 'above-150k', label: 'Above ৳150,000', min: 150000, max: Infinity },
]

// =========================================================================
// HELPER QUERY FUNCTIONS (For shop page & featured section data fetching)
// =========================================================================

/**
 * Fetch all catalog products.
 */
export function getAllProducts() {
  return PRODUCTS
}

/**
 * Fetch products curated for the featured section.
 */
export function getFeaturedProducts() {
  return FEATURED_PRODUCTS
}

/**
 * Fetch a single product by its unique slug/ID.
 */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

/**
 * Fetch products by category ID ('living-room', 'bedroom', 'dining', 'office-study').
 */
export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

/**
 * Fetch products by subcategory ('beds', 'sofas', 'coffee-tables', etc.).
 */
export function getProductsBySubcategory(subcategory) {
  if (!subcategory || subcategory === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.subcategory === subcategory)
}

/**
 * Multi-criteria filter function for shop page.
 */
export function filterProducts({
  categoryId = 'all',
  subcategory = 'all',
  minPrice = 0,
  maxPrice = Infinity,
  sortBy = 'featured',
  searchQuery = '',
} = {}) {
  return PRODUCTS.filter((product) => {
    if (categoryId !== 'all' && product.categoryId !== categoryId) return false
    if (subcategory !== 'all' && product.subcategory !== subcategory)
      return false
    if (product.price < minPrice || product.price > maxPrice) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchesName = product.name.toLowerCase().includes(q)
      const matchesCategory = product.category.toLowerCase().includes(q)
      const matchesSubcategory = product.subcategoryLabel
        .toLowerCase()
        .includes(q)
      const matchesMaterial = product.material.toLowerCase().includes(q)
      if (
        !matchesName &&
        !matchesCategory &&
        !matchesSubcategory &&
        !matchesMaterial
      ) {
        return false
      }
    }
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case 'featured':
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    }
  })
}

// =========================================================================
// BACKWARD COMPATIBILITY — For CartProvider sample products
// =========================================================================
export const BESPOKE_PRODUCTS = [
  PRODUCTS.find((p) => p.id === 'sovereign-curved-chesterfield') || PRODUCTS[0],
  PRODUCTS.find((p) => p.id === 'noir-fluted-arch-bed') || PRODUCTS[1],
  PRODUCTS.find((p) => p.id === 'heritage-8-seater-dining-table') ||
    PRODUCTS[2],
  PRODUCTS.find((p) => p.id === 'chancellor-executive-desk') || PRODUCTS[3],
]

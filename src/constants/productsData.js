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
  '../assets/products/**/*.{png,jpg,jpeg}',
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
    image: getImg('beds/black-shot-1.png'),
    images: [
      getImg('beds/black-shot-1.png'),
      getImg('beds/black-shot-2.png'),
      getImg('beds/black-shot-3.png'),
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
    image: getImg('beds/green-shot-1.png'),
    images: [getImg('beds/green-shot-1.png'), getImg('beds/green-shot-2.png')],
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
    image: getImg('beds/sky-shot-1.png'),
    images: [
      getImg('beds/sky-shot-1.png'),
      getImg('beds/sky-shot-2.png'),
      getImg('beds/sky-shot-3.png'),
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
    image: getImg('beds/wooden-shot-1.png'),
    images: [
      getImg('beds/wooden-shot-1.png'),
      getImg('beds/wooden-shot-2.png'),
      getImg('beds/wooden-shot-3.png'),
      getImg('beds/wooden-shot-4.png'),
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
    image: getImg('bedside-tables/brown-shot-1.png'),
    images: [
      getImg('bedside-tables/brown-shot-1.png'),
      getImg('bedside-tables/brown-shot-2.png'),
      getImg('bedside-tables/brown-shot-3.png'),
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
    image: getImg('bedside-tables/choco-shot-1.png'),
    images: [
      getImg('bedside-tables/choco-shot-1.png'),
      getImg('bedside-tables/choco-shot-2.png'),
      getImg('bedside-tables/choco-shot-3.png'),
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
    image: getImg('bedside-tables/white-shot-1.png'),
    images: [
      getImg('bedside-tables/white-shot-1.png'),
      getImg('bedside-tables/white-shot-2.png'),
      getImg('bedside-tables/white-shot-3.png'),
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
    image: getImg('dressing-table/navy-shot-1.png'),
    images: [
      getImg('dressing-table/navy-shot-1.png'),
      getImg('dressing-table/navy-shot-2.png'),
      getImg('dressing-table/navy-shot-3.png'),
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
    image: getImg('dressing-table/peanut-shot-1.png'),
    images: [
      getImg('dressing-table/peanut-shot-1.png'),
      getImg('dressing-table/peanut-shot-2.png'),
      getImg('dressing-table/peanut-shot-3.png'),
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
    image: getImg('dressing-table/white-shot-1.png'),
    images: [
      getImg('dressing-table/white-shot-1.png'),
      getImg('dressing-table/white-shot-2.png'),
      getImg('dressing-table/white-shot-3.png'),
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
    image: getImg('wardrobes/choco-shot-1.png'),
    images: [
      getImg('wardrobes/choco-shot-1.png'),
      getImg('wardrobes/choco-shot-2.png'),
      getImg('wardrobes/choco-shot-3.png'),
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
    image: getImg('wardrobes/coffee-shot-1.png'),
    images: [
      getImg('wardrobes/coffee-shot-1.png'),
      getImg('wardrobes/coffee-shot-2.png'),
      getImg('wardrobes/coffee-shot-3.png'),
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
    image: getImg('wardrobes/wood-shot-1.png'),
    images: [
      getImg('wardrobes/wood-shot-1.png'),
      getImg('wardrobes/wood-shot-2.png'),
      getImg('wardrobes/wood-shot-3.png'),
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
    name: 'The Sovereign Curved Chesterfield Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 125000,
    priceFormatted: '৳125,000',
    pricePrefix: 'from',
    image: getImg('sofa/488183627_1245585667572930_4813691289107293660_n.jpg'),
    images: [
      getImg('sofa/488183627_1245585667572930_4813691289107293660_n.jpg'),
    ],
    colors: [
      { name: 'Olive Velvet', hex: '#556B2F' },
      { name: 'Cognac Leather', hex: '#8B4513' },
    ],
    shortDescription:
      'Deep button-tufted silhouette with kiln-dried solid mahogany framing.',
    dimensions: 'W 220cm × D 95cm × H 80cm',
    material: 'Solid Mahogany • Italian Olive Velvet',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
  },
  {
    id: 'verona-deep-lounge-sectional',
    name: 'The Verona Deep-Lounge Sectional',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 165000,
    priceFormatted: '৳165,000',
    pricePrefix: 'from',
    image: getImg('sofa/680241323_1607261594738667_2531254438095740952_n.jpg'),
    images: [
      getImg('sofa/680241323_1607261594738667_2531254438095740952_n.jpg'),
    ],
    colors: [
      { name: 'Oatmeal Bouclé', hex: '#D2B48C' },
      { name: 'Muted Sand', hex: '#C2B280' },
    ],
    shortDescription:
      'Generous multi-seat modular sectional with ultra-deep relaxation cushions.',
    dimensions: 'W 280cm × D 170cm × H 75cm',
    material: 'Down-Feather Blend Core • Textured Bouclé',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 36,
    inStock: true,
  },
  {
    id: 'milano-fluted-sofa',
    name: 'The Milano Fluted 3-Seater Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 135000,
    priceFormatted: '৳135,000',
    pricePrefix: 'from',
    image: getImg('sofa/703415731_1631794982285328_3440016845781887824_n.jpg'),
    images: [
      getImg('sofa/703415731_1631794982285328_3440016845781887824_n.jpg'),
    ],
    colors: [
      { name: 'Slate Bouclé', hex: '#708090' },
      { name: 'Ivory Weave', hex: '#FAF9F6' },
    ],
    shortDescription:
      'Continuous fluted backrest with sculptural monolithic silhouette.',
    dimensions: 'W 215cm × D 90cm × H 78cm',
    material: 'Mahogany Frame • High-Density Core',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewsCount: 44,
    inStock: true,
  },
  {
    id: 'kensington-tailored-velvet-sofa',
    name: 'The Kensington Tailored Velvet Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 142000,
    priceFormatted: '৳142,000',
    pricePrefix: 'from',
    image: getImg('sofa/747604772_1684144490383710_8069181014316575055_n.jpg'),
    images: [
      getImg('sofa/747604772_1684144490383710_8069181014316575055_n.jpg'),
    ],
    colors: [
      { name: 'Royal Navy', hex: '#1C2833' },
      { name: 'Forest Emerald', hex: '#1E4D2B' },
    ],
    shortDescription:
      'Classic tuxedo arms tailored with hand-piped velvet welt seams.',
    dimensions: 'W 210cm × D 92cm × H 82cm',
    material: 'Seasoned Teak Frame • Matte Velvet',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 27,
    inStock: true,
  },
  {
    id: 'florence-boucle-daybed-sofa',
    name: 'The Florence Bouclé Daybed Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 118000,
    priceFormatted: '৳118,000',
    pricePrefix: 'from',
    image: getImg('sofa/761504076_1702070998591059_1878849163198993217_n.jpg'),
    images: [
      getImg('sofa/761504076_1702070998591059_1878849163198993217_n.jpg'),
    ],
    colors: [
      { name: 'Cream Bouclé', hex: '#F5F5DC' },
      { name: 'Teak Stiletto', hex: '#A0522D' },
    ],
    shortDescription:
      'Mid-century profile with integrated bolster pillows and tapered wood legs.',
    dimensions: 'W 195cm × D 88cm × H 74cm',
    material: 'Solid Teak Legs • Textured Bouclé',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
  },
  {
    id: 'bergamo-architectural-sofa',
    name: 'The Bergamo Architectural Low Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 132000,
    priceFormatted: '৳132,000',
    pricePrefix: 'from',
    image: getImg('sofa/768371614_1710462144418611_5698540196193769070_n.jpg'),
    images: [
      getImg('sofa/768371614_1710462144418611_5698540196193769070_n.jpg'),
    ],
    colors: [
      { name: 'Charcoal Linen', hex: '#36454F' },
      { name: 'Pebble Grey', hex: '#808080' },
    ],
    shortDescription:
      'Understated low-slung proportion designed for modern open-plan living.',
    dimensions: 'W 225cm × D 95cm × H 72cm',
    material: 'Kiln-Dried Hardwood • Heavy Linen',
    leadTime: '14–21 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 23,
    inStock: true,
  },
  {
    id: 'amalfi-sculptural-chaise',
    name: 'The Amalfi Sculptural Chaise Lounge',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 108000,
    priceFormatted: '৳108,000',
    pricePrefix: 'from',
    image: getImg('sofa/784251271_1726752032789622_4156846528064326637_n.jpg'),
    images: [
      getImg('sofa/784251271_1726752032789622_4156846528064326637_n.jpg'),
    ],
    colors: [
      { name: 'Terracotta Weave', hex: '#E2725B' },
      { name: 'Warm Ochre', hex: '#CC7722' },
    ],
    shortDescription:
      'Flowing asymmetrical chaise lounge designed for conversational comfort.',
    dimensions: 'W 175cm × D 85cm × H 76cm',
    material: 'Curved Ply & Timber • Artisan Weave',
    leadTime: '14–18 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
  },
  {
    id: 'aurelia-plush-modular-sofa',
    name: 'The Aurelia Plush Modular Studio Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 158000,
    priceFormatted: '৳158,000',
    pricePrefix: 'from',
    image: getImg('sofa/790590893_1732958505502308_4138406260112642404_n.jpg'),
    images: [
      getImg('sofa/790590893_1732958505502308_4138406260112642404_n.jpg'),
    ],
    colors: [
      { name: 'Smoked Greige', hex: '#8F8B7B' },
      { name: 'Warm Chalk', hex: '#F8F8FF' },
    ],
    shortDescription:
      'Cloud-soft modular seating units that reconfigure to your living space.',
    dimensions: 'W 260cm × D 105cm × H 76cm',
    material: 'Multi-Density Core • Chenille Fabric',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: true,
    rating: 5.0,
    reviewsCount: 39,
    inStock: true,
  },

  // ==========================================
  // LIVING ROOM — COFFEE TABLES
  // ==========================================
  {
    id: 'solarium-marble-coffee-table',
    name: 'The Solarium Marble & Brass Coffee Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 42000,
    priceFormatted: '৳42,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/488541711_1249243517207145_2291010703511016974_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/488541711_1249243517207145_2291010703511016974_n.jpg'
      ),
    ],
    colors: [
      { name: 'Calacatta White', hex: '#F5F5F0' },
      { name: 'Aged Brass', hex: '#C5A059' },
    ],
    shortDescription:
      'Solid honed marble top rested on hand-rubbed brass framework.',
    dimensions: 'W 110cm × D 60cm × H 42cm',
    material: 'Natural Marble • Solid Brass Frame',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
  },
  {
    id: 'linear-solid-teak-plinth',
    name: 'The Linear Solid Teak Plinth Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 38000,
    priceFormatted: '৳38,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/488964539_1253430680121762_6207326541462719636_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/488964539_1253430680121762_6207326541462719636_n.jpg'
      ),
    ],
    colors: [{ name: 'Burma Teak', hex: '#B8860B' }],
    shortDescription:
      'Monolithic solid timber plinth honoring natural grain and joinery.',
    dimensions: 'W 120cm × D 70cm × H 38cm',
    material: 'Burma Teak • Satin Wax',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 26,
    inStock: true,
  },
  {
    id: 'opus-fluted-oak-center-table',
    name: 'The Opus Fluted Oak Center Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 46000,
    priceFormatted: '৳46,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/490040251_1255680103230153_5672103050058583955_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/490040251_1255680103230153_5672103050058583955_n.jpg'
      ),
    ],
    colors: [
      { name: 'Smoked Oak', hex: '#5D4037' },
      { name: 'Natural Sand', hex: '#D2B48C' },
    ],
    shortDescription:
      'Cylindrical fluted tambour base with circular beveled tabletop.',
    dimensions: 'Dia 90cm × H 42cm',
    material: 'Solid Oak Tambour • MDF Core',
    leadTime: '12–18 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
  },
  {
    id: 'terracotta-nesting-tables',
    name: 'The Terracotta Duo Nesting Tables',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 34000,
    priceFormatted: '৳34,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/490992042_1263948339069996_2979343409926457239_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/490992042_1263948339069996_2979343409926457239_n.jpg'
      ),
    ],
    colors: [
      { name: 'Warm Rust', hex: '#B7410E' },
      { name: 'Matte Charcoal', hex: '#262626' },
    ],
    shortDescription:
      'Dual organic circular nesting tables designed for flexible arrangements.',
    dimensions: 'Dia 80cm & 60cm × H 45cm & 38cm',
    material: 'Powder-Coated Steel • Enameled Top',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 20,
    inStock: true,
  },
  {
    id: 'monolith-travertine-coffee-table',
    name: 'The Monolith Travertine Accent Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 48000,
    priceFormatted: '৳48,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/493272439_1273440528120777_4858323985309946847_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/493272439_1273440528120777_4858323985309946847_n.jpg'
      ),
    ],
    colors: [{ name: 'Warm Travertine', hex: '#E6D7B9' }],
    shortDescription:
      'Architectural slab table crafted from vein-matched warm stone composite.',
    dimensions: 'W 115cm × D 65cm × H 40cm',
    material: 'Natural Travertine Composite',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 47,
    inStock: true,
  },
  {
    id: 'arcos-dual-tier-table',
    name: 'The Arcos Dual-Tier Coffee Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 39000,
    priceFormatted: '৳39,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/493567297_1273440424787454_5694657800404148051_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/493567297_1273440424787454_5694657800404148051_n.jpg'
      ),
    ],
    colors: [{ name: 'Walnut & Glass', hex: '#4A3525' }],
    shortDescription:
      'Tempered glass upper deck with lower walnut shelf for curated art books.',
    dimensions: 'W 105cm × D 55cm × H 42cm',
    material: 'Tempered Glass • Walnut Veneer',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
  },
  {
    id: 'ellipse-sculptural-coffee-table',
    name: 'The Ellipse Sculptural Center Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 44000,
    priceFormatted: '৳44,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/494446266_1277197794411717_4573295744553561409_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/494446266_1277197794411717_4573295744553561409_n.jpg'
      ),
    ],
    colors: [{ name: 'Dark Teak', hex: '#5C381E' }],
    shortDescription:
      'Graceful pebble-shaped tabletop with conical timber supports.',
    dimensions: 'W 130cm × D 65cm × H 39cm',
    material: 'Kiln-Dried Teak • Protective Hardwax',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 30,
    inStock: true,
  },
  {
    id: 'kanso-minimalist-low-table',
    name: 'The Kanso Minimalist Low Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 29000,
    priceFormatted: '৳29,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/494571619_1276853614446135_45908429934537264_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/494571619_1276853614446135_45908429934537264_n.jpg'
      ),
    ],
    colors: [{ name: 'Light Ash', hex: '#DCD0C0' }],
    shortDescription:
      'Low Japanese-inspired tea table celebrating clean negative space.',
    dimensions: 'W 100cm × D 50cm × H 32cm',
    material: 'Solid Ash Timber • Natural Matte',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 17,
    inStock: true,
  },
  {
    id: 'vesper-cocktail-accent-table',
    name: 'The Vesper Cocktail Accent Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 36000,
    priceFormatted: '৳36,000',
    pricePrefix: 'from',
    image: getImg(
      'coffee-tables/772521594_1714467227351436_1245435330287886749_n.jpg'
    ),
    images: [
      getImg(
        'coffee-tables/772521594_1714467227351436_1245435330287886749_n.jpg'
      ),
    ],
    colors: [{ name: 'Smoked Bronze', hex: '#4A3B32' }],
    shortDescription:
      'Sculpted geometric pedestal table ideal as a dramatic room anchor.',
    dimensions: 'Dia 85cm × H 44cm',
    material: 'Cast Metal Base • Antiqued Top',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 21,
    inStock: true,
  },

  // ==========================================
  // LIVING ROOM — TV UNITS
  // ==========================================
  {
    id: 'horizon-slat-media-console',
    name: 'The Horizon Slat Acoustic TV Console',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 58000,
    priceFormatted: '৳58,000',
    pricePrefix: 'from',
    image: getImg(
      'tv-units/493275637_1273440388120791_5332203086699692808_n.jpg'
    ),
    images: [
      getImg('tv-units/493275637_1273440388120791_5332203086699692808_n.jpg'),
    ],
    colors: [
      { name: 'Dark Walnut', hex: '#4A3525' },
      { name: 'Matte Black', hex: '#1C1C1C' },
    ],
    shortDescription:
      'Acoustic timber slat sliding doors with hidden audio-video cable tracks.',
    dimensions: 'W 200cm × D 45cm × H 52cm',
    material: 'Seasoned Walnut • Acoustic Fabric Lining',
    leadTime: '14–18 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
  },
  {
    id: 'solis-floating-credenza',
    name: 'The Solis Floating Lowline Credenza',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 52000,
    priceFormatted: '৳52,000',
    pricePrefix: 'from',
    image: getImg(
      'tv-units/494783778_1278670460931117_4781033287665581626_n.jpg'
    ),
    images: [
      getImg('tv-units/494783778_1278670460931117_4781033287665581626_n.jpg'),
    ],
    colors: [{ name: 'Natural Oak', hex: '#C2A378' }],
    shortDescription:
      'Sleek wall-mounted floating entertainment console with soft-drop compartments.',
    dimensions: 'W 180cm × D 40cm × H 38cm',
    material: 'White Oak Veneer • Heavy-Duty Brackets',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 25,
    inStock: true,
  },
  {
    id: 'atelier-acoustic-tv-cabinet',
    name: 'The Atelier Acoustic Media Cabinet',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 64000,
    priceFormatted: '৳64,000',
    pricePrefix: 'from',
    image: getImg(
      'tv-units/649263091_1563373149127512_1007082963303441319_n.jpg'
    ),
    images: [
      getImg('tv-units/649263091_1563373149127512_1007082963303441319_n.jpg'),
    ],
    colors: [{ name: 'Teak & Charcoal Slat', hex: '#2F353B' }],
    shortDescription:
      'Substantial media sideboard with integrated ventilation and component organization.',
    dimensions: 'W 210cm × D 48cm × H 60cm',
    material: 'Burma Teak Frame • Slotted Wood Facade',
    leadTime: '14–21 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
  },

  // ==========================================
  // DINING — DINING TABLES
  // ==========================================
  {
    id: 'heritage-8-seater-dining-table',
    name: 'The Heritage 8-Seater Teak Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 145000,
    priceFormatted: '৳145,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/470805861_1054374113154176_5160828767751384367_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/470805861_1054374113154176_5160828767751384367_n.jpg'
      ),
    ],
    colors: [{ name: 'Burma Teak', hex: '#B8860B' }],
    shortDescription:
      'Bookmatched monolithic solid timber top with traditional mortise joinery.',
    dimensions: '8.5ft Solid Plinth (Seats 8–10)',
    material: 'Aged Burma Teak • Hand-Rubbed Wax',
    leadTime: '21–28 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 58,
    inStock: true,
  },
  {
    id: 'plinth-architectural-dining-table',
    name: 'The Plinth Architectural Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 155000,
    priceFormatted: '৳155,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/488959016_1251377890327041_3983251893845130668_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/488959016_1251377890327041_3983251893845130668_n.jpg'
      ),
    ],
    colors: [{ name: 'Seasoned Mahogany', hex: '#4E2718' }],
    shortDescription:
      'Bold double-pedestal architectural table finished in deep rich mahogany.',
    dimensions: '8ft Length (Seats 8)',
    material: 'Seasoned Solid Mahogany',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
  },
  {
    id: 'monterey-round-teak-dining-table',
    name: 'The Monterey Round Pedestal Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 115000,
    priceFormatted: '৳115,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/489826856_1253430813455082_2735207389332608809_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/489826856_1253430813455082_2735207389332608809_n.jpg'
      ),
    ],
    colors: [{ name: 'Honey Teak', hex: '#C68B59' }],
    shortDescription:
      'Circular dining table with fluted conical pedestal for generous legroom.',
    dimensions: 'Dia 150cm (Seats 6)',
    material: 'Solid Teak • Fluted Pedestal',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 26,
    inStock: true,
  },
  {
    id: 'valencia-tailored-dining-table',
    name: 'The Valencia Tailored Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 138000,
    priceFormatted: '৳138,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/490131275_1258028462995317_2743321779384722452_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/490131275_1258028462995317_2743321779384722452_n.jpg'
      ),
    ],
    colors: [{ name: 'Quarter-Sawn Walnut', hex: '#5D4037' }],
    shortDescription:
      'Slender beveled chamfer edges with solid angled timber trestle base.',
    dimensions: 'W 210cm × D 100cm × H 76cm',
    material: 'American Walnut • Protective Lacquer',
    leadTime: '16–22 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
  },
  {
    id: 'solaria-marble-top-dining-table',
    name: 'The Solaria Marble-Top Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 175000,
    priceFormatted: '৳175,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/490216619_1258028776328619_8389579990740479892_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/490216619_1258028776328619_8389579990740479892_n.jpg'
      ),
    ],
    colors: [{ name: 'Carrara Marble & Brass', hex: '#EFEFEF' }],
    shortDescription:
      'Polished natural marble slab resting on solid timber pedestal frame.',
    dimensions: 'W 230cm × D 105cm × H 76cm',
    material: 'Natural Marble Slab • Mahogany Substructure',
    leadTime: '20–28 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 39,
    inStock: true,
  },
  {
    id: 'sorento-sculpted-timber-dining-table',
    name: 'The Sorento Sculpted Timber Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 128000,
    priceFormatted: '৳128,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/490812582_1261886825942814_2683722608764975439_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/490812582_1261886825942814_2683722608764975439_n.jpg'
      ),
    ],
    colors: [{ name: 'Aged Oak', hex: '#8B5A2B' }],
    shortDescription:
      'Organic soften-edge timber table for welcoming family gatherings.',
    dimensions: 'W 200cm × D 95cm × H 75cm',
    material: 'Seasoned Oak • Hand-Buffed Wax',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 18,
    inStock: true,
  },
  {
    id: 'brutalist-solid-teak-banquet-table',
    name: 'The Brutalist Solid Teak Banquet Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 185000,
    priceFormatted: '৳185,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/492923535_1268858288579001_684366815496989651_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/492923535_1268858288579001_684366815496989651_n.jpg'
      ),
    ],
    colors: [{ name: 'Raw Teak Wax Polish', hex: '#A0522D' }],
    shortDescription:
      'Monumental thick-slab banquet table engineered for heirloom longevity.',
    dimensions: '9ft Banquet Table (Seats 10)',
    material: 'Burma Teak Heavy Slab',
    leadTime: '25–30 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
  },
  {
    id: 'aeris-minimal-framed-dining-table',
    name: 'The Aeris Minimal Framed Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 118000,
    priceFormatted: '৳118,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/495750228_1284575287007301_3141785146264859783_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/495750228_1284575287007301_3141785146264859783_n.jpg'
      ),
    ],
    colors: [{ name: 'Smoked Ash', hex: '#4A4A4A' }],
    shortDescription:
      'Sleek architectural perimeter framing with slim precision shadowline.',
    dimensions: 'W 190cm × D 90cm × H 75cm',
    material: 'Solid Ash • Matte Charcoal Lacquer',
    leadTime: '14–18 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
  },
  {
    id: 'elysium-modernist-dining-table',
    name: 'The Elysium Modernist Dining Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 132000,
    priceFormatted: '৳132,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/751349978_1688125409985618_7348280562578590906_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/751349978_1688125409985618_7348280562578590906_n.jpg'
      ),
    ],
    colors: [{ name: 'Nordic Oak', hex: '#D2B48C' }],
    shortDescription:
      'Understated contemporary dining table with softly curved pillar legs.',
    dimensions: 'W 200cm × D 95cm × H 76cm',
    material: 'White Oak • Water-Based Poly Finish',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 23,
    inStock: true,
  },
  {
    id: 'ravenna-fluted-pedestal-dining-table',
    name: 'The Ravenna Fluted Pedestal Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 148000,
    priceFormatted: '৳148,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/761596606_1700154842116008_2266593655759211928_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/761596606_1700154842116008_2266593655759211928_n.jpg'
      ),
    ],
    colors: [{ name: 'Warm Truffle', hex: '#3E2723' }],
    shortDescription:
      'Double fluted column base supporting a pill-shaped dining surface.',
    dimensions: 'W 220cm × D 100cm × H 76cm',
    material: 'Fluted Solid Wood Columns • Teak Top',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
  },
  {
    id: 'augusta-grand-gathering-table',
    name: 'The Augusta 10-Seater Gathering Table',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 195000,
    priceFormatted: '৳195,000',
    pricePrefix: 'from',
    image: getImg(
      'dining-tables/781162830_1725721782892647_3495497836840174995_n.jpg'
    ),
    images: [
      getImg(
        'dining-tables/781162830_1725721782892647_3495497836840174995_n.jpg'
      ),
    ],
    colors: [{ name: 'Deep Mahogany & Teak', hex: '#4A150E' }],
    shortDescription:
      'Grand dining suite designed for presidential residences and estates.',
    dimensions: '10ft Architectural Length',
    material: 'Solid Burma Teak • Brass Joinery Keys',
    leadTime: '24–32 Days',
    isFeatured: false,
    isNew: false,
    rating: 5.0,
    reviewsCount: 45,
    inStock: true,
  },

  // ==========================================
  // DINING — CHAIRS
  // ==========================================
  {
    id: 'aurelia-contoured-dining-chair',
    name: 'The Aurelia Contoured Dining Chair',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    room: 'dining',
    price: 18500,
    priceFormatted: '৳18,500',
    pricePrefix: 'from',
    image: getImg('chair/733975432_1670206521777507_4916894844802872540_n.jpg'),
    images: [
      getImg('chair/733975432_1670206521777507_4916894844802872540_n.jpg'),
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#B3A99F' },
      { name: 'Teak Frame', hex: '#8B5A2B' },
    ],
    shortDescription:
      'Ergonomically curved backrest upholstered in stain-resistant weave.',
    dimensions: 'W 54cm × D 56cm × H 82cm',
    material: 'Burma Teak Frame • Performance Textile',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
  },
  {
    id: 'verona-leather-dining-armchair',
    name: 'The Verona Leather Dining Armchair',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    room: 'dining',
    price: 22000,
    priceFormatted: '৳22,000',
    pricePrefix: 'from',
    image: getImg('chair/734008893_1670206525110840_4556845434530645596_n.jpg'),
    images: [
      getImg('chair/734008893_1670206525110840_4556845434530645596_n.jpg'),
    ],
    colors: [{ name: 'Cognac Saddle Leather', hex: '#9E5B32' }],
    shortDescription:
      'Full-grain saddle leather dining carver with tapered timber legs.',
    dimensions: 'W 58cm × D 58cm × H 84cm',
    material: 'Full-Grain Leather • Solid Walnut Legs',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
  },
  {
    id: 'nordic-curved-cane-dining-chair',
    name: 'The Nordic Curved Cane Dining Chair',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    room: 'dining',
    price: 16500,
    priceFormatted: '৳16,500',
    pricePrefix: 'from',
    image: getImg('chair/736420675_1670206595110833_5351120681345196574_n.jpg'),
    images: [
      getImg('chair/736420675_1670206595110833_5351120681345196574_n.jpg'),
    ],
    colors: [{ name: 'Natural Cane & Ash', hex: '#D2B48C' }],
    shortDescription:
      'Handwoven natural rattan webbing set inside steam-bent ash frame.',
    dimensions: 'W 52cm × D 54cm × H 80cm',
    material: 'Natural Rattan • Solid Ash Timber',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
  },
  {
    id: 'monolith-fluted-dining-chair',
    name: 'The Monolith Fluted Velvet Dining Chair',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-chairs',
    subcategoryLabel: 'Dining Chairs',
    room: 'dining',
    price: 19500,
    priceFormatted: '৳19,500',
    pricePrefix: 'from',
    image: getImg('chair/736449064_1670206528444173_4375750925473556720_n.jpg'),
    images: [
      getImg('chair/736449064_1670206528444173_4375750925473556720_n.jpg'),
    ],
    colors: [{ name: 'Olive Velvet', hex: '#556B2F' }],
    shortDescription:
      'Plush fluted cushioning with seamless concealed hardware joinery.',
    dimensions: 'W 55cm × D 57cm × H 83cm',
    material: 'Treated Hardwood • Italian Velvet',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 21,
    inStock: true,
  },

  // ==========================================
  // DINING — CABINETS & SIDEBOARDS
  // ==========================================
  {
    id: 'castello-fluted-sideboard-credenza',
    name: 'The Castello Fluted Sideboard Credenza',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets',
    room: 'dining',
    price: 88000,
    priceFormatted: '৳88,000',
    pricePrefix: 'from',
    image: getImg('cabinets/488248420_1251377603660403_379244877112751826_n.jpg'),
    images: [
      getImg('cabinets/488248420_1251377603660403_379244877112751826_n.jpg'),
    ],
    colors: [{ name: 'Smoked Walnut', hex: '#4A3B32' }],
    shortDescription:
      'Four-door architectural buffet sideboard with fluted wood facade.',
    dimensions: 'W 180cm × D 48cm × H 82cm',
    material: 'Solid Walnut Fluting • Push-to-Open Latches',
    leadTime: '16–22 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 36,
    inStock: true,
  },
  {
    id: 'lucerne-glass-display-vitrine',
    name: 'The Lucerne Glass Display Vitrine',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets',
    room: 'dining',
    price: 98000,
    priceFormatted: '৳98,000',
    pricePrefix: 'from',
    image: getImg(
      'cabinets/489006229_1251377810327049_7491661709415816003_n.jpg'
    ),
    images: [
      getImg('cabinets/489006229_1251377810327049_7491661709415816003_n.jpg'),
    ],
    colors: [{ name: 'Burma Teak Frame', hex: '#8B5A2B' }],
    shortDescription:
      'Curated crockery vitrine with clear glass casement doors and spotlights.',
    dimensions: 'W 110cm × D 42cm × H 190cm',
    material: 'Tempered Glass • Burma Teak Frame',
    leadTime: '18–24 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 25,
    inStock: true,
  },
  {
    id: 'modena-bar-and-crockery-cabinet',
    name: 'The Modena Bar & Crockery Cabinet',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets',
    room: 'dining',
    price: 92000,
    priceFormatted: '৳92,000',
    pricePrefix: 'from',
    image: getImg(
      'cabinets/529351072_1372615101536652_7715303462029365057_n.jpg'
    ),
    images: [
      getImg('cabinets/529351072_1372615101536652_7715303462029365057_n.jpg'),
    ],
    colors: [{ name: 'Deep Espresso', hex: '#3E2723' }],
    shortDescription:
      'Concealed bar cabinet with stemware hanging rails and wine storage.',
    dimensions: 'W 100cm × D 48cm × H 160cm',
    material: 'Seasoned Hardwood • Brushed Brass Rack',
    leadTime: '16–22 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
  },
  {
    id: 'veneto-tall-storage-cabinet',
    name: 'The Veneto Tall Storage Cabinet',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets',
    room: 'dining',
    price: 84000,
    priceFormatted: '৳84,000',
    pricePrefix: 'from',
    image: getImg(
      'cabinets/533491418_1372615091536653_1718923826228521917_n.jpg'
    ),
    images: [
      getImg('cabinets/533491418_1372615091536653_1718923826228521917_n.jpg'),
    ],
    colors: [{ name: 'Natural Teak & Brass', hex: '#B8860B' }],
    shortDescription:
      'Slender tallboy storage cabinet built for compact dining or pantry walls.',
    dimensions: 'W 75cm × D 45cm × H 185cm',
    material: 'Burma Teak • Satin Brass Handles',
    leadTime: '14–18 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 16,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — EXECUTIVE DESKS
  // ==========================================
  {
    id: 'chancellor-executive-desk',
    name: 'The Chancellor Executive Study Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive Desks',
    room: 'office-study',
    price: 98000,
    priceFormatted: '৳98,000',
    pricePrefix: 'from',
    image: getImg(
      'ex-tables/628069278_1535307111934116_7545569496051901169_n.jpg'
    ),
    images: [
      getImg('ex-tables/628069278_1535307111934116_7545569496051901169_n.jpg'),
    ],
    colors: [
      { name: 'Quarter-Sawn Walnut', hex: '#5D4037' },
      { name: 'Brushed Brass', hex: '#C5A059' },
    ],
    shortDescription:
      'Imposing director stature with hidden wire management and velvet drawers.',
    dimensions: 'W 180cm × D 90cm × H 76cm',
    material: 'Quarter-Sawn Walnut • Brushed Brass Detailing',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 47,
    inStock: true,
  },
  {
    id: 'tribune-monolith-executive-desk',
    name: 'The Tribune Monolith Executive Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive Desks',
    room: 'office-study',
    price: 115000,
    priceFormatted: '৳115,000',
    pricePrefix: 'from',
    image: getImg(
      'ex-tables/737046509_1672336761564483_389144073028099862_n.jpg'
    ),
    images: [
      getImg('ex-tables/737046509_1672336761564483_389144073028099862_n.jpg'),
    ],
    colors: [{ name: 'Dark Oak & Leather Inset', hex: '#3A2E2B' }],
    shortDescription:
      'Heavy pedestal office desk with integrated leather blotting work surface.',
    dimensions: 'W 200cm × D 95cm × H 76cm',
    material: 'Solid Oak Frame • Italian Leather Inlay',
    leadTime: '16–22 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
  },
  {
    id: 'senator-prestige-director-desk',
    name: 'The Senator Prestige Director Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive Desks',
    room: 'office-study',
    price: 128000,
    priceFormatted: '৳128,000',
    pricePrefix: 'from',
    image: getImg(
      'ex-tables/737191325_1672336838231142_2215111771442126262_n.jpg'
    ),
    images: [
      getImg('ex-tables/737191325_1672336838231142_2215111771442126262_n.jpg'),
    ],
    colors: [{ name: 'Burma Teak', hex: '#8B5A2B' }],
    shortDescription:
      'L-shaped executive desk suite with side credenza and privacy modesty panel.',
    dimensions: 'W 220cm × D 180cm (with return) × H 76cm',
    material: 'Aged Burma Teak • Precision Soft-Close Slides',
    leadTime: '20–26 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — STUDY DESKS
  // ==========================================
  {
    id: 'solitude-artisan-study-desk',
    name: 'The Solitude Artisan Study Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'study-tables',
    subcategoryLabel: 'Study Desks',
    room: 'office-study',
    price: 48000,
    priceFormatted: '৳48,000',
    pricePrefix: 'from',
    image: getImg(
      'study-table/495322982_1278670167597813_1072946048533365673_n.jpg'
    ),
    images: [
      getImg(
        'study-table/495322982_1278670167597813_1072946048533365673_n.jpg'
      ),
    ],
    colors: [{ name: 'Natural Honey Oak', hex: '#C68B59' }],
    shortDescription:
      'Clean architectural writing desk with floating drawer box and cord cutouts.',
    dimensions: 'W 140cm × D 65cm × H 75cm',
    material: 'Solid Wood Base • Oak Top',
    leadTime: '10–14 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
  },

  // ==========================================
  // OFFICE & STUDY — WORKSTATIONS
  // ==========================================
  {
    id: 'apex-dual-executive-workstation',
    name: 'The Apex Dual Executive Workstation',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 85000,
    priceFormatted: '৳85,000',
    pricePrefix: 'from',
    image: getImg(
      'work-station/631291067_1535307175267443_5102896692603243052_n.jpg'
    ),
    images: [
      getImg(
        'work-station/631291067_1535307175267443_5102896692603243052_n.jpg'
      ),
    ],
    colors: [{ name: 'Industrial Oak & Steel', hex: '#5C5042' }],
    shortDescription:
      'Face-to-face dual workstation with frosted acoustic privacy screen.',
    dimensions: 'W 240cm × D 120cm × H 75cm',
    material: 'Commercial Melamine / Teak Veneer • Steel Subframe',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewsCount: 34,
    inStock: true,
  },
  {
    id: 'quad-pod-collaborative-workstation',
    name: 'The Quad Collaborative Workstation Pod',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 135000,
    priceFormatted: '৳135,000',
    pricePrefix: 'from',
    image: getImg(
      'work-station/736675191_1672336771564482_1918114807941403944_n.jpg'
    ),
    images: [
      getImg(
        'work-station/736675191_1672336771564482_1918114807941403944_n.jpg'
      ),
    ],
    colors: [{ name: 'Acoustic Felt & White Oak', hex: '#8E918F' }],
    shortDescription:
      '4-person collaborative team desk island with built-in power modules.',
    dimensions: 'W 280cm × D 140cm × H 75cm',
    material: 'Sound-Dampening Felt Screen • Solid Teak Edging',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
  },
  {
    id: 'linear-duo-atelier-workstation',
    name: 'The Linear Duo Atelier Workstation',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 78000,
    priceFormatted: '৳78,000',
    pricePrefix: 'from',
    image: getImg(
      'work-station/736989787_1672336724897820_6637246498013831067_n.jpg'
    ),
    images: [
      getImg(
        'work-station/736989787_1672336724897820_6637246498013831067_n.jpg'
      ),
    ],
    colors: [{ name: 'Matte Charcoal & Teak', hex: '#333333' }],
    shortDescription:
      'Side-by-side executive studio desk with central shared filing pedestal.',
    dimensions: 'W 240cm × D 70cm × H 75cm',
    material: 'Solid Burma Teak • Matte Steel Girders',
    leadTime: '14–18 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 19,
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

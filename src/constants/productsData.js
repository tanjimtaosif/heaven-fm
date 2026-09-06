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
  // BEDROOM — BEDS
  // ==========================================
  {
    id: 'royal-chevron-midnight-bed',
    sku: 'HFM-BED-001',
    name: 'The Royal Chevron Midnight Velvet & Gold Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 155000,
    priceFormatted: '৳155,000',
    pricePrefix: 'from',
    image: getImg('beds/HFM-BED-001/shot-1.webp'),
    images: [
      getImg('beds/HFM-BED-001/shot-1.webp'),
      getImg('beds/HFM-BED-001/shot-2.webp'),
      getImg('beds/HFM-BED-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Midnight Navy & Gold', hex: '#1B2430' },
      { name: 'Obsidian & Brass', hex: '#262626' },
    ],
    shortDescription:
      'Royal midnight velvet upholstered bed with geometric chevron padded panels, gold trellis fretwork borders, and a circular gilded rosette medallion.',
    dimensions: '6.5ft × 7ft King Suite',
    material:
      'Seasoned Mahogany Frame • Royal Velvet • 24K Gold Leaf Finished Trim',
    leadTime: '14–21 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 48,
    stock: 5,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'emerald-sovereign-quilted-bed',
    sku: 'HFM-BED-002',
    name: 'The Emerald Sovereign Channel & Diamond Quilted Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 148000,
    priceFormatted: '৳148,000',
    pricePrefix: 'from',
    image: getImg('beds/HFM-BED-002/shot-1.webp'),
    images: [
      getImg('beds/HFM-BED-002/shot-1.webp'),
      getImg('beds/HFM-BED-002/shot-2.webp'),
    ],
    colors: [
      { name: 'Deep Emerald Velvet', hex: '#1E4D3B' },
      { name: 'Forest Olive Velvet', hex: '#2E5A44' },
    ],
    shortDescription:
      'Lush Italian emerald velvet upholstered bed with curved crown mahogany framed headboard, vertical channel tufting, and diamond-quilted footboard panel.',
    dimensions: '6.5ft × 7ft King Suite',
    material:
      'Kiln-Dried Mahogany Structure • Italian Velvet • High-Density Foam',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 36,
    stock: 8,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'victorian-royal-carved-poster-bed',
    sku: 'HFM-BED-003',
    name: 'The Victorian Royal Carved Teak & Turquoise Velvet Poster Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 175000,
    priceFormatted: '৳175,000',
    pricePrefix: 'from',
    image: getImg('beds/HFM-BED-003/shot-1.webp'),
    images: [
      getImg('beds/HFM-BED-003/shot-1.webp'),
      getImg('beds/HFM-BED-003/shot-2.webp'),
      getImg('beds/HFM-BED-003/shot-3.webp'),
    ],
    colors: [
      { name: 'Chittagong Teak & Turquoise', hex: '#2A7B9B' },
      { name: 'Polished Walnut & Sky', hex: '#4A6B82' },
    ],
    shortDescription:
      'Victorian royal carved teak 4-poster bed with gold leaf floral baroque carvings, turned corner posts with finials, turquoise velvet padded crest, and ornate footboard apron.',
    dimensions: '6.5ft × 7ft King Suite',
    material:
      '100% Solid Chittagong Teak • Hand-Carved Gilded Baroque Trim • Turquoise Silk Velvet',
    leadTime: '21–28 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 29,
    stock: 2,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'louis-xv-french-provincial-linen-bed',
    sku: 'HFM-BED-004',
    name: 'The Louis XV French Provincial Wingback Linen Bed',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'beds',
    subcategoryLabel: 'Beds',
    room: 'bedroom',
    price: 138000,
    priceFormatted: '৳138,000',
    pricePrefix: 'from',
    image: getImg('beds/HFM-BED-004/shot-1.webp'),
    images: [
      getImg('beds/HFM-BED-004/shot-1.webp'),
      getImg('beds/HFM-BED-004/shot-2.webp'),
      getImg('beds/HFM-BED-004/shot-3.webp'),
      getImg('beds/HFM-BED-004/shot-4.webp'),
    ],
    colors: [
      { name: 'Oatmeal Belgian Linen', hex: '#E3DAC9' },
      { name: 'Warm Cream Texture', hex: '#F5F2EB' },
    ],
    shortDescription:
      'French Provincial Louis XV style wingback upholstered bed in natural beige textured linen with carved serpentine crest, antique brass nailhead trim, and scalloped cabriole legs.',
    dimensions: '6.5ft × 7ft King Suite (Bench Included)',
    material:
      'Hand-Carved Hardwood Frame • Natural Textured Linen • Antiqued Brass Nailheads',
    leadTime: '14–21 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 31,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // BEDROOM — BEDSIDE TABLES
  // ==========================================
  {
    id: 'neoclassical-empire-gilded-nightstand',
    sku: 'HFM-BST-001',
    name: 'The Neoclassical Empire Gilded Mahogany Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 32000,
    priceFormatted: '৳32,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/HFM-BST-001/shot-1.webp'),
    images: [
      getImg('bedside-tables/HFM-BST-001/shot-1.webp'),
      getImg('bedside-tables/HFM-BST-001/shot-2.webp'),
      getImg('bedside-tables/HFM-BST-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Warm Mahogany & Gold', hex: '#5D2E1F' },
      { name: 'Antique Walnut & Brass', hex: '#4A3525' },
    ],
    shortDescription:
      'Neoclassical 2-drawer mahogany bedside chest with gilded rope moldings, fluted corner columns, acanthus relief carvings, and reeded tapered legs.',
    dimensions: 'W 55cm × D 45cm × H 65cm',
    material:
      'Solid Seasoned Mahogany • 24K Gold Leaf Detailing • Cast Brass Medallion Knobs',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 22,
    stock: 12,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'baroque-carved-walnut-gold-nightstand',
    sku: 'HFM-BST-002',
    name: 'The Baroque Carved Walnut & Gold Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 34000,
    priceFormatted: '৳34,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/HFM-BST-002/shot-1.webp'),
    images: [
      getImg('bedside-tables/HFM-BST-002/shot-1.webp'),
      getImg('bedside-tables/HFM-BST-002/shot-2.webp'),
      getImg('bedside-tables/HFM-BST-002/shot-3.webp'),
    ],
    colors: [
      { name: 'Chocolate Walnut & Gold', hex: '#4E3629' },
      { name: 'Dark Chestnut', hex: '#3B281C' },
    ],
    shortDescription:
      'Baroque carved walnut 2-drawer nightstand with gilded foliage scrollwork drawer appliques, central rosette pulls, and ornate gold leaf cabriole legs.',
    dimensions: 'W 60cm × D 42cm × H 62cm',
    material:
      'Solid Walnut • Hand-Carved Gilded Scrollwork • Soft-Close Undermount Slides',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 19,
    stock: 7,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'versailles-round-marble-gilded-nightstand',
    sku: 'HFM-BST-003',
    name: 'The Versailles Round Marble-Top Gilded Nightstand',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'bedside-tables',
    subcategoryLabel: 'Bedside Tables',
    room: 'bedroom',
    price: 38000,
    priceFormatted: '৳38,000',
    pricePrefix: 'from',
    image: getImg('bedside-tables/HFM-BST-003/shot-1.webp'),
    images: [
      getImg('bedside-tables/HFM-BST-003/shot-1.webp'),
      getImg('bedside-tables/HFM-BST-003/shot-2.webp'),
      getImg('bedside-tables/HFM-BST-003/shot-3.webp'),
    ],
    colors: [{ name: 'Antique Gold & Cream Marble', hex: '#D4AF37' }],
    shortDescription:
      'French accent nightstand table with polished Italian cream marble top slab, pierced baroque scrollwork apron, and antiqued gold leaf cabriole legs.',
    dimensions: 'Diameter 55cm × H 60cm',
    material:
      'Natural Italian Cream Marble • Hand-Carved Hardwood Frame with Gold Foil',
    leadTime: '12–16 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 27,
    stock: 0,
    inStock: false,
    lowStockThreshold: 3,
  },

  // ==========================================
  // BEDROOM — DRESSING TABLES
  // ==========================================
  {
    id: 'halo-led-midnight-slate-vanity',
    sku: 'HFM-DRS-001',
    name: 'The Halo LED Midnight Slate & Gold Vanity Console',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 78000,
    priceFormatted: '৳78,000',
    pricePrefix: 'from',
    image: getImg('dressing-tables/HFM-DRS-001/shot-1.webp'),
    images: [
      getImg('dressing-tables/HFM-DRS-001/shot-1.webp'),
      getImg('dressing-tables/HFM-DRS-001/shot-2.webp'),
      getImg('dressing-tables/HFM-DRS-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Midnight Slate Blue & Gold', hex: '#22303C' },
      { name: 'Charcoal Noir & Brass', hex: '#1C1C1C' },
    ],
    shortDescription:
      'Modern luxury 4-drawer vanity console in midnight slate with circular touch-sensor halo LED mirror, brushed gold edge trims, chevron accent pedestal, and brass ferrule legs.',
    dimensions: 'W 130cm × D 45cm × H 155cm (Desk H 78cm)',
    material:
      'Matte Lacquered Hardwood • Brushed Gold Edge Profile • Integrated Smart Touch LED Mirror',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 38,
    stock: 6,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'hollywood-glamour-mirrored-champagne-vanity',
    sku: 'HFM-DRS-002',
    name: 'The Hollywood Glamour Mirrored Champagne Silver Vanity Suite',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 88000,
    priceFormatted: '৳88,000',
    pricePrefix: 'from',
    image: getImg('dressing-tables/HFM-DRS-002/shot-1.webp'),
    images: [
      getImg('dressing-tables/HFM-DRS-002/shot-1.webp'),
      getImg('dressing-tables/HFM-DRS-002/shot-2.webp'),
      getImg('dressing-tables/HFM-DRS-002/shot-3.webp'),
    ],
    colors: [{ name: 'Champagne Silver Metallic', hex: '#C0C0C0' }],
    shortDescription:
      'Champagne silver Hollywood vanity station with mirrored chevron lattice cabinet doors, ambient under-counter LED light strip, dual vanity mirrors, and faceted crystal knobs.',
    dimensions: 'W 120cm × D 45cm × H 165cm',
    material:
      'Metallic Lacquered Timber • Beveled Mirror Glass Inserts • Crystal Glass Hardware',
    leadTime: '16–22 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 25,
    stock: 2,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'alabaster-fluted-marble-vanity-suite',
    sku: 'HFM-DRS-003',
    name: 'The Alabaster Fluted Marble Vanity Suite with Velvet Stool',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'dressing-tables',
    subcategoryLabel: 'Dressing Tables',
    room: 'bedroom',
    price: 74000,
    priceFormatted: '৳74,000',
    pricePrefix: 'from',
    image: getImg('dressing-tables/HFM-DRS-003/shot-1.webp'),
    images: [
      getImg('dressing-tables/HFM-DRS-003/shot-1.webp'),
      getImg('dressing-tables/HFM-DRS-003/shot-2.webp'),
      getImg('dressing-tables/HFM-DRS-003/shot-3.webp'),
    ],
    colors: [
      { name: 'Ivory White & Gold', hex: '#FAF9F6' },
      { name: 'Warm Cream & Brass', hex: '#F3EFEA' },
    ],
    shortDescription:
      'Ivory white fluted dressing console with polished marble top slab, integrated rectangular backlit warm LED mirror, modular 3-drawer side chest, and blush pink button-tufted velvet stool.',
    dimensions: 'W 120–150cm (Extendable) × D 42cm × H 145cm',
    material:
      'Natural Marble Top • Fluted Wood Detailing • Satin Brass Pulls • Velvet Tufted Ottoman',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 42,
    stock: 9,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // BEDROOM — WARDROBES
  // ==========================================
  {
    id: 'heritage-3door-solid-wood-wardrobe',
    sku: 'HFM-WDR-001',
    name: 'The Heritage 3-Door Solid Wood Wardrobe with Dressing Mirror',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 135000,
    priceFormatted: '৳135,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/HFM-WDR-001/shot-1.webp'),
    images: [
      getImg('wardrobes/HFM-WDR-001/shot-1.webp'),
      getImg('wardrobes/HFM-WDR-001/shot-2.webp'),
      getImg('wardrobes/HFM-WDR-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Warm Honey Teak', hex: '#8B5A2B' },
      { name: 'Antique Chestnut', hex: '#5C3A21' },
    ],
    shortDescription:
      'Solid wood 3-door armoire wardrobe featuring arched fluted door panels, full-length beveled dressing mirror center door, crown molding cornice with brass lamp fixture, and keyed locks.',
    dimensions: 'W 165cm × D 60cm × H 215cm',
    material:
      'Solid Seasoned Teak & Hardwood • Beveled Float Mirror • Brass Key Locks & Handles',
    leadTime: '18–25 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 30,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'greek-key-carved-espresso-armoire',
    sku: 'HFM-WDR-002',
    name: 'The Greek-Key Carved Espresso Armoire & Chest',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 158000,
    priceFormatted: '৳158,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/HFM-WDR-002/shot-1.webp'),
    images: [
      getImg('wardrobes/HFM-WDR-002/shot-1.webp'),
      getImg('wardrobes/HFM-WDR-002/shot-2.webp'),
      getImg('wardrobes/HFM-WDR-002/shot-3.webp'),
    ],
    colors: [
      { name: 'Dark Espresso Mahogany', hex: '#3A2720' },
      { name: 'Smoked Truffle', hex: '#4A352B' },
    ],
    shortDescription:
      'Espresso dark mahogany wardrobe armoire & tallboy chest with 4 deep drawers featuring relief-carved Greek-key fretwork medallions and reeded borders, paired with a full-height hanging wardrobe.',
    dimensions: 'W 150cm × D 60cm × H 195cm',
    material:
      'Kiln-Dried Solid Mahogany • Hand-Carved Relief Geometric Panels • Full Extension Ball-Bearing Slides',
    leadTime: '18–24 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 33,
    stock: 5,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'royal-chittagong-teak-inlaid-wardrobe',
    sku: 'HFM-WDR-003',
    name: 'The Royal Chittagong Teak Inlaid 3-Door Wardrobe',
    category: 'Bedroom',
    categoryId: 'bedroom',
    subcategory: 'wardrobes',
    subcategoryLabel: 'Wardrobes',
    room: 'bedroom',
    price: 185000,
    priceFormatted: '৳185,000',
    pricePrefix: 'from',
    image: getImg('wardrobes/HFM-WDR-003/shot-1.webp'),
    images: [
      getImg('wardrobes/HFM-WDR-003/shot-1.webp'),
      getImg('wardrobes/HFM-WDR-003/shot-2.webp'),
      getImg('wardrobes/HFM-WDR-003/shot-3.webp'),
    ],
    colors: [{ name: 'Golden Teak with Silver Inlays', hex: '#C19A6B' }],
    shortDescription:
      'Master artisan 3-door wardrobe handcrafted in 100% solid Chittagong teak with carved baroque arched crown pediment, silver foliage scroll inlays, and geometric rosette eyelet inlays.',
    dimensions: 'W 180cm × D 62cm × H 225cm',
    material:
      '100% Pure Chittagong Teak (Segun) • Metallic Inlay Work • Traditional Tenon-Mortise Joinery',
    leadTime: '25–35 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 45,
    stock: 1,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // LIVING ROOM — SOFAS
  // ==========================================
  {
    id: 'grand-sapphire-chesterfield-sectional',
    sku: 'HFM-SOF-001',
    name: 'The Grand Sapphire Chesterfield Velvet Sectional Sofa',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 185000,
    priceFormatted: '৳185,000',
    pricePrefix: 'from',
    image: getImg('sofas/HFM-SOF-001/shot-1.webp'),
    images: [
      getImg('sofas/HFM-SOF-001/shot-1.webp'),
      getImg('sofas/HFM-SOF-001/shot-2.webp'),
      getImg('sofas/HFM-SOF-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Royal Sapphire Navy', hex: '#0F2C59' },
      { name: 'Midnight Charcoal', hex: '#1C2833' },
    ],
    shortDescription:
      'Monumental royal navy velvet L-shaped Chesterfield sectional sofa featuring all-over diamond button-tufting across seats, backs, and low shelter arms, accented with mustard velvet pillows.',
    dimensions: 'L 320cm × W 240cm × D 105cm × H 78cm',
    material:
      'Kiln-Dried Heavy Mahogany Frame • High-Density Rebound Foam • Royal Silk Velvet',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 54,
    stock: 3,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'rococo-embroidered-velvet-gold-settee',
    sku: 'HFM-SOF-002',
    name: 'The Rococo Embroidered Velvet & Gold Leaf Salon Settee',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 165000,
    priceFormatted: '৳165,000',
    pricePrefix: 'from',
    image: getImg('sofas/HFM-SOF-002/shot-1.webp'),
    images: [
      getImg('sofas/HFM-SOF-002/shot-1.webp'),
      getImg('sofas/HFM-SOF-002/shot-2.webp'),
      getImg('sofas/HFM-SOF-002/shot-3.webp'),
    ],
    colors: [{ name: 'Antique Gold & Rose-Taupe Velvet', hex: '#C5A059' }],
    shortDescription:
      'French Rococo salon settee featuring hand-carved 24K gold leaf frame, floral crest and apron, taupe velvet upholstery with hand-embroidered floral silk threadwork on backrest and cushions.',
    dimensions: 'W 220cm × D 90cm × H 105cm',
    material:
      'Hand-Carved Seasoned Teak & Hardwood • 24K Gold Leaf Gilding • Hand-Embroidered Velvet',
    leadTime: '21–30 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 26,
    stock: 0,
    inStock: false,
    lowStockThreshold: 3,
  },
  {
    id: 'nordic-fluted-arm-teal-loveseat',
    sku: 'HFM-SOF-003',
    name: 'The Nordic Fluted Arm Teal Velvet Loveseat',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 88000,
    priceFormatted: '৳88,000',
    pricePrefix: 'from',
    image: getImg('sofas/HFM-SOF-003/shot-1.webp'),
    images: [
      getImg('sofas/HFM-SOF-003/shot-1.webp'),
      getImg('sofas/HFM-SOF-003/shot-2.webp'),
      getImg('sofas/HFM-SOF-003/shot-3.webp'),
    ],
    colors: [
      { name: 'Dusty Teal Velvet', hex: '#4E7D96' },
      { name: 'Slate Blue', hex: '#638499' },
    ],
    shortDescription:
      'Mid-century modern dusty teal velvet 2-seater loveseat sofa with vertical pleated/fluted channel outer arm detailing, grid-tufted seat cushions, and sculpted solid teak wood base.',
    dimensions: 'W 175cm × D 88cm × H 82cm',
    material:
      'Solid Teak Sculpted Base • Stain-Resistant Performance Velvet • Pocket Springs',
    leadTime: '12–18 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 31,
    stock: 7,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'imperial-italian-gilded-damask-sofa-suite',
    sku: 'HFM-SOF-004',
    name: 'The Imperial Italian Gilded Damask Salon Sofa Suite',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'sofas',
    subcategoryLabel: 'Sofas',
    room: 'living-room',
    price: 260000,
    priceFormatted: '৳260,000',
    pricePrefix: 'from',
    image: getImg('sofas/HFM-SOF-004/shot-1.webp'),
    images: [
      getImg('sofas/HFM-SOF-004/shot-1.webp'),
      getImg('sofas/HFM-SOF-004/shot-2.webp'),
      getImg('sofas/HFM-SOF-004/shot-3.webp'),
    ],
    colors: [{ name: 'Champagne Gold & Ivory Damask', hex: '#D4AF37' }],
    shortDescription:
      'Italian baroque champagne gold salon sofa suite with hand-carved gilded crown crests, diamond button-tufted backrests, opulent floral damask jacquard seating cushions, and gold cabriole legs.',
    dimensions: '3-Seater: W 235cm × D 95cm × H 110cm (Suite 3+2+1 available)',
    material:
      'Carved Solid Hardwood Frame • Champagne Gold Gilding • Italian Woven Damask Brocade',
    leadTime: '24–35 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 41,
    stock: 2,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // LIVING ROOM — COFFEE TABLES
  // ==========================================
  {
    id: 'nero-marquina-gilded-baroque-coffee-table',
    sku: 'HFM-CFT-001',
    name: 'The Nero Marquina Gilded Baroque Marble Coffee Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 56000,
    priceFormatted: '৳56,000',
    pricePrefix: 'from',
    image: getImg('coffee-tables/HFM-CFT-001/shot-1.webp'),
    images: [
      getImg('coffee-tables/HFM-CFT-001/shot-1.webp'),
      getImg('coffee-tables/HFM-CFT-001/shot-2.webp'),
      getImg('coffee-tables/HFM-CFT-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Nero Marquina Black & Gold', hex: '#1C1C1C' },
      { name: 'Gold Leaf Base', hex: '#D4AF37' },
    ],
    shortDescription:
      'Polished Nero Marquina black marble center table with dramatic white veining, set upon a hand-carved baroque scrollwork apron and French gold cabriole legs.',
    dimensions: 'L 130cm × W 70cm × H 46cm',
    material:
      'Natural Nero Marquina Marble Slab • Hand-Carved Hardwood with Gold Leaf Finish',
    leadTime: '10–15 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 35,
    stock: 6,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'versailles-gilded-glass-center-table',
    sku: 'HFM-CFT-002',
    name: 'The Versailles Gilded Glass Center Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 48000,
    priceFormatted: '৳48,000',
    pricePrefix: 'from',
    image: getImg('coffee-tables/HFM-CFT-002/shot-1.webp'),
    images: [
      getImg('coffee-tables/HFM-CFT-002/shot-1.webp'),
      getImg('coffee-tables/HFM-CFT-002/shot-2.webp'),
      getImg('coffee-tables/HFM-CFT-002/shot-3.webp'),
    ],
    colors: [{ name: 'Champagne Gold Foil', hex: '#D4AF37' }],
    shortDescription:
      'Square champagne gold salon center table with beveled tempered glass top, hand-carved floral baroque apron, and gracefully curved cabriole legs.',
    dimensions: 'L 100cm × W 100cm × H 48cm',
    material:
      '12mm Beveled Tempered Glass • Carved Seasoned Wood • Champagne Gold Foil Finish',
    leadTime: '10–14 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 22,
    stock: 5,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'sovereign-marble-cream-leatherette-table',
    sku: 'HFM-CFT-003',
    name: 'The Sovereign Marble & Cream Leatherette Center Table',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'coffee-tables',
    subcategoryLabel: 'Coffee Tables',
    room: 'living-room',
    price: 52000,
    priceFormatted: '৳52,000',
    pricePrefix: 'from',
    image: getImg('coffee-tables/HFM-CFT-003/shot-1.webp'),
    images: [
      getImg('coffee-tables/HFM-CFT-003/shot-1.webp'),
      getImg('coffee-tables/HFM-CFT-003/shot-2.webp'),
      getImg('coffee-tables/HFM-CFT-003/shot-3.webp'),
    ],
    colors: [{ name: 'Cream Leatherette & Gold Mirror', hex: '#F5F2EB' }],
    shortDescription:
      'Luxury cream padded leatherette center table with polished travertine marble top, vertical mirror brass metal inlays, and filigree gold corner bracket feet.',
    dimensions: 'L 120cm × W 65cm × H 45cm',
    material:
      'Travertine Marble Slab • Padded Nappa Leatherette • Polished Brass Divider Accents',
    leadTime: '12–16 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 28,
    stock: 8,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // LIVING ROOM — TV UNITS
  // ==========================================
  {
    id: 'mid-century-louvered-slat-walnut-tv-unit',
    sku: 'HFM-TVU-001',
    name: 'The Mid-Century Louvered Slat Walnut TV Console',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 62000,
    priceFormatted: '৳62,000',
    pricePrefix: 'from',
    image: getImg('tv-units/HFM-TVU-001/shot-1.webp'),
    images: [
      getImg('tv-units/HFM-TVU-001/shot-1.webp'),
      getImg('tv-units/HFM-TVU-001/shot-2.webp'),
      getImg('tv-units/HFM-TVU-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Warm Walnut', hex: '#4A3525' },
      { name: 'Natural Teak', hex: '#6A4B35' },
    ],
    shortDescription:
      'Mid-century modern walnut TV console with rounded pill corners, left louvered acoustic slat cabinet door, open media deck, dual lower drawers, and flared tapered legs.',
    dimensions: 'W 180cm × D 42cm × H 52cm',
    material:
      'Solid Teak & Walnut Veneer • Acoustic Precision Slats • Undermount Soft-Close Slides',
    leadTime: '12–18 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 37,
    stock: 10,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'st-moritz-mirrored-quatrefoil-tv-credenza',
    sku: 'HFM-TVU-002',
    name: 'The St. Moritz Mirrored Quatrefoil TV Credenza',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 82000,
    priceFormatted: '৳82,000',
    pricePrefix: 'from',
    image: getImg('tv-units/HFM-TVU-002/shot-1.webp'),
    images: [
      getImg('tv-units/HFM-TVU-002/shot-1.webp'),
      getImg('tv-units/HFM-TVU-002/shot-2.webp'),
      getImg('tv-units/HFM-TVU-002/shot-3.webp'),
    ],
    colors: [{ name: 'Champagne Silver & Mirror Glass', hex: '#B8B8B8' }],
    shortDescription:
      'Champagne silver mirrored glamour TV credenza with geometric quatrefoil fretwork overlays on side cabinet doors, center mirror drawers with oval bezels, and crystal knobs.',
    dimensions: 'W 190cm × D 45cm × H 68cm',
    material:
      'Beveled Float Mirror Glass • Champagne Silver Lacquered Wood • Faceted Crystal Hardware',
    leadTime: '16–22 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 29,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'casablanca-white-fretwork-mirrored-sideboard',
    sku: 'HFM-TVU-003',
    name: 'The Casablanca White Fretwork Mirrored Sideboard & TV Unit',
    category: 'Living Room',
    categoryId: 'living-room',
    subcategory: 'tv-units',
    subcategoryLabel: 'TV Units',
    room: 'living-room',
    price: 76000,
    priceFormatted: '৳76,000',
    pricePrefix: 'from',
    image: getImg('tv-units/HFM-TVU-003/shot-1.webp'),
    images: [
      getImg('tv-units/HFM-TVU-003/shot-1.webp'),
      getImg('tv-units/HFM-TVU-003/shot-2.webp'),
      getImg('tv-units/HFM-TVU-003/shot-3.webp'),
    ],
    colors: [{ name: 'Alabaster White & Glass', hex: '#FAF9F6' }],
    shortDescription:
      'Transitional white 4-door sideboard / TV credenza with Moroccan geometric fretwork mirrored door inserts and 4 upper media/accessory drawers with crystal pulls.',
    dimensions: 'W 160cm × D 42cm × H 88cm',
    material:
      'High-Density Lacquered Timber • Tempered Float Mirror Glass • Crystal Glass Knobs',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 23,
    stock: 0,
    inStock: false,
    lowStockThreshold: 3,
  },

  // ==========================================
  // DINING — DINING TABLES
  // ==========================================
  {
    id: 'grand-sovereign-marble-mahogany-dining-suite',
    sku: 'HFM-DNT-001',
    name: 'The Grand Sovereign Marble & Carved Mahogany 8-Seater Dining Suite',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 185000,
    priceFormatted: '৳185,000',
    pricePrefix: 'from',
    image: getImg('dining-tables/HFM-DNT-001/shot-1.webp'),
    images: [
      getImg('dining-tables/HFM-DNT-001/shot-1.webp'),
      getImg('dining-tables/HFM-DNT-001/shot-2.webp'),
      getImg('dining-tables/HFM-DNT-001/shot-3.webp'),
    ],
    colors: [
      { name: 'Calacatta Marble & Mahogany', hex: '#5D2E1F' },
      { name: 'Oxblood Leather Seats', hex: '#651C32' },
    ],
    shortDescription:
      'Banquet 8-seater dining table with polished calacatta beige marble slab top and carved acanthus mahogany cabriole legs, paired with 8 high-back oxblood leather chairs with brass nailheads.',
    dimensions: 'Table: L 210cm × W 100cm × H 76cm',
    material:
      'Polished Italian Marble Slab • Kiln-Dried Solid Mahogany • Full-Grain Burgundy Leatherette',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 46,
    stock: 3,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'versailles-gilded-marble-banquet-suite',
    sku: 'HFM-DNT-002',
    name: 'The Versailles Gilded Marble Banquet Dining Suite',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 195000,
    priceFormatted: '৳195,000',
    pricePrefix: 'from',
    image: getImg('dining-tables/HFM-DNT-002/shot-1.webp'),
    images: [
      getImg('dining-tables/HFM-DNT-002/shot-1.webp'),
      getImg('dining-tables/HFM-DNT-002/shot-2.webp'),
      getImg('dining-tables/HFM-DNT-002/shot-3.webp'),
    ],
    colors: [{ name: 'Champagne Gold & Cream Brocade', hex: '#D4AF37' }],
    shortDescription:
      'Champagne gold French baroque banquet dining table with warm polished marble top and carved floral apron, paired with medallion oval-back dining chairs in ivory velvet and floral brocade.',
    dimensions: 'Table: L 220cm × W 105cm × H 76cm',
    material:
      'Polished Marble Top • Hand-Carved Hardwood with Gold Leaf • Woven French Tapestry Jacquard',
    leadTime: '20–28 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 39,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'royal-tiara-pearl-lacquer-marble-suite',
    sku: 'HFM-DNT-003',
    name: 'The Royal Tiara Pearl Lacquer & Marble Dining Suite',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'dining-tables',
    subcategoryLabel: 'Dining Tables',
    room: 'dining',
    price: 178000,
    priceFormatted: '৳178,000',
    pricePrefix: 'from',
    image: getImg('dining-tables/HFM-DNT-003/shot-1.webp'),
    images: [
      getImg('dining-tables/HFM-DNT-003/shot-1.webp'),
      getImg('dining-tables/HFM-DNT-003/shot-2.webp'),
      getImg('dining-tables/HFM-DNT-003/shot-3.webp'),
    ],
    colors: [{ name: 'Pearl Alabaster & Floral Damask', hex: '#F0EFEA' }],
    shortDescription:
      'Pearl white lacquered banquet dining table with polished marble top slab and carved rosette apron, accompanied by high-back chairs with carved floral tiara crests and damask jacquard seats.',
    dimensions: 'Table: L 200cm × W 100cm × H 76cm',
    material:
      'White Honed Marble Slab • Multi-Coat Pearl Enamel Finish • Damask Floral Brocade',
    leadTime: '16–24 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 28,
    stock: 5,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // DINING — CABINETS & SHOWCASES
  // ==========================================
  {
    id: 'heritage-grand-oak-china-cabinet-hutch',
    sku: 'HFM-CAB-001',
    name: 'The Heritage Grand Oak 4-Door China Cabinet & Display Hutch',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets & Showcases',
    room: 'dining',
    price: 118000,
    priceFormatted: '৳118,000',
    pricePrefix: 'from',
    image: getImg('cabinets/HFM-CAB-001/shot-1.webp'),
    images: [
      getImg('cabinets/HFM-CAB-001/shot-1.webp'),
      getImg('cabinets/HFM-CAB-001/shot-2.webp'),
      getImg('cabinets/HFM-CAB-001/shot-3.webp'),
    ],
    colors: [{ name: 'Vintage Golden Oak', hex: '#C29B38' }],
    shortDescription:
      'Grand traditional oak china cabinet & crockery hutch with arched carved top pediment with scrollwork molding, 4 glass display doors with glass shelving, 4 lower cutlery drawers, and 4 raised-panel doors.',
    dimensions: 'W 185cm × D 48cm × H 215cm',
    material:
      'Solid Seasoned Oak & Teak • Tempered Display Glass • Antiqued Brass Hardware',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 31,
    stock: 3,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'royal-sunburst-chittagong-teak-crockery-showcase',
    sku: 'HFM-CAB-002',
    name: 'The Royal Sunburst Chittagong Teak Crockery Showcase',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets & Showcases',
    room: 'dining',
    price: 145000,
    priceFormatted: '৳145,000',
    pricePrefix: 'from',
    image: getImg('cabinets/HFM-CAB-002/shot-1.webp'),
    images: [
      getImg('cabinets/HFM-CAB-002/shot-1.webp'),
      getImg('cabinets/HFM-CAB-002/shot-2.webp'),
      getImg('cabinets/HFM-CAB-002/shot-3.webp'),
    ],
    colors: [{ name: 'Polished Chittagong Teak & Gold', hex: '#8B5A2B' }],
    shortDescription:
      'Solid Chittagong teak crockery showcase with hand-carved sunburst crown crest, 4 arched glass display doors with gold filigree corner ornaments, and 4 lower teak doors with gold scrollwork medallions.',
    dimensions: 'W 190cm × D 50cm × H 220cm',
    material:
      '100% Solid Chittagong Teak (Segun) • Gold Leaf Carved Accents • Heavy Beveled Glass',
    leadTime: '21–30 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 44,
    stock: 2,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'classic-oak-dining-buffet-hutch',
    sku: 'HFM-CAB-003',
    name: 'The Classic Oak Dining Buffet & Crockery Hutch',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets & Showcases',
    room: 'dining',
    price: 92000,
    priceFormatted: '৳92,000',
    pricePrefix: 'from',
    image: getImg('cabinets/HFM-CAB-003/shot-1.webp'),
    images: [
      getImg('cabinets/HFM-CAB-003/shot-1.webp'),
      getImg('cabinets/HFM-CAB-003/shot-2.webp'),
      getImg('cabinets/HFM-CAB-003/shot-3.webp'),
    ],
    colors: [{ name: 'Warm Golden Oak', hex: '#B8860B' }],
    shortDescription:
      'Warm oak dining buffet & hutch with upper arched glass cabinets, open center display shelf, mid-level serving countertop deck, 3 center drawers, and dual lower cupboards.',
    dimensions: 'W 160cm × D 45cm × H 200cm',
    material:
      'Solid Seasoned Oak Structure • Tempered Glass Panels • Satin Metal Handles',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 26,
    stock: 6,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'gothic-cathedral-arch-oak-curio-showcase',
    sku: 'HFM-CAB-004',
    name: 'The Gothic Cathedral Arch Oak Curio Showcase',
    category: 'Dining',
    categoryId: 'dining',
    subcategory: 'cabinets',
    subcategoryLabel: 'Cabinets & Showcases',
    room: 'dining',
    price: 68000,
    priceFormatted: '৳68,000',
    pricePrefix: 'from',
    image: getImg('cabinets/HFM-CAB-004/shot-1.webp'),
    images: [
      getImg('cabinets/HFM-CAB-004/shot-1.webp'),
      getImg('cabinets/HFM-CAB-004/shot-2.webp'),
      getImg('cabinets/HFM-CAB-004/shot-3.webp'),
    ],
    colors: [{ name: 'Natural Honey Oak', hex: '#C29B38' }],
    shortDescription:
      '2-door oak curio display showcase with tall pointed gothic cathedral glass mullions, 2 utility drawers, and lower double raised-panel storage cupboards.',
    dimensions: 'W 95cm × D 42cm × H 205cm',
    material:
      'Solid White Oak • Gothic Arched Mullioned Glass • Chrome Lock Fixtures',
    leadTime: '14–20 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 18,
    stock: 0,
    inStock: false,
    lowStockThreshold: 3,
  },

  // ==========================================
  // OFFICE & STUDY — OFFICE CHAIRS
  // ==========================================
  {
    id: 'president-diamond-tufted-leather-chair',
    sku: 'HFM-CHR-001',
    name: 'The President Diamond-Tufted Leather Executive Chair',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'office-chairs',
    subcategoryLabel: 'Office Chairs',
    room: 'office-study',
    price: 36000,
    priceFormatted: '৳36,000',
    pricePrefix: 'from',
    image: getImg('office-chairs/HFM-CHR-001/shot-1.webp'),
    images: [
      getImg('office-chairs/HFM-CHR-001/shot-1.webp'),
      getImg('office-chairs/HFM-CHR-001/shot-2.webp'),
      getImg('office-chairs/HFM-CHR-001/shot-3.webp'),
    ],
    colors: [{ name: 'Obsidian Black Leather', hex: '#1C1C1C' }],
    shortDescription:
      'High-back black leather executive office swivel chair with diamond button-tufted backrest, contrast stitching, chrome loop arms with padded leather armrests, and 5-star chrome base.',
    dimensions: 'W 68cm × D 70cm × H 118–126cm',
    material:
      'Full-Grain Bonded Leather • Heavy-Duty Chrome Steel Base • Class 4 Pneumatic Gas Lift',
    leadTime: '5–8 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 52,
    stock: 15,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'senator-quilted-chocolate-leather-chair',
    sku: 'HFM-CHR-002',
    name: 'The Senator Quilted Chocolate Leather Executive Chair',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'office-chairs',
    subcategoryLabel: 'Office Chairs',
    room: 'office-study',
    price: 38000,
    priceFormatted: '৳38,000',
    pricePrefix: 'from',
    image: getImg('office-chairs/HFM-CHR-002/shot-1.webp'),
    images: [
      getImg('office-chairs/HFM-CHR-002/shot-1.webp'),
      getImg('office-chairs/HFM-CHR-002/shot-2.webp'),
      getImg('office-chairs/HFM-CHR-002/shot-3.webp'),
    ],
    colors: [{ name: 'Vintage Chocolate Brown', hex: '#4A3525' }],
    shortDescription:
      'Chocolate brown leather high-back executive chair with quilted diamond tufting, integrated pillowed headrest, chrome loop arms with leather arm pads, and 5-star rolling caster base.',
    dimensions: 'W 68cm × D 72cm × H 120–128cm',
    material:
      'Supple Antique Brown Leather • High-Resilience Molded Cushioning • Polished Chrome Swivel Base',
    leadTime: '5–8 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 38,
    stock: 11,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'ambassador-mahogany-leather-director-chair',
    sku: 'HFM-CHR-003',
    name: 'The Ambassador Mahogany & Leather Director Chair',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'office-chairs',
    subcategoryLabel: 'Office Chairs',
    room: 'office-study',
    price: 42000,
    priceFormatted: '৳42,000',
    pricePrefix: 'from',
    image: getImg('office-chairs/HFM-CHR-003/shot-1.webp'),
    images: [
      getImg('office-chairs/HFM-CHR-003/shot-1.webp'),
      getImg('office-chairs/HFM-CHR-003/shot-2.webp'),
      getImg('office-chairs/HFM-CHR-003/shot-3.webp'),
    ],
    colors: [{ name: 'Executive Black & Mahogany', hex: '#1C1C1C' }],
    shortDescription:
      'Executive director high-back chair in black leather with ergonomic tiered pillow cushioning, contrast amber stitching, solid mahogany wooden armrests over chrome structure, and chrome swivel base.',
    dimensions: 'W 66cm × D 68cm × H 116–124cm',
    material:
      'Top-Grain Leather • Solid Mahogany Arm Caps • High-Strength Chrome Frame & Base',
    leadTime: '7–10 Days',
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 47,
    stock: 8,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'ergopro-dynamic-lumbar-mesh-task-chair',
    sku: 'HFM-CHR-004',
    name: 'The ErgoPro Dynamic Lumbar High-Back Mesh Task Chair',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'office-chairs',
    subcategoryLabel: 'Office Chairs',
    room: 'office-study',
    price: 28000,
    priceFormatted: '৳28,000',
    pricePrefix: 'from',
    image: getImg('office-chairs/HFM-CHR-004/shot-1.webp'),
    images: [
      getImg('office-chairs/HFM-CHR-004/shot-1.webp'),
      getImg('office-chairs/HFM-CHR-004/shot-2.webp'),
      getImg('office-chairs/HFM-CHR-004/shot-3.webp'),
    ],
    colors: [{ name: 'Onyx Black Mesh', hex: '#262626' }],
    shortDescription:
      'High-performance ergonomic mesh office task chair with adjustable mesh headrest, split dynamic lumbar support, 3D multi-directional armrests, synchro-tilt mechanism, and aluminum alloy base.',
    dimensions: 'W 65cm × D 65cm × H 115–125cm',
    material:
      'Breathable High-Tension Korean Mesh • Heavy-Duty Aluminum Alloy Base • Ergonomic Synchro-Tilt',
    leadTime: '3–5 Days',
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 65,
    stock: 20,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // OFFICE & STUDY — EXECUTIVE DESKS
  // ==========================================
  {
    id: 'pavilion-modern-curved-reception-desk',
    sku: 'HFM-EXT-001',
    name: 'The Pavilion Modern Curved Reception Counter & Workstation',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive & Reception Desks',
    room: 'office-study',
    price: 95000,
    priceFormatted: '৳95,000',
    pricePrefix: 'from',
    image: getImg('executive-tables/HFM-EXT-001/shot-1.webp'),
    images: [
      getImg('executive-tables/HFM-EXT-001/shot-1.webp'),
      getImg('executive-tables/HFM-EXT-001/shot-2.webp'),
      getImg('executive-tables/HFM-EXT-001/shot-3.webp'),
    ],
    colors: [{ name: 'Warm Cream & Natural Fluted Oak', hex: '#EDE8DF' }],
    shortDescription:
      'Contemporary architectural curved reception counter desk with sculptural cream wrap-around modesty counter and natural wood vertical fluted side workstation.',
    dimensions: 'W 220cm × D 110cm × H 115cm (Counter) / 75cm (Desk)',
    material:
      'Architectural Curved Composite • Natural Fluted Oak Slats • Concealed Cable Raceway',
    leadTime: '16–22 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 27,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'apex-minimalist-aframe-director-desk',
    sku: 'HFM-EXT-002',
    name: 'The Apex Minimalist A-Frame Executive Director Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'executive-tables',
    subcategoryLabel: 'Executive & Reception Desks',
    room: 'office-study',
    price: 72000,
    priceFormatted: '৳72,000',
    pricePrefix: 'from',
    image: getImg('executive-tables/HFM-EXT-002/shot-1.webp'),
    images: [
      getImg('executive-tables/HFM-EXT-002/shot-1.webp'),
      getImg('executive-tables/HFM-EXT-002/shot-2.webp'),
      getImg('executive-tables/HFM-EXT-002/shot-3.webp'),
    ],
    colors: [{ name: 'Light Natural Ash & Black Steel', hex: '#D2B48C' }],
    shortDescription:
      'Modern executive director desk with light natural ash wood desktop, industrial black powder-coated angled A-frame steel legs, modesty panel, and lockable mobile drawer pedestal.',
    dimensions: 'W 180cm × D 80cm × H 75cm',
    material:
      'High-Density Natural Ash Worktop • Structural Steel A-Frame • Lockable 3-Drawer Under-Desk Pedestal',
    leadTime: '12–16 Days',
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 22,
    stock: 7,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // OFFICE & STUDY — STUDY DESKS
  // ==========================================
  {
    id: 'atelier-builtin-fluted-study-desk-suite',
    sku: 'HFM-STB-001',
    name: 'The Atelier Built-in Fluted Study Desk & Overhead Hutch Suite',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'study-tables',
    subcategoryLabel: 'Study Desks',
    room: 'office-study',
    price: 68000,
    priceFormatted: '৳68,000',
    pricePrefix: 'from',
    image: getImg('study-tables/HFM-STB-001/shot-1.webp'),
    images: [
      getImg('study-tables/HFM-STB-001/shot-1.webp'),
      getImg('study-tables/HFM-STB-001/shot-2.webp'),
      getImg('study-tables/HFM-STB-001/shot-3.webp'),
    ],
    colors: [{ name: 'Warm Taupe & Cream Fluting', hex: '#DDD0C0' }],
    shortDescription:
      'Custom built-in study desk suite with warm LED backlit fluted vertical wall paneling, overhead 3-compartment floating wall shelf hutch, integrated power switchboard, study worktop, right-side 2-drawer pedestal, and velvet bucket chair.',
    dimensions: 'W 150cm × D 60cm × H 200cm (Worktop H 75cm)',
    material:
      'Custom Lacquered High-Density Board • Fluted Wall Slats • Built-in LED Channels • Velvet Study Chair Included',
    leadTime: '14–20 Days',
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 39,
    stock: 5,
    inStock: true,
    lowStockThreshold: 3,
  },

  // ==========================================
  // OFFICE & STUDY — WORKSTATIONS & CONFERENCE
  // ==========================================
  {
    id: 'collaborative-6person-modular-workstation-pod',
    sku: 'HFM-WKS-001',
    name: 'The Collaborative 6-Person Modular Office Workstation Pod',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 165000,
    priceFormatted: '৳165,000',
    pricePrefix: 'from',
    image: getImg('workstations/HFM-WKS-001/shot-1.webp'),
    images: [
      getImg('workstations/HFM-WKS-001/shot-1.webp'),
      getImg('workstations/HFM-WKS-001/shot-2.webp'),
      getImg('workstations/HFM-WKS-001/shot-3.webp'),
    ],
    colors: [{ name: 'Pure White & Matte Black Steel', hex: '#FFFFFF' }],
    shortDescription:
      'Commercial 6-person modular office workstation cluster with dual-sided white worktops, frosted acoustic privacy screen dividers, heavy-duty black steel A-frame trestle legs, and integrated cable raceways.',
    dimensions: 'L 360cm × W 140cm × H 75cm (Divider H 105cm)',
    material:
      'Commercial Melamine Anti-Scratch Tops • Heavy Industrial Steel Legs • Acoustic Fabric Partition Screens',
    leadTime: '16–24 Days',
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 24,
    stock: 4,
    inStock: true,
    lowStockThreshold: 3,
  },
  {
    id: 'summit-10person-solid-oak-conference-table',
    sku: 'HFM-WKS-002',
    name: 'The Summit 10-Seater Solid Oak Executive Conference Table',
    category: 'Office & Study',
    categoryId: 'office-study',
    subcategory: 'workstations',
    subcategoryLabel: 'Workstations',
    room: 'office-study',
    price: 145000,
    priceFormatted: '৳145,000',
    pricePrefix: 'from',
    image: getImg('workstations/HFM-WKS-002/shot-1.webp'),
    images: [
      getImg('workstations/HFM-WKS-002/shot-1.webp'),
      getImg('workstations/HFM-WKS-002/shot-2.webp'),
      getImg('workstations/HFM-WKS-002/shot-3.webp'),
    ],
    colors: [{ name: 'Natural Honey Oak & Black Base', hex: '#C29B38' }],
    shortDescription:
      'Monumental 10-seater executive conference / boardroom table with solid natural oak slab top, integrated center cable pass-through access boxes, and heavy-duty black steel U-trestle base.',
    dimensions: 'L 360cm × W 120cm × H 75cm',
    material:
      'Solid Seasoned Oak Slab Top • Heavy Structural Steel Frame • Integrated Flip-Top AV Power Hubs',
    leadTime: '18–25 Days',
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 20,
    stock: 3,
    inStock: true,
    lowStockThreshold: 3,
  },
]

export const FEATURED_PRODUCTS = PRODUCTS.filter((item) => item.isFeatured)

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
    description: 'Beds, bedside tables, dressing consoles, wardrobes.',
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
    description: 'Luxury salon sofas, marble coffee tables, TV credenzas.',
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
    description: 'Banquet dining suites, crockery showcases & china hutches.',
    subcategories: [
      { id: 'dining-tables', name: 'Dining Tables' },
      { id: 'cabinets', name: 'Cabinets & Showcases' },
    ],
  },
  {
    id: 'office-study',
    name: 'Office & Study',
    slug: 'office-study',
    count: PRODUCTS.filter((p) => p.categoryId === 'office-study').length,
    description:
      'Executive director chairs, reception desks, study units, workstations.',
    subcategories: [
      { id: 'office-chairs', name: 'Office Chairs' },
      { id: 'executive-tables', name: 'Executive & Reception Desks' },
      { id: 'study-tables', name: 'Study Desks' },
      { id: 'workstations', name: 'Workstations' },
    ],
  },
  {
    id: 'bespoke-commissions',
    name: 'Bespoke / Custom',
    slug: 'bespoke',
    count: 'Custom',
    description:
      'Handcrafted to your exact architectural space, dimensions, and finish.',
    isCustom: true,
  },
]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured Pieces' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest Additions' },
]

export const STOCK_FILTER_OPTIONS = [
  { id: 'all', label: 'All Availability' },
  { id: 'in-stock', label: 'In Stock Only' },
  { id: 'out-of-stock', label: 'Made-to-Order / Out of Stock' },
]

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-50k', label: 'Under ৳50,000', min: 0, max: 50000 },
  { id: '50k-100k', label: '৳50,000 – ৳100,000', min: 50000, max: 100000 },
  { id: '100k-150k', label: '৳100,000 – ৳150,000', min: 100000, max: 150000 },
  { id: 'above-150k', label: 'Above ৳150,000', min: 150000, max: Infinity },
]

export function getAllProducts() {
  return PRODUCTS
}

export function getFeaturedProducts() {
  return FEATURED_PRODUCTS
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id || p.sku === id) || null
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.categoryId === categoryId)
}

export function getProductsBySubcategory(subcategory) {
  if (!subcategory || subcategory === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.subcategory === subcategory)
}

export function filterProducts({
  categoryId = 'all',
  subcategory = 'all',
  minPrice = 0,
  maxPrice = Infinity,
  sortBy = 'featured',
  searchQuery = '',
  stockFilter = 'all',
} = {}) {
  return PRODUCTS.filter((product) => {
    if (categoryId !== 'all' && product.categoryId !== categoryId) return false
    if (subcategory !== 'all' && product.subcategory !== subcategory)
      return false
    if (product.price < minPrice || product.price > maxPrice) return false

    // Stock availability filter
    if (stockFilter === 'in-stock' && (!product.stock || product.stock <= 0)) {
      return false
    }
    if (stockFilter === 'out-of-stock' && product.stock > 0) {
      return false
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchesName = product.name.toLowerCase().includes(q)
      const matchesSku = product.sku?.toLowerCase().includes(q)
      const matchesCategory = product.category.toLowerCase().includes(q)
      const matchesSubcategory = product.subcategoryLabel
        .toLowerCase()
        .includes(q)
      const matchesMaterial = product.material.toLowerCase().includes(q)
      const matchesDesc = product.shortDescription.toLowerCase().includes(q)
      if (
        !matchesName &&
        !matchesSku &&
        !matchesCategory &&
        !matchesSubcategory &&
        !matchesMaterial &&
        !matchesDesc
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

export const BESPOKE_PRODUCTS = [
  PRODUCTS.find((p) => p.sku === 'HFM-BED-001') || PRODUCTS[0],
  PRODUCTS.find((p) => p.sku === 'HFM-SOF-001') || PRODUCTS[1],
  PRODUCTS.find((p) => p.sku === 'HFM-DNT-001') || PRODUCTS[2],
  PRODUCTS.find((p) => p.sku === 'HFM-STB-001') || PRODUCTS[3],
]

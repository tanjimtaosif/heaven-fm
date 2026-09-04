import sofaImg from '@/assets/category/sofa-cat.png'
import bedImg from '@/assets/category/bed-cat.png'
import diningImg from '@/assets/category/dining-cat.png'
import officeImg from '@/assets/category/office-cat.png'

export const BESPOKE_PRODUCTS = [
  {
    id: 'sovereign-chesterfield-sofa',
    name: 'The Sovereign Chesterfield 3-Seater',
    category: 'Living Room',
    categoryId: 'living-room',
    price: 125000,
    priceFormatted: '৳125,000',
    image: sofaImg,
    finish: 'Seasoned Mahogany Frame • Italian Olive Velvet',
    dimensions: 'W 220cm × D 95cm × H 80cm',
    leadTime: '14–21 Days Handcrafting',
    description:
      'Deep button-tufted silhouette, high-density comfort core, and kiln-dried solid mahogany internal framing handcrafted for lifelong resilience.',
  },
  {
    id: 'elysian-king-bedstead',
    name: 'The Elysian King Bedstead Suite',
    category: 'Bedroom',
    categoryId: 'bedroom',
    price: 145000,
    priceFormatted: '৳145,000',
    image: bedImg,
    finish: 'Solid Teakwood Base • Fluted Bouclé Upholstery',
    dimensions: '6.5ft × 7ft Architectural King',
    leadTime: '18–25 Days Handcrafting',
    description:
      'Sculptural floating platform bedstead featuring an extended acoustic headboard panel with integrated brass ambient raceways.',
  },
  {
    id: 'heritage-teak-dining-suite',
    name: 'The Heritage Teak 8-Seater Dining Suite',
    category: 'Dining',
    categoryId: 'dining',
    price: 195000,
    priceFormatted: '৳195,000',
    image: diningImg,
    finish: 'Aged Burma Teak • Hand-Rubbed Satin Wax Polish',
    dimensions: '8.5ft Solid Plinth Table + 8 Contoured Chairs',
    leadTime: '21–28 Days Handcrafting',
    description:
      'Monolithic bookmatched solid timber top with traditional mortise-and-tenon architectural joinery and matching ergonomic chairs.',
  },
  {
    id: 'chancellor-executive-desk',
    name: 'The Chancellor Executive Study Desk',
    category: 'Office & Study',
    categoryId: 'office-study',
    price: 98000,
    priceFormatted: '৳98,000',
    image: officeImg,
    finish: 'Quarter-Sawn Walnut • Brushed Brass Accents',
    dimensions: 'W 180cm × D 90cm × H 76cm',
    leadTime: '14–20 Days Handcrafting',
    description:
      'Imposing executive stature with hidden wire management raceways, soft-close velvet-lined drawers, and solid brass shadow-line detailing.',
  },
]

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Inquiries' },
  { id: 'bespoke', label: 'Bespoke Process' },
  { id: 'showroom', label: 'Agrabad Showroom' },
  { id: 'materials', label: 'Timber & Craft' },
  { id: 'logistics', label: 'Delivery & Payment' },
]

export const FAQS = [
  {
    id: 'bespoke-difference',
    category: 'bespoke',
    categoryLabel: 'Bespoke Process',
    question: 'What makes Heaven Furniture Mart different?',
    answer:
      'We are a bespoke studio in Chattogram crafting custom furniture from scratch. Rather than mass-produced retail stock, every piece is built to your room dimensions, hardwood preference, and interior style.',
  },
  {
    id: 'free-consultation',
    category: 'bespoke',
    categoryLabel: 'Bespoke Process',
    question: 'Is the design consultation free?',
    answer:
      'Yes, 100% free with zero obligation. You can visit our Agrabad showroom or consult online to review your floor plans, timber options, and design concepts with our specialists.',
  },
  {
    id: 'furniture-categories',
    category: 'bespoke',
    categoryLabel: 'Collections',
    question: 'What types of custom furniture do you make?',
    answer:
      'We design and build custom furniture across living, dining, bedroom, and office spaces — including bespoke sofas, solid wood dining tables, master beds, and architectural cabinetry.',
  },
  {
    id: 'showroom-location',
    category: 'showroom',
    categoryLabel: 'Agrabad Showroom',
    question: 'Where is your showroom located?',
    answer:
      'Our studio is on Agrabad Access Road, Chattogram. You are welcome to visit, inspect hardwood samples, test ergonomic seating, and browse fabric swatches in person.',
  },
  {
    id: 'craftsmanship-materials',
    category: 'materials',
    categoryLabel: 'Timber & Craft',
    question: 'What materials and craftsmanship do you use?',
    answer:
      'Our master artisans build each piece using seasoned hardwoods (like Teak, Mahogani, and Segun), high-density ergonomic foam, European hardware, and durable, stain-resistant fabrics.',
  },
  {
    id: 'delivery-installation',
    category: 'logistics',
    categoryLabel: 'Delivery & Logistics',
    question: 'Is delivery and assembly included?',
    answer:
      'Yes. We provide white-glove delivery and on-site assembly throughout Chattogram. Our team handles unpacking, precise placement, and final inspection.',
  },
  {
    id: 'payment-options',
    category: 'logistics',
    categoryLabel: 'Delivery & Payment',
    question: 'What are your payment terms?',
    answer:
      'We use milestone-based payments: an initial deposit for design and timber procurement, an interim progress payment, and the remaining balance upon delivery and inspection.',
  },
  {
    id: 'how-to-start',
    category: 'bespoke',
    categoryLabel: 'Get Started',
    question: 'How do I request a quote or get started?',
    answer:
      'Click "Request a Quote", call us, or message us on WhatsApp with your room dimensions or inspiration photos. Our team will share a personalized proposal within 24–48 hours.',
  },
]

export async function fetchFaqs() {
  return new Promise((resolve) => {
    resolve(FAQS)
  })
}

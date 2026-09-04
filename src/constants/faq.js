/**
 * Heaven Furniture Mart — Master FAQ Data & Fetcher
 * Derived directly from company-details.pdf
 */

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
    question: 'What makes Heaven Furniture Mart different from an off-the-shelf furniture store?',
    answer:
      'Unlike retail showrooms that sell mass-produced furniture pulled off a warehouse shelf, Heaven Furniture Mart is an artisanal bespoke interior studio based in Chattogram. Our guiding philosophy is "Designed. Crafted. Customized." Every sofa, master bed, dining suite, and executive workstation is designed from scratch around your specific room dimensions, architectural style, and ergonomic preferences. You select the exact hardwoods, upholstery textures, dimensions, and finishes.',
  },
  {
    id: 'free-consultation',
    category: 'bespoke',
    categoryLabel: 'Bespoke Process',
    question: 'Is the initial interior design consultation truly free with no obligation?',
    answer:
      'Yes, 100% complimentary. We believe bespoke design begins with listening. You can visit our Agrabad showroom or connect virtually with our design specialists. We will review your architectural floor plans, spatial requirements, and aesthetic references to recommend tailored timber selections and layouts — with zero upfront cost or commissioning obligation.',
  },
  {
    id: 'furniture-categories',
    category: 'bespoke',
    categoryLabel: 'Collections',
    question: 'What furniture categories and custom architectural pieces do you create?',
    answer:
      'We craft comprehensive luxury furniture across five core specialties:\n• Living Room: Bespoke sofas, sculptural coffee tables, media consoles, and accent TV units.\n• Bedroom: Handcrafted master beds, upholstered headboards, walk-in wardrobes, dressing tables, and bedside pedestals.\n• Dining: Solid timber dining tables, bespoke chairs, credenzas, and buffet display units.\n• Office & Study: Executive desks, custom architectural bookcases, and executive workstations.\n• Bespoke Architectural Millwork: Wall paneling, custom cabinetry, and one-of-a-kind statement commissions tailored to any space.',
  },
  {
    id: 'showroom-location',
    category: 'showroom',
    categoryLabel: 'Agrabad Showroom',
    question: 'Where is your showroom located, and can I inspect timber and finishes in person?',
    answer:
      'Our expansive physical showroom is located on Agrabad Access Road, Chattogram. We warmly invite you to visit our studio to test seating ergonomic angles, experience seasoned hardwood grains firsthand, and browse hundreds of imported textile and genuine leather swatches before making any decisions.',
  },
  {
    id: 'craftsmanship-materials',
    category: 'materials',
    categoryLabel: 'Timber & Craft',
    question: 'Who builds your furniture and what materials are used in construction?',
    answer:
      'Every piece is handcrafted by our master in-house artisans in Chattogram who possess decades of heritage joinery experience. We exclusively use premium seasoned hardwoods, high-resilience ergonomic foam cores, precision European hardware, and luxury upholstery fabrics with stain-resistant protection to ensure lifetime structural durability.',
  },
  {
    id: 'delivery-installation',
    category: 'logistics',
    categoryLabel: 'Delivery & Logistics',
    question: 'Are delivery and on-site assembly included with my bespoke order?',
    answer:
      'Yes. Every commission includes comprehensive white-glove delivery and professional in-home placement across Chattogram. Our dedicated logistics and assembly crew unpacks, positions, levels, and inspects your furniture in your residence, leaving your space spotless and ready to enjoy.',
  },
  {
    id: 'payment-options',
    category: 'logistics',
    categoryLabel: 'Delivery & Payment',
    question: 'What payment options and project milestones do you provide?',
    answer:
      'We provide transparent, milestone-based payment schedules tailored to your commissioning journey. Projects are generally divided into an initial design & timber procurement deposit, a mid-production progress check, and a final settlement upon white-glove delivery, assembly, and your personal satisfaction inspection.',
  },
  {
    id: 'how-to-start',
    category: 'bespoke',
    categoryLabel: 'Get Started',
    question: 'How do I start a bespoke commission or request a quotation?',
    answer:
      'Starting is effortless. You can click "Request a Quote" on this website, call our direct studio desk at +880 1960-481983, or message our design directors on WhatsApp. Simply share your room dimensions, floor plan sketches, or design inspiration photos, and our team will prepare a personalized concept proposal within 24–48 hours.',
  },
]

/**
 * Asynchronously loads FAQ entries.
 * Simulates an API fetch while guaranteeing instantaneous availability and zero layout shifts.
 *
 * @returns {Promise<typeof FAQS>}
 */
export async function fetchFaqs() {
  return new Promise((resolve) => {
    // Immediate microtask resolution for blazing performance
    resolve(FAQS)
  })
}

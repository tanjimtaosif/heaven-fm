/**
 * Heaven Furniture Mart — Master Company Data & Constants
 * Single Source of Truth derived from company-details.pdf
 */

export const COMPANY_INFO = {
  name: 'Heaven Furniture Mart',
  tagline: 'Designed. Crafted. Customized.',
  category: 'Luxury / Bespoke Furniture & Interior Styling',
  location: 'Agrabad Access Road, Chattogram, Bangladesh',
  foundedYear: '2020',
  founder: 'Abul Kalam Bhuiyan',
  founderTitle: 'Managing Director',

  contact: {
    phone: '+880 1960-481983',
    phoneClean: '+8801960481983',
    email: 'heavenfurnituremart@gmail.com',
    whatsappUrl:
      'https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart%2C%20I%20would%20like%20to%20request%20a%20bespoke%20furniture%20consultation.',
  },

  socialLinks: {
    facebook: 'https://facebook.com/HeavenFurnitureMart',
    instagram: 'https://instagram.com/heaven_furniture_ltd',
    youtube: 'https://youtube.com/@HeavenFurnitureMart',
  },

  hero: {
    badge: 'Bespoke Luxury • Chattogram',
    headline: 'Furniture, Crafted Around You',
    subheadline:
      "Step into Chattogram's premier bespoke interior studio. We curate, tailor, and handcraft timeless luxury pieces built specifically for your architecture and lifestyle.",
    primaryCta: 'Request a Consultation',
    secondaryCta: 'Explore Collections',
  },

  brandIntro: {
    label: 'The Studio Story',
    heading: 'Designed. Crafted. Customized.',
    description:
      "Heaven Furniture Mart is one of Chattogram's leading bespoke furniture ateliers. We design and craft custom furniture — sofas, beds, dining sets, office suites — built around what you truly desire, never pulled off a shelf. Every contour and joinery detail is tailored to your space.",
    quote: {
      text: 'At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients.',
      author: 'Abul Kalam Bhuiyan',
      role: 'Managing Director',
    },
  },

  trustPoints: [
    {
      id: 'consultation',
      title: 'Free Design Consultation',
      description:
        'Collaborate directly with our interior specialists to conceptualize pieces that honor your spatial layout.',
      icon: 'Sparkles',
    },
    {
      id: 'bespoke',
      title: '100% Fully Bespoke',
      description:
        'Tailored to your architectural dimensions and individual aesthetic — never generic mass production.',
      icon: 'Ruler',
    },
    {
      id: 'craftsmanship',
      title: 'Master Craftsmanship',
      description:
        'Finest seasoned woods, handpicked textiles, and skilled in-house artisans with decades of joinery heritage.',
      icon: 'Hammer',
    },
    {
      id: 'showroom',
      title: 'Expansive Agrabad Showroom',
      description:
        "Experience tangible luxury, feel leather finishes, and test ergonomic proportions in Chattogram's core design hub.",
      icon: 'Store',
    },
    {
      id: 'white-glove',
      title: 'Delivery & Installation Included',
      description:
        'White-glove placement and precision assembly handled directly by our dedicated logistics team.',
      icon: 'Truck',
    },
    {
      id: 'payment',
      title: 'Flexible Payment Options',
      description:
        'Hassle-free payment milestones and financing options customized to suit your interior commissioning schedule.',
      icon: 'CreditCard',
    },
    {
      id: 'reputation',
      title: 'Trusted by Hundreds',
      description:
        "Proudly furnishing Chattogram's most prestigious residences, penthouses, and corporate executive suites.",
      icon: 'ShieldCheck',
    },
  ],

  categories: [
    {
      id: 'living-room',
      title: 'Living Room',
      subtitle: 'Sculptural Comfort & Social Elegance',
      items: ['Sofas', 'Coffee Tables', 'TV Units', 'Console Tables'],
      imageTag: 'Living room bespoke luxury seating',
    },
    {
      id: 'bedroom',
      title: 'Bedroom',
      subtitle: 'Sanctuaries of Quiet Refinement',
      items: [
        'Master Beds',
        'Walk-in Wardrobes',
        'Dressing Tables',
        'Bedside Tables',
      ],
      imageTag: 'Luxury bespoke bedroom suite',
    },
    {
      id: 'dining',
      title: 'Dining',
      subtitle: 'Feast in Architectural Splendor',
      items: ['Dining Tables', 'Dining Chairs', 'Credenzas & Cabinets'],
      imageTag: 'Bespoke dining table solid timber',
    },
    {
      id: 'office-study',
      title: 'Office & Study',
      subtitle: 'Executive Stature & Ergonomics',
      items: ['Executive Desks', 'Bookcases', 'Custom Workstations'],
      imageTag: 'Executive bespoke study furniture',
    },
    {
      id: 'bespoke-commissions',
      title: 'Bespoke Commissions',
      subtitle: 'Limitless Imagination, One-of-a-Kind Pieces',
      items: [
        'Custom Architectural Millwork',
        'Wall Paneling',
        'Tailored Statement Pieces',
      ],
      imageTag: 'Custom bespoke furniture artisan detailing',
      highlight: true,
    },
  ],

  milestones: [
    {
      year: '2020',
      title: 'Studio Founded',
      description:
        'Founded in Chattogram by Managing Director Abul Kalam Bhuiyan with a vision for uncompromising bespoke artistry.',
    },
    {
      year: '2021',
      title: 'Agrabad Showroom Launch',
      description:
        'Inauguration of the expansive physical design showroom along Agrabad Access Road.',
    },
    {
      year: '2024–2025',
      title: "Int'l Furniture Fair Exhibition",
      description:
        'Exhibited showcase bespoke collections at the International Furniture Fair, Chattogram.',
    },
    {
      year: '2025',
      title: 'Chamber of Commerce',
      description:
        'Inducted as an esteemed member of the Chattogram Chamber of Commerce.',
    },
    {
      year: '2026',
      title: 'Nationwide BFIOA Recognition',
      description:
        'Honored with nationwide industry recognition by the Bangladesh Furniture Industry Owners Association (BFIOA).',
    },
  ],

  conversionCta: {
    badge: 'Start Your Commission',
    heading: 'Ready to Bring Lasting Elegance into Your Home?',
    description:
      'Book a complimentary consultation at our Agrabad showroom or connect directly with our design directors on WhatsApp.',
    primaryAction: 'Request a Quote',
    whatsappAction: 'Chat with Us on WhatsApp',
  },
}

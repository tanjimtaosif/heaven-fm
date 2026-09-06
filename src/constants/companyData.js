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
    primaryCta: 'Get Quote',
    secondaryCta: 'Explore Collections',
    secondaryCtaShort: 'Collections',
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
      media: 'sofa-cat',
      title: 'Living Room',
      subtitle: 'Sculptural Comfort & Social Elegance',
      items: ['Sofas', 'Coffee Tables', 'TV Units'],
      subcategories: [
        { id: 'sofas', name: 'Sofas' },
        { id: 'coffee-tables', name: 'Coffee Tables' },
        { id: 'tv-units', name: 'TV Units' },
      ],
      ctaLabel: 'Explore Living Room',
      imageTag: 'Living room bespoke luxury seating',
    },
    {
      id: 'bedroom',
      media: 'bed-cat',
      title: 'Bedroom',
      subtitle: 'Sanctuaries of Quiet Refinement',
      items: ['Beds', 'Wardrobes', 'Dressing Tables', 'Bedside Tables'],
      subcategories: [
        { id: 'beds', name: 'Beds' },
        { id: 'bedside-tables', name: 'Bedside Tables' },
        { id: 'dressing-tables', name: 'Dressing Tables' },
        { id: 'wardrobes', name: 'Wardrobes' },
      ],
      ctaLabel: 'Explore Bedroom',
      imageTag: 'Luxury bespoke bedroom suite',
    },
    {
      id: 'dining',
      media: 'dining-cat',
      title: 'Dining',
      subtitle: 'Feast in Architectural Splendor',
      items: ['Dining Tables', 'Cabinets & Showcases'],
      subcategories: [
        { id: 'dining-tables', name: 'Dining Tables' },
        { id: 'cabinets', name: 'Cabinets & Showcases' },
      ],
      ctaLabel: 'Explore Dining',
      imageTag: 'Bespoke dining table solid timber',
    },
    {
      id: 'office-study',
      media: 'office-cat',
      title: 'Office & Study',
      subtitle: 'Executive Stature & Ergonomics',
      items: [
        'Executive & Reception Desks',
        'Study Desks',
        'Office Chairs',
        'Workstations',
      ],
      subcategories: [
        { id: 'office-chairs', name: 'Office Chairs' },
        { id: 'executive-tables', name: 'Executive & Reception Desks' },
        { id: 'study-tables', name: 'Study Desks' },
        { id: 'workstations', name: 'Workstations' },
      ],
      ctaLabel: 'Explore Office & Study',
      imageTag: 'Executive bespoke study furniture',
    },
    {
      id: 'bespoke-commissions',
      media: 'video',
      title: 'Bespoke / Custom',
      subtitle: 'Limitless Imagination, One-of-a-Kind Pieces',
      note: 'Anything built to a customer’s own space, size, and taste.',
      items: [
        'Custom Spatial Sizing',
        'Handpicked Timber & Velvet',
        'Architectural Joinery',
      ],
      subcategories: [
        { id: 'spatial-sizing', name: 'Spatial Sizing' },
        { id: 'custom-finishes', name: 'Custom Finishes' },
        { id: 'architectural-joinery', name: 'Architectural Joinery' },
      ],
      ctaLabel: 'Commission a Custom Piece',
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

  whyChooseUs: [
    {
      id: 'designed-around-you',
      image: 'why-1',
      imageAlt:
        'A Heaven design consultant walking a client through material samples in the Agrabad showroom.',
      eyebrow: 'For Your Space',
      title: 'Designed Around You',
      points: [
        'Free design consultation',
        'Fully bespoke, built to your space',
      ],
    },
    {
      id: 'premium-craftsmanship',
      image: 'why-2',
      imageAlt:
        'Close detail of premium timber and upholstery on a finished Heaven piece.',
      eyebrow: 'For Lasting Quality',
      title: 'Premium Craftsmanship',
      points: ['Premium wood & materials', 'Skilled in-house craftsmanship'],
    },
    {
      id: 'hassle-free-service',
      image: 'why-3',
      imageAlt:
        'A Heaven team delivering and installing a finished commission in a client home.',
      eyebrow: 'For Complete Ease',
      title: 'Hassle-Free Service',
      points: ['Delivery & installation included', 'Easy payment options'],
    },
    {
      id: 'trusted-established',
      image: 'why-4',
      imageAlt:
        'The Heaven Furniture Mart showroom floor on Agrabad Access Road, Chattogram.',
      eyebrow: 'For Peace of Mind',
      title: 'Trusted & Established',
      points: [
        'Large showroom in Agrabad, Chattogram',
        'Trusted by hundreds of happy homeowners',
      ],
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

# Heaven Furniture Mart — Luxury Studio & Atelier Web Application

> **Designed. Crafted. Customized.**  
> Official web application for Chattogram's premier bespoke luxury furniture studio and interior styling atelier.

---

## 🏛️ Project Overview

**Heaven Furniture Mart** is an editorial, mobile-first web application designed and engineered for a luxury bespoke furniture studio based on Agrabad Access Road in Chattogram, Bangladesh.

Built with **React 19**, **React Router v7**, **Tailwind CSS v4**, and **Vite**, the application bridges high-touch artisanal woodworking with a modern digital storefront. It showcases curated custom furniture portfolios, highlights master joinery craftsmanship, provides an interactive 5-step bespoke quotation atelier with a custom luxury calendar picker, and streamlines client orders directly into private showroom consultations, multi-gateway checkout, and instant WhatsApp ordering.

---

## ✨ Key Features & Architectural Highlights

### 🛍️ Comprehensive Shop & Atelier Catalog (`/shop`)

- **Interactive Category Navigation (`CategoryBar`):** Horizontally scrollable category pills with real-time product count badges, active pill indicators, and subcategory filtering with smooth, hidden-scrollbar overflow navigation.
- **Multi-Facet Filtering & Live Search (`ShopFilterToolbar`):** Instant product search and filtering across categories (Living Room, Bedroom, Dining, Office & Study, Bespoke Commissions), stock availability (_In Stock_ vs _Made to Order_), and price ranges.
- **Flexible Sorting:** Sort furniture by featured status, price (low-to-high / high-to-low), and newest arrivals.
- **Product Lightbox Gallery Modal (`ProductDetailModal`):** High-resolution multi-angle photography gallery with shot selector thumbnails (3 distinct angles per item), timber species specifications, warranty coverage, artisan joinery details, and direct action triggers (_Add to Cart_ or _Order via WhatsApp_).
- **Inline Bespoke Commission Cards (`BespokeCalloutCard`):** Contextual studio callout cards woven directly into the product catalog grid inviting clients to commission custom dimensions and architectural layouts.
- **Responsive Breadcrumb Navigation:** Dynamic hierarchy links (_Home > Catalog > Category > Subcategory_) providing effortless navigation.

### 🛒 Persistent Cart Drawer & Multi-Gateway Checkout (`/checkout`)

- **Global Cart Management:** Global reactive state powered by React Context (`CartProvider`) with item quantity adjustments, custom order notes, and real-time total calculations in BDT (৳).
- **Slide-out Cart Drawer (`CartSidebar`):** Glassmorphism side drawer with smooth entry transitions, backdrop dismiss, and quick checkout shortcuts.
- **Floating Cart Trigger (`FloatingCartTrigger`):** Unobtrusive floating trigger badge on desktop and mobile with dynamic item counters.
- **Comprehensive Checkout Page (`CheckoutPage`):**
  - Itemized order review with product thumbnails, wood finishes, dimensions, quantities, and totals.
  - Delivery details collection with validation (Client Name, Phone, Delivery Address, Area, City, Landmark, Special Requests).
  - Multi-option payment method integration (`paymentMethods.js`):
    - **bKash Mobile Banking** (concierge confirmation via verified merchant number)
    - **SSLCommerz Multi-Gateway** (Visa, Mastercard, AMEX, Internet Banking, and Mobile Wallets)
    - **Visa Card** (debit / credit card payment links & POS slips)
    - **Mastercard** (debit / credit card payment links)
    - **Cash on Delivery (COD)** (white-glove delivery across Chattogram with booking deposit)
  - **WhatsApp Order Dispatcher (`whatsappOrder.js`):** Generates structured, elegant order receipts containing unique Order IDs (`HFM-ORD-XXXXXX`), customer info, delivery address, payment method, itemized list, and BDT totals for instant studio confirmation.

### 📋 5-Step Interactive Bespoke Quotation Wizard

- **Multi-Step Studio Flow (`QuotationModal`, `QuotationProvider`):**
  1. **Scope & Space (`ScopeStep`):** Select target spaces (Living Room, Bedroom, Dining, Office & Study, Full Residence / Architectural Project) and furniture pieces.
  2. **Timber & Finishing Specifications (`SpecsStep`):** Select premium seasoned wood species (Burma Teak, Chittagong Gamari, Sheesham, Mahogany, Red Oak), finish treatments (Natural Matte Oil, Semi-Gloss Satin, High-Gloss Piano Lacquer, Raw Brushed), approximate dimensions, and bespoke design briefs.
  3. **Showroom Appointment Scheduling (`AppointmentStep`):** Custom-engineered luxury date picker (`DatePickerField`) with interactive calendar flyout, month navigation, blackout past dates, and preferred time slot selection (Morning, Afternoon, Evening) for private showroom visits or virtual consultations.
  4. **Client Contact Details (`ContactStep`):** Full name, phone number, email address, and preferred consultation channel.
  5. **Review & Dispatch (`ReviewStep`):** Itemized atelier brief review with a direct 1-click trigger to dispatch the structured consultation brief to WhatsApp (`buildQuotationMessage.js`).
- **Inline Consultation Banner (`QuotationSection`):** Embedded invitation on the home page offering quick access to the consultation wizard.

### 🎬 Editorial Motion & Scroll Experiences

- **Scroll-Driven Video Reveal (`ScrollVideoRevealSection`):** Showcase promo film (`promo.mp4`) that peeks at the bottom of the hero section and smoothly expands via GPU-composited `clip-path: inset()` scroll interpolation with zero layout shift.
- **Hero Inline Showcase (`HeroInlineFilm`):** High-impact visual teaser capturing raw timber finishing and joinery techniques.
- **Lenis Smooth Inertia Scrolling (`SmoothScrollProvider`):** Integrated buttery-smooth inertia scrolling across all viewports with smart anchor jumping and scroll-to-top route resets.
- **Direction-Aware Floating Navbar (`Navbar`):** Intelligently retreats on downward scroll ($\Delta > 10\text{px}$) and seamlessly reappears on upward scroll ($\Delta < -10\text{px}$), with a mobile navigation drawer.
- **Global Atelier Lighting (`AtelierBackdrop`):** Ambient lighting and subtle architectural gradients providing warmth without visual distraction.

### 🏛️ Luxury Editorial Sections & UI Design System

- **Interactive Milestones Timeline (`MilestonesSection`):** Decade-spanning studio history (2020–2026: Studio Founded, Agrabad Showroom Launch, International Furniture Fair, Chamber of Commerce, Nationwide BFIOA Recognition) with interactive cursor-tracking image previews on desktop and responsive cards on mobile.
- **Dual-Mode Testimonials Explorer (`TestimonialsSection`):** Client review carousel featuring category filter tabs (All, Living Room, Bedroom, Dining, Commercial/Office), auto-advancing review cards with animated progress timer bars, verified buyer badges, and Google Review trust ratings.
- **Why Choose Us (`WhyChooseUsSection`):** Four core craftsmanship pillars (Finest Seasoned Woods, Lifetime Structural Guarantee, Custom Tailored to Your Space, White-Glove Chattogram Delivery) with interactive hover cards.
- **Interactive FAQ Accordion (`FaqSection`):** Studio questions and answers organized with category filtering covering custom commissioning, timber sourcing, delivery logistics, and showroom visits.
- **Luxury Button Design System (`Button.jsx`):** Multi-variant button system (`primary`, `brass`, `outline`, `whatsapp`, `ghost`) supporting staggered letter cascades, full-phrase text rolls, metallic shimmer sweeps, brass glow effects, and directional hover arrows.
- **Custom Luxury Form Fields (`Field.jsx`, `fieldStyles.js`):** Unified inputs, selects, textareas, and floating labels tailored to the studio palette.
- **Minimal Luxury Scrollbars (`src/styles/custom.css`):** Slim 6px brass-tinted scrollbars for WebKit and Firefox, paired with utility classes (`no-scrollbar`, `scrollbar-none`) for clean, uncluttered horizontal scrolling.

---

## 🛠️ Technology Stack

| Category              | Technology                                   | Version              | Purpose                                                                |
| :-------------------- | :------------------------------------------- | :------------------- | :--------------------------------------------------------------------- |
| **UI Library**        | [React](https://react.dev/)                  | `^19.2.8`            | Declarative component UI engine with modern React 19 hooks             |
| **Routing**           | [React Router](https://reactrouter.com/)     | `^7.18.3`            | Client-side routing with code-splitting (`createBrowserRouter`)        |
| **Tooling & Bundler** | [Vite](https://vite.dev/)                    | `^8.2.2`             | Lightning-fast development server & optimized production rollup builds |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)     | `^4.3.3`             | Modern CSS-first `@theme` design tokens and atomic utility styling     |
| **Vite Plugin**       | `@tailwindcss/vite`                          | `^4.3.3`             | First-party Vite integration for Tailwind v4                           |
| **Smooth Scroll**     | [Lenis](https://lenis.darkroom.engineering/) | `^1.3.26`            | High-performance smooth inertia scrolling                              |
| **Icons**             | [Lucide React](https://lucide.dev/)          | `^1.40.0`            | Minimalist editorial icons                                             |
| **Class Utilities**   | `clsx` & `tailwind-merge`                    | `^2.1.1` / `^3.6.0`  | Conflict-free dynamic Tailwind class composition                       |
| **Code Quality**      | ESLint 9+ Flat Config & Prettier             | `^10.9.0` / `^3.9.6` | Automated linting, code formatting, and Tailwind class sorting         |

---

## 📁 Architecture & Directory Structure

```
heaven-fm/
├── index.html                     # Entry HTML with Open Graph meta, preconnects & Google Fonts
├── jsconfig.json                  # Path aliases (@/*) & IDE IntelliSense
├── vite.config.js                 # Vite build configuration with Tailwind & path aliases
├── package.json                   # Dependencies, scripts & engine requirements
├── eslint.config.js               # ESLint 9 flat configuration (React Hooks, React Refresh)
├── .prettierrc                    # Prettier formatting rules & Tailwind sorting plugin
├── vercel.json                    # Single-page application rewrite rules for Vercel
├── .env.example                   # Template environment variables
├── company-details.pdf            # Brand master reference document
├── public/
│   └── favicon.svg                # Monogram SVG browser icon
└── src/
    ├── assets/
    │   ├── category/              # Category imagery (sofas, beds, dining, office)
    │   ├── logo/                  # Brand SVG vector logos
    │   ├── milestones/            # Historical timeline milestone images
    │   ├── payment-mathod/        # Payment gateway badges (bKash, Visa, Mastercard, SSLCommerz)
    │   ├── products/              # High-resolution product photography (3 angles per product)
    │   ├── promo/                 # Showcase promo video asset (promo.mp4)
    │   ├── reviews/               # Verified client commission photography
    │   ├── sale/                  # Promotional banners & badges
    │   └── whychooseus/           # Atelier craft photography
    ├── components/
    │   ├── layout/                # Navbar (scroll-detecting), Footer, AtelierBackdrop
    │   ├── providers/             # SmoothScrollProvider (Lenis integration)
    │   └── ui/                    # Core UI primitives (Button, Card, Badge, Marquee, Field, DatePickerField)
    ├── config/
    │   └── site.js                # Global atelier metadata, contact info & nav links
    ├── constants/
    │   ├── companyData.js         # Company heritage, showroom locations, milestones, contact info
    │   ├── productsData.js        # Catalog items, categories, timber specs, dimensions & pricing
    │   ├── quotationData.js       # Options, steps, wood species & finishes for custom quotes
    │   ├── reviewsData.js         # Client testimonials, ratings, and press quotes
    │   └── faq.js                 # Studio FAQ questions & answers
    ├── context/                   # Global context declarations
    ├── features/
    │   ├── cart/                  # Cart drawer, global CartProvider, floating trigger
    │   ├── home/                  # Home sections (Hero, ScrollReveal, Milestones, Testimonials, FAQ, etc.)
    │   ├── quotation/             # Bespoke 5-step quotation wizard modal, fields, and message builders
    │   └── shop/                  # Product catalog, CategoryBar, filter toolbar, detail modal, cards
    ├── hooks/                     # Custom reusable hooks (useMediaQuery, useIsDesktop, etc.)
    ├── layouts/                   # MainLayout with persistent Navbar, Footer, Drawers, and scroll monitors
    ├── pages/
    │   ├── Home/                  # Editorial studio landing page
    │   ├── Shop/                  # Filterable furniture collection page
    │   ├── Checkout/              # Multi-channel bespoke checkout page with payment options
    │   └── NotFound/              # Branded 404 error page
    ├── routes/
    │   └── AppRoutes.jsx          # Route hierarchy with lazy-loaded Suspense boundaries
    ├── styles/
    │   └── custom.css             # Minimal luxury scrollbars & scrollbar-hiding utilities
    ├── utils/
    │   ├── cn.js                  # Tailwind class merging utility (clsx + twMerge)
    │   └── whatsappOrder.js       # WhatsApp order URL formatters and message encoders
    ├── App.jsx                    # Top-level application providers composition
    ├── index.css                  # Master Tailwind v4 CSS tokens, keyframes & base layers
    └── main.jsx                   # React DOM createRoot entry point
```

---

## 🎨 Design System & Color Tokens

Brand tokens are declared using CSS-first `@theme` variables in [`src/index.css`](src/index.css):

| Category          | Token / Utility           | Value                                    | Usage                                                    |
| :---------------- | :------------------------ | :--------------------------------------- | :------------------------------------------------------- |
| **Typography**    | `font-serif`              | _Playfair Display_, _Cormorant Garamond_ | Editorial headings, section titles & hero typography     |
|                   | `font-sans`               | _Plus Jakarta Sans_                      | High-legibility UI body, spec cards, form fields         |
|                   | `font-mono`               | _ui-monospace_, _Menlo_, _Consolas_      | Product SKUs, order reference IDs & dimensions           |
| **Canvas**        | `bg-canvas`               | `#faf8f5`                                | Warm-sand, non-glare editorial background                |
| **Deep Charcoal** | `bg-charcoal-deep`        | `#0f1e21`                                | High-contrast luxury charcoal for dark sections & footer |
|                   | `bg-charcoal-surface`     | `#172c30`                                | Elevated dark cards and contrast accents                 |
|                   | `bg-charcoal-muted`       | `#243e44`                                | Secondary dark containers and pill backgrounds           |
| **Satin Brass**   | `text-brass` / `bg-brass` | `#c49f66`                                | Metallic accent for badges, rules, buttons & focus rings |
|                   | `text-brass-dark`         | `#8f6f3e`                                | High-contrast brass for active text on light canvas      |
|                   | `bg-brass-light`          | `#f8f3ea`                                | Subtle brass-tinted pill and container backgrounds       |
| **Warm Wood**     | `text-wood-walnut`        | `#7e5b3e`                                | Timber heritage accent representing fine wood joinery    |
|                   | `text-wood-tan`           | `#c8a882`                                | Subtle wood grain and card accents                       |
| **Surfaces**      | `bg-surface`              | `#ffffff`                                | Elevated cards, dialogs, drawers & popovers              |
|                   | `border-border-subtle`    | `#ece4d9`                                | Delicate hairline borders                                |
|                   | `border-border-warm`      | `#dfd3c3`                                | Defined borders for cards and form controls              |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 18.0.0` (LTS recommended)
- **npm**: `>= 9.0.0`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tanjimtaosif/heaven-fm.git
cd heaven-fm

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables
cp .env.example .env
```

### Development Server

Start the Vite development server with instant Hot Module Replacement:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available NPM Scripts

| Command             | Action                               | Description                                                          |
| :------------------ | :----------------------------------- | :------------------------------------------------------------------- |
| `npm run dev`       | `vite`                               | Starts local dev server with lightning-fast HMR                      |
| `npm run build`     | `vite build`                         | Compiles and optimizes assets into `dist/` for production            |
| `npm run preview`   | `vite preview`                       | Locally serves production build to verify behavior & performance     |
| `npm run lint`      | `eslint .`                           | Runs ESLint to check for syntax, quality, or React hooks rule issues |
| `npm run lint:fix`  | `eslint . --fix`                     | Automatically fixes autofixable lint issues                          |
| `npm run format`    | `prettier --write .`                 | Formats all code files with Prettier & sorts Tailwind classes        |
| `npm run precommit` | `npm run lint:fix && npm run format` | Runs formatting and lint verification before commits                 |

---

## 🌐 Deployment & Hosting

### Deploying to Vercel

The project is pre-configured for seamless zero-config deployment on [Vercel](https://vercel.com/):

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install`
4. **SPA Fallback Routing:** The repository includes [`vercel.json`](vercel.json) with client-side rewrite rules to ensure routes like `/shop` and `/checkout` reload properly:
   ```json
   {
     "rewrites": [
       { "source": "/((?!assets/).*)", "destination": "/index.html" }
     ]
   }
   ```

---

## 📞 Studio & Showroom Information

- **Brand:** Heaven Furniture Mart
- **Tagline:** Designed. Crafted. Customized.
- **Showroom Address:** Agrabad Access Road, Chattogram, Bangladesh
- **Managing Director:** Abul Kalam Bhuiyan
- **Hotline / Telephone:** [+880 1960-481983](tel:+8801960481983)
- **Email:** [heavenfurnituremart@gmail.com](mailto:heavenfurnituremart@gmail.com)
- **Direct WhatsApp:** [Chat with Atelier](https://wa.me/8801960481983)
- **Facebook:** [Heaven Furniture Mart](https://facebook.com/HeavenFurnitureMart)
- **Instagram:** [@heaven_furniture_ltd](https://instagram.com/heaven_furniture_ltd)
- **YouTube:** [@HeavenFurnitureMart](https://youtube.com/@HeavenFurnitureMart)

# Heaven Furniture Mart — Luxury Studio & Atelier Web Application

> **Designed. Crafted. Customized.**  
> Official web application for Chattogram's premier bespoke luxury furniture studio and interior styling atelier.

---

## 🏛️ Project Overview

**Heaven Furniture Mart** is an editorial, mobile-first web application designed and engineered for a luxury bespoke furniture studio based on Agrabad Access Road in Chattogram, Bangladesh.

Built with **React 19**, **React Router v7**, **Tailwind CSS v4**, and **Vite**, the application bridges high-touch artisanal woodworking with a modern digital storefront. It showcases curated custom furniture portfolios, highlights master joinery craftsmanship, provides an interactive multi-step bespoke quotation atelier, and streamlines client orders directly into private showroom consultations, multi-option checkout, and instant WhatsApp ordering.

---

## ✨ Key Features & Architectural Highlights

### 🛍️ Comprehensive Shop & Atelier Catalog (`/shop`)

- **Multi-Facet Filtering:** Filter furniture by category (Living, Dining, Bedroom, Executive Office, Bespoke Suites), price ranges, and wood species (Burma Teak, Chittagong Gamari, Sheesham, Mahogany, Red Oak).
- **Live Search & Sorting:** Instant product filtering and sorting by featured status, price, and newest arrivals.
- **Product Detail Modal:** Rich lightbox modal detailing timber specifications, warranty coverage, artisan joinery details, high-resolution imagery, and direct action triggers (_Add to Cart_ or _Order via WhatsApp_).
- **Bespoke Commission Callouts:** Contextual cards encouraging custom dimension requests for unique architectural layouts.

### 🛒 Persistent Cart Drawer & Seamless Checkout (`/checkout`)

- **Global Cart Management:** Global state powered by React Context (`CartProvider`) with item quantity adjustments, custom order notes, and real-time total calculations in BDT (৳).
- **Slide-out Cart Drawer:** Glassmorphism side drawer with smooth entry animations and quick checkout shortcuts.
- **Floating Cart Trigger:** Unobtrusive floating trigger badge on desktop and mobile with live item counts.
- **Bespoke Checkout Page:**
  - Order review with breakdown of product items, quantities, and totals.
  - Delivery details collection (Customer Name, Phone, Delivery Address, City, Special Instructions).
  - Flexible Payment Method selection (Cash on Delivery, Bank Wire Transfer, bKash, Nagad).
  - WhatsApp Order Generator (`whatsappOrder.js`) formatting structured, clean order receipts for instant atelier confirmation.

### 📋 Interactive Bespoke Quotation Wizard

- **Multi-Step Studio Flow:** Step-by-step custom furniture quotation modal (`QuotationModal`, `QuotationProvider`):
  1. Room & Space Selection (Living, Dining, Bedroom, Office, Full Home).
  2. Wood Species & Finishing Preferences (Solid Teak, Gamari, Lacquer, Natural Oil).
  3. Dimension Estimates & Reference Upload / Note Specification.
  4. Private Showroom Appointment Booking & Contact Details.
- Pre-fills a tailored consultation brief sent directly to the studio's team.

### 🎬 Scroll-Driven Video Reveal & Editorial Motion

- **Scroll-Driven Video Reveal:** Dynamic showroom promo film (`promo.mp4`) that peeks at the bottom of the hero section and expands smoothly via GPU-composited `clip-path: inset()` scroll animations with zero layout shift.
- **Hero Inline Showcase:** High-impact visual teaser capturing raw timber finishing and joinery techniques.
- **Lenis Smooth Scrolling:** Integrated buttery-smooth inertia scrolling wrapped via `SmoothScrollProvider`.
- **Direction-Aware Floating Navbar:** Automatically retreats on downward scroll ($\Delta > 10\text{px}$) and reappears on upward scroll ($\Delta < -10\text{px}$).

### ✨ Luxury Component Design System

- **Button System:** Multi-variant buttons (`primary`, `brass`, `outline`, `whatsapp`, `ghost`) supporting staggered letter-cascade animations, full-phrase text rolling effects, subtle shimmer sweeps, and directional hover arrows.
- **Infinite Marquee:** Continuous brand ticker highlighting core studio pillars with edge gradient masks.
- **Milestones & Why Choose Us:** Interactive hover cards exhibiting decades of woodworking heritage, master joiners, lifetime structural guarantees, and premium imported finishes.
- **Interactive FAQ Accordion:** Comprehensive answers covering custom orders, showroom visits, timber sourcing, and nationwide delivery.

---

## 🛠️ Technology Stack

| Category              | Technology                                   | Version              | Purpose                                                                |
| :-------------------- | :------------------------------------------- | :------------------- | :--------------------------------------------------------------------- |
| **UI Library**        | [React](https://react.dev/)                  | `^19.2.8`            | Declarative component UI engine with modern hooks                      |
| **Routing**           | [React Router](https://reactrouter.com/)     | `^7.18.3`            | Client-side routing with code-splitting (`createBrowserRouter`)        |
| **Tooling & Bundler** | [Vite](https://vite.dev/)                    | `^8.2.2`             | Lightning-fast development server & optimized rollup production builds |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)     | `^4.3.3`             | Modern CSS-first `@theme` design tokens and atomic utility styling     |
| **Smooth Scroll**     | [Lenis](https://lenis.darkroom.engineering/) | `^1.3.26`            | High-performance smooth inertia scrolling                              |
| **Icons**             | [Lucide React](https://lucide.dev/)          | `^1.40.0`            | Minimalist editorial icons                                             |
| **Class Utilities**   | `clsx` & `tailwind-merge`                    | `^2.1.1` / `^3.6.0`  | Conflict-free dynamic Tailwind class composition                       |
| **Code Quality**      | ESLint 9+ Flat Config & Prettier             | `^10.9.0` / `^3.9.6` | Automated linting, code formatting, and Tailwind class sorting         |

---

## 📁 Architecture & Directory Structure

```
heaven-fm/
├── index.html                     # Entry HTML with Open Graph, preconnects & Google Fonts
├── jsconfig.json                  # Path aliases (@/*) & IDE IntelliSense
├── vite.config.js                 # Vite build setup with Tailwind & path aliases
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
    │   ├── logo/                  # Brand SVG vector logos
    │   └── promo/                 # Showcase video assets (promo.mp4)
    ├── components/
    │   ├── layout/                # Global Navbar (scroll-detecting), Footer
    │   ├── providers/             # SmoothScrollProvider (Lenis integration)
    │   └── ui/                    # Core UI primitives (Button, Card, Badge, Marquee, Field)
    ├── config/
    │   └── site.js                # Global atelier metadata, contact info & nav links
    ├── constants/
    │   ├── companyData.js         # Company heritage, showroom locations, contact channels
    │   ├── productsData.js        # Catalog items, categories, timber specs & pricing
    │   ├── quotationData.js       # Options & configurations for custom quotes
    │   ├── reviewsData.js         # Client testimonials and press quotes
    │   └── faq.js                 # Studio FAQ questions & answers
    ├── context/                   # Global context declarations
    ├── features/
    │   ├── cart/                  # Cart sidebar, state provider, floating trigger
    │   ├── home/                  # Landing sections (Hero, ScrollReveal, Milestones, FAQ, etc.)
    │   ├── quotation/             # Bespoke quotation wizard modal & multi-step form
    │   └── shop/                  # Product catalog, filter toolbar, detail modal, cards
    ├── hooks/                     # Custom reusable hooks (useMediaQuery, etc.)
    ├── layouts/                   # MainLayout with persistent Navbar, Footer, Drawers
    ├── pages/
    │   ├── Home/                  # Editorial studio landing page
    │   ├── Shop/                  # Filterable furniture collection page
    │   ├── Checkout/              # Multi-channel bespoke checkout page
    │   └── NotFound/              # Branded 404 error page
    ├── routes/
    │   └── AppRoutes.jsx          # Route hierarchy with lazy-loaded Suspense boundaries
    ├── utils/
    │   ├── cn.js                  # Tailwind class merging utility (clsx + twMerge)
    │   └── whatsappOrder.js       # WhatsApp URL formatters and message encoders
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
| **Canvas**        | `bg-canvas`               | `#faf8f5`                                | Warm-sand, non-glare editorial background                |
| **Deep Charcoal** | `bg-charcoal-deep`        | `#0f1e21`                                | High-contrast luxury charcoal for dark sections          |
|                   | `bg-charcoal-surface`     | `#172c30`                                | Elevated dark cards, footer, and contrast accents        |
| **Satin Brass**   | `text-brass` / `bg-brass` | `#c49f66`                                | Metallic accent for badges, rules, buttons & focus rings |
| **Warm Wood**     | `text-wood-walnut`        | `#7e5b3e`                                | Timber heritage accent representing fine wood joinery    |
| **Surfaces**      | `bg-surface`              | `#ffffff`                                | Elevated cards, dialogs, drawers & popovers              |
|                   | `border-border-subtle`    | `#ece4d9`                                | Delicate hairline borders                                |

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
- **Showroom Address:** Agrabad Access Road, Chattogram, Bangladesh
- **Managing Director:** Abul Kalam Bhuiyan
- **Hotline / Telephone:** [+880 1960-481983](tel:+8801960481983)
- **Email:** [heavenfurnituremart@gmail.com](mailto:heavenfurnituremart@gmail.com)
- **Direct WhatsApp:** [Chat with Atelier](https://wa.me/8801960481983)
- **Facebook:** [Heaven Furniture Mart](https://facebook.com/HeavenFurnitureMart)
- **Instagram:** [@heaven_furniture_ltd](https://instagram.com/heaven_furniture_ltd)

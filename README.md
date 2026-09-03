# Heaven Furniture Mart — Studio Web Application

> **Designed. Crafted. Customized.**  
> Official web application for Chattogram's premier bespoke luxury furniture studio and interior styling atelier.

---

## 🏛️ Project Overview

**Heaven Furniture Mart** is an editorial, mobile-first web application crafted for a luxury bespoke furniture studio based on Agrabad Access Road in Chattogram, Bangladesh. Built with **React 19**, **Tailwind CSS v4**, and **Vite**, the application showcases curated custom furniture portfolios, highlights master joinery craftsmanship, and guides high-intent clients directly into private showroom consultations and WhatsApp discussions.

---

## ✨ Key Features & Architectural Highlights

- **🎥 Scroll-Driven Video Reveal:**
  - Dynamic showroom promo video (`promo.mp4`) that peeks at the bottom of the initial hero viewport.
  - Smooth GPU-composited `clip-path: inset()` animation driven by scroll position with zero layout shift and no black flicker.
- **🧭 Direction-Aware Floating Navbar:**
  - Automatically translates upward and fades out on downward scroll ($\Delta > 10\text{px}$).
  - Reappears immediately on any upward scroll ($\Delta < -10\text{px}$).
  - Integrated with slide-out cart drawer, mobile navigation sheet, and consultation triggers.
- **✨ Luxury Component Micro-Interactions:**
  - **Button System:** Multi-variant buttons (`primary`, `brass`, `outline`, `whatsapp`) supporting staggered letter-cascade and full-phrase text rolling effects, shimmer light sweeps, and arrow hover slides.
  - **Infinite Marquee:** Continuous ticker component powered by Tailwind CSS masking for seamless edge fading.
  - **Modular Cards & Badges:** Subtle borders, warm hover elevations, and brass corner accents tailored to luxury aesthetics.
- **📱 High-Intent Conversion Channels:**
  - One-click prefilled WhatsApp consultation booking links.
  - Direct telephone links and interactive showroom consultation modal.
- **⚡ Performance & Clean Architecture:**
  - Sub-second Vite HMR and production bundle optimization.
  - Pure CSS design tokens leveraging Tailwind CSS v4's CSS-first `@theme` directives.

---

## 🛠️ Technology Stack

| Category                 | Technology                               | Version / Specification                         |
| :----------------------- | :--------------------------------------- | :---------------------------------------------- |
| **Framework**            | [React](https://react.dev/)              | `^19.2.8`                                       |
| **Bundler / Tooling**    | [Vite](https://vite.dev/)                | `^8.2.2`                                        |
| **Styling Engine**       | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` (CSS-first `@theme` tokens)            |
| **Icons**                | [Lucide React](https://lucide.dev/)      | `^1.40.0`                                       |
| **Class Utilities**      | `clsx` & `tailwind-merge`                | Conflict-free atomic utility composition        |
| **Linting & Formatting** | ESLint 9+ Flat Config & Prettier         | Automated code styling & Tailwind class sorting |

---

## 📁 Architecture & Directory Standards

```
heaven-fm/
├── index.html                    # Entry HTML with Open Graph & Google Fonts meta
├── jsconfig.json                 # Path aliases (@/*) & IDE IntelliSense
├── vite.config.js                # Vite build configuration with @ alias
├── package.json                  # Dependencies, tooling & npm scripts
├── eslint.config.js              # ESLint flat configuration (React Hooks, Refresh)
├── .prettierrc                   # Prettier rules & Tailwind plugin config
├── company-details.pdf           # Brand master reference document
├── public/
│   └── favicon.svg               # Brand monogram browser icon
└── src/
    ├── assets/
    │   ├── logo/                 # Official Heaven Furniture Mart vector logo
    │   └── promo/                # Compressed showcase video (promo.mp4)
    ├── components/
    │   ├── layout/               # Layout chrome (Navbar with scroll detection, Footer)
    │   ├── sections/             # Page sections (Hero, ScrollVideoReveal, Manifesto, Collections, Contact)
    │   └── ui/                   # Atomic UI primitives (Button, Card, Badge, Marquee)
    ├── constants/
    │   └── companyData.js        # Single Source of Truth for company info, portfolios & CTAs
    ├── lib/
    │   └── utils.js              # Shared utility helpers (cn helper)
    ├── App.jsx                   # Root application layout composition
    ├── index.css                 # Master Tailwind v4 design tokens, custom keyframes & base layer
    └── main.jsx                  # React DOM entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 18.0.0` (LTS recommended)
- **npm**: `>= 9.0.0`

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd heaven-fm

# 2. Install dependencies
npm install
```

### Available Scripts

| Command             | Description                                                                    |
| :------------------ | :----------------------------------------------------------------------------- |
| `npm run dev`       | Starts the Vite development server with instant HMR at `http://localhost:5173` |
| `npm run build`     | Compiles and optimizes assets into `dist/` for production deployment           |
| `npm run preview`   | Serves the production build locally to inspect performance and behavior        |
| `npm run lint`      | Runs ESLint to check for syntax, quality, or React hooks rule issues           |
| `npm run lint:fix`  | Automatically fixes autofixable lint issues                                    |
| `npm run format`    | Runs Prettier across all project files to ensure consistent style              |
| `npm run precommit` | Combined check (`lint:fix` + `format`) before committing code                  |

---

## 🎨 Design System & Color Tokens

Brand design tokens are declared using CSS-first `@theme` variables in [`src/index.css`](src/index.css):

| Category          | Token / Class                         | Value / Purpose                                               |
| :---------------- | :------------------------------------ | :------------------------------------------------------------ |
| **Typography**    | `font-serif`                          | _Playfair Display_, _Cormorant Garamond_ (editorial headings) |
|                   | `font-sans`                           | _Plus Jakarta Sans_ (refined, highly legible UI body)         |
| **Brand Canvas**  | `bg-canvas` (`#faf8f5`)               | Warm-sand, non-glare editorial background                     |
| **Deep Charcoal** | `bg-charcoal-deep` (`#0f1e21`)        | Primary high-contrast luxury charcoal                         |
|                   | `bg-charcoal-surface` (`#172c30`)     | Elevated dark surfaces & interactive cards                    |
| **Satin Brass**   | `text-brass` / `bg-brass` (`#c49f66`) | Atelier metallic accent for badges, rules & focus states      |
| **Warm Wood**     | `text-wood-walnut` (`#7e5b3e`)        | Rich walnut tone communicating timber joinery heritage        |
| **Surfaces**      | `bg-surface` (`#ffffff`)              | Pristine surface for cards and floating sheets                |
|                   | `border-border-subtle` (`#ece4d9`)    | Hairline dividing borders                                     |

---

## 📞 Studio & Showroom Information

- **Brand:** Heaven Furniture Mart
- **Showroom Address:** Agrabad Access Road, Chattogram, Bangladesh
- **Managing Director:** Abul Kalam Bhuiyan
- **Phone / Hotline:** [+880 1960-481983](tel:+8801960481983)
- **Email:** [heavenfurnituremart@gmail.com](mailto:heavenfurnituremart@gmail.com)
- **WhatsApp:** [Direct Atelier Chat](https://wa.me/8801960481983)

# Sports Activities Amman - Next.js Website

Eine moderne, responsive Website für Sport-Aktivitäten in Amman, Jordanien. Gebaut mit **Next.js 15**, **TypeScript**, **Tailwind CSS** und **shadcn/ui**.

## 🎯 Features

- ⚡ **Next.js 15** mit App Router
- 🎨 **Tailwind CSS** für modernes Styling
- 🧩 **shadcn/ui** Komponenten (Card, Button, Badge)
- 📱 **Fully Responsive** Design (Mobile-First)
- ♿ **Accessibility** optimiert
- 🔍 **SEO-optimiert** mit Next.js Metadata API
- 🖼️ **Next.js Image** Optimierung
- ⚡ **TypeScript** für Type Safety
- 🎭 **Smooth Animations** mit Tailwind CSS

## 🏗️ Projektstruktur

```
nextjs-app/
├── app/
│   ├── layout.tsx          # Root Layout mit Metadata
│   ├── page.tsx            # Hauptseite
│   └── globals.css         # Globale Styles & CSS Variables
├── components/
│   ├── ui/                 # shadcn/ui Komponenten
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── header.tsx          # Navigation Header
│   ├── hero.tsx            # Hero Section
│   ├── sports-section.tsx  # Sports Grid
│   ├── sports-card.tsx     # Individual Sport Card
│   ├── private-lessons.tsx # Private Lessons Section
│   ├── about.tsx           # About Section
│   ├── location.tsx        # Location Section
│   ├── contact.tsx         # Contact Section
│   └── footer.tsx          # Footer
├── lib/
│   └── utils.ts            # Utility Functions (cn)
├── public/
│   └── images/             # Alle Sport-Bilder & Logo
├── tailwind.config.ts      # Tailwind Konfiguration
├── tsconfig.json           # TypeScript Konfiguration
├── next.config.ts          # Next.js Konfiguration
└── components.json         # shadcn/ui Konfiguration
```

## 🚀 Installation & Start

### Voraussetzungen

- Node.js 18+ installiert
- npm oder yarn

### Schritt 1: Dependencies installieren

```bash
npm install
# oder
yarn install
```

### Schritt 2: Development Server starten

```bash
npm run dev
# oder
yarn dev
```

Die Website ist dann verfügbar unter [http://localhost:3000](http://localhost:3000)

### Schritt 3: Production Build

```bash
npm run build
npm run start
# oder
yarn build
yarn start
```

## 🎨 Styling & Design System

### Farben

Das Projekt verwendet ein benutzerdefiniertes Farbschema:

```typescript
colors: {
  primary: {
    navy: '#2C4A6E',
    blue: '#4A7BA7',
  },
  accent: {
    orange: '#E67E22',
  },
  'light-blue': '#5B8FC4',
  'dark-navy': '#1E3A5F',
}
```

### Komponenten

Alle UI-Komponenten basieren auf **shadcn/ui** und sind vollständig anpassbar:

- **Button**: Multiple Varianten (default, outline, ghost, link)
- **Card**: Für Sport-Aktivitäten mit Header, Content, Footer
- **Badge**: Für Tags (Indoor, Outdoor, Group, etc.)

### Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices (Tablets) */
lg: 1024px  /* Large devices (Laptops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2XL devices */
```

## 📦 Verwendete Technologien

### Core
- [Next.js 15](https://nextjs.org/) - React Framework
- [React 19](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable Components
- [Radix UI](https://www.radix-ui.com/) - Primitive Components
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animations

### Utilities
- [class-variance-authority](https://cva.style/) - Component Variants
- [clsx](https://github.com/lukeed/clsx) - Classname Utility
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind Classes

## 🔧 Konfiguration

### Tailwind CSS

Die Tailwind-Konfiguration in `tailwind.config.ts` enthält:
- Custom Farben basierend auf dem Original-Design
- shadcn/ui Integration mit CSS Variables
- Animation Plugin

### Next.js

Die Next.js-Konfiguration ist minimal und kann in `next.config.ts` erweitert werden für:
- Image Optimization Settings
- Custom Headers
- Redirects
- Environment Variables

## 📝 Komponenten Übersicht

### Header Component
- Sticky Navigation
- Smooth Scroll zu Sections
- Logo mit Next.js Image Optimization
- Responsive Mobile Navigation

### Sports Section
- Grid Layout (1/2/3 Spalten responsive)
- shadcn/ui Cards
- Hover-Effekte mit Skalierung
- Next.js optimierte Bilder

### Private Lessons Section
- Gradient Background
- Feature Grid
- Call-to-Action Button

### Contact Section
- Clickable Contact Methods (Phone, Email, WhatsApp)
- Hover-Effekte
- Responsive Grid Layout

## 🌐 SEO & Metadata

Die Website ist vollständig SEO-optimiert mit:

```typescript
- title & description
- Open Graph Tags (Facebook, LinkedIn)
- Twitter Card Meta Tags
- Geo Tags (Amman, Jordan)
- Structured Data (JSON-LD)
- Canonical URLs
```

## 🎯 Performance

- **Next.js Image** Optimization für alle Bilder
- **Server Components** für bessere Performance
- **CSS-in-JS** vermieden (Pure Tailwind)
- **Tree Shaking** durch ES Modules
- **Code Splitting** automatisch durch Next.js

## 📱 Browser Support

- Chrome (neueste 2 Versionen)
- Firefox (neueste 2 Versionen)
- Safari (neueste 2 Versionen)
- Edge (neueste 2 Versionen)

## 🚢 Deployment

### Vercel (Empfohlen)

```bash
# Vercel CLI installieren
npm i -g vercel

# Deployen
vercel
```

### Andere Plattformen

Das Projekt kann auf jeder Plattform deployed werden, die Next.js unterstützt:
- Netlify
- Railway
- Render
- AWS Amplify
- Digital Ocean

## 📄 Lizenz

Dieses Projekt ist für Sport Activities Amman erstellt.

## 🤝 Kontakt

- Email: info@sport-amman.com
- Phone: +962787497945
- WhatsApp: [Message](https://wa.me/962787497945)

---

**Gebaut mit ❤️ in Amman, Jordan** 🇯🇴

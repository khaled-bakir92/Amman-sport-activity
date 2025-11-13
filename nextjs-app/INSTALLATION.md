# Installation Guide

## 🚀 Quick Start

Diese Anleitung führt dich durch die Installation und das Setup des Projekts.

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass folgendes installiert ist:

- **Node.js** Version 18.x oder höher
  ```bash
  node --version  # Sollte v18.x.x oder höher anzeigen
  ```

- **npm** (kommt mit Node.js) oder **yarn**
  ```bash
  npm --version   # Sollte 9.x.x oder höher anzeigen
  ```

## Installation

### 1. Dependencies installieren

Navigiere zum Projektverzeichnis und installiere alle Dependencies:

```bash
npm install
```

Falls npm Cache Probleme auftreten:

```bash
# Cache leeren
npm cache clean --force

# Oder mit yarn
yarn install
```

### 2. Umgebungsvariablen (Optional)

Erstelle eine `.env.local` Datei im Root-Verzeichnis, falls du Umgebungsvariablen benötigst:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.sportsactivitiesamman.com
```

### 3. Development Server starten

```bash
npm run dev
```

Die Website ist nun verfügbar unter:
- **Local**: http://localhost:3000
- **Network**: http://192.168.x.x:3000 (für Zugriff von anderen Geräten)

### 4. Production Build (Optional)

Um einen Production Build zu erstellen:

```bash
# Build erstellen
npm run build

# Production Server starten
npm run start
```

## 📁 Projektstruktur Verstehen

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout (mit SEO Metadata)
│   ├── page.tsx           # Homepage
│   └── globals.css        # Globale Styles
│
├── components/            # React Komponenten
│   ├── ui/               # shadcn/ui Komponenten
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   └── ...               # Feature Komponenten
│
├── lib/                  # Utility Functions
│   └── utils.ts
│
├── public/               # Statische Assets
│   └── images/          # Alle Bilder
│
└── Config Files
    ├── tailwind.config.ts    # Tailwind Konfiguration
    ├── tsconfig.json         # TypeScript Konfiguration
    ├── next.config.ts        # Next.js Konfiguration
    └── package.json          # Dependencies
```

## 🔧 Troubleshooting

### Problem: npm install schlägt fehl

**Lösung 1**: Cache leeren und neu installieren
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Lösung 2**: Yarn verwenden
```bash
npm install -g yarn
yarn install
```

### Problem: Port 3000 bereits in Verwendung

**Lösung**: Anderen Port verwenden
```bash
PORT=3001 npm run dev
```

### Problem: TypeScript Errors

**Lösung**: TypeScript Dependencies neu installieren
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

### Problem: Bilder werden nicht angezeigt

**Lösung**: Prüfe ob die Bilder im `public/images/` Ordner sind
```bash
ls -la public/images/
```

## 🎨 Styling Anpassen

### Farben ändern

Öffne `tailwind.config.ts` und passe die Farben an:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        navy: '#2C4A6E',  // Deine Farbe hier
        blue: '#4A7BA7',
      },
      // ...
    },
  },
}
```

### CSS Variables ändern

Öffne `app/globals.css` für shadcn/ui Theming:

```css
:root {
  --primary: 209 61% 29%;  /* HSL Werte */
  --accent: 28 80% 52%;
  /* ... */
}
```

## 📦 Neue shadcn/ui Komponenten hinzufügen

Du kannst weitere shadcn/ui Komponenten manuell hinzufügen:

### 1. Komponente erstellen

Erstelle eine neue Datei in `components/ui/`, z.B. `dialog.tsx`

### 2. Dependencies installieren (falls nötig)

```bash
npm install @radix-ui/react-dialog
```

### 3. Code von shadcn/ui kopieren

Besuche [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog) und kopiere den Code.

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Vercel Account erstellen** auf [vercel.com](https://vercel.com)

2. **Repository verbinden**
   ```bash
   # Git Repository erstellen
   git init
   git add .
   git commit -m "Initial commit"

   # Zu GitHub pushen
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **In Vercel importieren**
   - Gehe zu Vercel Dashboard
   - "New Project" klicken
   - Repository auswählen
   - Deploy klicken

### Andere Plattformen

**Netlify**:
```bash
# Build Command
npm run build

# Publish Directory
.next
```

**Railway**:
```bash
# Startet automatisch mit package.json scripts
```

## 📱 Mobile Testing

Um die Website auf deinem Smartphone zu testen:

1. **Gleiche WiFi-Netzwerk**: Stelle sicher, dass dein Smartphone im gleichen Netzwerk ist

2. **Lokale IP finden**:
   ```bash
   # MacOS/Linux
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

3. **Auf Smartphone öffnen**:
   ```
   http://<deine-ip>:3000
   ```

## 🔍 Debugging

### Next.js Dev Tools

Öffne die Browser DevTools:
- **Chrome**: F12 oder Cmd+Option+I (Mac)
- **Firefox**: F12 oder Cmd+Option+I (Mac)

### Server Logs

Alle Logs erscheinen im Terminal wo `npm run dev` läuft.

### React Developer Tools

Installiere die Browser Extension:
- [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## ✅ Checkliste

Bevor du mit der Entwicklung beginnst:

- [ ] Node.js 18+ installiert
- [ ] Dependencies installiert (`npm install`)
- [ ] Dev Server läuft (`npm run dev`)
- [ ] Website öffnet sich auf `localhost:3000`
- [ ] Alle Bilder werden korrekt angezeigt
- [ ] Responsive Design funktioniert (Browser DevTools)
- [ ] Keine TypeScript Errors
- [ ] Keine Console Errors

## 📚 Weiterführende Links

- [Next.js Dokumentation](https://nextjs.org/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [shadcn/ui Dokumentation](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Hilfe benötigt?

Falls du auf Probleme stößt:

1. Prüfe die [Next.js Dokumentation](https://nextjs.org/docs)
2. Suche auf [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
3. Erstelle ein Issue im Repository

---

**Viel Erfolg! 🚀**

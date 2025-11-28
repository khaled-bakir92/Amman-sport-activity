# Sports Activities Amman - Next.js Full-Stack Website

Eine moderne, responsive Full-Stack-Website für Sport-Aktivitäten in Amman, Jordanien. Gebaut mit **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Prisma ORM** und **PostgreSQL**.

## 🎯 Features

- ⚡ **Next.js 15** mit App Router (Frontend + Backend)
- 🗄️ **PostgreSQL** Datenbank mit **Prisma ORM**
- 🔐 **NextAuth.js** Authentifizierung (Google OAuth)
- 👥 **Admin Panel** für User- und Match-Management
- 🎨 **Tailwind CSS** für modernes Styling
- 🧩 **shadcn/ui** Komponenten
- 📱 **Fully Responsive** Design (Mobile-First)
- 🎮 **Interaktive Buchungssysteme** für Fußball, Volleyball, Basketball, Kickboxing
- ⚽ **Visual Court/Pitch Selection** - Ähnlich wie Kinositzplätze
- ⭐ **Bewertungssystem** für Spieler
- ♿ **Accessibility** optimiert
- 🔍 **SEO-optimiert** mit Next.js Metadata API

## 🏗️ Architektur

```
┌─────────────────────────────────┐
│   Frontend (Next.js 15)         │
│   Port 3000                     │
│   - React Components            │
│   - Tailwind CSS UI             │
│   - Interactive Modals          │
└───────────┬─────────────────────┘
            │
            ↓
┌─────────────────────────────────┐
│   Backend (Next.js API Routes)  │
│   - NextAuth.js                 │
│   - Prisma ORM                  │
│   - API Endpoints               │
└───────────┬─────────────────────┘
            │
            ↓
┌─────────────────────────────────┐
│   PostgreSQL Datenbank          │
│   Port 5432                     │
│   - User, Match, Booking        │
│   - Session, Rating             │
└─────────────────────────────────┘
```

## 📋 Voraussetzungen

Bevor du startest, stelle sicher, dass Folgendes installiert ist:

- ✅ **Node.js 18+** ([Download](https://nodejs.org/))
- ✅ **PostgreSQL 14+** ([Download](https://www.postgresql.org/download/) oder `brew install postgresql@14`)
- ✅ **npm** oder **yarn**

## 🚀 Projekt starten - Schritt für Schritt

### Schritt 1: Dependencies installieren

```bash
npm install
```

### Schritt 2: PostgreSQL-Datenbank starten

**Prüfen ob PostgreSQL läuft:**
```bash
psql -U khaled -d postgres -c "SELECT version();"
```

**Falls PostgreSQL nicht läuft, starte es:**
```bash
# macOS mit Homebrew
brew services start postgresql@14

# Oder manuell
pg_ctl -D /usr/local/var/postgres start
```

**Datenbank erstellen (falls noch nicht vorhanden):**
```bash
createdb -U khaled dev.db
```

### Schritt 3: Umgebungsvariablen prüfen

Die `.env` und `.env.local` Dateien sollten bereits existieren:

**`.env`:**
```env
DATABASE_URL="postgresql://khaled@localhost:5432/dev.db"
DIRECT_URL="postgresql://khaled@localhost:5432/dev.db"
```

**`.env.local`:**
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Schritt 4: Datenbank-Schema synchronisieren

```bash
# Schema in die Datenbank pushen
npx prisma db push

# Prisma Client generieren
npx prisma generate
```

### Schritt 5: Next.js Development Server starten

```bash
npm run dev
```

Die App läuft jetzt auf: **http://localhost:3000**

---

## 🎯 Schnellstart (Ein Befehl)

Wenn alles bereits installiert ist:

```bash
# PostgreSQL starten (falls nicht läuft)
brew services start postgresql@14

# Prisma synchronisieren und App starten
npx prisma db push && npx prisma generate && npm run dev
```

---

## 👤 Admin-Zugriff einrichten

Nach dem ersten Login musst du deine User-Rolle auf ADMIN setzen:

```bash
# Deine Email-Adresse anpassen
psql -U khaled -d dev.db -c "UPDATE \"User\" SET role = 'ADMIN' WHERE email = 'deine-email@gmail.com';"
```

**Danach:**
1. Abmelden und neu anmelden auf http://localhost:3000
2. Admin-Panel ist verfügbar unter http://localhost:3000/admin

---

## 🗄️ Datenbank-Management

### Prisma Studio öffnen (GUI für Datenbank)

```bash
npx prisma studio
```

Öffnet eine grafische Oberfläche auf http://localhost:5555

### Test-Matches erstellen

Falls keine Matches in der Datenbank sind:

```bash
psql -U khaled -d dev.db <<'EOF'
-- Football Match - Morgen
INSERT INTO "Match" (id, date, time, location, "sportType", "maxPlayers", price, currency, description, "createdAt", "updatedAt")
VALUES (
  'test-match-1',
  CURRENT_DATE + INTERVAL '1 day',
  '19:00',
  'Al-Hussein Youth City, Amman',
  'Football',
  22,
  5.0,
  'JOD',
  'Freundschaftsspiel - 11 vs 11',
  NOW(),
  NOW()
);

-- Volleyball Match - Übermorgen
INSERT INTO "Match" (id, date, time, location, "sportType", "maxPlayers", price, currency, description, "createdAt", "updatedAt")
VALUES (
  'test-match-2',
  CURRENT_DATE + INTERVAL '2 days',
  '18:00',
  'Orthodox Club, Amman',
  'Volleyball',
  12,
  3.0,
  'JOD',
  'Volleyball-Training',
  NOW(),
  NOW()
);
EOF
```

### Datenbank zurücksetzen (VORSICHT: Löscht alle Daten!)

```bash
npx prisma migrate reset
```

---

## 🛠️ Troubleshooting - Häufige Probleme

### Problem 1: Keine Matches werden angezeigt

**Symptom:** Frontend ist leer, keine kommenden Spiele sichtbar

**Lösung:**
```bash
# Prüfen ob Matches in der DB sind
psql -U khaled -d dev.db -c "SELECT COUNT(*) FROM \"Match\";"

# Falls 0, Test-Matches erstellen (siehe oben)
```

---

### Problem 2: Admin-Panel nicht erreichbar (Redirect auf /)

**Symptom:** `/admin` leitet auf `/` um

**Ursache:** User hat keine ADMIN-Rolle

**Lösung:**
```bash
# 1. Prüfe deine aktuelle Rolle
psql -U khaled -d dev.db -c "SELECT email, role FROM \"User\";"

# 2. Setze ADMIN-Rolle (Email anpassen!)
psql -U khaled -d dev.db -c "UPDATE \"User\" SET role = 'ADMIN' WHERE email = 'deine-email@gmail.com';"

# 3. WICHTIG: Abmelden und neu anmelden!
# Gehe zu: http://localhost:3000/api/auth/signout
# Dann neu anmelden
```

---

### Problem 3: PostgreSQL läuft nicht

**Symptom:** `psql: error: connection to server... failed`

**Lösung:**
```bash
# Status prüfen
brew services list | grep postgresql

# PostgreSQL starten
brew services start postgresql@14

# Oder manuell
pg_ctl -D /usr/local/var/postgres start
```

---

### Problem 4: Prisma Fehler "Missing required environment variable: DIRECT_URL"

**Symptom:** Migration schlägt fehl

**Lösung:**
Füge `DIRECT_URL` zur `.env` Datei hinzu:
```env
DATABASE_URL="postgresql://khaled@localhost:5432/dev.db"
DIRECT_URL="postgresql://khaled@localhost:5432/dev.db"
```

---

### Problem 5: Hydration Error im Browser

**Symptom:** React Hydration Warning in der Konsole

**Ursache:** Browser-Extensions (z.B. Password Manager) modifizieren das HTML

**Lösung:**
- Teste im **Inkognito-Modus** (ohne Extensions)
- Oder deaktiviere Browser-Extensions temporär
- Die App funktioniert trotzdem - das ist nur eine Warnung

---

### Problem 6: Port 3000 bereits belegt

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Lösung:**
```bash
# Prozess finden und beenden
lsof -ti:3000 | xargs kill -9

# Oder anderen Port verwenden
PORT=3001 npm run dev
```

---

### Problem 7: Prisma Client nicht gefunden

**Symptom:** `Cannot find module '@prisma/client'`

**Lösung:**
```bash
# Prisma Client neu generieren
npx prisma generate

# Falls das nicht hilft, Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

---

## 📊 Datenbank-Schema Übersicht

```sql
User            # Benutzer (USER oder ADMIN Rolle)
├── Account     # OAuth Accounts (Google)
├── Session     # Login-Sessions
├── Booking     # Match-Buchungen
└── Rating      # Bewertungen (von Admins)

Match           # Sport-Events (Football, Volleyball, etc.)
├── Booking     # Buchungen für dieses Match
└── Rating      # Bewertungen nach diesem Match
```

---

## 🔧 Nützliche Befehle

```bash
# Development Server starten
npm run dev

# Production Build
npm run build
npm run start

# Linting
npm run lint

# Prisma Studio (Datenbank GUI)
npx prisma studio

# Datenbank-Schema aktualisieren
npx prisma db push

# Prisma Client neu generieren
npx prisma generate

# Datenbank-Status prüfen
psql -U khaled -d dev.db -c "\dt"  # Tabellen anzeigen
psql -U khaled -d dev.db -c "SELECT COUNT(*) FROM \"Match\";"  # Match-Anzahl
psql -U khaled -d dev.db -c "SELECT email, role FROM \"User\";"  # User-Rollen

# PostgreSQL Status
brew services list | grep postgresql
brew services start postgresql@14
brew services stop postgresql@14
brew services restart postgresql@14
```

---

## 🏗️ Projektstruktur

```
nextjs-app/
├── app/
│   ├── layout.tsx              # Root Layout mit Metadata
│   ├── page.tsx                # Hauptseite (öffentlich)
│   ├── admin/                  # Admin Panel
│   │   ├── layout.tsx          # Admin Layout (Auth-geschützt)
│   │   ├── page.tsx            # Admin Dashboard
│   │   ├── users/              # User-Management
│   │   └── matches/            # Match-Management
│   ├── api/
│   │   └── auth/               # NextAuth API Routes
│   └── globals.css             # Globale Styles
├── components/
│   ├── ui/                     # shadcn/ui Komponenten
│   ├── header.tsx              # Navigation
│   ├── hero.tsx                # Hero Section
│   ├── sports-section.tsx      # Sport-Grid
│   ├── football-match-modal.tsx    # Fußball-Buchung
│   ├── volleyball-match-modal.tsx  # Volleyball-Buchung
│   ├── basketball-match-modal.tsx  # Basketball-Buchung
│   ├── match-calendar.tsx      # Kalender-Komponente
│   └── footer.tsx              # Footer
├── lib/
│   ├── auth.ts                 # NextAuth Konfiguration
│   ├── prisma.ts               # Prisma Client
│   ├── utils.ts                # Utility Functions
│   └── constants.ts            # Konstanten
├── prisma/
│   └── schema.prisma           # Datenbank Schema
├── .env                        # Datenbank-URL
├── .env.local                  # Auth Secrets
└── package.json
```

---

## 📦 Verwendete Technologien

### Core Stack
- [Next.js 15](https://nextjs.org/) - React Full-Stack Framework
- [React 19](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety

### Backend & Datenbank
- [PostgreSQL](https://www.postgresql.org/) - Relationale Datenbank
- [Prisma ORM](https://www.prisma.io/) - Type-safe Database Client
- [NextAuth.js](https://next-auth.js.org/) - Authentifizierung
- [pg](https://node-postgres.com/) - PostgreSQL Client für Node.js

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable Components
- [Radix UI](https://www.radix-ui.com/) - Primitive Components
- [Lucide Icons](https://lucide.dev/) - Icon Library

---

## 🌐 SEO & Metadata

Die Website ist vollständig SEO-optimiert mit:
- Title & Description
- Open Graph Tags (Facebook, LinkedIn)
- Twitter Card Meta Tags
- Geo Tags (Amman, Jordan)
- Canonical URLs

---

## 🚢 Deployment

### Vercel (Empfohlen für Next.js)

1. PostgreSQL Datenbank auf [Neon](https://neon.tech/), [Supabase](https://supabase.com/) oder [Railway](https://railway.app/) erstellen
2. Umgebungsvariablen auf Vercel setzen:
   ```
   DATABASE_URL=your-production-db-url
   DIRECT_URL=your-production-db-url
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=...
   ```
3. Deployen:
   ```bash
   npm i -g vercel
   vercel
   ```

---

## 📝 Wichtige Hinweise

### Datenpersistenz
- ✅ **Matches, User, Bookings bleiben dauerhaft in PostgreSQL gespeichert**
- ✅ **Next.js App kann gestoppt/gestartet werden - Daten bleiben erhalten**
- ✅ **PostgreSQL läuft unabhängig von Next.js**

### Session Management
- 🔄 **Nach Rollen-Änderung (USER → ADMIN) muss man sich ab- und neu anmelden**
- 🔐 **Google OAuth erfordert Internet-Verbindung**
- ⏱️ **Sessions bleiben aktiv, bis sie ablaufen oder man sich abmeldet**

### Development vs. Production
- 🛠️ **Development:** `npm run dev` (Port 3000, Hot Reload)
- 🚀 **Production:** `npm run build && npm run start` (optimiert)

---

## 🤝 Kontakt

- Email: khaled132112@gmail.com
- WhatsApp: +962787497945

---

**Gebaut mit ❤️ in Amman, Jordan** 🇯🇴

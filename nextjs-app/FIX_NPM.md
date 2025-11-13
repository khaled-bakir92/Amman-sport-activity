# NPM Cache Problem beheben

Du hast ein Berechtigungsproblem mit dem npm Cache. Hier sind die Lösungen:

## Lösung 1: Berechtigungen reparieren (EMPFOHLEN)

Führe diesen Befehl im Terminal aus:

```bash
sudo chown -R 501:20 "/Users/khaled/.npm"
```

Danach:
```bash
npm install
```

## Lösung 2: Mit yarn installieren (EINFACHER)

Falls Lösung 1 nicht funktioniert, nutze yarn:

```bash
# Yarn installieren (einmalig)
npm install -g yarn

# Dependencies installieren
yarn install

# Dev Server starten
yarn dev
```

## Lösung 3: npm cache umgehen

```bash
npm install --cache /tmp/empty-cache
```

## Lösung 4: Komplett neu installieren

```bash
# Cache komplett leeren
npm cache clean --force

# Node modules und locks löschen
rm -rf node_modules package-lock.json

# Neu installieren
npm install
```

## Nach erfolgreicher Installation:

```bash
npm run dev
```

Die Website sollte dann unter http://localhost:3000 laufen.

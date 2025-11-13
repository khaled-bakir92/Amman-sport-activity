#!/bin/bash

echo "🚀 Sports Activities Amman - Installation Script"
echo "================================================"
echo ""

# Farben für Output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Prüfe ob Node.js installiert ist
if ! command -v node &> /dev/null
then
    echo -e "${RED}❌ Node.js ist nicht installiert!${NC}"
    echo "Bitte installiere Node.js von: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js gefunden: $(node --version)${NC}"

# Prüfe npm
if ! command -v npm &> /dev/null
then
    echo -e "${RED}❌ npm ist nicht installiert!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm gefunden: $(npm --version)${NC}"
echo ""

# Cleanup alte Installationen
echo -e "${YELLOW}🧹 Cleanup alte Installationen...${NC}"
rm -rf node_modules package-lock.json yarn.lock 2>/dev/null

# Versuch 1: Normale Installation
echo -e "${YELLOW}📦 Versuche normale npm Installation...${NC}"
if npm install 2>/dev/null; then
    echo -e "${GREEN}✅ Installation erfolgreich!${NC}"
else
    echo -e "${RED}❌ npm install fehlgeschlagen${NC}"
    echo ""

    # Versuch 2: Mit yarn
    echo -e "${YELLOW}📦 Versuche Installation mit yarn...${NC}"

    # Prüfe ob yarn installiert ist
    if ! command -v yarn &> /dev/null; then
        echo -e "${YELLOW}Installiere yarn...${NC}"
        npm install -g yarn 2>/dev/null
    fi

    if yarn install 2>/dev/null; then
        echo -e "${GREEN}✅ Installation mit yarn erfolgreich!${NC}"
    else
        echo -e "${RED}❌ Installation fehlgeschlagen${NC}"
        echo ""
        echo "Bitte behebe das npm Cache Problem manuell:"
        echo "  sudo chown -R 501:20 \"/Users/khaled/.npm\""
        echo ""
        echo "Oder installiere die Dependencies manuell mit:"
        echo "  npm install --cache /tmp/empty-cache"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Installation abgeschlossen!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "Starte den Development Server mit:"
echo -e "${YELLOW}  npm run dev${NC}"
echo ""
echo "Die Website wird dann verfügbar sein unter:"
echo -e "${YELLOW}  http://localhost:3000${NC}"
echo ""

#!/bin/bash
# Script zum Kopieren der Design Tokens

# Quell- und Zielverzeichnisse
SOURCE_DIR="C:/Code/CRM_Chatgpt_WEB/tokens"
TARGET_DIR="C:/Code/AngularV1/src/app/design-system/tokens"

# Erstelle Zielverzeichnis
mkdir -p "$TARGET_DIR"

# Kopiere Token-Dateien
echo "📋 Kopiere Design Tokens..."

cp "$SOURCE_DIR/colors.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/typography.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/spacing.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/themes.json" "$TARGET_DIR/"

# Kopiere Komponenten-Tokens
cp "$SOURCE_DIR/components-buttons.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/components-cards.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/components-forms.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/components-tables.json" "$TARGET_DIR/"
cp "$SOURCE_DIR/components-badges.json" "$TARGET_DIR/"

# Kopiere Tailwind Config
mkdir -p "C:/Code/AngularV1/tokens"
cp -r "$SOURCE_DIR/tailwind.config" "C:/Code/AngularV1/tokens/"

echo "✅ Design Tokens erfolgreich kopiert!"
echo ""
echo "Nächste Schritte:"
echo "1. Installiere Tailwind CSS: npm install -D tailwindcss postcss autoprefixer"
echo "2. Aktualisiere tailwind.config.js mit dem kopierten Config"
echo "3. Importiere die Tokens in deine Angular Services"

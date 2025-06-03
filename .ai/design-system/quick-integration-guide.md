# Angular Design System Integration - Quick Guide

## Design Token System aus CRM_Chatgpt_WEB

Du hast ein vollständiges Design Token System in `C:\Code\CRM_Chatgpt_WEB\tokens` mit:

### 1. **Foundation Tokens**
- `colors.json` - ProSolarTec Farben mit Dark Mode Support
- `typography.json` - Inter Font System mit allen Größen
- `spacing.json` - 8px basiertes Grid System
- `themes.json` - Theme Definitionen

### 2. **Component Tokens**
- `components-buttons.json` - Button Varianten
- `components-cards.json` - Card Styles
- `components-forms.json` - Form Elements
- `components-tables.json` - Table Styles
- Und viele mehr...

### 3. **Tailwind Integration**
- `tailwind.config/tailwind.config.js` - Fertige Config

## Integration in dein Angular Projekt

### Schritt 1: Tokens kopieren
```powershell
# Erstelle Token-Verzeichnis
New-Item -ItemType Directory -Force -Path "C:\Code\AngularV1\src\app\design-system\tokens"

# Kopiere alle Token-Dateien
Copy-Item -Path "C:\Code\CRM_Chatgpt_WEB\tokens\*" -Destination "C:\Code\AngularV1\src\app\design-system\tokens\" -Recurse
```

### Schritt 2: Tailwind Config übernehmen
```javascript
// tailwind.config.js in deinem Angular Projekt
const tokenConfig = require('./tokens/tailwind.config/tailwind.config.js');

module.exports = {
  ...tokenConfig,
  content: [
    "./src/**/*.{html,ts}",
  ],
  // Deine zusätzlichen Plugins
};
```

### Schritt 3: Token Service erstellen
```typescript
// src/app/design-system/services/design-tokens.service.ts
import { Injectable } from '@angular/core';
import colorTokens from '../tokens/colors.json';
import typographyTokens from '../tokens/typography.json';
import spacingTokens from '../tokens/spacing.json';

@Injectable({ providedIn: 'root' })
export class DesignTokensService {
  colors = colorTokens.color;
  typography = typographyTokens;
  spacing = spacingTokens.spacing;
}
```

### Schritt 4: Bestehende Komponenten anpassen

**Button Component Update:**
```typescript
// Nutze die Token-basierten Farben
private getVariantClasses(): string {
  const variants = {
    'primary': 'bg-primary hover:bg-primary-hover',
    'secondary': 'bg-secondary hover:bg-[#152d4f]',
    'outline-primary': 'border-primary text-primary hover:bg-orange-50',
    'tertiary': 'border-gray-300 text-gray-600 hover:bg-gray-100',
    // etc.
  };
  return variants[this.variant];
}
```

## Komponenten-Architektur

```
src/app/
├── design-system/
│   ├── tokens/           # Kopierte Token-Dateien
│   ├── components/       # UI Komponenten
│   │   ├── typography/   # Text-Komponente
│   │   ├── grid/        # Grid & Container
│   │   ├── spacing/     # Spacing Utilities
│   │   └── card/        # Card Component
│   └── services/        # Token Service
├── shared/
│   └── components-beta/ # Deine bestehenden Komponenten
└── features/           # Feature Module
```

## Vorteile des Token Systems

1. **Konsistenz**: Alle Farben, Abstände und Schriften aus einer Quelle
2. **Dark Mode**: Bereits eingebaut mit Light/Dark Varianten
3. **WCAG Compliant**: Barrierefreie Farbkontraste
4. **ProSolarTec Branding**: Orange (#F99600) und Blau (#1C3661)
5. **Responsive**: Breakpoints und Container-System
6. **Wartbarkeit**: Änderungen zentral in Token-Dateien

## Nächste Schritte

1. **Tokens kopieren** mit dem PowerShell-Befehl oben
2. **Tailwind installieren**: `npm install -D tailwindcss`
3. **Token Service** erstellen
4. **Eine Komponente** als Test migrieren
5. **Dokumentation** mit Storybook erstellen

Das System ist production-ready und wurde bereits im CRM Projekt erfolgreich eingesetzt!

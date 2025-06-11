# 🎨 DESIGN TOKEN SYSTEM - Single Source of Truth

## Übersicht

Implementierung eines **Style Dictionary** basierten Design Token Systems als Single Source of Truth für alle Design-Entscheidungen.

## 🏗️ Architektur

```
tokens/
├── base/
│   ├── colors.json      # Farb-Definitionen
│   ├── spacing.json     # Abstände
│   ├── typography.json  # Schrift
│   └── shadows.json     # Schatten
├── semantic/
│   ├── buttons.json     # Button-spezifische Tokens
│   ├── forms.json       # Form-spezifische Tokens
│   └── components.json  # Komponenten-Tokens
└── build.js            # Style Dictionary Config
```

## 📦 Token-Struktur

### Basis-Token Format
```json
{
  "color": {
    "primary": {
      "50": { "value": "#FFF7ED" },
      "100": { "value": "#FFEDD5" },
      "500": { 
        "value": "#F99600",
        "comment": "ProSolarTec Hauptorange"
      }
    }
  }
}
```

### Semantische Tokens
```json
{
  "button": {
    "primary": {
      "background": { "value": "{color.primary.500}" },
      "hover": { "value": "{color.primary.600}" },
      "text": { "value": "{color.white}" }
    }
  }
}
```

## 🔧 Style Dictionary Konfiguration

```javascript
// tokens/build.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    // Tailwind Config Generation
    tailwind: {
      transformGroup: 'js',
      buildPath: '../',
      files: [{
        destination: 'tailwind.config.tokens.js',
        format: 'javascript/module',
        options: {
          outputReferences: true
        }
      }]
    },
    
    // TypeScript Constants
    typescript: {
      transformGroup: 'js',
      buildPath: '../src/app/core/design-system/',
      files: [{
        destination: 'design-tokens.generated.ts',
        format: 'typescript/es6-declarations',
        options: {
          outputReferences: true
        }
      }]
    },
    
    // SCSS Variables
    scss: {
      transformGroup: 'scss',
      buildPath: '../src/styles/',
      files: [{
        destination: '_design-tokens.scss',
        format: 'scss/variables'
      }]
    },
    
    // CSS Custom Properties
    css: {
      transformGroup: 'css',
      buildPath: '../src/styles/',
      files: [{
        destination: 'design-tokens.css',
        format: 'css/variables',
        options: {
          selector: ':root'
        }
      }]
    }
  }
};
```

## 🚀 Build-Pipeline

### Package.json Scripts
```json
{
  "scripts": {
    "tokens:build": "style-dictionary build --config ./tokens/build.js",
    "tokens:watch": "npm run tokens:build && chokidar 'tokens/**/*.json' -c 'npm run tokens:build'",
    "prebuild": "npm run tokens:build",
    "prestart": "npm run tokens:build"
  }
}
```

## 💡 Token-Utility Klassen

```typescript
// src/app/core/design-system/token-utilities.ts
import { DESIGN_TOKENS } from './design-tokens.generated';

export class TokenUtils {
  // Generiert Tailwind-kompatible Klassen aus Tokens
  static getColorClass(
    property: 'bg' | 'text' | 'border',
    token: string
  ): string {
    // Beispiel: getColorClass('bg', 'primary.500') => 'bg-primary-500'
    return `${property}-${token.replace('.', '-')}`;
  }
  
  // Größen-Mapping für Komponenten
  static getSizeClasses(component: string, size: string): string {
    const sizeMap = DESIGN_TOKENS.components[component].sizes[size];
    return Object.entries(sizeMap)
      .map(([key, value]) => `${key}-${value}`)
      .join(' ');
  }
}
```

## 🔄 Migration bestehender Tokens

### Schritt 1: Konsolidierung
1. Alle 4 Token-Dateien analysieren
2. Duplikate identifizieren
3. Master-Token-Set erstellen

### Schritt 2: Token-Mapping
```javascript
// Alte Verwendung:
const color = '#F99600';

// Neue Verwendung:
const color = DESIGN_TOKENS.color.primary[500];
```

### Schritt 3: Komponenten-Update
```typescript
// Alt:
buttonClasses = 'bg-primary text-white hover:bg-primary-600';

// Neu:
buttonClasses = TokenUtils.getComponentClasses('button', 'primary', size);
```

## 📏 Namenskonventionen

### Token-Naming
- **Basis**: `color.primary.500`
- **Semantisch**: `button.primary.background`
- **Komponente**: `component.button.size.md.padding`

### CSS-Variablen
- `--color-primary-500`
- `--button-primary-background`
- `--spacing-md`

### Tailwind-Klassen
- `bg-primary-500`
- `text-primary-500`
- `p-spacing-md`

## ✅ Validierung

### Token-Linting
```javascript
// tokens/.tokenlintrc.js
module.exports = {
  rules: {
    'color-format': 'hex',
    'required-description': true,
    'naming-convention': 'kebab-case'
  }
};
```

### Automatische Tests
```typescript
describe('Design Tokens', () => {
  it('sollte alle Farben im HEX-Format haben', () => {
    // Test-Implementation
  });
  
  it('sollte keine duplizierten Werte haben', () => {
    // Test-Implementation
  });
});
```

## 🎯 Ziele

1. **Single Source of Truth** für alle Design-Entscheidungen
2. **Automatische Synchronisation** zwischen allen Plattformen
3. **Keine manuellen Updates** mehr nötig
4. **Type-Safety** in TypeScript
5. **Versionierung** von Design-Änderungen
# 🔒 ESLINT TOKEN ENFORCEMENT - Strikte Regeln gegen hardcodierte Werte

## Installation der benötigten Plugins

```bash
# ESLint Plugins für Token-Enforcement installieren
npm install --save-dev \
  eslint-plugin-regex \
  eslint-plugin-no-hardcoded-strings \
  @typescript-eslint/utils
```

## Erweiterte ESLint-Konfiguration

### Option 1: Mit eslint-plugin-regex (Empfohlen - Schnell & Einfach)

```json
// .eslintrc.json - Erweiterte Version
{
  "root": true,
  "ignorePatterns": [
    "projects/**/*",
    "dist/**/*",
    "node_modules/**/*",
    "coverage/**/*",
    "*.js"
  ],
  "plugins": ["regex"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        // ========== DESIGN TOKEN ENFORCEMENT ==========
        
        // FEHLER bei Hex-Farben
        "regex/invalid": [
          "error",
          {
            "regex": "#[0-9A-Fa-f]{3,6}(?![0-9A-Fa-f])",
            "message": "❌ HARDCODIERTE FARBE! Nutze: tokenUtils.getColor('primary.500')",
            "replacement": "tokenUtils.getColor('TODO')"
          }
        ],
        
        // FEHLER bei RGB/RGBA Farben
        "regex/invalid": [
          "error", 
          {
            "regex": "rgba?\\([^)]+\\)",
            "message": "❌ RGB FARBE! Nutze Design Tokens!"
          }
        ],
        
        // FEHLER bei Tailwind-Farben
        "regex/invalid": [
          "error",
          {
            "regex": "(?:bg|text|border|ring|divide|from|to|via)-(red|blue|green|yellow|orange|purple|pink|gray|indigo|violet)-(?:50|100|200|300|400|500|600|700|800|900)",
            "message": "❌ HARDCODIERTE TAILWIND-FARBE! Nutze: tokenUtils.getColorClass('bg', 'primary.500')"
          }
        ],
        
        // FEHLER bei px-Werten
        "regex/invalid": [
          "error",
          {
            "regex": "\\d+px",
            "message": "❌ PX-WERT! Nutze: tokenUtils.getSpacing('md')"
          }
        ],
        
        // FEHLER bei hardcodierten Spacing-Klassen
        "regex/invalid": [
          "error",
          {
            "regex": "(?:p|m|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr)-(?:\\d+|\\[\\d+(?:px|rem|em)\\])",
            "message": "❌ HARDCODIERTES SPACING! Nutze: tokenUtils.getSpacingClass('p', 'md')"
          }
        ],
        
        // FEHLER bei hardcodierten Text-Größen
        "regex/invalid": [
          "error",
          {
            "regex": "text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)",
            "message": "❌ HARDCODIERTE TEXT-GRÖSSE! Nutze: tokenUtils.getTextSizeClass('md')"
          }
        ],
        
        // ========== BESTEHENDE REGELN ==========
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": ["app", "pst"],
            "style": "kebab-case"
          }
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "no-console": ["error", { "allow": ["warn", "error", "info"] }],
        "no-debugger": "error",
        "prefer-const": "error",
        "eqeqeq": ["error", "always"],
        "curly": "error"
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility"
      ],
      "rules": {
        // ========== TEMPLATE TOKEN ENFORCEMENT ==========
        
        // FEHLER bei Inline-Styles
        "@angular-eslint/template/no-inline-styles": [
          "error",
          {
            "allowBindToStyle": false,
            "message": "❌ INLINE STYLES! Nutze Token-basierte Klassen!"
          }
        ],
        
        // Custom Regex für Templates
        "regex/invalid": [
          "error",
          {
            "regex": "style=\"[^\"]*\"",
            "message": "❌ INLINE STYLE! Nutze [ngClass] mit Tokens!"
          }
        ],
        
        // ========== BESTEHENDE REGELN ==========
        "@angular-eslint/template/no-negated-async": "error",
        "@angular-eslint/template/click-events-have-key-events": "warn",
        "@angular-eslint/template/interactive-supports-focus": "warn"
      }
    },
    {
      "files": ["*.spec.ts"],
      "rules": {
        // Tests dürfen mehr Freiheiten haben
        "regex/invalid": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off"
      }
    }
  ]
}
```

### Option 2: Custom ESLint Plugin (Mehr Kontrolle)

```javascript
// eslint-plugin-design-tokens/index.js
module.exports = {
  rules: {
    'no-hardcoded-colors': require('./rules/no-hardcoded-colors'),
    'no-hardcoded-spacing': require('./rules/no-hardcoded-spacing'),
    'no-tailwind-colors': require('./rules/no-tailwind-colors'),
    'use-token-utils': require('./rules/use-token-utils'),
    'enforce-component-tokens': require('./rules/enforce-component-tokens')
  }
};
```

```javascript
// eslint-plugin-design-tokens/rules/no-hardcoded-colors.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Verbietet hardcodierte Farben - nutze Design Tokens!',
      category: 'Design System',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },
  
  create(context) {
    return {
      // Prüfe String Literals
      Literal(node) {
        if (typeof node.value !== 'string') return;
        
        // Hex-Farben
        if (/#[0-9A-Fa-f]{3,6}\b/.test(node.value)) {
          context.report({
            node,
            message: '❌ Hardcodierte Hex-Farbe "{{ color }}" gefunden! Nutze tokenUtils.getColor()',
            data: { color: node.value },
            fix(fixer) {
              // Auto-Fix zu Token
              const tokenName = getTokenForColor(node.value);
              if (tokenName) {
                return fixer.replaceText(node, `tokenUtils.getColor('${tokenName}')`);
              }
            }
          });
        }
        
        // RGB/RGBA
        if (/rgba?\([^)]+\)/.test(node.value)) {
          context.report({
            node,
            message: '❌ Hardcodierte RGB-Farbe gefunden!',
          });
        }
      },
      
      // Prüfe Template Strings
      TemplateElement(node) {
        const value = node.value.raw;
        
        // Tailwind-Klassen
        const tailwindPattern = /(bg|text|border)-(red|blue|green|orange|yellow|purple|pink)-\d{3}/g;
        const matches = value.match(tailwindPattern);
        
        if (matches) {
          context.report({
            node,
            message: '❌ Hardcodierte Tailwind-Farbe "{{ class }}" gefunden!',
            data: { class: matches[0] }
          });
        }
      }
    };
  }
};

// Helper-Funktion für Auto-Fix
function getTokenForColor(hexColor) {
  const colorMap = {
    '#F99600': 'primary.500',
    '#1C3661': 'secondary.500',
    '#FFFFFF': 'neutral.white',
    '#000000': 'neutral.black',
    // ... weitere Mappings
  };
  return colorMap[hexColor.toUpperCase()];
}
```

## VS Code Integration

### .vscode/settings.json
```json
{
  "eslint.validate": [
    "javascript",
    "typescript",
    "html"
  ],
  "eslint.options": {
    "extensions": [".js", ".ts", ".html"]
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  
  // Error Lens für bessere Sichtbarkeit
  "errorLens.enabled": true,
  "errorLens.severity": {
    "error": true,
    "warning": true
  }
}
```

## Pre-Commit Hook Integration

```bash
#!/bin/bash
# .husky/pre-commit

echo "🔍 Prüfe auf Token-Violations..."

# ESLint mit Token-Rules
npx eslint . --ext .ts,.html --max-warnings 0 || {
  echo ""
  echo "❌ COMMIT BLOCKIERT!"
  echo "Hardcodierte Werte gefunden. Lösungen:"
  echo ""
  echo "1. Auto-Fix versuchen:"
  echo "   npm run lint:fix"
  echo ""
  echo "2. Manuell fixen:"
  echo "   - Farben: tokenUtils.getColor('primary.500')"
  echo "   - Klassen: tokenUtils.getColorClass('bg', 'primary.500')"
  echo "   - Spacing: tokenUtils.getSpacingClass('p', 'md')"
  echo ""
  exit 1
}
```

## NPM Scripts erweitern

```json
// package.json
{
  "scripts": {
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "lint:tokens": "eslint . --ext .ts,.html --rule 'regex/invalid: error'",
    "lint:strict": "eslint . --ext .ts,.html --max-warnings 0",
    "validate:tokens": "npm run lint:tokens -- --no-eslintrc"
  }
}
```

## Test der neuen Regeln

### Testdatei erstellen
```typescript
// test-token-rules.ts

// ❌ Diese sollten ALLE Fehler werfen:
const color1 = '#F99600';  // ESLint: ❌ HARDCODIERTE FARBE!
const color2 = 'rgb(255, 150, 0)';  // ESLint: ❌ RGB FARBE!
const classes1 = 'bg-orange-500 text-white';  // ESLint: ❌ HARDCODIERTE TAILWIND-FARBE!
const spacing1 = 'padding: 16px';  // ESLint: ❌ PX-WERT!
const spacing2 = 'p-4 m-2';  // ESLint: ❌ HARDCODIERTES SPACING!

// ✅ So ist es richtig:
const color3 = tokenUtils.getColor('primary.500');
const classes2 = tokenUtils.getColorClass('bg', 'primary.500');
const spacing3 = tokenUtils.getSpacing('md');
```

## Graduelle Einführung

### Phase 1: Warnung (1 Woche)
```json
"regex/invalid": ["warn", { ... }]
```

### Phase 2: Fehler für neue Dateien (2 Wochen)
```json
"overrides": [
  {
    "files": ["src/app/shared/components/**/*.ts"],
    "rules": {
      "regex/invalid": ["error", { ... }]
    }
  }
]
```

### Phase 3: Fehler überall (3 Wochen)
```json
"regex/invalid": ["error", { ... }]
```

## Erwartete Ergebnisse

Nach Aktivierung:
- **~500-1000 ESLint-Fehler** initial (normale Anzahl)
- **Auto-Fix** kann ~70% beheben
- **Manueller Fix** für Rest nötig
- **Keine neuen Violations** mehr möglich!

Die Regeln garantieren 100% Token-Compliance!
# eslint-plugin-design-tokens

ESLint Plugin zur Durchsetzung von Design Token Usage in Angular-Projekten.

## Installation

```bash
# Im Plugin-Verzeichnis
npm link

# Im Hauptprojekt
npm link eslint-plugin-design-tokens
```

## Verwendung

In `.eslintrc.json`:

```json
{
  "plugins": ["design-tokens"],
  "rules": {
    "design-tokens/no-hardcoded-colors": "error",
    "design-tokens/no-hardcoded-spacing": "error",
    "design-tokens/no-tailwind-colors": "error",
    "design-tokens/use-token-utils": "warn"
  }
}
```

## Regeln

### no-hardcoded-colors
Verhindert hardcodierte Farben (Hex, RGB, HSL).

❌ Falsch:
```typescript
const color = '#F99600';
const bg = 'rgb(255, 150, 0)';
```

✅ Richtig:
```typescript
const color = TokenUtils.getColor('primary.500');
```

### no-hardcoded-spacing
Verhindert hardcodierte Pixel-Werte.

❌ Falsch:
```typescript
const padding = '16px';
const margin = '2rem';
```

✅ Richtig:
```typescript
const padding = TokenUtils.getSpacing('md');
```

### no-tailwind-colors
Verhindert hardcodierte Tailwind-Farbklassen.

❌ Falsch:
```typescript
const classes = 'bg-orange-500 text-white';
```

✅ Richtig:
```typescript
const classes = TokenUtils.getColorClass('bg', 'primary.500');
```

### use-token-utils
Erzwingt die Verwendung von TokenUtils in Komponenten mit visuellen Properties.

## Auto-Fix

Einige Regeln unterstützen Auto-Fix:

```bash
eslint --fix src/**/*.ts
```
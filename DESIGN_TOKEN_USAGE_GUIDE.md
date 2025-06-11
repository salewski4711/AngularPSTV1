# Design Token Usage Guide 📚

## Inhaltsverzeichnis
1. [Einführung](#einführung)
2. [TokenUtils API](#tokenutils-api)
3. [Praktische Beispiele](#praktische-beispiele)
4. [Best Practices](#best-practices)
5. [Migration Guide](#migration-guide)
6. [Troubleshooting](#troubleshooting)

## Einführung

Design Tokens sind die einzelne Quelle der Wahrheit für alle visuellen Eigenschaften in unserer Anwendung. Statt hardcodierte Werte zu verwenden, nutzen wir TokenUtils.

### Warum Design Tokens?

```typescript
// ❌ Schlecht: Hardcodierte Werte
'bg-orange-500 text-white p-4'

// ✅ Gut: Token-basiert
`${TokenUtils.getColorClass('bg', 'primary.500')} ${TokenUtils.getColorClass('text', 'neutral.white')} ${TokenUtils.getSpacingClass('p', '4')}`
```

## TokenUtils API

### 🎨 Farben

#### getColor(token: string): string
Gibt den Hex-Wert einer Farbe zurück.

```typescript
const primaryColor = TokenUtils.getColor('primary.500'); // '#F99600'
const textColor = TokenUtils.getColor('neutral.900');   // '#111827'
```

#### getColorClass(property: string, token: string): string
Generiert Tailwind-Klassen für Farben.

```typescript
// Background
TokenUtils.getColorClass('bg', 'primary.500')     // 'bg-primary'
TokenUtils.getColorClass('bg', 'neutral.100')     // 'bg-gray-100'

// Text
TokenUtils.getColorClass('text', 'error.500')     // 'text-red-500'
TokenUtils.getColorClass('text', 'success.600')   // 'text-green-600'

// Border
TokenUtils.getColorClass('border', 'neutral.300') // 'border-gray-300'
```

### 📏 Spacing

#### getSpacing(size: string): string
Gibt den rem-Wert für Spacing zurück.

```typescript
TokenUtils.getSpacing('4')  // '1rem' (16px)
TokenUtils.getSpacing('8')  // '2rem' (32px)
```

#### getSpacingClass(property: string, size: string): string
Generiert Spacing-Klassen.

```typescript
// Padding
TokenUtils.getSpacingClass('p', '4')   // 'p-4'
TokenUtils.getSpacingClass('px', '6')  // 'px-6'
TokenUtils.getSpacingClass('py', '2')  // 'py-2'

// Margin
TokenUtils.getSpacingClass('m', '4')   // 'm-4'
TokenUtils.getSpacingClass('mt', '8')  // 'mt-8'
TokenUtils.getSpacingClass('mb', '2')  // 'mb-2'

// Gap
TokenUtils.getSpacingClass('gap', '4') // 'gap-4'
```

### 📝 Typography

#### getTextSizeClass(size: string): string
Generiert Text-Größen-Klassen.

```typescript
TokenUtils.getTextSizeClass('xs')   // 'text-xs'
TokenUtils.getTextSizeClass('sm')   // 'text-sm'
TokenUtils.getTextSizeClass('base') // 'text-base'
TokenUtils.getTextSizeClass('lg')   // 'text-lg'
TokenUtils.getTextSizeClass('xl')   // 'text-xl'
```

#### getFontWeightClass(weight: string): string
Generiert Font-Weight-Klassen.

```typescript
TokenUtils.getFontWeightClass('normal')   // 'font-normal'
TokenUtils.getFontWeightClass('medium')   // 'font-medium'
TokenUtils.getFontWeightClass('semibold') // 'font-semibold'
TokenUtils.getFontWeightClass('bold')     // 'font-bold'
```

### 🎭 Komponenten

#### getComponentClasses(component: string, options: object): string
Generiert komplette Klassen-Sets für Komponenten.

```typescript
// Button
TokenUtils.getComponentClasses('button', {
  variant: 'primary',
  size: 'md',
  state: { disabled: false, loading: false }
});
// Ergebnis: 'bg-primary text-white hover:bg-primary-600 px-4 py-2.5 rounded-md ...'

// Badge
TokenUtils.getComponentClasses('badge', {
  variant: 'filled',
  color: 'success'
});
```

### 🎬 Transitions & Animations

#### getTransitionClass(duration?: string, property?: string): string
Generiert Transition-Klassen.

```typescript
TokenUtils.getTransitionClass()                    // 'transition-all duration-200 ease-in-out'
TokenUtils.getTransitionClass('fast')              // 'transition-all duration-150 ease-in-out'
TokenUtils.getTransitionClass('slow', 'colors')    // 'transition-colors duration-300 ease-in-out'
```

#### getAnimationClass(animation: string): string
Generiert Animation-Klassen.

```typescript
TokenUtils.getAnimationClass('spin')     // 'animate-spin'
TokenUtils.getAnimationClass('pulse')    // 'animate-pulse'
TokenUtils.getAnimationClass('fade-in')  // 'animate-fadeIn'
```

### 🔍 Utilities

#### listAvailableTokens(): string
Zeigt alle verfügbaren Tokens an.

```typescript
console.log(TokenUtils.listAvailableTokens());
// Ausgabe: Liste aller Farben, Spacing-Werte, etc.
```

#### findClosestToken(value: string): object | null
Findet das passende Token für einen Wert.

```typescript
TokenUtils.findClosestToken('#F99600')  
// { token: 'primary.500', exact: true }

TokenUtils.findClosestToken('16px')     
// { token: '4', exact: true }
```

## Praktische Beispiele

### Button-Komponente

```typescript
// ❌ Vorher
const classes = 'bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md';

// ✅ Nachher
const classes = TokenUtils.getComponentClasses('button', {
  variant: 'primary',
  size: 'md'
});
```

### Custom Styling

```typescript
// Kombiniere mehrere Token-Klassen
const cardClasses = cn(
  TokenUtils.getColorClass('bg', 'neutral.white'),
  'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
  TokenUtils.getSpacingClass('p', '6'),
  TokenUtils.getRadiusClass('lg'),
  'shadow-md'
);
```

### Conditional Styling

```typescript
const getStatusColor = (status: 'success' | 'error' | 'warning') => {
  const colorMap = {
    success: 'success.500',
    error: 'error.500',
    warning: 'warning.500'
  };
  
  return TokenUtils.getColorClass('text', colorMap[status]);
};
```

### Style Objects

```typescript
// Für inline styles
const styles = {
  backgroundColor: TokenUtils.getColor('primary.500'),
  padding: TokenUtils.getSpacing('4'),
  borderRadius: TokenUtils.getRadius('md')
};
```

## Best Practices

### ✅ DO's

1. **Immer TokenUtils verwenden**
   ```typescript
   TokenUtils.getColorClass('bg', 'primary.500')
   ```

2. **Semantische Token-Namen nutzen**
   ```typescript
   // Gut: Semantisch
   'error.500'    // für Fehler
   'success.500'  // für Erfolg
   'neutral.700'  // für Text
   ```

3. **Dark Mode berücksichtigen**
   ```typescript
   `${TokenUtils.getColorClass('bg', 'neutral.100')} dark:${TokenUtils.getColorClass('bg', 'neutral.800')}`
   ```

### ❌ DON'Ts

1. **Keine hardcodierten Werte**
   ```typescript
   // Schlecht
   'bg-orange-500'
   'p-4'
   'text-sm'
   ```

2. **Keine neuen Tokens ohne Genehmigung**
   ```typescript
   // Schlecht: Eigene Tokens hinzufügen
   tokens.customColor = '#123456'
   ```

3. **Keine String-Konkatenation**
   ```typescript
   // Schlecht
   'bg-' + color + '-500'
   
   // Gut
   TokenUtils.getColorClass('bg', `${color}.500`)
   ```

## Migration Guide

### Schritt 1: ESLint prüfen
```bash
npm run lint
```

### Schritt 2: Import hinzufügen
```typescript
import { TokenUtils } from '@core/design-system/token-utilities';
```

### Schritt 3: Werte ersetzen

#### Farben
```typescript
// Vorher
'bg-gray-100' → TokenUtils.getColorClass('bg', 'neutral.100')
'text-orange-500' → TokenUtils.getColorClass('text', 'primary.500')
'border-red-600' → TokenUtils.getColorClass('border', 'error.600')
```

#### Spacing
```typescript
// Vorher
'p-4' → TokenUtils.getSpacingClass('p', '4')
'mt-8' → TokenUtils.getSpacingClass('mt', '8')
'gap-2' → TokenUtils.getSpacingClass('gap', '2')
```

#### Text
```typescript
// Vorher
'text-sm' → TokenUtils.getTextSizeClass('sm')
'font-bold' → TokenUtils.getFontWeightClass('bold')
```

### Schritt 4: Testen
```bash
npm test
npm start # Visuell prüfen
```

## Troubleshooting

### "Token nicht gefunden"
```typescript
// Nutze listAvailableTokens() um alle Tokens zu sehen
console.log(TokenUtils.listAvailableTokens());

// Oder findClosestToken() für Vorschläge
const suggestion = TokenUtils.findClosestToken('#FF5733');
```

### ESLint Fehler
```bash
# Auto-Fix versuchen
npm run lint:fix

# Bei komplexen Fällen: Manuell mit TokenUtils ersetzen
```

### TypeScript Fehler
```typescript
// Stelle sicher, dass der Import korrekt ist
import { TokenUtils } from '../../../core/design-system/token-utilities';
// Pfad anpassen je nach Komponenten-Location
```

### Performance
```typescript
// Bei vielen Klassen: Computed Properties nutzen
badgeClasses = computed(() => {
  return TokenUtils.getComponentClasses('badge', {
    variant: this.variant,
    size: this.size
  });
});
```

## Cheat Sheet

```typescript
// === FARBEN ===
TokenUtils.getColorClass('bg', 'primary.500')     // Orange
TokenUtils.getColorClass('bg', 'secondary.500')   // Blau
TokenUtils.getColorClass('bg', 'neutral.100')     // Hellgrau
TokenUtils.getColorClass('text', 'error.500')     // Rot
TokenUtils.getColorClass('text', 'success.500')   // Grün
TokenUtils.getColorClass('border', 'warning.500') // Gelb

// === SPACING ===
TokenUtils.getSpacingClass('p', '4')   // 1rem
TokenUtils.getSpacingClass('m', '8')   // 2rem
TokenUtils.getSpacingClass('gap', '2') // 0.5rem

// === TEXT ===
TokenUtils.getTextSizeClass('sm')          // Klein
TokenUtils.getTextSizeClass('base')        // Normal
TokenUtils.getFontWeightClass('semibold')  // Halbfett

// === KOMPONENTEN ===
TokenUtils.getComponentClasses('button', { variant: 'primary', size: 'md' })
TokenUtils.getComponentClasses('badge', { variant: 'filled' })

// === TRANSITIONS ===
TokenUtils.getTransitionClass('fast')      // 150ms
TokenUtils.getTransitionClass('base')      // 200ms
TokenUtils.getTransitionClass('slow')      // 300ms
```

---

Bei Fragen: Erstelle ein Issue oder kontaktiere das Design System Team! 🎨
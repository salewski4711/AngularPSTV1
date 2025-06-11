# Design Token Naming Conventions 📐

## Grundprinzipien

1. **Konsistenz**: Einmal festgelegt, immer gleich
2. **Vorhersagbar**: Entwickler können Namen erraten
3. **Hierarchisch**: Von allgemein zu spezifisch
4. **Skalierbar**: Neue Tokens passen ins System

## Naming-Struktur

### Format: `category.property.variant.modifier`

```typescript
// Beispiele:
color.primary.500       // Basis-Farbe
color.primary.500.hover // Mit State-Modifier
spacing.4               // Einfaches Spacing
size.icon.md           // Größe mit Sub-Kategorie
```

## 1. Farben (Colors)

### Basis-Struktur
```typescript
color.{palette}.{intensity}

// Beispiele:
color.primary.500    // Orange Hauptfarbe
color.neutral.100    // Hellgrau
color.success.500    // Grün
```

### Intensitäts-Skala
```typescript
50   // Sehr hell (fast weiß)
100  // Sehr hell
200  // Hell
300  // Hell-Mittel
400  // Mittel-Hell
500  // Basis (Hauptfarbe)
600  // Mittel-Dunkel
700  // Dunkel
800  // Sehr dunkel
900  // Sehr dunkel (fast schwarz)
950  // Extra dunkel (für Dark Mode)
```

### Spezial-Farben
```typescript
color.neutral.white     // #FFFFFF
color.neutral.black     // #000000
color.transparent       // transparent
color.current          // currentColor
```

### States & Modifiers
```typescript
// NICHT als separate Tokens!
// Nutze Intensitäten:
color.primary.500  // Normal
color.primary.600  // Hover (eine Stufe dunkler)
color.primary.700  // Active (zwei Stufen dunkler)
color.primary.400  // Disabled (eine Stufe heller)
```

### Opacity (NEU)
```typescript
// Als CSS-Variable mit Opacity-Modifier
color.primary.500/10   // 10% Opacity
color.primary.500/20   // 20% Opacity
color.primary.500/50   // 50% Opacity

// Verwendung:
TokenUtils.getColorClass('bg', 'primary.500/10')
// Generiert: bg-primary-500/10
```

## 2. Spacing

### Basis-Struktur
```typescript
spacing.{value}

// T-Shirt zu Zahl Mapping:
spacing.0    // 0px
spacing.px   // 1px
spacing.0.5  // 2px   (0.125rem)
spacing.1    // 4px   (0.25rem)
spacing.1.5  // 6px   (0.375rem)
spacing.2    // 8px   (0.5rem)
spacing.2.5  // 10px  (0.625rem)
spacing.3    // 12px  (0.75rem)
spacing.3.5  // 14px  (0.875rem)
spacing.4    // 16px  (1rem) - Base
spacing.5    // 20px  (1.25rem)
spacing.6    // 24px  (1.5rem)
spacing.7    // 28px  (1.75rem)
spacing.8    // 32px  (2rem)
spacing.9    // 36px  (2.25rem)
spacing.10   // 40px  (2.5rem)
spacing.11   // 44px  (2.75rem)
spacing.12   // 48px  (3rem)
spacing.14   // 56px  (3.5rem)
spacing.16   // 64px  (4rem)
spacing.20   // 80px  (5rem)
spacing.24   // 96px  (6rem)
```

## 3. Typography

### Font Sizes
```typescript
fontSize.xs    // 12px (0.75rem)
fontSize.sm    // 14px (0.875rem)
fontSize.base  // 16px (1rem)
fontSize.lg    // 18px (1.125rem)
fontSize.xl    // 20px (1.25rem)
fontSize.2xl   // 24px (1.5rem)
fontSize.3xl   // 30px (1.875rem)
fontSize.4xl   // 36px (2.25rem)
fontSize.5xl   // 48px (3rem)
```

### Font Weights
```typescript
fontWeight.thin       // 100
fontWeight.light      // 300
fontWeight.normal     // 400
fontWeight.medium     // 500
fontWeight.semibold   // 600
fontWeight.bold       // 700
fontWeight.extrabold  // 800
```

### Line Heights
```typescript
lineHeight.none    // 1
lineHeight.tight   // 1.25
lineHeight.snug    // 1.375
lineHeight.normal  // 1.5
lineHeight.relaxed // 1.625
lineHeight.loose   // 2
```

## 4. Sizes

### Icons
```typescript
size.icon.xs   // 12px (w-3 h-3)
size.icon.sm   // 16px (w-4 h-4)
size.icon.md   // 20px (w-5 h-5)
size.icon.lg   // 24px (w-6 h-6)
size.icon.xl   // 32px (w-8 h-8)
size.icon.2xl  // 48px (w-12 h-12)
```

### Containers
```typescript
size.container.xs   // 320px
size.container.sm   // 384px
size.container.md   // 448px
size.container.lg   // 512px
size.container.xl   // 576px
size.container.2xl  // 672px
size.container.3xl  // 768px
size.container.4xl  // 896px
size.container.5xl  // 1024px
size.container.6xl  // 1152px
size.container.7xl  // 1280px
```

## 5. Border Radius

```typescript
radius.none   // 0px
radius.sm     // 2px (0.125rem)
radius.base   // 4px (0.25rem)
radius.md     // 6px (0.375rem)
radius.lg     // 8px (0.5rem)
radius.xl     // 12px (0.75rem)
radius.2xl    // 16px (1rem)
radius.3xl    // 24px (1.5rem)
radius.full   // 9999px
```

## 6. Breakpoints

```typescript
// Nutze Tailwind-Standard-Namen
breakpoint.sm   // 640px  - Mobile Landscape
breakpoint.md   // 768px  - Tablet
breakpoint.lg   // 1024px - Desktop
breakpoint.xl   // 1280px - Large Desktop
breakpoint.2xl  // 1536px - Extra Large
```

## 7. Z-Index

```typescript
// 10er-Schritte für Flexibilität
zIndex.auto       // auto
zIndex.0          // 0
zIndex.10         // 10   - Basis
zIndex.20         // 20   - Sticky Elements
zIndex.30         // 30   - Fixed Headers
zIndex.40         // 40   - Overlays
zIndex.50         // 50   - Modals
zIndex.dropdown   // 1000 - Dropdowns
zIndex.sticky     // 1020 - Sticky Elements
zIndex.fixed      // 1030 - Fixed Elements
zIndex.overlay    // 1040 - Overlays/Backdrops
zIndex.modal      // 1050 - Modals
zIndex.popover    // 1060 - Popovers
zIndex.tooltip    // 1070 - Tooltips
```

## 8. Transitions

### Duration
```typescript
duration.fast    // 150ms
duration.base    // 200ms
duration.slow    // 300ms
duration.slower  // 500ms
```

### Easing
```typescript
easing.linear    // linear
easing.in        // ease-in
easing.out       // ease-out
easing.inOut     // ease-in-out
```

## 9. Shadows

```typescript
shadow.xs   // Sehr klein
shadow.sm   // Klein
shadow.base // Standard
shadow.md   // Mittel
shadow.lg   // Groß
shadow.xl   // Extra groß
shadow.2xl  // Doppelt groß
shadow.none // Kein Schatten
```

## Verwendung in TokenUtils

```typescript
// Farben
TokenUtils.getColor('primary.500')
TokenUtils.getColorClass('bg', 'primary.500/10')  // Mit Opacity

// Spacing
TokenUtils.getSpacing('4')  // 16px
TokenUtils.getSpacingClass('p', '4')

// Größen
TokenUtils.getSize('icon.md')  // 20px

// Typography
TokenUtils.getFontSize('base')  // 16px
TokenUtils.getTextSizeClass('sm')
```

## Verbotene Patterns ❌

```typescript
// FALSCH - Keine Bindestriche
'primary-500'
'spacing-4'

// FALSCH - Keine camelCase
'primaryColor'
'iconSizeMedium'

// FALSCH - Keine Unterstrich
'primary_500'
'spacing_4'

// FALSCH - Keine redundanten Präfixe
'color-primary-500'  // 'color.' reicht
'size-icon-md'       // 'size.icon.' reicht
```

## Migration bestehender Tokens

```typescript
// Alt → Neu
'gray-*'     → 'neutral.*'
'orange-*'   → 'primary.*'
'blue-*'     → 'secondary.*' oder 'info.*'
'green-*'    → 'success.*'
'red-*'      → 'error.*'
'yellow-*'   → 'warning.*'
'amber-*'    → 'warning.*'
```

## Beispiele

```typescript
// Button mit Hover
const buttonClasses = cn(
  TokenUtils.getColorClass('bg', 'primary.500'),
  TokenUtils.getColorClass('hover:bg', 'primary.600'),
  TokenUtils.getSpacingClass('px', '4'),
  TokenUtils.getSpacingClass('py', '2'),
  TokenUtils.getRadiusClass('md')
);

// Alert mit Dark Mode
const alertClasses = cn(
  TokenUtils.getColorClass('bg', 'success.50'),
  TokenUtils.getColorClass('dark:bg', 'success.900/10'),
  TokenUtils.getColorClass('text', 'success.800'),
  TokenUtils.getColorClass('dark:text', 'success.200')
);

// Icon-Größe
const iconClasses = TokenUtils.getSize('icon.md'); // 'w-5 h-5'
```

---

Diese Konventionen sind ab sofort verbindlich für alle neuen Tokens! 📏
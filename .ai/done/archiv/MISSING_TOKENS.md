# Fehlende Tokens für 100% Migration

## Identifizierte fehlende Tokens

### 1. **Erweiterte Farbpalette**
Aktuell fehlen die dunklen Varianten (800, 900) für Status-Farben:

```typescript
// Benötigt für Alert Component (Dark Mode)
success.800  // bg-green-800
success.900  // bg-green-900
error.800    // bg-red-800
error.900    // bg-red-900
warning.800  // bg-yellow-800
warning.900  // bg-yellow-900
info.800     // bg-blue-800
info.900     // bg-blue-900

// Benötigt für neutrale Farben
neutral.50   // bg-gray-50 (sehr hell)
```

### 2. **Spezielle Spacing-Werte**
```typescript
// Für präzise Layouts
spacing.1.5  // 6px (0.375rem)
spacing.2.5  // 10px (0.625rem)
spacing.7    // 28px (1.75rem)
spacing.9    // 36px (2.25rem)
spacing.11   // 44px (2.75rem)
```

### 3. **Größen-Tokens**
```typescript
// Für Icon-Größen
size.icon.xs  // w-3 h-3 (12px)
size.icon.sm  // w-4 h-4 (16px)
size.icon.md  // w-5 h-5 (20px)
size.icon.lg  // w-6 h-6 (24px)
size.icon.xl  // w-8 h-8 (32px)

// Für Container-Breiten
size.container.sm   // max-w-sm (384px)
size.container.md   // max-w-md (448px)
size.container.lg   // max-w-lg (512px)
size.container.xl   // max-w-xl (576px)
size.container.2xl  // max-w-2xl (672px)
```

### 4. **Breakpoint-Tokens**
```typescript
// Für responsive Designs
breakpoint.sm   // 640px
breakpoint.md   // 768px
breakpoint.lg   // 1024px
breakpoint.xl   // 1280px
breakpoint.2xl  // 1536px
```

### 5. **Z-Index-Tokens**
```typescript
// Für Layer-Management
zIndex.dropdown    // 1000
zIndex.modal       // 1050
zIndex.popover     // 1060
zIndex.tooltip     // 1070
```

## Temporäre Lösung für Entwickler

Bis die Tokens genehmigt sind:

```typescript
// alert.component.ts
private getAlertClasses(type: AlertType): string {
  // TODO: Token-Request #123 - Warte auf success.900
  const darkColors = {
    success: 'dark:bg-green-900',  // Token-Request: success.900
    error: 'dark:bg-red-900',       // Token-Request: error.900
    warning: 'dark:bg-yellow-900',  // Token-Request: warning.900
    info: 'dark:bg-blue-900'        // Token-Request: info.900
  };
  
  return `${this.getLightColors(type)} ${darkColors[type]}`;
}
```

## Vorgehen

### 1. **Sofort**: Komponenten mit TODOs migrieren
```typescript
// Mit klarem Kommentar
'bg-green-900' // TODO: Token-Request #123 - success.900
```

### 2. **Diese Woche**: Token-Requests erstellen
- Ein Issue pro Token-Kategorie
- Begründung mit Use-Cases
- Screenshots der betroffenen Komponenten

### 3. **Nächste Woche**: Design-System-Meeting
- Tokens besprechen
- Naming-Konventionen klären
- Genehmigung einholen

### 4. **Nach Genehmigung**: Tokens hinzufügen
```typescript
// design-tokens.ts
export const tokens = {
  colors: {
    success: {
      // Neu hinzugefügt
      800: '#065f46',
      900: '#064e3b'
    }
  }
};
```

### 5. **Final**: TODOs entfernen
```typescript
// Vorher
'bg-green-900' // TODO: Token-Request #123

// Nachher
TokenUtils.getColorClass('bg', 'success.900')
```

## Priorisierung

### High Priority (blockiert viele Komponenten)
- [ ] Status-Farben 800/900
- [ ] Icon-Größen
- [ ] Breakpoints

### Medium Priority
- [ ] Erweiterte Spacing-Werte
- [ ] Container-Größen
- [ ] Z-Index

### Low Priority
- [ ] Spezielle Animationen
- [ ] Custom Shadows
- [ ] Gradient-Tokens
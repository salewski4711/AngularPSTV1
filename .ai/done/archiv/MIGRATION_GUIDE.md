# Component Classes Migration Guide

## ✅ Problem Solved

Die "Component imports must be standalone components" Fehler waren NICHT wegen fehlender `standalone: true` Markierung, sondern weil Angular's AOT Compiler die Template String Interpolationen nicht statisch analysieren konnte.

## 🎯 Die Lösung

1. **Zentrale statische Klassen-Definitionen** in `/core/design-system/component-classes/`
2. **Keine TokenUtils in Templates** - nur in TypeScript
3. **Computed Properties** für dynamische Klassen

## 📋 Migration Schritte

### 1. Import der neuen Klassen

```typescript
// Alt (verursacht Fehler)
import { TokenUtils } from '@core/design-system/token-utilities';

// Neu (funktioniert)
import { inputClasses, buttonClasses } from '@core/design-system/component-classes';
```

### 2. Template Migration

```typescript
// ❌ ALT - Template String Interpolation
template: `
  <div class="${TokenUtils.getColorClass('bg', 'primary')}">
  <button [class]="\`px-4 py-2 \${TokenUtils.getColorClass('text', 'white')}\`">
`

// ✅ NEU - Statische Klassen
template: `
  <div [class]="containerClass()">
  <button [class]="buttonClass()">
`
```

### 3. Component Class Migration

```typescript
// ❌ ALT - Template Strings in Component
export class MyComponent {
  getClasses() {
    return `${TokenUtils.getColorClass('bg', 'primary')} px-4`;
  }
}

// ✅ NEU - Computed Properties mit statischen Klassen
export class MyComponent {
  buttonClass = computed(() => {
    return [
      buttonClasses.base,
      buttonClasses.variants[this.variant],
      buttonClasses.sizes[this.size]
    ].join(' ');
  });
}
```

## 🚀 Beispiel: Input Component Migration

### Vorher (Fehler)
```typescript
template: `
  <input [class]="\`border \${TokenUtils.getColorClass('border', 'neutral.300')}\`" />
`
```

### Nachher (Funktioniert)
```typescript
import { inputClasses } from '@core/design-system/component-classes';

template: `
  <input [class]="inputClass()" />
`,

inputClass = computed(() => {
  const classes = [inputClasses.input.base];
  
  if (this.hasError()) {
    classes.push(inputClasses.input.states.error);
  } else {
    classes.push(inputClasses.input.states.default);
  }
  
  return classes.join(' ');
});
```

## 📁 Verfügbare Klassen

### Atoms (`atoms.classes.ts`)
- `buttonClasses` - Button-Komponente
- `inputClasses` - Input-Felder
- `badgeClasses` - Badges
- `checkboxClasses` - Checkboxen
- `radioClasses` - Radio Buttons
- `toggleClasses` - Toggle Switches
- `tagClasses` - Tags
- `spinnerClasses` - Spinner
- `skeletonClasses` - Skeleton Loader

### Molecules (`molecules.classes.ts`)
- `cardClasses` - Cards
- `modalClasses` - Modals
- `dropdownClasses` - Dropdowns
- `alertClasses` - Alerts
- `tabClasses` - Tabs
- `accordionClasses` - Accordions
- `breadcrumbClasses` - Breadcrumbs
- `paginationClasses` - Pagination

### Organisms (`organisms.classes.ts`)
- `navigationClasses` - Navigation
- `dashboardWidgetClasses` - Dashboard Widgets
- `tableClasses` - Tabellen
- `formLayoutClasses` - Form Layouts
- `stepperClasses` - Stepper
- `searchClasses` - Suche

## ⚠️ Wichtige Regeln

1. **NIEMALS TokenUtils in Templates verwenden**
2. **Immer Computed Properties für dynamische Klassen**
3. **Statische Klassen aus component-classes importieren**
4. **Bei neuen Komponenten: Klassen zuerst in component-classes definieren**

## 🔧 Automatisierung

Für Bulk-Migration kann ein Script verwendet werden, aber manuelle Überprüfung ist empfohlen für:
- Komplexe Logik
- Spezielle Animationen
- Custom Styling

## ✨ Vorteile

- ✅ Keine "Component imports must be standalone" Fehler mehr
- ✅ Bessere Performance (statische Analyse)
- ✅ Type-safe mit TypeScript
- ✅ Zentrale Verwaltung des Design Systems
- ✅ Einfachere Wartung
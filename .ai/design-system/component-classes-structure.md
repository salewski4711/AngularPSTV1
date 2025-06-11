# Component Classes Structure

## Vorgeschlagene Struktur

```
src/app/core/design-system/
├── token-utilities.ts         # Bleibt für dynamische Generierung
├── design-tokens.ts          # Token Definitionen
└── component-classes/        # NEU: Statische Klassen für Komponenten
    ├── index.ts
    ├── atoms.classes.ts      # Button, Input, Badge, etc.
    ├── molecules.classes.ts  # Card, Modal, Dropdown, etc.
    └── organisms.classes.ts  # Navigation, Dashboard, etc.
```

## Warum diese Struktur?

1. **Zentral im Design System** - Alle UI-Definitionen an einem Ort
2. **Atomic Design Pattern** - Passt zur bestehenden Komponenten-Struktur
3. **Build-Zeit Optimierung** - Klassen werden zur Build-Zeit generiert
4. **Type-Safe** - TypeScript Interfaces für alle Klassen
5. **DRY** - Single Source of Truth

## Beispiel: atoms.classes.ts

```typescript
import { TokenUtils } from '../token-utilities';

// Button Classes
export const buttonClasses = {
  base: [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ].join(' '),
  
  variants: {
    primary: [
      TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
      TokenUtils.getColorClass('text', 'white'),
      'hover:' + TokenUtils.getColorClass('bg', 'primary.600'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    secondary: [
      TokenUtils.getColorClass('bg', 'neutral.100'),
      TokenUtils.getColorClass('text', 'neutral.700'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.200'),
      'focus:' + TokenUtils.getColorClass('ring', 'neutral.500')
    ].join(' ')
  },
  
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
} as const;

// Input Classes
export const inputClasses = {
  container: 'w-full',
  
  input: {
    base: [
      'block w-full rounded-md',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2'
    ].join(' '),
    
    states: {
      default: [
        TokenUtils.getColorClass('border', 'neutral.300'),
        TokenUtils.getColorClass('text', 'neutral.900'),
        'focus:' + TokenUtils.getColorClass('border', 'primary.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
      ].join(' '),
      
      error: [
        TokenUtils.getColorClass('border', 'error.300'),
        TokenUtils.getColorClass('text', 'error.900'),
        'focus:' + TokenUtils.getColorClass('border', 'error.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'error.500')
      ].join(' ')
    }
  },
  
  label: {
    base: 'block text-sm font-medium mb-1',
    default: TokenUtils.getColorClass('text', 'neutral.700'),
    error: TokenUtils.getColorClass('text', 'error.600')
  }
} as const;
```

## Verwendung in Komponenten

```typescript
// button.component.ts
import { buttonClasses } from '@core/design-system/component-classes';

@Component({
  template: `
    <button [class]="buttonClass()">
      <ng-content />
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  buttonClass = computed(() => {
    return [
      buttonClasses.base,
      buttonClasses.variants[this.variant],
      buttonClasses.sizes[this.size]
    ].join(' ');
  });
}
```

## Migration Strategy

1. **Phase 1**: Erstelle component-classes für alle Atoms
2. **Phase 2**: Migriere Molecules 
3. **Phase 3**: Migriere Organisms
4. **Phase 4**: Entferne alle TokenUtils aus Templates

## Vorteile

- ✅ Statisch zur Build-Zeit
- ✅ Keine Template String Interpolation
- ✅ Type-safe mit TypeScript
- ✅ Zentral verwaltbar
- ✅ Folgt dem Design System
- ✅ Angular AOT kompatibel
# 📐 KOMPONENTEN-STANDARDS - Verbindliche Entwicklungsrichtlinien

## 🚨 PFLICHT-REGELN (Nicht verhandelbar!)

### 1. **KEINE hardcodierten Werte**
```typescript
// ❌ VERBOTEN
class ButtonComponent {
  buttonClasses = 'bg-orange-500 text-white px-4 py-2';
}

// ✅ RICHTIG
class ButtonComponent {
  buttonClasses = computed(() => 
    this.tokenUtils.getComponentClasses('button', this.variant, this.size)
  );
}
```

### 2. **Token-First Entwicklung**
Jede Komponente MUSS:
- Design Tokens für ALLE visuellen Eigenschaften nutzen
- Token-Utilities für Klassen-Generierung verwenden
- Semantische Token-Namen verwenden

## 🏗️ Komponenten-Architektur

### Basis-Struktur
```typescript
import { Component, Input, computed, ChangeDetectionStrategy } from '@angular/core';
import { TokenUtils } from '@core/design-system/token-utilities';
import { ComponentBase } from '@shared/components/base/component-base';

@Component({
  selector: 'pst-[component-name]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class [ComponentName]Component extends ComponentBase {
  // Inputs mit Typen
  @Input() variant: ComponentVariant = 'primary';
  @Input() size: ComponentSize = 'md';
  
  // Computed Properties für Klassen
  componentClasses = computed(() => 
    this.tokenUtils.getComponentClasses(
      '[component-name]',
      this.variant,
      this.size
    )
  );
  
  constructor(private tokenUtils: TokenUtils) {
    super();
  }
}
```

## 📋 Entwicklungs-Checkliste

### Vor der Entwicklung
- [ ] Token-Definition existiert in `tokens/semantic/[component].json`
- [ ] Interface/Types in `[component].types.ts` definiert
- [ ] Showcase-Route geplant

### Während der Entwicklung
- [ ] Alle visuellen Properties aus Tokens
- [ ] Computed Signals für reaktive Klassen
- [ ] ChangeDetectionStrategy.OnPush verwendet
- [ ] Accessibility-Attribute (ARIA) implementiert
- [ ] Loading/Error/Disabled States berücksichtigt

### Nach der Entwicklung
- [ ] Unit-Tests (min. 80% Coverage)
- [ ] Visual Tests mit Puppeteer
- [ ] Showcase-Seite erstellt
- [ ] Props-Dokumentation vollständig
- [ ] Barrierefreiheits-Test bestanden

## 🎨 Token-Mapping Patterns

### Size-Mapping
```typescript
// tokens/semantic/components.json
{
  "button": {
    "sizes": {
      "sm": {
        "padding": "{spacing.2} {spacing.3}",
        "fontSize": "{typography.fontSize.sm}",
        "height": "{sizing.8}"
      }
    }
  }
}

// Komponente
const sizeClasses = this.tokenUtils.getSizeClasses('button', this.size);
```

### Variant-Mapping
```typescript
// tokens/semantic/components.json
{
  "button": {
    "variants": {
      "primary": {
        "background": "{color.primary.500}",
        "hover": "{color.primary.600}",
        "text": "{color.white}"
      }
    }
  }
}
```

## 🧩 Gemeinsame Utilities

### ComponentBase Klasse
```typescript
// shared/components/base/component-base.ts
export abstract class ComponentBase {
  protected readonly destroy$ = new Subject<void>();
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### FormControlBase Klasse
```typescript
// shared/components/base/form-control-base.ts
export abstract class FormControlBase extends ComponentBase {
  @Input() label?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  @Input() required = false;
  @Input() disabled = false;
  
  // ControlValueAccessor Implementation
  // ...
}
```

## 🚫 Anti-Patterns

### 1. Inline-Styles
```typescript
// ❌ NIEMALS
template: `<div style="color: red">...</div>`

// ✅ Stattdessen
template: `<div [class]="errorClasses()">...</div>`
```

### 2. Direkte Farb-Referenzen
```typescript
// ❌ NIEMALS
'text-orange-500'
'bg-#F99600'

// ✅ Stattdessen
this.tokenUtils.getColorClass('text', 'primary.500')
```

### 3. Magische Zahlen
```typescript
// ❌ NIEMALS
'p-4' // Was ist 4?

// ✅ Stattdessen
this.tokenUtils.getSpacingClass('p', 'md') // Semantisch klar
```

## 📊 Konfigurationsobjekte

### Zentrale Konfiguration
```typescript
// shared/configs/component-configs.ts
export const COMPONENT_CONFIGS = {
  button: {
    variants: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    defaultVariant: 'primary',
    defaultSize: 'md'
  },
  input: {
    types: ['text', 'email', 'password', 'number', 'tel'],
    sizes: ['sm', 'md', 'lg'],
    defaultSize: 'md'
  }
  // ... weitere Komponenten
};
```

## 🧪 Test-Standards

### Unit-Test Template
```typescript
describe('ComponentName', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentNameComponent],
      providers: [TokenUtils]
    });
    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
  });
  
  describe('Token Integration', () => {
    it('sollte Token-basierte Klassen verwenden', () => {
      component.variant = 'primary';
      fixture.detectChanges();
      
      expect(component.componentClasses()).toContain('bg-primary');
    });
  });
  
  describe('Accessibility', () => {
    it('sollte korrekte ARIA-Attribute haben', () => {
      // Test Implementation
    });
  });
});
```

## 🔒 Enforcement

### Pre-Commit Hook
```bash
#!/bin/bash
# .husky/pre-commit

# Token-Usage Check
npm run lint:tokens

# Component Standards Check
npm run lint:components

# Test Coverage Check
npm run test:coverage -- --min=80
```

### ESLint Regeln
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-hardcoded-colors': 'error',
    'use-design-tokens': 'error',
    'component-naming': ['error', { prefix: 'pst' }]
  }
};
```
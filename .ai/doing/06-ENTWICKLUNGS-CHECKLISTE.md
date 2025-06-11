# ✅ ENTWICKLUNGS-CHECKLISTE - Mandatory für JEDE Komponente

## 🚨 DIESE CHECKLISTE IST PFLICHT!

Jeder Entwickler MUSS diese Checkliste für JEDE Komponente durchgehen. 
**Build wird BLOCKIERT wenn nicht alle Punkte erfüllt sind!**

---

## 📋 VOR DER ENTWICKLUNG

### Design Tokens
- [ ] Token-Definition existiert in `tokens/semantic/[component].json`
- [ ] Alle visuellen Properties haben Token-Referenzen
- [ ] Keine hardcodierten Farben/Größen geplant

### Architektur
- [ ] Component Interface in `[component].types.ts` definiert
- [ ] Showcase-Route in `showcase.routes.ts` geplant
- [ ] Dependencies identifiziert

### Setup
```bash
# Führe diesen Befehl aus BEVOR du startest:
npm run component:create -- --name=[component-name]
```

---

## 🛠️ WÄHREND DER ENTWICKLUNG

### Component Structure
```typescript
// ✅ MUSS so aussehen:
@Component({
  selector: 'pst-[component]',  // PFLICHT: pst- prefix
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // PFLICHT
  imports: [CommonModule, TokenUtils]  // PFLICHT: TokenUtils
})
export class [Component]Component extends ComponentBase {
  // ALLE visuellen Properties aus Tokens
  componentClasses = computed(() => 
    this.tokenUtils.getComponentClasses(...)
  );
}
```

### Token Usage Check
- [ ] KEINE Klasse wie `bg-orange-500` verwendet
- [ ] KEINE Hex-Farben wie `#F99600` im Code
- [ ] ALLE Farben über `TokenUtils.getColorClass()`
- [ ] ALLE Größen über `TokenUtils.getSizeClasses()`
- [ ] ALLE Abstände über `TokenUtils.getSpacingClass()`

### States & Accessibility
- [ ] Loading State implementiert
- [ ] Error State implementiert
- [ ] Disabled State implementiert
- [ ] Focus State sichtbar (Keyboard Navigation)
- [ ] ARIA Labels vorhanden
- [ ] Keyboard Navigation funktioniert

### Reactive Patterns
- [ ] Signals für State Management
- [ ] Computed für abgeleitete Werte
- [ ] OnPush Change Detection
- [ ] Keine Subscriptions ohne `takeUntil`

---

## 🧪 NACH DER ENTWICKLUNG

### Unit Tests (MINIMUM 80% Coverage!)
```bash
# Führe aus:
npm run test:component -- [component-name]
```

- [ ] Props Testing (alle Input-Kombinationen)
- [ ] Event Testing (alle Outputs)
- [ ] State Testing (loading, error, disabled)
- [ ] Token Integration Testing
- [ ] Accessibility Testing

### Visual Tests
```bash
# Führe aus:
npm run test:visual -- [component-name]
```

- [ ] Screenshot für Default State
- [ ] Screenshot für alle Varianten
- [ ] Screenshot für alle Größen
- [ ] Screenshot für Dark Mode
- [ ] Screenshot für Hover/Focus States

### Showcase Page
- [ ] Alle Varianten demonstriert
- [ ] Props Table vollständig
- [ ] Code Examples für jeden Use Case
- [ ] Interactive Playground
- [ ] Accessibility Notes

### Documentation
- [ ] README.md in Component-Ordner
- [ ] JSDoc für alle public methods
- [ ] Beispiele für häufige Use Cases
- [ ] Migration Guide (wenn replacing)

---

## 🔒 AUTOMATISCHE VALIDIERUNG

### Pre-Commit Checks (Blockiert Commit!)
```bash
✓ Token Usage Check
✓ Test Coverage > 80%
✓ No ESLint Errors
✓ No TypeScript Errors
✓ Visual Tests Pass
```

### CI/CD Checks (Blockiert Merge!)
```bash
✓ All Unit Tests Pass
✓ All Visual Tests Pass
✓ Bundle Size Check
✓ Performance Budget
✓ Security Scan
```

---

## 📝 COMPONENT TEMPLATE

```typescript
// Kopiere dieses Template für neue Komponenten:

import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentBase } from '@shared/components/base/component-base';
import { TokenUtils } from '@core/design-system/token-utilities';
import { [Component]Variant, [Component]Size } from './[component].types';

@Component({
  selector: 'pst-[component]',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()" [attr.aria-label]="ariaLabel">
      <!-- Component Template -->
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class [Component]Component extends ComponentBase {
  @Input() variant: [Component]Variant = 'primary';
  @Input() size: [Component]Size = 'md';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  
  @Output() [event] = new EventEmitter<void>();
  
  constructor(private tokenUtils: TokenUtils) {
    super();
  }
  
  containerClasses = computed(() => {
    return this.tokenUtils.getComponentClasses(
      '[component]',
      {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled
      }
    );
  });
}
```

---

## ⚠️ HÄUFIGE FEHLER (Werden automatisch erkannt!)

### ❌ FALSCH:
```typescript
// Hardcodierte Farbe
class="bg-orange-500 text-white"

// Direkte Tailwind-Klassen
class="p-4 m-2 rounded-lg"

// Inline Styles
[style.color]="'#F99600'"

// Magische Zahlen
padding: '16px'
```

### ✅ RICHTIG:
```typescript
// Token-basiert
[class]="tokenUtils.getColorClass('bg', 'primary.500')"

// Semantische Klassen
[class]="tokenUtils.getComponentClasses('button', variant, size)"

// Token-Referenzen
[style.color]="tokenUtils.getTokenValue('color.primary.500')"

// Benannte Größen
padding: tokenUtils.getSpacing('md')
```

---

## 🏆 DEFINITION OF DONE

Eine Komponente ist ERST DANN fertig, wenn:

1. ✅ Alle Checkboxen abgehakt
2. ✅ Code Review approved
3. ✅ Alle Tests grün
4. ✅ Visual Tests approved
5. ✅ Showcase Page live
6. ✅ Documentation complete
7. ✅ Performance Budget eingehalten
8. ✅ Accessibility Score 100%

**KEIN MERGE ohne 100% Erfüllung!**
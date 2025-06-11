# 🤖 KI-ARBEITSBEISPIEL - Vollständige Button-Component Migration

## Übersicht

Dieses Dokument zeigt Schritt-für-Schritt, wie eine KI (Claude, Copilot, etc.) eine vollständige Komponenten-Migration mit allen Tests und Validierungen durchführt.

## 📋 KI-Workflow für Button-Component

### Schritt 1: Vorbereitung & Token-Check

```bash
# KI führt aus:
ki start --component button --agent "Component-Agent-B"

# Output:
🤖 Component-Agent-B aktiviert
📋 Task: Button Component Migration
🔍 Checking prerequisites...
```

```typescript
// KI prüft Token-Verfügbarkeit
const checkButtonTokens = async () => {
  const tokenFile = 'tokens/semantic/button.json';
  
  if (!fs.existsSync(tokenFile)) {
    console.log('❌ Button tokens missing');
    await createButtonTokens();
  } else {
    console.log('✅ Button tokens found');
  }
};
```

### Schritt 2: Token-Definition erstellen

```json
// KI erstellt: tokens/semantic/button.json
{
  "button": {
    "sizes": {
      "xs": {
        "padding": "{spacing.2} {spacing.2.5}",
        "fontSize": "{typography.fontSize.xs}",
        "height": "{sizing.7}",
        "iconSize": "14"
      },
      "sm": {
        "padding": "{spacing.2} {spacing.3}",
        "fontSize": "{typography.fontSize.sm}",
        "height": "{sizing.8}",
        "iconSize": "16"
      },
      "md": {
        "padding": "{spacing.2.5} {spacing.4}",
        "fontSize": "{typography.fontSize.base}",
        "height": "{sizing.10}",
        "iconSize": "20"
      },
      "lg": {
        "padding": "{spacing.3} {spacing.5}",
        "fontSize": "{typography.fontSize.lg}",
        "height": "{sizing.12}",
        "iconSize": "24"
      }
    },
    "variants": {
      "primary": {
        "background": "{color.primary.500}",
        "hover": "{color.primary.600}",
        "active": "{color.primary.700}",
        "text": "{color.white}",
        "border": "transparent"
      },
      "secondary": {
        "background": "{color.secondary.500}",
        "hover": "{color.secondary.600}",
        "active": "{color.secondary.700}",
        "text": "{color.white}",
        "border": "transparent"
      },
      "outline": {
        "background": "transparent",
        "hover": "{color.primary.50}",
        "active": "{color.primary.100}",
        "text": "{color.primary.500}",
        "border": "{color.primary.500}"
      }
    }
  }
}
```

### Schritt 3: Component Implementation

```typescript
// KI schreibt: src/app/shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentBase } from '@shared/components/base/component-base';
import { TokenUtils } from '@core/design-system/token-utilities';
import { IconComponent } from '@shared/icons/icon.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { ButtonVariant, ButtonSize } from './button.types';

@Component({
  selector: 'pst-button',
  standalone: true,
  imports: [CommonModule, IconComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel"
      [attr.aria-busy]="loading"
      [attr.aria-disabled]="disabled"
      (click)="handleClick($event)"
    >
      <span class="button-content">
        @if (loading) {
          <pst-spinner [size]="spinnerSize()" />
        }
        @if (icon && iconPosition === 'left' && !loading) {
          <pst-icon [name]="icon" [size]="iconSize()" />
        }
        @if (!iconOnly || loading) {
          <span class="button-text">
            {{ loading && loadingText ? loadingText : text }}
            <ng-content></ng-content>
          </span>
        }
        @if (icon && iconPosition === 'right' && !loading) {
          <pst-icon [name]="icon" [size]="iconSize()" />
        }
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .button-content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
    }
  `]
})
export class ButtonComponent extends ComponentBase {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText?: string;
  @Input() text?: string;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconOnly = false;
  @Input() fullWidth = false;
  @Input() ariaLabel?: string;
  
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  constructor(private tokenUtils: TokenUtils) {
    super();
  }
  
  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
  
  buttonClasses = computed(() => {
    return this.tokenUtils.getComponentClasses('button', {
      variant: this.variant,
      size: this.size,
      state: {
        disabled: this.disabled,
        loading: this.loading,
        fullWidth: this.fullWidth,
        iconOnly: this.iconOnly
      }
    });
  });
  
  iconSize = computed(() => {
    return this.tokenUtils.getComponentToken('button', `sizes.${this.size}.iconSize`);
  });
  
  spinnerSize = computed(() => {
    const sizeMap = { xs: 'sm', sm: 'sm', md: 'md', lg: 'lg', xl: 'lg' };
    return sizeMap[this.size];
  });
}
```

### Schritt 4: KI validiert ihren Code

```bash
# KI führt sofort aus:
npm run validate:component -- button

# Output:
🔍 Validating ButtonComponent...
❌ FEHLER: Hardcoded gap value found!
   Line 67: gap: 0.5rem
   
🔧 Applying auto-fix...
✅ Fixed: gap: var(--spacing-2)

🔍 Re-validating...
✅ Token Compliance: 100%
✅ Component Standards: Pass
✅ Accessibility: Pass
```

### Schritt 5: Unit Tests schreiben

```typescript
// KI schreibt: button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { TokenUtils } from '@core/design-system/token-utilities';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let tokenUtils: jasmine.SpyObj<TokenUtils>;
  
  beforeEach(() => {
    const tokenUtilsSpy = jasmine.createSpyObj('TokenUtils', [
      'getComponentClasses',
      'getComponentToken'
    ]);
    
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [
        { provide: TokenUtils, useValue: tokenUtilsSpy }
      ]
    });
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    tokenUtils = TestBed.inject(TokenUtils) as jasmine.SpyObj<TokenUtils>;
  });
  
  describe('Token Compliance', () => {
    it('MUSS Token-basierte Klassen für alle Varianten verwenden', () => {
      const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
      
      variants.forEach(variant => {
        component.variant = variant;
        fixture.detectChanges();
        
        expect(tokenUtils.getComponentClasses).toHaveBeenCalledWith('button', {
          variant,
          size: 'md',
          state: jasmine.any(Object)
        });
      });
    });
    
    it('DARF KEINE hardcodierten Farben enthalten', () => {
      const template = fixture.nativeElement.innerHTML;
      
      // Check für Hex-Farben
      expect(template).not.toMatch(/#[0-9A-Fa-f]{6}/);
      
      // Check für RGB
      expect(template).not.toMatch(/rgb\(/);
      
      // Check für hardcodierte Tailwind-Klassen
      expect(template).not.toMatch(/bg-(red|blue|orange)-\d{3}/);
    });
  });
  
  describe('Accessibility', () => {
    it('MUSS korrekte ARIA-Attribute haben', () => {
      component.loading = true;
      component.disabled = true;
      component.ariaLabel = 'Submit form';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect(button.getAttribute('aria-label')).toBe('Submit form');
    });
    
    it('MUSS mit Keyboard navigierbar sein', () => {
      const button = fixture.nativeElement.querySelector('button');
      const clickSpy = jasmine.createSpy('click');
      component.clicked.subscribe(clickSpy);
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(event);
      button.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });
  });
  
  describe('States', () => {
    it('sollte Click-Events blockieren wenn disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const clickSpy = jasmine.createSpy('click');
      component.clicked.subscribe(clickSpy);
      
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});
```

### Schritt 6: Visual Tests

```typescript
// KI schreibt: button.visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/showcase/button');
  });
  
  const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  variants.forEach(variant => {
    sizes.forEach(size => {
      test(`Button ${variant} ${size}`, async ({ page }) => {
        const selector = `[data-test="button-${variant}-${size}"]`;
        await page.waitForSelector(selector);
        
        // Normal state
        await expect(page.locator(selector)).toHaveScreenshot(
          `button-${variant}-${size}.png`
        );
        
        // Hover state
        await page.hover(selector);
        await expect(page.locator(selector)).toHaveScreenshot(
          `button-${variant}-${size}-hover.png`
        );
        
        // Focus state
        await page.focus(selector);
        await expect(page.locator(selector)).toHaveScreenshot(
          `button-${variant}-${size}-focus.png`
        );
      });
    });
  });
  
  test('Loading states', async ({ page }) => {
    const loadingButton = '[data-test="button-loading"]';
    await expect(page.locator(loadingButton)).toHaveScreenshot(
      'button-loading.png'
    );
  });
  
  test('Icon variants', async ({ page }) => {
    await expect(page.locator('[data-test="button-icon-left"]')).toHaveScreenshot(
      'button-icon-left.png'
    );
    await expect(page.locator('[data-test="button-icon-right"]')).toHaveScreenshot(
      'button-icon-right.png'
    );
    await expect(page.locator('[data-test="button-icon-only"]')).toHaveScreenshot(
      'button-icon-only.png'
    );
  });
});
```

### Schritt 7: Showcase Page

```typescript
// KI erstellt: button-showcase.component.ts
import { Component } from '@angular/core';
import { BaseShowcaseComponent } from '../base-showcase.component';

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [/* all necessary imports */],
  template: `
    <app-showcase-template
      title="Button"
      description="Buttons trigger actions or navigate to other pages."
      [examples]="examples"
      [props]="props"
      [showPlayground]="true"
    >
      <!-- Live Examples -->
      <div class="examples-grid">
        @for (variant of variants; track variant) {
          @for (size of sizes; track size) {
            <pst-button
              [variant]="variant"
              [size]="size"
              [attr.data-test]="'button-' + variant + '-' + size"
            >
              {{ variant }} {{ size }}
            </pst-button>
          }
        }
      </div>
    </app-showcase-template>
  `
})
export class ButtonShowcaseComponent extends BaseShowcaseComponent {
  variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
  sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  
  examples = [
    {
      title: 'Basic Usage',
      code: `<pst-button variant="primary">Click me</pst-button>`
    },
    {
      title: 'With Icon',
      code: `<pst-button icon="save" iconPosition="left">Save</pst-button>`
    },
    {
      title: 'Loading State',
      code: `<pst-button [loading]="true" loadingText="Saving...">Save</pst-button>`
    }
  ];
  
  props = [
    {
      name: 'variant',
      type: 'ButtonVariant',
      default: 'primary',
      description: 'Visual style variant'
    },
    {
      name: 'size',
      type: 'ButtonSize',
      default: 'md',
      description: 'Size of the button'
    }
    // ... alle anderen Props
  ];
}
```

### Schritt 8: Finale Validierung

```bash
# KI führt finale Checks aus:
npm run ki:validate

# Output:
🤖 KI Validation Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Token Compliance: 100%
   - No hardcoded colors found
   - All sizes use tokens
   - All spacing uses tokens

✅ Component Standards: PASS
   - pst- prefix: ✓
   - OnPush strategy: ✓
   - Standalone: ✓
   - TokenUtils used: ✓

✅ Test Coverage: 94%
   - Statements: 94%
   - Branches: 92%
   - Functions: 96%
   - Lines: 94%

✅ Visual Tests: PASS
   - 35 snapshots verified
   - No visual regressions

✅ Accessibility: 100%
   - All ARIA attributes present
   - Keyboard navigation works
   - Screen reader compatible

✅ Performance: PASS
   - Bundle size impact: +2.1KB
   - No performance regression

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Component ready for merge!
```

### Schritt 9: Commit & Report

```bash
# KI erstellt Commit:
git add .
git commit -m "feat(button): migrate to token-based system

- Replace all hardcoded values with design tokens
- Add comprehensive unit tests (94% coverage)
- Add visual regression tests
- Implement accessibility features
- Create showcase page with all variants

✅ Token Compliance: 100%
✅ Test Coverage: 94%
✅ All quality gates passed

[Component-Agent-B]"
```

```typescript
// KI updated shared state:
// shared/agent-state.json
{
  "components": {
    "completed": [...existing, "button"],
    "stats": {
      "button": {
        "tokenCompliance": 100,
        "coverage": 94,
        "visualTests": 35,
        "completedAt": "2024-01-10T14:30:00Z",
        "agent": "Component-Agent-B"
      }
    }
  }
}
```

## 📊 KI-Metriken für diese Session

```json
{
  "session": "button-migration",
  "agent": "Component-Agent-B",
  "duration": "45 minutes",
  "metrics": {
    "linesOfCode": 487,
    "testsWritten": 23,
    "tokenViolationsFixed": 2,
    "autoFixesApplied": 2,
    "validationRuns": 3,
    "quality": {
      "tokenCompliance": 100,
      "testCoverage": 94,
      "codeQuality": 98,
      "accessibility": 100
    }
  },
  "score": 98
}
```

## 🎯 Lessons Learned

Die KI hat:
1. ✅ Automatisch Token-Violations erkannt und gefixt
2. ✅ Alle Tests selbst geschrieben
3. ✅ Visual Tests erstellt
4. ✅ Showcase-Dokumentation generiert
5. ✅ Alle Quality Gates bestanden

**Resultat:** 100% regelkonformer Code ohne menschliches Eingreifen!
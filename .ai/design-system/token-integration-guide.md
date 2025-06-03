# Integration des CRM Design Token Systems in Angular

## Übersicht

Das CRM Design Token System bietet:
- ✅ Vollständige Farbpalette mit ProSolarTec Branding
- ✅ Typography-System mit Inter Font
- ✅ 8px-basiertes Spacing System  
- ✅ Dark Mode Support
- ✅ Komponenten-spezifische Tokens
- ✅ Tailwind Config Integration

## 1. Token Integration in Angular

### A. Token Service erstellen

```typescript
// src/app/design-system/services/design-tokens.service.ts
import { Injectable } from '@angular/core';
import * as colorTokens from 'path-to-tokens/colors.json';
import * as typographyTokens from 'path-to-tokens/typography.json';
import * as spacingTokens from 'path-to-tokens/spacing.json';

@Injectable({ providedIn: 'root' })
export class DesignTokensService {
  readonly colors = colorTokens.color;
  readonly typography = typographyTokens;
  readonly spacing = spacingTokens.spacing;
  
  getColor(path: string): string {
    // Beispiel: getColor('semantic.primary') => '#F99600'
    return this.resolvePath(this.colors, path);
  }
  
  private resolvePath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj)?.value || '';
  }
}
```

### B. Tailwind Config übernehmen

```javascript
// tailwind.config.js
const tokenConfig = require('./path-to-tokens/tailwind.config/tailwind.config.js');

module.exports = {
  ...tokenConfig,
  content: [
    "./src/**/*.{html,ts}",
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## 2. Typography Component mit Token System

```typescript
// src/app/design-system/components/typography/typography.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button' | 'label';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <component 
      [is]="elementMap[variant]" 
      [class]="classes"
      [class.dark:text-white-dark]="!color">
      <ng-content></ng-content>
    </component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyComponent {
  @Input() variant: TypographyVariant = 'body';
  @Input() color?: string;
  @Input() className?: string;
  
  elementMap = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    body: 'p',
    caption: 'span',
    button: 'span',
    label: 'label'
  };
  
  variantClasses = {
    h1: 'text-2xl font-bold leading-tight tracking-tight',
    h2: 'text-xl font-semibold leading-tight tracking-tight',
    h3: 'text-lg font-semibold leading-tight tracking-tight',
    body: 'text-base font-normal leading-normal',
    caption: 'text-xs font-normal leading-normal',
    button: 'text-sm font-medium leading-normal tracking-wide',
    label: 'text-sm font-medium leading-normal'
  };
  
  get classes(): string {
    return `${this.variantClasses[this.variant]} ${this.className || ''}`;
  }
}
```

## 3. Grid & Layout System

```typescript
// src/app/design-system/components/grid/container.component.ts
@Component({
  selector: 'app-container',
  standalone: true,
  template: `
    <div [class]="containerClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {
  @Input() fluid = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'xl';
  
  get containerClasses(): string {
    const base = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
    
    if (this.fluid) return base;
    
    const sizes = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md', 
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl'
    };
    
    return `${base} ${sizes[this.size]}`;
  }
}

// src/app/design-system/components/grid/grid.component.ts
@Component({
  selector: 'app-grid',
  standalone: true,
  template: `<div [class]="gridClasses"><ng-content></ng-content></div>`
})
export class GridComponent {
  @Input() cols: 1 | 2 | 3 | 4 | 6 | 12 = 12;
  @Input() gap: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 = 4;
  @Input() responsive = true;
  
  get gridClasses(): string {
    if (!this.responsive) {
      return `grid grid-cols-${this.cols} gap-${this.gap}`;
    }
    
    // Responsive grid
    return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${this.cols} gap-${this.gap}`;
  }
}
```

## 4. Button Update mit Token System

```typescript
// Aktualisiere deine button-beta.component.ts mit den Token-basierten Farben:

private getVariantClasses(): string {
  const variants = {
    'primary': `
      bg-primary text-white 
      hover:bg-primary-hover 
      active:bg-[#CC7A00] 
      focus:ring-primary
    `,
    'secondary': `
      bg-secondary text-white 
      hover:bg-[#152d4f] 
      active:bg-[#0f2138] 
      focus:ring-secondary
    `,
    'outline-primary': `
      bg-transparent text-primary border border-primary
      hover:bg-orange-50 dark:hover:bg-orange-500/10
      active:bg-orange-100 dark:active:bg-orange-500/20
      focus:ring-primary
    `,
    'tertiary': `
      bg-transparent text-gray-600 dark:text-gray-200 
      border border-gray-300 dark:border-gray-600
      hover:bg-gray-100 dark:hover:bg-gray-800
      hover:border-gray-400 dark:hover:border-gray-500
      active:bg-gray-200 dark:active:bg-gray-700
      focus:ring-gray-500
    `,
    'ghost': `
      bg-transparent text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
      active:bg-gray-200 dark:active:bg-gray-700
      focus:ring-gray-500
    `,
    'danger': `
      bg-error text-white
      hover:bg-red-600
      active:bg-red-700
      focus:ring-error
    `
  };
  
  return variants[this.variant] || variants.primary;
}
```

## 5. Spacing Utilities

```typescript
// src/app/design-system/directives/spacing.directive.ts
@Directive({
  selector: '[appSpacing]',
  standalone: true
})
export class SpacingDirective {
  @Input() set appSpacing(value: string) {
    // Beispiel: appSpacing="p-4 m-2" 
    this.renderer.setAttribute(this.el.nativeElement, 'class', value);
  }
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
}
```

## 6. Theme Service für Dark Mode

```typescript
// src/app/design-system/services/theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = signal(false);
  
  constructor() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode.set(prefersDark.matches);
    
    // Apply theme
    this.applyTheme();
  }
  
  toggleDarkMode() {
    this.darkMode.update(v => !v);
    this.applyTheme();
  }
  
  private applyTheme() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
```

## 7. Komponenten-Struktur

```
src/app/design-system/
├── tokens/                    # Kopiere die Token JSONs hierher
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── components-*.json
├── services/
│   ├── design-tokens.service.ts
│   └── theme.service.ts
├── components/
│   ├── typography/
│   ├── grid/
│   ├── container/
│   └── spacing/
├── directives/
│   └── spacing.directive.ts
└── design-system.module.ts    # Exportiert alle Komponenten
```

## Nächste Schritte

1. **Tokens kopieren**: Kopiere die Token-Dateien in dein Angular-Projekt
2. **Tailwind anpassen**: Verwende die vorhandene tailwind.config.js
3. **Komponenten migrieren**: Aktualisiere bestehende Komponenten mit Token-Werten
4. **Dokumentation**: Erstelle Storybook Stories für alle Komponenten
5. **Testing**: Schreibe Tests für Token-Integration

Das System ist bereits sehr durchdacht mit Dark Mode Support, WCAG-konformen Farben und einem konsistenten 8px Grid!

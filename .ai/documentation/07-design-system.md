# Design System

## 🎨 Übersicht

Das ProSolarTec Design System basiert auf einem modernen, konsistenten und skalierbaren Ansatz für UI/UX Design. Es kombiniert Tailwind CSS mit Angular-spezifischen Komponenten und Custom Design Tokens.

## 🎯 Design Prinzipien

### 1. Klarheit
- Einfache, verständliche Interfaces
- Klare visuelle Hierarchie
- Konsistente Interaktionsmuster

### 2. Effizienz
- Schnelle Ladezeiten
- Optimierte Animationen
- Minimale kognitive Belastung

### 3. Zugänglichkeit
- WCAG 2.1 AA Konformität
- Keyboard-Navigation
- Screen-Reader Support

### 4. Responsivität
- Mobile-First Ansatz
- Fluid Typography
- Flexible Layouts

## 🎨 Farb-System

### Brand Colors
```scss
// Primary - ProSolarTec Orange
$primary: #F99600;
$primary-light: #FFB84D;
$primary-dark: #CC7A00;

// Secondary - ProSolarTec Blue  
$secondary: #1C3661;
$secondary-light: #2B4A7F;
$secondary-dark: #0F1F3B;

// Semantic Colors
$success: #10B981;
$warning: #F59E0B;
$danger: #EF4444;
$info: #3B82F6;
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F99600',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F99600',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        secondary: {
          DEFAULT: '#1C3661',
          // ... weitere Abstufungen
        }
      }
    }
  }
}
```

### Dark Mode
```css
/* Automatic Dark Mode Support */
.dark {
  --bg-primary: #0F1F3B;
  --text-primary: #F3F4F6;
  --border-color: #374151;
}
```

## 📐 Typography

### Font Stack
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale
```scss
// Fluid Typography mit clamp()
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
--text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
```

### Usage Example
```html
<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
  Hauptüberschrift
</h1>
<p class="text-base text-gray-600 dark:text-gray-400">
  Body Text mit optimaler Lesbarkeit
</p>
```

## 📏 Spacing System

### Base Unit: 4px
```scss
// Spacing Scale (rem)
$spacing: (
  0: 0,
  1: 0.25rem,  // 4px
  2: 0.5rem,   // 8px
  3: 0.75rem,  // 12px
  4: 1rem,     // 16px
  5: 1.25rem,  // 20px
  6: 1.5rem,   // 24px
  8: 2rem,     // 32px
  10: 2.5rem,  // 40px
  12: 3rem,    // 48px
  16: 4rem,    // 64px
  20: 5rem,    // 80px
  24: 6rem     // 96px
);
```

### Layout Grid
```scss
// 12-Column Grid System
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
}
```

## 🧩 Component Design

### Component Anatomy
```typescript
// Button Example
interface ButtonDesign {
  // Base Styles
  base: 'inline-flex items-center justify-center font-medium transition-colors';
  
  // Size Variants
  sizes: {
    xs: 'px-2.5 py-1.5 text-xs';
    sm: 'px-3 py-2 text-sm';
    md: 'px-4 py-2 text-base';
    lg: 'px-5 py-2.5 text-lg';
    xl: 'px-6 py-3 text-xl';
  };
  
  // Visual Variants
  variants: {
    primary: 'bg-primary text-white hover:bg-primary-dark';
    secondary: 'bg-secondary text-white hover:bg-secondary-dark';
    outline: 'border-2 border-primary text-primary hover:bg-primary-50';
  };
}
```

### Design Tokens
```typescript
// src/app/core/design-system/design-tokens.ts
export const designTokens = {
  colors: {
    brand: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)'
    },
    semantic: {
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      danger: 'var(--color-danger)',
      info: 'var(--color-info)'
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};
```

## 🎭 Animationen

### Transition Presets
```scss
// Timing Functions
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);

// Durations
--duration-75: 75ms;
--duration-100: 100ms;
--duration-150: 150ms;
--duration-200: 200ms;
--duration-300: 300ms;
--duration-500: 500ms;
```

### Animation Examples
```scss
// Hover Effect
.button {
  transition: all var(--duration-200) var(--ease-in-out);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

// Ripple Effect
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

// Skeleton Loading
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

## 🌓 Theme System

### Theme Service
```typescript
export class ThemeService {
  private isDarkMode = signal(false);
  
  toggleTheme() {
    this.isDarkMode.update(v => !v);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }
  
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }
}
```

### CSS Variables
```css
:root {
  /* Light Theme */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F3F4F6;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --border-color: #E5E7EB;
}

.dark {
  /* Dark Theme */
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --border-color: #334155;
}
```

## ♿ Accessibility

### Focus Styles
```scss
// Visible Focus Indicators
.focus-visible:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

// Skip Links
.skip-link {
  position: absolute;
  left: -9999px;
  
  &:focus {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
}
```

### ARIA Patterns
```html
<!-- Button with Loading State -->
<button 
  [attr.aria-busy]="loading"
  [attr.aria-disabled]="disabled || loading"
  [attr.aria-label]="ariaLabel || null"
>
  <span [attr.aria-hidden]="loading">{{ text }}</span>
  <app-spinner *ngIf="loading" aria-label="Loading"></app-spinner>
</button>

<!-- Form Field -->
<div class="form-field">
  <label for="email" class="required">Email</label>
  <input 
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
  >
  <span id="email-error" role="alert" class="error">
    Please enter a valid email
  </span>
</div>
```

## 📱 Responsive Design

### Breakpoints
```scss
$breakpoints: (
  'sm': 640px,   // Mobile landscape
  'md': 768px,   // Tablet
  'lg': 1024px,  // Desktop
  'xl': 1280px,  // Large desktop
  '2xl': 1536px  // Extra large
);
```

### Mobile-First Approach
```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Grid Items -->
</div>

<!-- Responsive Typography -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl">
  Responsive Heading
</h1>

<!-- Responsive Spacing -->
<div class="p-4 sm:p-6 lg:p-8">
  Content with responsive padding
</div>
```

## 🔧 Design Tools

### Figma Integration
- Component Library in Figma
- Design Tokens synchronisiert
- Auto-Layout für Responsiveness
- Prototyping für Interaktionen

### Development Tools
```bash
# Tailwind CSS IntelliSense
# PostCSS Language Support
# Stylelint für CSS Linting
```

### Design Token Generator
```typescript
// Generate CSS from tokens
function generateCSSVariables(tokens: DesignTokens): string {
  return Object.entries(tokens).map(([key, value]) => {
    return `--${key}: ${value};`;
  }).join('\n');
}
```
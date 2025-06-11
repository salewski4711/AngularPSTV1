# 📚 Component Showcase Implementation Plan

## Konzept: Living Style Guide für AngularV1

### Struktur-Vorschlag:

```
src/app/
├── features/
│   ├── components-showcase/        # NEU: Komponenten-Dokumentation
│   │   ├── showcase-layout/
│   │   │   ├── showcase-layout.component.ts
│   │   │   └── showcase-sidebar.component.ts
│   │   ├── pages/
│   │   │   ├── atoms/
│   │   │   │   ├── button-showcase.component.ts
│   │   │   │   ├── input-showcase.component.ts
│   │   │   │   ├── select-showcase.component.ts
│   │   │   │   ├── checkbox-showcase.component.ts
│   │   │   │   ├── radio-showcase.component.ts
│   │   │   │   ├── toggle-showcase.component.ts
│   │   │   │   ├── badge-showcase.component.ts
│   │   │   │   └── avatar-showcase.component.ts
│   │   │   ├── molecules/
│   │   │   │   ├── form-group-showcase.component.ts
│   │   │   │   └── card-showcase.component.ts
│   │   │   └── organisms/
│   │   │       └── form-showcase.component.ts
│   │   └── components-showcase.routes.ts
│   └── beta/                       # Existing Beta-Playground
└── app.routes.ts

```

## Route: `/components`

### Navigation-Struktur:
```
/components
  /components/atoms/button
  /components/atoms/input
  /components/atoms/select
  /components/atoms/checkbox
  /components/atoms/radio
  /components/atoms/toggle
  /components/atoms/badge
  /components/atoms/avatar
  /components/molecules/...
  /components/organisms/...
```

## Features des Component Showcase:

### 1. Sidebar Navigation
- Kategorisiert nach Atomic Design (Atoms, Molecules, Organisms)
- Suchfunktion
- Favoriten markieren
- Status-Badges (Stable, Beta, Deprecated)

### 2. Component Display Features
- **Live Preview** - Interaktive Komponente
- **Code Examples** - Copy-to-clipboard
- **Props Table** - Alle verfügbaren Properties
- **Playground** - Live-Editor für Props
- **Accessibility Info** - ARIA Guidelines
- **Design Tokens** - Verwendete Tokens
- **Version History** - Changelog

### 3. Beispiel-Struktur für Button Showcase:

```typescript
// button-showcase.component.ts
@Component({
  selector: 'pst-button-showcase',
  standalone: true,
  template: `
    <div class="showcase-container">
      <!-- Header -->
      <h1>Button Component</h1>
      <pst-badge variant="success">Stable</pst-badge>
      
      <!-- Description -->
      <section>
        <h2>Overview</h2>
        <p>Buttons trigger actions in forms, dialogs, and more...</p>
      </section>

      <!-- Live Examples -->
      <section>
        <h2>Variants</h2>
        <div class="example-grid">
          <pst-button variant="primary">Primary</pst-button>
          <pst-button variant="secondary">Secondary</pst-button>
          <pst-button variant="ghost">Ghost</pst-button>
        </div>
      </section>

      <!-- Interactive Playground -->
      <section>
        <h2>Playground</h2>
        <div class="playground">
          <div class="controls">
            <pst-select [(ngModel)]="variant" label="Variant">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </pst-select>
            <!-- More controls... -->
          </div>
          <div class="preview">
            <pst-button [variant]="variant" [size]="size">
              {{ text }}
            </pst-button>
          </div>
        </div>
      </section>

      <!-- Code Examples -->
      <section>
        <h2>Code</h2>
        <pst-code-block [code]="currentCode" language="html" />
      </section>

      <!-- Props Table -->
      <section>
        <h2>Properties</h2>
        <pst-props-table [props]="buttonProps" />
      </section>
    </div>
  `
})
export class ButtonShowcaseComponent {
  // Playground state
  variant = 'primary';
  size = 'md';
  text = 'Click me';
  
  // Dynamic code generation
  get currentCode() {
    return `<pst-button variant="${this.variant}" size="${this.size}">
  ${this.text}
</pst-button>`;
  }
  
  buttonProps = [
    { name: 'variant', type: 'string', default: 'primary', description: 'Button style variant' },
    { name: 'size', type: 'string', default: 'md', description: 'Button size' },
    // ...
  ];
}
```

## Vorteile:

1. **Zentrale Dokumentation** - Alle Komponenten an einem Ort
2. **Interaktiv** - Entwickler können direkt testen
3. **Copy & Paste** - Fertiger Code zum Kopieren
4. **Konsistenz** - Sicherstellt einheitliche Verwendung
5. **Onboarding** - Neue Entwickler lernen schnell
6. **QA** - Visueller Regression Test
7. **Design Handoff** - Designer sehen Implementation

## Implementation Steps:

1. **Phase 1**: Basic Structure
   - Routes einrichten
   - Layout Component
   - Navigation

2. **Phase 2**: Showcase Components
   - Template für Showcase Pages
   - Code-Block Component
   - Props-Table Component

3. **Phase 3**: Content
   - Alle Atom Components dokumentieren
   - Interaktive Beispiele
   - Best Practices

## Alternative: Storybook Integration

Falls ihr mehr Features wollt:
```bash
npm install @storybook/angular --save-dev
npx storybook init
```

Vorteile von Storybook:
- Mehr Features out-of-the-box
- Community Addons
- Automatische Dokumentation
- Visual Testing Tools

## Empfehlung:

Startet mit der Custom-Lösung für:
- Volle Kontrolle
- Kein Extra-Tool
- Tailwind-Integration
- Angular-Native

Wechselt zu Storybook wenn:
- Team wächst
- Mehr Automatisierung gewünscht
- External Stakeholder

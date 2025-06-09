# Showcase Component Guide

## Übersicht
Die `ShowcaseTemplateComponent` ist das Standard-Pattern für alle Component-Showcases in diesem Projekt. Sie folgt modernen Angular v20 Standards mit Standalone Components und Signals.

## Wie man eine neue Showcase-Komponente erstellt

### 1. Basis-Struktur

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-[component-name]-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      [title]="title"
      [description]="description"
      [sections]="sections"
      [props]="props"
      [events]="events"
      [bestPractices]="bestPractices"
      [playgroundConfig]="playgroundConfig"
    />
  `
})
export class [ComponentName]ShowcaseComponent {
  // Pflichtfelder
  title = 'Component Name';
  description = 'Kurze Beschreibung der Komponente und ihres Zwecks.';
  
  // Code-Beispiele
  sections = [
    {
      title: 'Basic Usage',
      description: 'Einfaches Beispiel der Komponente.',
      code: `<pst-component>Content</pst-component>`
    },
    {
      title: 'Advanced Features',
      description: 'Erweiterte Funktionen und Konfigurationen.',
      code: `<pst-component 
  [property]="value"
  (event)="handler($event)">
  Complex content
</pst-component>`
    }
  ];
  
  // Props-Dokumentation
  props = [
    {
      name: 'property',
      type: 'string',
      default: '""',
      description: 'Beschreibung der Property'
    }
  ];
  
  // Events-Dokumentation (optional)
  events = [
    {
      name: 'eventName',
      type: 'EventEmitter<string>',
      description: 'Wird ausgelöst wenn...'
    }
  ];
  
  // Best Practices
  bestPractices = {
    do: [
      'Verwende klare und aussagekräftige Labels',
      'Stelle Feedback für Benutzeraktionen bereit',
      'Folge den Accessibility-Guidelines'
    ],
    dont: [
      'Vermeide zu viele Optionen auf einmal',
      'Keine wichtigen Aktionen ohne Bestätigung',
      'Verstecke keine kritischen Informationen'
    ]
  };
  
  // Optional: Interaktiver Playground
  playgroundConfig = {
    component: YourComponent,
    props: [
      {
        name: 'variant',
        type: 'enum',
        options: ['primary', 'secondary', 'danger'],
        defaultValue: 'primary',
        description: 'Visual style variant'
      }
    ]
  };
}
```

## Wichtige Regeln

### ✅ DO's:
1. **Immer alle Pflichtfelder ausfüllen** (title, description, sections, props)
2. **Mindestens 2-3 Code-Beispiele** pro Komponente
3. **Best Practices im do/dont Format**
4. **Props mit korrekten TypeScript-Typen dokumentieren**
5. **Events dokumentieren wenn vorhanden**
6. **Playground nur für interaktive Komponenten**

### ❌ DON'Ts:
1. **NICHT BaseShowcaseComponent erweitern**
2. **Keine ungenutzten Imports** (CodeBlockComponent, PropsTableComponent etc.)
3. **Keine leeren Arrays** - wenn keine Events, dann weglassen
4. **Kein HTML in description** - nur plain text

## Beispiel einer vollständigen Showcase

```typescript
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-button-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      [title]="'Button'"
      [description]="'Buttons trigger actions and guide users through workflows.'"
      [sections]="sections"
      [props]="props"
      [events]="events"
      [bestPractices]="bestPractices"
    />
  `
})
export class ButtonShowcaseComponent {
  sections = [
    {
      title: 'Basic Buttons',
      description: 'Standard button variants for different actions.',
      code: `<!-- Primary Button -->
<pst-button variant="primary">Save Changes</pst-button>

<!-- Secondary Button -->
<pst-button variant="secondary">Cancel</pst-button>

<!-- Danger Button -->
<pst-button variant="danger">Delete Item</pst-button>`
    },
    {
      title: 'Button Sizes',
      description: 'Buttons come in different sizes for various use cases.',
      code: `<pst-button size="sm">Small</pst-button>
<pst-button size="md">Medium</pst-button>
<pst-button size="lg">Large</pst-button>`
    },
    {
      title: 'Button States',
      description: 'Buttons can be disabled or show loading state.',
      code: `<!-- Disabled -->
<pst-button [disabled]="true">Disabled</pst-button>

<!-- Loading -->
<pst-button [loading]="true">Saving...</pst-button>`
    }
  ];

  props = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'danger' | 'ghost'",
      default: "'primary'",
      description: 'Visual style variant of the button'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the button'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows loading spinner and disables interaction'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Button takes full width of container'
    }
  ];

  events = [
    {
      name: 'clicked',
      type: 'EventEmitter<MouseEvent>',
      description: 'Emitted when button is clicked'
    }
  ];

  bestPractices = {
    do: [
      'Use clear, action-oriented labels (e.g., "Save Changes" not "Submit")',
      'Place primary action on the right, secondary on the left',
      'Use loading states for async operations',
      'Ensure sufficient color contrast for accessibility',
      'Provide keyboard navigation support'
    ],
    dont: [
      'Don\'t use more than one primary button per section',
      'Avoid generic labels like "Click Here" or "Submit"',
      'Don\'t disable buttons without clear indication why',
      'Avoid using buttons for navigation (use links instead)',
      'Don\'t make buttons too small for touch targets (min 44x44px)'
    ]
  };
}
```

## Verzeichnisstruktur

```
src/app/features/components-showcase/pages/
├── atoms/          # Basis-Komponenten (Button, Input, etc.)
├── molecules/      # Zusammengesetzte Komponenten (Card, Modal, etc.)
└── organisms/      # Komplexe Komponenten (Navigation, Forms, etc.)
```

## Testing-Konventionen

Jede Showcase sollte folgendes sicherstellen:
1. Alle Beispiele sind lauffähig
2. Props-Typen stimmen mit der echten Komponente überein
3. Best Practices sind spezifisch für die Komponente
4. Keine console.errors beim Rendern

## Migration bestehender Showcases

Falls eine Komponente noch `extends BaseShowcaseComponent` verwendet:
1. Entferne die Vererbung
2. Entferne abstrakte Properties (title, component, etc.)
3. Konvertiere zu direkten Properties
4. Entferne unused imports aus dem imports-Array
# KI-Guide: Showcase-Komponenten erstellen

## Übersicht
Dieser Guide erklärt, wie KI-Agenten korrekt Showcase-Komponenten für das Angular CRM erstellen.

## Kontext
- **Framework**: Angular v20 mit Standalone Components
- **Styling**: Tailwind CSS
- **Pattern**: ShowcaseTemplateComponent (NICHT BaseShowcaseComponent)
- **Ort**: `/src/app/features/components-showcase/pages/[atoms|molecules|organisms]/`

## KI-Prompt Template

```
Erstelle eine Showcase-Komponente für [ComponentName] in Angular.

Verwende dabei:
- ShowcaseTemplateComponent als Template (NICHT BaseShowcaseComponent erweitern)
- Standalone Component Pattern
- Mindestens 3 Code-Beispiele in sections
- Vollständige props-Dokumentation
- Best Practices im do/dont Format

Die Komponente soll in: src/app/features/components-showcase/pages/[atoms|molecules|organisms]/[component-name]-showcase/

Beachte:
- KEINE ungenutzten Imports (CodeBlockComponent, PropsTableComponent werden von ShowcaseTemplateComponent gehandhabt)
- Alle Props müssen mit korrekten TypeScript-Typen dokumentiert werden
- Best Practices sollen spezifisch für die Komponente sein
```

## Vollständiges Beispiel für KI

```typescript
// KORREKT: Modernes ShowcaseTemplate Pattern
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-alert-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent  // NUR diese zwei Imports!
  ],
  template: `
    <pst-showcase-template
      [title]="'Alert'"
      [description]="'Alerts display important messages to users.'"
      [sections]="sections"
      [props]="props"
      [events]="events"
      [bestPractices]="bestPractices"
    />
  `
})
export class AlertShowcaseComponent {  // KEIN extends BaseShowcaseComponent!
  sections = [
    {
      title: 'Alert Variants',
      description: 'Different alert types for various scenarios.',
      code: `<!-- Success Alert -->
<pst-alert type="success">
  Operation completed successfully!
</pst-alert>

<!-- Error Alert -->
<pst-alert type="error">
  An error occurred. Please try again.
</pst-alert>

<!-- Warning Alert -->
<pst-alert type="warning">
  Your session will expire in 5 minutes.
</pst-alert>

<!-- Info Alert -->
<pst-alert type="info">
  New features are available in settings.
</pst-alert>`
    },
    {
      title: 'Dismissible Alerts',
      description: 'Alerts that users can close.',
      code: `<pst-alert 
  type="info" 
  [dismissible]="true"
  (dismissed)="onAlertDismissed()">
  This message can be dismissed.
</pst-alert>`
    },
    {
      title: 'Alerts with Actions',
      description: 'Include action buttons in alerts.',
      code: `<pst-alert type="warning" [dismissible]="true">
  <span>Your subscription expires in 3 days.</span>
  <button class="ml-4 text-sm font-medium underline">
    Renew Now
  </button>
</pst-alert>`
    }
  ];

  props = [
    {
      name: 'type',
      type: "'info' | 'success' | 'warning' | 'error'",
      default: "'info'",
      description: 'Visual style indicating the alert severity'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Whether the alert can be dismissed by the user'
    },
    {
      name: 'icon',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show an icon based on alert type'
    },
    {
      name: 'compact',
      type: 'boolean',
      default: 'false',
      description: 'Reduces padding for inline usage'
    }
  ];

  events = [
    {
      name: 'dismissed',
      type: 'EventEmitter<void>',
      description: 'Emitted when the alert is dismissed'
    }
  ];

  bestPractices = {
    do: [
      'Use appropriate alert types to convey severity',
      'Keep alert messages concise and actionable',
      'Place alerts at the top of the relevant context',
      'Include actions when users can resolve the issue',
      'Use icons to improve scannability',
      'Ensure alerts are accessible to screen readers'
    ],
    dont: [
      'Don\'t overuse alerts - reserve for important messages',
      'Avoid multiple alerts stacked together',
      'Don\'t auto-dismiss error alerts',
      'Don\'t use alerts for form validation (use inline errors)',
      'Avoid jargon or technical error messages',
      'Don\'t rely solely on color to convey meaning'
    ]
  };
}
```

## Checkliste für KI-Agenten

### ✅ Vor dem Start prüfen:
- [ ] Komponente existiert in `/shared/components/`?
- [ ] Ist es atom, molecule oder organism?
- [ ] Welche Props hat die Original-Komponente?

### ✅ Pflichtfelder:
- [ ] `title` - Name der Komponente
- [ ] `description` - Kurze Beschreibung (1-2 Sätze)
- [ ] `sections` - Min. 3 Code-Beispiele
- [ ] `props` - Alle Props mit Typen dokumentiert
- [ ] `bestPractices` - Min. 4 do's und 4 dont's

### ✅ Code-Qualität:
- [ ] Keine ungenutzten Imports
- [ ] Kein `extends BaseShowcaseComponent`
- [ ] TypeScript-Typen korrekt (mit Quotes bei Union Types)
- [ ] Beispiel-Code ist formatiert und realistisch

### ❌ Häufige Fehler vermeiden:
- `extends BaseShowcaseComponent` ❌
- Import von `CodeBlockComponent` ❌
- Import von `PropsTableComponent` ❌
- Import der showcase'd Component ❌
- Leere Arrays statt undefined ❌
- `bestPractices` als string[] ❌

## Test-Befehl für KI

Nach Erstellung der Showcase, führe diesen Test aus:

```bash
# Build testen
npm run build

# Spezifisch nach Fehlern suchen
npm run build 2>&1 | grep -A3 -B3 "[component-name]-showcase"

# Erwartetes Ergebnis: Keine Fehler, nur evtl. Warnings über ungenutzte Imports
```

## Beispiel-Prompts für verschiedene Komponenten

### Atom-Komponente:
```
Erstelle eine Showcase für die Toggle-Komponente (atom).
Die Toggle-Komponente hat folgende Props: checked, disabled, size, label.
Zeige Beispiele für: Basic usage, Sizes, States, With labels.
```

### Molecule-Komponente:
```
Erstelle eine Showcase für die Card-Komponente (molecule).
Die Card hat: header, content, footer slots und shadow, padding, clickable Props.
Zeige verschiedene Layouts und Verwendungszwecke.
```

### Organism-Komponente:
```
Erstelle eine Showcase für die DataTable-Komponente (organism).
Zeige: Basic table, Sortierung, Pagination, Selection, Custom cells.
Fokus auf real-world Beispiele mit Kundendaten.
```

## Validierung

Eine korrekte Showcase-Komponente:
1. Kompiliert ohne Fehler
2. Zeigt alle Features der Komponente
3. Hat hilfreiche Best Practices
4. Verwendet konsistentes Formatting
5. Folgt Angular-Coding-Standards

## Bei Problemen

Wenn Fehler auftreten:
1. Prüfe Imports (zu viele?)
2. Prüfe extends (BaseShowcaseComponent?)
3. Prüfe bestPractices Format (Object mit do/dont?)
4. Prüfe Template-Bindings (alle Properties existieren?)

## Migrations-Hinweis

Falls alte Showcases mit `BaseShowcaseComponent` gefunden werden:
1. Entferne `extends BaseShowcaseComponent`
2. Entferne Import von `BaseShowcaseComponent`
3. Entferne abstrakte Properties
4. Konvertiere zu direkten Class-Properties
5. Teste mit `npm run build`
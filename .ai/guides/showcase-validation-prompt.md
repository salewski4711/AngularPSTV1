# KI-Prompt: Showcase-Komponente validieren

## Automatische Validierung

Nach dem Erstellen einer Showcase-Komponente, verwende diesen Test:

```typescript
// Erstelle eine Test-Datei: [component-name]-showcase.validation.spec.ts

import { createShowcaseComponentTest } from '../../shared/showcase-validator.spec';
import { [ComponentName]ShowcaseComponent } from './[component-name]-showcase.component';

createShowcaseComponentTest([ComponentName]ShowcaseComponent);
```

Dann führe aus:
```bash
npm test -- [component-name]-showcase.validation.spec.ts
```

## Manuelle Validierungs-Checkliste

Verwende diese Checkliste um zu prüfen ob die Showcase korrekt ist:

```typescript
// 1. ✅ Verwendet ShowcaseTemplateComponent?
template: `<pst-showcase-template ... />`

// 2. ✅ KEIN extends BaseShowcaseComponent?
export class MyShowcase {  // ← Kein extends!

// 3. ✅ Alle Pflichtfelder vorhanden?
sections = [...];      // Min. 2 Beispiele
props = [...];         // Alle Props dokumentiert
bestPractices = {      // Do's and Don'ts
  do: [...],          // Min. 3 Einträge
  dont: [...]         // Min. 3 Einträge
};

// 4. ✅ Keine unnötigen Imports?
imports: [
  CommonModule,
  ShowcaseTemplateComponent  // NUR diese!
]

// 5. ✅ Props haben korrekte Typen?
props = [{
  name: 'size',
  type: "'sm' | 'md' | 'lg'",  // Mit Quotes!
  default: "'md'",              // Mit Quotes!
  description: 'Size of component'
}];

// 6. ✅ Sections haben Code-Beispiele?
sections = [{
  title: 'Basic Usage',
  description: 'How to use',
  code: `<pst-component>...</pst-component>`  // Realer Code!
}];
```

## Quick-Test Befehl

```bash
# Teste ob die Komponente kompiliert
npm run build -- --source-map=false 2>&1 | grep -E "(ERROR|error)" | grep -v "npm ERR!" | head -20

# Erwartetes Ergebnis: Keine Ausgabe = Keine Fehler
```

## Typische Fehler und Lösungen

### Fehler 1: "Type 'string[]' is missing properties from type '{ do: string[]; dont: string[]; }'"
```typescript
// ❌ Falsch
bestPractices = ['Do this', 'Do that'];

// ✅ Richtig
bestPractices = {
  do: ['Do this', 'Do that'],
  dont: ['Avoid this', 'Never do that']
};
```

### Fehler 2: "Property 'title' is missing"
```typescript
// ❌ Falsch
export class MyShowcase extends BaseShowcaseComponent {

// ✅ Richtig
export class MyShowcase {  // Kein extends!
```

### Fehler 3: "CodeBlockComponent is not used"
```typescript
// ❌ Falsch
imports: [
  CommonModule,
  ShowcaseTemplateComponent,
  CodeBlockComponent,  // Nicht nötig!
  PropsTableComponent  // Nicht nötig!
]

// ✅ Richtig
imports: [
  CommonModule,
  ShowcaseTemplateComponent
]
```

## Beispiel-Ausgabe eines erfolgreichen Tests

```
PASS [component]-showcase.validation.spec.ts
  ComponentShowcase Showcase Validation
    Showcase Conventions
      ✓ should use ShowcaseTemplateComponent
      ✓ should have required properties
      ✓ should have title and description bindings
      ✓ should have valid sections structure
      ✓ should have valid props structure
      ✓ should have comprehensive best practices
      ✓ should NOT extend BaseShowcaseComponent
      ✓ should not have common implementation mistakes
      ✓ should have varied examples
```

## KI-Agent Selbsttest

Nachdem du eine Showcase erstellt hast, stelle dir diese Fragen:

1. **Kompiliert es?** → `npm run build`
2. **Folgt es den Konventionen?** → Test ausführen
3. **Sind die Beispiele hilfreich?** → Code-Sections prüfen
4. **Sind Best Practices spezifisch?** → Nicht zu generisch
5. **Props vollständig dokumentiert?** → Mit der echten Komponente vergleichen

## Fertig! 

Wenn alle Tests grün sind und der Build funktioniert, ist die Showcase korrekt implementiert! 🎉
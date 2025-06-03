# Component Showcase System

## 🎯 Übersicht

Das Component Showcase System ist eine integrierte Dokumentations- und Test-Umgebung für alle UI-Komponenten. Es bietet interaktive Beispiele, API-Dokumentation und einen Live-Playground.

## 🏗️ Architektur

### Kern-Komponenten

```
components-showcase/
├── layout/
│   └── showcase-layout.component.ts    # Haupt-Layout mit Navigation
├── shared/
│   ├── code-block.component.ts        # Syntax-highlighting
│   ├── props-table.component.ts       # API-Dokumentation
│   └── playground.component.ts        # Interaktiver Editor
├── pages/
│   ├── atoms/                         # Basis-Komponenten
│   ├── molecules/                     # Zusammengesetzte Komponenten
│   └── organisms/                     # Komplexe Komponenten
└── utils/
    └── sync-examples.js               # Example-File Synchronisation
```

## 🚀 Features

### 1. Showcase Layout
- **Sidebar Navigation** mit Kategorisierung
- **Status Badges** (stable, beta, deprecated)
- **Responsive Design** für alle Bildschirmgrößen
- **Dark Mode Support**

### 2. Code Block Component
```typescript
<app-code-block
  [code]="exampleCode"
  language="typescript"
  [showLineNumbers]="true"
  fileName="example.ts"
></app-code-block>
```

**Features:**
- Syntax Highlighting mit Prism.js
- Copy-to-Clipboard Funktionalität
- Zeilennummern (optional)
- Dateiname-Anzeige
- Unterstützte Sprachen: TypeScript, HTML, CSS, SCSS

### 3. Props Table Component
```typescript
<app-props-table
  [properties]="componentProperties"
></app-props-table>
```

**Features:**
- Sortierbare Spalten
- Suchfunktion
- Type-Definitionen
- Default-Werte
- Required/Optional Kennzeichnung
- Beschreibungen mit Markdown-Support

### 4. Playground Component
```typescript
<app-playground
  [config]="playgroundConfig"
></app-playground>
```

**Features:**
- Live-Preview der Komponente
- Interaktive Property-Controls
- Code-Generierung
- Reset-Funktion
- Copy Generated Code

## 📝 Example Files System

### Workflow
1. **HTML-Dateien erstellen** in `examples/` Ordner
2. **Sync-Script ausführen**: `npm run sync:examples`
3. **Automatischer Import** in Showcase-Komponente

### Struktur
```
button-showcase/
├── examples/
│   ├── basic.example.html
│   ├── variants.example.html
│   ├── sizes.example.html
│   ├── states.example.html
│   ├── with-icons.example.html
│   ├── index.ts           # Auto-generiert
│   └── README.md
└── button-showcase.component.ts
```

### Beispiel
```html
<!-- variants.example.html -->
<app-button variant="primary">Primary</app-button>
<app-button variant="secondary">Secondary</app-button>
```

Wird zu:
```typescript
// index.ts (auto-generiert)
export const variantsExample = `<app-button variant="primary">Primary</app-button>
<app-button variant="secondary">Secondary</app-button>`;
```

## 🎨 Showcase Page Template

```typescript
@Component({
  selector: 'app-component-showcase',
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <h1>Component Name</h1>
      <span class="status-badge">stable</span>
      
      <!-- Tabs -->
      <nav class="tabs">
        <button *ngFor="let tab of tabs">{{tab.label}}</button>
      </nav>
      
      <!-- Content -->
      <div [ngSwitch]="activeTab">
        <!-- Overview -->
        <div *ngSwitchCase="'overview'">
          <app-code-block [code]="importCode"></app-code-block>
        </div>
        
        <!-- Examples -->
        <div *ngSwitchCase="'examples'">
          <app-code-block [code]="exampleCode"></app-code-block>
        </div>
        
        <!-- Playground -->
        <div *ngSwitchCase="'playground'">
          <app-playground [config]="playgroundConfig"></app-playground>
        </div>
        
        <!-- API -->
        <div *ngSwitchCase="'api'">
          <app-props-table [properties]="apiProperties"></app-props-table>
        </div>
      </div>
    </div>
  `
})
```

## 🔧 Playground Configuration

```typescript
interface PlaygroundConfig {
  component: Type<any>;
  props: PlaygroundProperty[];
  slots?: PlaygroundSlot[];
  wrapper?: WrapperConfig;
}

interface PlaygroundProperty {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'color';
  defaultValue: any;
  options?: any[];        // Für enum
  min?: number;          // Für number
  max?: number;          // Für number
  step?: number;         // Für number
  description?: string;
}
```

## 📋 Best Practices

### 1. Komponenten-Dokumentation
- **Übersicht** mit Use-Cases
- **Vollständige API-Dokumentation**
- **Interaktive Beispiele** für alle Varianten
- **Accessibility-Hinweise**
- **Design-Guidelines**

### 2. Example Files
- **Aussagekräftige Kommentare** in HTML
- **Realistische Use-Cases**
- **Progressive Komplexität**
- **Edge-Cases abdecken**

### 3. Playground Setup
- **Alle Props exponieren**
- **Sinnvolle Defaults**
- **Realistische Optionen**
- **Slot-Content ermöglichen**

## 🚦 Status-System

### Component Status
- **stable** ✅ - Production-ready
- **beta** 🟡 - In Entwicklung, API kann sich ändern
- **deprecated** 🔴 - Veraltet, Migration empfohlen
- **experimental** 🔵 - Proof of Concept

### Migrations-Workflow
1. Component als `deprecated` markieren
2. Migration Guide erstellen
3. Neue Component-Version bereitstellen
4. Deprecation Timeline kommunizieren

## 🔍 Suche & Navigation

### Global Search (Header)
- Suche über alle Komponenten
- Keyboard Shortcut: `Cmd/Ctrl + K`
- Fuzzy Search Algorithmus
- Kategorisierte Ergebnisse

### Sidebar Navigation
- Hierarchische Struktur
- Kategorie-basiert (Atoms, Molecules, etc.)
- Status-Badge Integration
- Collapse/Expand Funktionalität

## 📊 Analytics & Insights (geplant)

### Usage Tracking
- Welche Komponenten werden am meisten genutzt?
- Welche Props werden häufig geändert?
- Common Patterns erkennen

### Feedback System
- Inline-Feedback zu Beispielen
- Bug-Reports direkt aus Showcase
- Feature Requests sammeln
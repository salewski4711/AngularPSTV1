# ProSolarTec UI-Komponenten Übersicht

## 🎯 Warum Standard-Komponenten?

Standard-UI-Komponenten sind die **Bausteine** Ihrer Anwendung. Sie sorgen für:

1. **Konsistenz** - Gleiche Komponente = Gleiches Verhalten überall
2. **Wartbarkeit** - Änderungen an einer Stelle wirken überall
3. **Geschwindigkeit** - Neue Features schneller entwickeln
4. **Qualität** - Getestete, barrierefreie Komponenten

## 📦 Die wichtigsten Standard-Komponenten

### 1. **Button** 🚧 (In Beta-Entwicklung)
```html
<app-button-beta variant="primary">Primary</app-button-beta>
<app-button-beta variant="secondary">Secondary</app-button-beta>
<app-button-beta variant="outline-primary">Outline</app-button-beta>
<app-button-beta variant="tertiary">Tertiary</app-button-beta>
```
- **Varianten**: 
  - `primary` - Orange (#F99600) - Hauptaktionen
  - `secondary` - Dunkelblau (#1C3661) - Sekundäre Aktionen
  - `outline-primary` - Orange Border - Alternative Aktionen
  - `tertiary` - Grau Border - Tertiäre Aktionen
  - `ghost` - Transparent - Subtile Aktionen
  - `danger` - Rot - Kritische Aktionen
- **Größen**: xs, sm, md, lg, xl
- **Zustände**: normal, disabled, loading
- **Icons**: Font Awesome Icons mit Position links/rechts

### 2. **Card** (Geplant)
```html
<app-card>
  <app-card-header>
    <h3>Kundendaten</h3>
  </app-card-header>
  <app-card-body>
    <!-- Inhalt -->
  </app-card-body>
</app-card>
```
- Container für zusammengehörige Inhalte
- Mit Header, Body, Footer Bereichen

### 3. **Input/Form Fields** (Geplant)
```html
<app-form-field>
  <label>E-Mail</label>
  <app-input type="email" [(ngModel)]="email" [error]="emailError">
  <app-error *ngIf="emailError">Ungültige E-Mail</app-error>
</app-form-field>
```
- Einheitliche Formularfelder
- Integrierte Validierung
- Error-States

### 4. **Table** (Geplant)
```html
<app-table [data]="customers" [columns]="columns">
  <ng-template #actions let-row>
    <app-button size="sm" (click)="edit(row)">Bearbeiten</app-button>
  </ng-template>
</app-table>
```
- Sortierbar
- Filterbar
- Pagination
- Responsive

### 5. **Modal/Dialog** (Geplant)
```html
<app-modal [(visible)]="showModal" title="Kunde löschen?">
  <p>Möchten Sie diesen Kunden wirklich löschen?</p>
  <app-modal-footer>
    <app-button variant="ghost" (click)="cancel()">Abbrechen</app-button>
    <app-button variant="danger" (click)="delete()">Löschen</app-button>
  </app-modal-footer>
</app-modal>
```

### 6. **Alert/Notification** (Geplant)
```html
<app-alert type="success" [dismissible]="true">
  Kunde wurde erfolgreich gespeichert!
</app-alert>
```
- Typen: success, info, warning, error
- Auto-dismiss Option
- Mit/ohne Icon

### 7. **Badge** (Geplant)
```html
<app-badge variant="success">Aktiv</app-badge>
<app-badge variant="warning">Ausstehend</app-badge>
<app-badge variant="danger">3</app-badge>
```
- Status-Anzeigen
- Zähler
- Labels

### 8. **Loading/Spinner** (Geplant)
```html
<app-loading [show]="isLoading" text="Daten werden geladen...">
  <!-- Content hier wird während loading versteckt -->
</app-loading>
```

### 9. **Tabs** (Geplant)
```html
<app-tabs>
  <app-tab label="Übersicht">
    <!-- Tab 1 Content -->
  </app-tab>
  <app-tab label="Details">
    <!-- Tab 2 Content -->
  </app-tab>
</app-tabs>
```

### 10. **Select/Dropdown** (Geplant)
```html
<app-select [(ngModel)]="selectedStatus" placeholder="Status wählen">
  <app-option value="active">Aktiv</app-option>
  <app-option value="inactive">Inaktiv</app-option>
</app-select>
```

## 🏗️ Architektur-Prinzipien

### 1. **Komposition über Vererbung**
```typescript
// Gut: Komponenten zusammensetzen
<app-card>
  <app-card-header>
    <app-button>Action</app-button>
  </app-card-header>
</app-card>

// Nicht: Mega-Komponente mit 100 Props
<app-mega-card [showButton]="true" [buttonText]="..." ...>
```

### 2. **Props für Konfiguration**
```typescript
// Alle Varianten über Props steuern
@Input() variant: 'primary' | 'secondary';
@Input() size: 'sm' | 'md' | 'lg';
```

### 3. **Content Projection**
```html
<!-- ng-content für flexible Inhalte -->
<app-button>
  <i class="icon"></i>
  Beliebiger Inhalt
</app-button>
```

### 4. **Konsistente API**
```typescript
// Alle Komponenten folgen ähnlichen Patterns
@Input() disabled: boolean;
@Input() loading: boolean;
@Output() clicked: EventEmitter<Event>;
```

## 🚀 Verwendung im Projekt

```typescript
// 1. Import in Feature-Modul
import { ButtonBetaComponent } from '@shared/components-beta/button/button-beta.component';

// 2. In Template verwenden
<app-button-beta 
  variant="primary"
  size="lg"
  [loading]="isSaving"
  (clicked)="save()"
>
  Speichern
</app-button-beta>

// 3. Fertig! Keine eigenen Styles nötig
```

## 📋 Checkliste für neue Komponenten

- [ ] **Standalone Component** (kein NgModule)
- [ ] **TypeScript Types** für alle Props
- [ ] **Tailwind Classes** für Styling
- [ ] **Dark Mode** Support
- [ ] **Barrierefreiheit** (ARIA Labels)
- [ ] **Content Projection** wo sinnvoll
- [ ] **Konsistente API** wie andere Komponenten
- [ ] **Dokumentation** mit Beispielen

## 🎨 Design Tokens

Alle Komponenten nutzen die gleichen Design-Tokens:

- **Farben**: primary, secondary, danger, success, warning
- **Größen**: xs, sm, md, lg, xl
- **Abstände**: Tailwind spacing scale
- **Schatten**: Tailwind shadow scale
- **Rundungen**: rounded, rounded-md, rounded-lg

## 💡 Best Practices

1. **Klein und fokussiert** - Eine Komponente, eine Aufgabe
2. **Kompositionsfähig** - Komponenten sollten zusammenarbeiten
3. **Vorhersehbar** - Keine Überraschungen im Verhalten
4. **Performant** - OnPush Change Detection wo möglich
5. **Testbar** - Einfache Props, klare Outputs

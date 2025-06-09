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
<pst-button-beta variant="primary">Primary</pst-button-beta>
<pst-button-beta variant="secondary">Secondary</pst-button-beta>
<pst-button-beta variant="outline-primary">Outline</pst-button-beta>
<pst-button-beta variant="tertiary">Tertiary</pst-button-beta>
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
<pst-card>
  <pst-card-header>
    <h3>Kundendaten</h3>
  </pst-card-header>
  <pst-card-body>
    <!-- Inhalt -->
  </pst-card-body>
</pst-card>
```
- Container für zusammengehörige Inhalte
- Mit Header, Body, Footer Bereichen

### 3. **Input/Form Fields** (Geplant)
```html
<pst-form-field>
  <label>E-Mail</label>
  <pst-input type="email" [(ngModel)]="email" [error]="emailError">
  <pst-error *ngIf="emailError">Ungültige E-Mail</pst-error>
</pst-form-field>
```
- Einheitliche Formularfelder
- Integrierte Validierung
- Error-States

### 4. **Table** (Geplant)
```html
<pst-table [data]="customers" [columns]="columns">
  <ng-template #actions let-row>
    <pst-button size="sm" (click)="edit(row)">Bearbeiten</pst-button>
  </ng-template>
</pst-table>
```
- Sortierbar
- Filterbar
- Pagination
- Responsive

### 5. **Modal/Dialog** (Geplant)
```html
<pst-modal [(visible)]="showModal" title="Kunde löschen?">
  <p>Möchten Sie diesen Kunden wirklich löschen?</p>
  <pst-modal-footer>
    <pst-button variant="ghost" (click)="cancel()">Abbrechen</pst-button>
    <pst-button variant="danger" (click)="delete()">Löschen</pst-button>
  </pst-modal-footer>
</pst-modal>
```

### 6. **Alert/Notification** (Geplant)
```html
<pst-alert type="success" [dismissible]="true">
  Kunde wurde erfolgreich gespeichert!
</pst-alert>
```
- Typen: success, info, warning, error
- Auto-dismiss Option
- Mit/ohne Icon

### 7. **Badge** (Geplant)
```html
<pst-badge variant="success">Aktiv</pst-badge>
<pst-badge variant="warning">Ausstehend</pst-badge>
<pst-badge variant="danger">3</pst-badge>
```
- Status-Anzeigen
- Zähler
- Labels

### 8. **Loading/Spinner** (Geplant)
```html
<pst-loading [show]="isLoading" text="Daten werden geladen...">
  <!-- Content hier wird während loading versteckt -->
</pst-loading>
```

### 9. **Tabs** (Geplant)
```html
<pst-tabs>
  <pst-tab label="Übersicht">
    <!-- Tab 1 Content -->
  </pst-tab>
  <pst-tab label="Details">
    <!-- Tab 2 Content -->
  </pst-tab>
</pst-tabs>
```

### 10. **Select/Dropdown** (Geplant)
```html
<pst-select [(ngModel)]="selectedStatus" placeholder="Status wählen">
  <pst-option value="active">Aktiv</pst-option>
  <pst-option value="inactive">Inaktiv</pst-option>
</pst-select>
```

## 🏗️ Architektur-Prinzipien

### 1. **Komposition über Vererbung**
```typescript
// Gut: Komponenten zusammensetzen
<pst-card>
  <pst-card-header>
    <pst-button>Action</pst-button>
  </pst-card-header>
</pst-card>

// Nicht: Mega-Komponente mit 100 Props
<pst-mega-card [showButton]="true" [buttonText]="..." ...>
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
<pst-button>
  <i class="icon"></i>
  Beliebiger Inhalt
</pst-button>
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
<pst-button-beta 
  variant="primary"
  size="lg"
  [loading]="isSaving"
  (clicked)="save()"
>
  Speichern
</pst-button-beta>

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

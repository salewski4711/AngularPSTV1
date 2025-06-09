# Entity List View - Generische Listen-/Grid-Ansicht

## 🎯 Komponenten-Übersicht

**Fachliche Bezeichnung:** Entity List View (Entitäts-Übersichtsansicht)  
**Komponenten-Name:** `pst-entity-list-view`  
**Typ:** Template-Level Komponente (Atomic Design)  
**Wiederverwendbarkeit:** Hoch - für alle Datentypen (Kontakte, Verträge, Angebote, Projekte)

## 🏗️ Architektur-Pattern

### Template-Level Komponente mit konfigurierbaren Inhalten:
```typescript
interface EntityListViewConfig<T> {
  entityType: 'contacts' | 'contracts' | 'offers' | 'projects';
  title: string;
  backRoute: string;
  searchPlaceholder: string;
  createButtonText: string;
  
  // Spalten-Konfiguration
  cardFields: EntityFieldConfig[];
  tableColumns: EntityColumnConfig[];
  
  // Actions
  onSearch: (query: string) => void;
  onFilter: () => void;
  onViewToggle: (view: 'card' | 'table') => void;
  onCreate: () => void;
  onEntityClick: (entity: T) => void;
  
  // Daten
  entities: T[];
  loading: boolean;
  permissions: EntityPermissions;
}
```

## 🎨 UI-Struktur

### Header: ← Zurück, Titel, Benutzer-Navigation
### Toolbar: Suche, Filter, Ansicht-Umschalter, Erstellen-Button  
### Content: Card-Grid ↔ Tabellen-Ansicht (umschaltbar)
### Footer: Zusätzlicher Erstellen-Button

## 📱 Responsive
- **Desktop:** 4-6 Spalten, vollständige Toolbar
- **Tablet:** 2-3 Spalten, kompakte Toolbar  
- **Mobile:** 1-2 Spalten, gestapelte Elemente


## 💼 Use Cases & Wiederverwendbarkeit

### Kontakte (`/customers`):
```typescript
const CONTACT_CONFIG: EntityListViewConfig<Contact> = {
  entityType: 'contacts',
  title: 'Kontakte',
  backRoute: '/dashboard/kontakte',
  searchPlaceholder: 'Kontakte durchsuchen...',
  createButtonText: 'Neuer Kontakt',
  cardFields: [
    { key: 'initials', type: 'avatar' },
    { key: 'name', type: 'title' },
    { key: 'email', type: 'subtitle' },
    { key: 'phone', type: 'info' },
    { key: 'status', type: 'badge' }
  ]
};
```

### Verträge (`/contracts`):
```typescript
const CONTRACT_CONFIG: EntityListViewConfig<Contract> = {
  entityType: 'contracts',
  title: 'Verträge',
  backRoute: '/dashboard/vertraege',
  searchPlaceholder: 'Verträge durchsuchen...',
  createButtonText: 'Neuer Vertrag',
  cardFields: [
    { key: 'contractNumber', type: 'title' },
    { key: 'customerName', type: 'subtitle' },
    { key: 'value', type: 'currency' },
    { key: 'startDate', type: 'date' },
    { key: 'status', type: 'badge' }
  ]
};
```

### Angebote (`/offers`):
```typescript
const OFFER_CONFIG: EntityListViewConfig<Offer> = {
  entityType: 'offers',
  title: 'Angebote',
  backRoute: '/dashboard/angebote',
  searchPlaceholder: 'Angebote durchsuchen...',
  createButtonText: 'Neues Angebot',
  cardFields: [
    { key: 'offerNumber', type: 'title' },
    { key: 'customerName', type: 'subtitle' },
    { key: 'totalValue', type: 'currency' },
    { key: 'validUntil', type: 'date' },
    { key: 'status', type: 'badge' }
  ]
};
```

## 🔧 Technische Implementation

### Organisationsstruktur:
```
src/app/shared/templates/
├── entity-list-view/
│   ├── entity-list-view.component.ts
│   ├── entity-list-view.types.ts
│   ├── components/
│   │   ├── entity-card.component.ts
│   │   ├── entity-table.component.ts
│   │   ├── search-toolbar.component.ts
│   │   └── view-toggle.component.ts
│   └── index.ts
```

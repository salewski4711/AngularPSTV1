# Entity List View - TypeScript Templates

## 🔧 Core Interface

```typescript
interface EntityListViewConfig<T> {
  entityType: string;
  title: string;
  backRoute: string;
  searchPlaceholder: string;
  createButtonText: string;
  
  // Feld-Konfiguration
  cardFields: EntityFieldConfig[];
  tableColumns: EntityColumnConfig[];
  
  // Event-Handler
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

interface EntityFieldConfig {
  key: string;
  type: 'avatar' | 'title' | 'subtitle' | 'info' | 'badge' | 'currency' | 'date';
  label?: string;
  sortable?: boolean;
}
```

## 🏗️ Component Template

```typescript
@Component({
  selector: 'pst-entity-list-view',
  standalone: true,
  imports: [CommonModule, SearchToolbarComponent, EntityCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="entity-list-view">
      <pst-search-toolbar 
        [config]="config()" 
        (searchChange)="onSearch($event)">
      </pst-search-toolbar>
      
      <pst-entity-grid 
        [entities]="config().entities" 
        [fields]="config().cardFields"
        [viewMode]="viewMode()"
        (entityClick)="onEntityClick($event)">
      </pst-entity-grid>
    </div>
  `
})
export class EntityListViewComponent<T> {
  @Input({ required: true }) config = signal<EntityListViewConfig<T>>();
  viewMode = signal<'card' | 'table'>('card');
}
```

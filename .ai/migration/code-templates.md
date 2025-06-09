# Code-Templates für Hierarchische Dashboard-Navigation

## Dashboard-Widget Interface

```typescript
export interface DashboardWidgetConfig {
  type: 'stat' | 'action' | 'navigation' | 'category';
  title: string;
  icon: IconName;
  route?: string;
  isBackButton?: boolean;  // Für ← Zurück Navigation
  priority?: number;       // Widget-Reihenfolge
  level?: 1 | 2;          // Dashboard-Level
  badgeCount?: number;
  trend?: { value: number; direction: 'up' | 'down' };
  permission?: string;
}
```

## Permission Types

```typescript
export type Permission = 
  | 'dashboard.view' | 'contacts.view' | 'contacts.create'
  | 'offers.view' | 'offers.create' | 'workflows.view'
  | 'contracts.view' | 'contracts.create';
```

## Dashboard-Widget Component

```typescript
@Component({
  selector: 'pst-dashboard-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-widget" 
         [attr.data-level]="config().level"
         [attr.data-back-button]="config().isBackButton">
      <!-- Hierarchie-aware Widget Content -->
    </div>
  `
})
export class DashboardWidgetComponent {
  @Input({ required: true }) config = signal<DashboardWidgetConfig>();
  @Output() widgetClicked = new EventEmitter<DashboardWidgetConfig>();
}
```

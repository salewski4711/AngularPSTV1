# Dashboard Konfiguration

## Kontaktmanagement Widgets

```typescript
// src/app/features/home/dashboard/dashboard-config.ts
export const KONTAKTMANAGEMENT_WIDGETS: DashboardWidgetConfig[] = [
  {
    type: 'navigation',
    title: 'Alle Kontakte',
    icon: 'users',
    route: '/customers',
    permission: 'contacts.view'
  },
  {
    type: 'action',
    title: 'Neuen Kontakt',
    icon: 'user-plus',
    permission: 'contacts.create'
  },
  {
    type: 'action',
    title: 'Kontakt-Aufgaben',
    icon: 'check-square',
    badgeCount: 3,
    permission: 'contacts.view'
  },
  {
    type: 'navigation',
    title: 'Kalender',
    icon: 'calendar',
    route: '/calendar',
    permission: 'dashboard.view'
  }
];
```

## Workflows Widgets

```typescript
export const WORKFLOWS_WIDGETS: DashboardWidgetConfig[] = [
  {
    type: 'action',
    title: 'Adresskorrektur',
    icon: 'map-pin',
    permission: 'workflows.execute'
  },
  {
    type: 'action',
    title: 'Dachqualifizierung',
    icon: 'home',
    permission: 'workflows.execute'
  }
];
```

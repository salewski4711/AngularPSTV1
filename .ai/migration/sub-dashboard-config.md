# Sub-Dashboard Widget-Konfigurationen

## Sub-Dashboard: Angebote (`/dashboard/angebote`)
```typescript
export const ANGEBOTE_SUB_DASHBOARD: DashboardWidgetConfig[] = [
  { type: 'navigation', title: '← Zurück', icon: 'arrow-left', route: '/dashboard', isBackButton: true, priority: 1, level: 2 },
  { type: 'navigation', title: 'Alle Angebote', icon: 'file-text', route: '/offers', level: 2 },
  { type: 'action', title: 'Gedruckte Angebote', icon: 'printer', level: 2 },
  { type: 'action', title: 'Neue Angebote', icon: 'plus-circle', level: 2 },
  { type: 'stat', title: 'Offene Angebote', icon: 'inbox', subtitle: '12', trend: { value: 3, direction: 'up' }, level: 2 },
  { type: 'action', title: 'Angebots-Vorlagen', icon: 'template', level: 2 },
  { type: 'stat', title: 'Conversion Rate', icon: 'trending-up', subtitle: '23%', level: 2 }
];
```

## Sub-Dashboard: Kontakte (`/dashboard/kontakte`)
```typescript
export const KONTAKTE_SUB_DASHBOARD: DashboardWidgetConfig[] = [
  { type: 'navigation', title: '← Zurück', icon: 'arrow-left', route: '/dashboard', isBackButton: true, level: 2 },
  { type: 'navigation', title: 'Alle Kontakte', icon: 'users', route: '/customers', level: 2 },
  { type: 'action', title: 'Neuen Kontakt', icon: 'user-plus', level: 2 },
  { type: 'action', title: 'Kontakt-Import', icon: 'upload', level: 2 },
  { type: 'action', title: 'Kontakt-Aufgaben', icon: 'check-square', badgeCount: 3, level: 2 },
  { type: 'navigation', title: 'Kalender', icon: 'calendar', route: '/calendar', level: 2 }
];
```

## Sub-Dashboard: Statistiken (`/dashboard/statistiken`)
```typescript
export const STATISTIKEN_SUB_DASHBOARD: DashboardWidgetConfig[] = [
  { type: 'navigation', title: '← Zurück', icon: 'arrow-left', route: '/dashboard', isBackButton: true, level: 2 },
  { type: 'stat', title: 'Umsatz MTD', icon: 'dollar-sign', subtitle: '€45.230', trend: { value: 12, direction: 'up' }, level: 2 },
  { type: 'stat', title: 'Conversion Rate', icon: 'trending-up', subtitle: '23%', level: 2 },
  { type: 'action', title: 'Umsatz-Charts', icon: 'bar-chart', level: 2 },
  { type: 'action', title: 'Team-Performance', icon: 'users', level: 2 }
];
```

## Haupt-Dashboard Kategorie-Widgets (`/dashboard`)
```typescript
export const HAUPT_DASHBOARD_WIDGETS: DashboardWidgetConfig[] = [
  { type: 'category', title: 'Kontaktmanagement', icon: 'users', route: '/dashboard/kontakte', level: 1 },
  { type: 'category', title: 'Angebotsmanagement', icon: 'file-text', route: '/dashboard/angebote', level: 1 },
  { type: 'category', title: 'Vertriebsstatistik', icon: 'trending-up', route: '/dashboard/statistiken', level: 1 },
  { type: 'category', title: 'Workflows', icon: 'workflow', route: '/dashboard/workflows', level: 1 },
  { type: 'category', title: 'Vertragsmanagement', icon: 'file-check', route: '/dashboard/vertraege', level: 1 }
];
```

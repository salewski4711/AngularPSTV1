# Hierarchische Dashboard-Navigation - Routing

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Level 1 - Haupt-Dashboard (Kategorien)
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/main-dashboard.component').then(m => m.MainDashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard - ProSolarTec CRM'
  },
  
  // Level 2 - Sub-Dashboards (Actions)
  {
    path: 'dashboard/kontakte',
    loadComponent: () => import('./features/dashboard/sub-dashboards/kontakte-dashboard.component').then(m => m.KontakteDashboardComponent),
    canActivate: [authGuard],
    title: 'Kontakte - ProSolarTec CRM'
  },
  {
    path: 'dashboard/angebote',
    loadComponent: () => import('./features/dashboard/sub-dashboards/angebote-dashboard.component').then(m => m.AngeboteDashboardComponent),
    canActivate: [authGuard],
    title: 'Angebote - ProSolarTec CRM'
  },
  {
    path: 'dashboard/statistiken',
    loadComponent: () => import('./features/dashboard/sub-dashboards/statistiken-dashboard.component').then(m => m.StatistikenDashboardComponent),
    canActivate: [authGuard],
    title: 'Statistiken - ProSolarTec CRM'
  },
  {
    path: 'dashboard/workflows',
    loadComponent: () => import('./features/dashboard/sub-dashboards/workflows-dashboard.component').then(m => m.WorkflowsDashboardComponent),
    canActivate: [authGuard],
    title: 'Workflows - ProSolarTec CRM'
  },
  {
    path: 'dashboard/vertraege',
    loadComponent: () => import('./features/dashboard/sub-dashboards/vertraege-dashboard.component').then(m => m.VertraegeDashboardComponent),
    canActivate: [authGuard],
    title: 'Verträge - ProSolarTec CRM'
  }
];
```

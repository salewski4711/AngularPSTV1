import { Routes } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

// Title Resolver für dynamische Titles
const dashboardTitleResolver = (route: ActivatedRouteSnapshot) => {
  const category = route.paramMap.get('category');
  
  if (category) {
    // Titel aus Service holen
    const titles: Record<string, string> = {
      'kontakte': 'Kontaktmanagement',
      'angebote': 'Angebotsmanagement',
      'statistiken': 'Vertriebsstatistik',
      'workflows': 'Workflows',
      'vertraege': 'Vertragsmanagement'
    };
    return `${titles[category] || 'Dashboard'} - ProSolarTec CRM`;
  }
  
  return 'Dashboard - ProSolarTec CRM';
};

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-dashboard.component').then(m => m.MainDashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard - ProSolarTec CRM',
    data: { animation: 'DashboardPage' }
  },
  {
    path: ':category',
    loadComponent: () => import('./main-dashboard.component').then(m => m.MainDashboardComponent),
    canActivate: [authGuard],
    title: dashboardTitleResolver,
    data: { animation: 'SubDashboardPage' }
  }
];
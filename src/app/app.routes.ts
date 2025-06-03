import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    title: 'Dashboard - ProSolarTec CRM'
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent),
    canActivate: [authGuard],
    title: 'Kunden - ProSolarTec CRM'
  },
  {
    path: 'offers',
    loadComponent: () => import('./features/offers/offers.component').then(m => m.OffersComponent),
    canActivate: [authGuard],
    title: 'Angebote - ProSolarTec CRM'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    canActivate: [authGuard],
    title: 'Projekte - ProSolarTec CRM'
  },
  {
    path: 'workflow',
    loadComponent: () => import('./features/workflow/workflow.component').then(m => m.WorkflowComponent),
    canActivate: [authGuard],
    title: 'Workflow - ProSolarTec CRM'
  },
  {
    path: 'navigation-demo',
    loadComponent: () => import('./features/navigation-demo/navigation-demo.component').then(m => m.NavigationDemoComponent),
    canActivate: [authGuard],
    title: 'Navigation Demo - ProSolarTec CRM'
  },
  { 
    path: 'beta', 
    loadComponent: () => import('./shared/components-beta/showcase/showcase.component').then(m => m.ShowcaseComponent),
    canActivate: [authGuard],
    title: 'Component Showcase - Beta'
  },
  { 
    path: 'beta-old', 
    loadComponent: () => import('./shared/components-beta/_playground/beta-playground.component').then(m => m.BetaPlaygroundComponent),
    canActivate: [authGuard],
    title: 'Beta Components Playground'
  },
  {
    path: 'components',
    loadChildren: () => import('./features/components-showcase/showcase.routes').then(m => m.showcaseRoutes),
    canActivate: [authGuard],
    title: 'Component Showcase'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

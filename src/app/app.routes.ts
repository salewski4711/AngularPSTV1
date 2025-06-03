import { Routes } from '@angular/router';
import { BetaPlaygroundComponent } from './shared/components-beta/_playground/beta-playground.component';
import { ShowcaseComponent } from './shared/components-beta/showcase/showcase.component';
import { HomeComponent } from './features/home/home.component';
import { CustomersComponent } from './features/customers/customers.component';
import { OffersComponent } from './features/offers/offers.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { WorkflowComponent } from './features/workflow/workflow.component';
import { NavigationDemoComponent } from './features/navigation-demo/navigation-demo.component';
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
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Dashboard - ProSolarTec CRM'
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [authGuard],
    title: 'Kunden - ProSolarTec CRM'
  },
  {
    path: 'offers',
    component: OffersComponent,
    canActivate: [authGuard],
    title: 'Angebote - ProSolarTec CRM'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [authGuard],
    title: 'Projekte - ProSolarTec CRM'
  },
  {
    path: 'workflow',
    component: WorkflowComponent,
    canActivate: [authGuard],
    title: 'Workflow - ProSolarTec CRM'
  },
  {
    path: 'navigation-demo',
    component: NavigationDemoComponent,
    canActivate: [authGuard],
    title: 'Navigation Demo - ProSolarTec CRM'
  },
  { 
    path: 'beta', 
    component: ShowcaseComponent,
    canActivate: [authGuard],
    title: 'Component Showcase - Beta'
  },
  { 
    path: 'beta-old', 
    component: BetaPlaygroundComponent,
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

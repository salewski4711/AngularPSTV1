import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const contactsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contacts.component').then(m => m.ContactsComponent),
    canActivate: [authGuard],
    title: 'Kontakte - ProSolarTec CRM'
  },
  {
    path: 'new',
    loadComponent: () => import('./contact-form.component').then(m => m.ContactFormComponent),
    canActivate: [authGuard],
    title: 'Neuer Kontakt - ProSolarTec CRM'
  },
  {
    path: ':id',
    loadComponent: () => import('./contact-details.component').then(m => m.ContactDetailsComponent),
    canActivate: [authGuard],
    title: 'Kontakt Details - ProSolarTec CRM'
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./contact-form.component').then(m => m.ContactFormComponent),
    canActivate: [authGuard],
    title: 'Kontakt bearbeiten - ProSolarTec CRM'
  }
];
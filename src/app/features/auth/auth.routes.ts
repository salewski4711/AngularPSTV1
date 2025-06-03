import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Anmelden - ProSolarTec CRM'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
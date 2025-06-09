import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from '../main-dashboard.component';

@Component({
  selector: 'pst-angebote-dashboard',
  standalone: true,
  imports: [CommonModule, MainDashboardComponent],
  template: `<pst-main-dashboard />`
})
export class AngeboteDashboardComponent {}
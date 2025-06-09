import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from '../main-dashboard.component';

@Component({
  selector: 'pst-workflows-dashboard',
  standalone: true,
  imports: [CommonModule, MainDashboardComponent],
  template: `<pst-main-dashboard />`
})
export class WorkflowsDashboardComponent {}
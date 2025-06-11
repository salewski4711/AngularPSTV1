import { Component } from '@angular/core';
import { DashboardWidgetComponent } from './dashboard-widget.component';
import { DashboardWidgetConfig } from './dashboard-widget.types';

@Component({
  selector: 'pst-dashboard-widget-test',
  standalone: true,
  imports: [DashboardWidgetComponent],
  template: `
    <div class="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h2 class="col-span-full text-2xl font-bold mb-4">Dashboard Widget Migration Test</h2>
      
      <!-- Category Widget -->
      <pst-dashboard-widget
        [config]="categoryConfig"
        size="large"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
      
      <!-- Stat Widget -->
      <pst-dashboard-widget
        [config]="statConfig"
        size="medium"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
      
      <!-- Section Widget -->
      <pst-dashboard-widget
        [config]="sectionConfig"
        size="medium"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
      
      <!-- Action Widget -->
      <pst-dashboard-widget
        [config]="actionConfig"
        size="medium"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
      
      <!-- Navigation Widget -->
      <pst-dashboard-widget
        [config]="navigationConfig"
        size="small"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
      
      <!-- Back Button Widget -->
      <pst-dashboard-widget
        [config]="backButtonConfig"
        size="small"
        (widgetClick)="handleClick($event)">
      </pst-dashboard-widget>
    </div>
  `
})
export class DashboardWidgetMigrationTestComponent {
  categoryConfig: DashboardWidgetConfig = {
    type: 'category',
    title: 'Kontakte',
    description: 'Verwaltung aller Kundenkontakte',
    icon: 'users',
    route: '/contacts',
    color: 'primary',
    badgeCount: 5
  };
  
  statConfig: DashboardWidgetConfig = {
    type: 'stat',
    title: 'Umsatz heute',
    icon: 'currency-euro',
    statValue: '12.458',
    statUnit: '€',
    color: 'success',
    trend: {
      direction: 'up',
      value: 12.5
    }
  };
  
  sectionConfig: DashboardWidgetConfig = {
    type: 'section-widget',
    title: 'Angebote',
    icon: 'document-text',
    route: '/offers',
    badgeCount: 3,
    isHighlighted: true
  };
  
  actionConfig: DashboardWidgetConfig = {
    type: 'action',
    title: 'Neues Angebot erstellen',
    description: 'Erstellen Sie ein neues Angebot für einen Kunden',
    icon: 'plus-circle',
    route: '/offers/new',
    color: 'primary'
  };
  
  navigationConfig: DashboardWidgetConfig = {
    type: 'navigation',
    title: 'Einstellungen',
    icon: 'cog',
    route: '/settings'
  };
  
  backButtonConfig: DashboardWidgetConfig = {
    type: 'navigation',
    title: 'Zurück zur Übersicht',
    icon: 'arrow-left',
    isBackButton: true
  };
  
  handleClick(event: any): void {
    console.log('Widget clicked:', event);
  }
}
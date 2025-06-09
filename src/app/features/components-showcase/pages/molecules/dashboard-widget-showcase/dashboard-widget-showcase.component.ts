import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { DashboardWidgetComponent } from '../../../../../shared/components/dashboard-widget/dashboard-widget.component';
import { DashboardWidgetConfig, DashboardWidgetClickEvent } from '../../../../../shared/components/dashboard-widget/dashboard-widget.types';

@Component({
  selector: 'pst-dashboard-widget-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CodeBlockComponent,
    PropsTableComponent,
    DashboardWidgetComponent
  ],
  template: `
    <div class="space-y-12">
      <!-- Header -->
      <header>
        <h1 class="text-3xl font-bold mb-4">Dashboard Widget</h1>
        <p class="text-gray-600 dark:text-gray-400">
          Hierarchische Widget-Navigation für das Dashboard System
        </p>
      </header>
      
      <!-- Custom Example Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <h3 class="col-span-full text-lg font-semibold mb-4">Widget Varianten</h3>
        
        <!-- Category Widget -->
        <div class="h-[200px]">
          <pst-dashboard-widget 
            [config]="categoryWidget"
            (widgetClick)="onWidgetClick($event)" />
        </div>
        
        <!-- Stat Widget -->
        <div class="h-[200px]">
          <pst-dashboard-widget 
            [config]="statWidget"
            (widgetClick)="onWidgetClick($event)" />
        </div>
        
        <!-- Action Widget -->
        <div class="h-[200px]">
          <pst-dashboard-widget 
            [config]="actionWidget"
            (widgetClick)="onWidgetClick($event)" />
        </div>
        
        <!-- Back Button Widget -->
        <div class="h-[200px] md:col-span-2">
          <pst-dashboard-widget 
            [config]="backWidget"
            (widgetClick)="onWidgetClick($event)" />
        </div>
      </div>
      
      <!-- Props Table -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Props</h2>
        <pst-props-table [props]="props"></pst-props-table>
      </section>
      
      <!-- Code Examples -->
      <section>
        <h2 class="text-2xl font-semibold mb-6">Beispiele</h2>
        @for (example of examples; track example.title) {
          <div class="mb-8">
            <h3 class="text-lg font-medium mb-2">{{ example.title }}</h3>
            @if (example.description) {
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ example.description }}</p>
            }
            <pst-code-block [code]="example.template" language="html"></pst-code-block>
            @if (example.code) {
              <div class="mt-4">
                <pst-code-block [code]="example.code" language="typescript"></pst-code-block>
              </div>
            }
          </div>
        }
      </section>
    </div>
  `
})
export class DashboardWidgetShowcaseComponent {
  // Widget Konfigurationen
  categoryWidget: DashboardWidgetConfig = {
    type: 'category',
    title: 'Kontaktmanagement',
    icon: 'users',
    route: '/dashboard/kontakte',
    color: 'primary',
    description: 'Kunden, Leads und Ansprechpartner verwalten',
    badgeCount: 12
  };
  
  statWidget: DashboardWidgetConfig = {
    type: 'stat',
    title: 'Umsatz (Monat)',
    icon: 'currency-euro',
    statValue: '124.500',
    statUnit: '€',
    color: 'success',
    trend: { value: 15, direction: 'up' }
  };
  
  actionWidget: DashboardWidgetConfig = {
    type: 'action',
    title: 'Neues Angebot',
    icon: 'document-plus',
    route: '/offers/new',
    color: 'primary'
  };
  
  backWidget: DashboardWidgetConfig = {
    type: 'navigation',
    title: 'Zurück zum Dashboard',
    icon: 'arrow-left',
    route: '/dashboard',
    isBackButton: true
  };
  
  examples = [
    {
      title: 'Basic Dashboard Widget',
      description: 'Standard Dashboard Widget mit allen Features',
      template: `
<!-- Category Widget -->
<pst-dashboard-widget 
  [config]="{
    type: 'category',
    title: 'Kontaktmanagement',
    icon: 'users',
    route: '/dashboard/kontakte',
    color: 'primary',
    description: 'Kunden verwalten',
    badgeCount: 12
  }"
  (widgetClick)="onWidgetClick($event)">
</pst-dashboard-widget>

<!-- Stat Widget mit Trend -->
<pst-dashboard-widget 
  [config]="{
    type: 'stat',
    title: 'Umsatz',
    icon: 'currency-euro',
    statValue: '124.500',
    statUnit: '€',
    color: 'success',
    trend: { value: 15, direction: 'up' }
  }">
</pst-dashboard-widget>`,
      code: `
// Widget Konfiguration
const widgetConfig: DashboardWidgetConfig = {
  type: 'category',
  title: 'Kontaktmanagement',
  icon: 'users',
  route: '/dashboard/kontakte',
  color: 'primary',
  description: 'Kunden, Leads und Ansprechpartner verwalten',
  badgeCount: 12
};

// Click Handler
onWidgetClick(event: DashboardWidgetClickEvent): void {
  console.info('Widget clicked:', event.widget);
  // Navigation logic here
}`
    }
  ];
  
  props = [
    {
      name: 'config',
      type: 'DashboardWidgetConfig',
      default: '-',
      description: 'Widget-Konfiguration mit allen Eigenschaften',
      required: true
    },
    {
      name: 'variant',
      type: "'default' | 'compact' | 'expanded'",
      default: 'default',
      description: 'Darstellungsvariante des Widgets'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large' | 'full'",
      default: 'medium',
      description: 'Größe des Widgets im Grid'
    },
    {
      name: 'widgetClick',
      type: 'EventEmitter<DashboardWidgetClickEvent>',
      default: '-',
      description: 'Event wird bei Klick auf navigierbare Widgets ausgelöst'
    }
  ];
  
  onWidgetClick(event: DashboardWidgetClickEvent): void {
    console.info('Widget clicked:', event.widget.title);
  }
}
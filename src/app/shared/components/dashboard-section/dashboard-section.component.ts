import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetComponent } from '../dashboard-widget/dashboard-widget.component';
import { DashboardSectionConfig, DashboardWidgetClickEvent } from '../dashboard-widget/dashboard-widget.types';

@Component({
  selector: 'pst-dashboard-section',
  standalone: true,
  imports: [CommonModule, DashboardWidgetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="dashboard-section bg-white dark:bg-[#111827] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <!-- Section Title -->
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-5">
        {{ section.title }}
      </h2>
      
      <!-- Widgets Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        @for (widget of section.widgets; track widget.title) {
          <pst-dashboard-widget
            [config]="widget"
            [size]="'medium'"
            class="aspect-[2.2/1]"
            (widgetClick)="onWidgetClick($event)"
          />
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .dashboard-section {
      container-type: inline-size;
    }
    
    @container (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    @container (min-width: 641px) and (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class DashboardSectionComponent {
  @Input({ required: true }) section!: DashboardSectionConfig;
  @Output() widgetClick = new EventEmitter<DashboardWidgetClickEvent>();
  
  onWidgetClick(event: DashboardWidgetClickEvent): void {
    // Forward the event to parent component
    this.widgetClick.emit(event);
  }
}
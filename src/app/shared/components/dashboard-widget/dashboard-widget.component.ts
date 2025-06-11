import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import { BadgeComponent } from '../badge/badge.component';
import { DashboardWidgetConfig, DashboardWidgetClickEvent, DashboardWidgetVariant, DashboardWidgetSize } from './dashboard-widget.types';
import { dashboardWidgetClasses } from '../../../core/design-system/component-classes/dashboard-widget.classes';

@Component({
  selector: 'pst-dashboard-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      [class]="widgetClasses()"
      [attr.role]="config.route ? 'link' : 'article'"
      [attr.aria-label]="config.title"
      (click)="handleClick($event)"
      [class.cursor-pointer]="!!config.route">
      
      <!-- Back Button Variant -->
      @if (config.isBackButton) {
        <div class="flex items-center gap-3 py-2">
          <div [class]="backButtonIconContainerClasses()">
            <pst-icon 
              [name]="config.icon" 
              [size]="20"
              [class]="backButtonIconClasses()" />
          </div>
          <span [class]="backButtonTextClasses()">
            {{ config.title }}
          </span>
        </div>
      } @else {
        @switch (config.type) {
          <!-- Category Widget (Main Dashboard) -->
          @case ('category') {
            <div class="flex items-center gap-6 h-full">
              <!-- Left: Icon Container -->
              <div class="flex-shrink-0">
                <div class="relative">
                  <div [class]="iconContainerClasses()">
                    <pst-icon 
                      [name]="config.icon" 
                      [size]="iconSize()"
                      [class]="whiteTextClass()" />
                  </div>
                  @if (config.badgeCount) {
                    <div class="absolute -top-2 -right-2 z-10">
                      <pst-badge 
                        variant="filled"
                        color="error"
                        size="sm"
                        shape="pill">{{ config.badgeCount }}</pst-badge>
                    </div>
                  }
                </div>
              </div>
              
              <!-- Center: Content -->
              <div class="flex-1">
                <h3 [class]="categoryTitleClasses()">
                  {{ config.title }}
                </h3>
                @if (config.description) {
                  <p [class]="categoryDescriptionClasses()">
                    {{ config.description }}
                  </p>
                }
              </div>
              
              <!-- Right: Arrow -->
              <div class="flex-shrink-0">
                <pst-icon 
                  name="arrow-right" 
                  [size]="24"
                  [class]="categoryArrowClasses()" />
              </div>
            </div>
          }
          
          <!-- Section Widget (Theme-Section Widgets) -->
          @case ('section-widget') {
            <div class="flex flex-col items-center justify-center h-full py-6 px-4 overflow-visible">
              <!-- Icon Container with Badge -->
              <div class="relative mb-3 overflow-visible">
                <div class="relative overflow-visible p-1">
                  <pst-icon 
                    [name]="config.icon" 
                    [size]="32"
                    [class]="sectionWidgetIconClasses()" />
                </div>
                @if (config.badgeCount) {
                  <div class="absolute -top-2 -right-3 z-10">
                    <pst-badge 
                      variant="filled"
                      color="error"
                      size="sm"
                      shape="pill">{{ config.badgeCount }}</pst-badge>
                  </div>
                }
              </div>
              
              <!-- Label -->
              <div [class]="sectionWidgetTitleClasses()">
                {{ config.title }}
              </div>
            </div>
          }
          
          <!-- Stat Widget -->
          @case ('stat') {
            <div class="flex flex-col h-full">
              <!-- Header with Icon -->
              <div class="flex items-center gap-3 mb-3">
                <div [class]="statIconClasses()">
                  <pst-icon 
                    [name]="config.icon" 
                    [size]="20"
                    [class]="statIconColorClasses()" />
                </div>
                <h4 [class]="statTitleClasses()">
                  {{ config.title }}
                </h4>
              </div>
              
              <!-- Value and Trend -->
              <div class="flex items-end justify-between mt-auto">
                <div>
                  <span [class]="statValueClasses()">
                    {{ config.statValue }}
                  </span>
                  @if (config.statUnit) {
                    <span [class]="statUnitClasses()">
                      {{ config.statUnit }}
                    </span>
                  }
                </div>
                @if (config.trend) {
                  <div [class]="trendContainerClasses()">
                    <pst-icon 
                      [name]="config.trend.direction === 'up' ? 'trending-up' : 'trending-down'"
                      [size]="16"
                      [class]="trendClasses()" />
                    <span [class]="trendClasses()">
                      {{ config.trend.value }}%
                    </span>
                  </div>
                }
              </div>
            </div>
          }
          
          <!-- Action Widget -->
          @case ('action') {
            <div class="group flex items-center justify-between h-full">
              <div class="flex items-center gap-4">
                <div [class]="actionIconClasses()">
                  <pst-icon 
                    [name]="config.icon" 
                    [size]="24"
                    [class]="actionIconColorClasses()" />
                </div>
                <div>
                  <h3 [class]="actionTitleClasses()">
                    {{ config.title }}
                  </h3>
                  @if (config.description) {
                    <p [class]="actionDescriptionClasses()">
                      {{ config.description }}
                    </p>
                  }
                </div>
              </div>
              <pst-icon 
                name="chevron-right" 
                [size]="20"
                [class]="actionArrowClasses()" />
            </div>
          }
          
          <!-- Navigation Widget (similar to action but more subtle) -->
          @case ('navigation') {
            <div class="group flex items-center justify-between h-full">
              <div class="flex items-center gap-3">
                <div [class]="navigationIconContainerClasses()">
                  <pst-icon 
                    [name]="config.icon" 
                    [size]="20"
                    [class]="navigationIconClasses()" />
                </div>
                <span [class]="navigationTitleClasses()">
                  {{ config.title }}
                </span>
              </div>
            </div>
          }
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class DashboardWidgetComponent {
  @Input({ required: true }) config!: DashboardWidgetConfig;
  @Input() variant: DashboardWidgetVariant = 'default';
  @Input() size: DashboardWidgetSize = 'medium';
  @Output() widgetClick = new EventEmitter<DashboardWidgetClickEvent>();
  
  // Computed Signals für optimale Performance
  protected widgetClasses = computed(() => {
    const classes: string[] = [dashboardWidgetClasses.base.common];
    
    // Type-specific base styles
    if (this.config.type === 'section-widget' && this.config.isHighlighted) {
      classes.push(dashboardWidgetClasses.base.types['section-widget']);
      classes.push(dashboardWidgetClasses.base.types['section-widget-highlighted']);
    } else if (this.config.type === 'section-widget') {
      classes.push(dashboardWidgetClasses.base.types['section-widget']);
      classes.push(dashboardWidgetClasses.base.types['section-widget-normal']);
    } else {
      classes.push(dashboardWidgetClasses.base.types[this.config.type]);
    }
    
    // Hover effects for clickable widgets
    if (this.config.route && dashboardWidgetClasses.base.hover[this.config.type]) {
      classes.push(dashboardWidgetClasses.base.hover[this.config.type]);
    }
    
    // Back Button specific styles
    if (this.config.isBackButton) {
      classes.push(dashboardWidgetClasses.base.backButton);
    }
    
    // Size-specific classes
    classes.push(dashboardWidgetClasses.base.sizes[this.size]);
    
    return classes.join(' ');
  });
  
  protected iconContainerClasses = computed(() => {
    const color = this.config.color || 'primary';
    const baseClass = dashboardWidgetClasses.iconContainer.base.category;
    const gradientClass = dashboardWidgetClasses.iconContainer.gradients[color] || dashboardWidgetClasses.iconContainer.gradients.primary;
    
    return `${baseClass} ${gradientClass}`;
  });
  
  protected iconSize = computed(() => {
    switch (this.config.type) {
      case 'category': return 28;
      case 'stat': return 20;
      case 'action': return 24;
      default: return 24;
    }
  });
  
  protected trendClasses = computed(() => {
    if (!this.config.trend) return '';
    
    return this.config.trend.direction === 'up' 
      ? dashboardWidgetClasses.trend.up
      : dashboardWidgetClasses.trend.down;
  });
  
  // New computed properties for enhanced styling
  protected statIconClasses = computed(() => {
    return dashboardWidgetClasses.iconContainer.base.stat;
  });
  
  protected statIconColorClasses = computed(() => {
    const color = this.config.color || 'primary';
    return dashboardWidgetClasses.icon.colors[color] || dashboardWidgetClasses.icon.colors.primary;
  });
  
  protected actionIconClasses = computed(() => {
    return dashboardWidgetClasses.iconContainer.base.action;
  });
  
  protected actionIconColorClasses = computed(() => {
    const color = this.config.color || 'primary';
    return dashboardWidgetClasses.icon.colors[color] || dashboardWidgetClasses.icon.colors.primary;
  });
  
  // Computed property for section widget icon classes
  protected sectionWidgetIconClasses = computed(() => {
    if (this.config.isHighlighted) {
      return dashboardWidgetClasses.icon.sectionWidget.highlighted;
    }
    
    return dashboardWidgetClasses.icon.sectionWidget.default;
  });
  
  handleClick(event: MouseEvent): void {
    if (this.config.route || this.config.isBackButton) {
      event.stopPropagation();
      this.widgetClick.emit({
        widget: this.config,
        event
      });
    }
  }

  // Computed classes for back button
  protected backButtonIconContainerClasses = computed(() => {
    return dashboardWidgetClasses.iconContainer.base.backButton;
  });

  protected backButtonIconClasses = computed(() => {
    return dashboardWidgetClasses.icon.colors.neutral;
  });

  protected backButtonTextClasses = computed(() => {
    return dashboardWidgetClasses.text.backButton.text;
  });

  // Computed properties for template string replacements
  protected categoryTitleClasses = computed(() => {
    return dashboardWidgetClasses.text.category.title;
  });

  protected categoryDescriptionClasses = computed(() => {
    return dashboardWidgetClasses.text.category.description;
  });

  protected categoryArrowClasses = computed(() => {
    return dashboardWidgetClasses.text.category.arrow;
  });

  protected sectionWidgetTitleClasses = computed(() => {
    return dashboardWidgetClasses.text.sectionWidget.title;
  });

  protected statTitleClasses = computed(() => {
    return dashboardWidgetClasses.text.stat.title;
  });

  protected statValueClasses = computed(() => {
    return dashboardWidgetClasses.text.stat.value;
  });

  protected statUnitClasses = computed(() => {
    return dashboardWidgetClasses.text.stat.unit;
  });

  protected trendContainerClasses = computed(() => {
    return dashboardWidgetClasses.trend.container;
  });

  protected actionTitleClasses = computed(() => {
    return dashboardWidgetClasses.text.action.title;
  });

  protected actionDescriptionClasses = computed(() => {
    return dashboardWidgetClasses.text.action.description;
  });

  protected actionArrowClasses = computed(() => {
    return dashboardWidgetClasses.text.action.arrow;
  });

  protected navigationIconContainerClasses = computed(() => {
    return dashboardWidgetClasses.iconContainer.base.navigation;
  });

  protected navigationTitleClasses = computed(() => {
    return dashboardWidgetClasses.text.navigation.title;
  });

  protected navigationIconClasses = computed(() => {
    return dashboardWidgetClasses.icon.colors.gray;
  });

  protected whiteTextClass = computed(() => {
    return dashboardWidgetClasses.icon.colors.white;
  });
}
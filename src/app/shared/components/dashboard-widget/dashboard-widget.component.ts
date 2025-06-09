import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import { BadgeComponent } from '../badge/badge.component';
import { DashboardWidgetConfig, DashboardWidgetClickEvent, DashboardWidgetVariant, DashboardWidgetSize } from './dashboard-widget.types';

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
          <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <pst-icon 
              [name]="config.icon" 
              [size]="20"
              class="text-gray-700 dark:text-gray-300" />
          </div>
          <span class="text-base font-medium text-gray-700 dark:text-gray-300">
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
                      class="text-white" />
                  </div>
                  @if (config.badgeCount) {
                    <div class="absolute -top-2 -right-2 z-10">
                      <pst-badge 
                        variant="filled"
                        size="sm"
                        class="bg-red-500 text-white">{{ config.badgeCount }}</pst-badge>
                    </div>
                  }
                </div>
              </div>
              
              <!-- Center: Content -->
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ config.title }}
                </h3>
                @if (config.description) {
                  <p class="text-base text-gray-600 dark:text-gray-400">
                    {{ config.description }}
                  </p>
                }
              </div>
              
              <!-- Right: Arrow -->
              <div class="flex-shrink-0">
                <pst-icon 
                  name="arrow-right" 
                  [size]="24"
                  class="text-gray-400 dark:text-gray-600 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          }
          
          <!-- Section Widget (Theme-Section Widgets) -->
          @case ('section-widget') {
            <div class="flex flex-col items-center justify-center h-full py-8 px-6">
              <!-- Icon -->
              <div class="relative mb-4">
                <pst-icon 
                  [name]="config.icon" 
                  [size]="28"
                  [class]="sectionWidgetIconClasses()" />
                @if (config.badgeCount) {
                  <div class="absolute -top-2 -right-2 z-10">
                    <pst-badge 
                      variant="filled"
                      size="sm"
                      class="bg-red-500 text-white">{{ config.badgeCount }}</pst-badge>
                  </div>
                }
              </div>
              
              <!-- Label -->
              <div class="text-base font-bold text-gray-900 dark:text-white text-center">
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
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ config.title }}
                </h4>
              </div>
              
              <!-- Value and Trend -->
              <div class="flex items-end justify-between mt-auto">
                <div>
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ config.statValue }}
                  </span>
                  @if (config.statUnit) {
                    <span class="text-lg text-gray-600 dark:text-gray-400 ml-1">
                      {{ config.statUnit }}
                    </span>
                  }
                </div>
                @if (config.trend) {
                  <div class="flex items-center gap-1 text-sm">
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
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {{ config.title }}
                  </h3>
                  @if (config.description) {
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {{ config.description }}
                    </p>
                  }
                </div>
              </div>
              <pst-icon 
                name="chevron-right" 
                [size]="20"
                class="text-gray-400 dark:text-gray-600 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
            </div>
          }
          
          <!-- Navigation Widget (similar to action but more subtle) -->
          @case ('navigation') {
            <div class="group flex items-center justify-between h-full">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <pst-icon 
                    [name]="config.icon" 
                    [size]="20"
                    class="text-gray-700 dark:text-gray-300" />
                </div>
                <span class="text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
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
    const baseClasses = ['relative', 'h-full', 'transition-all', 'duration-200', 'group'];
    
    // Type-specific base styles
    switch (this.config.type) {
      case 'category':
        baseClasses.push(
          'p-6',
          'bg-gradient-to-br',
          'from-white',
          'to-gray-50',
          'dark:from-gray-900',
          'dark:to-gray-800',
          'rounded-xl',
          'shadow-lg',
          'border',
          'border-gray-200',
          'dark:border-gray-700'
        );
        break;
      case 'section-widget':
        baseClasses.push(
          'bg-gray-50',
          'dark:bg-[#1f2937]',
          'rounded-lg',
          'border',
          this.config.isHighlighted 
            ? 'border-2 border-primary bg-white dark:bg-[#1f2937]' 
            : 'border-gray-200 dark:border-gray-700'
        );
        break;
      case 'stat':
        baseClasses.push(
          'p-4',
          'bg-white',
          'dark:bg-gray-900',
          'rounded-lg',
          'shadow-sm',
          'border',
          'border-gray-200',
          'dark:border-gray-800'
        );
        break;
      case 'action':
      case 'navigation':
        baseClasses.push(
          'p-4',
          'bg-white',
          'dark:bg-gray-900',
          'rounded-lg',
          'shadow-sm',
          'border',
          'border-gray-200',
          'dark:border-gray-800'
        );
        break;
    }
    
    // Hover effects for clickable widgets
    if (this.config.route) {
      switch (this.config.type) {
        case 'category':
          baseClasses.push(
            'hover:shadow-xl',
            'hover:border-orange-200',
            'dark:hover:border-orange-800',
            'hover:scale-[1.02]',
            'active:scale-[1.01]'
          );
          break;
        case 'section-widget':
          baseClasses.push(
            'hover:border-primary',
            'hover:bg-white',
            'dark:hover:bg-gray-800',
            'hover:shadow-sm',
            'hover:-translate-y-0.5',
            'cursor-pointer'
          );
          break;
        case 'action':
          baseClasses.push(
            'hover:shadow-md',
            'hover:border-orange-200',
            'dark:hover:border-orange-800',
            'hover:bg-orange-50',
            'dark:hover:bg-orange-950/20'
          );
          break;
        case 'navigation':
          baseClasses.push(
            'hover:shadow-sm',
            'hover:border-gray-300',
            'dark:hover:border-gray-700'
          );
          break;
        case 'stat':
          if (this.config.route) {
            baseClasses.push(
              'hover:shadow-md',
              'hover:border-gray-300',
              'dark:hover:border-gray-700',
              'cursor-pointer'
            );
          }
          break;
      }
    }
    
    // Back Button specific styles
    if (this.config.isBackButton) {
      baseClasses.push(
        'bg-gray-50',
        'dark:bg-gray-800/50',
        'hover:bg-gray-100',
        'dark:hover:bg-gray-800',
        'border-transparent',
        'shadow-none'
      );
    }
    
    // Size-specific classes
    const sizeClasses = {
      small: 'min-h-[100px]',
      medium: 'min-h-[120px]',
      large: 'min-h-[160px]',
      full: 'min-h-[200px]'
    };
    
    baseClasses.push(sizeClasses[this.size]);
    
    return baseClasses.join(' ');
  });
  
  protected iconContainerClasses = computed(() => {
    const colorClasses = {
      primary: 'bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700',
      secondary: 'bg-gradient-to-br from-pst-blue to-pst-blue-dark dark:from-pst-blue-dark dark:to-pst-blue-darker',
      success: 'bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700',
      warning: 'bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700',
      danger: 'bg-gradient-to-br from-red-400 to-red-600 dark:from-red-500 dark:to-red-700',
      info: 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700'
    };
    
    const color = this.config.color || 'primary';
    const sizeClass = this.config.type === 'category' ? 'w-14 h-14' : 'w-12 h-12';
    
    return `${sizeClass} rounded-xl ${colorClasses[color]} flex items-center justify-center shadow-lg`;
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
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400';
  });
  
  // New computed properties for enhanced styling
  protected statIconClasses = computed(() => {
    return 'w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center';
  });
  
  protected statIconColorClasses = computed(() => {
    const colorClasses = {
      primary: 'text-orange-600 dark:text-orange-400',
      secondary: 'text-pst-blue dark:text-pst-blue-light',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      danger: 'text-red-600 dark:text-red-400',
      info: 'text-blue-600 dark:text-blue-400'
    };
    return colorClasses[this.config.color || 'primary'];
  });
  
  protected actionIconClasses = computed(() => {
    return 'w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 flex items-center justify-center transition-colors';
  });
  
  protected actionIconColorClasses = computed(() => {
    const colorClasses = {
      primary: 'text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300',
      secondary: 'text-pst-blue dark:text-pst-blue-light group-hover:text-pst-blue-dark dark:group-hover:text-pst-blue',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      danger: 'text-red-600 dark:text-red-400',
      info: 'text-blue-600 dark:text-blue-400'
    };
    return colorClasses[this.config.color || 'primary'];
  });
  
  // Computed property for section widget icon classes
  protected sectionWidgetIconClasses = computed(() => {
    const colorClasses = {
      primary: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      secondary: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      success: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      warning: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      danger: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      info: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
    };
    
    if (this.config.isHighlighted) {
      return 'text-primary dark:text-primary';
    }
    
    return colorClasses[this.config.color || 'primary'];
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
}
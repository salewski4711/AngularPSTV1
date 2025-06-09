import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'pst-dashboard-widget-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative h-full p-6 bg-white dark:bg-black-lighter rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- Header Skeleton -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <!-- Icon Skeleton -->
          <pst-skeleton 
            variant="circular" 
            [width]="'48px'" 
            [height]="'48px'"
            class="flex-shrink-0" />
          
          <!-- Badge Skeleton -->
          @if (showBadge) {
            <pst-skeleton 
              variant="rectangular" 
              [width]="'32px'" 
              [height]="'20px'" />
          }
        </div>
        
        <!-- Trend Skeleton -->
        @if (showTrend) {
          <pst-skeleton 
            variant="text" 
            [width]="'60px'" 
            [height]="'16px'" />
        }
      </div>
      
      <!-- Body Skeleton -->
      <div class="flex-1">
        <!-- Title Skeleton -->
        <pst-skeleton 
          variant="text" 
          [width]="'180px'" 
          [height]="'24px'"
          class="mb-2" />
        
        <!-- Description Skeleton -->
        @if (showDescription) {
          <pst-skeleton 
            variant="text" 
            [width]="'220px'" 
            [height]="'16px'"
            class="mb-3" />
        }
        
        <!-- Stat Value Skeleton -->
        @if (type === 'stat') {
          <div class="mt-4">
            <pst-skeleton 
              variant="text" 
              [width]="'120px'" 
              [height]="'36px'" />
          </div>
        }
      </div>
      
      <!-- Action Indicator Skeleton -->
      @if (type === 'action' || type === 'category') {
        <div class="absolute bottom-4 right-4">
          <pst-skeleton 
            variant="circular" 
            [width]="'20px'" 
            [height]="'20px'" />
        </div>
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
export class DashboardWidgetSkeletonComponent {
  @Input() type: 'stat' | 'action' | 'navigation' | 'category' = 'category';
  @Input() showBadge = Math.random() > 0.5;
  @Input() showTrend = Math.random() > 0.7;
  @Input() showDescription = Math.random() > 0.3;
}
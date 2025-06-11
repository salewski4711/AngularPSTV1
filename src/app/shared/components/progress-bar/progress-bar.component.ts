import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { progressBarClasses } from '../../../core/design-system/component-classes';

export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'pst-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Linear Progress -->
    <div *ngIf="variant === 'linear'" [class]="containerClasses()">
      <div class="flex justify-between items-center mb-2" *ngIf="showLabel">
        <span [class]="labelClasses()">{{ label }}</span>
        <span [class]="labelClasses()">{{ Math.round((value / max) * 100) }}%</span>
      </div>
      <div [class]="linearTrackClasses()">
        <div 
          [class]="linearBarClasses()"
          [style.width.%]="(value / max) * 100"
          [attr.role]="'progressbar'"
          [attr.aria-valuenow]="value"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="max"
          [attr.aria-label]="label || 'Progress'">
        </div>
      </div>
    </div>

    <!-- Circular Progress -->
    <div *ngIf="variant === 'circular'" [class]="circularContainerClasses()">
      <svg [class]="svgClasses()" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          [attr.r]="radius"
          fill="none"
          [attr.stroke-width]="strokeWidth"
          [class]="backgroundCircleClass"
        />
        <!-- Progress circle -->
        <circle
          cx="50"
          cy="50"
          [attr.r]="radius"
          fill="none"
          [attr.stroke-width]="strokeWidth"
          [class]="circularBarClasses()"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="strokeDashoffset"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center" *ngIf="showLabel">
        <span [class]="circularLabelClasses()">{{ value }}%</span>
      </div>
    </div>
  `,
  styles: [`
    @keyframes progress-animation {
      from { width: 0; }
    }
    
    .animate-progress {
      animation: progress-animation 1s ease-out;
    }

    @keyframes pulse-animation {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    .animate-pulse-custom {
      animation: pulse-animation 2s ease-in-out infinite;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() variant: ProgressVariant = 'linear';
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: ProgressSize = 'md';
  @Input() color: ProgressColor = 'primary';
  @Input() label?: string;
  @Input() showLabel = true;
  @Input() animated = true;
  @Input() indeterminate = false;

  // Expose Math for template
  Math = Math;

  get radius(): number {
    return 45 - this.strokeWidth / 2;
  }

  get strokeWidth(): number {
    const widths: Record<ProgressSize, number> = {
      sm: 4,
      md: 6,
      lg: 8
    };
    return widths[this.size];
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get strokeDashoffset(): number {
    const offset = this.circumference - (this.value / 100) * this.circumference;
    return offset;
  }

  // Static class definitions
  backgroundCircleClass = 'stroke-gray-200 dark:stroke-gray-700';
  
  containerClasses = computed(() => 'w-full');
  
  linearTrackClasses = computed(() => {
    return [
      progressBarClasses.linear.track.base,
      progressBarClasses.linear.track.sizes[this.size]
    ].join(' ');
  });
  
  linearBarClasses = computed(() => {
    const classes = [
      progressBarClasses.linear.bar.base,
      progressBarClasses.linear.bar.colors[this.color]
    ];
    
    if (this.animated && !this.indeterminate) {
      classes.push('animate-progress');
    }
    
    if (this.indeterminate) {
      classes.push('animate-pulse-custom');
    }
    
    return classes.join(' ');
  });
  
  circularContainerClasses = computed(() => {
    return [
      progressBarClasses.circular.container.base,
      progressBarClasses.circular.container.sizes[this.size]
    ].join(' ');
  });
  
  svgClasses = computed(() => progressBarClasses.circular.svg);
  
  circularBarClasses = computed(() => {
    return [
      progressBarClasses.circular.bar.base,
      progressBarClasses.circular.bar.colors[this.color]
    ].join(' ');
  });
  
  circularLabelClasses = computed(() => {
    return [
      progressBarClasses.circular.label.base,
      progressBarClasses.circular.label.sizes[this.size]
    ].join(' ');
  });
  
  labelClasses = computed(() => progressBarClasses.label);
}
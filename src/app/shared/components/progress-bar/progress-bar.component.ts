import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'linear' | 'segmented' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Linear Progress -->
    <div *ngIf="variant === 'linear'" [class]="containerClasses">
      <div class="flex justify-between items-center mb-2" *ngIf="showLabel">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ label }}</span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ value }}%</span>
      </div>
      <div [class]="linearTrackClasses">
        <div 
          [class]="linearBarClasses"
          [style.width.%]="value"
          [attr.role]="'progressbar'"
          [attr.aria-valuenow]="value"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          [attr.aria-label]="label || 'Progress'">
        </div>
      </div>
    </div>

    <!-- Segmented Progress -->
    <div *ngIf="variant === 'segmented'" [class]="containerClasses">
      <div class="flex justify-between items-center mb-2" *ngIf="showLabel">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ label }}</span>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ completedSegments }}/{{ segments }}</span>
      </div>
      <div class="flex gap-1">
        <div 
          *ngFor="let segment of segmentArray; let i = index"
          [class]="getSegmentClasses(i)"
          [attr.role]="'progressbar'"
          [attr.aria-valuenow]="i < completedSegments ? 100 : 0"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100">
        </div>
      </div>
    </div>

    <!-- Circular Progress -->
    <div *ngIf="variant === 'circular'" [class]="circularContainerClasses">
      <svg [class]="svgClasses" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          [attr.r]="radius"
          fill="none"
          [attr.stroke-width]="strokeWidth"
          class="stroke-gray-200 dark:stroke-gray-700"
        />
        <!-- Progress circle -->
        <circle
          cx="50"
          cy="50"
          [attr.r]="radius"
          fill="none"
          [attr.stroke-width]="strokeWidth"
          [class]="circularBarClasses"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="strokeDashoffset"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center" *ngIf="showLabel">
        <span [class]="circularLabelClasses">{{ value }}%</span>
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
  @Input() size: ProgressSize = 'md';
  @Input() color: ProgressColor = 'primary';
  @Input() label?: string;
  @Input() showLabel = true;
  @Input() animated = true;
  @Input() segments = 4; // For segmented variant
  @Input() indeterminate = false;

  get completedSegments(): number {
    return Math.floor((this.value / 100) * this.segments);
  }

  get segmentArray(): number[] {
    return Array(this.segments).fill(0);
  }

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

  private readonly sizeClasses: Record<ProgressSize, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  private readonly colorClasses: Record<ProgressColor, string> = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  private readonly strokeColorClasses: Record<ProgressColor, string> = {
    primary: 'stroke-primary',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500',
    info: 'stroke-blue-500'
  };

  get containerClasses(): string {
    return 'w-full';
  }

  get linearTrackClasses(): string {
    return `w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${this.sizeClasses[this.size]}`;
  }

  get linearBarClasses(): string {
    const classes = [
      'h-full rounded-full transition-all duration-500 ease-out',
      this.colorClasses[this.color]
    ];
    
    if (this.animated && !this.indeterminate) {
      classes.push('animate-progress');
    }
    
    if (this.indeterminate) {
      classes.push('animate-pulse-custom');
    }
    
    return classes.join(' ');
  }

  getSegmentClasses(index: number): string {
    const baseClasses = [
      'flex-1 rounded-full transition-all duration-300',
      this.sizeClasses[this.size]
    ];
    
    if (index < this.completedSegments) {
      baseClasses.push(this.colorClasses[this.color]);
    } else {
      baseClasses.push('bg-gray-200 dark:bg-gray-700');
    }
    
    return baseClasses.join(' ');
  }

  get circularContainerClasses(): string {
    const sizes: Record<ProgressSize, string> = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32'
    };
    return `relative ${sizes[this.size]}`;
  }

  get svgClasses(): string {
    return 'w-full h-full transform -rotate-90';
  }

  get circularBarClasses(): string {
    return `${this.strokeColorClasses[this.color]} transition-all duration-500 ease-out`;
  }

  get circularLabelClasses(): string {
    const sizes: Record<ProgressSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    return `${sizes[this.size]} font-medium text-gray-700 dark:text-gray-300`;
  }
}
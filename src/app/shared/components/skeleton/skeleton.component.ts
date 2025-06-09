import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'button';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

@Component({
  selector: 'pst-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Text Skeleton -->
    <div *ngIf="variant === 'text'" class="space-y-2">
      <div 
        *ngFor="let line of textLines; let i = index"
        [class]="getTextClasses(i)"
        [style.width]="getLineWidth(i)">
      </div>
    </div>

    <!-- Circular Skeleton -->
    <div 
      *ngIf="variant === 'circular'"
      [class]="circularClasses"
      [style.width]="width || '40px'"
      [style.height]="height || '40px'">
    </div>

    <!-- Rectangular Skeleton -->
    <div 
      *ngIf="variant === 'rectangular'"
      [class]="rectangularClasses"
      [style.width]="width || '100%'"
      [style.height]="height || '120px'">
    </div>

    <!-- Button Skeleton -->
    <div 
      *ngIf="variant === 'button'"
      [class]="buttonClasses"
      [style.width]="width || '100px'"
      [style.height]="height || '36px'">
    </div>
  `,
  styles: [`
    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes skeleton-wave {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .skeleton-pulse {
      animation: skeleton-pulse 2s ease-in-out infinite;
    }

    .skeleton-wave {
      position: relative;
      overflow: hidden;
    }

    .skeleton-wave::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: skeleton-wave 1.6s linear infinite;
    }

    .dark .skeleton-wave::after {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width?: string;
  @Input() height?: string;
  @Input() lines = 3; // For text variant
  @Input() animation: SkeletonAnimation = 'pulse';
  @Input() rounded = false;

  get textLines(): number[] {
    return Array(this.lines).fill(0);
  }

  getLineWidth(index: number): string {
    // Last line is typically shorter
    if (index === this.lines - 1 && this.lines > 1) {
      return '80%';
    }
    return '100%';
  }

  private get baseClasses(): string {
    const classes = ['bg-gray-200 dark:bg-gray-700'];
    
    if (this.animation === 'pulse') {
      classes.push('skeleton-pulse');
    } else if (this.animation === 'wave') {
      classes.push('skeleton-wave');
    }
    
    return classes.join(' ');
  }

  getTextClasses(index: number): string {
    return `${this.baseClasses} h-4 rounded`;
  }

  get circularClasses(): string {
    return `${this.baseClasses} rounded-full`;
  }

  get rectangularClasses(): string {
    const classes = [this.baseClasses];
    classes.push(this.rounded ? 'rounded-lg' : 'rounded');
    return classes.join(' ');
  }

  get buttonClasses(): string {
    return `${this.baseClasses} rounded-md`;
  }
}
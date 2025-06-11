import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';
import { skeletonClasses as staticSkeletonClasses } from '../../../core/design-system/component-classes/atoms.classes';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'button';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

@Component({
  selector: 'pst-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Text Skeleton -->
    <div *ngIf="variant === 'text'" [style.gap.rem]="0.5" class="flex flex-col">
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
    return cn(
      staticSkeletonClasses.base,
      staticSkeletonClasses.animations[this.animation]
    );
  }

  getTextClasses(index: number): string {
    return cn(
      this.baseClasses,
      staticSkeletonClasses.variants.text.base
    );
  }

  get circularClasses(): string {
    return cn(
      this.baseClasses,
      staticSkeletonClasses.variants.circular
    );
  }

  get rectangularClasses(): string {
    return cn(
      this.baseClasses,
      staticSkeletonClasses.variants.rectangular.base,
      this.rounded && staticSkeletonClasses.variants.rectangular.rounded
    );
  }

  get buttonClasses(): string {
    return cn(
      this.baseClasses,
      staticSkeletonClasses.variants.button
    );
  }
}
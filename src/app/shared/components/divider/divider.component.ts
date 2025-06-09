import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerSpacing = 'sm' | 'md' | 'lg';

@Component({
  selector: 'pst-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="dividerClasses"
      [attr.role]="'separator'"
      [attr.aria-orientation]="orientation">
      <span *ngIf="label" [class]="labelClasses">
        {{ label }}
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent {
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() variant: DividerVariant = 'solid';
  @Input() spacing: DividerSpacing = 'md';
  @Input() label?: string;
  @Input() color?: string;

  private readonly spacingClasses: Record<DividerSpacing, { horizontal: string; vertical: string }> = {
    sm: {
      horizontal: 'my-2',
      vertical: 'mx-2'
    },
    md: {
      horizontal: 'my-4',
      vertical: 'mx-4'
    },
    lg: {
      horizontal: 'my-8',
      vertical: 'mx-8'
    }
  };

  private readonly variantClasses: Record<DividerVariant, string> = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  };

  get dividerClasses(): string {
    const classes = ['relative'];
    
    if (this.orientation === 'horizontal') {
      classes.push(
        'w-full',
        this.spacingClasses[this.spacing].horizontal,
        'border-t',
        this.label ? 'flex items-center' : ''
      );
    } else {
      classes.push(
        'h-full inline-block',
        this.spacingClasses[this.spacing].vertical,
        'border-l',
        this.label ? 'flex flex-col items-center justify-center' : ''
      );
    }

    classes.push(
      this.variantClasses[this.variant],
      this.color || 'border-gray-300 dark:border-gray-600'
    );

    return classes.filter(Boolean).join(' ');
  }

  get labelClasses(): string {
    const baseClasses = [
      'bg-white dark:bg-gray-900',
      'text-sm text-gray-600 dark:text-gray-400'
    ];

    if (this.orientation === 'horizontal') {
      baseClasses.push('px-4', 'absolute', 'left-1/2', '-translate-x-1/2', '-top-3');
    } else {
      baseClasses.push('py-2', 'absolute', 'top-1/2', '-translate-y-1/2', 'whitespace-nowrap');
    }

    return baseClasses.join(' ');
  }
}
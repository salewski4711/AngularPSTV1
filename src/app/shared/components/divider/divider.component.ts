import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dividerClasses } from '../../../core/design-system/component-classes/atoms.classes';

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

  get dividerClasses(): string {
    const classes: string[] = [dividerClasses.base];
    
    // Orientation classes
    if (this.orientation === 'horizontal') {
      classes.push(
        dividerClasses.orientation.horizontal.base,
        dividerClasses.spacing.horizontal[this.spacing],
        this.label ? dividerClasses.orientation.horizontal.withLabel : ''
      );
    } else {
      classes.push(
        dividerClasses.orientation.vertical.base,
        dividerClasses.spacing.vertical[this.spacing],
        this.label ? dividerClasses.orientation.vertical.withLabel : ''
      );
    }

    // Variant classes
    classes.push(dividerClasses.variants[this.variant]);
    
    // Color classes
    classes.push(this.color || dividerClasses.colors.default);

    return classes.filter(Boolean).join(' ');
  }

  get labelClasses(): string {
    const classes: string[] = [dividerClasses.label.base];

    if (this.orientation === 'horizontal') {
      classes.push(dividerClasses.label.horizontal);
    } else {
      classes.push(dividerClasses.label.vertical);
    }

    return classes.join(' ');
  }
}
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' 
  | 'subtitle1' | 'subtitle2'
  | 'caption' | 'overline';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <h1 *ngSwitchCase="'h1'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h1>
      <h2 *ngSwitchCase="'h2'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h2>
      <h3 *ngSwitchCase="'h3'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h3>
      <h4 *ngSwitchCase="'h4'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h4>
      <h5 *ngSwitchCase="'h5'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h5>
      <h6 *ngSwitchCase="'h6'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </h6>
      <p *ngSwitchCase="'body1'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <p *ngSwitchCase="'body2'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <p *ngSwitchCase="'subtitle1'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <p *ngSwitchCase="'subtitle2'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <span *ngSwitchCase="'caption'" [class]="classes" [style.color]="color">
        <ng-content></ng-content>
      </span>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})export class TypographyComponent {
  @Input() variant: TypographyVariant = 'body1';
  @Input() align: TypographyAlign = 'left';
  @Input() weight?: TypographyWeight;
  @Input() color?: string;
  @Input() noMargin = false;
  @Input() truncate = false;
  
  private variantClasses: Record<TypographyVariant, string> = {
    h1: 'text-5xl font-bold leading-tight',
    h2: 'text-4xl font-semibold leading-tight',
    h3: 'text-3xl font-semibold leading-snug',
    h4: 'text-2xl font-medium leading-snug',
    h5: 'text-xl font-medium leading-normal',
    h6: 'text-lg font-medium leading-normal',
    body1: 'text-base font-normal leading-relaxed',
    body2: 'text-sm font-normal leading-relaxed',
    subtitle1: 'text-lg font-normal leading-relaxed',
    subtitle2: 'text-base font-medium leading-normal',
    caption: 'text-xs font-normal leading-normal',
    overline: 'text-xs font-medium uppercase tracking-wider'
  };
  
  private weightClasses: Record<TypographyWeight, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  get classes(): string {
    const baseClasses = [this.variantClasses[this.variant]];
    
    // Überschreibe Font-Weight wenn explizit gesetzt
    if (this.weight) {
      baseClasses.push(this.weightClasses[this.weight]);
    }
    
    // Text-Align
    if (this.align !== 'left') {
      baseClasses.push(`text-${this.align}`);
    }
    
    // Margin Reset
    if (this.noMargin) {
      baseClasses.push('m-0');
    }
    
    // Text Truncate
    if (this.truncate) {
      baseClasses.push('truncate');
    }
    
    return baseClasses.join(' ');
  }
}
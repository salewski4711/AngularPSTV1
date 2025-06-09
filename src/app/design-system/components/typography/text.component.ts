import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'overline';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

@Component({
  selector: 'pst-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <h1 *ngSwitchCase="'h1'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h1>
      <h2 *ngSwitchCase="'h2'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h2>
      <h3 *ngSwitchCase="'h3'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h3>
      <h4 *ngSwitchCase="'h4'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h4>
      <h5 *ngSwitchCase="'h5'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h5>
      <h6 *ngSwitchCase="'h6'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </h6>
      <p *ngSwitchCase="'body'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <p *ngSwitchCase="'body-sm'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </p>
      <span *ngSwitchCase="'caption'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </span>
      <span *ngSwitchCase="'overline'" [class]="textClasses" [style.color]="color">
        <ng-content></ng-content>
      </span>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input() variant: TextVariant = 'body';
  @Input() align: TextAlign = 'left';
  @Input() weight?: TextWeight;
  @Input() color?: string;
  @Input() truncate = false;
  @Input() noMargin = false;
  @Input() className = '';
  
  private variantClasses: Record<TextVariant, string> = {
    'h1': 'text-2xl font-bold leading-tight tracking-tight',
    'h2': 'text-xl font-semibold leading-tight tracking-tight',
    'h3': 'text-lg font-semibold leading-tight tracking-tight',
    'h4': 'text-base font-semibold leading-tight',
    'h5': 'text-sm font-semibold leading-tight',
    'h6': 'text-xs font-semibold leading-tight',
    'body': 'text-base font-normal leading-normal',
    'body-sm': 'text-sm font-normal leading-normal',
    'caption': 'text-xs font-normal leading-normal',
    'overline': 'text-xs font-medium uppercase tracking-wider'
  };
  
  private weightClasses: Record<TextWeight, string> = {
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold'
  };
  
  private alignClasses: Record<TextAlign, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right',
    'justify': 'text-justify'
  };
  
  get textClasses(): string {
    const base = [
      this.variantClasses[this.variant],
      this.alignClasses[this.align],
      'text-gray-900 dark:text-white-dark'
    ];
    
    // Override weight if specified
    if (this.weight) {
      base.push(this.weightClasses[this.weight]);
    }
    
    // Additional modifiers
    if (this.truncate) {base.push('truncate');}
    if (this.noMargin) {base.push('!m-0');}
    if (this.className) {base.push(this.className);}
    
    return base.filter(Boolean).join(' ');
  }
}
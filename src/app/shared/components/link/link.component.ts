import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';

export type LinkVariant = 'default' | 'primary' | 'muted';
export type LinkSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'pst-link',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <a
      *ngIf="href"
      [href]="href"
      [target]="external ? '_blank' : '_self'"
      [rel]="external ? 'noopener noreferrer' : null"
      [class]="linkClasses"
      [class.pointer-events-none]="disabled"
      [attr.aria-disabled]="disabled"
      (click)="handleClick($event)">
      <ng-content></ng-content>
      <pst-icon 
        *ngIf="external" 
        name="external-link" 
        [size]="iconSize"
        class="ml-1 inline-block">
      </pst-icon>
    </a>
    
    <a
      *ngIf="routerLink && !href"
      [routerLink]="routerLink"
      [queryParams]="queryParams"
      [fragment]="fragment"
      [class]="linkClasses"
      [class.pointer-events-none]="disabled"
      [attr.aria-disabled]="disabled"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input() href?: string;
  @Input() routerLink?: string | any[];
  @Input() queryParams?: { [key: string]: any };
  @Input() fragment?: string;
  @Input() variant: LinkVariant = 'default';
  @Input() size: LinkSize = 'md';
  @Input() external = false;
  @Input() underline = true;
  @Input() disabled = false;
  @Output() linkClick = new EventEmitter<MouseEvent>();

  private readonly variantClasses: Record<LinkVariant, string> = {
    default: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300',
    primary: 'text-primary hover:text-primary-dark',
    muted: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
  };

  private readonly sizeClasses: Record<LinkSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  get linkClasses(): string {
    const classes = [
      'inline-flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded',
      this.variantClasses[this.variant],
      this.sizeClasses[this.size]
    ];

    if (this.underline && !this.disabled) {
      classes.push('hover:underline');
    }

    if (this.disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    }

    return classes.join(' ');
  }

  get iconSize(): number {
    const sizes: Record<LinkSize, number> = {
      sm: 12,
      md: 14,
      lg: 16
    };
    return sizes[this.size];
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.linkClick.emit(event);
  }
}
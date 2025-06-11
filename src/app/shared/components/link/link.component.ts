import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import { linkClasses as linkClassDefs } from '../../../core/design-system/component-classes';

export type LinkVariant = 'default' | 'primary' | 'muted';
export type LinkSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'pst-link',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    @if (href) {
      <a
        [href]="href"
        [target]="external ? '_blank' : '_self'"
        [rel]="external ? 'noopener noreferrer' : null"
        [class]="linkClasses()"
        [attr.aria-disabled]="disabled || null"
        (click)="handleClick($event)">
        <ng-content></ng-content>
        @if (external) {
          <pst-icon 
            name="external-link" 
            [size]="iconSize()"
            [class]="linkClassDefs.externalIcon">
          </pst-icon>
        }
      </a>
    } @else if (routerLink) {
      <a
        [routerLink]="routerLink"
        [queryParams]="queryParams"
        [fragment]="fragment"
        [class]="linkClasses()"
        [attr.aria-disabled]="disabled || null"
        (click)="handleClick($event)">
        <ng-content></ng-content>
      </a>
    }
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

  protected readonly linkClassDefs = linkClassDefs;

  linkClasses = computed(() => {
    const classes = [
      linkClassDefs.base,
      linkClassDefs.variants[this.variant],
      linkClassDefs.sizes[this.size]
    ];

    if (this.underline && !this.disabled) {
      classes.push(linkClassDefs.underline);
    }

    if (this.disabled) {
      classes.push(linkClassDefs.disabled);
    }

    return classes.join(' ');
  });

  iconSize = computed(() => {
    const sizes: Record<LinkSize, number> = {
      sm: 12,
      md: 14,
      lg: 16
    };
    return sizes[this.size];
  });

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.linkClick.emit(event);
  }
}
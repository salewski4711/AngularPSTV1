import { Component, Input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS, IconName, isValidIconName } from './icon-definitions';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (iconPath()) {
      <svg 
        [attr.width]="size"
        [attr.height]="size"
        [attr.viewBox]="viewBox()"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        [class]="cssClasses"
        role="img"
        [attr.aria-label]="ariaLabel || name"
      >
        <path [attr.d]="iconPath()" />
      </svg>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size: number = 20;
  @Input() cssClasses: string = '';
  @Input() ariaLabel?: string;

  iconPath = computed(() => {
    if (isValidIconName(this.name)) {
      const icon = ICONS[this.name];
      return icon ? icon.path : null;
    }
    return null;
  });

  viewBox = computed(() => {
    if (isValidIconName(this.name)) {
      const icon = ICONS[this.name];
      return icon ? icon.viewBox : '0 0 24 24';
    }
    return '0 0 24 24';
  });
}

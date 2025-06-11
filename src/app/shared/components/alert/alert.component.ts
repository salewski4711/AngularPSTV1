import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AlertType } from './alert.types';
import { IconComponent } from '../../icons/icon.component';
import { alertClasses as alertClassDefs } from '../../../core/design-system/component-classes';

@Component({
  selector: 'pst-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }), // equivalent to spacing-5
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })) // equivalent to spacing-5
      ])
    ])
  ],
  template: `
    <div
      [@slideIn]
      [class]="alertClasses()"
      role="alert"
      [attr.aria-live]="type === 'error' ? 'assertive' : 'polite'"
    >
      <div class="flex-shrink-0">
        <pst-icon
          [name]="iconName()"
          [class]="iconClasses()"
          size="sm"
        />
      </div>
      <div class="flex-1">
        <p [class]="messageClasses()">{{ message }}</p>
      </div>
      @if (dismissible) {
        <div class="ml-auto flex-shrink-0">
          <button
            type="button"
            (click)="handleClose()"
            [class]="closeButtonClasses()"
            aria-label="Dismiss alert"
          >
            <pst-icon name="x" size="xs" />
          </button>
        </div>
      }
    </div>
  `
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() type: AlertType = 'info';
  @Input() message = '';
  @Input() dismissible = true;
  @Input() duration?: number;
  @Output() close = new EventEmitter<void>();

  private dismissTimer?: ReturnType<typeof setTimeout>;
  private visible = signal(true);

  alertClasses = computed(() => {
    const baseClasses = 'relative transition-all duration-200';
    return `${baseClasses} ${alertClassDefs.base} ${alertClassDefs.variants[this.type]}`;
  });

  iconName = computed(() => {
    const iconMap: Record<AlertType, string> = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info'
    };
    return iconMap[this.type];
  });

  iconClasses = computed(() => {
    // Use the icon classes from alertClassDefs, but need to add dark mode variants
    const darkModeClasses: Record<AlertType, string> = {
      success: 'dark:text-success-400',
      error: 'dark:text-error-400',
      warning: 'dark:text-warning-400',
      info: 'dark:text-info-400'
    };
    return `${alertClassDefs.icon[this.type]} ${darkModeClasses[this.type]}`;
  });

  closeButtonClasses = computed(() => {
    const colorClasses: Record<AlertType, string> = {
      success: 'text-success-600 hover:text-success-700 dark:text-success-400 dark:hover:text-success-300 focus:ring-success-500',
      error: 'text-error-600 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300 focus:ring-error-500',
      warning: 'text-warning-600 hover:text-warning-700 dark:text-warning-400 dark:hover:text-warning-300 focus:ring-warning-500',
      info: 'text-info-600 hover:text-info-700 dark:text-info-400 dark:hover:text-info-300 focus:ring-info-500'
    };
    return `${alertClassDefs.closeButton} ${colorClasses[this.type]}`;
  });

  messageClasses = computed(() => {
    return alertClassDefs.title; // Using the title class which includes text-sm font-medium
  });

  ngOnInit(): void {
    if (this.duration && this.duration > 0) {
      this.dismissTimer = setTimeout(() => {
        this.handleClose();
      }, this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
  }

  handleClose(): void {
    this.visible.set(false);
    this.close.emit();
  }
}
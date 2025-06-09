import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AlertType, AlertIcons } from './alert.types';
import { IconComponent } from '../../icons/icon.component';

@Component({
  selector: 'pst-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideIn', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
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
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <pst-icon
            [name]="iconName()"
            [class]="iconClasses()"
            size="sm"
          />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>
        @if (dismissible) {
          <div class="ml-4 flex-shrink-0">
            <button
              type="button"
              (click)="handleClose()"
              class="inline-flex rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
              [class]="closeButtonClasses()"
              aria-label="Dismiss alert"
            >
              <pst-icon name="x" size="xs" />
            </button>
          </div>
        }
      </div>
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
    const baseClasses = 'relative p-4 rounded-lg border transition-all duration-200';
    
    const typeClasses: Record<AlertType, string> = {
      success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
      error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
      info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800'
    };

    return `${baseClasses} ${typeClasses[this.type]}`;
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
    const iconColorClasses: Record<AlertType, string> = {
      success: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400'
    };
    return iconColorClasses[this.type];
  });

  closeButtonClasses = computed(() => {
    const closeColorClasses: Record<AlertType, string> = {
      success: 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 focus:ring-green-500',
      error: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:ring-red-500',
      warning: 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 focus:ring-yellow-500',
      info: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:ring-blue-500'
    };
    return closeColorClasses[this.type];
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
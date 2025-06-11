import { Component, ElementRef, HostListener, ViewChild, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { BadgeComponent } from '../badge/badge.component';
import { IconComponent } from '../../icons/icon.component';
import { NotificationsService, Notification, NotificationType } from '../../services/notifications.service';
import { cn } from '../../utils/tailwind.utils';
import { TokenUtils } from '../../../core/design-system/token-utilities';

@Component({
  selector: 'pst-notifications',
  standalone: true,
  imports: [CommonModule, BadgeComponent, IconComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class NotificationsComponent {
  @ViewChild('dropdownRef', { read: ElementRef }) dropdownRef?: ElementRef;
  
  isOpen = signal(false);
  notifications = computed(() => this.notificationsService.notifications());
  unreadCount = computed(() => this.notificationsService.unreadCount());
  hasNotifications = computed(() => this.notifications().length > 0);
  
  // Icon sizes
  readonly iconSizes = {
    small: 16,
    medium: 20,
    large: 48
  };
  
  notificationIcons: Record<NotificationType, string> = {
    info: 'info',
    success: 'check-circle',
    warning: 'alert-circle',
    error: 'x-circle'
  };
  
  notificationStyles: Record<NotificationType, string> = {
    info: 'text-blue-600 bg-blue-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-amber-600 bg-amber-100',
    error: 'text-red-600 bg-red-100'
  };

  // Dynamic class getters
  get bellButtonClasses(): string {
    return cn(
      'relative',
      TokenUtils.getSpacingClass('p', '2'),
      'text-gray-600 hover:text-gray-900',
      'dark:text-gray-300 dark:hover:text-white',
      'transition-colors'
    );
  }

  get dropdownClasses(): string {
    return cn(
      'absolute right-0',
      TokenUtils.getSpacingClass('mt', '2'),
      'w-96 bg-white dark:bg-gray-800',
      'rounded-lg shadow-lg',
      'ring-1 ring-black ring-opacity-5',
      'z-50'
    );
  }

  get dropdownHeaderClasses(): string {
    return cn(
      TokenUtils.getSpacingClass('px', '4'),
      TokenUtils.getSpacingClass('py', '3'),
      'border-b border-gray-200 dark:border-gray-700'
    );
  }

  get notificationListClasses(): string {
    return 'max-h-96 overflow-y-auto';
  }

  get notificationIconContainerClasses(): string {
    return cn(
      'flex-shrink-0 w-10 h-10',
      'rounded-full flex items-center justify-center'
    );
  }

  get emptyStateContainerClasses(): string {
    return cn(
      TokenUtils.getSpacingClass('px', '4'),
      TokenUtils.getSpacingClass('py', '12'),
      'text-center'
    );
  }

  get footerClasses(): string {
    return cn(
      TokenUtils.getSpacingClass('px', '4'),
      TokenUtils.getSpacingClass('py', '3'),
      'border-t border-gray-200 dark:border-gray-700'
    );
  }

  get badgeClasses(): string {
    return cn(
      'absolute -top-1 -right-1',
      'min-w-[20px] h-5',
      'flex items-center justify-center'
    );
  }

  constructor(
    private notificationsService: NotificationsService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(open => !open);
  }

  markAsRead(notification: Notification): void {
    if (!notification.read) {
      this.notificationsService.markAsRead(notification.id);
    }
  }

  markAllAsRead(): void {
    this.notificationsService.markAllAsRead();
  }

  dismissNotification(event: Event, notificationId: string): void {
    event.stopPropagation();
    this.notificationsService.dismissNotification(notificationId);
  }

  clearAll(): void {
    this.notificationsService.clearAll();
    this.isOpen.set(false);
  }

  executeAction(event: Event, action: () => void): void {
    event.stopPropagation();
    action();
  }

  getNotificationIcon(type: NotificationType): string {
    return this.notificationIcons[type];
  }

  getNotificationStyles(type: NotificationType): string {
    return this.notificationStyles[type];
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Gerade eben';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `vor ${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `vor ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
    }
  }

  notificationClasses(notification: Notification): string {
    return cn(
      TokenUtils.getSpacingClass('px', '4'),
      TokenUtils.getSpacingClass('py', '3'),
      'hover:bg-gray-50 dark:hover:bg-gray-700',
      'transition-colors cursor-pointer',
      'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
      !notification.read && 'bg-blue-50 dark:bg-blue-900/20'
    );
  }

  getNotificationContentClasses(): string {
    return cn(
      'flex items-start gap-3'
    );
  }

  getDismissButtonClasses(): string {
    return cn(
      'flex-shrink-0',
      TokenUtils.getSpacingClass('p', '1'),
      'text-gray-400 hover:text-gray-600',
      'dark:text-gray-500 dark:hover:text-gray-300',
      'transition-colors'
    );
  }
}
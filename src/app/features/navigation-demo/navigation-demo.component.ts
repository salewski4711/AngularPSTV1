import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopNavigationComponent, HeaderConfig } from '../../shared/components/top-navigation/top-navigation.component';
import { NavigationService, NavigationItem } from '../../core/services/navigation.service';
import { NotificationsService, NotificationType } from '../../shared/services/notifications.service';
import { AuthService } from '../auth/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import { ToggleComponent } from '../../shared/components/toggle/toggle.component';

@Component({
  selector: 'pst-navigation-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TopNavigationComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    ToggleComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Navigation Component Demo</h1>
      
      <!-- Demo Navigation -->
      <div class="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <pst-top-navigation
          [config]="navigationConfig"
          (logoClick)="onLogoClick()"
          (searchSubmit)="onSearchSubmit($event)"
          (notificationClick)="onNotificationClick($event)"
          (userMenuAction)="onUserMenuAction($event)"
          (mobileMenuToggle)="onMobileMenuToggle($event)"
        ></pst-top-navigation>
      </div>

      <!-- Configuration Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Configuration Options -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Navigation Configuration</h2>
          
          <div class="space-y-4">
            <!-- Toggle Options -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Show Logo</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.showLogo"
                  label="Logo Visibility"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Show Search</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.showSearch"
                  label="Search Visibility"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Show Notifications</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.showNotifications"
                  label="Notifications Visibility"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Show User Menu</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.showUserMenu"
                  label="User Menu Visibility"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Sticky Header</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.sticky"
                  label="Sticky Behavior"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Transparent</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.transparent"
                  label="Transparent Style"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Elevated</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.elevated"
                  label="Shadow Effect"
                ></pst-toggle>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Full Width</label>
                <pst-toggle
                  [(ngModel)]="navigationConfig.fullWidth"
                  label="Full Width Layout"
                ></pst-toggle>
              </div>
            </div>
            
            <!-- Logo Variant Selector -->
            <div>
              <label class="block text-sm font-medium mb-2">Logo Variant</label>
              <pst-select
                [(ngModel)]="navigationConfig.logoVariant"
                [options]="logoVariantOptions"
                placeholder="Select logo variant"
              ></pst-select>
            </div>
            
            <!-- Custom Class Input -->
            <div>
              <label class="block text-sm font-medium mb-2">Custom CSS Class</label>
              <pst-input
                [(ngModel)]="navigationConfig.customClass"
                placeholder="e.g., bg-primary-500"
              ></pst-input>
            </div>
          </div>
        </div>

        <!-- Actions & Events -->
        <div class="space-y-6">
          <!-- Notification Controls -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Notification Controls</h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Add Notification</label>
                <div class="flex gap-2">
                  <pst-select
                    [(ngModel)]="newNotificationType"
                    [options]="notificationTypes"
                    placeholder="Type"
                    class="flex-1"
                  ></pst-select>
                  <pst-input
                    [(ngModel)]="newNotificationTitle"
                    placeholder="Title"
                    class="flex-2"
                  ></pst-input>
                  <pst-button
                    (click)="addNotification()"
                    variant="primary"
                    [disabled]="!newNotificationTitle"
                  >
                    Add
                  </pst-button>
                </div>
              </div>
              
              <div class="flex gap-2">
                <pst-button
                  (click)="markAllAsRead()"
                  variant="secondary"
                  size="sm"
                >
                  Mark All Read
                </pst-button>
                <pst-button
                  (click)="clearAllNotifications()"
                  variant="danger"
                  size="sm"
                >
                  Clear All
                </pst-button>
              </div>
              
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Unread notifications: {{ unreadCount() }}
              </div>
            </div>
          </div>

          <!-- Navigation Items -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Navigation Items</h2>
            
            <div class="space-y-2">
              @for (item of navigationItems$ | async; track item.id) {
                <div class="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-600 rounded">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium">{{ item.label }}</span>
                    <span class="text-xs text-gray-500">{{ item.path }}</span>
                    @if (item.badge) {
                      <span class="px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
                        {{ item.badge }}
                      </span>
                    }
                  </div>
                  <div class="flex gap-1">
                    <pst-button
                      (click)="setBadge(item.id)"
                      size="sm"
                      variant="ghost"
                    >
                      Badge
                    </pst-button>
                    <pst-button
                      (click)="removeNavigationItem(item.id)"
                      size="sm"
                      variant="ghost"
                    >
                      Remove
                    </pst-button>
                  </div>
                </div>
              }
            </div>
            
            <div class="mt-4">
              <pst-button
                (click)="addNavigationItem()"
                variant="primary"
                size="sm"
              >
                Add Custom Item
              </pst-button>
            </div>
          </div>

          <!-- Event Log -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-4">Event Log</h2>
            
            <div class="space-y-2 max-h-64 overflow-y-auto">
              @for (event of eventLog; track $index) {
                <div class="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span class="text-gray-500 dark:text-gray-400">{{ event.timestamp }}:</span>
                  <span class="ml-2">{{ event.message }}</span>
                </div>
              }
              
              @if (eventLog.length === 0) {
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  No events logged yet. Try interacting with the navigation above.
                </p>
              }
            </div>
            
            @if (eventLog.length > 0) {
              <pst-button
                (click)="clearEventLog()"
                variant="ghost"
                size="sm"
                class="mt-2"
              >
                Clear Log
              </pst-button>
            }
          </div>
        </div>
      </div>

      <!-- Current State Display -->
      <div class="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Current Configuration</h2>
        <pre class="text-sm bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">{{ navigationConfig | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavigationDemoComponent {
  private navigationService = inject(NavigationService);
  private notificationsService = inject(NotificationsService);
  private authService = inject(AuthService);

  // Navigation configuration
  navigationConfig: HeaderConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: true,
    transparent: false,
    elevated: true,
    fullWidth: false,
    logoVariant: 'horizontal',
    customClass: ''
  };

  // Logo variant options
  logoVariantOptions = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'icon', label: 'Icon Only' }
  ];

  // Notification controls
  notificationTypes = [
    { value: 'info', label: 'Info' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' }
  ];
  
  newNotificationType: NotificationType = 'info';
  newNotificationTitle = '';

  // Event log
  eventLog: Array<{ timestamp: string; message: string }> = [];

  // Observables
  navigationItems$ = this.navigationService.navigationItems;
  unreadCount = this.notificationsService.unreadCount;
  currentUser$ = this.authService.currentUser$;

  // Event handlers
  onLogoClick(): void {
    this.logEvent('Logo clicked');
  }

  onSearchSubmit(query: string): void {
    this.logEvent(`Search submitted: "${query}"`);
  }

  onNotificationClick(notification: any): void {
    this.logEvent(`Notification clicked: ${notification.title}`);
    this.notificationsService.markAsRead(notification.id);
  }

  onUserMenuAction(action: string): void {
    this.logEvent(`User menu action: ${action}`);
  }

  onMobileMenuToggle(isOpen: boolean): void {
    this.logEvent(`Mobile menu ${isOpen ? 'opened' : 'closed'}`);
  }

  // Notification actions
  addNotification(): void {
    if (!this.newNotificationTitle) {return;}

    this.notificationsService.addNotification({
      type: this.newNotificationType,
      title: this.newNotificationTitle,
      message: `This is a ${this.newNotificationType} notification created from the demo page.`
    });

    this.logEvent(`Added ${this.newNotificationType} notification: "${this.newNotificationTitle}"`);
    this.newNotificationTitle = '';
  }

  markAllAsRead(): void {
    this.notificationsService.markAllAsRead();
    this.logEvent('Marked all notifications as read');
  }

  clearAllNotifications(): void {
    this.notificationsService.clearAll();
    this.logEvent('Cleared all notifications');
  }

  // Navigation item actions
  setBadge(itemId: string): void {
    const badge = Math.floor(Math.random() * 10) + 1;
    this.navigationService.setBadge(itemId, badge);
    this.logEvent(`Set badge for ${itemId}: ${badge}`);
  }

  removeNavigationItem(itemId: string): void {
    this.navigationService.removeNavigationItem(itemId);
    this.logEvent(`Removed navigation item: ${itemId}`);
  }

  addNavigationItem(): void {
    const newItem: NavigationItem = {
      id: `custom-${Date.now()}`,
      label: `Custom Item ${Math.floor(Math.random() * 100)}`,
      path: `/custom/${Date.now()}`,
      icon: 'star'
    };
    
    this.navigationService.addNavigationItem(newItem);
    this.logEvent(`Added navigation item: ${newItem.label}`);
  }

  // Event logging
  private logEvent(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({ timestamp, message });
    
    // Keep only last 20 events
    if (this.eventLog.length > 20) {
      this.eventLog = this.eventLog.slice(0, 20);
    }
  }

  clearEventLog(): void {
    this.eventLog = [];
  }
}
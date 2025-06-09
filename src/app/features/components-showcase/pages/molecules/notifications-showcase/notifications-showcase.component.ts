import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { NotificationsComponent } from '../../../../../shared/components/notifications/notifications.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { NotificationsService, NotificationType } from '../../../../../shared/services/notifications.service';

@Component({
  selector: 'pst-notifications-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Notifications"
      description="A notification center component for displaying system messages and alerts."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class NotificationsShowcaseComponent {
  private notificationsService = inject(NotificationsService);

  sections = [
    {
      title: 'Basic Usage',
      description: 'A notification dropdown that shows system messages.',
      content: `
        <div class="flex items-center justify-center h-20">
          <pst-notifications />
        </div>
        <div class="flex gap-2 mt-4">
          <pst-button size="sm" (click)="addInfoNotification()">Add Info</pst-button>
          <pst-button size="sm" variant="success" (click)="addSuccessNotification()">Add Success</pst-button>
          <pst-button size="sm" variant="warning" (click)="addWarningNotification()">Add Warning</pst-button>
          <pst-button size="sm" variant="danger" (click)="addErrorNotification()">Add Error</pst-button>
        </div>
      `,
      code: `
// Component usage
<pst-notifications />

// Service injection
private notificationsService = inject(NotificationsService);

// Add notifications
this.notificationsService.addNotification({
  title: 'New Message',
  message: 'You have a new message from John Doe',
  type: 'info'
});`
    },
    {
      title: 'Notification Types',
      description: 'Different types of notifications for various scenarios.',
      content: `
        <div class="space-y-4">
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Info Notification</h4>
            <p class="text-sm text-blue-600 dark:text-blue-300">General information or updates</p>
          </div>
          
          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 class="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Success Notification</h4>
            <p class="text-sm text-green-600 dark:text-green-300">Successful operations or confirmations</p>
          </div>
          
          <div class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h4 class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Warning Notification</h4>
            <p class="text-sm text-amber-600 dark:text-amber-300">Important alerts that need attention</p>
          </div>
          
          <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 class="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Error Notification</h4>
            <p class="text-sm text-red-600 dark:text-red-300">Critical errors or failures</p>
          </div>
        </div>
      `,
      code: `
// Info notification
this.notificationsService.addNotification({
  title: 'System Update',
  message: 'A new version is available',
  type: 'info'
});

// Success notification
this.notificationsService.addNotification({
  title: 'Success!',
  message: 'Your changes have been saved',
  type: 'success'
});

// Warning notification
this.notificationsService.addNotification({
  title: 'Warning',
  message: 'Your session will expire in 5 minutes',
  type: 'warning'
});

// Error notification
this.notificationsService.addNotification({
  title: 'Error',
  message: 'Failed to save changes',
  type: 'error'
});`
    },
    {
      title: 'With Actions',
      description: 'Notifications can include action buttons.',
      content: `
        <div class="flex items-center justify-center h-20">
          <pst-notifications />
        </div>
        <div class="flex gap-2 mt-4">
          <pst-button size="sm" (click)="addNotificationWithAction()">
            Add with Action
          </pst-button>
          <pst-button size="sm" (click)="addNotificationWithMultipleActions()">
            Add with Multiple Actions
          </pst-button>
        </div>
      `,
      code: `
// Single action
this.notificationsService.addNotification({
  title: 'New Comment',
  message: 'John commented on your post',
  type: 'info',
  actions: [
    {
      label: 'View',
      action: () => console.log('View comment')
    }
  ]
});

// Multiple actions
this.notificationsService.addNotification({
  title: 'Friend Request',
  message: 'Jane wants to connect',
  type: 'info',
  actions: [
    {
      label: 'Accept',
      action: () => console.log('Accepted')
    },
    {
      label: 'Decline',
      action: () => console.log('Declined')
    }
  ]
});`
    },
    {
      title: 'Notification Management',
      description: 'Managing notifications programmatically.',
      content: `
        <div class="space-y-4">
          <div class="flex gap-2">
            <pst-button size="sm" (click)="addMultipleNotifications()">
              Add 5 Notifications
            </pst-button>
            <pst-button size="sm" variant="secondary" (click)="markAllAsRead()">
              Mark All as Read
            </pst-button>
            <pst-button size="sm" variant="danger" (click)="clearAll()">
              Clear All
            </pst-button>
          </div>
          
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Unread count: {{ getUnreadCount() }}
            </p>
          </div>
        </div>
      `,
      code: `
// Get unread count
const unreadCount = this.notificationsService.unreadCount();

// Mark all as read
this.notificationsService.markAllAsRead();

// Clear all notifications
this.notificationsService.clearAll();

// Mark specific notification as read
this.notificationsService.markAsRead(notificationId);

// Dismiss specific notification
this.notificationsService.dismissNotification(notificationId);`
    },
    {
      title: 'Auto-dismiss',
      description: 'Notifications can automatically dismiss after a timeout.',
      content: `
        <div class="space-y-4">
          <pst-button size="sm" (click)="addAutoDismissNotification()">
            Add Auto-dismiss (5s)
          </pst-button>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            This notification will automatically disappear after 5 seconds.
          </p>
        </div>
      `,
      code: `
this.notificationsService.addNotification({
  title: 'Auto-dismiss',
  message: 'This will disappear in 5 seconds',
  type: 'info',
  autoDismiss: true,
  dismissTimeout: 5000
});`
    }
  ];

  props = [
    {
      name: 'NotificationsService',
      type: 'Injectable Service',
      default: '-',
      description: 'Service for managing notifications'
    },
    {
      name: 'notifications',
      type: 'Signal<Notification[]>',
      default: 'signal([])',
      description: 'Observable list of notifications'
    },
    {
      name: 'unreadCount',
      type: 'Signal<number>',
      default: 'signal(0)',
      description: 'Number of unread notifications'
    }
  ];

  bestPractices = {
    do: [
      'Use appropriate notification types for different scenarios',
      'Keep notification messages concise and clear',
      'Provide actions for notifications that require user response',
      'Auto-dismiss informational notifications after a reasonable time',
      'Allow users to manage notification preferences',
      'Group similar notifications to reduce clutter',
      'Ensure notifications are accessible to screen readers',
      'Display notifications in a consistent location',
      'Use meaningful icons for different notification types'
    ],
    dont: [
      'Show too many notifications at once - limit to avoid overwhelming users',
      'Use sound or vibration excessively - reserve for critical notifications only',
      'Auto-dismiss error notifications - users need time to read and act on them',
      'Use notifications for non-important updates that could be shown elsewhere',
      'Block user interaction while notifications are displayed',
      'Mix different notification styles or positions in the same app',
      'Forget to test notifications with screen readers',
      'Display sensitive information in notification messages',
      'Use overly technical language in user-facing notifications'
    ]
  };

  addInfoNotification() {
    this.notificationsService.addNotification({
      title: 'System Update',
      message: 'A new version of the application is available',
      type: 'info'
    });
  }

  addSuccessNotification() {
    this.notificationsService.addNotification({
      title: 'Success!',
      message: 'Your profile has been updated successfully',
      type: 'success'
    });
  }

  addWarningNotification() {
    this.notificationsService.addNotification({
      title: 'Storage Warning',
      message: 'You are running low on storage space',
      type: 'warning'
    });
  }

  addErrorNotification() {
    this.notificationsService.addNotification({
      title: 'Connection Error',
      message: 'Failed to connect to the server',
      type: 'error'
    });
  }

  addNotificationWithAction() {
    this.notificationsService.addNotification({
      title: 'New Message',
      message: 'You have a new message from Sarah',
      type: 'info',
      actions: [
        {
          label: 'View Message',
          action: () => console.log('Viewing message')
        }
      ]
    });
  }

  addNotificationWithMultipleActions() {
    this.notificationsService.addNotification({
      title: 'Meeting Invitation',
      message: 'You have been invited to a meeting at 3 PM',
      type: 'info',
      actions: [
        {
          label: 'Accept',
          action: () => console.log('Meeting accepted')
        },
        {
          label: 'Decline',
          action: () => console.log('Meeting declined')
        }
      ]
    });
  }

  addAutoDismissNotification() {
    this.notificationsService.addNotification({
      title: 'Quick Info',
      message: 'This notification will disappear automatically',
      type: 'info'
    });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const notifications = this.notificationsService.notifications();
      if (notifications.length > 0) {
        this.notificationsService.dismissNotification(notifications[0].id);
      }
    }, 5000);
  }

  addMultipleNotifications() {
    const types: NotificationType[] = ['info', 'success', 'warning', 'error', 'info'];
    const titles = ['Update Available', 'Task Completed', 'Low Battery', 'Sync Failed', 'New Feature'];
    const messages = [
      'Version 2.0 is ready to install',
      'Your report has been generated',
      'Battery level is below 20%',
      'Unable to sync data',
      'Check out our new dashboard'
    ];

    types.forEach((type, index) => {
      setTimeout(() => {
        this.notificationsService.addNotification({
          title: titles[index],
          message: messages[index],
          type
        });
      }, index * 200);
    });
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead();
  }

  clearAll() {
    this.notificationsService.clearAll();
  }

  getUnreadCount(): number {
    return this.notificationsService.unreadCount();
  }
}
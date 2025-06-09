import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../../shared/components/alert/alert.service';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ShowcaseTemplateComponent, ShowcaseSection } from '../../../shared/showcase-template.component';
import { ShowcaseProp } from '../../../shared/base-showcase.component';

@Component({
  selector: 'pst-alert-showcase',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    ButtonComponent,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Alert"
      description="Feedback component for displaying important messages and notifications"
      [props]="propDefinitions"
      [sections]="sections"
      [bestPractices]="bestPracticesData"
    />

    <div class="space-y-12 mt-12">
      <!-- Basic Usage -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Basic Usage</h3>
        <div class="space-y-4">
          <pst-alert
            type="info"
            message="This is an informational alert message."
          ></pst-alert>

          <pst-alert
            type="success"
            message="Your changes have been saved successfully."
          ></pst-alert>

          <pst-alert
            type="warning"
            message="Please review your input before proceeding."
          ></pst-alert>

          <pst-alert
            type="error"
            message="An error occurred while processing your request."
          ></pst-alert>
        </div>
      </section>

      <!-- Variants -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Variants</h3>
        
        <!-- Non-dismissible -->
        <div class="space-y-4 mb-8">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Non-dismissible Alerts</h4>
          <pst-alert
            type="info"
            message="This alert cannot be dismissed by the user."
            [dismissible]="false"
          ></pst-alert>
        </div>

        <!-- Auto-dismiss -->
        <div class="space-y-4 mb-8">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-dismiss Alerts</h4>
          <pst-button
            (click)="showAutoDismissAlert()"
            variant="secondary"
          >
            Show Auto-dismiss Alert (3s)
          </pst-button>
          
          @if (showAutoAlert) {
            <pst-alert
              type="success"
              message="This alert will automatically dismiss after 3 seconds."
              [duration]="3000"
              (close)="showAutoAlert = false"
            ></pst-alert>
          }
        </div>

        <!-- Long Message -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Long Messages</h4>
          <pst-alert
            type="info"
            message="This is a longer alert message that demonstrates how the component handles multiple lines of text. The layout should remain clean and readable even with extended content."
          ></pst-alert>
        </div>
      </section>

      <!-- Interactive Demo -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Interactive Demo</h3>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <pst-button
              (click)="showAlert('info')"
              variant="secondary"
              size="sm"
            >
              Show Info
            </pst-button>
            <pst-button
              (click)="showAlert('success')"
              variant="secondary"
              size="sm"
            >
              Show Success
            </pst-button>
            <pst-button
              (click)="showAlert('warning')"
              variant="secondary"
              size="sm"
            >
              Show Warning
            </pst-button>
            <pst-button
              (click)="showAlert('error')"
              variant="secondary"
              size="sm"
            >
              Show Error
            </pst-button>
          </div>

          @if (currentAlert) {
            <pst-alert
              [type]="currentAlert.type"
              [message]="currentAlert.message"
              (close)="currentAlert = null"
            ></pst-alert>
          }
        </div>
      </section>

      <!-- Service Usage -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Alert Service</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Use the AlertService to programmatically show alerts from anywhere in your application.
        </p>
        <div class="flex flex-wrap gap-2">
          <pst-button
            (click)="showServiceAlert('info')"
            variant="primary"
            size="sm"
          >
            Info via Service
          </pst-button>
          <pst-button
            (click)="showServiceAlert('success')"
            variant="primary"
            size="sm"
          >
            Success via Service
          </pst-button>
          <pst-button
            (click)="showServiceAlert('warning')"
            variant="primary"
            size="sm"
          >
            Warning via Service
          </pst-button>
          <pst-button
            (click)="showServiceAlert('error')"
            variant="primary"
            size="sm"
          >
            Error via Service
          </pst-button>
        </div>
      </section>

      <!-- Accessibility Notes -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Accessibility</h3>
        <div class="prose dark:prose-invert max-w-none">
          <ul>
            <li>Alerts use appropriate ARIA roles and live regions</li>
            <li>Error alerts use assertive announcements for screen readers</li>
            <li>Dismiss buttons have proper labels for assistive technology</li>
            <li>Color is not the only indicator of alert type (icons provide additional context)</li>
          </ul>
        </div>
      </section>
    </div>
  `
})
export class AlertShowcaseComponent {
  showAutoAlert = false;
  currentAlert: { type: any; message: string } | null = null;

  constructor(private alertService: AlertService) {}

  propDefinitions: ShowcaseProp[] = [
    {
      name: 'type',
      type: "'info' | 'success' | 'warning' | 'error'",
      default: "'info'",
      description: 'The type of alert to display'
    },
    {
      name: 'message',
      type: 'string',
      default: '',
      description: 'The message to display in the alert'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'true',
      description: 'Whether the alert can be dismissed'
    },
    {
      name: 'duration',
      type: 'number',
      default: 'undefined',
      description: 'Auto-dismiss duration in milliseconds'
    },
    {
      name: 'close',
      type: 'EventEmitter<void>',
      default: 'EventEmitter',
      description: 'Event emitted when the alert is closed'
    }
  ];

  bestPracticesData = {
    do: [
      'Use appropriate alert types to convey the right level of urgency',
      'Keep messages concise and actionable',
      'Use auto-dismiss for temporary success messages',
      'Position alerts where they won\'t disrupt the user\'s workflow'
    ],
    dont: [
      'Don\'t overuse alerts - reserve them for important messages',
      'Don\'t make critical alerts dismissible',
      'Don\'t use alerts for form validation errors - use inline messages instead',
      'Don\'t show multiple alerts at once - queue them instead'
    ]
  };

  basicExample = `<pst-alert
  type="success"
  message="Your changes have been saved successfully."
></pst-alert>

<pst-alert
  type="error"
  message="An error occurred while processing your request."
></pst-alert>`;

  optionsExample = `<!-- Non-dismissible alert -->
<pst-alert
  type="warning"
  message="This is a permanent warning message."
  [dismissible]="false"
></pst-alert>

<!-- Auto-dismiss after 5 seconds -->
<pst-alert
  type="success"
  message="File uploaded successfully!"
  [duration]="5000"
  (close)="handleAlertClosed()"
></pst-alert>`;

  serviceExample = `import { AlertService } from '@shared/components/alert/alert.service';

constructor(private alertService: AlertService) {}

showSuccessMessage() {
  this.alertService.show({
    type: 'success',
    message: 'Operation completed successfully!',
    duration: 3000
  });
}

showErrorMessage() {
  this.alertService.show({
    type: 'error',
    message: 'Failed to save changes. Please try again.',
    dismissible: true
  });
}`;

  showAutoDismissAlert(): void {
    this.showAutoAlert = true;
  }

  showAlert(type: 'info' | 'success' | 'warning' | 'error'): void {
    const messages = {
      info: 'This is an informational message.',
      success: 'Operation completed successfully!',
      warning: 'Please review your input before proceeding.',
      error: 'An error occurred. Please try again.'
    };
    
    this.currentAlert = {
      type,
      message: messages[type]
    };
  }

  showServiceAlert(type: 'info' | 'success' | 'warning' | 'error'): void {
    const messages = {
      info: 'Service: This is an informational message.',
      success: 'Service: Operation completed successfully!',
      warning: 'Service: Please review your input.',
      error: 'Service: An error occurred.'
    };
    
    this.alertService.show({
      type,
      message: messages[type],
      duration: type === 'success' ? 3000 : undefined
    });
  }

  get sections() {
    return [
      {
        title: 'Basic Usage',
        code: this.basicExample,
        description: 'Simple alert messages with different types'
      },
      {
        title: 'Alert Options',
        code: this.optionsExample,
        description: 'Customize alert behavior with dismissible and duration options'
      },
      {
        title: 'Using Alert Service',
        code: this.serviceExample,
        description: 'Programmatically show alerts from any component'
      }
    ];
  }
}
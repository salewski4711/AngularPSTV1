import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from '../../../../../shared/components/radio/radio-group.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-radio-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RadioGroupComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Radio Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Radio buttons for selecting a single option from multiple choices.
        </p>
      </div>

      <!-- Import Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Import
        </h2>
        <pst-code-block
          [code]="importCode"
          language="typescript"
        ></pst-code-block>
      </section>

      <!-- Examples -->
      <section class="space-y-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Examples
        </h2>

        <!-- Basic Radio Group -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Radio Group
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-radio-group
                label="Select your plan"
                [options]="planOptions"
                [(ngModel)]="selectedPlan"
              ></pst-radio-group>
              <p class="text-sm text-gray-600 dark:text-gray-400">Selected: {{ selectedPlan() }}</p>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Horizontal Layout -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Horizontal Layout
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <pst-radio-group
              label="Choose size"
              [options]="sizeOptions"
              orientation="horizontal"
              [(ngModel)]="selectedSize"
            ></pst-radio-group>
          </div>
          <pst-code-block
            [code]="horizontalCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Descriptions -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Descriptions
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <pst-radio-group
              label="Select deployment method"
              [options]="deploymentOptions"
              [(ngModel)]="selectedDeployment"
            ></pst-radio-group>
          </div>
          <pst-code-block
            [code]="withDescriptionsCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            States
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-6">
              <pst-radio-group
                label="Normal state"
                [options]="stateOptions"
              ></pst-radio-group>
              
              <pst-radio-group
                label="Disabled state"
                [options]="stateOptions"
                [disabled]="true"
              ></pst-radio-group>
              
              <pst-radio-group
                label="With disabled option"
                [options]="disabledOptionExample"
              ></pst-radio-group>
              
              <pst-radio-group
                label="With error message"
                [options]="stateOptions"
                errorMessage="Please select an option"
              ></pst-radio-group>
            </div>
          </div>
          <pst-code-block
            [code]="statesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Helper Text -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Helper Text
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <pst-radio-group
              label="Notification preferences"
              [options]="notificationOptions"
              helperText="Choose how you want to receive notifications"
              [(ngModel)]="selectedNotification"
            ></pst-radio-group>
          </div>
          <pst-code-block
            [code]="helperTextCode"
            language="html"
          ></pst-code-block>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RadioShowcaseComponent {
  selectedPlan = signal('basic');
  selectedSize = signal('md');
  selectedDeployment = signal('');
  selectedNotification = signal('email');

  planOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Professional' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  sizeOptions = [
    { value: 'xs', label: 'XS' },
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M' },
    { value: 'lg', label: 'L' },
    { value: 'xl', label: 'XL' }
  ];

  deploymentOptions = [
    { 
      value: 'cloud', 
      label: 'Cloud Deployment',
      helperText: 'Deploy to our managed cloud infrastructure'
    },
    { 
      value: 'onprem', 
      label: 'On-Premise',
      helperText: 'Install on your own servers'
    },
    { 
      value: 'hybrid', 
      label: 'Hybrid',
      helperText: 'Combination of cloud and on-premise'
    }
  ];

  stateOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  disabledOptionExample = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive', disabled: true },
    { value: 'pending', label: 'Pending' }
  ];

  notificationOptions = [
    { value: 'all', label: 'All notifications' },
    { value: 'email', label: 'Email only' },
    { value: 'important', label: 'Important only' },
    { value: 'none', label: 'None' }
  ];

  importCode = `import { RadioGroupComponent } from '@app/shared/components/radio/radio-group.component';

@Component({
  // ...
  imports: [RadioGroupComponent, FormsModule]
})`;

  basicCode = `<pst-radio-group
  label="Select your plan"
  [options]="planOptions"
  [(ngModel)]="selectedPlan"
></pst-radio-group>

// Component:
planOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Professional' },
  { value: 'enterprise', label: 'Enterprise' }
];`;

  horizontalCode = `<pst-radio-group
  label="Choose size"
  [options]="sizeOptions"
  orientation="horizontal"
  [(ngModel)]="selectedSize"
></pst-radio-group>`;

  withDescriptionsCode = `<pst-radio-group
  label="Select deployment method"
  [options]="deploymentOptions"
  [(ngModel)]="selectedDeployment"
></pst-radio-group>

// Component:
deploymentOptions = [
  { 
    value: 'cloud', 
    label: 'Cloud Deployment',
    helperText: 'Deploy to our managed cloud infrastructure'
  },
  { 
    value: 'onprem', 
    label: 'On-Premise',
    helperText: 'Install on your own servers'
  },
  { 
    value: 'hybrid', 
    label: 'Hybrid',
    helperText: 'Combination of cloud and on-premise'
  }
];`;

  statesCode = `<!-- Normal -->
<pst-radio-group label="Normal state" [options]="options"></pst-radio-group>

<!-- Disabled -->
<pst-radio-group label="Disabled state" [options]="options" [disabled]="true"></pst-radio-group>

<!-- With disabled option -->
<pst-radio-group label="With disabled option" [options]="[
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive', disabled: true },
  { value: 'pending', label: 'Pending' }
]"></pst-radio-group>

<!-- With error message -->
<pst-radio-group 
  label="With error message" 
  [options]="options" 
  errorMessage="Please select an option"
></pst-radio-group>`;

  helperTextCode = `<pst-radio-group
  label="Notification preferences"
  [options]="notificationOptions"
  helperText="Choose how you want to receive notifications"
  [(ngModel)]="selectedNotification"
></pst-radio-group>`;
}
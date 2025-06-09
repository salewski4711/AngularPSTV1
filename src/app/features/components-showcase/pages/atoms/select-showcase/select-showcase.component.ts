import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../../../../shared/components/select/select.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-select-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SelectComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Select Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A dropdown select component for choosing from a list of options.
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

        <!-- Basic Select -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Select
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-select 
                label="Select a country"
                placeholder="Choose a country"
                [options]="countryOptions"
                [(ngModel)]="selectedCountry"
              ></pst-select>
              <p class="text-sm text-gray-600 dark:text-gray-400">Selected: {{ selectedCountry() || 'None' }}</p>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Groups -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Option Groups
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md">
              <pst-select 
                label="Select a fruit"
                placeholder="Choose your favorite fruit"
                [options]="groupedOptions"
                [(ngModel)]="selectedFruit"
              ></pst-select>
            </div>
          </div>
          <pst-code-block
            [code]="groupedCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            States
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-select 
                label="Normal state"
                placeholder="Select an option"
                [options]="stateOptions"
              ></pst-select>
              
              <pst-select 
                label="Disabled state"
                placeholder="Select an option"
                [options]="stateOptions"
                [disabled]="true"
              ></pst-select>
              
              <pst-select 
                label="Required field"
                placeholder="Select an option"
                [options]="stateOptions"
                [required]="true"
              ></pst-select>
              
              <pst-select 
                label="With error message"
                placeholder="Select an option"
                [options]="stateOptions"
                errorMessage="Please select a valid option"
              ></pst-select>
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
            <div class="max-w-md space-y-4">
              <pst-select 
                label="Time zone"
                placeholder="Select your time zone"
                [options]="timezoneOptions"
                helperText="Used for scheduling and notifications"
              ></pst-select>
              
              <pst-select 
                label="Language"
                placeholder="Select language"
                [options]="languageOptions"
                helperText="Choose your preferred language"
                errorMessage="This language is not yet supported"
              ></pst-select>
            </div>
          </div>
          <pst-code-block
            [code]="helperTextCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Allow Empty Selection -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Allow Empty Selection
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-select 
                label="Optional field"
                placeholder="Select an option (optional)"
                [options]="stateOptions"
                [allowEmpty]="true"
              ></pst-select>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                This select allows clearing the selection
              </p>
            </div>
          </div>
          <pst-code-block
            [code]="allowEmptyCode"
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
export class SelectShowcaseComponent {
  selectedCountry = signal('');
  selectedFruit = signal('');

  countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'es', label: 'Spain' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' }
  ];

  groupedOptions = [
    { value: 'orange', label: 'Orange', group: 'Citrus' },
    { value: 'lemon', label: 'Lemon', group: 'Citrus' },
    { value: 'lime', label: 'Lime', group: 'Citrus' },
    { value: 'grapefruit', label: 'Grapefruit', group: 'Citrus' },
    { value: 'strawberry', label: 'Strawberry', group: 'Berries' },
    { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
    { value: 'raspberry', label: 'Raspberry', group: 'Berries' },
    { value: 'blackberry', label: 'Blackberry', group: 'Berries' },
    { value: 'mango', label: 'Mango', group: 'Tropical' },
    { value: 'pineapple', label: 'Pineapple', group: 'Tropical' },
    { value: 'papaya', label: 'Papaya', group: 'Tropical' },
    { value: 'kiwi', label: 'Kiwi', group: 'Tropical' }
  ];

  stateOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  timezoneOptions = [
    { value: 'utc-8', label: 'Pacific Time (UTC-8)' },
    { value: 'utc-5', label: 'Eastern Time (UTC-5)' },
    { value: 'utc', label: 'UTC' },
    { value: 'utc+1', label: 'Central European Time (UTC+1)' },
    { value: 'utc+9', label: 'Japan Standard Time (UTC+9)' }
  ];

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' }
  ];

  userOptions = [
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'bob', label: 'Bob Johnson' },
    { value: 'alice', label: 'Alice Williams' }
  ];

  paymentOptions = [
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'crypto', label: 'Cryptocurrency' }
  ];

  tagOptions = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'important', label: 'Important' },
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'documentation', label: 'Documentation' }
  ];

  importCode = `import { SelectComponent } from '@app/shared/components/select/select.component';

@Component({
  // ...
  imports: [SelectComponent, FormsModule]
})`;

  basicCode = `<pst-select 
  label="Select a country"
  placeholder="Choose a country"
  [options]="countryOptions"
  [(ngModel)]="selectedCountry"
></pst-select>

// Component:
countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  // ...
];`;

  groupedCode = `<pst-select 
  label="Select a fruit"
  placeholder="Choose your favorite fruit"
  [options]="groupedOptions"
  [(ngModel)]="selectedFruit"
></pst-select>

// Component:
groupedOptions = [
  { value: 'orange', label: 'Orange', group: 'Citrus' },
  { value: 'lemon', label: 'Lemon', group: 'Citrus' },
  { value: 'lime', label: 'Lime', group: 'Citrus' },
  { value: 'strawberry', label: 'Strawberry', group: 'Berries' },
  { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
  { value: 'mango', label: 'Mango', group: 'Tropical' },
  { value: 'pineapple', label: 'Pineapple', group: 'Tropical' },
  // ...
];`;

  statesCode = `<!-- Normal -->
<pst-select label="Normal state" placeholder="Select an option" [options]="options"></pst-select>

<!-- Disabled -->
<pst-select label="Disabled state" placeholder="Select an option" [options]="options" [disabled]="true"></pst-select>

<!-- Required -->
<pst-select label="Required field" placeholder="Select an option" [options]="options" [required]="true"></pst-select>

<!-- With error message -->
<pst-select 
  label="With error message" 
  placeholder="Select an option" 
  [options]="options" 
  errorMessage="Please select a valid option"
></pst-select>`;

  helperTextCode = `<pst-select 
  label="Time zone"
  placeholder="Select your time zone"
  [options]="timezoneOptions"
  helperText="Used for scheduling and notifications"
></pst-select>

<pst-select 
  label="Language"
  placeholder="Select language"
  [options]="languageOptions"
  helperText="Choose your preferred language"
  errorMessage="This language is not yet supported"
></pst-select>`;

  allowEmptyCode = `<pst-select 
  label="Optional field"
  placeholder="Select an option (optional)"
  [options]="options"
  [allowEmpty]="true"
></pst-select>`;
}
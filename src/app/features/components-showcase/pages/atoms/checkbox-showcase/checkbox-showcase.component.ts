import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../../../shared/components/checkbox/checkbox.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-checkbox-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    CheckboxComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Checkbox Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A customizable checkbox component for single or multiple selections.
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

        <!-- Basic Checkbox -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Checkbox
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-checkbox 
                label="I agree to the terms and conditions"
                [(ngModel)]="basicChecked"
              ></pst-checkbox>
              <p class="text-sm text-gray-600 dark:text-gray-400">Checked: {{ basicChecked() }}</p>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            States
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-checkbox label="Unchecked"></pst-checkbox>
              <pst-checkbox label="Checked" [ngModel]="true"></pst-checkbox>
              <pst-checkbox label="Disabled" [disabled]="true"></pst-checkbox>
              <pst-checkbox label="Disabled Checked" [disabled]="true" [ngModel]="true"></pst-checkbox>
              <pst-checkbox label="Required field" [required]="true"></pst-checkbox>
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
            <div class="space-y-4">
              <pst-checkbox 
                label="Subscribe to newsletter"
                helperText="We'll send you updates about new features and tips"
                [showHelperText]="true"
              ></pst-checkbox>
              <pst-checkbox 
                label="Enable notifications"
                helperText="Get notified about important updates"
                errorMessage="You must enable notifications to continue"
                [showHelperText]="true"
              ></pst-checkbox>
            </div>
          </div>
          <pst-code-block
            [code]="helperTextCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Multiple Checkboxes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Multiple Checkboxes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select your interests:</h4>
              <pst-checkbox 
                label="Technology"
                [(ngModel)]="interests.technology"
              ></pst-checkbox>
              <pst-checkbox 
                label="Design"
                [(ngModel)]="interests.design"
              ></pst-checkbox>
              <pst-checkbox 
                label="Business"
                [(ngModel)]="interests.business"
              ></pst-checkbox>
              <pst-checkbox 
                label="Marketing"
                [(ngModel)]="interests.marketing"
              ></pst-checkbox>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Selected: {{ getSelectedInterests() }}
              </p>
            </div>
          </div>
          <pst-code-block
            [code]="multipleCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Without Label -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Without Label
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <pst-checkbox></pst-checkbox>
              <span class="text-gray-700 dark:text-gray-300">Checkbox without label (uses aria-label)</span>
            </div>
          </div>
          <pst-code-block
            [code]="withoutLabelCode"
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
export class CheckboxShowcaseComponent {
  basicChecked = signal(false);
  
  interests = {
    technology: signal(false),
    design: signal(false),
    business: signal(false),
    marketing: signal(false)
  };

  getSelectedInterests(): string {
    const selected = [];
    if (this.interests.technology()) {selected.push('Technology');}
    if (this.interests.design()) {selected.push('Design');}
    if (this.interests.business()) {selected.push('Business');}
    if (this.interests.marketing()) {selected.push('Marketing');}
    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  importCode = `import { CheckboxComponent } from '@app/shared/components/checkbox/checkbox.component';

@Component({
  // ...
  imports: [CheckboxComponent, FormsModule]
})`;

  basicCode = `<pst-checkbox 
  label="I agree to the terms and conditions"
  [(ngModel)]="isChecked"
></pst-checkbox>`;

  statesCode = `<pst-checkbox label="Unchecked"></pst-checkbox>
<pst-checkbox label="Checked" [ngModel]="true"></pst-checkbox>
<pst-checkbox label="Disabled" [disabled]="true"></pst-checkbox>
<pst-checkbox label="Disabled Checked" [disabled]="true" [ngModel]="true"></pst-checkbox>
<pst-checkbox label="Required field" [required]="true"></pst-checkbox>`;

  helperTextCode = `<pst-checkbox 
  label="Subscribe to newsletter"
  helperText="We'll send you updates about new features and tips"
  [showHelperText]="true"
></pst-checkbox>

<pst-checkbox 
  label="Enable notifications"
  helperText="Get notified about important updates"
  errorMessage="You must enable notifications to continue"
  [showHelperText]="true"
></pst-checkbox>`;

  multipleCode = `<pst-checkbox label="Technology" [(ngModel)]="interests.technology"></pst-checkbox>
<pst-checkbox label="Design" [(ngModel)]="interests.design"></pst-checkbox>
<pst-checkbox label="Business" [(ngModel)]="interests.business"></pst-checkbox>
<pst-checkbox label="Marketing" [(ngModel)]="interests.marketing"></pst-checkbox>`;

  withoutLabelCode = `<pst-checkbox></pst-checkbox>`;
}
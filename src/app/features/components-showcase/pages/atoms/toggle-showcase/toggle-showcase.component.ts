import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from '../../../../../shared/components/toggle/toggle.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-toggle-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ToggleComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Toggle Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A switch component for toggling between two states.
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

        <!-- Basic Toggle -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Toggle
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-toggle 
                label="Enable notifications"
                [(ngModel)]="basicToggle"
              ></pst-toggle>
              <p class="text-sm text-gray-600 dark:text-gray-400">Enabled: {{ basicToggle() }}</p>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Sizes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-toggle label="Small toggle" size="sm"></pst-toggle>
              <pst-toggle label="Medium toggle (default)" size="md"></pst-toggle>
              <pst-toggle label="Large toggle" size="lg"></pst-toggle>
            </div>
          </div>
          <pst-code-block
            [code]="sizesCode"
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
              <pst-toggle label="Off state"></pst-toggle>
              <pst-toggle label="On state" [ngModel]="true"></pst-toggle>
              <pst-toggle label="Disabled off" [disabled]="true"></pst-toggle>
              <pst-toggle label="Disabled on" [disabled]="true" [ngModel]="true"></pst-toggle>
              <pst-toggle label="Required field" [required]="true"></pst-toggle>
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
              <pst-toggle 
                label="Dark mode"
                helperText="Use dark theme across the application"
                [showHelperText]="true"
              ></pst-toggle>
              <pst-toggle 
                label="Auto-save"
                helperText="Automatically save your work every 5 minutes"
                [showHelperText]="true"
                [(ngModel)]="autoSave"
              ></pst-toggle>
              <pst-toggle 
                label="Beta features"
                helperText="Enable experimental features"
                errorMessage="Beta features may be unstable"
                [showHelperText]="true"
              ></pst-toggle>
            </div>
          </div>
          <pst-code-block
            [code]="helperTextCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Label Position -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Label Position
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-toggle 
                label="Label on right (default)"
                labelPosition="right"
              ></pst-toggle>
              <pst-toggle 
                label="Label on left"
                labelPosition="left"
              ></pst-toggle>
            </div>
          </div>
          <pst-code-block
            [code]="labelPositionCode"
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
              <pst-toggle [ariaLabel]="'Toggle feature'"></pst-toggle>
              <span class="text-gray-700 dark:text-gray-300">Toggle without label (uses aria-label)</span>
            </div>
          </div>
          <pst-code-block
            [code]="withoutLabelCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-6">
              <div class="space-y-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Settings</h4>
                <pst-toggle 
                  label="Email notifications"
                  [(ngModel)]="settings.emailNotifications"
                ></pst-toggle>
                <pst-toggle 
                  label="Push notifications"
                  [(ngModel)]="settings.pushNotifications"
                ></pst-toggle>
                <pst-toggle 
                  label="SMS notifications"
                  [(ngModel)]="settings.smsNotifications"
                ></pst-toggle>
              </div>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy Settings</h4>
                <pst-toggle 
                  label="Make profile public"
                  helperText="Allow others to see your profile"
                  [showHelperText]="true"
                  [(ngModel)]="settings.publicProfile"
                ></pst-toggle>
                <pst-toggle 
                  label="Show online status"
                  helperText="Let others know when you're online"
                  [showHelperText]="true"
                  [(ngModel)]="settings.showOnlineStatus"
                ></pst-toggle>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="realWorldCode"
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
export class ToggleShowcaseComponent {
  basicToggle = signal(false);
  autoSave = signal(true);
  
  settings = {
    emailNotifications: signal(true),
    pushNotifications: signal(false),
    smsNotifications: signal(false),
    publicProfile: signal(false),
    showOnlineStatus: signal(true)
  };

  importCode = `import { ToggleComponent } from '@app/shared/components/toggle/toggle.component';

@Component({
  // ...
  imports: [ToggleComponent, FormsModule]
})`;

  basicCode = `<pst-toggle 
  label="Enable notifications"
  [(ngModel)]="isEnabled"
></pst-toggle>`;

  sizesCode = `<pst-toggle label="Small toggle" size="sm"></pst-toggle>
<pst-toggle label="Medium toggle (default)" size="md"></pst-toggle>
<pst-toggle label="Large toggle" size="lg"></pst-toggle>`;

  statesCode = `<pst-toggle label="Off state"></pst-toggle>
<pst-toggle label="On state" [ngModel]="true"></pst-toggle>
<pst-toggle label="Disabled off" [disabled]="true"></pst-toggle>
<pst-toggle label="Disabled on" [disabled]="true" [ngModel]="true"></pst-toggle>
<pst-toggle label="Required field" [required]="true"></pst-toggle>`;

  helperTextCode = `<pst-toggle 
  label="Dark mode"
  helperText="Use dark theme across the application"
  [showHelperText]="true"
></pst-toggle>

<pst-toggle 
  label="Auto-save"
  helperText="Automatically save your work every 5 minutes"
  [showHelperText]="true"
  [(ngModel)]="autoSave"
></pst-toggle>

<pst-toggle 
  label="Beta features"
  helperText="Enable experimental features"
  errorMessage="Beta features may be unstable"
  [showHelperText]="true"
></pst-toggle>`;

  labelPositionCode = `<pst-toggle label="Label on right (default)" labelPosition="right"></pst-toggle>
<pst-toggle label="Label on left" labelPosition="left"></pst-toggle>`;

  withoutLabelCode = `<pst-toggle [ariaLabel]="'Toggle feature'"></pst-toggle>`;

  realWorldCode = `<!-- Notification Settings -->
<pst-toggle label="Email notifications" [(ngModel)]="settings.emailNotifications"></pst-toggle>
<pst-toggle label="Push notifications" [(ngModel)]="settings.pushNotifications"></pst-toggle>
<pst-toggle label="SMS notifications" [(ngModel)]="settings.smsNotifications"></pst-toggle>

<!-- Privacy Settings -->
<pst-toggle 
  label="Make profile public"
  helperText="Allow others to see your profile"
  [showHelperText]="true"
  [(ngModel)]="settings.publicProfile"
></pst-toggle>
<pst-toggle 
  label="Show online status"
  helperText="Let others know when you're online"
  [showHelperText]="true"
  [(ngModel)]="settings.showOnlineStatus"
></pst-toggle>`;
}
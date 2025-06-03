import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from '../../../../../shared/components/toggle/toggle.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'app-toggle-showcase',
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
        <app-code-block
          [code]="importCode"
          language="typescript"
        ></app-code-block>
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
              <app-toggle 
                label="Enable notifications"
                [(ngModel)]="basicToggle"
              ></app-toggle>
              <p class="text-sm text-gray-600 dark:text-gray-400">Enabled: {{ basicToggle() }}</p>
            </div>
          </div>
          <app-code-block
            [code]="basicCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Sizes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <app-toggle label="Small toggle" size="sm"></app-toggle>
              <app-toggle label="Medium toggle (default)" size="md"></app-toggle>
              <app-toggle label="Large toggle" size="lg"></app-toggle>
            </div>
          </div>
          <app-code-block
            [code]="sizesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            States
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <app-toggle label="Off state"></app-toggle>
              <app-toggle label="On state" [ngModel]="true"></app-toggle>
              <app-toggle label="Disabled off" [disabled]="true"></app-toggle>
              <app-toggle label="Disabled on" [disabled]="true" [ngModel]="true"></app-toggle>
              <app-toggle label="Required field" [required]="true"></app-toggle>
            </div>
          </div>
          <app-code-block
            [code]="statesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- With Helper Text -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Helper Text
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <app-toggle 
                label="Dark mode"
                helperText="Use dark theme across the application"
                [showHelperText]="true"
              ></app-toggle>
              <app-toggle 
                label="Auto-save"
                helperText="Automatically save your work every 5 minutes"
                [showHelperText]="true"
                [(ngModel)]="autoSave"
              ></app-toggle>
              <app-toggle 
                label="Beta features"
                helperText="Enable experimental features"
                errorMessage="Beta features may be unstable"
                [showHelperText]="true"
              ></app-toggle>
            </div>
          </div>
          <app-code-block
            [code]="helperTextCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Label Position -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Label Position
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <app-toggle 
                label="Label on right (default)"
                labelPosition="right"
              ></app-toggle>
              <app-toggle 
                label="Label on left"
                labelPosition="left"
              ></app-toggle>
            </div>
          </div>
          <app-code-block
            [code]="labelPositionCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Without Label -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Without Label
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-toggle [ariaLabel]="'Toggle feature'"></app-toggle>
              <span class="text-gray-700 dark:text-gray-300">Toggle without label (uses aria-label)</span>
            </div>
          </div>
          <app-code-block
            [code]="withoutLabelCode"
            language="html"
          ></app-code-block>
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
                <app-toggle 
                  label="Email notifications"
                  [(ngModel)]="settings.emailNotifications"
                ></app-toggle>
                <app-toggle 
                  label="Push notifications"
                  [(ngModel)]="settings.pushNotifications"
                ></app-toggle>
                <app-toggle 
                  label="SMS notifications"
                  [(ngModel)]="settings.smsNotifications"
                ></app-toggle>
              </div>
              
              <div class="space-y-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy Settings</h4>
                <app-toggle 
                  label="Make profile public"
                  helperText="Allow others to see your profile"
                  [showHelperText]="true"
                  [(ngModel)]="settings.publicProfile"
                ></app-toggle>
                <app-toggle 
                  label="Show online status"
                  helperText="Let others know when you're online"
                  [showHelperText]="true"
                  [(ngModel)]="settings.showOnlineStatus"
                ></app-toggle>
              </div>
            </div>
          </div>
          <app-code-block
            [code]="realWorldCode"
            language="html"
          ></app-code-block>
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

  basicCode = `<app-toggle 
  label="Enable notifications"
  [(ngModel)]="isEnabled"
></app-toggle>`;

  sizesCode = `<app-toggle label="Small toggle" size="sm"></app-toggle>
<app-toggle label="Medium toggle (default)" size="md"></app-toggle>
<app-toggle label="Large toggle" size="lg"></app-toggle>`;

  statesCode = `<app-toggle label="Off state"></app-toggle>
<app-toggle label="On state" [ngModel]="true"></app-toggle>
<app-toggle label="Disabled off" [disabled]="true"></app-toggle>
<app-toggle label="Disabled on" [disabled]="true" [ngModel]="true"></app-toggle>
<app-toggle label="Required field" [required]="true"></app-toggle>`;

  helperTextCode = `<app-toggle 
  label="Dark mode"
  helperText="Use dark theme across the application"
  [showHelperText]="true"
></app-toggle>

<app-toggle 
  label="Auto-save"
  helperText="Automatically save your work every 5 minutes"
  [showHelperText]="true"
  [(ngModel)]="autoSave"
></app-toggle>

<app-toggle 
  label="Beta features"
  helperText="Enable experimental features"
  errorMessage="Beta features may be unstable"
  [showHelperText]="true"
></app-toggle>`;

  labelPositionCode = `<app-toggle label="Label on right (default)" labelPosition="right"></app-toggle>
<app-toggle label="Label on left" labelPosition="left"></app-toggle>`;

  withoutLabelCode = `<app-toggle [ariaLabel]="'Toggle feature'"></app-toggle>`;

  realWorldCode = `<!-- Notification Settings -->
<app-toggle label="Email notifications" [(ngModel)]="settings.emailNotifications"></app-toggle>
<app-toggle label="Push notifications" [(ngModel)]="settings.pushNotifications"></app-toggle>
<app-toggle label="SMS notifications" [(ngModel)]="settings.smsNotifications"></app-toggle>

<!-- Privacy Settings -->
<app-toggle 
  label="Make profile public"
  helperText="Allow others to see your profile"
  [showHelperText]="true"
  [(ngModel)]="settings.publicProfile"
></app-toggle>
<app-toggle 
  label="Show online status"
  helperText="Let others know when you're online"
  [showHelperText]="true"
  [(ngModel)]="settings.showOnlineStatus"
></app-toggle>`;
}
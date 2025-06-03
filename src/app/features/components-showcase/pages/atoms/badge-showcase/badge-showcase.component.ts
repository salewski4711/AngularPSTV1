import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../../../../shared/components/badge/badge.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'app-badge-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    BadgeComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Badge Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Small labels for displaying status, counts, or categories.
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

        <!-- Basic Badges -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Badges
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <app-badge>Default</app-badge>
              <app-badge color="primary">Primary</app-badge>
              <app-badge color="gray">Secondary</app-badge>
              <app-badge color="success">Success</app-badge>
              <app-badge color="warning">Warning</app-badge>
              <app-badge color="error">Danger</app-badge>
              <app-badge color="info">Info</app-badge>
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
            <div class="flex flex-wrap items-center gap-3">
              <app-badge size="sm">Small</app-badge>
              <app-badge size="md">Medium</app-badge>
              <app-badge size="lg">Large</app-badge>
            </div>
          </div>
          <app-code-block
            [code]="sizesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- With Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Icons
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <app-badge icon="check" color="success">Completed</app-badge>
              <app-badge icon="x" color="error">Failed</app-badge>
              <app-badge icon="clock" color="warning">Pending</app-badge>
              <app-badge icon="info" color="info">Information</app-badge>
              <app-badge icon="star" color="primary">Featured</app-badge>
            </div>
          </div>
          <app-code-block
            [code]="iconsCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Pill Style -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Pill Style
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <app-badge shape="pill">Default Pill</app-badge>
              <app-badge shape="pill" color="primary">Primary Pill</app-badge>
              <app-badge shape="pill" color="success">Success Pill</app-badge>
              <app-badge shape="pill" color="error">Danger Pill</app-badge>
            </div>
          </div>
          <app-code-block
            [code]="pillCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Removable Badges -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Removable Badges
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <app-badge [removable]="true" (remove)="onRemove('Tag 1')">Tag 1</app-badge>
              <app-badge [removable]="true" (remove)="onRemove('Tag 2')" color="primary">Tag 2</app-badge>
              <app-badge [removable]="true" (remove)="onRemove('Tag 3')" color="success">Tag 3</app-badge>
              <app-badge [removable]="true" shape="pill" (remove)="onRemove('Filter')" color="info">Filter</app-badge>
            </div>
          </div>
          <app-code-block
            [code]="removableCode"
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
              <!-- Status Badges -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status Indicators</h4>
                <div class="flex flex-wrap gap-3">
                  <app-badge color="success" icon="check-circle">Active</app-badge>
                  <app-badge color="error" icon="x-circle">Inactive</app-badge>
                  <app-badge color="warning" icon="clock">Pending</app-badge>
                  <app-badge color="info" icon="pause">On Hold</app-badge>
                </div>
              </div>

              <!-- Count Badges -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Counts</h4>
                <div class="flex items-center gap-4">
                  <span class="text-gray-700 dark:text-gray-300">Notifications</span>
                  <app-badge color="error" size="sm">99+</app-badge>
                  <span class="text-gray-700 dark:text-gray-300 ml-4">Messages</span>
                  <app-badge color="primary" size="sm">5</app-badge>
                </div>
              </div>

              <!-- Category Tags -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h4>
                <div class="flex flex-wrap gap-2">
                  <app-badge shape="pill" color="gray">Technology</app-badge>
                  <app-badge shape="pill" color="gray">Design</app-badge>
                  <app-badge shape="pill" color="gray">Business</app-badge>
                  <app-badge shape="pill" color="gray">Marketing</app-badge>
                  <app-badge shape="pill" color="gray">Development</app-badge>
                </div>
              </div>

              <!-- Priority Labels -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Priority</h4>
                <div class="flex flex-wrap gap-3">
                  <app-badge color="error" icon="arrow-up">High</app-badge>
                  <app-badge color="warning" icon="minus">Medium</app-badge>
                  <app-badge color="success" icon="arrow-down">Low</app-badge>
                </div>
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
export class BadgeShowcaseComponent {
  onRemove(tag: string): void {
    console.log(`Removed: ${tag}`);
  }

  importCode = `import { BadgeComponent } from '@app/shared/components/badge/badge.component';

@Component({
  // ...
  imports: [BadgeComponent]
})`;

  basicCode = `<app-badge>Default</app-badge>
<app-badge color="primary">Primary</app-badge>
<app-badge color="gray">Secondary</app-badge>
<app-badge color="success">Success</app-badge>
<app-badge color="warning">Warning</app-badge>
<app-badge color="error">Danger</app-badge>
<app-badge color="info">Info</app-badge>`;

  sizesCode = `<app-badge size="sm">Small</app-badge>
<app-badge size="md">Medium</app-badge>
<app-badge size="lg">Large</app-badge>`;

  iconsCode = `<app-badge icon="check" color="success">Completed</app-badge>
<app-badge icon="x" color="error">Failed</app-badge>
<app-badge icon="clock" color="warning">Pending</app-badge>
<app-badge icon="info" color="info">Information</app-badge>
<app-badge icon="star" color="primary">Featured</app-badge>`;

  pillCode = `<app-badge shape="pill">Default Pill</app-badge>
<app-badge shape="pill" color="primary">Primary Pill</app-badge>
<app-badge shape="pill" color="success">Success Pill</app-badge>
<app-badge shape="pill" color="error">Danger Pill</app-badge>`;

  removableCode = `<app-badge [removable]="true" (remove)="onRemove('Tag 1')">Tag 1</app-badge>
<app-badge [removable]="true" (remove)="onRemove('Tag 2')" color="primary">Tag 2</app-badge>
<app-badge [removable]="true" (remove)="onRemove('Tag 3')" color="success">Tag 3</app-badge>
<app-badge [removable]="true" shape="pill" (remove)="onRemove('Filter')" color="info">Filter</app-badge>

// Component:
onRemove(tag: string): void {
  console.log(\`Removed: \${tag}\`);
}`;

  realWorldCode = `<!-- Status Indicators -->
<app-badge color="success" icon="check-circle">Active</app-badge>
<app-badge color="error" icon="x-circle">Inactive</app-badge>
<app-badge color="warning" icon="clock">Pending</app-badge>

<!-- Counts -->
<app-badge color="error" size="sm">99+</app-badge>
<app-badge color="primary" size="sm">5</app-badge>

<!-- Categories -->
<app-badge shape="pill" color="gray">Technology</app-badge>
<app-badge shape="pill" color="gray">Design</app-badge>

<!-- Priority -->
<app-badge color="error" icon="arrow-up">High</app-badge>
<app-badge color="warning" icon="minus">Medium</app-badge>
<app-badge color="success" icon="arrow-down">Low</app-badge>`;
}
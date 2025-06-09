import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../../../../shared/components/badge/badge.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-badge-showcase',
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

        <!-- Basic Badges -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Badges
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <pst-badge>Default</pst-badge>
              <pst-badge color="primary">Primary</pst-badge>
              <pst-badge color="gray">Secondary</pst-badge>
              <pst-badge color="success">Success</pst-badge>
              <pst-badge color="warning">Warning</pst-badge>
              <pst-badge color="error">Danger</pst-badge>
              <pst-badge color="info">Info</pst-badge>
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
            <div class="flex flex-wrap items-center gap-3">
              <pst-badge size="sm">Small</pst-badge>
              <pst-badge size="md">Medium</pst-badge>
              <pst-badge size="lg">Large</pst-badge>
            </div>
          </div>
          <pst-code-block
            [code]="sizesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Icons
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <pst-badge icon="check" color="success">Completed</pst-badge>
              <pst-badge icon="x" color="error">Failed</pst-badge>
              <pst-badge icon="clock" color="warning">Pending</pst-badge>
              <pst-badge icon="info" color="info">Information</pst-badge>
              <pst-badge icon="star" color="primary">Featured</pst-badge>
            </div>
          </div>
          <pst-code-block
            [code]="iconsCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Pill Style -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Pill Style
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <pst-badge shape="pill">Default Pill</pst-badge>
              <pst-badge shape="pill" color="primary">Primary Pill</pst-badge>
              <pst-badge shape="pill" color="success">Success Pill</pst-badge>
              <pst-badge shape="pill" color="error">Danger Pill</pst-badge>
            </div>
          </div>
          <pst-code-block
            [code]="pillCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Removable Badges -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Removable Badges
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex flex-wrap gap-3">
              <pst-badge [removable]="true" (remove)="onRemove('Tag 1')">Tag 1</pst-badge>
              <pst-badge [removable]="true" (remove)="onRemove('Tag 2')" color="primary">Tag 2</pst-badge>
              <pst-badge [removable]="true" (remove)="onRemove('Tag 3')" color="success">Tag 3</pst-badge>
              <pst-badge [removable]="true" shape="pill" (remove)="onRemove('Filter')" color="info">Filter</pst-badge>
            </div>
          </div>
          <pst-code-block
            [code]="removableCode"
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
              <!-- Status Badges -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status Indicators</h4>
                <div class="flex flex-wrap gap-3">
                  <pst-badge color="success" icon="check-circle">Active</pst-badge>
                  <pst-badge color="error" icon="x-circle">Inactive</pst-badge>
                  <pst-badge color="warning" icon="clock">Pending</pst-badge>
                  <pst-badge color="info" icon="pause">On Hold</pst-badge>
                </div>
              </div>

              <!-- Count Badges -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Counts</h4>
                <div class="flex items-center gap-4">
                  <span class="text-gray-700 dark:text-gray-300">Notifications</span>
                  <pst-badge color="error" size="sm">99+</pst-badge>
                  <span class="text-gray-700 dark:text-gray-300 ml-4">Messages</span>
                  <pst-badge color="primary" size="sm">5</pst-badge>
                </div>
              </div>

              <!-- Category Tags -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h4>
                <div class="flex flex-wrap gap-2">
                  <pst-badge shape="pill" color="gray">Technology</pst-badge>
                  <pst-badge shape="pill" color="gray">Design</pst-badge>
                  <pst-badge shape="pill" color="gray">Business</pst-badge>
                  <pst-badge shape="pill" color="gray">Marketing</pst-badge>
                  <pst-badge shape="pill" color="gray">Development</pst-badge>
                </div>
              </div>

              <!-- Priority Labels -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Priority</h4>
                <div class="flex flex-wrap gap-3">
                  <pst-badge color="error" icon="arrow-up">High</pst-badge>
                  <pst-badge color="warning" icon="minus">Medium</pst-badge>
                  <pst-badge color="success" icon="arrow-down">Low</pst-badge>
                </div>
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
export class BadgeShowcaseComponent {
  onRemove(tag: string): void {
    console.log(`Removed: ${tag}`);
  }

  importCode = `import { BadgeComponent } from '@app/shared/components/badge/badge.component';

@Component({
  // ...
  imports: [BadgeComponent]
})`;

  basicCode = `<pst-badge>Default</pst-badge>
<pst-badge color="primary">Primary</pst-badge>
<pst-badge color="gray">Secondary</pst-badge>
<pst-badge color="success">Success</pst-badge>
<pst-badge color="warning">Warning</pst-badge>
<pst-badge color="error">Danger</pst-badge>
<pst-badge color="info">Info</pst-badge>`;

  sizesCode = `<pst-badge size="sm">Small</pst-badge>
<pst-badge size="md">Medium</pst-badge>
<pst-badge size="lg">Large</pst-badge>`;

  iconsCode = `<pst-badge icon="check" color="success">Completed</pst-badge>
<pst-badge icon="x" color="error">Failed</pst-badge>
<pst-badge icon="clock" color="warning">Pending</pst-badge>
<pst-badge icon="info" color="info">Information</pst-badge>
<pst-badge icon="star" color="primary">Featured</pst-badge>`;

  pillCode = `<pst-badge shape="pill">Default Pill</pst-badge>
<pst-badge shape="pill" color="primary">Primary Pill</pst-badge>
<pst-badge shape="pill" color="success">Success Pill</pst-badge>
<pst-badge shape="pill" color="error">Danger Pill</pst-badge>`;

  removableCode = `<pst-badge [removable]="true" (remove)="onRemove('Tag 1')">Tag 1</pst-badge>
<pst-badge [removable]="true" (remove)="onRemove('Tag 2')" color="primary">Tag 2</pst-badge>
<pst-badge [removable]="true" (remove)="onRemove('Tag 3')" color="success">Tag 3</pst-badge>
<pst-badge [removable]="true" shape="pill" (remove)="onRemove('Filter')" color="info">Filter</pst-badge>

// Component:
onRemove(tag: string): void {
  console.log(\`Removed: \${tag}\`);
}`;

  realWorldCode = `<!-- Status Indicators -->
<pst-badge color="success" icon="check-circle">Active</pst-badge>
<pst-badge color="error" icon="x-circle">Inactive</pst-badge>
<pst-badge color="warning" icon="clock">Pending</pst-badge>

<!-- Counts -->
<pst-badge color="error" size="sm">99+</pst-badge>
<pst-badge color="primary" size="sm">5</pst-badge>

<!-- Categories -->
<pst-badge shape="pill" color="gray">Technology</pst-badge>
<pst-badge shape="pill" color="gray">Design</pst-badge>

<!-- Priority -->
<pst-badge color="error" icon="arrow-up">High</pst-badge>
<pst-badge color="warning" icon="minus">Medium</pst-badge>
<pst-badge color="success" icon="arrow-down">Low</pst-badge>`;
}
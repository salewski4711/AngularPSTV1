import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'app-icon-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    IconComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Icon Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          SVG icon system with consistent sizing and styling.
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

        <!-- Basic Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Icons
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-icon name="home"></app-icon>
              <app-icon name="user"></app-icon>
              <app-icon name="settings"></app-icon>
              <app-icon name="search"></app-icon>
              <app-icon name="heart"></app-icon>
              <app-icon name="star"></app-icon>
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
            <div class="flex items-center gap-4">
              <app-icon name="star" [size]="12"></app-icon>
              <app-icon name="star" [size]="16"></app-icon>
              <app-icon name="star" [size]="20"></app-icon>
              <app-icon name="star" [size]="24"></app-icon>
              <app-icon name="star" [size]="32"></app-icon>
            </div>
          </div>
          <app-code-block
            [code]="sizesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Colors -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Colors
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-icon name="heart" class="text-gray-600 dark:text-gray-400"></app-icon>
              <app-icon name="heart" class="text-primary"></app-icon>
              <app-icon name="heart" class="text-red-500"></app-icon>
              <app-icon name="heart" class="text-green-500"></app-icon>
              <app-icon name="heart" class="text-blue-500"></app-icon>
              <app-icon name="heart" class="text-yellow-500"></app-icon>
            </div>
          </div>
          <app-code-block
            [code]="colorsCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Icon Categories -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Available Icons
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-6">
              <!-- Navigation -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Navigation</h4>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="home" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">home</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="arrow-left" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">arrow-left</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="arrow-right" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">arrow-right</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="arrow-up" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">arrow-up</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="arrow-down" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">arrow-down</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="chevron-left" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">chevron-left</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="chevron-right" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">chevron-right</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="menu" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">menu</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Actions</h4>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="search" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">search</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="plus" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">plus</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="minus" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">minus</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="x" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">x</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="check" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">check</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="edit" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">edit</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="trash" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">trash</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="save" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">save</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="download" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">download</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="upload" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">upload</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="copy" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">copy</span>
                  </div>
                </div>
              </div>

              <!-- User & Social -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User & Social</h4>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="user" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">user</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="users" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">users</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="heart" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">heart</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="star" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">star</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="mail" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">mail</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="phone" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">phone</span>
                  </div>
                </div>
              </div>

              <!-- System -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">System</h4>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="settings" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">settings</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="lock" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">lock</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="unlock" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">unlock</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="bell" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">bell</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="calendar" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">calendar</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="clock" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">clock</span>
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status</h4>
                <div class="flex flex-wrap gap-4">
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="info" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">info</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="alert-circle" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">alert-circle</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="check-circle" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">check-circle</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="x-circle" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">x-circle</span>
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <app-icon name="pause" [size]="24"></app-icon>
                    <span class="text-xs text-gray-600 dark:text-gray-400">pause</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-6">
              <!-- Button with Icon -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Button with Icons</h4>
                <div class="flex gap-4">
                  <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                    <app-icon name="plus" [size]="16"></app-icon>
                    Add Item
                  </button>
                  <button class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <app-icon name="trash" [size]="16"></app-icon>
                    Delete
                  </button>
                </div>
              </div>

              <!-- Navigation Menu -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Navigation Menu</h4>
                <nav class="space-y-2">
                  <a href="#" class="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <app-icon name="home" [size]="16"></app-icon>
                    <span>Dashboard</span>
                  </a>
                  <a href="#" class="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <app-icon name="users" [size]="16"></app-icon>
                    <span>Customers</span>
                  </a>
                  <a href="#" class="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <app-icon name="settings" [size]="16"></app-icon>
                    <span>Settings</span>
                  </a>
                </nav>
              </div>

              <!-- Status Messages -->
              <div>
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Status Messages</h4>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <app-icon name="check-circle" [size]="16"></app-icon>
                    <span class="text-sm">Operation completed successfully</span>
                  </div>
                  <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <app-icon name="x-circle" [size]="16"></app-icon>
                    <span class="text-sm">An error occurred</span>
                  </div>
                  <div class="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <app-icon name="alert-circle" [size]="16"></app-icon>
                    <span class="text-sm">Warning: Check your input</span>
                  </div>
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
export class IconShowcaseComponent {
  importCode = `import { IconComponent } from '@app/shared/icons/icon.component';

@Component({
  // ...
  imports: [IconComponent]
})`;

  basicCode = `<app-icon name="home"></app-icon>
<app-icon name="user"></app-icon>
<app-icon name="settings"></app-icon>
<app-icon name="search"></app-icon>
<app-icon name="heart"></app-icon>
<app-icon name="star"></app-icon>`;

  sizesCode = `<app-icon name="star" [size]="12"></app-icon>
<app-icon name="star" [size]="16"></app-icon>
<app-icon name="star" [size]="20"></app-icon>
<app-icon name="star" [size]="24"></app-icon>
<app-icon name="star" [size]="32"></app-icon>`;

  colorsCode = `<app-icon name="heart" class="text-gray-600 dark:text-gray-400"></app-icon>
<app-icon name="heart" class="text-primary"></app-icon>
<app-icon name="heart" class="text-red-500"></app-icon>
<app-icon name="heart" class="text-green-500"></app-icon>
<app-icon name="heart" class="text-blue-500"></app-icon>
<app-icon name="heart" class="text-yellow-500"></app-icon>`;

  realWorldCode = `<!-- Button with Icon -->
<button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
  <app-icon name="plus" [size]="16"></app-icon>
  Add Item
</button>

<!-- Navigation Menu -->
<a href="#" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
  <app-icon name="home" [size]="16"></app-icon>
  <span>Dashboard</span>
</a>

<!-- Status Messages -->
<div class="flex items-center gap-2 text-green-600">
  <app-icon name="check-circle" [size]="16"></app-icon>
  <span class="text-sm">Operation completed successfully</span>
</div>`;
}
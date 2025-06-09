import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../../../../shared/components/logo/logo.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-logo-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    LogoComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Logo Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Display the ProSolarTec logo in various sizes and themes.
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

        <!-- Basic Logo -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Logo
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <pst-logo></pst-logo>
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
            <div class="flex items-end gap-8">
              <div class="text-center">
                <pst-logo size="sm"></pst-logo>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Small</p>
              </div>
              <div class="text-center">
                <pst-logo size="md"></pst-logo>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Medium</p>
              </div>
              <div class="text-center">
                <pst-logo size="lg"></pst-logo>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Large</p>
              </div>
              <div class="text-center">
                <pst-logo size="xl"></pst-logo>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Extra Large</p>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="sizesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Theme Variants -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Theme Variants
          </h3>
          <div class="space-y-4">
            <div class="bg-gray-50 p-8 rounded-lg">
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-medium text-gray-700 mb-2">Light Theme (Blue Logo)</p>
                  <pst-logo theme="light"></pst-logo>
                </div>
              </div>
            </div>
            <div class="bg-gray-900 p-8 rounded-lg">
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-medium text-gray-300 mb-2">Dark Theme (White Logo)</p>
                  <pst-logo theme="dark"></pst-logo>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-r from-blue-500 to-blue-700 p-8 rounded-lg">
              <div class="space-y-4">
                <div>
                  <p class="text-sm font-medium text-white mb-2">Force White on Colored Background</p>
                  <pst-logo theme="dark"></pst-logo>
                </div>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="themeCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Auto Theme -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Auto Theme Detection
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                By default, the logo automatically switches between blue (light mode) and white (dark mode) based on the current theme.
              </p>
              <pst-logo></pst-logo>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Toggle dark mode to see the logo change color
              </p>
            </div>
          </div>
          <pst-code-block
            [code]="autoThemeCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Link -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Link
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <a href="/" class="inline-block hover:opacity-80 transition-opacity">
              <pst-logo></pst-logo>
            </a>
          </div>
          <pst-code-block
            [code]="linkCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="space-y-6">
            <!-- Header Example -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Header Navigation</h4>
              <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                <header class="px-6 py-4 flex items-center justify-between">
                  <pst-logo size="sm"></pst-logo>
                  <nav class="flex items-center gap-6">
                    <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Dashboard</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Customers</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Settings</a>
                  </nav>
                </header>
              </div>
            </div>

            <!-- Footer Example -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Footer</h4>
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg">
                <footer class="px-6 py-8 text-center">
                  <pst-logo size="md" class="mx-auto mb-4"></pst-logo>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    © 2024 ProSolarTec. All rights reserved.
                  </p>
                </footer>
              </div>
            </div>

            <!-- Loading Screen -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Loading Screen</h4>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div class="flex flex-col items-center justify-center p-12">
                  <pst-logo size="lg" class="animate-pulse"></pst-logo>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading...</p>
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
export class LogoShowcaseComponent {
  importCode = `import { LogoComponent } from '@app/shared/components/logo/logo.component';

@Component({
  // ...
  imports: [LogoComponent]
})`;

  basicCode = `<pst-logo></pst-logo>`;

  sizesCode = `<pst-logo size="sm"></pst-logo>
<pst-logo size="md"></pst-logo>
<pst-logo size="lg"></pst-logo>
<pst-logo size="xl"></pst-logo>`;

  themeCode = `<!-- Force light theme (blue logo) -->
<pst-logo theme="light"></pst-logo>

<!-- Force dark theme (white logo) -->
<pst-logo theme="dark"></pst-logo>`;

  autoThemeCode = `<!-- Automatically adapts to current theme -->
<pst-logo></pst-logo>`;

  linkCode = `<a href="/" class="inline-block hover:opacity-80 transition-opacity">
  <pst-logo></pst-logo>
</a>`;

  realWorldCode = `<!-- Header Navigation -->
<header class="px-6 py-4 flex items-center justify-between">
  <pst-logo size="sm"></pst-logo>
  <nav class="flex items-center gap-6">
    <!-- Navigation items -->
  </nav>
</header>

<!-- Footer -->
<footer class="px-6 py-8 text-center">
  <pst-logo size="md" class="mx-auto mb-4"></pst-logo>
  <p class="text-sm text-gray-600">
    © 2024 ProSolarTec. All rights reserved.
  </p>
</footer>

<!-- Loading Screen -->
<div class="flex flex-col items-center justify-center p-12">
  <pst-logo size="lg" class="animate-pulse"></pst-logo>
  <p class="text-sm text-gray-600 mt-4">Loading...</p>
</div>`;
}
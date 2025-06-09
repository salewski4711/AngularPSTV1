import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent, HeaderConfig } from '../../../../../shared/components/top-navigation/top-navigation.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent, PropDefinition, EventDefinition } from '../../../shared/components/props-table.component';

@Component({
  selector: 'pst-top-navigation-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TopNavigationComponent,
    CodeBlockComponent,
    PropsTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Top Navigation Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Primary application header with logo, search, notifications, and user menu.
        </p>
      </div>
      <!-- Basic Usage -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Default Configuration</h3>
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <pst-top-navigation
            [config]="defaultConfig"
            (logoClick)="onAction('Logo clicked')"
            (searchSubmit)="onAction('Search: ' + $event)"
            (notificationClick)="onAction('Notification clicked')"
            (userMenuAction)="onAction('User action: ' + $event)">
          </pst-top-navigation>
        </div>
        
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>The default configuration includes:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>ProSolarTec logo (horizontal variant)</li>
            <li>Search bar with autocomplete</li>
            <li>Notifications dropdown</li>
            <li>User menu with theme toggle</li>
            <li>Mobile menu toggle (visible on small screens)</li>
          </ul>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Configuration Variants</h3>
        <div class="space-y-6">
          <!-- Minimal Header -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Minimal Header</h4>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <pst-top-navigation
                [config]="minimalConfig"
                (logoClick)="onAction('Logo clicked')">
              </pst-top-navigation>
            </div>
          </div>

          <!-- Transparent Header -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Transparent Header</h4>
            <div class="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
              <pst-top-navigation
                [config]="transparentConfig"
                (logoClick)="onAction('Logo clicked')">
              </pst-top-navigation>
              <div class="absolute inset-0 flex items-center justify-center text-white">
                <h2 class="text-2xl font-bold">Hero Section</h2>
              </div>
            </div>
          </div>

          <!-- Non-Sticky Header -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Non-Sticky Header</h4>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <pst-top-navigation
                [config]="nonStickyConfig"
                (logoClick)="onAction('Logo clicked')">
              </pst-top-navigation>
            </div>
          </div>
        </div>
      </section>

      <!-- Configuration Options -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Configuration Interface</h3>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <pst-code-block
            language="typescript"
            [code]="configInterface"
          ></pst-code-block>
        </div>
      </section>

      <!-- Code Examples -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Code Examples
        </h2>
        <pst-code-block
          title="Basic Usage"
          language="html"
          [code]="basicExample"
        ></pst-code-block>

        <pst-code-block
          title="Complete Implementation"
          language="typescript"
          [code]="completeExample"
        ></pst-code-block>

        <pst-code-block
          title="Custom Configurations"
          language="typescript"
          [code]="customConfigExample"
        ></pst-code-block>
      </section>

      <!-- Props -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          API Reference
        </h2>
        <pst-props-table
          [props]="propDefinitions"
          [events]="eventDefinitions"
        ></pst-props-table>
      </section>

      <!-- Responsive Behavior -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Responsive Behavior</h3>
        <div class="prose dark:prose-invert max-w-none">
          <p>The top navigation automatically adapts to different screen sizes:</p>
          <ul>
            <li><strong>Desktop (lg+)</strong>: Full layout with all components visible</li>
            <li><strong>Tablet (md)</strong>: Search bar may collapse to icon, compact spacing</li>
            <li><strong>Mobile (sm)</strong>: Only logo and mobile menu toggle visible, other components move to mobile menu</li>
          </ul>
          
          <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="max-w-sm mx-auto">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <pst-top-navigation
                  [config]="defaultConfig"
                  (mobileMenuToggle)="onAction('Mobile menu toggled')">
                </pst-top-navigation>
              </div>
              <p class="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                Mobile view simulation
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Best Practices -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Best Practices & Design Considerations
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <h3>Best Practices</h3>
          <ul>
            <li>Always include the top navigation on authenticated pages</li>
            <li>Use sticky positioning for better navigation access during scrolling</li>
            <li>Consider hiding search on pages with their own search functionality</li>
            <li>Use transparent mode carefully - ensure sufficient contrast</li>
            <li>Provide meaningful alt text for the logo</li>
            <li>Handle all events appropriately (navigation, logout, etc.)</li>
            <li>Test responsive behavior on all target devices</li>
            <li>Consider performance impact of sticky positioning on mobile</li>
          </ul>

          <h3>Accessibility</h3>
          <ul>
            <li>Proper semantic HTML structure with nav element</li>
            <li>ARIA attributes for navigation landmarks</li>
            <li>Keyboard navigation support for all interactive elements</li>
            <li>Skip navigation link for screen reader users</li>
            <li>Focus management for mobile menu toggle</li>
          </ul>

          <h3>Design Considerations</h3>
          <ul>
            <li>Maintain consistent height across pages</li>
            <li>Ensure sufficient padding for touch targets on mobile</li>
            <li>Use elevation (shadow) to separate from content</li>
            <li>Consider dark mode contrast ratios</li>
            <li>Test with different logo variants for optimal display</li>
          </ul>
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
export class TopNavigationShowcaseComponent {
  // Demo configurations
  defaultConfig: HeaderConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: true,
    transparent: false,
    elevated: true,
    logoVariant: 'horizontal'
  };

  minimalConfig: HeaderConfig = {
    showLogo: true,
    showSearch: false,
    showNotifications: false,
    showUserMenu: false,
    sticky: false,
    elevated: false
  };

  transparentConfig: HeaderConfig = {
    showLogo: true,
    showSearch: false,
    showNotifications: false,
    showUserMenu: true,
    transparent: true,
    elevated: false,
    logoVariant: 'icon'
  };

  nonStickyConfig: HeaderConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: false,
    elevated: true
  };

  propDefinitions: PropDefinition[] = [
    {
      name: 'config',
      type: 'HeaderConfig',
      required: false,
      default: 'See default config',
      description: 'Configuration object for customizing header appearance and features'
    }
  ];

  eventDefinitions: EventDefinition[] = [
    {
      name: 'logoClick',
      type: 'EventEmitter<void>',
      description: 'Emitted when the logo is clicked'
    },
    {
      name: 'searchSubmit',
      type: 'EventEmitter<string>',
      description: 'Emitted when a search is submitted'
    },
    {
      name: 'notificationClick',
      type: 'EventEmitter<any>',
      description: 'Emitted when a notification is clicked'
    },
    {
      name: 'userMenuAction',
      type: 'EventEmitter<string>',
      description: 'Emitted when a user menu action is triggered'
    },
    {
      name: 'mobileMenuToggle',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the mobile menu is toggled'
    }
  ];

  configInterface = `interface HeaderConfig {
  showLogo?: boolean;         // Show/hide logo (default: true)
  showSearch?: boolean;       // Show/hide search (default: true)
  showNotifications?: boolean; // Show/hide notifications (default: true)
  showUserMenu?: boolean;     // Show/hide user menu (default: true)
  sticky?: boolean;           // Sticky positioning (default: true)
  transparent?: boolean;      // Transparent background (default: false)
  elevated?: boolean;         // Show shadow (default: true)
  fullWidth?: boolean;        // Full width layout (default: false)
  logoVariant?: LogoVariant;  // 'horizontal' | 'vertical' | 'icon'
  customClass?: string;       // Additional CSS classes
}`;

  basicExample = `<pst-top-navigation
  [config]="headerConfig"
  (logoClick)="onLogoClick()"
  (searchSubmit)="onSearch($event)"
  (notificationClick)="onNotification($event)"
  (userMenuAction)="onUserAction($event)">
</pst-top-navigation>`;

  completeExample = `import { Component } from '@angular/core';
import { HeaderConfig } from '@shared/components/top-navigation/top-navigation.component';

@Component({
  selector: 'pst-layout',
  template: \`
    <pst-top-navigation
      [config]="headerConfig"
      (logoClick)="navigateHome()"
      (searchSubmit)="handleSearch($event)"
      (notificationClick)="handleNotification($event)"
      (userMenuAction)="handleUserAction($event)"
      (mobileMenuToggle)="handleMobileMenu($event)">
    </pst-top-navigation>
    
    <main class="pt-16"> <!-- pt-16 for sticky header -->
      <router-outlet></router-outlet>
    </main>
  \`
})
export class LayoutComponent {
  headerConfig: HeaderConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: true,
    elevated: true
  };

  navigateHome() {
    this.router.navigate(['/']);
  }

  handleSearch(query: string) {
    this.router.navigate(['/search'], { 
      queryParams: { q: query } 
    });
  }

  handleNotification(notification: any) {
    // Handle notification click
  }

  handleUserAction(action: string) {
    switch (action) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      case 'logout':
        this.authService.logout();
        break;
    }
  }

  handleMobileMenu(isOpen: boolean) {
    // Handle mobile menu state if needed
  }
}`;

  customConfigExample = `// Minimal configuration
const minimalConfig: HeaderConfig = {
  showLogo: true,
  showSearch: false,
  showNotifications: false,
  showUserMenu: false,
  sticky: false,
  elevated: false
};

// Transparent for hero sections
const transparentConfig: HeaderConfig = {
  showLogo: true,
  showSearch: false,
  showNotifications: false,
  showUserMenu: true,
  transparent: true,
  elevated: false,
  logoVariant: 'icon'
};

// Admin dashboard
const adminConfig: HeaderConfig = {
  showLogo: true,
  showSearch: true,
  showNotifications: true,
  showUserMenu: true,
  sticky: true,
  elevated: true,
  fullWidth: true,
  customClass: 'admin-header'
};`;

  onAction(message: string) {
    console.log('Navigation action:', message);
  }
}
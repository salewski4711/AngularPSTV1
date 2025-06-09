import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from '../../../../../shared/components/mobile-menu/mobile-menu.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent, PropDefinition, EventDefinition } from '../../../shared/components/props-table.component';

@Component({
  selector: 'pst-mobile-menu-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MobileMenuComponent,
    ButtonComponent,
    CodeBlockComponent,
    PropsTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Mobile Menu Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Full-screen mobile navigation drawer with slide-in animation and nested menu items.
        </p>
      </div>
      <!-- Basic Usage -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Interactive Demo</h3>
        <div class="space-y-4">
          <pst-button
            (click)="toggleMobileMenu()"
            variant="primary"
            size="md"
          >
            Open Mobile Menu
          </pst-button>
          
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p>The mobile menu includes:</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>Slide-in animation from left</li>
              <li>Hierarchical navigation with expandable items</li>
              <li>User profile section</li>
              <li>Search functionality</li>
              <li>Theme toggle</li>
              <li>Backdrop overlay with click-to-close</li>
            </ul>
          </div>
        </div>

        <pst-mobile-menu
          [isOpen]="mobileMenuOpen"
          [user]="mockUser"
          (close)="mobileMenuOpen = false"
          (searchSubmit)="onMobileSearch($event)"
          (userMenuAction)="onUserMenuAction($event)"
        ></pst-mobile-menu>
      </section>

      <!-- Variants -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Configuration Options</h3>
        <div class="space-y-6">
          <!-- Without Search -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Without Search</h4>
            <pst-button
              (click)="toggleMinimalMenu()"
              variant="secondary"
            >
              Open Menu (No Search)
            </pst-button>
            
            <pst-mobile-menu
              [isOpen]="minimalMenuOpen"
              [user]="mockUser"
              [showSearch]="false"
              (close)="minimalMenuOpen = false"
            ></pst-mobile-menu>
          </div>

          <!-- Guest Mode -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Guest Mode</h4>
            <pst-button
              (click)="toggleGuestMenu()"
              variant="secondary"
            >
              Open Menu (Guest)
            </pst-button>
            
            <pst-mobile-menu
              [isOpen]="guestMenuOpen"
              [user]="null"
              [showUserMenu]="false"
              (close)="guestMenuOpen = false"
            ></pst-mobile-menu>
          </div>
        </div>
      </section>

      <!-- Menu Structure -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Menu Structure</h3>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 class="font-medium mb-3">Default Menu Items:</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="text-gray-400">📊</span> Dashboard
            </li>
            <li class="flex items-center gap-2">
              <span class="text-gray-400">📁</span> Projekte
              <span class="ml-auto px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">3</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-gray-400">👥</span> Kunden (with submenu)
              <span class="ml-auto text-gray-400">▼</span>
            </li>
            <li class="flex items-center gap-2 pl-6 text-gray-600">
              <span>• Alle Kunden</span>
            </li>
            <li class="flex items-center gap-2 pl-6 text-gray-600">
              <span>• Neuer Kunde</span>
            </li>
            <li class="flex items-center gap-2 pl-6 text-gray-600">
              <span>• Kundengruppen</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-gray-400">📄</span> Angebote
              <span class="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">NEU</span>
            </li>
          </ul>
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
          title="Menu Item Configuration"
          language="typescript"
          [code]="menuItemsExample"
        ></pst-code-block>

        <pst-code-block
          title="Event Handling"
          language="typescript"
          [code]="eventHandlingExample"
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

      <!-- Best Practices -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Best Practices & Accessibility
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <h3>Best Practices</h3>
          <ul>
            <li>Use the mobile menu for primary navigation on mobile devices</li>
            <li>Always provide a close mechanism (backdrop click, close button, or swipe)</li>
            <li>Keep menu items concise and organized hierarchically</li>
            <li>Use badges sparingly to highlight important information</li>
            <li>Consider the thumb reach zone when organizing menu items</li>
            <li>Ensure proper contrast ratios for accessibility</li>
            <li>Test with screen readers for proper navigation</li>
          </ul>

          <h3>Accessibility</h3>
          <ul>
            <li>Menu traps focus when open</li>
            <li>Escape key closes the menu</li>
            <li>Proper ARIA attributes for navigation</li>
            <li>Keyboard navigation support for all menu items</li>
            <li>Screen reader announcements for menu state changes</li>
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
export class MobileMenuShowcaseComponent {
  mobileMenuOpen = false;
  minimalMenuOpen = false;
  guestMenuOpen = false;
  
  mockUser = {
    name: 'Max Mustermann',
    email: 'max@prosolar.com',
    avatar: null
  };

  propDefinitions: PropDefinition[] = [
    {
      name: 'isOpen',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Controls whether the menu is open or closed'
    },
    {
      name: 'user',
      type: 'any',
      required: false,
      default: 'null',
      description: 'User object with name, email, and avatar properties'
    },
    {
      name: 'showSearch',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show the search functionality'
    },
    {
      name: 'showNotifications',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show notifications section'
    },
    {
      name: 'showUserMenu',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show the user menu section'
    }
  ];

  eventDefinitions: EventDefinition[] = [
    {
      name: 'close',
      type: 'EventEmitter<void>',
      description: 'Emitted when the menu should be closed'
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
    }
  ];

  basicExample = `<pst-mobile-menu
  [isOpen]="mobileMenuOpen"
  [user]="currentUser"
  (close)="mobileMenuOpen = false"
  (searchSubmit)="onSearch($event)"
  (notificationClick)="onNotification($event)"
  (userMenuAction)="onUserAction($event)">
</pst-mobile-menu>`;

  menuItemsExample = `interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  badge?: string | number;
  children?: MenuItem[];
}

// Default menu items in component
menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard'
  },
  {
    label: 'Projekte',
    icon: 'folder',
    route: '/projects',
    badge: 3
  },
  {
    label: 'Kunden',
    icon: 'users',
    route: '/customers',
    children: [
      { label: 'Alle Kunden', route: '/customers' },
      { label: 'Neuer Kunde', route: '/customers/new' },
      { label: 'Kundengruppen', route: '/customers/groups' }
    ]
  }
];`;

  eventHandlingExample = `export class AppComponent {
  mobileMenuOpen = false;
  currentUser = {
    name: 'Max Mustermann',
    email: 'max@prosolar.com',
    avatar: '/assets/images/user.jpg'
  };

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch(query: string) {
    console.log('Search query:', query);
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  onNotification(notification: any) {
    console.log('Notification clicked:', notification);
    // Handle notification
  }

  onUserAction(action: string) {
    console.log('User action:', action);
    if (action === 'logout') {
      this.authService.logout();
    }
  }
}`;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleMinimalMenu() {
    this.minimalMenuOpen = !this.minimalMenuOpen;
  }

  toggleGuestMenu() {
    this.guestMenuOpen = !this.guestMenuOpen;
  }

  onMobileSearch(query: string) {
    console.log('Mobile search:', query);
  }

  onUserMenuAction(action: string) {
    console.log('User menu action:', action);
  }
}
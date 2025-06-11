import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { UserMenuComponent } from '../../../../../shared/components/user-menu/user-menu.component';

@Component({
  selector: 'pst-user-menu-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent,
    UserMenuComponent // Used in section templates
  ],
  template: `
    <pst-showcase-template
      title="User Menu"
      description="A dropdown menu component for user account actions and settings."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class UserMenuShowcaseComponent {
  sections = [
    {
      title: 'Basic Usage',
      description: 'A standard user menu with profile information and common actions.',
      content: `
        <div class="flex justify-center h-20">
          <pst-user-menu (menuAction)="onMenuAction($event)" />
        </div>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Click the avatar to open the menu
        </p>
      `,
      code: `
// Component usage
<pst-user-menu (menuAction)="onMenuAction($event)" />

// Handle menu actions
onMenuAction(actionId: string) {
  switch (actionId) {
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
}`
    },
    {
      title: 'User Configuration',
      description: 'The user menu displays user information from the User interface.',
      content: `
        <div class="space-y-4">
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium mb-3">User Interface</h4>
            <pre class="text-xs"><code>{{ getUserInterface() }}</code></pre>
          </div>
          
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium mb-3">Example User Data</h4>
            <pre class="text-xs"><code>{{ getExampleUser() }}</code></pre>
          </div>
        </div>
      `,
      code: `
// User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// Set user data
user: User = {
  id: '1',
  name: 'Max Mustermann',
  email: 'max.mustermann@prosolar.de',
  role: 'Administrator'
};`
    },
    {
      title: 'Menu Items',
      description: 'Customize menu items with icons and actions.',
      content: `
        <div class="space-y-4">
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium mb-3">MenuItem Interface</h4>
            <pre class="text-xs"><code>{{ getMenuItemInterface() }}</code></pre>
          </div>
          
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium mb-3">Example Menu Items</h4>
            <pre class="text-xs"><code>{{ getExampleMenuItems() }}</code></pre>
          </div>
        </div>
      `,
      code: `
// MenuItem interface
interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  action?: () => void;
  route?: string;
  danger?: boolean;
}

// Configure menu items
menuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: 'user',
    route: '/profile'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    route: '/settings'
  }
];

bottomMenuItems: MenuItem[] = [
  {
    id: 'logout',
    label: 'Logout',
    icon: 'logout',
    danger: true,
    action: () => this.logout()
  }
];`
    },
    {
      title: 'Theme Toggle',
      description: 'The user menu includes a built-in theme toggle.',
      content: `
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            The user menu automatically includes a theme toggle switch that syncs with the application's theme service.
          </p>
          <div class="flex items-center justify-center">
            <div class="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
              <div class="flex items-center gap-3">
                <span class="text-sm">🌞</span>
                <div class="w-10 h-6 bg-gray-300 dark:bg-primary rounded-full relative">
                  <div class="absolute top-1 left-1 dark:left-5 w-4 h-4 bg-white rounded-full transition-all"></div>
                </div>
                <span class="text-sm">🌙</span>
              </div>
            </div>
          </div>
        </div>
      `,
      code: `
// The theme toggle is automatically included
// It uses the ThemeService internally
private themeService = inject(ThemeService);

toggleTheme(): void {
  this.themeService.toggleTheme();
}`
    },
    {
      title: 'Keyboard Navigation',
      description: 'The user menu supports full keyboard navigation.',
      content: `
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 class="text-sm font-medium mb-3">Keyboard Shortcuts</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Navigate menu items</span>
              <div class="flex gap-1">
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">↑</kbd>
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">↓</kbd>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Select item</span>
              <div class="flex gap-1">
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">Enter</kbd>
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">Space</kbd>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Go to first/last item</span>
              <div class="flex gap-1">
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">Home</kbd>
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">End</kbd>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Close menu</span>
              <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">Esc</kbd>
            </div>
          </div>
        </div>
      `,
      code: `
// Keyboard navigation is built-in
// No additional code needed`
    },
    {
      title: 'Integration Example',
      description: 'How to integrate the user menu into your application header.',
      content: `
        <div class="p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg">
          <header class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <h1 class="text-lg font-semibold">ProSolarTec</h1>
              <nav class="hidden md:flex gap-4">
                <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Dashboard</a>
                <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Projects</a>
                <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">Customers</a>
              </nav>
            </div>
            
            <div class="flex items-center gap-4">
              <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <span class="sr-only">Notifications</span>
                🔔
              </button>
              <pst-user-menu />
            </div>
          </header>
        </div>
      `,
      code: `
// In your header component
<header class="app-header">
  <div class="header-left">
    <!-- Logo and navigation -->
  </div>
  
  <div class="header-right">
    <pst-notifications />
    <pst-user-menu />
  </div>
</header>`
    }
  ];

  props = [
    {
      name: 'user',
      type: 'User',
      default: '{ id, name, email, role }',
      description: 'User information to display'
    },
    {
      name: 'menuItems',
      type: 'MenuItem[]',
      default: '[profile, settings]',
      description: 'Primary menu items'
    },
    {
      name: 'bottomMenuItems',
      type: 'MenuItem[]',
      default: '[logout]',
      description: 'Menu items shown at the bottom'
    },
    {
      name: 'menuAction',
      type: 'EventEmitter<string>',
      default: '-',
      description: 'Event emitted when a menu item is clicked'
    }
  ];

  bestPractices = {
    do: [
      'Display user name and role for clarity',
      'Include avatar for visual identification',
      'Separate destructive actions (like logout) visually',
      'Provide keyboard navigation for accessibility',
      'Include theme toggle for user preference',
      'Keep menu items concise and relevant',
      'Use icons to improve scannability',
      'Close menu on outside click or ESC',
      'Show active/focused state clearly',
      'Consider adding user status indicators'
    ],
    dont: [
      'Don\'t overcrowd the menu with too many items',
      'Avoid mixing navigation items with actions randomly',
      'Don\'t use generic labels like "Options" or "Menu"',
      'Avoid placing destructive actions near common actions',
      'Don\'t forget to handle loading states for async actions',
      'Avoid using the menu for complex forms or multi-step processes',
      'Don\'t ignore mobile touch targets (minimum 44x44px)',
      'Avoid auto-closing on hover - wait for explicit interaction'
    ]
  };

  getUserInterface(): string {
    return `interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}`;
  }

  getExampleUser(): string {
    return `{
  id: '1',
  name: 'Max Mustermann',
  email: 'max.mustermann@prosolar.de',
  role: 'Administrator'
}`;
  }

  getMenuItemInterface(): string {
    return `interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  action?: () => void;
  route?: string;
  danger?: boolean;
}`;
  }

  getExampleMenuItems(): string {
    return `menuItems: [
  {
    id: 'profile',
    label: 'My Profile',
    icon: 'user',
    route: '/profile'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    route: '/settings'
  }
]

bottomMenuItems: [
  {
    id: 'logout',
    label: 'Logout',
    icon: 'logout',
    danger: true,
    action: () => this.logout()
  }
]`;
  }

  onMenuAction(actionId: string) {
    console.log('Menu action:', actionId);
  }
}
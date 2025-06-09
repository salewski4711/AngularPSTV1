import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { NavigationItem, NavigationConfig } from '../../../../../shared/components/bottom-navigation/bottom-navigation.types';

@Component({
  selector: 'pst-bottom-navigation-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Bottom Navigation"
      description="A mobile-friendly bottom navigation component for primary app navigation."
      [sections]="sections"
      [props]="props"
      [events]="events"
      [bestPractices]="bestPractices"
    />
  `
})
export class BottomNavigationShowcaseComponent {
  // Example navigation items
  defaultItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      route: '/home',
      icon: {
        filled: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
        outline: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      }
    },
    {
      id: 'search',
      label: 'Search',
      route: '/search',
      icon: {
        filled: 'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z',
        outline: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      }
    },
    {
      id: 'notifications',
      label: 'Notifications',
      route: '/notifications',
      icon: {
        filled: 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z',
        outline: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
      },
      badge: { count: 3, type: 'notification' }
    },
    {
      id: 'profile',
      label: 'Profile',
      route: '/profile',
      icon: {
        filled: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
        outline: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      }
    }
  ];

  minimalItems: NavigationItem[] = this.defaultItems.slice(0, 3);

  withBadgesItems: NavigationItem[] = [
    ...this.defaultItems.slice(0, 2),
    {
      id: 'messages',
      label: 'Messages',
      route: '/messages',
      icon: {
        filled: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
        outline: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      badge: { count: 12, type: 'notification' }
    },
    {
      id: 'tasks',
      label: 'Tasks',
      route: '/tasks',
      icon: {
        filled: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h2a1 1 0 100-2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2a1 1 0 100 2h2v6h-2a1 1 0 100 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a1 1 0 100-2h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7z',
        outline: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
      },
      badge: { count: 5, type: 'warning' }
    },
    this.defaultItems[3]
  ];

  sections = [
    {
      title: 'Basic Usage',
      description: 'A standard bottom navigation with common navigation items.',
      code: `
// Component
items: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    route: '/home',
    icon: {
      filled: '...', // SVG path for filled icon
      outline: '...' // SVG path for outline icon
    }
  },
  // ... more items
];

config: NavigationConfig = {
  items: this.items,
  position: 'fixed',
  showLabels: true,
  enableBadges: true,
  mobileOnly: false
};

onItemClick(item: NavigationItem) {
  console.log('Navigation item clicked:', item);
}

// Template
<pst-bottom-navigation
  [items]="items"
  [config]="config"
  (itemClick)="onItemClick($event)"
/>`
    },
    {
      title: 'With Badges',
      description: 'Show notification badges on navigation items.',
      code: `
items: NavigationItem[] = [
  {
    id: 'messages',
    label: 'Messages',
    route: '/messages',
    icon: { filled: '...', outline: '...' },
    badge: { count: 12, type: 'notification' }
  },
  {
    id: 'tasks',
    label: 'Tasks',
    route: '/tasks',
    icon: { filled: '...', outline: '...' },
    badge: { count: 5, type: 'warning' }
  }
];`
    },
    {
      title: 'Without Labels',
      description: 'Compact navigation showing only icons.',
      code: `
config: NavigationConfig = {
  items: this.items,
  position: 'fixed',
  showLabels: false, // Hide labels
  enableBadges: true,
  mobileOnly: false
};`
    },
    {
      title: 'Minimal Items',
      description: 'Best practice is to limit to 3-5 primary navigation items.',
      code: `
// Keep navigation minimal (3-5 items)
items: NavigationItem[] = [
  { id: 'home', label: 'Home', route: '/home', icon: {...} },
  { id: 'search', label: 'Search', route: '/search', icon: {...} },
  { id: 'profile', label: 'Profile', route: '/profile', icon: {...} }
];`
    },
    {
      title: 'Position Variants',
      description: 'Different positioning options for the navigation bar.',
      code: `
// Fixed position (default)
config.position = 'fixed';

// Relative position
config.position = 'relative';

// Sticky position
config.position = 'sticky';`
    },
    {
      title: 'Mobile Only',
      description: 'Hide navigation on desktop screens.',
      code: `
config: NavigationConfig = {
  items: this.items,
  position: 'fixed',
  showLabels: true,
  enableBadges: true,
  mobileOnly: true // Only show on mobile
};`
    }
  ];

  props = [
    {
      name: 'items',
      type: 'NavigationItem[]',
      default: '[]',
      description: 'Array of navigation items'
    },
    {
      name: 'config',
      type: 'NavigationConfig',
      default: '{ position: "fixed", showLabels: true, enableBadges: true, mobileOnly: false }',
      description: 'Configuration object for the navigation'
    }
  ];

  events = [
    {
      name: 'itemClick',
      type: 'EventEmitter<NavigationItem>',
      description: 'Event emitted when a navigation item is clicked'
    }
  ];

  bestPractices = {
    do: [
      'Limit to 3-5 primary navigation items',
      'Use recognizable icons with clear labels',
      'Keep labels short and descriptive',
      'Show active state clearly',
      'Ensure sufficient touch target size (48x48px minimum)',
      'Test navigation with different screen sizes',
      'Provide alternative navigation for accessibility',
      'Use consistent icon styles (filled for active, outline for inactive)',
      'Place most important items first and last'
    ],
    dont: [
      'Don\'t use more than 5 navigation items',
      'Avoid using badges on all items - it reduces their effectiveness',
      'Don\'t use bottom navigation as the only navigation method',
      'Avoid complex icons that are hard to recognize',
      'Don\'t hide labels if icons aren\'t universally understood',
      'Don\'t use bottom navigation for secondary actions',
      'Avoid using both bottom and tab navigation together',
      'Don\'t change item positions between screens'
    ]
  };

  // Configuration objects
  basicConfig: NavigationConfig = {
    items: this.defaultItems,
    position: 'fixed',
    showLabels: true,
    enableBadges: true,
    mobileOnly: false
  };

  badgeConfig: NavigationConfig = {
    items: this.withBadgesItems,
    position: 'fixed',
    showLabels: true,
    enableBadges: true,
    mobileOnly: false
  };

  noLabelsConfig: NavigationConfig = {
    items: this.defaultItems,
    position: 'fixed',
    showLabels: false,
    enableBadges: true,
    mobileOnly: false
  };

  relativeConfig: NavigationConfig = {
    items: this.minimalItems,
    position: 'relative',
    showLabels: true,
    enableBadges: true,
    mobileOnly: false
  };

  stickyConfig: NavigationConfig = {
    items: this.minimalItems,
    position: 'sticky',
    showLabels: true,
    enableBadges: true,
    mobileOnly: false
  };

  mobileOnlyConfig: NavigationConfig = {
    items: this.defaultItems,
    position: 'fixed',
    showLabels: true,
    enableBadges: true,
    mobileOnly: true
  };

  onItemClick(item: NavigationItem) {
    console.log('Navigation item clicked:', item);
  }
}
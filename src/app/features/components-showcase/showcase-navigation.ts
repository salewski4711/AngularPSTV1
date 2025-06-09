export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

export interface ShowcaseComponent {
  name: string;
  path: string;
  status: ComponentStatus;
  description?: string;
}

export interface ShowcaseCategory {
  name: string;
  description: string;
  components: ShowcaseComponent[];
}

export const showcaseNavigation: ShowcaseCategory[] = [
  {
    name: 'Atoms',
    description: 'Basic building blocks of the UI',
    components: [
      {
        name: 'Button',
        path: '/components/atoms/button',
        status: 'stable',
        description: 'Interactive button component with various styles and states'
      },
      {
        name: 'Input',
        path: '/components/atoms/input',
        status: 'stable',
        description: 'Text input field with validation support'
      },
      {
        name: 'Checkbox',
        path: '/components/atoms/checkbox',
        status: 'stable',
        description: 'Checkbox input for binary choices'
      },
      {
        name: 'Radio',
        path: '/components/atoms/radio',
        status: 'stable',
        description: 'Radio button for single selection from multiple options'
      },
      {
        name: 'Toggle',
        path: '/components/atoms/toggle',
        status: 'stable',
        description: 'Toggle switch for on/off states'
      },
      {
        name: 'Select',
        path: '/components/atoms/select',
        status: 'stable',
        description: 'Dropdown selection component'
      },
      {
        name: 'Badge',
        path: '/components/atoms/badge',
        status: 'stable',
        description: 'Small label component for status and counts'
      },
      {
        name: 'Avatar',
        path: '/components/atoms/avatar',
        status: 'stable',
        description: 'User profile image component'
      },
      {
        name: 'Icon',
        path: '/components/atoms/icon',
        status: 'stable',
        description: 'SVG icon component with size and color options'
      },
      {
        name: 'Logo',
        path: '/components/atoms/logo',
        status: 'stable',
        description: 'ProSolarTec logo component'
      },
      {
        name: 'Spinner',
        path: '/components/atoms/spinner',
        status: 'stable',
        description: 'Loading spinner component'
      },
      {
        name: 'Tag',
        path: '/components/atoms/tag',
        status: 'stable',
        description: 'Tag/chip component for labeling and categorization'
      },
      {
        name: 'Tooltip',
        path: '/components/atoms/tooltip',
        status: 'stable',
        description: 'Contextual information displayed on hover, click, or focus'
      },
      {
        name: 'Typography',
        path: '/components/atoms/typography',
        status: 'stable',
        description: 'Consistent text styles for headings and body content'
      },
      {
        name: 'Link',
        path: '/components/atoms/link',
        status: 'stable',
        description: 'Styled hyperlink with router integration'
      },
      {
        name: 'Divider',
        path: '/components/atoms/divider',
        status: 'stable',
        description: 'Visual separator for content sections'
      },
      {
        name: 'Progress Bar',
        path: '/components/atoms/progress-bar',
        status: 'stable',
        description: 'Visual indicator for task progress'
      },
      {
        name: 'Skeleton',
        path: '/components/atoms/skeleton',
        status: 'stable',
        description: 'Loading placeholder for content'
      }
    ]
  },
  {
    name: 'Molecules',
    description: 'Composite components built from atoms',
    components: [
      {
        name: 'Alert',
        path: '/components/molecules/alert',
        status: 'stable',
        description: 'Feedback component for displaying important messages and notifications'
      },
      {
        name: 'Form Field',
        path: '/components/molecules/form-field',
        status: 'stable',
        description: 'Container component for form inputs with label, help text, and error handling'
      },
      {
        name: 'Card',
        path: '/components/molecules/card',
        status: 'beta',
        description: 'Container component for grouped content'
      },
      {
        name: 'Dashboard Widget',
        path: '/components/molecules/dashboard-widget',
        status: 'stable',
        description: 'Hierarchical widget navigation for dashboard system'
      },
      {
        name: 'Button Group',
        path: '/components/molecules/button-group',
        status: 'stable',
        description: 'Group of buttons with shared behavior'
      },
      {
        name: 'Modal',
        path: '/components/molecules/modal',
        status: 'stable',
        description: 'Dialog component for overlaying content'
      },
      {
        name: 'Tabs',
        path: '/components/molecules/tabs',
        status: 'stable',
        description: 'Navigation component for organizing content into tabbed sections'
      },
      {
        name: 'Breadcrumb',
        path: '/components/molecules/breadcrumb',
        status: 'stable',
        description: 'Navigation component showing hierarchy path'
      },
      {
        name: 'Dropdown',
        path: '/components/molecules/dropdown',
        status: 'stable',
        description: 'Contextual menu for displaying a list of actions or options'
      },
      {
        name: 'Accordion',
        path: '/components/molecules/accordion',
        status: 'stable',
        description: 'Collapsible content panels for organizing information'
      },
      {
        name: 'Pagination',
        path: '/components/molecules/pagination',
        status: 'stable',
        description: 'Navigation for paginated content with page size options'
      },
      {
        name: 'Date Picker',
        path: '/components/molecules/date-picker',
        status: 'stable',
        description: 'Calendar-based date selection component'
      },
      {
        name: 'Time Picker',
        path: '/components/molecules/time-picker',
        status: 'stable',
        description: 'Time selection with hour/minute controls and format options'
      },
      {
        name: 'Bottom Navigation',
        path: '/components/molecules/bottom-navigation',
        status: 'stable',
        description: 'Mobile-friendly bottom navigation bar for primary app navigation'
      },
      {
        name: 'Notifications',
        path: '/components/molecules/notifications',
        status: 'stable',
        description: 'Notification center for displaying system messages and alerts'
      },
      {
        name: 'Search Modal',
        path: '/components/molecules/search-modal',
        status: 'stable',
        description: 'Command palette-style search for finding components quickly'
      },
      {
        name: 'User Menu',
        path: '/components/molecules/user-menu',
        status: 'stable',
        description: 'User account dropdown with profile actions and theme toggle'
      },
      {
        name: 'File Upload',
        path: '/components/molecules/file-upload',
        status: 'stable',
        description: 'Drag & drop and click-to-browse file upload with preview'
      }
    ]
  },
  {
    name: 'Organisms',
    description: 'Complex components composed of molecules and atoms',
    components: [
      {
        name: 'Top Navigation',
        path: '/components/organisms/top-navigation',
        status: 'stable',
        description: 'Primary application header with logo, search, notifications, and user menu'
      },
      {
        name: 'Mobile Menu',
        path: '/components/organisms/mobile-menu',
        status: 'stable',
        description: 'Full-screen mobile navigation drawer with slide-in animation'
      },
      {
        name: 'Stepper',
        path: '/components/organisms/stepper',
        status: 'stable',
        description: 'Multi-step navigation component for guiding users through complex processes'
      },
      {
        name: 'Search',
        path: '/components/organisms/search',
        status: 'stable',
        description: 'Advanced search with autocomplete, recent searches, and keyboard navigation'
      }
    ]
  }
];

export function getComponentByPath(path: string): ShowcaseComponent | undefined {
  for (const category of showcaseNavigation) {
    const component = category.components.find(c => c.path === path);
    if (component) {
      return component;
    }
  }
  return undefined;
}

export function getCategoryByPath(path: string): ShowcaseCategory | undefined {
  const categoryName = path.split('/')[2]; // Extract category from path like /components/atoms/button
  return showcaseNavigation.find(cat => cat.name.toLowerCase() === categoryName);
}
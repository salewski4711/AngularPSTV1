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
        name: 'Card',
        path: '/components/molecules/card',
        status: 'beta',
        description: 'Container component for grouped content'
      },
      {
        name: 'Button Group',
        path: '/components/molecules/button-group',
        status: 'stable',
        description: 'Group of buttons with shared behavior'
      }
    ]
  },
  {
    name: 'Organisms',
    description: 'Complex components composed of molecules and atoms',
    components: [
      // Future organisms will be added here
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
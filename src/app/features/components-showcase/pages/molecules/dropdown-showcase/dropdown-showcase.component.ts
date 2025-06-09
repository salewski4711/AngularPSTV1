import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { DropdownComponent } from '../../../../../shared/components/dropdown/dropdown.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import { DropdownItem } from '../../../../../shared/components/dropdown/dropdown.types';

@Component({
  selector: 'pst-dropdown-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Dropdown"
      description="A flexible dropdown menu component for displaying a list of actions or options."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class DropdownShowcaseComponent {
  // Example items for various demos
  basicItems: DropdownItem[] = [
    { label: 'Profile', icon: 'user' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Help', icon: 'help-circle' },
    { label: '', divider: true },
    { label: 'Logout', icon: 'logout', action: () => console.log('Logout clicked') }
  ];

  fileItems: DropdownItem[] = [
    { label: 'New File', icon: 'file-plus' },
    { label: 'Open...', icon: 'folder-open' },
    { label: 'Save', icon: 'save' },
    { label: 'Save As...', icon: 'save' },
    { label: '', divider: true },
    { label: 'Export', icon: 'download' },
    { label: 'Import', icon: 'upload' },
    { label: '', divider: true },
    { label: 'Exit', icon: 'x' }
  ];

  disabledItems: DropdownItem[] = [
    { label: 'Cut', icon: 'scissors' },
    { label: 'Copy', icon: 'copy' },
    { label: 'Paste', icon: 'clipboard', disabled: true },
    { label: '', divider: true },
    { label: 'Delete', icon: 'trash-2', disabled: true }
  ];

  sections = [
    {
      title: 'Basic Usage',
      description: 'A simple dropdown with icon items and actions.',
      content: `
        <pst-dropdown [items]="basicItems" (itemClick)="onItemClick($event)">
          <pst-button trigger variant="secondary">
            Options
            <pst-icon name="chevron-down" size="sm" class="ml-1" />
          </pst-button>
        </pst-dropdown>
      `,
      code: `
// Component
basicItems: DropdownItem[] = [
  { label: 'Profile', icon: 'user' },
  { label: 'Settings', icon: 'settings' },
  { label: 'Help', icon: 'help-circle' },
  { label: '', divider: true },
  { label: 'Logout', icon: 'logout', action: () => console.log('Logout clicked') }
];

onItemClick(item: DropdownItem) {
  console.log('Clicked:', item.label);
}

// Template
<pst-dropdown [items]="basicItems" (itemClick)="onItemClick($event)">
  <pst-button trigger variant="secondary">
    Options
    <pst-icon name="chevron-down" size="sm" class="ml-1" />
  </pst-button>
</pst-dropdown>`
    },
    {
      title: 'Positions',
      description: 'Dropdowns can be positioned in various directions relative to the trigger.',
      content: `
        <div class="flex flex-wrap gap-4 justify-center">
          <pst-dropdown [items]="basicItems" position="bottom-start">
            <pst-button trigger size="sm">Bottom Start</pst-button>
          </pst-dropdown>
          
          <pst-dropdown [items]="basicItems" position="bottom-end">
            <pst-button trigger size="sm">Bottom End</pst-button>
          </pst-dropdown>
          
          <pst-dropdown [items]="basicItems" position="top-start">
            <pst-button trigger size="sm">Top Start</pst-button>
          </pst-dropdown>
          
          <pst-dropdown [items]="basicItems" position="top-end">
            <pst-button trigger size="sm">Top End</pst-button>
          </pst-dropdown>
        </div>
      `,
      code: `
<pst-dropdown [items]="items" position="bottom-start">
  <pst-button trigger>Bottom Start</pst-button>
</pst-dropdown>

<pst-dropdown [items]="items" position="bottom-end">
  <pst-button trigger>Bottom End</pst-button>
</pst-dropdown>

<pst-dropdown [items]="items" position="top-start">
  <pst-button trigger>Top Start</pst-button>
</pst-dropdown>

<pst-dropdown [items]="items" position="top-end">
  <pst-button trigger>Top End</pst-button>
</pst-dropdown>`
    },
    {
      title: 'Disabled State',
      description: 'Individual items or the entire dropdown can be disabled.',
      content: `
        <div class="flex gap-4">
          <pst-dropdown [items]="disabledItems">
            <pst-button trigger variant="secondary">
              Edit Menu
              <pst-icon name="chevron-down" size="sm" class="ml-1" />
            </pst-button>
          </pst-dropdown>
          
          <pst-dropdown [items]="basicItems" [disabled]="true">
            <pst-button trigger [disabled]="true">
              Disabled Dropdown
            </pst-button>
          </pst-dropdown>
        </div>
      `,
      code: `
// Items with disabled state
disabledItems: DropdownItem[] = [
  { label: 'Cut', icon: 'scissors' },
  { label: 'Copy', icon: 'copy' },
  { label: 'Paste', icon: 'clipboard', disabled: true },
  { label: '', divider: true },
  { label: 'Delete', icon: 'trash-2', disabled: true }
];

// Disabled dropdown
<pst-dropdown [items]="items" [disabled]="true">
  <pst-button trigger [disabled]="true">
    Disabled Dropdown
  </pst-button>
</pst-dropdown>`
    },
    {
      title: 'Complex Menu',
      description: 'A more complex menu with multiple sections and dividers.',
      content: `
        <pst-dropdown [items]="fileItems">
          <pst-button trigger variant="primary">
            <pst-icon name="file" size="sm" class="mr-1" />
            File
            <pst-icon name="chevron-down" size="sm" class="ml-2" />
          </pst-button>
        </pst-dropdown>
      `,
      code: `
fileItems: DropdownItem[] = [
  { label: 'New File', icon: 'file-plus' },
  { label: 'Open...', icon: 'folder-open' },
  { label: 'Save', icon: 'save' },
  { label: 'Save As...', icon: 'save' },
  { label: '', divider: true },
  { label: 'Export', icon: 'download' },
  { label: 'Import', icon: 'upload' },
  { label: '', divider: true },
  { label: 'Exit', icon: 'x' }
];`
    },
    {
      title: 'Keep Open on Select',
      description: 'Dropdown can stay open after selecting an item.',
      content: `
        <pst-dropdown [items]="checkboxItems" [closeOnSelect]="false">
          <pst-button trigger variant="secondary">
            View Options
            <pst-icon name="chevron-down" size="sm" class="ml-1" />
          </pst-button>
        </pst-dropdown>
      `,
      code: `
<pst-dropdown [items]="items" [closeOnSelect]="false">
  <pst-button trigger variant="secondary">
    View Options
  </pst-button>
</pst-dropdown>`
    }
  ];

  props = [
    {
      name: 'items',
      type: 'DropdownItem[]',
      default: '[]',
      description: 'Array of dropdown items to display'
    },
    {
      name: 'position',
      type: 'DropdownPosition',
      default: 'bottom-start',
      description: 'Position of the dropdown relative to trigger'
    },
    {
      name: 'closeOnSelect',
      type: 'boolean',
      default: 'true',
      description: 'Whether to close dropdown after selecting an item'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the dropdown is disabled'
    },
    {
      name: 'itemClick',
      type: 'EventEmitter<DropdownItem>',
      default: '-',
      description: 'Event emitted when an item is clicked'
    }
  ];

  bestPractices = {
    do: [
      'Use clear, descriptive labels for menu items',
      'Group related items together using dividers',
      'Disable items that are not available in the current context',
      'Use icons to improve visual recognition',
      'Keep the number of items reasonable (7±2 rule)',
      'Consider using submenus for deeply nested options',
      'Provide keyboard navigation for accessibility',
      'Ensure sufficient contrast between text and background'
    ],
    dont: [
      'Don\'t create overly long dropdown menus without search or filtering',
      'Avoid using dropdown menus for primary navigation',
      'Don\'t hide critical actions in dropdowns',
      'Avoid nesting dropdowns more than two levels deep',
      'Don\'t use ambiguous or unclear labels',
      'Avoid placing destructive actions without confirmation',
      'Don\'t rely solely on hover states for important information',
      'Avoid opening dropdowns on hover in touch interfaces'
    ]
  };

  checkboxItems: DropdownItem[] = [
    { label: 'Show Grid', icon: 'grid' },
    { label: 'Show Rulers', icon: 'ruler' },
    { label: 'Show Guides', icon: 'crosshair' },
    { label: '', divider: true },
    { label: 'Lock Guides', icon: 'lock' }
  ];

  onItemClick(item: DropdownItem) {
    console.log('Clicked:', item.label);
  }
}
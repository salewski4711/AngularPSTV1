import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { AccordionPanel, PanelToggleEvent } from '../../../../../shared/components/accordion/accordion.types';

@Component({
  selector: 'pst-accordion-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Accordion"
      description="An accordion component for organizing content into collapsible sections."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class AccordionShowcaseComponent {
  // Example panels for various demos
  basicPanels = signal<AccordionPanel[]>([
    {
      id: '1',
      header: 'What is ProSolarTec?',
      content: 'ProSolarTec is a comprehensive CRM solution designed specifically for solar energy companies. It helps manage customer relationships, track projects, and streamline operations.',
      expanded: true
    },
    {
      id: '2',
      header: 'How does the pricing work?',
      content: 'We offer flexible pricing plans based on the number of users and features required. Contact our sales team for a customized quote.',
      expanded: false
    },
    {
      id: '3',
      header: 'Is there a free trial available?',
      content: 'Yes! We offer a 30-day free trial with full access to all features. No credit card required.',
      expanded: false
    }
  ]);

  featurePanels = signal<AccordionPanel[]>([
    {
      id: 'crm',
      header: 'Customer Relationship Management',
      content: 'Track leads, manage contacts, and nurture customer relationships throughout the entire sales cycle.'
    },
    {
      id: 'projects',
      header: 'Project Management',
      content: 'Plan, execute, and monitor solar installation projects from initial assessment to final inspection.'
    },
    {
      id: 'analytics',
      header: 'Analytics & Reporting',
      content: 'Gain insights into your business performance with comprehensive analytics and customizable reports.'
    },
    {
      id: 'mobile',
      header: 'Mobile Application',
      content: 'Access your data on the go with our native mobile applications for iOS and Android.'
    }
  ]);

  disabledPanels = signal<AccordionPanel[]>([
    {
      id: '1',
      header: 'Available Feature',
      content: 'This feature is available and can be expanded.',
      expanded: false
    },
    {
      id: '2',
      header: 'Premium Feature (Locked)',
      content: 'This feature requires a premium subscription.',
      disabled: true
    },
    {
      id: '3',
      header: 'Beta Feature (Coming Soon)',
      content: 'This feature is currently in development.',
      disabled: true
    }
  ]);

  sections = [
    {
      title: 'Basic Usage',
      description: 'A simple accordion with expandable panels.',
      content: `
        <pst-accordion 
          [panels]="basicPanels" 
          (panelToggle)="onPanelToggle($event)"
        />
      `,
      code: `
// Component
basicPanels = signal<AccordionPanel[]>([
  {
    id: '1',
    header: 'What is ProSolarTec?',
    content: 'ProSolarTec is a comprehensive CRM solution...',
    expanded: true
  },
  {
    id: '2',
    header: 'How does the pricing work?',
    content: 'We offer flexible pricing plans...',
    expanded: false
  }
]);

onPanelToggle(event: PanelToggleEvent) {
  console.log('Panel toggled:', event);
}

// Template
<pst-accordion 
  [panels]="basicPanels" 
  (panelToggle)="onPanelToggle($event)"
/>`
    },
    {
      title: 'Multiple Panels Open',
      description: 'Allow multiple panels to be open simultaneously.',
      content: `
        <pst-accordion 
          [panels]="featurePanels"
          [multiple]="multipleSignal"
        />
      `,
      code: `
<pst-accordion 
  [panels]="panels"
  [multiple]="signal(true)"
/>`
    },
    {
      title: 'Icon Position',
      description: 'Change the position of the expand/collapse icon.',
      content: `
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon on Right (Default)</h4>
            <pst-accordion 
              [panels]="iconRightPanels"
              [iconPosition]="iconPositionRight"
            />
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon on Left</h4>
            <pst-accordion 
              [panels]="iconLeftPanels"
              [iconPosition]="iconPositionLeft"
            />
          </div>
        </div>
      `,
      code: `
// Icon on right (default)
<pst-accordion 
  [panels]="panels"
  [iconPosition]="signal('right')"
/>

// Icon on left
<pst-accordion 
  [panels]="panels"
  [iconPosition]="signal('left')"
/>`
    },
    {
      title: 'Disabled Panels',
      description: 'Individual panels can be disabled to prevent interaction.',
      content: `
        <pst-accordion [panels]="disabledPanels" />
      `,
      code: `
disabledPanels = signal<AccordionPanel[]>([
  {
    id: '1',
    header: 'Available Feature',
    content: 'This feature is available.',
    expanded: false
  },
  {
    id: '2',
    header: 'Premium Feature (Locked)',
    content: 'Requires premium subscription.',
    disabled: true
  }
]);`
    },
    {
      title: 'Without Animation',
      description: 'Disable the expand/collapse animation for instant transitions.',
      content: `
        <pst-accordion 
          [panels]="basicPanels"
          [animated]="animatedSignal"
        />
      `,
      code: `
<pst-accordion 
  [panels]="panels"
  [animated]="signal(false)"
/>`
    }
  ];

  props = [
    {
      name: 'panels',
      type: 'signal<AccordionPanel[]>',
      default: 'signal([])',
      description: 'Array of panel configurations'
    },
    {
      name: 'multiple',
      type: 'signal<boolean>',
      default: 'signal(false)',
      description: 'Allow multiple panels to be open'
    },
    {
      name: 'animated',
      type: 'signal<boolean>',
      default: 'signal(true)',
      description: 'Enable expand/collapse animations'
    },
    {
      name: 'iconPosition',
      type: 'signal<"left" | "right">',
      default: 'signal("right")',
      description: 'Position of the expand/collapse icon'
    },
    {
      name: 'panelToggle',
      type: 'EventEmitter<PanelToggleEvent>',
      default: '-',
      description: 'Event emitted when a panel is toggled'
    }
  ];

  bestPractices = {
    do: [
      'Use clear, descriptive headers that summarize the content',
      'Keep content concise and focused on a single topic per panel',
      'Consider using multiple mode when panels contain independent content',
      'Use single mode when panels show different views of the same data',
      'Provide visual feedback for disabled panels',
      'Ensure keyboard navigation works properly',
      'Consider starting with the most important panel expanded',
      'Test with screen readers for accessibility'
    ],
    dont: [
      'Avoid nesting accordions within accordions',
      'Don\'t use accordions for a single collapsible section',
      'Avoid very long content that requires excessive scrolling',
      'Don\'t disable panels without clear visual indication',
      'Avoid auto-expanding panels without user interaction',
      'Don\'t use accordions for critical information that must always be visible'
    ]
  };

  // Additional demo data
  multipleSignal = signal(true);
  animatedSignal = signal(false);
  iconPositionRight = signal<'left' | 'right'>('right');
  iconPositionLeft = signal<'left' | 'right'>('left');

  iconRightPanels = signal<AccordionPanel[]>([
    { id: '1', header: 'Panel with icon on right', content: 'This is the default icon position.' }
  ]);

  iconLeftPanels = signal<AccordionPanel[]>([
    { id: '1', header: 'Panel with icon on left', content: 'The icon appears before the header text.' }
  ]);

  onPanelToggle(event: PanelToggleEvent) {
    console.log('Panel toggled:', event);
  }
}
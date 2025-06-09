import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { ShowcaseTemplateComponent, ShowcaseSection } from '../../../shared/showcase-template.component';
import { ShowcaseProp } from '../../../shared/base-showcase.component';
import { EventDefinition } from '../../../shared/components/props-table.component';
import { ExampleLoaderService } from '../../../services/example-loader.service';

@Component({
  selector: 'pst-tag-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TagComponent,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      [title]="title"
      [description]="description"
      [sections]="sections"
      [props]="props"
      [events]="events"
      [bestPractices]="bestPractices"
    />

    <!-- Interactive Demo Section -->
    <div class="mt-12 space-y-8">
      <!-- Removable Tags Demo -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Interactive Demo: Removable Tags</h3>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="flex flex-wrap gap-3">
            @for (tag of tags; track tag) {
              <pst-tag 
                [color]="tag.color" 
                [removable]="true"
                (remove)="removeTag(tag)"
              >
                {{ tag.label }}
              </pst-tag>
            }
          </div>
          @if (tags.length === 0) {
            <p class="text-gray-500 dark:text-gray-400">All tags removed. Refresh to reset.</p>
          }
        </div>
      </section>

      <!-- Common Use Cases -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Common Use Cases</h3>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6">
          <!-- Status Tags -->
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Tags</p>
            <div class="flex flex-wrap gap-3">
              <pst-tag color="success" shape="pill" leadingIcon="circle" size="sm">Online</pst-tag>
              <pst-tag color="warning" shape="pill" leadingIcon="circle" size="sm">Away</pst-tag>
              <pst-tag color="gray" shape="pill" leadingIcon="circle" size="sm">Offline</pst-tag>
            </div>
          </div>
          
          <!-- Category Tags -->
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Tags</p>
            <div class="flex flex-wrap gap-2">
              <pst-tag variant="subtle" color="info" [removable]="true">Technology</pst-tag>
              <pst-tag variant="subtle" color="info" [removable]="true">Design</pst-tag>
              <pst-tag variant="subtle" color="info" [removable]="true">Business</pst-tag>
              <pst-tag variant="subtle" color="info" [removable]="true">Marketing</pst-tag>
            </div>
          </div>
          
          <!-- Version Tags -->
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Version Tags</p>
            <div class="flex flex-wrap gap-3">
              <pst-tag size="xs" color="gray" shape="square">v2.1.0</pst-tag>
              <pst-tag size="xs" color="info" variant="subtle" shape="square">Beta</pst-tag>
              <pst-tag size="xs" color="success" variant="subtle" shape="square">Stable</pst-tag>
            </div>
          </div>
          
          <!-- Filter Tags -->
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter Tags</p>
            <div class="flex flex-wrap gap-2">
              <pst-tag variant="outline" [removable]="true">Price: $0-$100</pst-tag>
              <pst-tag variant="outline" [removable]="true">Brand: Apple</pst-tag>
              <pst-tag variant="outline" [removable]="true">Color: Black</pst-tag>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class TagShowcaseComponent {
  title = 'Tag';
  description = 'A versatile tag/chip component for labeling, categorization, and filtering. Tags can be removable, have icons, and come in multiple styles and sizes.';
  
  tags = [
    { label: 'Angular', color: 'primary' as const },
    { label: 'TypeScript', color: 'info' as const },
    { label: 'Tailwind CSS', color: 'success' as const },
    { label: 'RxJS', color: 'warning' as const },
    { label: 'Jest', color: 'error' as const }
  ];

  props: ShowcaseProp[] = [
    {
      name: 'variant',
      type: "'filled' | 'outline' | 'subtle'",
      default: "'filled'",
      description: 'The visual style variant of the tag'
    },
    {
      name: 'color',
      type: "'gray' | 'primary' | 'success' | 'error' | 'warning' | 'info'",
      default: "'gray'",
      description: 'The color theme of the tag'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      default: "'sm'",
      description: 'The size of the tag'
    },
    {
      name: 'shape',
      type: "'rounded' | 'pill' | 'square'",
      default: "'rounded'",
      description: 'The shape/border radius of the tag'
    },
    {
      name: 'leadingIcon',
      type: 'string',
      default: 'undefined',
      description: 'Icon to display before the tag content'
    },
    {
      name: 'trailingIcon',
      type: 'string',
      default: 'undefined',
      description: 'Icon to display after the tag content'
    },
    {
      name: 'removable',
      type: 'boolean',
      default: 'false',
      description: 'Whether the tag can be removed'
    },
    {
      name: 'removeAriaLabel',
      type: 'string',
      default: "'Remove tag'",
      description: 'Aria label for the remove button'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the tag is disabled'
    }
  ];

  events: EventDefinition[] = [
    {
      name: 'remove',
      type: 'EventEmitter<void>',
      description: 'Event emitted when the tag is removed'
    }
  ];

  sections: ShowcaseSection[] = [];

  bestPractices = {
    do: [
      'Use consistent colors for the same types of information across your application',
      'Choose appropriate sizes based on the context and surrounding content',
      'Use removable tags for user-generated or editable content',
      'Provide clear visual hierarchy with variant and color combinations',
      'Use icons to enhance meaning and improve scanability'
    ],
    dont: [
      'Don\'t use too many different colors in the same context',
      'Don\'t make tags too small to interact with on touch devices',
      'Don\'t use removable tags for static or system-generated content',
      'Don\'t rely solely on color to convey meaning (use icons or text)',
      'Don\'t overuse tags - they should highlight important information'
    ]
  };

  constructor(private exampleLoader: ExampleLoaderService) {
    this.loadExamples();
  }

  private async loadExamples() {
    const files = [
      { key: 'basic', title: 'Basic Usage', description: 'Simple tags with different colors' },
      { key: 'sizes', title: 'Size Variants', description: 'Tags in different sizes for various contexts' },
      { key: 'variants', title: 'Style Variants', description: 'Filled, outline, and subtle tag styles' },
      { key: 'shapes', title: 'Shape Variants', description: 'Different border radius options' },
      { key: 'with-icons', title: 'With Icons', description: 'Tags with leading and trailing icons' },
      { key: 'removable', title: 'Removable Tags', description: 'Tags that can be dismissed by users' },
      { key: 'use-cases', title: 'Common Use Cases', description: 'Real-world examples of tag usage' }
    ];

    for (const file of files) {
      try {
        this.exampleLoader.loadExample('tag-showcase', file.key).subscribe({
          next: (content) => {
            this.sections.push({
              title: file.title,
              description: file.description,
              code: content
            });
          },
          error: (error) => {
            console.error(`Failed to load example ${file.key}:`, error);
          }
        });
      } catch (error) {
        console.error(`Failed to load example ${file.key}:`, error);
      }
    }
  }

  removeTag(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    }
  }
}
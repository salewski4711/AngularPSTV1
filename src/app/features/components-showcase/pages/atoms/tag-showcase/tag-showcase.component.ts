import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../../../../shared/components/tag/tag.component';
import { PlaygroundComponent, PlaygroundProp } from '../../../shared/components/playground.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { ExampleLoaderService } from '../../../services/example-loader.service';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-tag-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TagComponent,
    PlaygroundComponent,
    PropsTableComponent,
    CodeBlockComponent
  ],
  template: `
    <div class="space-y-12">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Tag Component</h1>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
          A versatile tag/chip component for labeling, categorization, and filtering. Tags can be removable, have icons, and come in multiple styles and sizes.
        </p>
      </div>

      <!-- Interactive Playground -->
      <app-playground
        [config]="playgroundConfig"
      ></app-playground>

      <!-- Examples -->
      <section class="space-y-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Examples</h2>
        
        <!-- Basic Example -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Basic Usage</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-3">
              <app-tag>Default Tag</app-tag>
              <app-tag color="primary">Primary Tag</app-tag>
              <app-tag color="success">Success Tag</app-tag>
              <app-tag color="error">Error Tag</app-tag>
              <app-tag color="warning">Warning Tag</app-tag>
              <app-tag color="info">Info Tag</app-tag>
            </div>
          </div>
          @if (examples['basic']) {
            <app-code-block 
              [code]="examples['basic']" 
              language="html" 
            />
          }
        </div>

        <!-- Size Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Size Variants</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap items-center gap-4">
              <app-tag size="xs" color="primary">Extra Small</app-tag>
              <app-tag size="sm" color="primary">Small</app-tag>
              <app-tag size="md" color="primary">Medium</app-tag>
              <app-tag size="lg" color="primary">Large</app-tag>
            </div>
          </div>
          @if (examples['sizes']) {
            <app-code-block 
              [code]="examples['sizes']" 
              language="html" 
            />
          }
        </div>

        <!-- Style Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Style Variants</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filled</p>
              <div class="flex flex-wrap gap-3">
                <app-tag variant="filled" color="gray">Gray</app-tag>
                <app-tag variant="filled" color="primary">Primary</app-tag>
                <app-tag variant="filled" color="success">Success</app-tag>
                <app-tag variant="filled" color="error">Error</app-tag>
                <app-tag variant="filled" color="warning">Warning</app-tag>
                <app-tag variant="filled" color="info">Info</app-tag>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Outline</p>
              <div class="flex flex-wrap gap-3">
                <app-tag variant="outline" color="gray">Gray</app-tag>
                <app-tag variant="outline" color="primary">Primary</app-tag>
                <app-tag variant="outline" color="success">Success</app-tag>
                <app-tag variant="outline" color="error">Error</app-tag>
                <app-tag variant="outline" color="warning">Warning</app-tag>
                <app-tag variant="outline" color="info">Info</app-tag>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtle</p>
              <div class="flex flex-wrap gap-3">
                <app-tag variant="subtle" color="gray">Gray</app-tag>
                <app-tag variant="subtle" color="primary">Primary</app-tag>
                <app-tag variant="subtle" color="success">Success</app-tag>
                <app-tag variant="subtle" color="error">Error</app-tag>
                <app-tag variant="subtle" color="warning">Warning</app-tag>
                <app-tag variant="subtle" color="info">Info</app-tag>
              </div>
            </div>
          </div>
          @if (examples['variants']) {
            <app-code-block 
              [code]="examples['variants']" 
              language="html" 
            />
          }
        </div>

        <!-- Shape Variants -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Shape Variants</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-3">
              <app-tag shape="rounded" color="primary">Rounded</app-tag>
              <app-tag shape="pill" color="primary">Pill</app-tag>
              <app-tag shape="square" color="primary">Square</app-tag>
            </div>
          </div>
          @if (examples['shapes']) {
            <app-code-block 
              [code]="examples['shapes']" 
              language="html" 
            />
          }
        </div>

        <!-- With Icons -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">With Icons</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-3">
              <app-tag color="success" leadingIcon="check">Active</app-tag>
              <app-tag color="error" trailingIcon="alert-triangle">Urgent</app-tag>
              <app-tag color="info" leadingIcon="info" trailingIcon="chevron-right">Learn More</app-tag>
              <app-tag color="warning" leadingIcon="clock">Pending</app-tag>
            </div>
          </div>
          @if (examples['with-icons']) {
            <app-code-block 
              [code]="examples['with-icons']" 
              language="html" 
            />
          }
        </div>

        <!-- Removable Tags -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Removable Tags</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-3">
              @for (tag of tags; track tag) {
                <app-tag 
                  [color]="tag.color" 
                  [removable]="true"
                  (remove)="removeTag(tag)"
                >
                  {{ tag.label }}
                </app-tag>
              }
            </div>
            @if (tags.length === 0) {
              <p class="text-gray-500 dark:text-gray-400">All tags removed. Refresh to reset.</p>
            }
          </div>
          @if (examples['removable']) {
            <app-code-block 
              [code]="examples['removable']" 
              language="html" 
            />
          }
        </div>

        <!-- Use Cases -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Common Use Cases</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6">
            <!-- Status Tags -->
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Tags</p>
              <div class="flex flex-wrap gap-3">
                <app-tag color="success" shape="pill" leadingIcon="circle" size="sm">Online</app-tag>
                <app-tag color="warning" shape="pill" leadingIcon="circle" size="sm">Away</app-tag>
                <app-tag color="gray" shape="pill" leadingIcon="circle" size="sm">Offline</app-tag>
              </div>
            </div>
            
            <!-- Category Tags -->
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Tags</p>
              <div class="flex flex-wrap gap-2">
                <app-tag variant="subtle" color="info" [removable]="true">Technology</app-tag>
                <app-tag variant="subtle" color="info" [removable]="true">Design</app-tag>
                <app-tag variant="subtle" color="info" [removable]="true">Business</app-tag>
                <app-tag variant="subtle" color="info" [removable]="true">Marketing</app-tag>
              </div>
            </div>
            
            <!-- Version Tags -->
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Version Tags</p>
              <div class="flex flex-wrap gap-3">
                <app-tag size="xs" color="gray" shape="square">v2.1.0</app-tag>
                <app-tag size="xs" color="info" variant="subtle" shape="square">Beta</app-tag>
                <app-tag size="xs" color="success" variant="subtle" shape="square">Stable</app-tag>
              </div>
            </div>
            
            <!-- Filter Tags -->
            <div>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter Tags</p>
              <div class="flex flex-wrap gap-2">
                <app-tag variant="outline" [removable]="true">Price: $0-$100</app-tag>
                <app-tag variant="outline" [removable]="true">Brand: Apple</app-tag>
                <app-tag variant="outline" [removable]="true">Color: Black</app-tag>
              </div>
            </div>
          </div>
          @if (examples['use-cases']) {
            <app-code-block 
              [code]="examples['use-cases']" 
              language="html" 
            />
          }
        </div>
      </section>

      <!-- Props Table -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Props</h2>
        <app-props-table [props]="props" />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagShowcaseComponent extends BaseShowcaseComponent {
  component = TagComponent;
  title = 'Tag';
  description = 'A versatile tag/chip component for labeling, categorization, and filtering.';
  
  tags = [
    { label: 'Angular', color: 'primary' as const },
    { label: 'TypeScript', color: 'info' as const },
    { label: 'Tailwind CSS', color: 'success' as const },
    { label: 'RxJS', color: 'warning' as const },
    { label: 'Jest', color: 'error' as const }
  ];

  examples: Record<string, string> = {};

  props = [
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
    },
    {
      name: 'remove',
      type: 'EventEmitter<void>',
      default: '-',
      description: 'Event emitted when the tag is removed'
    }
  ];

  constructor(private exampleLoader: ExampleLoaderService) {
    super();
    this.loadExamples();
  }

  private async loadExamples() {
    const files = [
      'basic',
      'sizes',
      'variants',
      'shapes',
      'with-icons',
      'removable',
      'use-cases'
    ];

    for (const file of files) {
      try {
        this.exampleLoader.loadExample('tag-showcase', file).subscribe({
          next: (content) => {
            this.examples[file] = content;
          },
          error: (error) => {
            console.error(`Failed to load example ${file}:`, error);
          }
        });
      } catch (error) {
        console.error(`Failed to load example ${file}:`, error);
      }
    }
  }

  // Override base class methods for custom behavior
  protected override createPlaygroundProps(): PlaygroundProp[] {
    return [
      {
        name: 'variant',
        type: 'enum',
        defaultValue: 'filled',
        options: ['filled', 'outline', 'subtle'],
        description: 'The visual style variant of the tag'
      },
      {
        name: 'color',
        type: 'enum',
        defaultValue: 'gray',
        options: ['gray', 'primary', 'success', 'error', 'warning', 'info'],
        description: 'The color theme of the tag'
      },
      {
        name: 'size',
        type: 'enum',
        defaultValue: 'sm',
        options: ['xs', 'sm', 'md', 'lg'],
        description: 'The size of the tag'
      },
      {
        name: 'shape',
        type: 'enum',
        defaultValue: 'rounded',
        options: ['rounded', 'pill', 'square'],
        description: 'The shape/border radius of the tag'
      },
      {
        name: 'leadingIcon',
        type: 'string',
        defaultValue: '',
        description: 'Icon to display before the tag content'
      },
      {
        name: 'trailingIcon',
        type: 'string',
        defaultValue: '',
        description: 'Icon to display after the tag content'
      },
      {
        name: 'removable',
        type: 'boolean',
        defaultValue: false,
        description: 'Whether the tag can be removed'
      },
      {
        name: 'content',
        type: 'string',
        defaultValue: 'Sample Tag',
        description: 'Tag text content'
      }
    ];
  }

  protected override generateCode(props: any): string {
    const attributes: string[] = [];
    
    if (props.variant && props.variant !== 'filled') {
      attributes.push(`variant="${props.variant}"`);
    }
    if (props.color && props.color !== 'gray') {
      attributes.push(`color="${props.color}"`);
    }
    if (props.size && props.size !== 'sm') {
      attributes.push(`size="${props.size}"`);
    }
    if (props.shape && props.shape !== 'rounded') {
      attributes.push(`shape="${props.shape}"`);
    }
    if (props.leadingIcon) {
      attributes.push(`leadingIcon="${props.leadingIcon}"`);
    }
    if (props.trailingIcon) {
      attributes.push(`trailingIcon="${props.trailingIcon}"`);
    }
    if (props.removable) {
      attributes.push(`[removable]="true"`);
      attributes.push(`(remove)="handleRemove()"`);
    }
    
    const attributesStr = attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : '';
    
    return `<app-tag${attributesStr}>
  ${props.content || 'Sample Tag'}
</app-tag>`;
  }

  removeTag(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    }
  }
}
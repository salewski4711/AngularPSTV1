import { Component, Input, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/icons/icon.component';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

type SortField = 'name' | 'type' | 'required' | 'default';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-props-table',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <!-- Search Bar -->
      @if (searchable && props.length > 0) {
        <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <app-icon 
              name="search" 
              [size]="16" 
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></app-icon>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              placeholder="Search properties..."
              class="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
          </div>
        </div>
      }

      <!-- Table -->
      <div class="overflow-x-auto">
        @if (filteredProps().length > 0) {
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
              <tr>
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  [class.cursor-pointer]="sortable"
                  (click)="sortable && sort('name')"
                >
                  <div class="flex items-center gap-1">
                    <span>Property</span>
                    @if (sortable && sortField() === 'name') {
                      <app-icon 
                        [name]="sortDirection() === 'asc' ? 'chevron-up' : 'chevron-down'" 
                        [size]="12"
                      ></app-icon>
                    }
                  </div>
                </th>
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  [class.cursor-pointer]="sortable"
                  (click)="sortable && sort('type')"
                >
                  <div class="flex items-center gap-1">
                    <span>Type</span>
                    @if (sortable && sortField() === 'type') {
                      <app-icon 
                        [name]="sortDirection() === 'asc' ? 'chevron-up' : 'chevron-down'" 
                        [size]="12"
                      ></app-icon>
                    }
                  </div>
                </th>
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  [class.cursor-pointer]="sortable"
                  (click)="sortable && sort('default')"
                >
                  <div class="flex items-center gap-1">
                    <span>Default</span>
                    @if (sortable && sortField() === 'default') {
                      <app-icon 
                        [name]="sortDirection() === 'asc' ? 'chevron-up' : 'chevron-down'" 
                        [size]="12"
                      ></app-icon>
                    }
                  </div>
                </th>
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  [class.cursor-pointer]="sortable"
                  (click)="sortable && sort('required')"
                >
                  <div class="flex items-center gap-1">
                    <span>Required</span>
                    @if (sortable && sortField() === 'required') {
                      <app-icon 
                        [name]="sortDirection() === 'asc' ? 'chevron-up' : 'chevron-down'" 
                        [size]="12"
                      ></app-icon>
                    }
                  </div>
                </th>
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              @for (prop of sortedProps(); track prop.name) {
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td class="px-4 py-3 text-sm">
                    <button
                      (click)="copyToClipboard(prop.name)"
                      class="group flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                      [attr.aria-label]="'Copy ' + prop.name"
                      title="Click to copy"
                    >
                      <span>{{ prop.name }}</span>
                      @if (prop.required) {
                        <span class="text-red-500" aria-label="Required">*</span>
                      }
                      <app-icon 
                        name="copy" 
                        [size]="14" 
                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                      ></app-icon>
                    </button>
                    @if (copiedProp() === prop.name) {
                      <span class="ml-2 text-xs text-green-600 dark:text-green-400">Copied!</span>
                    }
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <code class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded font-mono">
                      {{ prop.type }}
                    </code>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    @if (prop.default !== undefined) {
                      <code class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded font-mono">
                        {{ prop.default }}
                      </code>
                    } @else {
                      <span class="text-gray-400 dark:text-gray-600">-</span>
                    }
                  </td>
                  <td class="px-4 py-3 text-sm">
                    @if (prop.required) {
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                        Yes
                      </span>
                    } @else {
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        No
                      </span>
                    }
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    <div 
                      class="max-w-xs"
                      [class.line-clamp-2]="!expandedDescriptions.has(prop.name)"
                    >
                      {{ prop.description }}
                    </div>
                    @if (prop.description.length > 100) {
                      <button
                        (click)="toggleDescription(prop.name)"
                        class="mt-1 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                      >
                        {{ expandedDescriptions.has(prop.name) ? 'Show less' : 'Show more' }}
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else if (props.length > 0) {
          <!-- No results state -->
          <div class="px-4 py-8 text-center">
            <app-icon name="search" [size]="48" class="mx-auto text-gray-400 mb-4"></app-icon>
            <p class="text-gray-500 dark:text-gray-400">
              No properties found matching "{{ searchQuery() }}"
            </p>
          </div>
        } @else {
          <!-- Empty state -->
          <div class="px-4 py-8 text-center">
            <app-icon name="info" [size]="48" class="mx-auto text-gray-400 mb-4"></app-icon>
            <p class="text-gray-500 dark:text-gray-400">
              No properties defined for this component
            </p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class PropsTableComponent {
  @Input() props: PropDefinition[] = [];
  @Input() searchable: boolean = true;
  @Input() sortable: boolean = true;

  searchQuery = signal('');
  sortField = signal<SortField>('name');
  sortDirection = signal<SortDirection>('asc');
  copiedProp = signal<string | null>(null);
  expandedDescriptions = new Set<string>();

  filteredProps = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {return this.props;}

    return this.props.filter(prop => 
      prop.name.toLowerCase().includes(query) ||
      prop.type.toLowerCase().includes(query) ||
      prop.description.toLowerCase().includes(query) ||
      (prop.default && prop.default.toLowerCase().includes(query))
    );
  });

  sortedProps = computed(() => {
    const props = [...this.filteredProps()];
    const field = this.sortField();
    const direction = this.sortDirection();

    return props.sort((a, b) => {
      let aValue: any = a[field];
      let bValue: any = b[field];

      // Handle undefined values
      if (aValue === undefined) {aValue = '';}
      if (bValue === undefined) {bValue = '';}

      // Convert boolean to string for sorting
      if (typeof aValue === 'boolean') {aValue = aValue ? 'yes' : 'no';}
      if (typeof bValue === 'boolean') {bValue = bValue ? 'yes' : 'no';}

      // Compare values
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return direction === 'asc' ? comparison : -comparison;
    });
  });

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  sort(field: SortField) {
    if (this.sortField() === field) {
      // Toggle direction if same field
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }

  toggleDescription(propName: string) {
    if (this.expandedDescriptions.has(propName)) {
      this.expandedDescriptions.delete(propName);
    } else {
      this.expandedDescriptions.add(propName);
    }
  }

  copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedProp.set(text);
        setTimeout(() => {
          this.copiedProp.set(null);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  }
}
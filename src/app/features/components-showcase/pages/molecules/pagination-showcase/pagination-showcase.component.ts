import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'pst-pagination-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Pagination"
      description="A pagination component for navigating through large sets of data."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class PaginationShowcaseComponent {
  // Demo state
  currentPage1 = 1;
  currentPage2 = 5;
  currentPage3 = 1;
  currentPage4 = 1;
  currentPage5 = 1;
  
  itemsPerPage1 = 10;
  itemsPerPage2 = 20;
  totalItems = 248;

  sections = [
    {
      title: 'Basic Usage',
      description: 'A standard pagination component with page numbers and navigation.',
      content: `
        <pst-pagination
          [currentPage]="currentPage1"
          [totalItems]="248"
          [itemsPerPage]="10"
          (pageChange)="onPageChange1($event)"
        />
      `,
      code: `
// Component
currentPage = 1;
totalItems = 248;
itemsPerPage = 10;

onPageChange(page: number) {
  this.currentPage = page;
  // Load data for the new page
}

// Template
<pst-pagination
  [currentPage]="currentPage"
  [totalItems]="totalItems"
  [itemsPerPage]="itemsPerPage"
  (pageChange)="onPageChange($event)"
/>`
    },
    {
      title: 'With Page Size Selector',
      description: 'Allow users to change the number of items per page.',
      content: `
        <pst-pagination
          [currentPage]="currentPage2"
          [totalItems]="totalItems"
          [itemsPerPage]="itemsPerPage2"
          [showPageSize]="true"
          [pageSizeOptions]="[10, 20, 50, 100]"
          (pageChange)="onPageChange2($event)"
          (pageSizeChange)="onPageSizeChange2($event)"
        />
      `,
      code: `
<pst-pagination
  [currentPage]="currentPage"
  [totalItems]="totalItems"
  [itemsPerPage]="itemsPerPage"
  [showPageSize]="true"
  [pageSizeOptions]="[10, 20, 50, 100]"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)"
/>

// Handle page size change
onPageSizeChange(pageSize: number) {
  this.itemsPerPage = pageSize;
  this.currentPage = 1; // Reset to first page
  // Reload data with new page size
}`
    },
    {
      title: 'Compact Mode',
      description: 'A compact version for mobile or space-constrained layouts.',
      content: `
        <pst-pagination
          [currentPage]="currentPage3"
          [totalItems]="totalItems"
          [itemsPerPage]="10"
          [compact]="true"
          (pageChange)="onPageChange3($event)"
        />
      `,
      code: `
<pst-pagination
  [currentPage]="currentPage"
  [totalItems]="totalItems"
  [itemsPerPage]="itemsPerPage"
  [compact]="true"
  (pageChange)="onPageChange($event)"
/>`
    },
    {
      title: 'Custom Configuration',
      description: 'Customize which elements are shown in the pagination.',
      content: `
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Without First/Last Buttons</h4>
            <pst-pagination
              [currentPage]="currentPage4"
              [totalItems]="totalItems"
              [itemsPerPage]="10"
              [showFirstLast]="false"
              (pageChange)="onPageChange4($event)"
            />
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Without Info Text</h4>
            <pst-pagination
              [currentPage]="currentPage5"
              [totalItems]="totalItems"
              [itemsPerPage]="10"
              [showInfo]="false"
              (pageChange)="onPageChange5($event)"
            />
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Limited Page Numbers</h4>
            <pst-pagination
              [currentPage]="currentPage5"
              [totalItems]="totalItems"
              [itemsPerPage]="10"
              [maxPages]="5"
              (pageChange)="onPageChange5($event)"
            />
          </div>
        </div>
      `,
      code: `
// Without first/last buttons
<pst-pagination
  [showFirstLast]="false"
  ...
/>

// Without info text
<pst-pagination
  [showInfo]="false"
  ...
/>

// Limited page numbers
<pst-pagination
  [maxPages]="5"
  ...
/>`
    },
    {
      title: 'Edge Cases',
      description: 'How the component handles edge cases.',
      content: `
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No Items</h4>
            <pst-pagination
              [currentPage]="1"
              [totalItems]="0"
              [itemsPerPage]="10"
            />
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Single Page</h4>
            <pst-pagination
              [currentPage]="1"
              [totalItems]="5"
              [itemsPerPage]="10"
            />
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Few Pages</h4>
            <pst-pagination
              [currentPage]="1"
              [totalItems]="25"
              [itemsPerPage]="10"
            />
          </div>
        </div>
      `,
      code: `
// The component gracefully handles edge cases:
// - No items: Shows "0-0 von 0"
// - Single page: Navigation buttons are disabled
// - Few pages: All page numbers are shown`
    }
  ];

  props = [
    {
      name: 'currentPage',
      type: 'number',
      default: '1',
      description: 'The current active page'
    },
    {
      name: 'totalItems',
      type: 'number',
      default: '0',
      description: 'Total number of items across all pages'
    },
    {
      name: 'itemsPerPage',
      type: 'number',
      default: '10',
      description: 'Number of items to display per page'
    },
    {
      name: 'maxPages',
      type: 'number',
      default: '7',
      description: 'Maximum number of page buttons to display'
    },
    {
      name: 'showPageSize',
      type: 'boolean',
      default: 'true',
      description: 'Show the page size selector'
    },
    {
      name: 'showFirstLast',
      type: 'boolean',
      default: 'true',
      description: 'Show first/last page buttons'
    },
    {
      name: 'showInfo',
      type: 'boolean',
      default: 'true',
      description: 'Show the items info text'
    },
    {
      name: 'compact',
      type: 'boolean',
      default: 'false',
      description: 'Use compact mode for smaller screens'
    },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      default: '[10, 20, 50, 100]',
      description: 'Available page size options'
    },
    {
      name: 'pageChange',
      type: 'EventEmitter<number>',
      default: '-',
      description: 'Event emitted when page changes'
    },
    {
      name: 'pageSizeChange',
      type: 'EventEmitter<number>',
      default: '-',
      description: 'Event emitted when page size changes'
    }
  ];

  bestPractices = {
    do: [
      'Always show the total number of items and current range',
      'Disable navigation buttons when they cannot be used',
      'Provide keyboard navigation support',
      'Use compact mode for mobile devices',
      'Reset to page 1 when changing page size',
      'Show a reasonable number of page buttons (5-9)',
      'Use ellipsis (...) for large page ranges',
      'Maintain consistent positioning across pages',
      'Consider lazy loading for better performance'
    ],
    dont: [
      'Don\'t hide the pagination when there\'s only one page - show it disabled',
      'Don\'t use infinite scroll as the only navigation method',
      'Don\'t change page without user interaction',
      'Don\'t forget to handle edge cases (no items, single page)',
      'Don\'t make page buttons too small for touch targets',
      'Don\'t show all page numbers for large datasets',
      'Don\'t forget to update URL parameters for deep linking',
      'Don\'t load all data at once - implement server-side pagination'
    ]
  };

  onPageChange1(page: number) {
    this.currentPage1 = page;
  }

  onPageChange2(page: number) {
    this.currentPage2 = page;
  }

  onPageSizeChange2(pageSize: number) {
    this.itemsPerPage2 = pageSize;
    this.currentPage2 = 1;
  }

  onPageChange3(page: number) {
    this.currentPage3 = page;
  }

  onPageChange4(page: number) {
    this.currentPage4 = page;
  }

  onPageChange5(page: number) {
    this.currentPage5 = page;
  }
}
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { SearchModalComponent } from '../../../../../shared/components/search-modal/search-modal.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';

@Component({
  selector: 'pst-search-modal-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      title="Search Modal"
      description="A command palette-style search modal for quickly finding and navigating to components."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class SearchModalShowcaseComponent {
  showSearchModal = signal(false);
  showSearchModal2 = signal(false);

  sections = [
    {
      title: 'Basic Usage',
      description: 'Click the button or press Cmd/Ctrl + K to open the search modal.',
      content: `
        <div class="space-y-4">
          <pst-button (click)="openSearchModal()">
            <pst-icon name="search" size="sm" class="mr-2" />
            Open Search (⌘K)
          </pst-button>
          
          @if (showSearchModal()) {
            <pst-search-modal (close)="closeSearchModal()" />
          }
          
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              The search modal provides:
            </p>
            <ul class="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Fuzzy search across all components</li>
              <li>• Keyboard navigation (↑/↓ arrows)</li>
              <li>• Quick access with Cmd/Ctrl + K</li>
              <li>• Component status indicators</li>
              <li>• Popular components when no search</li>
            </ul>
          </div>
        </div>
      `,
      code: `
// Component
showSearchModal = signal(false);

openSearchModal() {
  this.showSearchModal.set(true);
}

closeSearchModal() {
  this.showSearchModal.set(false);
}

// Template
@if (showSearchModal()) {
  <pst-search-modal (close)="closeSearchModal()" />
}

// Global keyboard shortcut (in app component)
@HostListener('window:keydown', ['$event'])
handleKeyboardShortcut(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    this.openSearchModal();
  }
}`
    },
    {
      title: 'Search Features',
      description: 'The search modal supports various search features.',
      content: `
        <div class="space-y-4">
          <pst-button variant="secondary" (click)="openSearchModal2()">
            Try Search Features
          </pst-button>
          
          @if (showSearchModal2()) {
            <pst-search-modal (close)="closeSearchModal2()" />
          }
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Search by Name</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Type "button" to find button-related components
              </p>
            </div>
            
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Search by Category</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Type "atoms" or "molecules" to filter by category
              </p>
            </div>
            
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Search by Description</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Search terms match component descriptions too
              </p>
            </div>
            
            <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 class="text-sm font-medium mb-2">Status Indicators</h4>
              <div class="flex gap-2 mt-1">
                <span class="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                  stable
                </span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
                  beta
                </span>
                <span class="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                  deprecated
                </span>
              </div>
            </div>
          </div>
        </div>
      `,
      code: `
// The search modal automatically:
// - Filters components based on search query
// - Groups results by category
// - Shows component status
// - Highlights matching terms
// - Provides keyboard navigation`
    },
    {
      title: 'Integration Example',
      description: 'How to integrate the search modal into your application header.',
      content: `
        <div class="p-6 bg-gray-900 rounded-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <h3 class="text-white font-semibold">My App</h3>
              <nav class="flex gap-4">
                <a href="#" class="text-gray-300 hover:text-white">Home</a>
                <a href="#" class="text-gray-300 hover:text-white">Components</a>
                <a href="#" class="text-gray-300 hover:text-white">Docs</a>
              </nav>
            </div>
            
            <button
              (click)="openSearchModal()"
              class="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <pst-icon name="search" size="xs" />
              <span>Search</span>
              <kbd class="px-1.5 py-0.5 text-xs bg-gray-700 rounded">⌘K</kbd>
            </button>
          </div>
        </div>
      `,
      code: `
// In your header component
<button
  (click)="openSearchModal()"
  class="search-button"
>
  <pst-icon name="search" size="xs" />
  <span>Search</span>
  <kbd>⌘K</kbd>
</button>

// Style the search button to match your header
.search-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: #d1d5db;
  background-color: #1f2937;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #374151;
}`
    },
    {
      title: 'Keyboard Navigation',
      description: 'The search modal is fully keyboard accessible.',
      content: `
        <div class="space-y-4">
          <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium mb-3">Keyboard Shortcuts</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Open search</span>
                <div class="flex gap-1">
                  <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">⌘</kbd>
                  <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">K</kbd>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Navigate results</span>
                <div class="flex gap-1">
                  <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">↑</kbd>
                  <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">↓</kbd>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Select result</span>
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">↵</kbd>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Close modal</span>
                <kbd class="px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded">ESC</kbd>
              </div>
            </div>
          </div>
        </div>
      `,
      code: `
// The search modal handles all keyboard events internally
// No additional code needed for keyboard navigation`
    }
  ];

  props = [
    {
      name: 'close',
      type: 'EventEmitter<void>',
      default: '-',
      description: 'Event emitted when the modal should close'
    }
  ];

  bestPractices = {
    do: [
      'Provide a keyboard shortcut (Cmd/Ctrl + K) for quick access',
      'Show popular or recent items when search is empty',
      'Implement fuzzy search for better results',
      'Group results by logical categories',
      'Show status indicators for components',
      'Highlight matching search terms',
      'Provide clear keyboard navigation hints',
      'Auto-focus the search input when opened',
      'Close on backdrop click or ESC key',
      'Navigate to the selected result immediately'
    ],
    dont: [
      'Don\'t make the modal too small - ensure adequate space for results',
      'Don\'t forget to trap focus within the modal',
      'Don\'t navigate away without user confirmation',
      'Don\'t show too many results at once - implement pagination or limits',
      'Don\'t ignore accessibility - ensure screen reader support',
      'Don\'t make search case-sensitive by default',
      'Don\'t forget to debounce search input for performance',
      'Don\'t hide the search input placeholder when focused',
      'Don\'t use generic labels - be specific about what can be searched',
      'Don\'t forget to handle empty states gracefully'
    ]
  };

  openSearchModal() {
    this.showSearchModal.set(true);
  }

  closeSearchModal() {
    this.showSearchModal.set(false);
  }

  openSearchModal2() {
    this.showSearchModal2.set(true);
  }

  closeSearchModal2() {
    this.showSearchModal2.set(false);
  }
}
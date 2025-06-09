import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../../../shared/components/search/search.component';
import { SearchService } from '../../../../../shared/services/search.service';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PropsTableComponent, PropDefinition, EventDefinition } from '../../../shared/components/props-table.component';

@Component({
  selector: 'pst-search-showcase',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    CodeBlockComponent,
    PropsTableComponent
  ],
  providers: [SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Search Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Advanced search component with autocomplete, recent searches, and keyboard navigation.
        </p>
      </div>
      <!-- Basic Usage -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Basic Search</h3>
        <div class="max-w-md">
          <pst-search
            placeholder="Suchen..."
            (searchSubmit)="onSearchSubmit($event)">
          </pst-search>
          
          <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Try searching for:</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>"Solar" - for solar panel projects</li>
              <li>"Max" - for customer names</li>
              <li>"Angebot" - for offers</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Variants</h3>
        <div class="space-y-6">
          <!-- Custom Placeholder -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Placeholder</h4>
            <div class="max-w-md">
              <pst-search
                placeholder="Nach Kunden suchen..."
                (searchSubmit)="onSearchSubmit($event)">
              </pst-search>
            </div>
          </div>

          <!-- In Header Context -->
          <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Header Integration</h4>
            <div class="p-4 bg-gray-800 rounded-lg">
              <div class="max-w-md">
                <pst-search
                  placeholder="Search projects..."
                  (searchSubmit)="onSearchSubmit($event)">
                </pst-search>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="mb-12">
        <h3 class="text-lg font-semibold mb-4">Features</h3>
        
        <!-- Search Results Preview -->
        <div class="mb-6">
          <h4 class="font-medium mb-3">Search Result Types</h4>
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                <span class="text-blue-600 dark:text-blue-400">👤</span>
                <div class="flex-1">
                  <div class="font-medium">Max Mustermann</div>
                  <div class="text-sm text-gray-500">Customer</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                <span class="text-green-600 dark:text-green-400">📄</span>
                <div class="flex-1">
                  <div class="font-medium">Angebot #2024-001</div>
                  <div class="text-sm text-gray-500">Offer</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded">
                <span class="text-orange-600 dark:text-orange-400">📁</span>
                <div class="flex-1">
                  <div class="font-medium">Solar Installation Hamburg</div>
                  <div class="text-sm text-gray-500">Project</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Keyboard Navigation -->
        <div>
          <h4 class="font-medium mb-3">Keyboard Navigation</h4>
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">↑ ↓</span>
                <span>Navigate through results</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Enter</span>
                <span>Select highlighted result</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Esc</span>
                <span>Close dropdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Examples -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Code Examples
        </h2>
        <pst-code-block
          title="Basic Usage"
          language="html"
          [code]="basicExample"
        ></pst-code-block>

        <pst-code-block
          title="Search Result Interface"
          language="typescript"
          [code]="searchResultInterface"
        ></pst-code-block>

        <pst-code-block
          title="Custom Search Service"
          language="typescript"
          [code]="customServiceExample"
        ></pst-code-block>
      </section>

      <!-- Props -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          API Reference
        </h2>
        <pst-props-table
          [props]="propDefinitions"
          [events]="eventDefinitions"
        ></pst-props-table>
      </section>

      <!-- Best Practices -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Best Practices & Performance
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <h3>Best Practices</h3>
          <ul>
            <li>Place the search component prominently in the header for easy access</li>
            <li>Use descriptive placeholders to guide users</li>
            <li>Implement debouncing (built-in 300ms) to reduce API calls</li>
            <li>Show recent searches when the input is focused but empty</li>
            <li>Provide clear visual feedback for loading states</li>
            <li>Ensure search results are keyboard navigable</li>
            <li>Consider implementing search analytics to improve results</li>
            <li>Cache recent searches locally for better performance</li>
          </ul>

          <h3>Accessibility</h3>
          <ul>
            <li>Full keyboard navigation support</li>
            <li>ARIA attributes for search input and results</li>
            <li>Screen reader announcements for results</li>
            <li>Clear focus indicators</li>
            <li>Escape key closes dropdown</li>
          </ul>

          <h3>Performance</h3>
          <ul>
            <li>300ms debounce on input to reduce API calls</li>
            <li>Recent searches cached in localStorage</li>
            <li>Results limited to improve rendering performance</li>
            <li>Lazy loading of search suggestions</li>
          </ul>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SearchShowcaseComponent {
  propDefinitions: PropDefinition[] = [
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: '"Suchen..."',
      description: 'Placeholder text for the search input'
    }
  ];

  eventDefinitions: EventDefinition[] = [
    {
      name: 'searchSubmit',
      type: 'EventEmitter<string>',
      description: 'Emitted when a search is submitted (Enter key or button click)'
    }
  ];

  basicExample = `<pst-search
  placeholder="Suchen..."
  (searchSubmit)="onSearch($event)">
</pst-search>`;

  searchResultInterface = `export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'customer' | 'offer' | 'project' | 'document';
  icon: string;
  route: string;
}

// Example search handling
onSearch(query: string) {
  console.log('Search query:', query);
  this.router.navigate(['/search'], { 
    queryParams: { q: query } 
  });
}`;

  customServiceExample = `// Custom search service
@Injectable()
export class CustomSearchService extends SearchService {
  search(query: string): Observable<SearchResult[]> {
    // Your custom search implementation
    return this.http.get<SearchResult[]>(
      \`/api/search?q=\${query}\`
    );
  }
}

// Provide in component
@Component({
  providers: [
    { 
      provide: SearchService, 
      useClass: CustomSearchService 
    }
  ]
})`;

  onSearchSubmit(query: string) {
    console.log('Search submitted:', query);
  }
}
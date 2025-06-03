import { Component, Output, EventEmitter, HostListener, ElementRef, ViewChild, ChangeDetectionStrategy, signal, computed, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import { showcaseNavigation, ShowcaseComponent } from '../../../features/components-showcase/showcase-navigation';

interface SearchResult extends ShowcaseComponent {
  category: string;
}

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 overflow-hidden" (click)="onBackdropClick($event)">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal -->
      <div class="relative flex items-start justify-center pt-[10vh] px-4">
        <div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden" (click)="$event.stopPropagation()">
          <!-- Search Input -->
          <div class="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
            <app-icon name="search" class="text-gray-400" [size]="20"></app-icon>
            <input
              #searchInput
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              placeholder="Search components..."
              class="flex-1 px-4 py-4 text-base bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              autocomplete="off"
            >
            <kbd class="hidden sm:inline-flex px-2 py-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 rounded">
              ESC
            </kbd>
          </div>
          
          <!-- Results -->
          <div class="max-h-[60vh] overflow-y-auto">
            @if (searchQuery() && filteredResults().length === 0) {
              <div class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No components found for "{{ searchQuery() }}"
              </div>
            } @else if (searchQuery()) {
              <!-- Grouped Results -->
              @for (group of groupedResults(); track group.category) {
                <div class="px-2 py-2">
                  <h3 class="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {{ group.category }}
                  </h3>
                  <ul>
                    @for (result of group.results; track result.path; let i = $index) {
                      <li>
                        <button
                          type="button"
                          (click)="selectResult(result)"
                          (mouseenter)="highlightedIndex.set(getGlobalIndex(group.category, i))"
                          [class.bg-gray-100]="highlightedIndex() === getGlobalIndex(group.category, i)"
                          [class.dark:bg-gray-700]="highlightedIndex() === getGlobalIndex(group.category, i)"
                          class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded"
                        >
                          <div class="flex items-center gap-3">
                            <app-icon name="package" class="text-gray-400" [size]="16"></app-icon>
                            <div class="text-left">
                              <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {{ result.name }}
                              </div>
                              @if (result.description) {
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                  {{ result.description }}
                                </div>
                              }
                            </div>
                          </div>
                          <span
                            class="px-2 py-0.5 text-xs rounded-full"
                            [ngClass]="{
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': result.status === 'beta',
                              'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': result.status === 'stable',
                              'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300': result.status === 'deprecated'
                            }"
                          >
                            {{ result.status }}
                          </span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>
              }
            } @else {
              <!-- Recent/Popular when no search -->
              <div class="px-6 py-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Popular Components
                </h3>
                <ul class="space-y-1">
                  @for (component of popularComponents; track component.path) {
                    <li>
                      <button
                        type="button"
                        (click)="selectResult(component)"
                        class="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        {{ component.name }}
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
          
          <!-- Footer -->
          <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑</kbd>
                <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↓</kbd>
                Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd>
                Select
              </span>
            </div>
            <div class="flex items-center gap-1">
              <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘</kbd>
              <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">K</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SearchModalComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = signal('');
  highlightedIndex = signal(0);
  
  private allComponents: SearchResult[] = [];
  
  popularComponents: SearchResult[] = [
    { name: 'Button', path: '/components/atoms/button', status: 'stable', category: 'Atoms' },
    { name: 'Input', path: '/components/atoms/input', status: 'stable', category: 'Atoms' },
    { name: 'Select', path: '/components/atoms/select', status: 'stable', category: 'Atoms' },
    { name: 'Card', path: '/components/molecules/card', status: 'beta', category: 'Molecules' },
  ];

  filteredResults = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {return [];}
    
    return this.allComponents.filter(component => 
      component.name.toLowerCase().includes(query) ||
      component.description?.toLowerCase().includes(query) ||
      component.category.toLowerCase().includes(query)
    );
  });

  groupedResults = computed(() => {
    const results = this.filteredResults();
    const grouped = new Map<string, SearchResult[]>();
    
    results.forEach(result => {
      if (!grouped.has(result.category)) {
        grouped.set(result.category, []);
      }
      grouped.get(result.category)!.push(result);
    });
    
    return Array.from(grouped.entries()).map(([category, results]) => ({
      category,
      results
    }));
  });

  constructor(private router: Router) {
    // Build searchable components list
    showcaseNavigation.forEach(category => {
      category.components.forEach(component => {
        this.allComponents.push({
          ...component,
          category: category.name
        });
      });
    });

    // Reset highlighted index when results change
    effect(() => {
      this.filteredResults();
      this.highlightedIndex.set(0);
    });
  }

  ngAfterViewInit() {
    // Focus search input
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  selectResult(result: SearchResult) {
    this.router.navigate([result.path]);
    this.close.emit();
  }

  getGlobalIndex(category: string, localIndex: number): number {
    let globalIndex = 0;
    const groups = this.groupedResults();
    
    for (const group of groups) {
      if (group.category === category) {
        return globalIndex + localIndex;
      }
      globalIndex += group.results.length;
    }
    
    return globalIndex;
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    const results = this.filteredResults();
    const totalResults = results.length;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close.emit();
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        if (totalResults > 0) {
          this.highlightedIndex.update(index => (index + 1) % totalResults);
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (totalResults > 0) {
          this.highlightedIndex.update(index => (index - 1 + totalResults) % totalResults);
        }
        break;
        
      case 'Enter':
        event.preventDefault();
        if (totalResults > 0) {
          const selectedResult = results[this.highlightedIndex()];
          if (selectedResult) {
            this.selectResult(selectedResult);
          }
        }
        break;
    }
  }
}
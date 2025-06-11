import { Component, Output, EventEmitter, HostListener, ElementRef, ViewChild, ChangeDetectionStrategy, signal, computed, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../icons/icon.component';
import { showcaseNavigation, ShowcaseComponent } from '../../../features/components-showcase/showcase-navigation';
import { TokenUtils } from '../../../core/design-system/token-utilities';

interface SearchResult extends ShowcaseComponent {
  category: string;
}

@Component({
  selector: 'pst-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 overflow-hidden" (click)="onBackdropClick($event)">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal -->
      <div class="relative flex items-start justify-center pt-[10vh] px-4">
        <div [ngClass]="modalContainerClasses()" (click)="$event.stopPropagation()">
          <!-- Search Input -->
          <div [ngClass]="searchInputContainerClasses()">
            <pst-icon name="search" [class]="textNeutral400Class()" [size]="20"></pst-icon>
            <input
              #searchInput
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              placeholder="Search components..."
              [ngClass]="searchInputClasses()"
              autocomplete="off"
            >
            <kbd [ngClass]="escKeyClasses()">
              ESC
            </kbd>
          </div>
          
          <!-- Results -->
          <div class="max-h-[60vh] overflow-y-auto">
            @if (searchQuery() && filteredResults().length === 0) {
              <div [ngClass]="noResultsClasses()">
                No components found for "{{ searchQuery() }}"
              </div>
            } @else if (searchQuery()) {
              <!-- Grouped Results -->
              @for (group of groupedResults(); track group.category) {
                <div class="px-2 py-2">
                  <h3 [ngClass]="groupHeaderClasses()">
                    {{ group.category }}
                  </h3>
                  <ul>
                    @for (result of group.results; track result.path; let i = $index) {
                      <li>
                        <button
                          type="button"
                          (click)="selectResult(result)"
                          (mouseenter)="highlightedIndex.set(getGlobalIndex(group.category, i))"
                          [ngClass]="resultButtonClasses(highlightedIndex() === getGlobalIndex(group.category, i))"
                        >
                          <div class="flex items-center gap-3">
                            <pst-icon name="package" [class]="textNeutral400Class()" [size]="16"></pst-icon>
                            <div class="text-left">
                              <div [ngClass]="resultNameClasses()">
                                {{ result.name }}
                              </div>
                              @if (result.description) {
                                <div [ngClass]="resultDescriptionClasses()">
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
                <h3 [ngClass]="popularHeaderClasses()">
                  Popular Components
                </h3>
                <ul class="space-y-1">
                  @for (component of popularComponents; track component.path) {
                    <li>
                      <button
                        type="button"
                        (click)="selectResult(component)"
                        [ngClass]="popularButtonClasses()"
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
          <div [ngClass]="footerClasses()">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd [ngClass]="kbdClasses()">↑</kbd>
                <kbd [ngClass]="kbdClasses()">↓</kbd>
                Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd [ngClass]="kbdClasses()">↵</kbd>
                Select
              </span>
            </div>
            <div class="flex items-center gap-1">
              <kbd [ngClass]="kbdClasses()">⌘</kbd>
              <kbd [ngClass]="kbdClasses()">K</kbd>
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

  // Computed properties for TokenUtils classes
  bgWhiteClass = computed(() => TokenUtils.getColorClass('bg', 'white'));
  bgNeutral800Class = computed(() => TokenUtils.getColorClass('bg', 'neutral.800'));
  borderNeutral200Class = computed(() => TokenUtils.getColorClass('border', 'neutral.200'));
  borderNeutral700Class = computed(() => TokenUtils.getColorClass('border', 'neutral.700'));
  textNeutral400Class = computed(() => TokenUtils.getColorClass('text', 'neutral.400'));
  textNeutral900Class = computed(() => TokenUtils.getColorClass('text', 'neutral.900'));
  textNeutral100Class = computed(() => TokenUtils.getColorClass('text', 'neutral.100'));
  textNeutral500Class = computed(() => TokenUtils.getColorClass('text', 'neutral.500'));
  bgNeutral100Class = computed(() => TokenUtils.getColorClass('bg', 'neutral.100'));
  bgNeutral700Class = computed(() => TokenUtils.getColorClass('bg', 'neutral.700'));
  textNeutral700Class = computed(() => TokenUtils.getColorClass('text', 'neutral.700'));
  textNeutral300Class = computed(() => TokenUtils.getColorClass('text', 'neutral.300'));
  textSizeSmClass = computed(() => TokenUtils.getTextSizeClass('sm'));

  // Computed properties for combined classes
  modalContainerClasses = computed(() => [
    'w-full',
    'max-w-2xl',
    this.bgWhiteClass(),
    `dark:${this.bgNeutral800Class()}`,
    'rounded-lg',
    'shadow-2xl',
    'overflow-hidden'
  ]);

  searchInputContainerClasses = computed(() => [
    'flex',
    'items-center',
    'px-4',
    'border-b',
    this.borderNeutral200Class(),
    `dark:${this.borderNeutral700Class()}`
  ]);

  searchInputClasses = computed(() => [
    'flex-1',
    'px-4',
    'py-4',
    'text-base',
    'bg-transparent',
    'outline-none',
    this.textNeutral900Class(),
    `dark:${this.textNeutral100Class()}`,
    'placeholder-gray-500'
  ]);

  escKeyClasses = computed(() => [
    'hidden',
    'sm:inline-flex',
    'px-2',
    'py-1',
    'text-xs',
    this.textNeutral500Class(),
    this.bgNeutral100Class(),
    `dark:${this.bgNeutral700Class()}`,
    `dark:${this.textNeutral400Class()}`,
    'rounded'
  ]);

  noResultsClasses = computed(() => [
    'px-6',
    'py-8',
    'text-center',
    this.textNeutral500Class(),
    `dark:${this.textNeutral400Class()}`
  ]);

  groupHeaderClasses = computed(() => [
    'px-4',
    'py-2',
    'text-xs',
    'font-semibold',
    this.textNeutral500Class(),
    `dark:${this.textNeutral400Class()}`,
    'uppercase',
    'tracking-wider'
  ]);

  resultButtonClasses(isHighlighted: boolean) {
    return {
      'w-full': true,
      'px-4': true,
      'py-3': true,
      'flex': true,
      'items-center': true,
      'justify-between': true,
      'transition-colors': true,
      'rounded': true,
      [this.bgNeutral100Class()]: isHighlighted,
      [`dark:${this.bgNeutral700Class()}`]: isHighlighted,
      [`hover:${this.bgNeutral100Class()}`]: true,
      [`dark:hover:${this.bgNeutral700Class()}`]: true
    };
  }

  resultNameClasses = computed(() => [
    this.textSizeSmClass(),
    'font-medium',
    this.textNeutral900Class(),
    `dark:${this.textNeutral100Class()}`
  ]);

  resultDescriptionClasses = computed(() => [
    'text-xs',
    this.textNeutral500Class(),
    `dark:${this.textNeutral400Class()}`
  ]);

  popularHeaderClasses = computed(() => [
    'text-xs',
    'font-semibold',
    this.textNeutral500Class(),
    `dark:${this.textNeutral400Class()}`,
    'uppercase',
    'tracking-wider',
    'mb-2'
  ]);

  popularButtonClasses = computed(() => [
    'w-full',
    'px-3',
    'py-2',
    'text-left',
    this.textSizeSmClass(),
    this.textNeutral700Class(),
    `dark:${this.textNeutral300Class()}`,
    `hover:${this.bgNeutral100Class()}`,
    `dark:hover:${this.bgNeutral700Class()}`,
    'rounded',
    'transition-colors'
  ]);

  footerClasses = computed(() => [
    'px-4',
    'py-3',
    'border-t',
    this.borderNeutral200Class(),
    `dark:${this.borderNeutral700Class()}`,
    'flex',
    'items-center',
    'justify-between',
    'text-xs',
    this.textNeutral500Class(),
    `dark:${this.textNeutral400Class()}`
  ]);

  kbdClasses = computed(() => [
    'px-1.5',
    'py-0.5',
    this.bgNeutral100Class(),
    `dark:${this.bgNeutral700Class()}`,
    'rounded'
  ]);

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
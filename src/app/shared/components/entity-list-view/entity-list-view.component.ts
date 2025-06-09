import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit, 
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../../icons/icon.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';

export interface EntityListColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T) => string;
  align?: 'left' | 'center' | 'right';
}

export interface EntityListConfig<T> {
  columns: EntityListColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  enableViewToggle?: boolean;
  defaultView?: 'list' | 'grid';
  gridConfig?: {
    cols?: number;
    cardRenderer?: (item: T) => string;
  };
  performance?: {
    virtualScrolling?: boolean;
    infiniteScroll?: boolean;
    pageSize?: number;
    itemHeight?: number;
    searchDebounce?: number;
  };
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EntityListEvent<T> {
  type: 'select' | 'sort' | 'search' | 'filter' | 'page' | 'infinite-scroll';
  data?: unknown;
  items?: T[];
}

@Component({
  selector: 'pst-entity-list-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    IconComponent,
    SpinnerComponent,
    CheckboxComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="entity-list-view bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <!-- Header with Search and Filters -->
      @if (config.searchable || config.filterable) {
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Search -->
            @if (config.searchable) {
              <div class="flex-1">
                <pst-input
                  type="search"
                  [placeholder]="config.searchPlaceholder || 'Suchen...'"
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="onSearchChange($event)"
                  size="md"
                  class="w-full">
                  <pst-icon name="search" [size]="16" class="text-gray-400" />
                </pst-input>
              </div>
            }
            
            <!-- Filters -->
            @if (filters().length > 0) {
              <div class="flex gap-2">
                @for (filter of filters(); track filter.key) {
                  <pst-select
                    [(ngModel)]="filterValues[filter.key]"
                    (ngModelChange)="onFilterChange(filter.key, $event)"
                    [placeholder]="filter.placeholder"
                    size="md"
                    class="min-w-[150px]">
                    @for (option of filter.options; track option.value) {
                      <option [value]="option.value">{{ option.label }}</option>
                    }
                  </pst-select>
                }
              </div>
            }
            
            <!-- View Toggle -->
            @if (config.enableViewToggle) {
              <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-1">
                <button
                  type="button"
                  (click)="currentView.set('list')"
                  [class.bg-white]="currentView() === 'list'"
                  [class.dark:bg-gray-800]="currentView() === 'list'"
                  [class.text-gray-900]="currentView() === 'list'"
                  [class.dark:text-white]="currentView() === 'list'"
                  [class.text-gray-500]="currentView() !== 'list'"
                  [class.dark:text-gray-400]="currentView() !== 'list'"
                  class="px-3 py-1.5 rounded text-sm font-medium transition-colors">
                  <pst-icon name="list" [size]="16" class="inline-block mr-1" />
                  Liste
                </button>
                <button
                  type="button"
                  (click)="currentView.set('grid')"
                  [class.bg-white]="currentView() === 'grid'"
                  [class.dark:bg-gray-800]="currentView() === 'grid'"
                  [class.text-gray-900]="currentView() === 'grid'"
                  [class.dark:text-white]="currentView() === 'grid'"
                  [class.text-gray-500]="currentView() !== 'grid'"
                  [class.dark:text-gray-400]="currentView() !== 'grid'"
                  class="px-3 py-1.5 rounded text-sm font-medium transition-colors">
                  <pst-icon name="grid" [size]="16" class="inline-block mr-1" />
                  Karten
                </button>
              </div>
            }
          </div>
        </div>
      }
      
      <!-- List View -->
      @if (currentView() === 'list') {
        <!-- Table Header -->
        <div class="overflow-hidden">
          <div class="min-w-full">
          <div class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center px-4 py-3">
              <!-- Select All Checkbox -->
              @if (config.selectable && config.multiSelect) {
                <div class="w-10 mr-3">
                  <pst-checkbox
                    [checked]="isAllSelected()"
                    [indeterminate]="isSomeSelected()"
                    (checkedChange)="toggleSelectAll()"
                    size="sm" />
                </div>
              }
              
              <!-- Column Headers -->
              <div class="flex flex-1 items-center">
                @for (column of config.columns; track column.key) {
                  <div 
                    class="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    [class.text-left]="column.align === 'left' || !column.align"
                    [class.text-center]="column.align === 'center'"
                    [class.text-right]="column.align === 'right'"
                    [style.width]="column.width"
                    [class.flex-1]="!column.width"
                    (click)="column.sortable ? onSort(column.key) : null">
                    <div class="flex items-center gap-1" [class.justify-center]="column.align === 'center'" [class.justify-end]="column.align === 'right'">
                      {{ column.label }}
                      @if (column.sortable) {
                        <pst-icon 
                          [name]="getSortIcon(column.key)" 
                          [size]="12"
                          class="transition-transform"
                          [class.rotate-180]="sortOrder() === 'desc' && sortBy() === column.key" />
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          
          <!-- Virtual Scroll Container -->
          @if (config.performance?.virtualScrolling && !loading()) {
            <cdk-virtual-scroll-viewport 
              #scrollViewport
              [itemSize]="config.performance?.itemHeight || 60"
              class="entity-list-viewport"
              (scrolledIndexChange)="onScroll()">
              <div 
                *cdkVirtualFor="let item of displayedItems(); trackBy: trackByFn"
                class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-800 transition-colors">
                <!-- Select Checkbox -->
                @if (config.selectable) {
                  <div class="w-10 mr-3">
                    <pst-checkbox
                      [checked]="isSelected(item)"
                      (checkedChange)="toggleSelect(item)"
                      size="sm" />
                  </div>
                }
                
                <!-- Row Data -->
                <div class="flex flex-1 items-center">
                  @for (column of config.columns; track column.key) {
                    <div 
                      class="px-3"
                      [class.text-left]="column.align === 'left' || !column.align"
                      [class.text-center]="column.align === 'center'"
                      [class.text-right]="column.align === 'right'"
                      [style.width]="column.width"
                      [class.flex-1]="!column.width">
                      @if (column.render) {
                        <span [innerHTML]="column.render(item)"></span>
                      } @else {
                        <span class="text-sm text-gray-900 dark:text-gray-100">
                          {{ getColumnValue(item, column.key.toString()) }}
                        </span>
                      }
                    </div>
                  }
                </div>
              </div>
            </cdk-virtual-scroll-viewport>
          } @else {
            <!-- Regular Scrolling -->
            <div class="max-h-[600px] overflow-y-auto">
              @if (loading()) {
                <!-- Loading State -->
                <div class="flex flex-col items-center justify-center py-12">
                  <pst-spinner size="lg" />
                  <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {{ config.loadingMessage || 'Daten werden geladen...' }}
                  </p>
                </div>
              } @else if (displayedItems().length === 0) {
                <!-- Empty State -->
                <div class="flex flex-col items-center justify-center py-12">
                  <pst-icon name="inbox" [size]="48" class="text-gray-300 dark:text-gray-600 mb-4" />
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ config.emptyMessage || 'Keine Einträge gefunden' }}
                  </p>
                </div>
              } @else {
                <!-- Data Rows -->
                @for (item of displayedItems(); track trackByFn(0, item)) {
                  <div 
                    class="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-800 transition-colors">
                    <!-- Select Checkbox -->
                    @if (config.selectable) {
                      <div class="w-10 mr-3">
                        <pst-checkbox
                          [checked]="isSelected(item)"
                          (checkedChange)="toggleSelect(item)"
                          size="sm" />
                      </div>
                    }
                    
                    <!-- Row Data -->
                    <div class="flex flex-1 items-center">
                      @for (column of config.columns; track column.key) {
                        <div 
                          class="px-3"
                          [class.text-left]="column.align === 'left' || !column.align"
                          [class.text-center]="column.align === 'center'"
                          [class.text-right]="column.align === 'right'"
                          [style.width]="column.width"
                          [class.flex-1]="!column.width">
                          @if (column.render) {
                            <span [innerHTML]="column.render(item)"></span>
                          } @else {
                            <span class="text-sm text-gray-900 dark:text-gray-100">
                              {{ getColumnValue(item, column.key.toString()) }}
                            </span>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }
              }
            </div>
          }
        </div>
      </div>
      }
      
      <!-- Grid View -->
      @if (currentView() === 'grid') {
        <div class="p-4">
          @if (loading()) {
            <!-- Loading State -->
            <div class="flex flex-col items-center justify-center py-12">
              <pst-spinner size="lg" />
              <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {{ config.loadingMessage || 'Daten werden geladen...' }}
              </p>
            </div>
          } @else if (displayedItems().length === 0) {
            <!-- Empty State -->
            <div class="flex flex-col items-center justify-center py-12">
              <pst-icon name="inbox" [size]="48" class="text-gray-300 dark:text-gray-600 mb-4" />
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ config.emptyMessage || 'Keine Einträge gefunden' }}
              </p>
            </div>
          } @else {
            <!-- Grid Cards -->
            <div [class]="getGridClasses()">
              @for (item of displayedItems(); track trackByFn(0, item)) {
                <div 
                  class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  (click)="toggleSelect(item)">
                  <!-- Selection Checkbox -->
                  @if (config.selectable) {
                    <div class="absolute top-2 right-2">
                      <pst-checkbox
                        [checked]="isSelected(item)"
                        (checkedChange)="toggleSelect(item)"
                        size="sm" />
                    </div>
                  }
                  
                  <!-- Card Content -->
                  @if (config.gridConfig?.cardRenderer) {
                    <div [innerHTML]="config.gridConfig!.cardRenderer!(item)"></div>
                  } @else {
                    <!-- Default Card Layout -->
                    <div class="space-y-2">
                      @for (column of getMainColumns(); track column.key) {
                        <div>
                          <span class="text-xs text-gray-500 dark:text-gray-400">{{ column.label }}:</span>
                          <span class="block text-sm font-medium text-gray-900 dark:text-white">
                            {{ getColumnValue(item, column.key.toString()) }}
                          </span>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
      
      <!-- Footer with Pagination Info -->
      @if (pagination && !config.performance?.infiniteScroll) {
        <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Zeige {{ getStartIndex() + 1 }} bis {{ getEndIndex() }} von {{ pagination.totalItems }} Einträgen
            </div>
            <div class="flex gap-2">
              <pst-button
                variant="outline-primary"
                size="sm"
                [disabled]="!pagination.hasPreviousPage"
                (click)="onPageChange(pagination.page - 1)">
                <pst-icon name="chevron-left" [size]="16" />
                Zurück
              </pst-button>
              <pst-button
                variant="outline-primary"
                size="sm"
                [disabled]="!pagination.hasNextPage"
                (click)="onPageChange(pagination.page + 1)">
                Weiter
                <pst-icon name="chevron-right" [size]="16" />
              </pst-button>
            </div>
          </div>
        </div>
      }
      
      <!-- Selected Items Bar -->
      @if (config.selectable && selectedItems().length > 0) {
        <div class="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
          <div class="flex items-center justify-between">
            <span class="text-sm text-blue-700 dark:text-blue-300">
              {{ selectedItems().length }} {{ selectedItems().length === 1 ? 'Eintrag' : 'Einträge' }} ausgewählt
            </span>
            <pst-button
              variant="ghost"
              size="sm"
              (click)="clearSelection()">
              Auswahl aufheben
            </pst-button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .entity-list-viewport {
      height: 600px;
    }
    
    cdk-virtual-scroll-viewport {
      will-change: scroll-position;
    }
    
    cdk-virtual-scroll-viewport::-webkit-scrollbar {
      width: 8px;
    }
    
    cdk-virtual-scroll-viewport::-webkit-scrollbar-track {
      @apply bg-gray-100 dark:bg-gray-800;
    }
    
    cdk-virtual-scroll-viewport::-webkit-scrollbar-thumb {
      @apply bg-gray-400 dark:bg-gray-600 rounded;
    }
  `]
})
export class EntityListViewComponent<T extends { id: string }> implements OnInit, OnDestroy, OnChanges {
  @ViewChild('scrollViewport') scrollViewport?: CdkVirtualScrollViewport;
  
  @Input({ required: true }) config!: EntityListConfig<T>;
  @Input() items = signal<T[]>([]);
  @Input() loading = signal(false);
  @Input() pagination?: PaginationInfo;
  @Input() filters = signal<Array<{
    key: string;
    placeholder: string;
    options: Array<{ value: string; label: string }>;
  }>>([]);
  @Input() view?: 'list' | 'grid';
  
  @Output() listEvent = new EventEmitter<EntityListEvent<T>>();
  
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  
  // State signals
  protected selectedItems = signal<T[]>([]);
  protected sortBy = signal<string>('');
  protected sortOrder = signal<'asc' | 'desc'>('asc');
  protected searchTerm = '';
  protected filterValues: Record<string, string> = {};
  protected currentView = signal<'list' | 'grid'>('list');
  
  // Computed values
  protected displayedItems = computed(() => {
    let items = this.items();
    
    // Apply local search if not handled server-side
    if (this.searchTerm && !this.pagination) {
      items = items.filter(item => 
        JSON.stringify(item).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // Apply local sorting if not handled server-side
    if (this.sortBy() && !this.pagination) {
      items = [...items].sort((a, b) => {
        const aValue = String(this.getColumnValue(a, this.sortBy()));
        const bValue = String(this.getColumnValue(b, this.sortBy()));
        
        if (this.sortOrder() === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }
    
    return items;
  });
  
  ngOnInit(): void {
    // Set default view if configured or from input
    if (this.view) {
      this.currentView.set(this.view);
    } else if (this.config.defaultView) {
      this.currentView.set(this.config.defaultView);
    }
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(this.config.performance?.searchDebounce || 300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.listEvent.emit({
        type: 'search',
        data: { search: searchTerm }
      });
    });
    
    // Setup infinite scroll if enabled
    if (this.config.performance?.infiniteScroll && this.scrollViewport) {
      const scrollElement = this.scrollViewport.elementRef.nativeElement;
      fromEvent(scrollElement, 'scroll')
        .pipe(
          debounceTime(100),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const scrollTop = scrollElement.scrollTop;
          const scrollHeight = scrollElement.scrollHeight;
          const clientHeight = scrollElement.clientHeight;
          
          if (scrollTop + clientHeight >= scrollHeight - 100 && this.pagination?.hasNextPage) {
            this.listEvent.emit({
              type: 'infinite-scroll',
              data: { page: this.pagination.page + 1 }
            });
          }
        });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view'] && !changes['view'].firstChange) {
      this.currentView.set(this.view || 'list');
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Track by function for performance
  trackByFn = (index: number, item: T): string => {
    return item.id;
  };
  
  // Column value getter
  getColumnValue(item: T, key: string): unknown {
    const keys = key.split('.');
    let value: unknown = item;
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return value || '';
  }
  
  // Selection methods
  isSelected(item: T): boolean {
    return this.selectedItems().some(i => i.id === item.id);
  }
  
  toggleSelect(item: T): void {
    const selected = [...this.selectedItems()];
    const index = selected.findIndex(i => i.id === item.id);
    
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      if (!this.config.multiSelect) {
        selected.length = 0;
      }
      selected.push(item);
    }
    
    this.selectedItems.set(selected);
    this.listEvent.emit({
      type: 'select',
      items: selected
    });
  }
  
  isAllSelected(): boolean {
    const displayed = this.displayedItems();
    return displayed.length > 0 && displayed.every(item => this.isSelected(item));
  }
  
  isSomeSelected(): boolean {
    const displayed = this.displayedItems();
    return displayed.some(item => this.isSelected(item)) && !this.isAllSelected();
  }
  
  toggleSelectAll(): void {
    const displayed = this.displayedItems();
    const allSelected = this.isAllSelected();
    
    if (allSelected) {
      this.selectedItems.set([]);
    } else {
      this.selectedItems.set([...displayed]);
    }
    
    this.listEvent.emit({
      type: 'select',
      items: this.selectedItems()
    });
  }
  
  clearSelection(): void {
    this.selectedItems.set([]);
    this.listEvent.emit({
      type: 'select',
      items: []
    });
  }
  
  // Sort methods
  getSortIcon(column: keyof T | string): string {
    if (this.sortBy() === column) {
      return 'arrow-up';
    }
    return 'arrow-up-down';
  }
  
  onSort(column: keyof T | string): void {
    if (this.sortBy() === column) {
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(column as string);
      this.sortOrder.set('asc');
    }
    
    this.listEvent.emit({
      type: 'sort',
      data: {
        sortBy: this.sortBy(),
        sortOrder: this.sortOrder()
      }
    });
  }
  
  // Search methods
  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }
  
  // Filter methods
  onFilterChange(key: string, value: string): void {
    this.listEvent.emit({
      type: 'filter',
      data: {
        filters: {
          ...this.filterValues,
          [key]: value
        }
      }
    });
  }
  
  // Pagination methods
  onPageChange(page: number): void {
    this.listEvent.emit({
      type: 'page',
      data: { page }
    });
  }
  
  getStartIndex(): number {
    if (!this.pagination) return 0;
    return (this.pagination.page - 1) * this.pagination.pageSize;
  }
  
  getEndIndex(): number {
    if (!this.pagination) return this.displayedItems().length;
    return Math.min(
      this.pagination.page * this.pagination.pageSize,
      this.pagination.totalItems
    );
  }
  
  // Scroll handler for infinite scroll
  onScroll(): void {
    if (!this.config.performance?.infiniteScroll || !this.scrollViewport) return;
    
    const end = this.scrollViewport.getRenderedRange().end;
    const total = this.scrollViewport.getDataLength();
    
    if (end === total && this.pagination?.hasNextPage) {
      this.listEvent.emit({
        type: 'infinite-scroll',
        data: { page: this.pagination.page + 1 }
      });
    }
  }
  
  // Grid view helpers
  getGridClasses(): string {
    const cols = this.config.gridConfig?.cols || 3;
    return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-4`;
  }
  
  getMainColumns(): EntityListColumn<T>[] {
    // Return first 3-4 columns for card view
    return this.config.columns.slice(0, 4).filter(col => col.key !== 'actions');
  }
}
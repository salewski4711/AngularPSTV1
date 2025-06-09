import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy, OnChanges, SimpleChanges, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../icons/icon.component';
import { SelectComponent } from '../select/select.component';
import { SelectOption } from '../select/select.types';
import { PaginationConfig, PaginationInfo } from './pagination.types';
import { cn } from '../../utils/tailwind.utils';

@Component({
  selector: 'pst-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses()">
      <!-- Info Section (left side) -->
      @if (showInfo && !compact) {
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Zeige {{ paginationInfo().startItem }}-{{ paginationInfo().endItem }} von {{ totalItems }}
        </div>
      }
      
      <!-- Navigation Section (center/right) -->
      <div [class]="navigationClasses()">
        <!-- Page Size Selector -->
        @if (showPageSize && !compact) {
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Pro Seite:</span>
            <pst-select
              [options]="pageSizeSelectOptions()"
              [ngModel]="selectedPageSize()"
              (ngModelChange)="selectedPageSize.set($event)"
              size="sm"
              class="w-20"
            ></pst-select>
          </div>
        }
        
        <!-- Pagination Controls -->
        <nav class="flex items-center gap-1" aria-label="Pagination">
          <!-- First Page Button -->
          @if (showFirstLast && !compact) {
            <button
              type="button"
              [disabled]="!paginationInfo().hasPrevious"
              (click)="goToPage(1)"
              [class]="pageButtonClasses()"
              aria-label="Erste Seite"
            >
              <pst-icon name="chevron-left" [size]="16"></pst-icon>
              <pst-icon name="chevron-left" [size]="16" class="-ml-2"></pst-icon>
            </button>
          }
          
          <!-- Previous Page Button -->
          <button
            type="button"
            [disabled]="!paginationInfo().hasPrevious"
            (click)="goToPage(currentPage - 1)"
            [class]="pageButtonClasses()"
            aria-label="Vorherige Seite"
          >
            <pst-icon name="chevron-left" [size]="16"></pst-icon>
            @if (!compact) {
              <span class="ml-1">Zurück</span>
            }
          </button>
          
          <!-- Page Numbers -->
          @if (!compact) {
            <div class="flex items-center gap-1">
              @for (page of visiblePages(); track page.value) {
                @if (page.type === 'page') {
                  <button
                    type="button"
                    (click)="goToPage(page.value)"
                    [class]="pageNumberClasses(page.value === currentPage)"
                    [attr.aria-current]="page.value === currentPage ? 'page' : null"
                  >
                    {{ page.value }}
                  </button>
                } @else {
                  <span class="px-2 text-gray-400">...</span>
                }
              }
            </div>
          } @else {
            <!-- Compact Mode: Show current page of total -->
            <span class="px-3 text-sm text-gray-600 dark:text-gray-400">
              {{ currentPage }} / {{ paginationInfo().totalPages }}
            </span>
          }
          
          <!-- Next Page Button -->
          <button
            type="button"
            [disabled]="!paginationInfo().hasNext"
            (click)="goToPage(currentPage + 1)"
            [class]="pageButtonClasses()"
            aria-label="Nächste Seite"
          >
            @if (!compact) {
              <span class="mr-1">Weiter</span>
            }
            <pst-icon name="chevron-right" [size]="16"></pst-icon>
          </button>
          
          <!-- Last Page Button -->
          @if (showFirstLast && !compact) {
            <button
              type="button"
              [disabled]="!paginationInfo().hasNext"
              (click)="goToPage(paginationInfo().totalPages)"
              [class]="pageButtonClasses()"
              aria-label="Letzte Seite"
            >
              <pst-icon name="chevron-right" [size]="16" class="-mr-2"></pst-icon>
              <pst-icon name="chevron-right" [size]="16"></pst-icon>
            </button>
          }
        </nav>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() maxPages = 7;
  @Input() showPageSize = true;
  @Input() showFirstLast = true;
  @Input() showInfo = true;
  @Input() compact = false;
  @Input() pageSizeOptions = [10, 20, 50, 100];
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  
  // Internal property for ngModel binding
  selectedPageSize = signal(this.itemsPerPage.toString());
  
  constructor() {
    // Watch for selectedPageSize changes and emit pageSizeChange
    effect(() => {
      const value = this.selectedPageSize();
      const newPageSize = parseInt(value, 10);
      if (newPageSize !== this.itemsPerPage && !isNaN(newPageSize)) {
        this.pageSizeChange.emit(newPageSize);
      }
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage']) {
      this.selectedPageSize.set(this.itemsPerPage.toString());
    }
  }
  
  paginationInfo = computed<PaginationInfo>(() => {
    const totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
    const startItem = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    
    return {
      totalPages,
      startItem,
      endItem,
      hasNext: this.currentPage < totalPages,
      hasPrevious: this.currentPage > 1
    };
  });
  
  pageSizeSelectOptions = computed<SelectOption<string>[]>(() => {
    return this.pageSizeOptions.map(size => ({
      value: size.toString(),
      label: size.toString()
    }));
  });
  
  visiblePages = computed(() => {
    const { totalPages } = this.paginationInfo();
    const current = this.currentPage;
    const max = this.maxPages;
    
    // If total pages is less than max, show all
    if (totalPages <= max) {
      return Array.from({ length: totalPages }, (_, i) => ({
        type: 'page' as const,
        value: i + 1
      }));
    }
    
    const pages: Array<{ type: 'page' | 'ellipsis'; value: number }> = [];
    const halfMax = Math.floor(max / 2);
    
    // Always show first page
    pages.push({ type: 'page', value: 1 });
    
    // Calculate range around current page
    let rangeStart = Math.max(2, current - halfMax + 1);
    let rangeEnd = Math.min(totalPages - 1, current + halfMax - 1);
    
    // Adjust range if at the beginning or end
    if (current <= halfMax) {
      rangeEnd = Math.min(max - 2, totalPages - 1);
    } else if (current > totalPages - halfMax) {
      rangeStart = Math.max(2, totalPages - max + 2);
    }
    
    // Add ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push({ type: 'ellipsis', value: 0 });
    }
    
    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push({ type: 'page', value: i });
    }
    
    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push({ type: 'ellipsis', value: 0 });
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push({ type: 'page', value: totalPages });
    }
    
    return pages;
  });
  
  containerClasses = computed(() => {
    const base = 'flex items-center';
    const layout = this.compact 
      ? 'justify-center gap-2' 
      : 'justify-between gap-4 flex-wrap';
    
    return cn(base, layout);
  });
  
  navigationClasses = computed(() => {
    const base = 'flex items-center';
    const gap = this.compact ? 'gap-2' : 'gap-4';
    
    return cn(base, gap);
  });
  
  pageButtonClasses = computed(() => {
    return cn(
      'inline-flex items-center justify-center',
      'px-3 py-2 text-sm font-medium',
      'border rounded transition-colors duration-200',
      'hover:bg-gray-50 dark:hover:bg-gray-800',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      'border-gray-300 dark:border-gray-600',
      'text-gray-700 dark:text-gray-300'
    );
  });
  
  pageNumberClasses(isActive: boolean): string {
    const base = cn(
      'min-w-[40px] px-3 py-2',
      'text-sm font-medium rounded',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
    );
    
    if (isActive) {
      return cn(
        base,
        'bg-primary text-white',
        'hover:bg-primary-600',
        'border border-primary'
      );
    }
    
    return cn(
      base,
      'bg-white dark:bg-gray-900',
      'border border-gray-300 dark:border-gray-600',
      'text-gray-700 dark:text-gray-300',
      'hover:bg-gray-50 dark:hover:bg-gray-800'
    );
  }
  
  goToPage(page: number): void {
    const { totalPages } = this.paginationInfo();
    
    if (page < 1 || page > totalPages || page === this.currentPage) {
      return;
    }
    
    this.pageChange.emit(page);
  }
  
}
import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy, OnChanges, SimpleChanges, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../icons/icon.component';
import { SelectComponent } from '../select/select.component';
import { SelectOption } from '../select/select.types';
import { PaginationConfig, PaginationInfo } from './pagination.types';
import { paginationClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngClass]="getContainerClasses()">
      <!-- Info Section (left side) -->
      @if (showInfo && !compact) {
        <div [ngClass]="paginationClasses.info">
          Zeige {{ paginationInfo().startItem }}-{{ paginationInfo().endItem }} von {{ totalItems }}
        </div>
      }
      
      <!-- Navigation Section (center/right) -->
      <div [ngClass]="getNavigationClasses()">
        <!-- Page Size Selector -->
        @if (showPageSize && !compact) {
          <div class="flex items-center gap-2">
            <span [ngClass]="paginationClasses.info">Pro Seite:</span>
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
        <nav [ngClass]="paginationClasses.nav" aria-label="Pagination">
          <!-- First Page Button -->
          @if (showFirstLast && !compact) {
            <button
              type="button"
              [disabled]="!paginationInfo().hasPrevious"
              (click)="goToPage(1)"
              [ngClass]="getPageButtonClasses(!paginationInfo().hasPrevious)"
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
            [ngClass]="getPageButtonClasses(!paginationInfo().hasPrevious)"
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
                    [ngClass]="getPageNumberClasses(page.value === currentPage)"
                    [attr.aria-current]="page.value === currentPage ? 'page' : null"
                  >
                    {{ page.value }}
                  </button>
                } @else {
                  <span class="px-2 text-neutral-400">...</span>
                }
              }
            </div>
          } @else {
            <!-- Compact Mode: Show current page of total -->
            <span [ngClass]="getCompactInfoClasses()">
              {{ currentPage }} / {{ paginationInfo().totalPages }}
            </span>
          }
          
          <!-- Next Page Button -->
          <button
            type="button"
            [disabled]="!paginationInfo().hasNext"
            (click)="goToPage(currentPage + 1)"
            [ngClass]="getPageButtonClasses(!paginationInfo().hasNext)"
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
              [ngClass]="getPageButtonClasses(!paginationInfo().hasNext)"
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
  
  // Expose static classes for template
  paginationClasses = paginationClasses;
  
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
  
  getContainerClasses(): string {
    const base = this.paginationClasses.container;
    const compactClasses = this.compact 
      ? 'justify-center gap-2' 
      : 'gap-4 flex-wrap';
    
    return `${base} ${compactClasses}`;
  }
  
  getNavigationClasses(): string {
    const base = 'flex items-center';
    const gap = this.compact ? 'gap-2' : 'gap-4';
    
    return `${base} ${gap}`;
  }
  
  getPageButtonClasses(isDisabled: boolean): string {
    const base = `${this.paginationClasses.button.base} ${this.paginationClasses.button.default} rounded`;
    
    if (isDisabled) {
      return `${base} ${this.paginationClasses.button.disabled}`;
    }
    
    return base;
  }
  
  getPageNumberClasses(isActive: boolean): string {
    const base = `${this.paginationClasses.button.base} min-w-[40px] rounded`;
    
    if (isActive) {
      return `${base} ${this.paginationClasses.button.active}`;
    }
    
    return `${base} ${this.paginationClasses.button.default}`;
  }
  
  getCompactInfoClasses(): string {
    return `px-3 ${this.paginationClasses.info}`;
  }
  
  goToPage(page: number): void {
    const { totalPages } = this.paginationInfo();
    
    if (page < 1 || page > totalPages || page === this.currentPage) {
      return;
    }
    
    this.pageChange.emit(page);
  }
  
}
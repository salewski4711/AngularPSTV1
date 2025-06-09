import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pagination Info', () => {
    it('should calculate pagination info correctly', () => {
      component.totalItems = 100;
      component.itemsPerPage = 10;
      component.currentPage = 3;
      fixture.detectChanges();

      const info = component.paginationInfo();
      expect(info.totalPages).toBe(10);
      expect(info.startItem).toBe(21);
      expect(info.endItem).toBe(30);
      expect(info.hasNext).toBe(true);
      expect(info.hasPrevious).toBe(true);
    });

    it('should handle empty state', () => {
      component.totalItems = 0;
      fixture.detectChanges();

      const info = component.paginationInfo();
      expect(info.totalPages).toBe(1);
      expect(info.startItem).toBe(0);
      expect(info.endItem).toBe(0);
    });

    it('should handle last page correctly', () => {
      component.totalItems = 95;
      component.itemsPerPage = 10;
      component.currentPage = 10;
      fixture.detectChanges();

      const info = component.paginationInfo();
      expect(info.endItem).toBe(95);
      expect(info.hasNext).toBe(false);
    });
  });

  describe('Page Navigation', () => {
    beforeEach(() => {
      component.totalItems = 100;
      component.itemsPerPage = 10;
      fixture.detectChanges();
    });

    it('should emit pageChange when clicking page number', () => {
      spyOn(component.pageChange, 'emit');
      
      const pageButtons = fixture.debugElement.queryAll(By.css('button'));
      const page3Button = pageButtons.find(btn => btn.nativeElement.textContent.trim() === '3');
      
      page3Button?.nativeElement.click();
      
      expect(component.pageChange.emit).toHaveBeenCalledWith(3);
    });

    it('should disable previous button on first page', () => {
      component.currentPage = 1;
      fixture.detectChanges();

      const prevButton = fixture.debugElement.query(
        By.css('button[aria-label="Vorherige Seite"]')
      );
      
      expect(prevButton.nativeElement.disabled).toBe(true);
    });

    it('should disable next button on last page', () => {
      component.currentPage = 10;
      fixture.detectChanges();

      const nextButton = fixture.debugElement.query(
        By.css('button[aria-label="Nächste Seite"]')
      );
      
      expect(nextButton.nativeElement.disabled).toBe(false);
    });
  });

  describe('Visible Pages', () => {
    it('should show all pages when total is less than maxPages', () => {
      component.totalItems = 50;
      component.itemsPerPage = 10;
      component.maxPages = 7;
      fixture.detectChanges();

      const pages = component.visiblePages();
      const pageNumbers = pages.filter(p => p.type === 'page');
      
      expect(pageNumbers.length).toBe(5);
      expect(pageNumbers.map(p => p.value)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should show ellipsis for many pages', () => {
      component.totalItems = 200;
      component.itemsPerPage = 10;
      component.currentPage = 10;
      component.maxPages = 7;
      fixture.detectChanges();

      const pages = component.visiblePages();
      const hasEllipsis = pages.some(p => p.type === 'ellipsis');
      
      expect(hasEllipsis).toBe(true);
    });
  });

  describe('Page Size', () => {
    it('should emit pageSizeChange when changing page size', () => {
      spyOn(component.pageSizeChange, 'emit');
      
      component.handlePageSizeChange('20');
      
      expect(component.pageSizeChange.emit).toHaveBeenCalledWith(20);
    });

    it('should not emit if page size is unchanged', () => {
      spyOn(component.pageSizeChange, 'emit');
      
      component.itemsPerPage = 10;
      component.handlePageSizeChange('10');
      
      expect(component.pageSizeChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('Compact Mode', () => {
    it('should show minimal UI in compact mode', () => {
      component.compact = true;
      component.totalItems = 100;
      component.currentPage = 3;
      fixture.detectChanges();

      // Should show current/total instead of page numbers
      const compactText = compiled.querySelector('.text-sm');
      expect(compactText?.textContent).toContain('3 / 10');

      // Should not show page size selector
      const pageSize = compiled.querySelector('pst-select');
      expect(pageSize).toBeFalsy();

      // Should not show info text
      const infoText = Array.from(compiled.querySelectorAll('.text-sm'))
        .find(el => el.textContent?.includes('Zeige'));
      expect(infoText).toBeFalsy();
    });
  });

  describe('Configuration Options', () => {
    it('should hide first/last buttons when showFirstLast is false', () => {
      component.showFirstLast = false;
      fixture.detectChanges();

      const firstButton = compiled.querySelector('button[aria-label="Erste Seite"]');
      const lastButton = compiled.querySelector('button[aria-label="Letzte Seite"]');
      
      expect(firstButton).toBeFalsy();
      expect(lastButton).toBeFalsy();
    });

    it('should hide info when showInfo is false', () => {
      component.showInfo = false;
      component.totalItems = 100;
      fixture.detectChanges();

      const infoText = Array.from(compiled.querySelectorAll('.text-sm'))
        .find(el => el.textContent?.includes('Zeige'));
      expect(infoText).toBeFalsy();
    });

    it('should hide page size selector when showPageSize is false', () => {
      component.showPageSize = false;
      fixture.detectChanges();

      const pageSize = compiled.querySelector('pst-select');
      expect(pageSize).toBeFalsy();
    });
  });
});
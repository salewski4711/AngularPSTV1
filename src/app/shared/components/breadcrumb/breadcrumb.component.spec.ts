import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItem } from './breadcrumb.types';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const sampleItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' }
  ];

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate'], {
      events: {
        pipe: jasmine.createSpy('pipe').and.returnValue({
          subscribe: jasmine.createSpy('subscribe')
        })
      }
    });

    mockActivatedRoute = {
      root: {
        snapshot: {
          data: {},
          pathFromRoot: [],
          url: []
        },
        firstChild: null
      }
    };

    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breadcrumb items', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    
    // Should have 2 links (last item is not a link)
    expect(links.length).toBe(2);
    expect(links[0].textContent.trim()).toBe('Home');
    expect(links[1].textContent.trim()).toBe('Products');
    
    // Last item should be a span
    const lastItem = compiled.querySelector('span.font-medium');
    expect(lastItem.textContent.trim()).toBe('Electronics');
  });

  it('should display custom separator', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.componentRef.setInput('separator', '>');
    fixture.detectChanges();

    const separators = fixture.nativeElement.querySelectorAll('span[aria-hidden="true"]');
    separators.forEach((sep: HTMLElement) => {
      expect(sep.textContent.trim()).toBe('>');
    });
  });

  it('should show home icon when showHome is true', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.componentRef.setInput('showHome', true);
    fixture.detectChanges();

    const homeIcon = fixture.nativeElement.querySelector('pst-icon[name="home"]');
    expect(homeIcon).toBeTruthy();
  });

  it('should hide home icon when showHome is false', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.componentRef.setInput('showHome', false);
    fixture.detectChanges();

    const homeIcon = fixture.nativeElement.querySelector('pst-icon[name="home"]');
    expect(homeIcon).toBeFalsy();
  });

  it('should emit itemClick event when item is clicked', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy('itemClick');
    component.itemClick.subscribe(clickSpy);

    const firstLink = fixture.nativeElement.querySelector('a');
    firstLink.click();

    expect(clickSpy).toHaveBeenCalledWith(sampleItems[0]);
  });

  it('should truncate items when exceeding maxItems', () => {
    const manyItems: BreadcrumbItem[] = [
      { label: 'Item 1', url: '/1' },
      { label: 'Item 2', url: '/2' },
      { label: 'Item 3', url: '/3' },
      { label: 'Item 4', url: '/4' },
      { label: 'Item 5', url: '/5' },
      { label: 'Item 6', url: '/6' }
    ];

    fixture.componentRef.setInput('items', manyItems);
    fixture.componentRef.setInput('maxItems', 4);
    fixture.detectChanges();

    const displayedItems = component.displayItems();
    expect(displayedItems.length).toBe(4);
    expect(displayedItems[1].label).toBe('...');
  });

  it('should apply correct CSS classes for theme', () => {
    fixture.componentRef.setInput('items', sampleItems);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');
    links.forEach((link: HTMLElement) => {
      expect(link.classList.contains('text-gray-500')).toBeTruthy();
      expect(link.classList.contains('hover:text-gray-700')).toBeTruthy();
      expect(link.classList.contains('dark:text-gray-400')).toBeTruthy();
      expect(link.classList.contains('dark:hover:text-gray-200')).toBeTruthy();
    });
  });

  it('should display icons when provided', () => {
    const itemsWithIcons: BreadcrumbItem[] = [
      { label: 'Dashboard', url: '/dashboard', icon: 'home' },
      { label: 'Users', url: '/users', icon: 'users' }
    ];

    fixture.componentRef.setInput('items', itemsWithIcons);
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('pst-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should handle items without URLs', () => {
    const itemsWithoutUrls: BreadcrumbItem[] = [
      { label: 'Home', url: '/' },
      { label: 'Current Page' } // No URL
    ];

    fixture.componentRef.setInput('items', itemsWithoutUrls);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(1); // Only first item has URL
  });

  it('should apply truncation classes to long items', () => {
    const longItems: BreadcrumbItem[] = [
      { label: 'Very Long Category Name That Should Be Truncated', url: '/category' },
      { label: 'Another Long Name' }
    ];

    fixture.componentRef.setInput('items', longItems);
    fixture.detectChanges();

    const truncatedElements = fixture.nativeElement.querySelectorAll('.truncate');
    expect(truncatedElements.length).toBeGreaterThan(0);
  });
});
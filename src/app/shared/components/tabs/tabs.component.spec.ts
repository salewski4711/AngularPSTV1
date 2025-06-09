import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent } from './tabs.component';
import { Tab } from './tabs.types';
import { IconComponent } from '../../icons/icon.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const mockTabs: Tab[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true },
    { id: 'tab4', label: 'Tab 4', icon: 'home', badge: 5 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent, IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    component.tabs = mockTabs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    const tabButtons = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    expect(tabButtons.length).toBe(4);
    expect(tabButtons[0].nativeElement.textContent.trim()).toContain('Tab 1');
  });

  it('should set first enabled tab as active by default', () => {
    expect(component.activeTabId).toBe('tab1');
  });

  it('should set specified active tab', () => {
    component.activeTab = 'tab2';
    component.ngOnInit();
    expect(component.activeTabId).toBe('tab2');
  });

  it('should handle tab click', () => {
    const spy = jest.spyOn(component.tabChange, 'emit');
    const tabButtons = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    
    tabButtons[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId).toBe('tab2');
    expect(spy).toHaveBeenCalledWith({
      previousTab: 'tab1',
      currentTab: 'tab2',
      tab: mockTabs[1]
    });
  });

  it('should not allow clicking disabled tabs', () => {
    const spy = jest.spyOn(component.tabChange, 'emit');
    const tabButtons = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    
    tabButtons[2].nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId).toBe('tab1');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply correct variant classes', () => {
    // Line variant (default)
    const wrapperClasses = component.getWrapperClasses();
    expect(wrapperClasses).toContain('border-b border-gray-200 dark:border-gray-700');
    
    // Pills variant
    component.variant = 'pills';
    const pillsClasses = component.getWrapperClasses();
    expect(pillsClasses).toContain('bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex');
    
    // Bordered variant
    component.variant = 'bordered';
    const borderedClasses = component.getWrapperClasses();
    expect(borderedClasses).toContain('bg-gray-50 dark:bg-gray-800/50 px-6');
  });

  it('should render icons when provided', () => {
    const tabWithIcon = fixture.debugElement.queryAll(By.css('button[role="tab"]'))[3];
    const icon = tabWithIcon.query(By.css('pst-icon'));
    expect(icon).toBeTruthy();
  });

  it('should render badges when provided', () => {
    const tabWithBadge = fixture.debugElement.queryAll(By.css('button[role="tab"]'))[3];
    const badge = tabWithBadge.query(By.css('span[class*="ml-2"]'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent.trim()).toBe('5');
  });

  describe('Keyboard navigation', () => {
    it('should navigate with arrow keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event, 0);
      
      expect(component.activeTabId).toBe('tab2');
    });

    it('should skip disabled tabs during keyboard navigation', () => {
      component.activeTabId = 'tab2';
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event, 1);
      
      expect(component.activeTabId).toBe('tab4'); // Should skip tab3 (disabled)
    });

    it('should wrap around when navigating past last tab', () => {
      component.activeTabId = 'tab4';
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event, 3);
      
      expect(component.activeTabId).toBe('tab1');
    });

    it('should navigate to first tab with Home key', () => {
      component.activeTabId = 'tab4';
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      component.onKeyDown(event, 3);
      
      expect(component.activeTabId).toBe('tab1');
    });

    it('should navigate to last tab with End key', () => {
      component.activeTabId = 'tab1';
      const event = new KeyboardEvent('keydown', { key: 'End' });
      component.onKeyDown(event, 0);
      
      expect(component.activeTabId).toBe('tab4');
    });
  });

  describe('Scrollable tabs', () => {
    beforeEach(() => {
      component.scrollable = true;
      fixture.detectChanges();
    });

    it('should show scroll indicators when scrollable', () => {
      component.showScrollIndicators = true;
      fixture.detectChanges();
      
      const scrollIndicators = fixture.debugElement.queryAll(By.css('.scroll-indicator'));
      expect(scrollIndicators.length).toBe(2);
    });

    it('should call scrollLeft when left indicator clicked', () => {
      component.showScrollIndicators = true;
      component.canScrollLeft = true;
      fixture.detectChanges();
      
      const spy = jest.spyOn(component, 'scrollLeft');
      const leftIndicator = fixture.debugElement.query(By.css('.scroll-indicator-left'));
      leftIndicator.nativeElement.click();
      
      expect(spy).toHaveBeenCalled();
    });

    it('should call scrollRight when right indicator clicked', () => {
      component.showScrollIndicators = true;
      component.canScrollRight = true;
      fixture.detectChanges();
      
      const spy = jest.spyOn(component, 'scrollRight');
      const rightIndicator = fixture.debugElement.query(By.css('.scroll-indicator-right'));
      rightIndicator.nativeElement.click();
      
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist).toBeTruthy();
      expect(tablist.nativeElement.getAttribute('aria-label')).toBe('Tab navigation');
      
      const firstTab = fixture.debugElement.query(By.css('[role="tab"]'));
      expect(firstTab.nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(firstTab.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should update ARIA attributes on tab change', () => {
      component.selectTab(mockTabs[1]);
      fixture.detectChanges();
      
      const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('-1');
      expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].nativeElement.getAttribute('tabindex')).toBe('0');
    });
  });
});
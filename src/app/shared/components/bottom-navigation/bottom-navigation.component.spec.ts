import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BottomNavigationComponent } from './bottom-navigation.component';
import { NavigationItem } from './bottom-navigation.types';

describe('BottomNavigationComponent', () => {
  let component: BottomNavigationComponent;
  let fixture: ComponentFixture<BottomNavigationComponent>;
  let router: Router;

  const mockNavigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: {
        filled: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
        outline: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      }
    }
  ];

  beforeEach(async () => {
    const routerMock = {
      url: '/dashboard',
      events: of({ url: '/dashboard' }),
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [BottomNavigationComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation items', () => {
    component.items = mockNavigationItems;
    fixture.detectChanges();

    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(1);
  });

  it('should highlight active navigation item', () => {
    component.items = mockNavigationItems;
    fixture.detectChanges();

    const activeItems = component.activeItems();
    expect(activeItems[0].isActive).toBe(true);
  });

  it('should emit itemClick event when navigation item is clicked', () => {
    const clickSpy = jest.spyOn(component.itemClick, 'emit');
    component.items = mockNavigationItems;
    fixture.detectChanges();

    const navItem = fixture.nativeElement.querySelector('.nav-item');
    navItem.click();

    expect(clickSpy).toHaveBeenCalledWith(mockNavigationItems[0]);
  });

  it('should apply correct classes based on config', () => {
    component.config = {
      items: [],
      position: 'fixed',
      showLabels: true,
      enableBadges: true,
      mobileOnly: true
    };
    
    const classes = component.getNavigationClasses();
    expect(classes).toContain('fixed');
    expect(classes).toContain('bottom-0');
    expect(classes).toContain('md:hidden');
  });
});
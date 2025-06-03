import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserMenuComponent } from './user-menu.component';
import { ThemeService } from '../../../core/services/theme.service';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockThemeService = jasmine.createSpyObj('ThemeService', ['toggleTheme', 'isDarkMode']);
    mockThemeService.isDarkMode.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [UserMenuComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu open state', () => {
    expect(component.isOpen()).toBe(false);
    component.toggleMenu();
    expect(component.isOpen()).toBe(true);
    component.toggleMenu();
    expect(component.isOpen()).toBe(false);
  });

  it('should close menu', () => {
    component.isOpen.set(true);
    component.closeMenu();
    expect(component.isOpen()).toBe(false);
  });

  it('should toggle theme', () => {
    component.toggleTheme();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });

  it('should navigate to profile', () => {
    const profileItem = component.menuItems.find(item => item.id === 'profile');
    component.handleMenuItemClick(profileItem!);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should logout', () => {
    spyOn(console, 'log');
    component.logout();
    expect(console.log).toHaveBeenCalledWith('Logout');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
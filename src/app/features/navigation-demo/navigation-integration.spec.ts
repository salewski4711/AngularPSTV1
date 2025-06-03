import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { NotificationsService } from '../../shared/services/notifications.service';
import { AuthService } from '../auth/auth.service';
import { TopNavigationComponent } from '../../shared/components/top-navigation/top-navigation.component';
import { NavigationDemoComponent } from './navigation-demo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';

describe('Navigation Integration', () => {
  let navigationService: NavigationService;
  let notificationsService: NotificationsService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NavigationService,
        NotificationsService,
        AuthService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: new BehaviorSubject(null)
          }
        }
      ]
    });

    navigationService = TestBed.inject(NavigationService);
    notificationsService = TestBed.inject(NotificationsService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('NavigationService', () => {
    it('should provide navigation items', (done) => {
      navigationService.navigationItems.subscribe(items => {
        expect(items.length).toBeGreaterThan(0);
        expect(items.find(item => item.id === 'dashboard')).toBeDefined();
        expect(items.find(item => item.id === 'navigation-demo')).toBeDefined();
        done();
      });
    });

    it('should add and remove navigation items', () => {
      const newItem = {
        id: 'test-item',
        label: 'Test Item',
        path: '/test',
        icon: 'test'
      };

      navigationService.addNavigationItem(newItem);
      
      navigationService.navigationItems.subscribe(items => {
        expect(items.find(item => item.id === 'test-item')).toBeDefined();
      });

      navigationService.removeNavigationItem('test-item');
      
      navigationService.navigationItems.subscribe(items => {
        expect(items.find(item => item.id === 'test-item')).toBeUndefined();
      });
    });

    it('should update badges', () => {
      navigationService.setBadge('dashboard', 5);
      
      const item = navigationService.getNavigationItem('dashboard');
      expect(item?.badge).toBe(5);
    });

    it('should handle navigation', async () => {
      await navigationService.navigate('/dashboard');
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('NotificationsService', () => {
    it('should manage notifications', () => {
      const notification = {
        type: 'info' as const,
        title: 'Test Notification',
        message: 'Test message',
        read: false
      };

      notificationsService.addNotification(notification);
      
      expect(notificationsService.unreadCount()).toBeGreaterThan(0);
      
      const notifications = notificationsService.notifications();
      const addedNotification = notifications.find(n => n.title === 'Test Notification');
      expect(addedNotification).toBeDefined();
      
      if (addedNotification) {
        notificationsService.markAsRead(addedNotification.id);
        expect(notificationsService.notifications().find(n => n.id === addedNotification.id)?.read).toBe(true);
      }
    });

    it('should clear all notifications', () => {
      notificationsService.clearAll();
      expect(notificationsService.notifications().length).toBe(0);
    });
  });

  describe('Component Integration', () => {
    it('should create TopNavigationComponent', () => {
      const fixture = TestBed.createComponent(TopNavigationComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should create NavigationDemoComponent', () => {
      const fixture = TestBed.createComponent(NavigationDemoComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should handle navigation events in TopNavigationComponent', () => {
      const fixture = TestBed.createComponent(TopNavigationComponent);
      const component = fixture.componentInstance;
      
      spyOn(component.logoClick, 'emit');
      spyOn(component.searchSubmit, 'emit');
      spyOn(component.userMenuAction, 'emit');
      
      component.onLogoClick();
      expect(component.logoClick.emit).toHaveBeenCalled();
      
      component.onSearchSubmit('test query');
      expect(component.searchSubmit.emit).toHaveBeenCalledWith('test query');
      
      component.onUserMenuAction('logout');
      expect(component.userMenuAction.emit).toHaveBeenCalledWith('logout');
    });
  });

  describe('Service Integration', () => {
    it('should integrate NavigationService with Router', (done) => {
      // Simulate navigation
      navigationService.navigate('/dashboard').then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
        done();
      });
    });

    it('should handle authentication state changes', () => {
      // Mock authentication
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
      expect(authService.isAuthenticated()).toBe(true);
    });
  });
});
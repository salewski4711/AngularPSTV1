import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from '../../services/notifications.service';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let notificationsService: jasmine.SpyObj<NotificationsService>;

  const mockNotifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'Test Success',
      message: 'Success message',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'error' as const,
      title: 'Test Error',
      message: 'Error message',
      timestamp: new Date(),
      read: true
    }
  ];

  beforeEach(async () => {
    const notificationsServiceSpy = jasmine.createSpyObj('NotificationsService', [
      'markAsRead',
      'markAllAsRead',
      'dismissNotification',
      'clearAll'
    ], {
      notifications: signal(mockNotifications),
      unreadCount: signal(1)
    });

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent, NoopAnimationsModule],
      providers: [
        { provide: NotificationsService, useValue: notificationsServiceSpy }
      ]
    }).compileComponents();

    notificationsService = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display unread count', () => {
    expect(component.unreadCount()).toBe(1);
  });

  it('should toggle dropdown', () => {
    expect(component.isOpen()).toBe(false);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(true);
    component.toggleDropdown();
    expect(component.isOpen()).toBe(false);
  });

  it('should mark notification as read', () => {
    const notification = mockNotifications[0];
    component.markAsRead(notification);
    expect(notificationsService.markAsRead).toHaveBeenCalledWith(notification.id);
  });

  it('should not mark already read notification', () => {
    const notification = mockNotifications[1];
    component.markAsRead(notification);
    expect(notificationsService.markAsRead).not.toHaveBeenCalled();
  });

  it('should mark all as read', () => {
    component.markAllAsRead();
    expect(notificationsService.markAllAsRead).toHaveBeenCalled();
  });

  it('should dismiss notification', () => {
    const event = new Event('click');
    component.dismissNotification(event, '1');
    expect(notificationsService.dismissNotification).toHaveBeenCalledWith('1');
  });

  it('should clear all notifications', () => {
    component.isOpen.set(true);
    component.clearAll();
    expect(notificationsService.clearAll).toHaveBeenCalled();
    expect(component.isOpen()).toBe(false);
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen.set(true);
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: outsideElement });
    
    component.onDocumentClick(event);
    expect(component.isOpen()).toBe(false);
    
    document.body.removeChild(outsideElement);
  });

  it('should get correct notification icon', () => {
    expect(component.getNotificationIcon('info')).toBe('info');
    expect(component.getNotificationIcon('success')).toBe('check-circle');
    expect(component.getNotificationIcon('warning')).toBe('alert-circle');
    expect(component.getNotificationIcon('error')).toBe('x-circle');
  });

  it('should get correct notification styles', () => {
    expect(component.getNotificationStyles('info')).toContain('blue');
    expect(component.getNotificationStyles('success')).toContain('green');
    expect(component.getNotificationStyles('warning')).toContain('amber');
    expect(component.getNotificationStyles('error')).toContain('red');
  });

  it('should format relative time correctly', () => {
    const now = new Date();
    
    // Just now
    expect(component.getRelativeTime(new Date(now.getTime() - 30 * 1000))).toBe('Gerade eben');
    
    // Minutes
    expect(component.getRelativeTime(new Date(now.getTime() - 5 * 60 * 1000))).toBe('vor 5 Minuten');
    expect(component.getRelativeTime(new Date(now.getTime() - 1 * 60 * 1000))).toBe('vor 1 Minute');
    
    // Hours
    expect(component.getRelativeTime(new Date(now.getTime() - 2 * 60 * 60 * 1000))).toBe('vor 2 Stunden');
    expect(component.getRelativeTime(new Date(now.getTime() - 1 * 60 * 60 * 1000))).toBe('vor 1 Stunde');
    
    // Days
    expect(component.getRelativeTime(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000))).toBe('vor 3 Tagen');
    expect(component.getRelativeTime(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000))).toBe('vor 1 Tag');
  });
});
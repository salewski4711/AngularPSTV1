import { TestBed } from '@angular/core/testing';
import { NotificationsService, Notification } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with mock notifications', (done) => {
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should calculate unread count correctly', () => {
    const unreadCount = service.unreadCount();
    const notifications = service.notifications();
    const expectedCount = notifications.filter(n => !n.read).length;
    expect(unreadCount).toBe(expectedCount);
  });

  it('should add a new notification', (done) => {
    const initialCount = service.notifications().length;
    const newNotification = {
      type: 'info' as const,
      title: 'Test Notification',
      message: 'Test message',
      read: false
    };

    service.addNotification(newNotification);

    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(initialCount + 1);
      expect(notifications[0].title).toBe('Test Notification');
      expect(notifications[0].id).toBeDefined();
      expect(notifications[0].timestamp).toBeDefined();
      done();
    });
  });

  it('should mark notification as read', (done) => {
    const notifications = service.notifications();
    const unreadNotification = notifications.find(n => !n.read);
    
    if (unreadNotification) {
      service.markAsRead(unreadNotification.id);
      
      service.notifications$.subscribe(updatedNotifications => {
        const updatedNotification = updatedNotifications.find(n => n.id === unreadNotification.id);
        expect(updatedNotification?.read).toBe(true);
        done();
      });
    } else {
      done();
    }
  });

  it('should mark all notifications as read', (done) => {
    service.markAllAsRead();
    
    service.notifications$.subscribe(notifications => {
      const unreadCount = notifications.filter(n => !n.read).length;
      expect(unreadCount).toBe(0);
      done();
    });
  });

  it('should dismiss a notification', (done) => {
    const notifications = service.notifications();
    const notificationToRemove = notifications[0];
    const initialCount = notifications.length;

    service.dismissNotification(notificationToRemove.id);

    service.notifications$.subscribe(updatedNotifications => {
      expect(updatedNotifications.length).toBe(initialCount - 1);
      expect(updatedNotifications.find(n => n.id === notificationToRemove.id)).toBeUndefined();
      done();
    });
  });

  it('should clear all notifications', (done) => {
    service.clearAll();

    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(0);
      done();
    });
  });

  it('should generate unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      const notification = {
        type: 'info' as const,
        title: `Test ${i}`,
        read: false
      };
      service.addNotification(notification);
    }

    service.notifications$.subscribe(notifications => {
      notifications.forEach(n => ids.add(n.id));
      expect(ids.size).toBe(notifications.length);
    });
  });

  it('should handle notification actions', () => {
    let actionCalled = false;
    const action = () => { actionCalled = true; };

    const notification = {
      type: 'info' as const,
      title: 'Test with action',
      read: false,
      actions: [{ label: 'Test Action', action }]
    };

    service.addNotification(notification);
    
    const addedNotification = service.notifications()[0];
    if (addedNotification.actions && addedNotification.actions[0]) {
      addedNotification.actions[0].action();
      expect(actionCalled).toBe(true);
    }
  });
});
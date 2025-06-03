import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  
  // Signal-based state for better performance
  private notificationsSignal = signal<Notification[]>([]);
  public notifications = computed(() => this.notificationsSignal());
  public unreadCount = computed(() => 
    this.notificationsSignal().filter(n => !n.read).length
  );

  constructor() {
    // Initialize with some mock notifications
    this.initializeMockNotifications();
  }

  private initializeMockNotifications(): void {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Neuer Kunde hinzugefügt',
        message: 'Hans Müller wurde erfolgreich als Kunde angelegt.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Systemwartung geplant',
        message: 'Das System wird am 01.06.2024 um 23:00 Uhr für Wartungsarbeiten offline sein.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false
      },
      {
        id: '3',
        type: 'info',
        title: 'Neue Funktion verfügbar',
        message: 'Die Export-Funktion für Kundendaten ist jetzt verfügbar.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true
      },
      {
        id: '4',
        type: 'error',
        title: 'Fehler beim Datenimport',
        message: 'Der Import der CSV-Datei ist fehlgeschlagen. Bitte überprüfen Sie das Format.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        actions: [
          {
            label: 'Erneut versuchen',
            action: () => console.log('Retry import')
          }
        ]
      }
    ];

    this.updateNotifications(mockNotifications);
  }

  private updateNotifications(notifications: Notification[]): void {
    this.notificationsSignal.set(notifications);
    this.notificationsSubject.next(notifications);
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date()
    };

    const currentNotifications = [...this.notificationsSignal()];
    currentNotifications.unshift(newNotification);
    this.updateNotifications(currentNotifications);
  }

  markAsRead(notificationId: string): void {
    const notifications = this.notificationsSignal().map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.updateNotifications(notifications);
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSignal().map(n => ({ ...n, read: true }));
    this.updateNotifications(notifications);
  }

  dismissNotification(notificationId: string): void {
    const notifications = this.notificationsSignal().filter(n => n.id !== notificationId);
    this.updateNotifications(notifications);
  }

  clearAll(): void {
    this.updateNotifications([]);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
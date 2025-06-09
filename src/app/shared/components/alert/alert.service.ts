import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, signal } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertConfig, AlertPosition, AlertType } from './alert.types';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alerts = signal<ComponentRef<AlertComponent>[]>([]);
  private alertContainer?: HTMLElement;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  showSuccess(message: string, config?: Partial<AlertConfig>): void {
    this.show({ ...config, type: 'success', message });
  }

  showError(message: string, config?: Partial<AlertConfig>): void {
    this.show({ ...config, type: 'error', message });
  }

  showWarning(message: string, config?: Partial<AlertConfig>): void {
    this.show({ ...config, type: 'warning', message });
  }

  showInfo(message: string, config?: Partial<AlertConfig>): void {
    this.show({ ...config, type: 'info', message });
  }

  show(config: AlertConfig): void {
    const id = config.id || this.generateId();
    const position = config.position || 'top-right';
    const duration = config.duration !== undefined ? config.duration : 5000;
    const dismissible = config.dismissible !== undefined ? config.dismissible : true;

    // Create container if it doesn't exist
    if (!this.alertContainer) {
      this.createAlertContainer();
    }

    // Create component
    const componentRef = createComponent(AlertComponent, {
      environmentInjector: this.injector
    });

    // Set component inputs
    componentRef.instance.type = config.type;
    componentRef.instance.message = config.message;
    componentRef.instance.dismissible = dismissible;
    componentRef.instance.duration = duration;

    // Handle close event
    componentRef.instance.close.subscribe(() => {
      this.removeAlert(componentRef);
      config.onClose?.();
    });

    // Add to DOM
    this.addAlertToContainer(componentRef, position);

    // Track alert
    this.alerts.update(alerts => [...alerts, componentRef]);

    // Attach to Angular change detection
    this.appRef.attachView(componentRef.hostView);
  }

  clear(): void {
    const currentAlerts = this.alerts();
    currentAlerts.forEach(alert => this.removeAlert(alert));
    this.alerts.set([]);
  }

  private createAlertContainer(): void {
    this.alertContainer = document.createElement('div');
    this.alertContainer.className = 'fixed z-50 pointer-events-none';
    this.alertContainer.setAttribute('aria-live', 'polite');
    this.alertContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(this.alertContainer);
  }

  private addAlertToContainer(componentRef: ComponentRef<AlertComponent>, position: AlertPosition): void {
    const alertWrapper = document.createElement('div');
    alertWrapper.className = this.getPositionClasses(position);
    
    const alertElement = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    alertElement.classList.add('pointer-events-auto');
    
    alertWrapper.appendChild(alertElement);
    this.alertContainer!.appendChild(alertWrapper);
  }

  private getPositionClasses(position: AlertPosition): string {
    const positionMap: Record<AlertPosition, string> = {
      'top-right': 'fixed top-4 right-4 space-y-4',
      'top-left': 'fixed top-4 left-4 space-y-4',
      'bottom-right': 'fixed bottom-4 right-4 space-y-4',
      'bottom-left': 'fixed bottom-4 left-4 space-y-4'
    };
    return positionMap[position];
  }

  private removeAlert(componentRef: ComponentRef<AlertComponent>): void {
    const element = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    const wrapper = element.parentElement;
    
    if (wrapper && wrapper.parentElement === this.alertContainer) {
      wrapper.remove();
    }

    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();

    this.alerts.update(alerts => alerts.filter(a => a !== componentRef));
  }

  private generateId(): string {
    return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
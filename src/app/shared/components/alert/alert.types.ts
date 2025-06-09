export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type AlertPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface AlertConfig {
  id?: string;
  type: AlertType;
  message: string;
  dismissible?: boolean;
  duration?: number;
  position?: AlertPosition;
  onClose?: () => void;
}

export interface AlertIcons {
  success: string;
  error: string;
  warning: string;
  info: string;
}
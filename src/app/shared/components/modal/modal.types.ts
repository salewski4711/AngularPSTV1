export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalConfig {
  isOpen: boolean;
  size?: ModalSize;
  title?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

export interface ModalEvents {
  close: () => void;
}
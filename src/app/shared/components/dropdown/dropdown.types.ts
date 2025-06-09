export type DropdownPosition = 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'top-start' 
  | 'top-end' 
  | 'left' 
  | 'right';

export interface DropdownItem {
  id?: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
}
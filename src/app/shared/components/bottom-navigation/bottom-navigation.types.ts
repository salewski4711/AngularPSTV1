export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon: {
    filled: string;
    outline: string;
  };
  badge?: {
    count: number;
    type: 'notification' | 'warning' | 'info';
  };
  isActive?: boolean;
}

export interface NavigationConfig {
  items: NavigationItem[];
  position: 'fixed' | 'sticky' | 'relative';
  showLabels: boolean;
  enableBadges: boolean;
  mobileOnly: boolean;
}
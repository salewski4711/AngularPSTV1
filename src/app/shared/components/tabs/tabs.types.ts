export type TabVariant = 'line' | 'pills' | 'bordered';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
  content?: any; // For lazy loading content
}

export interface TabsConfig {
  variant?: TabVariant;
  scrollable?: boolean;
  activeTab?: string;
}

export interface TabChangeEvent {
  previousTab: string | null;
  currentTab: string;
  tab: Tab;
}
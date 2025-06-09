export interface AccordionPanel {
  id: string;
  header: string;
  content?: string;
  disabled?: boolean;
  expanded?: boolean;
  customContent?: any; // For template reference
}

export interface AccordionConfig {
  multiple?: boolean;
  animated?: boolean;
  iconPosition?: 'left' | 'right';
}

export interface PanelToggleEvent {
  panelId: string;
  expanded: boolean;
  panel: AccordionPanel;
}
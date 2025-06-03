// SVG Icon Definitionen für ProSolarTec CRM
// Basierend auf den Icons der ProSolarTec Website

export interface IconDefinition {
  name: string;
  viewBox: string;
  path: string;
}

export const ICONS = {
  // Navigation & UI
  'plus': {
    name: 'plus',
    viewBox: '0 0 24 24',
    path: 'M12 5v14m-7-7h14'
  },
  'filter': {
    name: 'filter',
    viewBox: '0 0 24 24',
    path: 'M3 4h18v2.172a2 2 0 0 1-.586 1.414l-6.828 6.828A2 2 0 0 0 13 15.828V20l-4 2v-6.172a2 2 0 0 0-.586-1.414L1.586 7.586A2 2 0 0 1 1 6.172V4z'
  },
  'list': {
    name: 'list',
    viewBox: '0 0 24 24',
    path: 'M4 6h16M4 12h16M4 18h16'
  },
  'grid': {
    name: 'grid',
    viewBox: '0 0 24 24',
    path: 'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z'
  },
  'arrow-left': {
    name: 'arrow-left',
    viewBox: '0 0 24 24',
    path: 'M19 12H5m0 0l7 7m-7-7l7-7'
  },
  'arrow-right': {
    name: 'arrow-right',
    viewBox: '0 0 24 24',
    path: 'M5 12h14m0 0l-7-7m7 7l-7 7'
  },
  'arrow-down': {
    name: 'arrow-down',
    viewBox: '0 0 24 24',
    path: 'M19 9l-7 7-7-7'
  },
  
  // Actions
  'save': {
    name: 'save',
    viewBox: '0 0 24 24',
    path: 'M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9h-5V3H7zm8 0v5h4l-4-4z'
  },
  'edit': {
    name: 'edit',
    viewBox: '0 0 24 24',
    path: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  'trash': {
    name: 'trash',
    viewBox: '0 0 24 24',
    path: 'M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16'
  },
  'download': {
    name: 'download',
    viewBox: '0 0 24 24',
    path: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5m0 0l5-5m-5 5V3'
  },
  'copy': {
    name: 'copy',
    viewBox: '0 0 24 24',
    path: 'M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z'
  },
  
  // Communication
  'mail': {
    name: 'mail',
    viewBox: '0 0 24 24',
    path: 'M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z'
  },
  'phone': {
    name: 'phone',
    viewBox: '0 0 24 24',
    path: 'M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  'bell': {
    name: 'bell',
    viewBox: '0 0 24 24',
    path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9'
  },
  
  // Status & Info
  'check': {
    name: 'check',
    viewBox: '0 0 24 24',
    path: 'M5 13l4 4L19 7'
  },
  'x': {
    name: 'x',
    viewBox: '0 0 24 24',
    path: 'M6 18L18 6M6 6l12 12'
  },
  'info': {
    name: 'info',
    viewBox: '0 0 24 24',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
  },
  'warning': {
    name: 'warning',
    viewBox: '0 0 24 24',
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  
  // User & Profile
  'user': {
    name: 'user',
    viewBox: '0 0 24 24',
    path: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z'
  },
  'users': {
    name: 'users',
    viewBox: '0 0 24 24',
    path: 'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.48-.629-2.072M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.768.231-1.48.629-2.072m0 0A5.998 5.998 0 0 1 12 14c1.729 0 3.295.73 4.371 1.928M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
  },
  'logout': {
    name: 'logout',
    viewBox: '0 0 24 24',
    path: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
  },
  
  // Navigation
  'home': {
    name: 'home',
    viewBox: '0 0 24 24',
    path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  'menu': {
    name: 'menu',
    viewBox: '0 0 24 24',
    path: 'M4 6h16M4 12h16m-7 6h7'
  },
  'dots-vertical': {
    name: 'dots-vertical',
    viewBox: '0 0 24 24',
    path: 'M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'
  },
  
  // Calendar & Time
  'calendar': {
    name: 'calendar',
    viewBox: '0 0 24 24',
    path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z'
  },
  'clock': {
    name: 'clock',
    viewBox: '0 0 24 24',
    path: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
  },
  'circle': {
    name: 'circle',
    viewBox: '0 0 24 24',
    path: 'M12 12m-9 0a9,9 0 1,0 18,0a9,9 0 1,0 -18,0'
  },
  'alert-triangle': {
    name: 'alert-triangle',
    viewBox: '0 0 24 24',
    path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  },
  
  // Theme
  'sun': {
    name: 'sun',
    viewBox: '0 0 24 24',
    path: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'
  },
  'moon': {
    name: 'moon',
    viewBox: '0 0 24 24',
    path: 'M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z'
  },
  'close': {
    name: 'close',
    viewBox: '0 0 24 24',
    path: 'M6 18L18 6M6 6l12 12'
  },
  'search': {
    name: 'search',
    viewBox: '0 0 24 24',
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  },
  'settings': {
    name: 'settings',
    viewBox: '0 0 24 24',
    path: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  },
  'delete': {
    name: 'delete',
    viewBox: '0 0 24 24',
    path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  },
  'upload': {
    name: 'upload',
    viewBox: '0 0 24 24',
    path: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
  },
  'package': {
    name: 'package',
    viewBox: '0 0 24 24',
    path: 'M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12'
  },
  'external-link': {
    name: 'external-link',
    viewBox: '0 0 24 24',
    path: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
  },
  'chevron-up': {
    name: 'chevron-up',
    viewBox: '0 0 24 24',
    path: 'M5 15l7-7 7 7'
  },
  'chevron-down': {
    name: 'chevron-down',
    viewBox: '0 0 24 24',
    path: 'M19 9l-7 7-7-7'
  },
  'heart': {
    name: 'heart',
    viewBox: '0 0 24 24',
    path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
  },
  'star': {
    name: 'star',
    viewBox: '0 0 24 24',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  'arrow-up': {
    name: 'arrow-up',
    viewBox: '0 0 24 24',
    path: 'M12 19V5m0 0l-7 7m7-7l7 7'
  },
  'chevron-left': {
    name: 'chevron-left',
    viewBox: '0 0 24 24',
    path: 'M15 19l-7-7 7-7'
  },
  'chevron-right': {
    name: 'chevron-right',
    viewBox: '0 0 24 24',
    path: 'M9 5l7 7-7 7'
  },
  'minus': {
    name: 'minus',
    viewBox: '0 0 24 24',
    path: 'M5 12h14'
  },
  'map-pin': {
    name: 'map-pin',
    viewBox: '0 0 24 24',
    path: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
  },
  'dollar-sign': {
    name: 'dollar-sign',
    viewBox: '0 0 24 24',
    path: 'M12 2v20m5-15H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'
  },
  'folder': {
    name: 'folder',
    viewBox: '0 0 24 24',
    path: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'
  },
  'lock': {
    name: 'lock',
    viewBox: '0 0 24 24',
    path: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4'
  },
  'unlock': {
    name: 'unlock',
    viewBox: '0 0 24 24',
    path: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 9.9-1.1'
  },
  'alert-circle': {
    name: 'alert-circle',
    viewBox: '0 0 24 24',
    path: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4m0 4h.01'
  },
  'check-circle': {
    name: 'check-circle',
    viewBox: '0 0 24 24',
    path: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3'
  },
  'x-circle': {
    name: 'x-circle',
    viewBox: '0 0 24 24',
    path: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M15 9l-6 6m0-6l6 6'
  },
  'pause': {
    name: 'pause',
    viewBox: '0 0 24 24',
    path: 'M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z'
  },
  'align-left': {
    name: 'align-left',
    viewBox: '0 0 24 24',
    path: 'M17 10H3m18-4H3m18 8H3m14 4H3'
  },
  'align-center': {
    name: 'align-center',
    viewBox: '0 0 24 24',
    path: 'M18 10H6m15-4H3m18 8H3m15 4H6'
  },
  'align-right': {
    name: 'align-right',
    viewBox: '0 0 24 24',
    path: 'M21 10H7m14-4H3m18 8H3m18 4H7'
  },
  'align-justify': {
    name: 'align-justify',
    viewBox: '0 0 24 24',
    path: 'M21 10H3m18-4H3m18 8H3m18 4H3'
  },
  'loader-2': {
    name: 'loader-2',
    viewBox: '0 0 24 24',
    path: 'M21 12a9 9 0 11-6.219-8.56'
  },
  'bold': {
    name: 'bold',
    viewBox: '0 0 24 24',
    path: 'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'
  },
  'italic': {
    name: 'italic',
    viewBox: '0 0 24 24',
    path: 'M19 4h-9m4 16H5 M15 4L9 20'
  },
  'underline': {
    name: 'underline',
    viewBox: '0 0 24 24',
    path: 'M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3 M4 21h16'
  },
  'strikethrough': {
    name: 'strikethrough',
    viewBox: '0 0 24 24',
    path: 'M16 4H9a3 3 0 0 0-2.83 4M14 12h8m-4-8l-8 16m3-4H4'
  },
  'list-ordered': {
    name: 'list-ordered',
    viewBox: '0 0 24 24',
    path: 'M10 6h11m-11 6h11m-11 6h11M4 6h1v4m-1 0h2m0 0a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4m3 0H4m3 4H4v-2'
  }
} as const;

// Create type from keys
export type IconName = keyof typeof ICONS;

// Type guard
export function isValidIconName(name: string): name is IconName {
  return name in ICONS;
}

// Get all available icons (useful for documentation)
export const AVAILABLE_ICONS = Object.keys(ICONS) as IconName[];
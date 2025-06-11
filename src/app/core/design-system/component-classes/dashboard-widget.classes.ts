/**
 * Static class definitions for dashboard widget components.
 * These are hardcoded at build time to avoid runtime template interpolation.
 * 
 * IMPORTANT: This file contains static Tailwind classes that must not use
 * any dynamic token utilities or runtime generation.
 */

// ========================================================================
// DASHBOARD WIDGET CLASSES
// ========================================================================
export const dashboardWidgetClasses = {
  // Base classes for widget container
  base: {
    common: 'relative h-full transition-all duration-200 group',
    
    // Type-specific base styles
    types: {
      category: 'p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700',
      'section-widget': 'bg-gray-50 dark:bg-[#1f2937] rounded-lg border overflow-visible',
      'section-widget-highlighted': 'border-2 border-primary bg-white dark:bg-[#1f2937]',
      'section-widget-normal': 'border-gray-200 dark:border-gray-700',
      stat: 'p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800',
      action: 'p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800',
      navigation: 'p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800'
    },
    
    // Size classes
    sizes: {
      small: 'min-h-[100px]',
      medium: 'min-h-[120px]',
      large: 'min-h-[160px]',
      full: 'min-h-[200px]'
    },
    
    // Hover effects for clickable widgets
    hover: {
      category: 'hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-800 hover:scale-[1.02] active:scale-[1.01]',
      'section-widget': 'hover:border-primary hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer',
      action: 'hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/20',
      navigation: 'hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-700',
      stat: 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 cursor-pointer'
    },
    
    // Back button specific
    backButton: 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent shadow-none'
  },
  
  // Icon container classes
  iconContainer: {
    base: {
      category: 'w-14 h-14 rounded-xl flex items-center justify-center shadow-lg',
      stat: 'w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center',
      action: 'w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 flex items-center justify-center transition-colors',
      navigation: 'p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors',
      backButton: 'p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800'
    },
    
    // Color gradients for category type
    gradients: {
      primary: 'bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700',
      secondary: 'bg-gradient-to-br from-secondary-400 to-secondary-600 dark:from-secondary-500 dark:to-secondary-700',
      success: 'bg-gradient-to-br from-success-400 to-success-600 dark:from-success-500 dark:to-success-700',
      warning: 'bg-gradient-to-br from-warning-400 to-warning-600 dark:from-warning-500 dark:to-warning-700',
      danger: 'bg-gradient-to-br from-error-400 to-error-600 dark:from-error-500 dark:to-error-700',
      info: 'bg-gradient-to-br from-info-400 to-info-600 dark:from-info-500 dark:to-info-700'
    }
  },
  
  // Icon classes
  icon: {
    colors: {
      white: 'text-white',
      primary: 'text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300',
      secondary: 'text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300',
      success: 'text-success-600 dark:text-success-400',
      warning: 'text-warning-600 dark:text-warning-400',
      danger: 'text-error-600 dark:text-error-400',
      info: 'text-info-600 dark:text-info-400',
      neutral: 'text-neutral-700 dark:text-neutral-300',
      gray: 'text-gray-700 dark:text-gray-300'
    },
    
    sectionWidget: {
      default: 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white',
      highlighted: 'text-primary dark:text-primary'
    }
  },
  
  // Text classes
  text: {
    // Category widget text
    category: {
      title: 'text-2xl font-bold text-gray-900 dark:text-white mb-1',
      description: 'text-base text-gray-600 dark:text-gray-400',
      arrow: 'text-gray-400 dark:text-gray-600 transition-transform group-hover:translate-x-1'
    },
    
    // Section widget text
    sectionWidget: {
      title: 'text-base font-bold text-gray-900 dark:text-white text-center'
    },
    
    // Stat widget text
    stat: {
      title: 'text-sm font-medium text-gray-700 dark:text-gray-300',
      value: 'text-2xl font-bold text-gray-900 dark:text-white',
      unit: 'text-lg text-gray-600 dark:text-gray-400 ml-1'
    },
    
    // Action widget text
    action: {
      title: 'text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
      description: 'text-sm text-gray-600 dark:text-gray-400 mt-0.5',
      arrow: 'text-gray-400 dark:text-gray-600 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all group-hover:translate-x-1'
    },
    
    // Navigation widget text
    navigation: {
      title: 'text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors'
    },
    
    // Back button text
    backButton: {
      text: 'text-base font-medium text-neutral-700 dark:text-neutral-300'
    }
  },
  
  // Trend indicator classes
  trend: {
    container: 'flex items-center gap-1 text-sm',
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400'
  },
  
  // Layout classes
  layout: {
    category: {
      container: 'flex items-center gap-6 h-full',
      iconSection: 'flex-shrink-0',
      contentSection: 'flex-1',
      arrowSection: 'flex-shrink-0'
    },
    
    sectionWidget: {
      container: 'flex flex-col items-center justify-center h-full py-8 px-6',
      iconWrapper: 'relative mb-4'
    },
    
    stat: {
      container: 'flex flex-col h-full',
      header: 'flex items-center gap-3 mb-3',
      footer: 'flex items-end justify-between mt-auto'
    },
    
    action: {
      container: 'group flex items-center justify-between h-full',
      left: 'flex items-center gap-4',
      content: 'flex flex-col'
    },
    
    navigation: {
      container: 'group flex items-center justify-between h-full',
      left: 'flex items-center gap-3'
    },
    
    backButton: {
      container: 'flex items-center gap-3 py-2'
    }
  },
  
  // Badge classes
  badge: {
    position: 'absolute -top-2 -right-2 z-10',
    style: 'bg-error-500 text-white'
  }
} as const;

// Export type for type safety
export type DashboardWidgetClasses = typeof dashboardWidgetClasses;
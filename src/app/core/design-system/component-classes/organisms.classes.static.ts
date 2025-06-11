/**
 * Static class definitions for organism components.
 * These are hardcoded at build time to avoid runtime template interpolation.
 * 
 * IMPORTANT: This file contains static Tailwind classes that must not use
 * any dynamic token utilities or runtime generation.
 */

// ========================================================================
// NAVIGATION CLASSES
// ========================================================================
export const navigationClasses = {
  topNav: {
    base: 'sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800',
    
    container: 'mx-auto px-4 sm:px-6 lg:px-8',
    
    inner: 'flex justify-between h-16',
    
    wrapper: 'w-full bg-gray-50 dark:bg-black transition-colors duration-300',
    
    innerContainer: 'bg-white dark:bg-gray-800 border-b sm:border border-gray-200 dark:border-gray-700 sm:rounded-b-lg md:rounded-b-xl max-w-7xl w-full sm:shadow-2xl transition-colors duration-300',
    
    transparent: 'bg-transparent shadow-none border-transparent',
    
    elevated: 'shadow-lg',
    
    flexContainer: 'flex items-center justify-between h-16 px-4',
    
    desktopNav: 'hidden md:flex items-center space-x-8 ml-10',
    
    searchContainer: 'hidden lg:flex items-center flex-1 max-w-md mx-8',
    
    rightSection: 'flex items-center space-x-4',
    
    mobileMenuButton: 'md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
  },
  
  sideNav: {
    base: 'fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out',
    
    hidden: '-translate-x-full',
    visible: 'translate-x-0'
  },
  
  navItem: {
    base: 'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
    
    default: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
    
    active: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
  },
  
  mobileMenuButton: 'inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
} as const;

// ========================================================================
// DASHBOARD WIDGET CLASSES
// ========================================================================
export const dashboardWidgetClasses = {
  base: 'bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6',
  
  variants: {
    default: '',
    
    clickable: 'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800',
    
    primary: 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
  },
  
  header: {
    base: 'flex items-center justify-between mb-4',
    
    title: 'text-lg font-semibold text-gray-900 dark:text-white',
    
    subtitle: 'text-sm text-gray-600 dark:text-gray-400'
  },
  
  content: {
    base: 'space-y-2',
    
    metric: 'text-3xl font-bold text-gray-900 dark:text-white',
    
    trend: {
      up: 'inline-flex items-center text-sm font-medium text-green-600',
      
      down: 'inline-flex items-center text-sm font-medium text-red-600'
    }
  },
  
  icon: {
    wrapper: 'inline-flex items-center justify-center w-12 h-12 rounded-lg',
    
    colors: {
      primary: 'bg-primary-100 text-primary-600',
      
      secondary: 'bg-gray-100 text-gray-600',
      
      success: 'bg-green-100 text-green-600',
      
      warning: 'bg-yellow-100 text-yellow-600',
      
      error: 'bg-red-100 text-red-600'
    }
  }
} as const;

// ========================================================================
// TABLE/LIST VIEW CLASSES
// ========================================================================
export const tableClasses = {
  wrapper: 'overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700',
  
  table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
  
  thead: 'bg-gray-50 dark:bg-gray-800',
  
  th: 'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
  
  tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
  
  tr: {
    base: 'transition-colors duration-200',
    
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-800',
    
    selected: 'bg-primary-50 dark:bg-primary-900/20'
  },
  
  td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100'
} as const;

// ========================================================================
// FORM LAYOUT CLASSES
// ========================================================================
export const formLayoutClasses = {
  form: 'space-y-6',
  
  section: {
    base: 'space-y-4',
    
    title: 'text-lg font-medium text-gray-900 dark:text-white',
    
    description: 'text-sm text-gray-600 dark:text-gray-400'
  },
  
  fieldGroup: {
    horizontal: 'grid grid-cols-1 gap-4 sm:grid-cols-2',
    vertical: 'space-y-4'
  },
  
  actions: {
    base: 'flex items-center justify-end space-x-3',
    sticky: 'sticky bottom-0 bg-white dark:bg-gray-900 px-4 py-3 border-t'
  }
} as const;

// ========================================================================
// STEPPER CLASSES
// ========================================================================
export const stepperClasses = {
  container: {
    horizontal: 'space-y-8',
    vertical: 'flex space-x-8'
  },
  
  steps: {
    horizontal: 'flex items-center justify-between',
    vertical: 'space-y-4'
  },
  
  step: {
    base: 'relative flex items-center',
    
    indicator: {
      base: 'relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      
      active: 'bg-primary-600 text-white focus:ring-primary-500',
      
      completed: 'bg-green-500 text-white focus:ring-green-500',
      
      pending: 'bg-gray-300 text-gray-600 focus:ring-gray-500',
      
      error: 'bg-red-500 text-white focus:ring-red-500'
    },
    
    label: {
      base: 'ml-3',
      
      title: 'text-sm font-medium text-gray-900 dark:text-white',
      
      description: 'text-sm text-gray-500 dark:text-gray-400'
    }
  },
  
  connector: {
    horizontal: 'absolute top-5 w-full h-0.5 bg-gray-300 dark:bg-gray-600',
    
    vertical: 'absolute left-5 w-0.5 h-full bg-gray-300 dark:bg-gray-600',
    
    completed: 'bg-green-500'
  }
} as const;

// ========================================================================
// SEARCH CLASSES
// ========================================================================
export const searchClasses = {
  wrapper: 'relative',
  
  input: {
    base: 'w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
  },
  
  icon: 'absolute left-3 top-2.5 h-5 w-5 text-gray-400',
  
  results: {
    wrapper: 'absolute mt-2 w-full max-h-96 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
    
    item: {
      base: 'px-4 py-2 cursor-pointer transition-colors duration-150',
      
      default: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      
      highlighted: 'bg-primary-50 dark:bg-primary-900/20'
    }
  }
} as const;

// ========================================================================
// MOBILE MENU CLASSES
// ========================================================================
export const mobileMenuClasses = {
  hostClass: 'fixed inset-0 z-[9999] pointer-events-none',
  
  backdrop: {
    base: 'absolute inset-0 bg-black/50 dark:bg-black/70 pointer-events-auto',
    hidden: 'pointer-events-none'
  },
  
  container: 'absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col pointer-events-auto',
  
  header: {
    base: 'flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700',
    logo: 'h-8 w-auto filter brightness-0 saturate-100 dark:filter-none',
    closeButton: 'flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
  },
  
  search: {
    section: 'p-4 border-b border-gray-200 dark:border-gray-700',
    button: 'flex items-center gap-2 w-full p-2 px-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
  },
  
  nav: {
    wrapper: 'flex-1 overflow-y-auto py-4 scrollbar-thin',
    list: 'list-none',
    listItem: 'mb-1',
    
    menuItem: {
      base: 'flex items-center justify-between w-full px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
      withChildren: 'font-semibold',
      iconWrapper: 'flex items-center gap-2 flex-1',
      icon: 'text-gray-600 dark:text-gray-400',
      chevron: 'transition-transform text-gray-600 dark:text-gray-400',
      chevronRotated: 'rotate-180'
    },
    
    submenu: {
      wrapper: 'bg-gray-50 dark:bg-black/20',
      item: 'block py-2 px-4 pl-12 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
      borderLeft: 'border-l-4 border-gray-200 hover:border-orange-500'
    }
  },
  
  footer: {
    base: 'mt-auto p-4 border-t border-gray-200 dark:border-gray-700',
    
    userInfo: {
      wrapper: 'flex items-center gap-3 mb-4',
      name: 'font-semibold text-gray-900 dark:text-gray-100 text-sm',
      email: 'text-gray-600 dark:text-gray-400 text-xs'
    },
    
    actions: {
      wrapper: 'flex items-center gap-2',
      themeToggle: 'flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors',
      logout: 'flex items-center gap-2 flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
    }
  }
} as const;

// ========================================================================
// TOP NAVIGATION CLASSES
// ========================================================================
export const topNavigationClasses = {
  wrapper: {
    base: 'w-full bg-gray-50 dark:bg-black transition-colors duration-300',
    sticky: 'sticky top-0 z-50'
  },
  
  container: 'w-full flex justify-center px-4 sm:px-6 lg:px-8',
  
  innerContainer: {
    base: 'bg-white dark:bg-gray-800 border-b sm:border border-gray-200 dark:border-gray-700 sm:rounded-b-lg md:rounded-b-xl max-w-7xl w-full sm:shadow-2xl transition-colors duration-300',
    transparent: 'bg-transparent shadow-none border-transparent',
    elevated: 'shadow-lg'
  },
  
  innerFlex: 'flex items-center justify-between h-16 px-4',
  
  desktopNav: 'hidden md:flex items-center space-x-8 ml-10',
  
  searchContainer: 'hidden lg:flex items-center flex-1 max-w-md mx-8',
  
  rightSection: 'flex items-center space-x-4',
  
  mobileMenuButton: 'md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
} as const;

// ========================================================================
// USER MENU CLASSES
// ========================================================================
export const userMenuClasses = {
  container: 'relative inline-block text-left',
  
  trigger: {
    button: 'flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800'
  },
  
  dropdown: {
    base: 'origin-top-right absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
  },
  
  sections: {
    userInfo: {
      wrapper: 'px-4 py-3 border-b border-gray-200 dark:border-gray-700',
      container: 'flex items-center space-x-3',
      details: 'flex-1 min-w-0',
      name: 'text-sm font-medium text-gray-900 dark:text-white truncate',
      email: 'text-xs text-gray-500 dark:text-gray-400 truncate',
      role: 'text-xs text-gray-500 dark:text-gray-400 mt-0.5'
    },
    
    darkMode: {
      wrapper: 'px-4 py-3 border-b border-gray-200 dark:border-gray-700',
      container: 'flex items-center justify-between',
      label: {
        wrapper: 'flex items-center space-x-2',
        text: 'text-sm text-gray-700 dark:text-gray-200'
      },
      toggle: {
        base: 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800',
        on: 'bg-primary',
        off: 'bg-gray-200',
        knob: {
          base: 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          on: 'translate-x-5',
          off: 'translate-x-0'
        }
      }
    },
    
    menu: {
      wrapper: 'py-1',
      divider: 'my-1 h-px bg-gray-200 dark:bg-gray-700'
    }
  },
  
  menuItem: {
    base: 'w-full flex items-center px-4 py-2 text-sm transition-colors duration-150',
    default: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
    focused: 'bg-gray-100 dark:bg-gray-700',
    danger: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20',
    icon: 'mr-3'
  }
} as const;

// ========================================================================
// BOTTOM NAVIGATION CLASSES
// ========================================================================
export const bottomNavigationClasses = {
  navigation: {
    base: 'bottom-navigation z-50',
    
    positions: {
      fixed: 'fixed bottom-0 inset-x-0',
      sticky: 'sticky bottom-0',
      relative: 'relative'
    },
    
    mobileOnly: 'md:hidden'
  },
  
  container: 'w-full flex justify-center sm:px-4 md:px-6 lg:px-8',
  
  innerContainer: 'bg-white dark:bg-gray-800 border-t sm:border border-gray-200 dark:border-gray-700 sm:rounded-t-lg md:rounded-t-xl max-w-7xl w-full sm:shadow-2xl',
  
  grid: {
    base: 'grid h-16 px-4',
    // Grid template columns will be set via style attribute based on item count
  },
  
  navItem: {
    base: 'nav-item relative flex flex-col items-center justify-center py-2 px-3 transition-all duration-200 group md:rounded-lg',
    active: 'text-primary',
    inactive: 'text-gray-500 dark:text-gray-400'
  },
  
  activeIndicator: 'absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-md',
  
  icon: {
    base: 'w-6 h-6',
    inactive: 'w-6 h-6 transition-colors duration-200 group-hover:text-primary dark:group-hover:text-primary'
  },
  
  label: 'text-xs mt-1 font-medium transition-colors duration-200 group-hover:text-primary',
  
  badge: {
    topPosition: -20,
    rightPosition: -18
  }
} as const;
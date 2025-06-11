/**
 * Static class definitions for molecule components.
 * These are hardcoded at build time to avoid runtime template interpolation.
 * 
 * IMPORTANT: This file contains static Tailwind classes that must not use
 * any dynamic token utilities or runtime generation.
 */

// ========================================================================
// CARD CLASSES
// ========================================================================
export const cardClasses = {
  base: 'bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden',
  
  variants: {
    elevated: 'shadow-lg',
    flat: 'shadow-none border border-neutral-200',
    outlined: 'shadow-none border-2 border-neutral-300'
  },
  
  header: {
    base: 'px-6 py-4 border-b border-neutral-200 dark:border-neutral-700',
    title: 'text-lg font-semibold text-neutral-900 dark:text-white',
    subtitle: 'text-sm text-neutral-600 dark:text-neutral-400'
  },
  
  body: 'p-6',
  
  footer: 'px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
} as const;

// ========================================================================
// MODAL CLASSES
// ========================================================================
export const modalClasses = {
  backdrop: 'fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300',
  
  wrapper: 'fixed inset-0 z-50 overflow-y-auto flex min-h-full items-center justify-center p-4',
  
  modal: {
    base: 'relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-800 shadow-xl transition-all w-full',
    
    sizes: {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-7xl'
    }
  },
  
  header: {
    base: 'flex items-start justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700',
    title: 'text-lg font-semibold text-neutral-900 dark:text-white',
    closeButton: 'rounded-lg p-1 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500'
  },
  
  body: 'px-6 py-4',
  
  footer: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
} as const;

// ========================================================================
// DROPDOWN CLASSES
// ========================================================================
export const dropdownClasses = {
  trigger: 'cursor-pointer',
  
  menu: {
    base: 'absolute z-50 mt-2 min-w-[200px] bg-white dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 transition-all duration-200',
    
    positions: {
      'bottom-start': 'top-full left-0',
      'bottom-end': 'top-full right-0',
      'top-start': 'bottom-full left-0',
      'top-end': 'bottom-full right-0'
    }
  },
  
  item: {
    base: 'w-full px-4 py-2 text-sm text-left transition-colors duration-150 flex items-center',
    
    default: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none',
    
    disabled: 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
  },
  
  divider: 'my-1 border-t border-neutral-200 dark:border-neutral-700'
} as const;

// ========================================================================
// ALERT CLASSES
// ========================================================================
export const alertClasses = {
  base: 'p-4 rounded-lg border flex items-start gap-3',
  
  variants: {
    success: 'bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200 border-success-200 dark:border-success-800',
    
    error: 'bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-200 border-error-200 dark:border-error-800',
    
    warning: 'bg-warning-50 dark:bg-warning-900/20 text-warning-800 dark:text-warning-200 border-warning-200 dark:border-warning-800',
    
    info: 'bg-info-50 dark:bg-info-900/20 text-info-800 dark:text-info-200 border-info-200 dark:border-info-800'
  },
  
  icon: {
    success: 'text-success-600',
    error: 'text-error-600',
    warning: 'text-warning-600',
    info: 'text-info-600'
  },
  
  title: 'text-sm font-medium',
  
  closeButton: 'rounded-lg p-1.5 inline-flex transition-colors hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2'
} as const;

// ========================================================================
// TABS CLASSES
// ========================================================================
export const tabClasses = {
  container: {
    default: 'border-b border-neutral-200 dark:border-neutral-700',
    pills: 'bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg inline-flex'
  },
  
  list: {
    default: 'flex space-x-8',
    pills: 'flex space-x-1'
  },
  
  tab: {
    base: 'flex items-center px-1 py-2 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
    
    variants: {
      default: {
        inactive: 'border-b-2 border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-300',
        active: 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
      },
      
      pills: {
        inactive: 'px-3 py-1.5 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700',
        active: 'px-3 py-1.5 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
      }
    }
  },
  
  panel: 'mt-4 focus:outline-none'
} as const;

// ========================================================================
// ACCORDION CLASSES
// ========================================================================
export const accordionClasses = {
  container: 'space-y-2',
  
  panel: {
    base: 'border rounded-lg overflow-hidden',
    disabled: 'opacity-50'
  },
  
  header: {
    button: 'w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:cursor-not-allowed',
    text: 'flex-1 font-medium'
  },
  
  content: {
    wrapper: 'overflow-hidden transition-all',
    animated: 'duration-300',
    inner: 'px-4 py-3 border-t dark:border-neutral-700'
  },
  
  icon: {
    base: 'transition-transform duration-200',
    left: 'mr-3',
    right: 'ml-3',
    expanded: {
      left: 'rotate-90',
      right: 'rotate-180'
    }
  }
} as const;

// ========================================================================
// BREADCRUMB CLASSES
// ========================================================================
export const breadcrumbClasses = {
  list: 'flex items-center space-x-2 text-sm',
  
  item: 'flex items-center',
  
  link: {
    base: 'transition-colors duration-200',
    active: 'text-neutral-900 dark:text-white font-medium cursor-default pointer-events-none',
    inactive: 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
  },
  
  separator: 'mx-2 text-neutral-400 dark:text-neutral-600'
} as const;

// ========================================================================
// PAGINATION CLASSES
// ========================================================================
export const paginationClasses = {
  container: 'flex items-center justify-between',
  
  nav: 'flex items-center space-x-1',
  
  button: {
    base: 'px-3 py-2 text-sm leading-tight transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
    
    default: 'text-neutral-500 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-300',
    
    active: 'text-white bg-primary-600 border-primary-600 hover:bg-primary-700 hover:border-primary-700',
    
    disabled: 'cursor-not-allowed opacity-50'
  },
  
  info: 'text-sm text-neutral-700 dark:text-neutral-300'
} as const;

// ========================================================================
// DATE PICKER CLASSES
// ========================================================================
export const datePickerClasses = {
  input: {
    base: 'w-full px-3 py-2 pr-10 border rounded-md transition-colors duration-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
    focus: 'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-red-500 dark:border-red-400'
  },
  
  button: {
    base: 'absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  
  dropdown: {
    wrapper: 'absolute z-50 mt-2',
    transition: {
      invisible: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100'
    }
  },
  
  calendar: {
    container: 'bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 w-80',
    
    navigation: {
      button: 'p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors',
      select: 'px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-sm font-medium'
    },
    
    weekdayHeader: 'text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 py-2',
    
    day: {
      base: 'p-2 text-sm rounded-lg transition-all duration-200',
      
      states: {
        default: 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700',
        notCurrentMonth: 'text-neutral-400 dark:text-neutral-600',
        disabled: 'text-neutral-300 dark:text-neutral-700 cursor-not-allowed',
        selected: 'bg-primary-500 text-white hover:bg-primary-600',
        today: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 font-semibold hover:bg-primary-200 dark:hover:bg-primary-900/50',
        weekend: 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
      }
    },
    
    todayButton: {
      container: 'mt-4 pt-4 border-t dark:border-neutral-700',
      button: 'w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors'
    }
  }
} as const;

// ========================================================================
// TIME PICKER CLASSES
// ========================================================================
export const timePickerClasses = {
  input: {
    base: 'w-full px-3 py-2 pr-10 border rounded-md transition-colors duration-200 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
    focus: 'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none',
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-error-500 dark:border-error-400'
  },
  
  button: {
    base: 'absolute right-0 top-0 h-full px-3 flex items-center justify-center text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  
  dropdown: {
    base: 'absolute z-50 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 w-64',
    transition: {
      invisible: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100'
    }
  },
  
  timeControl: {
    incrementButton: 'p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded transition-colors',
    incrementButtonDisabled: 'opacity-50 cursor-not-allowed',
    
    timeInput: 'w-16 px-2 py-1 text-center text-2xl font-mono border rounded-md bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:border-primary-500 focus:ring-primary-500 focus:ring-2',
    timeInputInvalid: 'border-error-500',
    
    separator: 'text-2xl font-mono text-neutral-500 dark:text-neutral-400'
  },
  
  amPm: {
    inactive: 'px-3 py-1 text-sm font-medium rounded transition-colors bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600',
    active: 'px-3 py-1 text-sm font-medium rounded transition-colors bg-primary-500 text-white'
  },
  
  nowButton: {
    container: 'mt-4 pt-4 border-t dark:border-neutral-700',
    button: 'w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors'
  }
} as const;

// ========================================================================
// FILE UPLOAD CLASSES
// ========================================================================
export const fileUploadClasses = {
  dropZone: {
    base: 'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 border-neutral-300 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-400',
    dragging: 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  
  icon: {
    upload: 'text-neutral-400 dark:text-neutral-600',
    file: 'text-neutral-500 dark:text-neutral-400'
  },
  
  text: {
    title: 'text-lg font-medium text-neutral-700 dark:text-neutral-300',
    description: 'text-sm text-neutral-500 dark:text-neutral-400 mt-1'
  },
  
  error: {
    message: 'flex items-start space-x-2 text-sm text-error-600 dark:text-error-400'
  },
  
  fileList: {
    header: 'text-sm font-medium text-neutral-700 dark:text-neutral-300',
    
    item: {
      container: 'bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4',
      iconContainer: 'w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center',
      fileName: 'text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate',
      fileSize: 'text-xs text-neutral-500 dark:text-neutral-400',
      removeButton: 'ml-4 p-1 text-neutral-400 hover:text-error-600 dark:hover:text-error-400 transition-colors'
    },
    
    status: {
      success: 'flex items-center space-x-1 mt-2 text-success-600 dark:text-success-400',
      error: 'flex items-center space-x-1 mt-2 text-error-600 dark:text-error-400'
    }
  }
} as const;

// ========================================================================
// FORM FIELD CLASSES
// ========================================================================
export const formFieldClasses = {
  container: 'w-full',
  
  label: {
    base: 'text-sm font-medium mb-1.5 block',
    default: 'text-gray-700 dark:text-gray-300',
    error: 'text-red-600 dark:text-red-400'
  },
  
  required: 'text-red-500 ml-0.5',
  
  inputContainer: 'relative',
  
  error: {
    container: 'text-xs mt-1 text-red-500 dark:text-red-400 flex items-start',
    icon: 'w-3.5 h-3.5 mr-1 inline-flex flex-shrink-0'
  },
  
  helpText: 'text-xs mt-1 text-gray-500 dark:text-gray-400'
} as const;
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const formClasses = {
  label: {
    base: 'text-sm font-medium mb-1.5 block',
    default: 'text-gray-900 dark:text-gray-100',
    error: 'text-red-600 dark:text-red-400',
    disabled: 'text-gray-500 dark:text-gray-500'
  },
  
  helperText: {
    base: 'text-xs mt-1',
    default: 'text-gray-600 dark:text-gray-400',
    error: 'text-red-500',
    success: 'text-green-600 dark:text-green-400'
  },
  
  input: {
    base: 'w-full text-sm rounded-md transition-colors focus:outline-none',
    default: 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-25 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
    error: 'bg-white dark:bg-gray-700 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-25 text-gray-900 dark:text-gray-100',
    success: 'bg-white dark:bg-gray-700 border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-25 text-gray-900 dark:text-gray-100',
    disabled: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-500 cursor-not-allowed',
    readonly: 'bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 cursor-default'
  },
  
  sizes: {
    sm: 'h-8 px-2.5 py-1.5',
    md: 'h-10 px-3 py-2',
    lg: 'h-12 px-4 py-3'
  },
  
  checkbox: {
    base: 'text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary focus:ring-opacity-25',
    sizes: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
  },
  
  radio: {
    base: 'text-primary border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:ring-opacity-25'
  },
  
  toggle: {
    container: {
      base: 'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      on: 'bg-primary',
      off: 'bg-gray-300 dark:bg-gray-600'
    },
    handle: {
      base: 'inline-block transform rounded-full bg-white transition-transform',
      sizes: {
        sm: { container: 'h-5 w-9', handle: 'h-4 w-4', translate: { on: 'translate-x-4', off: 'translate-x-1' } },
        md: { container: 'h-6 w-11', handle: 'h-5 w-5', translate: { on: 'translate-x-5', off: 'translate-x-1' } },
        lg: { container: 'h-7 w-14', handle: 'h-6 w-6', translate: { on: 'translate-x-7', off: 'translate-x-1' } }
      }
    }
  }
};
import { TokenUtils } from '../token-utilities';

/**
 * Static class definitions for molecule components.
 * These are generated at build time to avoid runtime template interpolation.
 */

// ========================================================================
// CARD CLASSES
// ========================================================================
export const cardClasses = {
  base: [
    TokenUtils.getColorClass('bg', 'white'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
    TokenUtils.getRadiusClass('lg'),
    TokenUtils.getShadowClass('md'),
    'overflow-hidden'
  ].join(' '),
  
  variants: {
    elevated: TokenUtils.getShadowClass('lg'),
    flat: 'shadow-none border ' + TokenUtils.getColorClass('border', 'neutral.200'),
    outlined: 'shadow-none border-2 ' + TokenUtils.getColorClass('border', 'neutral.300')
  },
  
  header: {
    base: [
      'px-6 py-4',
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
    ].join(' '),
    
    title: [
      'text-lg font-semibold',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    subtitle: [
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
  },
  
  body: 'p-6',
  
  footer: [
    'px-6 py-4',
    'border-t',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700'),
    TokenUtils.getColorClass('bg', 'neutral.50'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.900')
  ].join(' ')
} as const;

// ========================================================================
// MODAL CLASSES
// ========================================================================
export const modalClasses = {
  backdrop: [
    'fixed inset-0 z-50',
    'bg-black bg-opacity-50',
    'transition-opacity duration-300'
  ].join(' '),
  
  wrapper: [
    'fixed inset-0 z-50',
    'overflow-y-auto',
    'flex min-h-full items-center justify-center p-4'
  ].join(' '),
  
  modal: {
    base: [
      'relative transform overflow-hidden',
      TokenUtils.getRadiusClass('lg'),
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'shadow-xl transition-all',
      'w-full'
    ].join(' '),
    
    sizes: {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-7xl'
    }
  },
  
  header: {
    base: [
      'flex items-start justify-between',
      'px-6 py-4',
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
    ].join(' '),
    
    title: [
      'text-lg font-semibold',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    closeButton: [
      'rounded-lg p-1',
      TokenUtils.getColorClass('text', 'neutral.400'),
      'hover:' + TokenUtils.getColorClass('text', 'neutral.500'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'focus:outline-none focus:ring-2',
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' ')
  },
  
  body: 'px-6 py-4',
  
  footer: [
    'flex items-center justify-end gap-3',
    'px-6 py-4',
    'border-t',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700'),
    TokenUtils.getColorClass('bg', 'neutral.50'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.900')
  ].join(' ')
} as const;

// ========================================================================
// DROPDOWN CLASSES
// ========================================================================
export const dropdownClasses = {
  trigger: 'cursor-pointer',
  
  menu: {
    base: [
      'absolute z-50 mt-2',
      'min-w-[200px]',
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      TokenUtils.getRadiusClass('md'),
      TokenUtils.getShadowClass('lg'),
      'ring-1 ring-black ring-opacity-5',
      'py-1',
      'transition-all duration-200'
    ].join(' '),
    
    positions: {
      'bottom-start': 'top-full left-0',
      'bottom-end': 'top-full right-0',
      'top-start': 'bottom-full left-0',
      'top-end': 'bottom-full right-0'
    }
  },
  
  item: {
    base: [
      'w-full px-4 py-2',
      'text-sm text-left',
      'transition-colors duration-150',
      'flex items-center'
    ].join(' '),
    
    default: [
      TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.300'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'focus:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:focus:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'focus:outline-none'
    ].join(' '),
    
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.400'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.600'),
      'cursor-not-allowed'
    ].join(' ')
  },
  
  divider: [
    'my-1 border-t',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' ')
} as const;

// ========================================================================
// ALERT CLASSES
// ========================================================================
export const alertClasses = {
  base: [
    'p-4 rounded-lg border',
    'flex items-start gap-3'
  ].join(' '),
  
  variants: {
    success: [
      TokenUtils.getColorClass('bg', 'success.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'success.900') + '/20',
      TokenUtils.getColorClass('text', 'success.800'),
      'dark:' + TokenUtils.getColorClass('text', 'success.200'),
      TokenUtils.getColorClass('border', 'success.200'),
      'dark:' + TokenUtils.getColorClass('border', 'success.800')
    ].join(' '),
    
    error: [
      TokenUtils.getColorClass('bg', 'error.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'error.900') + '/20',
      TokenUtils.getColorClass('text', 'error.800'),
      'dark:' + TokenUtils.getColorClass('text', 'error.200'),
      TokenUtils.getColorClass('border', 'error.200'),
      'dark:' + TokenUtils.getColorClass('border', 'error.800')
    ].join(' '),
    
    warning: [
      TokenUtils.getColorClass('bg', 'warning.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'warning.900') + '/20',
      TokenUtils.getColorClass('text', 'warning.800'),
      'dark:' + TokenUtils.getColorClass('text', 'warning.200'),
      TokenUtils.getColorClass('border', 'warning.200'),
      'dark:' + TokenUtils.getColorClass('border', 'warning.800')
    ].join(' '),
    
    info: [
      TokenUtils.getColorClass('bg', 'info.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'info.900') + '/20',
      TokenUtils.getColorClass('text', 'info.800'),
      'dark:' + TokenUtils.getColorClass('text', 'info.200'),
      TokenUtils.getColorClass('border', 'info.200'),
      'dark:' + TokenUtils.getColorClass('border', 'info.800')
    ].join(' ')
  },
  
  icon: {
    success: TokenUtils.getColorClass('text', 'success.600'),
    error: TokenUtils.getColorClass('text', 'error.600'),
    warning: TokenUtils.getColorClass('text', 'warning.600'),
    info: TokenUtils.getColorClass('text', 'info.600')
  },
  
  title: 'text-sm font-medium',
  
  closeButton: [
    'rounded-lg p-1.5 inline-flex',
    'transition-colors',
    'hover:bg-opacity-20',
    'focus:outline-none focus:ring-2 focus:ring-offset-2'
  ].join(' ')
} as const;

// ========================================================================
// TABS CLASSES
// ========================================================================
export const tabClasses = {
  container: {
    default: [
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
    ].join(' '),
    
    pills: [
      TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'p-1 rounded-lg inline-flex'
    ].join(' ')
  },
  
  list: {
    default: 'flex space-x-8',
    pills: 'flex space-x-1'
  },
  
  tab: {
    base: [
      'flex items-center px-1 py-2',
      'text-sm font-medium',
      'transition-all duration-150',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'whitespace-nowrap'
    ].join(' '),
    
    variants: {
      default: {
        inactive: [
          'border-b-2 border-transparent',
          TokenUtils.getColorClass('text', 'neutral.600'),
          'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
          'hover:' + TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:hover:' + TokenUtils.getColorClass('text', 'neutral.200'),
          'hover:' + TokenUtils.getColorClass('border', 'neutral.300')
        ].join(' '),
        
        active: [
          'border-b-2',
          TokenUtils.getColorClass('border', 'primary.500'),
          TokenUtils.getColorClass('text', 'primary.600'),
          'dark:' + TokenUtils.getColorClass('text', 'primary.400')
        ].join(' ')
      },
      
      pills: {
        inactive: [
          'px-3 py-1.5 rounded-md',
          TokenUtils.getColorClass('text', 'neutral.600'),
          'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
          'hover:' + TokenUtils.getColorClass('bg', 'neutral.200'),
          'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.700')
        ].join(' '),
        
        active: [
          'px-3 py-1.5 rounded-md',
          TokenUtils.getColorClass('bg', 'white'),
          'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white'),
          'shadow-sm'
        ].join(' ')
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
  
  item: [
    'border rounded-lg overflow-hidden',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),
  
  trigger: {
    base: [
      'w-full px-4 py-3',
      'flex items-center justify-between',
      'text-left transition-colors',
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.50'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'disabled:cursor-not-allowed disabled:opacity-50',
      'focus:outline-none focus:ring-2 focus:ring-inset',
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    title: [
      'font-medium',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' ')
  },
  
  content: [
    'px-4 py-3 border-t',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),
  
  icon: 'transition-transform duration-200'
} as const;

// ========================================================================
// BREADCRUMB CLASSES
// ========================================================================
export const breadcrumbClasses = {
  list: 'flex items-center space-x-2 text-sm',
  
  item: 'flex items-center',
  
  link: {
    base: 'transition-colors duration-200',
    
    active: [
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white'),
      'font-medium cursor-default pointer-events-none'
    ].join(' '),
    
    inactive: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'hover:' + TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'neutral.200')
    ].join(' ')
  },
  
  separator: [
    'mx-2',
    TokenUtils.getColorClass('text', 'neutral.400'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.600')
  ].join(' ')
} as const;

// ========================================================================
// PAGINATION CLASSES
// ========================================================================
export const paginationClasses = {
  container: 'flex items-center justify-between',
  
  nav: 'flex items-center space-x-1',
  
  button: {
    base: [
      'px-3 py-2 text-sm leading-tight',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2',
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    default: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'border',
      TokenUtils.getColorClass('border', 'neutral.300'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'hover:' + TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'neutral.300')
    ].join(' '),
    
    active: [
      TokenUtils.getColorClass('text', 'white'),
      TokenUtils.getColorClass('bg', 'primary.600'),
      TokenUtils.getColorClass('border', 'primary.600'),
      'hover:' + TokenUtils.getColorClass('bg', 'primary.700'),
      'hover:' + TokenUtils.getColorClass('border', 'primary.700')
    ].join(' '),
    
    disabled: 'cursor-not-allowed opacity-50'
  },
  
  info: [
    'text-sm',
    TokenUtils.getColorClass('text', 'neutral.700'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
  ].join(' ')
} as const;
import { TokenUtils } from '../token-utilities';

/**
 * Static class definitions for organism components.
 * These are generated at build time to avoid runtime template interpolation.
 */

// ========================================================================
// NAVIGATION CLASSES
// ========================================================================
export const navigationClasses = {
  topNav: {
    base: [
      'sticky top-0 z-40',
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.800')
    ].join(' '),
    
    container: 'mx-auto px-4 sm:px-6 lg:px-8',
    
    inner: 'flex justify-between h-16'
  },
  
  sideNav: {
    base: [
      'fixed inset-y-0 left-0 z-30',
      'w-64',
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
      'border-r',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.800'),
      'transform transition-transform duration-300 ease-in-out'
    ].join(' '),
    
    hidden: '-translate-x-full',
    visible: 'translate-x-0'
  },
  
  navItem: {
    base: [
      'flex items-center px-3 py-2',
      'text-sm font-medium rounded-md',
      'transition-colors duration-200'
    ].join(' '),
    
    default: [
      TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.300'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'hover:' + TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    active: [
      TokenUtils.getColorClass('bg', 'primary.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
      TokenUtils.getColorClass('text', 'primary.600'),
      'dark:' + TokenUtils.getColorClass('text', 'primary.400')
    ].join(' ')
  },
  
  mobileMenuButton: [
    'inline-flex items-center justify-center p-2',
    'rounded-md',
    TokenUtils.getColorClass('text', 'neutral.400'),
    'hover:' + TokenUtils.getColorClass('text', 'neutral.500'),
    'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
    'focus:outline-none focus:ring-2 focus:ring-inset',
    'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
  ].join(' ')
} as const;

// ========================================================================
// DASHBOARD WIDGET CLASSES
// ========================================================================
export const dashboardWidgetClasses = {
  base: [
    TokenUtils.getColorClass('bg', 'white'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
    TokenUtils.getRadiusClass('lg'),
    TokenUtils.getShadowClass('sm'),
    'p-6'
  ].join(' '),
  
  variants: {
    default: '',
    
    clickable: [
      'cursor-pointer',
      'transition-all duration-200',
      'hover:' + TokenUtils.getShadowClass('md'),
      'hover:' + TokenUtils.getColorClass('border', 'primary.200'),
      'dark:hover:' + TokenUtils.getColorClass('border', 'primary.800')
    ].join(' '),
    
    primary: [
      TokenUtils.getColorClass('bg', 'primary.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
      'border',
      TokenUtils.getColorClass('border', 'primary.200'),
      'dark:' + TokenUtils.getColorClass('border', 'primary.800')
    ].join(' ')
  },
  
  header: {
    base: 'flex items-center justify-between mb-4',
    
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
  
  content: {
    base: 'space-y-2',
    
    metric: [
      'text-3xl font-bold',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    trend: {
      up: [
        'inline-flex items-center text-sm font-medium',
        TokenUtils.getColorClass('text', 'success.600')
      ].join(' '),
      
      down: [
        'inline-flex items-center text-sm font-medium',
        TokenUtils.getColorClass('text', 'error.600')
      ].join(' ')
    }
  },
  
  icon: {
    wrapper: [
      'inline-flex items-center justify-center',
      'w-12 h-12',
      TokenUtils.getRadiusClass('lg')
    ].join(' '),
    
    colors: {
      primary: [
        TokenUtils.getColorClass('bg', 'primary.100'),
        TokenUtils.getColorClass('text', 'primary.600')
      ].join(' '),
      
      secondary: [
        TokenUtils.getColorClass('bg', 'neutral.100'),
        TokenUtils.getColorClass('text', 'neutral.600')
      ].join(' '),
      
      success: [
        TokenUtils.getColorClass('bg', 'success.100'),
        TokenUtils.getColorClass('text', 'success.600')
      ].join(' '),
      
      warning: [
        TokenUtils.getColorClass('bg', 'warning.100'),
        TokenUtils.getColorClass('text', 'warning.600')
      ].join(' '),
      
      error: [
        TokenUtils.getColorClass('bg', 'error.100'),
        TokenUtils.getColorClass('text', 'error.600')
      ].join(' ')
    }
  }
} as const;

// ========================================================================
// TABLE/LIST VIEW CLASSES
// ========================================================================
export const tableClasses = {
  wrapper: [
    'overflow-hidden',
    TokenUtils.getRadiusClass('lg'),
    'border',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),
  
  table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
  
  thead: [
    TokenUtils.getColorClass('bg', 'neutral.50'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.800')
  ].join(' '),
  
  th: [
    'px-6 py-3',
    'text-left text-xs font-medium uppercase tracking-wider',
    TokenUtils.getColorClass('text', 'neutral.500'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
  ].join(' '),
  
  tbody: [
    TokenUtils.getColorClass('bg', 'white'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
    'divide-y',
    TokenUtils.getColorClass('divide', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('divide', 'neutral.700')
  ].join(' '),
  
  tr: {
    base: 'transition-colors duration-200',
    
    hover: [
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.50'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.800')
    ].join(' '),
    
    selected: [
      TokenUtils.getColorClass('bg', 'primary.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20'
    ].join(' ')
  },
  
  td: [
    'px-6 py-4 whitespace-nowrap text-sm',
    TokenUtils.getColorClass('text', 'neutral.900'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.100')
  ].join(' ')
} as const;

// ========================================================================
// FORM LAYOUT CLASSES
// ========================================================================
export const formLayoutClasses = {
  form: 'space-y-6',
  
  section: {
    base: 'space-y-4',
    
    title: [
      'text-lg font-medium',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    description: [
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
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
    horizontal: 'block',
    vertical: 'flex'
  },
  
  header: {
    base: 'stepper-header relative',
    horizontal: 'flex items-start w-full pb-8 mb-8',
    vertical: 'flex flex-col pr-8 mr-8'
  },
  
  // Horizontal stepper specific
  horizontalWrapper: 'stepper-horizontal relative flex items-start justify-between w-full py-5',
  
  lineBackground: [
    'stepper-line-background absolute top-10 left-5 right-5 h-0.5 z-0',
    TokenUtils.getColorClass('bg', 'neutral.300'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.600')
  ].join(' '),
  
  lineProgress: [
    'stepper-line-progress absolute top-10 left-5 h-0.5 z-[1] transition-all duration-300',
    TokenUtils.getColorClass('bg', 'success.500')
  ].join(' '),
  
  // Step container
  stepContainer: {
    base: 'stepper-step relative flex flex-col items-center flex-1 z-[2]',
    first: 'stepper-step-first flex-[0_0_auto]',
    last: 'stepper-step-last flex-[0_0_auto]'
  },
  
  // Vertical step wrapper
  verticalStepWrapper: 'stepper-step-wrapper',
  
  verticalStepContainer: {
    base: 'relative flex items-center stepper-step-container',
    horizontal: 'flex-col',
    vertical: 'flex-row w-full'
  },
  
  // Step button/indicator
  stepButton: {
    base: [
      'step-indicator relative z-10 rounded-full flex items-center justify-center',
      'w-10 h-10 text-sm font-medium',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'transition-all duration-300',
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800')
    ].join(' '),
    
    states: {
      error: [
        TokenUtils.getColorClass('bg', 'error.500'),
        TokenUtils.getColorClass('text', 'white'),
        'focus:' + TokenUtils.getColorClass('ring', 'error.500')
      ].join(' '),
      
      active: [
        TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
        TokenUtils.getColorClass('text', 'white'),
        'focus:' + TokenUtils.getColorClass('ring', 'primary.DEFAULT')
      ].join(' '),
      
      completed: [
        TokenUtils.getColorClass('bg', 'success.500'),
        TokenUtils.getColorClass('text', 'white'),
        'focus:' + TokenUtils.getColorClass('ring', 'success.500')
      ].join(' '),
      
      disabled: [
        TokenUtils.getColorClass('bg', 'neutral.200'),
        TokenUtils.getColorClass('text', 'neutral.400'),
        'cursor-not-allowed',
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.700'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
      ].join(' '),
      
      default: [
        TokenUtils.getColorClass('bg', 'neutral.300'),
        TokenUtils.getColorClass('text', 'neutral.600'),
        'hover:' + TokenUtils.getColorClass('bg', 'neutral.400'),
        'cursor-pointer',
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.600'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.300'),
        'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.500')
      ].join(' ')
    }
  },
  
  // Step content
  stepIndicatorContent: 'step-indicator-content flex items-center justify-center w-full h-full',
  
  // Labels
  labelContainer: {
    base: 'mt-3',
    bottom: 'text-center',
    side: 'text-left ml-4'
  },
  
  stepLabel: 'step-label text-sm font-medium',
  
  optionalText: [
    TokenUtils.getTextSizeClass('xs'),
    TokenUtils.getColorClass('text', 'neutral.500'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
  ].join(' '),
  
  stepDescription: [
    'step-description',
    TokenUtils.getTextSizeClass('xs'),
    TokenUtils.getColorClass('text', 'neutral.500'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
  ].join(' '),
  
  // Vertical connector
  verticalConnector: {
    base: 'step-connector transition-all duration-300',
    pending: [
      'w-0.5 h-12 ml-5',
      TokenUtils.getColorClass('bg', 'neutral.300'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.600')
    ].join(' '),
    completed: [
      'w-0.5 h-12 ml-5',
      TokenUtils.getColorClass('bg', 'success.500')
    ].join(' ')
  },
  
  // Content area
  content: 'stepper-content',
  panel: 'stepper-panel',
  
  // Navigation
  navigation: 'stepper-navigation flex justify-between items-center mt-6',
  
  // Animation classes
  animation: {
    none: '',
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500'
  }
} as const;

// ========================================================================
// CONTACT CARD CLASSES
// ========================================================================
export const contactCardClasses = {
  container: [
    TokenUtils.getColorClass('bg', 'white'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
    TokenUtils.getRadiusClass('lg'),
    TokenUtils.getShadowClass('sm'),
    'hover:' + TokenUtils.getShadowClass('md'),
    'border',
    TokenUtils.getColorClass('border', 'transparent'),
    'hover:' + TokenUtils.getColorClass('border', 'primary.DEFAULT'),
    'transition-all duration-200',
    'cursor-pointer',
    'overflow-hidden',
    'h-full',
    'flex flex-col'
  ].join(' '),
  
  header: [
    'flex justify-between items-start',
    TokenUtils.getSpacingClass('p', '4'),
    'pb-0'
  ].join(' '),
  
  nameSection: 'flex-1 min-w-0',
  
  name: [
    TokenUtils.getFontWeightClass('semibold'),
    TokenUtils.getTextSizeClass('base'),
    TokenUtils.getColorClass('text', 'neutral.900'),
    'dark:' + TokenUtils.getColorClass('text', 'white'),
    'truncate'
  ].join(' '),
  
  company: [
    TokenUtils.getTextSizeClass('sm'),
    TokenUtils.getColorClass('text', 'neutral.500'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
    'truncate'
  ].join(' '),
  
  statusBadge: {
    base: [
      'px-2 py-0.5',
      TokenUtils.getTextSizeClass('xs'),
      TokenUtils.getFontWeightClass('medium'),
      'rounded-full',
      'whitespace-nowrap'
    ].join(' '),
    
    // Status-spezifische Klassen werden dynamisch hinzugefügt
    success: [
      TokenUtils.getColorClass('bg', 'success.100'),
      TokenUtils.getColorClass('text', 'success.800'),
      'dark:' + TokenUtils.getColorClass('bg', 'success.900') + '/20',
      'dark:' + TokenUtils.getColorClass('text', 'success.400')
    ].join(' '),
    
    warning: [
      TokenUtils.getColorClass('bg', 'warning.100'),
      TokenUtils.getColorClass('text', 'warning.800'),
      'dark:' + TokenUtils.getColorClass('bg', 'warning.900') + '/20',
      'dark:' + TokenUtils.getColorClass('text', 'warning.400')
    ].join(' '),
    
    info: [
      TokenUtils.getColorClass('bg', 'info.100'),
      TokenUtils.getColorClass('text', 'info.800'),
      'dark:' + TokenUtils.getColorClass('bg', 'info.900') + '/20',
      'dark:' + TokenUtils.getColorClass('text', 'info.400')
    ].join(' '),
    
    primary: [
      TokenUtils.getColorClass('bg', 'primary.100'),
      TokenUtils.getColorClass('text', 'primary.800'),
      'dark:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
      'dark:' + TokenUtils.getColorClass('text', 'primary.400')
    ].join(' '),
    
    neutral: [
      TokenUtils.getColorClass('bg', 'neutral.100'),
      TokenUtils.getColorClass('text', 'neutral.800'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.900') + '/20',
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
  },
  
  content: [
    TokenUtils.getSpacingClass('p', '4'),
    'space-y-2',
    'flex-1'
  ].join(' '),
  
  addressLine: [
    TokenUtils.getTextSizeClass('sm'),
    TokenUtils.getColorClass('text', 'neutral.600'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
    'flex items-center gap-1'
  ].join(' '),
  
  iconSmall: [
    'w-4 h-4',
    'flex-shrink-0'
  ].join(' '),
  
  interests: [
    'flex gap-1 flex-wrap',
    TokenUtils.getSpacingClass('mt', '2')
  ].join(' '),
  
  interestTag: [
    'px-2 py-0.5',
    TokenUtils.getTextSizeClass('xs'),
    TokenUtils.getColorClass('bg', 'neutral.100'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.700'),
    TokenUtils.getColorClass('text', 'neutral.700'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.300'),
    TokenUtils.getRadiusClass('sm')
  ].join(' '),
  
  footer: [
    'flex gap-2 justify-end',
    TokenUtils.getSpacingClass('p', '4'),
    'pt-0',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),
  
  actionButton: [
    'w-9 h-9',
    'flex items-center justify-center',
    TokenUtils.getRadiusClass('md'),
    'bg-transparent',
    'border',
    TokenUtils.getColorClass('border', 'neutral.300'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.600'),
    TokenUtils.getColorClass('text', 'neutral.600'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
    'hover:' + TokenUtils.getColorClass('border', 'primary.DEFAULT'),
    'hover:' + TokenUtils.getColorClass('bg', 'primary.50'),
    'hover:' + TokenUtils.getColorClass('text', 'primary.DEFAULT'),
    'dark:hover:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
    'dark:hover:' + TokenUtils.getColorClass('text', 'primary.400'),
    'transition-all duration-200',
    'focus:outline-none focus:ring-2',
    'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
  ].join(' ')
} as const;

// ========================================================================
// ENTITY LIST VIEW CLASSES
// ========================================================================
export const entityListViewClasses = {
  container: [
    'entity-list-view',
    TokenUtils.getColorClass('bg', 'white'),
    'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
    TokenUtils.getRadiusClass('lg'),
    'shadow-sm',
    'flex',
    'flex-col',
    'h-full'
  ].join(' '),

  header: [
    'p-4',
    'border-b',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),

  searchIcon: TokenUtils.getColorClass('text', 'neutral.400'),

  viewToggle: {
    container: [
      'flex',
      'items-center',
      TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'rounded-md',
      'p-1'
    ].join(' '),

    button: {
      base: [
        'px-3',
        'py-1.5',
        TokenUtils.getRadiusClass('base'),
        TokenUtils.getTextSizeClass('sm'),
        TokenUtils.getFontWeightClass('medium'),
        'transition-colors'
      ].join(' '),

      active: [
        TokenUtils.getColorClass('bg', 'white'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
        TokenUtils.getColorClass('text', 'neutral.900'),
        'dark:' + TokenUtils.getColorClass('text', 'white')
      ].join(' '),

      inactive: [
        TokenUtils.getColorClass('text', 'neutral.500'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
      ].join(' ')
    }
  },

  table: {
    header: [
      TokenUtils.getColorClass('bg', 'neutral.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
    ].join(' '),

    columnHeader: [
      'px-3',
      'py-1',
      'text-xs',
      'font-medium',
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
      'uppercase',
      'tracking-wider',
      'cursor-pointer',
      'hover:' + TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'neutral.200'),
      'transition-colors'
    ].join(' '),

    row: [
      'flex',
      'items-center',
      'px-4',
      'py-3',
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.50'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'border-b',
      TokenUtils.getColorClass('border', 'neutral.100'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.800'),
      'transition-colors'
    ].join(' '),

    cellText: [
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.100')
    ].join(' ')
  },

  loading: {
    text: [
      'mt-4',
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
  },

  empty: {
    icon: [
      TokenUtils.getColorClass('text', 'neutral.300'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.600'),
      'mb-4'
    ].join(' '),

    text: [
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
  },

  grid: {
    card: [
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'border',
      TokenUtils.getColorClass('border', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.700'),
      'rounded-lg',
      'p-4',
      'hover:shadow-lg',
      'transition-shadow',
      'cursor-pointer'
    ].join(' '),

    label: [
      'text-xs',
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),

    value: [
      'block',
      'text-sm',
      'font-medium',
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'white')
    ].join(' ')
  },

  footer: [
    'px-4',
    'py-3',
    'border-t',
    TokenUtils.getColorClass('border', 'neutral.200'),
    'dark:' + TokenUtils.getColorClass('border', 'neutral.700')
  ].join(' '),

  pagination: {
    text: [
      'text-sm',
      TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
    ].join(' ')
  },

  selectedBar: {
    base: [
      'px-4',
      'py-2',
      TokenUtils.getColorClass('bg', 'info.50'),
      'dark:' + TokenUtils.getColorClass('bg', 'info.900') + '/20',
      'border-t',
      TokenUtils.getColorClass('border', 'info.200'),
      'dark:' + TokenUtils.getColorClass('border', 'info.800')
    ].join(' '),

    text: [
      'text-sm',
      TokenUtils.getColorClass('text', 'info.700'),
      'dark:' + TokenUtils.getColorClass('text', 'info.300')
    ].join(' ')
  }
} as const;

// ========================================================================
// SEARCH CLASSES
// ========================================================================
export const searchClasses = {
  wrapper: 'relative',
  
  input: [
    'w-full',
    TokenUtils.getSpacingClass('pl', '10'),
    TokenUtils.getSpacingClass('pr', '10'),
    TokenUtils.getSpacingClass('py', '2'),
    'bg-gray-100 dark:bg-gray-800',
    'border border-gray-300 dark:border-gray-600',
    'rounded-lg text-sm',
    'placeholder-gray-500 dark:placeholder-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
  ].join(' '),
  
  iconLeft: [
    'absolute left-3 top-1/2 transform -translate-y-1/2',
    'text-gray-400 pointer-events-none'
  ].join(' '),
  
  clearButton: [
    'absolute right-3 top-1/2 transform -translate-y-1/2',
    'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
  ].join(' '),
  
  dropdown: [
    'absolute top-full left-0 right-0',
    TokenUtils.getSpacingClass('mt', '1'),
    'bg-white dark:bg-gray-800',
    'rounded-lg shadow-lg',
    'border border-gray-200 dark:border-gray-700',
    'max-h-96 overflow-y-auto z-50'
  ].join(' '),
  
  recentSearchHeader: [
    TokenUtils.getSpacingClass('px', '3'),
    TokenUtils.getSpacingClass('py', '2'),
    'text-xs font-semibold',
    'text-gray-500 dark:text-gray-400',
    'uppercase tracking-wider'
  ].join(' '),
  
  emptyState: [
    TokenUtils.getSpacingClass('py', '8'),
    'text-center'
  ].join(' '),
  
  results: {
    item: {
      base: [
        'block',
        TokenUtils.getSpacingClass('px', '3'),
        TokenUtils.getSpacingClass('py', '2'),
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'cursor-pointer transition-colors'
      ].join(' '),
      
      selected: 'bg-gray-100 dark:bg-gray-700'
    },
    
    iconContainer: [
      'flex-shrink-0',
      'h-10 w-10',
      'rounded-full',
      'bg-gray-200 dark:bg-gray-700',
      'flex items-center justify-center',
      TokenUtils.getSpacingClass('mr', '3')
    ].join(' '),
    
    icon: [
      'h-5 w-5',
      'text-gray-600 dark:text-gray-400'
    ].join(' ')
  },
  
  noResultsIcon: [
    'mx-auto',
    'h-12 w-12',
    'text-gray-400'
  ].join(' ')
} as const;
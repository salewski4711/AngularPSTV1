import { TokenUtils } from '../token-utilities';

/**
 * Static class definitions for atomic components.
 * These are generated at build time to avoid runtime template interpolation.
 * All TokenUtils usage happens here, not in component templates.
 */

// ========================================================================
// BUTTON CLASSES
// ========================================================================
export const buttonClasses = {
  base: [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ].join(' '),
  
  variants: {
    primary: [
      TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
      TokenUtils.getColorClass('text', 'white'),
      'hover:' + TokenUtils.getColorClass('bg', 'primary.600'),
      'active:' + TokenUtils.getColorClass('bg', 'primary.700'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    secondary: [
      'bg-secondary', // #1C3661 - ProSolarTec Blue
      'text-white',
      'hover:bg-secondary-400', // Lighter on hover (#3367A6)
      'active:bg-secondary-600', // Darker on active (#162A4D)
      'focus:ring-secondary-500'
    ].join(' '),
    
    ghost: [
      'bg-transparent',
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
      'hover:' + TokenUtils.getColorClass('bg', 'neutral.100'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'focus:' + TokenUtils.getColorClass('ring', 'neutral.500')
    ].join(' '),
    
    danger: [
      TokenUtils.getColorClass('bg', 'error.500'),
      TokenUtils.getColorClass('text', 'white'),
      'hover:' + TokenUtils.getColorClass('bg', 'error.600'),
      'active:' + TokenUtils.getColorClass('bg', 'error.700'),
      'focus:' + TokenUtils.getColorClass('ring', 'error.500')
    ].join(' '),
    
    'outline-primary': [
      'bg-transparent',
      'border-2',
      TokenUtils.getColorClass('border', 'primary.DEFAULT'),
      TokenUtils.getColorClass('text', 'primary.DEFAULT'),
      'hover:' + TokenUtils.getColorClass('bg', 'primary.50'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
      'active:' + TokenUtils.getColorClass('bg', 'primary.100'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    tertiary: [
      'bg-transparent',
      TokenUtils.getColorClass('text', 'primary.DEFAULT'),
      'hover:' + TokenUtils.getColorClass('bg', 'primary.50'),
      'dark:hover:' + TokenUtils.getColorClass('bg', 'primary.900') + '/20',
      'hover:' + TokenUtils.getColorClass('text', 'primary.600'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'primary.400'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' ')
  },
  
  sizes: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  },
  
  iconSizes: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  }
} as const;

// ========================================================================
// INPUT CLASSES
// ========================================================================
export const inputClasses = {
  container: 'w-full',
  
  label: {
    base: 'block text-sm font-medium mb-1',
    default: [
      TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
    ].join(' '),
    error: TokenUtils.getColorClass('text', 'error.600'),
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' ')
  },
  
  input: {
    base: [
      'block w-full rounded-md border',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2',
      'placeholder-gray-400'
    ].join(' '),
    
    states: {
      default: [
        TokenUtils.getColorClass('border', 'neutral.300'),
        'dark:' + TokenUtils.getColorClass('border', 'neutral.600'),
        TokenUtils.getColorClass('bg', 'white'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
        TokenUtils.getColorClass('text', 'neutral.900'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.100'),
        'focus:' + TokenUtils.getColorClass('border', 'primary.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
      ].join(' '),
      
      error: [
        TokenUtils.getColorClass('border', 'error.300'),
        TokenUtils.getColorClass('text', 'error.900'),
        'focus:' + TokenUtils.getColorClass('border', 'error.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'error.500')
      ].join(' '),
      
      disabled: [
        'bg-gray-50 dark:bg-gray-900',
        'text-gray-500 cursor-not-allowed'
      ].join(' '),
      
      readonly: [
        'bg-gray-50 dark:bg-gray-900',
        'cursor-default'
      ].join(' ')
    },
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  
  helperText: {
    base: 'mt-1 text-sm',
    default: [
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),
    error: TokenUtils.getColorClass('text', 'error.600'),
    success: TokenUtils.getColorClass('text', 'success.600')
  },
  
  icon: {
    leading: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    trailing: 'absolute inset-y-0 right-0 pr-3 flex items-center',
    base: 'h-5 w-5',
    default: 'text-gray-400',
    error: TokenUtils.getColorClass('text', 'error.500'),
    success: TokenUtils.getColorClass('text', 'success.500')
  }
} as const;

// ========================================================================
// BADGE CLASSES
// ========================================================================
export const badgeClasses = {
  base: [
    'inline-flex items-center font-medium',
    TokenUtils.getRadiusClass('full')
  ].join(' '),
  
  variants: {
    // Filled variants
    'filled-gray': [
      TokenUtils.getColorClass('bg', 'neutral.100'),
      TokenUtils.getColorClass('text', 'neutral.700')
    ].join(' '),
    'filled-primary': [
      TokenUtils.getColorClass('bg', 'primary.500'),
      TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    'filled-success': [
      TokenUtils.getColorClass('bg', 'success.100'),
      TokenUtils.getColorClass('text', 'success.700')
    ].join(' '),
    'filled-warning': [
      TokenUtils.getColorClass('bg', 'warning.500'),
      TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    'filled-error': [
      TokenUtils.getColorClass('bg', 'error.500'),
      TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    'filled-info': [
      TokenUtils.getColorClass('bg', 'info.500'),
      TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    // Outline variants
    'outline-gray': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'neutral.700'),
      TokenUtils.getColorClass('border', 'neutral.400')
    ].join(' '),
    'outline-primary': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'primary.600'),
      TokenUtils.getColorClass('border', 'primary.600')
    ].join(' '),
    'outline-success': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'success.600'),
      TokenUtils.getColorClass('border', 'success.600')
    ].join(' '),
    'outline-warning': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'warning.600'),
      TokenUtils.getColorClass('border', 'warning.600')
    ].join(' '),
    'outline-error': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'error.600'),
      TokenUtils.getColorClass('border', 'error.600')
    ].join(' '),
    'outline-info': [
      'bg-transparent border',
      TokenUtils.getColorClass('text', 'info.600'),
      TokenUtils.getColorClass('border', 'info.600')
    ].join(' '),
    
    // Subtle variants
    'subtle-gray': [
      TokenUtils.getColorClass('bg', 'neutral.700') + '/10',
      TokenUtils.getColorClass('text', 'neutral.700')
    ].join(' '),
    'subtle-primary': [
      TokenUtils.getColorClass('bg', 'primary.600') + '/10',
      TokenUtils.getColorClass('text', 'primary.600')
    ].join(' '),
    'subtle-success': [
      TokenUtils.getColorClass('bg', 'success.600') + '/10',
      TokenUtils.getColorClass('text', 'success.600')
    ].join(' '),
    'subtle-warning': [
      TokenUtils.getColorClass('bg', 'warning.600') + '/10',
      TokenUtils.getColorClass('text', 'warning.600')
    ].join(' '),
    'subtle-error': [
      TokenUtils.getColorClass('bg', 'error.600') + '/10',
      TokenUtils.getColorClass('text', 'error.600')
    ].join(' '),
    'subtle-info': [
      TokenUtils.getColorClass('bg', 'info.600') + '/10',
      TokenUtils.getColorClass('text', 'info.600')
    ].join(' ')
  },
  
  sizes: {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-sm',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3.5 py-1.5 text-base'
  },
  
  dot: 'w-2 h-2 p-0',
  
  shapes: {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none'
  },
  
  iconSizes: {
    xs: 'w-3.5 h-3.5',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  },
  
  removeIconSizes: {
    xs: 'w-3 h-3',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  }
} as const;

// ========================================================================
// AVATAR CLASSES
// ========================================================================
export const avatarClasses = {
  base: [
    'inline-flex items-center justify-center',
    TokenUtils.getFontWeightClass('medium')
  ].join(' '),
  
  sizes: {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  },
  
  textSizes: {
    xs: TokenUtils.getTextSizeClass('xs'),
    sm: TokenUtils.getTextSizeClass('sm'),
    md: TokenUtils.getTextSizeClass('base'),
    lg: TokenUtils.getTextSizeClass('lg'),
    xl: TokenUtils.getTextSizeClass('xl')
  },
  
  shapes: {
    circle: TokenUtils.getRadiusClass('full'),
    square: TokenUtils.getRadiusClass('lg')
  },
  
  colors: {
    primary: [
      TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
      TokenUtils.getColorClass('text', 'white')
    ].join(' '),
    
    secondary: [
      TokenUtils.getColorClass('bg', 'neutral.200'),
      TokenUtils.getColorClass('text', 'neutral.700')
    ].join(' ')
  },
  
  status: {
    base: [
      'absolute block',
      TokenUtils.getRadiusClass('full'),
      'ring-2',
      TokenUtils.getColorClass('ring', 'white'),
      'dark:' + TokenUtils.getColorClass('ring', 'neutral.800')
    ].join(' '),
    
    sizes: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-3.5 w-3.5'
    },
    
    positions: {
      xs: '-bottom-0 -right-0',
      sm: '-bottom-0 -right-0',
      md: '-bottom-0.5 -right-0.5',
      lg: '-bottom-0.5 -right-0.5',
      xl: '-bottom-1 -right-1'
    },
    
    colors: {
      online: TokenUtils.getColorClass('bg', 'success.500'),
      offline: TokenUtils.getColorClass('bg', 'neutral.400'),
      busy: TokenUtils.getColorClass('bg', 'error.500'),
      away: TokenUtils.getColorClass('bg', 'warning.500')
    }
  }
} as const;

// ========================================================================
// CHECKBOX CLASSES
// ========================================================================
export const checkboxClasses = {
  container: 'flex items-start',
  
  input: {
    base: [
      'rounded',
      'border-gray-300 dark:border-gray-600',
      'focus:ring-2 focus:ring-offset-2',
      'transition-colors duration-200'
    ].join(' '),
    
    sizes: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    },
    
    checked: [
      TokenUtils.getColorClass('text', 'primary.600'),
      TokenUtils.getColorClass('bg', 'primary.600'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    unchecked: [
      TokenUtils.getColorClass('text', 'white'),
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' ')
  },
  
  label: {
    base: [
      'ml-2.5',
      TokenUtils.getTextSizeClass('sm')
    ].join(' '),
    default: [
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' ')
  },
  
  requiredAsterisk: [
    TokenUtils.getColorClass('text', 'error.500'),
    'ml-1'
  ].join(' ')
} as const;

// ========================================================================
// RADIO CLASSES
// ========================================================================
export const radioClasses = {
  legend: {
    base: [
      TokenUtils.getTextSizeClass('sm'),
      TokenUtils.getFontWeightClass('medium'),
      TokenUtils.getSpacingClass('mb', 'sm')
    ].join(' '),
    default: [
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.100')
    ].join(' '),
    error: [
      TokenUtils.getColorClass('text', 'error.600'),
      'dark:' + TokenUtils.getColorClass('text', 'error.400')
    ].join(' '),
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' ')
  },
  
  requiredAsterisk: [
    TokenUtils.getColorClass('text', 'error.500'),
    TokenUtils.getSpacingClass('ml', 'xs')
  ].join(' '),
  
  group: {
    vertical: [
      'flex flex-col',
      TokenUtils.getSpacingClass('gap', 'sm')
    ].join(' '),
    horizontal: [
      'flex flex-row flex-wrap',
      TokenUtils.getSpacingClass('gap', 'md')
    ].join(' ')
  },
  
  optionContainer: {
    base: 'flex items-start',
    enabled: 'cursor-pointer',
    disabled: 'cursor-not-allowed'
  },
  
  input: {
    base: [
      TokenUtils.getColorClass('text', 'primary'),
      TokenUtils.getColorClass('border', 'neutral.300'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.600'),
      'focus:ring-2 focus:' + TokenUtils.getColorClass('ring', 'primary'),
      'focus:ring-opacity-25',
      'transition-colors duration-200'
    ].join(' '),
    
    sizes: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    },
    
    spacing: 'mt-0.5',
    enabled: 'cursor-pointer',
    disabled: 'cursor-not-allowed opacity-50'
  },
  
  labelContainer: TokenUtils.getSpacingClass('ml', 'sm'),
  
  label: {
    base: TokenUtils.getTextSizeClass('sm'),
    default: [
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' '),
    enabled: 'cursor-pointer',
    disabledCursor: 'cursor-not-allowed'
  },
  
  optionHelperText: [
    TokenUtils.getTextSizeClass('xs'),
    TokenUtils.getColorClass('text', 'neutral.600'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
    'mt-0.5'
  ].join(' ')
} as const;

// ========================================================================
// TOGGLE CLASSES
// ========================================================================
export const toggleClasses = {
  container: {
    base: [
      'relative inline-flex flex-shrink-0 cursor-pointer',
      'rounded-full border-2 border-transparent',
      'transition-colors ease-in-out duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2'
    ].join(' '),
    
    on: [
      TokenUtils.getColorClass('bg', 'primary.600'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' '),
    
    off: [
      TokenUtils.getColorClass('bg', 'neutral.200'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.700'),
      'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
    ].join(' ')
  },
  
  handle: {
    base: [
      'pointer-events-none inline-block rounded-full',
      TokenUtils.getColorClass('bg', 'white'),
      'shadow transform ring-0 transition ease-in-out duration-200'
    ].join(' '),
    
    sizes: {
      sm: { container: 'h-5 w-9', handle: 'h-4 w-4', translate: { on: 'translate-x-4', off: 'translate-x-0' } },
      md: { container: 'h-6 w-11', handle: 'h-5 w-5', translate: { on: 'translate-x-5', off: 'translate-x-0' } },
      lg: { container: 'h-7 w-14', handle: 'h-6 w-6', translate: { on: 'translate-x-7', off: 'translate-x-0' } }
    }
  },
  
  label: {
    base: [
      TokenUtils.getTextSizeClass('sm'),
      'font-medium'
    ].join(' '),
    
    position: {
      left: 'mr-3',
      right: 'ml-3'
    },
    
    default: [
      TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.100')
    ].join(' '),
    
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' ')
  },
  
  requiredAsterisk: [
    TokenUtils.getColorClass('text', 'error.500'),
    'ml-1'
  ].join(' ')
} as const;

// ========================================================================
// TAG CLASSES
// ========================================================================
export const tagClasses = {
  base: [
    'inline-flex items-center',
    TokenUtils.getFontWeightClass('medium'),
    'uppercase tracking-wider transition-colors'
  ].join(' '),
  
  variants: {
    filled: {
      gray: {
        base: [
          TokenUtils.getColorClass('bg', 'neutral.100'),
          TokenUtils.getColorClass('text', 'neutral.700'),
          'hover:' + TokenUtils.getColorClass('bg', 'neutral.200')
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'neutral.400'),
          'hover:' + TokenUtils.getColorClass('text', 'neutral.500')
        ].join(' ')
      },
      primary: {
        base: [
          TokenUtils.getColorClass('bg', 'primary'),
          TokenUtils.getColorClass('text', 'white'),
          'hover:' + TokenUtils.getColorClass('bg', 'primary') + '/90'
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'primary.200'),
          'hover:' + TokenUtils.getColorClass('text', 'white')
        ].join(' ')
      },
      success: {
        base: [
          TokenUtils.getColorClass('bg', 'success.100'),
          TokenUtils.getColorClass('text', 'success.700'),
          'hover:' + TokenUtils.getColorClass('bg', 'success.200')
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'success.400'),
          'hover:' + TokenUtils.getColorClass('text', 'success.500')
        ].join(' ')
      },
      error: {
        base: [
          'bg-red-100',
          TokenUtils.getColorClass('text', 'error.700'),
          'hover:bg-red-200'
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'error.400'),
          'hover:' + TokenUtils.getColorClass('text', 'error.500')
        ].join(' ')
      },
      warning: {
        base: [
          'bg-amber-100',
          TokenUtils.getColorClass('text', 'warning.700'),
          'hover:bg-amber-200'
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'warning.400'),
          'hover:' + TokenUtils.getColorClass('text', 'warning.500')
        ].join(' ')
      },
      info: {
        base: [
          'bg-blue-100',
          TokenUtils.getColorClass('text', 'info.700'),
          'hover:bg-blue-200'
        ].join(' '),
        removeButton: [
          TokenUtils.getColorClass('text', 'info.400'),
          'hover:' + TokenUtils.getColorClass('text', 'info.500')
        ].join(' ')
      }
    },
    outline: {
      gray: {
        base: 'bg-transparent text-gray-700 border border-gray-400 hover:bg-gray-50',
        removeButton: 'text-gray-700'
      },
      primary: {
        base: 'bg-transparent text-primary border border-primary hover:bg-primary/5',
        removeButton: 'text-primary'
      },
      success: {
        base: 'bg-transparent text-green-600 border border-green-600 hover:bg-green-50',
        removeButton: 'text-green-600'
      },
      error: {
        base: 'bg-transparent text-red-600 border border-red-600 hover:bg-red-50',
        removeButton: 'text-red-600'
      },
      warning: {
        base: 'bg-transparent text-amber-600 border border-amber-600 hover:bg-amber-50',
        removeButton: 'text-amber-600'
      },
      info: {
        base: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50',
        removeButton: 'text-blue-600'
      }
    },
    subtle: {
      gray: {
        base: 'bg-gray-700/10 text-gray-700 hover:bg-gray-700/20',
        removeButton: 'text-gray-700'
      },
      primary: {
        base: 'bg-primary/10 text-primary hover:bg-primary/20',
        removeButton: 'text-primary'
      },
      success: {
        base: 'bg-green-600/10 text-green-600 hover:bg-green-600/20',
        removeButton: 'text-green-600'
      },
      error: {
        base: 'bg-red-600/10 text-red-600 hover:bg-red-600/20',
        removeButton: 'text-red-600'
      },
      warning: {
        base: 'bg-amber-600/10 text-amber-600 hover:bg-amber-600/20',
        removeButton: 'text-amber-600'
      },
      info: {
        base: 'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20',
        removeButton: 'text-blue-600'
      }
    }
  },
  
  sizes: {
    xs: {
      base: [
        'h-5',
        TokenUtils.getSpacingClass('px', 'xs'),
        'py-0.5',
        TokenUtils.getTextSizeClass('xs')
      ].join(' '),
      icon: 14,
      removeIcon: 'w-3 h-3',
      removeButton: 'w-4 h-4'
    },
    sm: {
      base: [
        'h-6',
        TokenUtils.getSpacingClass('px', 'sm'),
        TokenUtils.getSpacingClass('py', 'xs'),
        TokenUtils.getTextSizeClass('xs')
      ].join(' '),
      icon: 14,
      removeIcon: 'w-3 h-3',
      removeButton: 'w-4 h-4'
    },
    md: {
      base: [
        'h-7 px-2.5',
        TokenUtils.getSpacingClass('py', 'xs'),
        TokenUtils.getTextSizeClass('sm')
      ].join(' '),
      icon: 16,
      removeIcon: 'w-3.5 h-3.5',
      removeButton: 'w-4 h-4'
    },
    lg: {
      base: [
        'h-8',
        TokenUtils.getSpacingClass('px', 'sm'),
        TokenUtils.getSpacingClass('py', 'xs'),
        TokenUtils.getTextSizeClass('base')
      ].join(' '),
      icon: 20,
      removeIcon: 'w-4 h-4',
      removeButton: 'w-5 h-5'
    }
  },
  
  shapes: {
    rounded: TokenUtils.getRadiusClass('md'),
    pill: TokenUtils.getRadiusClass('full'),
    square: TokenUtils.getRadiusClass('none')
  },
  
  iconSpacing: {
    leading: TokenUtils.getSpacingClass('mr', 'xs'),
    trailing: TokenUtils.getSpacingClass('ml', 'xs')
  },
  
  removeButton: {
    base: [
      TokenUtils.getSpacingClass('ml', 'xs'),
      'inline-flex items-center justify-center hover:opacity-80 transition-opacity'
    ].join(' ')
  },
  
  disabled: 'opacity-50 cursor-not-allowed'
} as const;

// ========================================================================
// SPINNER CLASSES
// ========================================================================
export const spinnerClasses = {
  wrapper: 'inline-flex items-center justify-center',
  
  svg: 'animate-spin',
  
  sizes: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  },
  
  barSizes: {
    xs: 'w-0.5 h-2',
    sm: 'w-0.5 h-3',
    md: 'w-1 h-4',
    lg: 'w-1 h-5',
    xl: 'w-1.5 h-6'
  },
  
  colors: {
    primary: TokenUtils.getColorClass('text', 'primary.600'),
    secondary: TokenUtils.getColorClass('text', 'neutral.600'),
    success: TokenUtils.getColorClass('text', 'success.600'),
    warning: TokenUtils.getColorClass('text', 'warning.600'),
    error: TokenUtils.getColorClass('text', 'error.600'),
    white: 'text-white',
    current: 'text-current'
  }
} as const;

// ========================================================================
// SKELETON CLASSES
// ========================================================================
export const skeletonClasses = {
  base: 'bg-gray-200 dark:bg-gray-700',
  
  animations: {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden skeleton-wave',
    none: ''
  },
  
  variants: {
    text: {
      base: 'h-4 rounded',
      sizes: {
        sm: 'h-3',
        md: 'h-4',
        lg: 'h-5',
        xl: 'h-6'
      }
    },
    circular: 'rounded-full',
    rectangular: {
      base: '',
      rounded: 'rounded-lg',
      square: 'rounded'
    },
    button: 'h-9 rounded-md'
  }
} as const;

// ========================================================================
// PROGRESS BAR CLASSES
// ========================================================================
export const progressBarClasses = {
  linear: {
    track: {
      base: [
        'w-full',
        TokenUtils.getColorClass('bg', 'neutral.200'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.700'),
        TokenUtils.getRadiusClass('full'),
        'overflow-hidden'
      ].join(' '),
      
      sizes: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
      }
    },
    
    bar: {
      base: [
        'h-full',
        TokenUtils.getRadiusClass('full'),
        'transition-all duration-500 ease-out'
      ].join(' '),
      
      colors: {
        primary: TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
        success: TokenUtils.getColorClass('bg', 'success.500'),
        warning: TokenUtils.getColorClass('bg', 'warning.500'),
        error: TokenUtils.getColorClass('bg', 'error.500'),
        info: TokenUtils.getColorClass('bg', 'info.500')
      }
    }
  },
  
  circular: {
    container: {
      base: 'relative',
      sizes: {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32'
      }
    },
    
    svg: 'w-full h-full transform -rotate-90',
    
    bar: {
      base: 'transition-all duration-500 ease-out',
      colors: {
        primary: 'stroke-primary',
        success: 'stroke-green-500',
        warning: 'stroke-amber-500',
        error: 'stroke-red-500',
        info: 'stroke-blue-500'
      }
    },
    
    label: {
      base: [
        TokenUtils.getFontWeightClass('medium'),
        TokenUtils.getColorClass('text', 'neutral.700'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
      ].join(' '),
      
      sizes: {
        sm: TokenUtils.getTextSizeClass('xs'),
        md: TokenUtils.getTextSizeClass('sm'),
        lg: TokenUtils.getTextSizeClass('base')
      }
    }
  },
  
  label: [
    TokenUtils.getTextSizeClass('sm'),
    TokenUtils.getFontWeightClass('medium'),
    TokenUtils.getColorClass('text', 'neutral.700'),
    'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
  ].join(' ')
} as const;

// ========================================================================
// SELECT CLASSES
// ========================================================================
export const selectClasses = {
  container: 'w-full',
  
  label: {
    base: 'block text-sm font-medium mb-1',
    default: [
      TokenUtils.getColorClass('text', 'neutral.700'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.300')
    ].join(' '),
    error: TokenUtils.getColorClass('text', 'error.600'),
    disabled: [
      TokenUtils.getColorClass('text', 'neutral.500'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.500')
    ].join(' ')
  },
  
  selectWrapper: 'relative',
  
  select: {
    base: [
      'block w-full rounded-md border',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2',
      'appearance-none pr-10 cursor-pointer'
    ].join(' '),
    
    states: {
      default: [
        TokenUtils.getColorClass('border', 'neutral.300'),
        'dark:' + TokenUtils.getColorClass('border', 'neutral.600'),
        TokenUtils.getColorClass('bg', 'white'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
        TokenUtils.getColorClass('text', 'neutral.900'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.100'),
        'focus:' + TokenUtils.getColorClass('border', 'primary.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'primary.500')
      ].join(' '),
      
      error: [
        TokenUtils.getColorClass('border', 'error.300'),
        TokenUtils.getColorClass('bg', 'white'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
        TokenUtils.getColorClass('text', 'error.900'),
        'dark:' + TokenUtils.getColorClass('text', 'error.400'),
        'focus:' + TokenUtils.getColorClass('border', 'error.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'error.500')
      ].join(' '),
      
      success: [
        TokenUtils.getColorClass('border', 'success.300'),
        TokenUtils.getColorClass('bg', 'white'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.800'),
        TokenUtils.getColorClass('text', 'neutral.900'),
        'dark:' + TokenUtils.getColorClass('text', 'neutral.100'),
        'focus:' + TokenUtils.getColorClass('border', 'success.500'),
        'focus:' + TokenUtils.getColorClass('ring', 'success.500')
      ].join(' '),
      
      disabled: [
        'bg-gray-50 dark:bg-gray-900',
        'text-gray-500 cursor-not-allowed',
        TokenUtils.getColorClass('border', 'neutral.300'),
        'dark:' + TokenUtils.getColorClass('border', 'neutral.600')
      ].join(' ')
    },
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  
  dropdownIcon: {
    container: [
      'absolute inset-y-0 right-0',
      TokenUtils.getSpacingClass('pr', 'sm'),
      'flex items-center pointer-events-none'
    ].join(' '),
    
    icon: [
      'h-5 w-5',
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' ')
  },
  
  helperText: {
    base: 'mt-1 text-sm flex items-start',
    default: [
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),
    error: TokenUtils.getColorClass('text', 'error.600'),
    success: TokenUtils.getColorClass('text', 'success.600')
  },
  
  errorIcon: 'w-4 h-4 mr-1 inline-flex flex-shrink-0',
  
  requiredAsterisk: [
    TokenUtils.getColorClass('text', 'error.500'),
    TokenUtils.getSpacingClass('ml', 'xs')
  ].join(' ')
} as const;

// ========================================================================
// LINK CLASSES
// ========================================================================
export const linkClasses = {
  base: [
    'inline-flex items-center',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'focus:' + TokenUtils.getColorClass('ring', 'primary'),
    TokenUtils.getRadiusClass('base')
  ].join(' '),
  
  variants: {
    default: [
      TokenUtils.getColorClass('text', 'info.600'),
      'hover:' + TokenUtils.getColorClass('text', 'info.700'),
      'dark:' + TokenUtils.getColorClass('text', 'info.500'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'info.400')
    ].join(' '),
    
    primary: [
      TokenUtils.getColorClass('text', 'primary'),
      'hover:' + TokenUtils.getColorClass('text', 'primary.600')
    ].join(' '),
    
    muted: [
      TokenUtils.getColorClass('text', 'neutral.600'),
      'hover:' + TokenUtils.getColorClass('text', 'neutral.900'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400'),
      'dark:hover:' + TokenUtils.getColorClass('text', 'neutral.200')
    ].join(' ')
  },
  
  sizes: {
    sm: TokenUtils.getTextSizeClass('sm'),
    md: TokenUtils.getTextSizeClass('base'),
    lg: TokenUtils.getTextSizeClass('lg')
  },
  
  underline: 'hover:underline',
  
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  
  externalIcon: [
    TokenUtils.getSpacingClass('ml', 'xs'),
    'inline-block'
  ].join(' ')
} as const;

// ========================================================================
// DIVIDER CLASSES
// ========================================================================
export const dividerClasses = {
  base: 'relative',
  
  orientation: {
    horizontal: {
      base: 'w-full border-t',
      withLabel: 'flex items-center'
    },
    vertical: {
      base: 'h-full inline-block border-l',
      withLabel: 'flex flex-col items-center justify-center'
    }
  },
  
  spacing: {
    horizontal: {
      sm: TokenUtils.getSpacingClass('my', 'sm'),
      md: TokenUtils.getSpacingClass('my', 'md'),
      lg: TokenUtils.getSpacingClass('my', 'lg')
    },
    vertical: {
      sm: TokenUtils.getSpacingClass('mx', 'sm'),
      md: TokenUtils.getSpacingClass('mx', 'md'),
      lg: TokenUtils.getSpacingClass('mx', 'lg')
    }
  },
  
  variants: {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted'
  },
  
  colors: {
    default: [
      TokenUtils.getColorClass('border', 'neutral.300'),
      'dark:' + TokenUtils.getColorClass('border', 'neutral.600')
    ].join(' ')
  },
  
  label: {
    base: [
      TokenUtils.getColorClass('bg', 'white'),
      'dark:' + TokenUtils.getColorClass('bg', 'neutral.900'),
      TokenUtils.getTextSizeClass('sm'),
      TokenUtils.getColorClass('text', 'neutral.600'),
      'dark:' + TokenUtils.getColorClass('text', 'neutral.400')
    ].join(' '),
    
    horizontal: [
      TokenUtils.getSpacingClass('px', 'md'),
      'absolute left-1/2 -translate-x-1/2 -top-3'
    ].join(' '),
    
    vertical: [
      TokenUtils.getSpacingClass('py', 'sm'),
      'absolute top-1/2 -translate-y-1/2 whitespace-nowrap'
    ].join(' ')
  }
} as const;

// ========================================================================
// LOGO CLASSES
// ========================================================================
export const logoClasses = {
  container: {
    base: 'logo-container',
    variants: {
      horizontal: '',
      vertical: '',
      icon: ''
    }
  },
  
  image: {
    base: TokenUtils.getTransitionClass('slow', 'all')
  },
  
  verticalLogo: {
    container: 'flex flex-col items-center gap-2',
    text: {
      base: TokenUtils.getFontWeightClass('semibold'),
      sizes: {
        xs: [
          TokenUtils.getTextSizeClass('xs'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white')
        ].join(' '),
        sm: [
          TokenUtils.getTextSizeClass('sm'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white')
        ].join(' '),
        md: [
          TokenUtils.getTextSizeClass('base'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white')
        ].join(' '),
        lg: [
          TokenUtils.getTextSizeClass('lg'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white')
        ].join(' '),
        xl: [
          TokenUtils.getTextSizeClass('xl'),
          TokenUtils.getColorClass('text', 'neutral.900'),
          'dark:' + TokenUtils.getColorClass('text', 'white')
        ].join(' ')
      }
    }
  },
  
  iconLogo: {
    container: [
      'flex items-center justify-center',
      'bg-gradient-to-br from-primary to-primary-600',
      TokenUtils.getRadiusClass('lg'),
      'aspect-square'
    ].join(' '),
    text: {
      base: [
        TokenUtils.getFontWeightClass('bold'),
        TokenUtils.getColorClass('text', 'white')
      ].join(' '),
      sizes: {
        xs: [
          TokenUtils.getTextSizeClass('xs'),
          TokenUtils.getSpacingClass('p', 'xs')
        ].join(' '),
        sm: [
          TokenUtils.getTextSizeClass('sm'),
          TokenUtils.getSpacingClass('p', 'sm')
        ].join(' '),
        md: [
          TokenUtils.getTextSizeClass('base'),
          'p-2.5'
        ].join(' '),
        lg: [
          TokenUtils.getTextSizeClass('lg'),
          TokenUtils.getSpacingClass('p', 'sm')
        ].join(' '),
        xl: [
          TokenUtils.getTextSizeClass('xl'),
          TokenUtils.getSpacingClass('p', 'md')
        ].join(' ')
      }
    }
  }
} as const;
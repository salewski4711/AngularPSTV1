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
            TokenUtils.getColorClass('bg', 'secondary.DEFAULT'),
            TokenUtils.getColorClass('text', 'white'),
            'hover:' + TokenUtils.getColorClass('bg', 'secondary.600'),
            'active:' + TokenUtils.getColorClass('bg', 'secondary.700'),
            'focus:' + TokenUtils.getColorClass('ring', 'secondary.500')
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
};
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
};
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
};
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
};
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
};
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
};
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
    }
};
// ========================================================================
// TAG CLASSES
// ========================================================================
export const tagClasses = {
    base: [
        'inline-flex items-center font-medium uppercase tracking-wider',
        'transition-colors duration-200'
    ].join(' '),
    variants: {
        default: [
            TokenUtils.getColorClass('bg', 'neutral.100'),
            TokenUtils.getColorClass('text', 'neutral.700'),
            'hover:' + TokenUtils.getColorClass('bg', 'neutral.200')
        ].join(' '),
        primary: [
            TokenUtils.getColorClass('bg', 'primary.DEFAULT'),
            TokenUtils.getColorClass('text', 'white'),
            'hover:' + TokenUtils.getColorClass('bg', 'primary.600')
        ].join(' '),
        success: [
            TokenUtils.getColorClass('bg', 'success.100'),
            TokenUtils.getColorClass('text', 'success.700'),
            'hover:' + TokenUtils.getColorClass('bg', 'success.200')
        ].join(' '),
        warning: [
            TokenUtils.getColorClass('bg', 'warning.100'),
            TokenUtils.getColorClass('text', 'warning.700'),
            'hover:' + TokenUtils.getColorClass('bg', 'warning.200')
        ].join(' '),
        error: [
            TokenUtils.getColorClass('bg', 'error.100'),
            TokenUtils.getColorClass('text', 'error.700'),
            'hover:' + TokenUtils.getColorClass('bg', 'error.200')
        ].join(' ')
    },
    sizes: {
        xs: 'px-1.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base'
    },
    shapes: {
        rounded: TokenUtils.getRadiusClass('md'),
        pill: TokenUtils.getRadiusClass('full'),
        square: TokenUtils.getRadiusClass('none')
    }
};
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
    colors: {
        primary: TokenUtils.getColorClass('text', 'primary.600'),
        secondary: TokenUtils.getColorClass('text', 'neutral.600'),
        success: TokenUtils.getColorClass('text', 'success.600'),
        warning: TokenUtils.getColorClass('text', 'warning.600'),
        error: TokenUtils.getColorClass('text', 'error.600'),
        white: 'text-white',
        current: 'text-current'
    }
};
// ========================================================================
// SKELETON CLASSES
// ========================================================================
export const skeletonClasses = {
    base: [
        'animate-pulse',
        TokenUtils.getColorClass('bg', 'neutral.200'),
        'dark:' + TokenUtils.getColorClass('bg', 'neutral.700')
    ].join(' '),
    shapes: {
        text: 'h-4 rounded',
        title: 'h-6 rounded',
        paragraph: 'h-20 rounded',
        avatar: 'rounded-full',
        button: 'h-10 rounded-md',
        card: 'h-32 rounded-lg',
        image: 'h-48 rounded-lg'
    }
};
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
};

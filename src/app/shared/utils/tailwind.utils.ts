import { TokenUtils } from '../../core/design-system/token-utilities';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const formClasses = {
  label: {
    base: `${TokenUtils.getTextSizeClass('sm')} ${TokenUtils.getFontWeightClass('medium')} ${TokenUtils.getSpacingClass('mb', 'xs')} block`,
    default: `${TokenUtils.getColorClass('text', 'neutral.900')} dark:${TokenUtils.getColorClass('text', 'neutral.100')}`,
    error: `${TokenUtils.getColorClass('text', 'error.600')} dark:${TokenUtils.getColorClass('text', 'error.500')}`,
    disabled: `${TokenUtils.getColorClass('text', 'neutral.500')} dark:${TokenUtils.getColorClass('text', 'neutral.500')}`
  },
  
  helperText: {
    base: `${TokenUtils.getTextSizeClass('xs')} ${TokenUtils.getSpacingClass('mt', 'xs')}`,
    default: `${TokenUtils.getColorClass('text', 'neutral.600')} dark:${TokenUtils.getColorClass('text', 'neutral.400')}`,
    error: TokenUtils.getColorClass('text', 'error.500'),
    success: `${TokenUtils.getColorClass('text', 'success.600')} dark:${TokenUtils.getColorClass('text', 'success.500')}`
  },
  
  input: {
    base: `w-full ${TokenUtils.getTextSizeClass('sm')} ${TokenUtils.getRadiusClass('md')} transition-colors focus:outline-none`,
    default: `${TokenUtils.getColorClass('bg', 'white')} dark:${TokenUtils.getColorClass('bg', 'neutral.700')} border ${TokenUtils.getColorClass('border', 'neutral.300')} dark:${TokenUtils.getColorClass('border', 'neutral.600')} hover:${TokenUtils.getColorClass('border', 'neutral.400')} dark:hover:${TokenUtils.getColorClass('border', 'neutral.500')} focus:${TokenUtils.getColorClass('border', 'primary')} focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'primary')} focus:ring-opacity-25 ${TokenUtils.getColorClass('text', 'neutral.900')} dark:${TokenUtils.getColorClass('text', 'neutral.100')} placeholder-gray-500 dark:placeholder-gray-400`,
    error: `${TokenUtils.getColorClass('bg', 'white')} dark:${TokenUtils.getColorClass('bg', 'neutral.700')} border ${TokenUtils.getColorClass('border', 'error.500')} focus:${TokenUtils.getColorClass('border', 'error.500')} focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'error.500')} focus:ring-opacity-25 ${TokenUtils.getColorClass('text', 'neutral.900')} dark:${TokenUtils.getColorClass('text', 'neutral.100')}`,
    success: `${TokenUtils.getColorClass('bg', 'white')} dark:${TokenUtils.getColorClass('bg', 'neutral.700')} border ${TokenUtils.getColorClass('border', 'success.500')} focus:${TokenUtils.getColorClass('border', 'success.500')} focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'success.500')} focus:ring-opacity-25 ${TokenUtils.getColorClass('text', 'neutral.900')} dark:${TokenUtils.getColorClass('text', 'neutral.100')}`,
    disabled: `${TokenUtils.getColorClass('bg', 'neutral.100')} dark:${TokenUtils.getColorClass('bg', 'neutral.800')} border ${TokenUtils.getColorClass('border', 'neutral.300')} dark:${TokenUtils.getColorClass('border', 'neutral.600')} ${TokenUtils.getColorClass('text', 'neutral.500')} dark:${TokenUtils.getColorClass('text', 'neutral.500')} cursor-not-allowed`,
    readonly: `${TokenUtils.getColorClass('bg', 'neutral.50')} dark:${TokenUtils.getColorClass('bg', 'neutral.800')} border ${TokenUtils.getColorClass('border', 'neutral.300')} dark:${TokenUtils.getColorClass('border', 'neutral.600')} ${TokenUtils.getColorClass('text', 'neutral.900')} dark:${TokenUtils.getColorClass('text', 'neutral.100')} cursor-default`
  },
  
  sizes: {
    sm: `h-8 ${TokenUtils.getSpacingClass('px', 'sm')} ${TokenUtils.getSpacingClass('py', 'xs')}`,
    md: `h-10 ${TokenUtils.getSpacingClass('px', 'sm')} ${TokenUtils.getSpacingClass('py', 'sm')}`,
    lg: `h-12 ${TokenUtils.getSpacingClass('px', 'md')} ${TokenUtils.getSpacingClass('py', 'sm')}`
  },
  
  checkbox: {
    base: `${TokenUtils.getColorClass('text', 'primary')} ${TokenUtils.getColorClass('border', 'neutral.300')} dark:${TokenUtils.getColorClass('border', 'neutral.600')} ${TokenUtils.getRadiusClass('base')} focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'primary')} focus:ring-opacity-25`,
    sizes: {
      sm: `w-4 h-4`,
      md: `w-5 h-5`,
      lg: `w-6 h-6`
    }
  },
  
  radio: {
    base: `${TokenUtils.getColorClass('text', 'primary')} ${TokenUtils.getColorClass('border', 'neutral.300')} dark:${TokenUtils.getColorClass('border', 'neutral.600')} focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'primary')} focus:ring-opacity-25`
  },
  
  toggle: {
    container: {
      base: `relative inline-flex items-center ${TokenUtils.getRadiusClass('full')} transition-colors focus:outline-none focus:ring-2 focus:${TokenUtils.getColorClass('ring', 'primary')} focus:ring-offset-2`,
      on: TokenUtils.getColorClass('bg', 'primary'),
      off: `${TokenUtils.getColorClass('bg', 'neutral.300')} dark:${TokenUtils.getColorClass('bg', 'neutral.600')}`
    },
    handle: {
      base: `inline-block transform ${TokenUtils.getRadiusClass('full')} ${TokenUtils.getColorClass('bg', 'white')} transition-transform`,
      sizes: {
        sm: { container: 'h-5 w-9', handle: 'h-4 w-4', translate: { on: 'translate-x-4', off: 'translate-x-1' } },
        md: { container: 'h-6 w-11', handle: 'h-5 w-5', translate: { on: 'translate-x-5', off: 'translate-x-1' } },
        lg: { container: 'h-7 w-14', handle: 'h-6 w-6', translate: { on: 'translate-x-7', off: 'translate-x-1' } }
      }
    }
  }
};
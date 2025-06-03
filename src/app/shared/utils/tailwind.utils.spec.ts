import { cn } from './tailwind.utils';

describe('Tailwind Utils', () => {
  describe('cn function', () => {
    it('should combine class strings', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      const result = cn('class1', null, 'class2', undefined, false, 'class3', '');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle all falsy inputs', () => {
      const result = cn(null, undefined, false, '');
      expect(result).toBe('');
    });

    it('should preserve spaces within class strings', () => {
      const result = cn('text-sm font-medium', 'bg-red-500 text-white');
      expect(result).toBe('text-sm font-medium bg-red-500 text-white');
    });

    it('should work with conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      );
      
      expect(result).toBe('base-class active-class');
    });

    it('should handle complex conditional logic', () => {
      const variant = 'primary';
      const size = 'md';
      
      const result = cn(
        'button',
        variant === 'primary' && 'bg-orange-500',
        variant === 'secondary' && 'bg-blue-500',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg'
      );
      
      expect(result).toBe('button bg-orange-500 text-base');
    });

    it('should handle arrays of classes', () => {
      const classes = ['class1', 'class2', 'class3'];
      const result = cn(...classes);
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle mixed types', () => {
      const condition1 = true;
      const condition2 = false;
      
      const result = cn(
        'always-present',
        condition1 ? 'conditional-1' : null,
        condition2 ? 'conditional-2' : undefined,
        condition1 && condition2 && 'both-true',
        !condition2 && 'not-condition-2'
      );
      
      expect(result).toBe('always-present conditional-1 not-condition-2');
    });
  });
});
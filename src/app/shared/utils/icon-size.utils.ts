export type IconSizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const iconSizeMap: Record<IconSizeVariant, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48
};

export function getIconSize(size: IconSizeVariant | number): number {
  if (typeof size === 'number') {
    return size;
  }
  return iconSizeMap[size] || iconSizeMap.md;
}
/**
 * Central export for all component class definitions.
 * These static classes are generated at build time to avoid runtime template interpolation.
 * 
 * Usage in components:
 * ```typescript
 * import { buttonClasses, inputClasses } from '@core/design-system/component-classes';
 * ```
 */

// Export all atom classes
export * from './atoms.classes';

// Export all molecule classes  
export * from './molecules.classes.static';

// Export all organism classes
export * from './organisms.classes';
export * from './dashboard-widget.classes';

// Re-export commonly used combinations for convenience
export { buttonClasses, inputClasses, badgeClasses, linkClasses } from './atoms.classes';
export { cardClasses, modalClasses, dropdownClasses, alertClasses } from './molecules.classes.static';
export { navigationClasses, tableClasses, entityListViewClasses } from './organisms.classes';
export { dashboardWidgetClasses } from './dashboard-widget.classes';
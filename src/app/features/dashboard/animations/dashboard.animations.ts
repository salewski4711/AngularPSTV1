import { trigger, transition, style, animate, query, stagger, animateChild, group } from '@angular/animations';

/**
 * Dashboard Animation Definitionen
 * Smooth transitions für Widget-Navigation
 */

// Widget List Animation - Staggered entrance
export const widgetListAnimation = trigger('widgetList', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0, 
        transform: 'translateY(20px) scale(0.95)' 
      }),
      stagger('50ms', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ 
            opacity: 1, 
            transform: 'translateY(0) scale(1)' 
          })
        )
      ])
    ], { optional: true }),
    query(':leave', [
      stagger('30ms', [
        animate('200ms cubic-bezier(0.4, 0, 1, 1)', 
          style({ 
            opacity: 0, 
            transform: 'translateY(-10px) scale(0.95)' 
          })
        )
      ])
    ], { optional: true })
  ])
]);

// Individual Widget Animation
export const widgetAnimation = trigger('widget', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'scale(0.9)' 
    }),
    animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({ 
        opacity: 1, 
        transform: 'scale(1)' 
      })
    )
  ]),
  transition(':leave', [
    animate('200ms cubic-bezier(0.4, 0, 1, 1)', 
      style({ 
        opacity: 0, 
        transform: 'scale(0.95)' 
      })
    )
  ])
]);

// Widget Hover Animation
export const widgetHoverAnimation = trigger('widgetHover', [
  transition('idle => hover', [
    animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({ 
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      })
    )
  ]),
  transition('hover => idle', [
    animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({ 
        transform: 'translateY(0) scale(1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      })
    )
  ])
]);

// Page Transition Animation
export const pageTransition = trigger('pageTransition', [
  transition('* => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 1, 1)', 
          style({ 
            opacity: 0,
            transform: 'translateX(-20px)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ 
          opacity: 0,
          transform: 'translateX(20px)'
        }),
        animate('300ms 100ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ 
            opacity: 1,
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ])
]);

// Trend Animation for Stats
export const trendAnimation = trigger('trend', [
  transition(':enter', [
    style({ 
      opacity: 0, 
      transform: 'translateY(10px)' 
    }),
    animate('400ms 200ms cubic-bezier(0.4, 0, 0.2, 1)', 
      style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })
    )
  ])
]);

// Badge Pulse Animation
export const badgePulse = trigger('badgePulse', [
  transition(':enter', [
    animate('1000ms', 
      style({ 
        transform: 'scale(1.3)',
        opacity: 0.5
      })
    )
  ])
]);

// Loading Skeleton Animation
export const skeletonPulse = trigger('skeletonPulse', [
  transition('* => *', [
    animate('1500ms ease-in-out', 
      style({ 
        opacity: 0.5
      })
    ),
    animate('1500ms ease-in-out', 
      style({ 
        opacity: 1
      })
    )
  ])
]);
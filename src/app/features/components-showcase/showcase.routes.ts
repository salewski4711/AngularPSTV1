import { Routes } from '@angular/router';
import { ShowcaseLayoutComponent } from './layout/showcase-layout.component';

export const showcaseRoutes: Routes = [
  {
    path: '',
    component: ShowcaseLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'atoms/button',
        pathMatch: 'full'
      },
      {
        path: 'atoms',
        children: [
          {
            path: 'button',
            loadComponent: () => import('./pages/atoms/button-showcase/button-showcase.component').then(m => m.ButtonShowcaseComponent)
          },
          {
            path: 'input',
            loadComponent: () => import('./pages/atoms/input-showcase/input-showcase.component').then(m => m.InputShowcaseComponent)
          },
          {
            path: 'checkbox',
            loadComponent: () => import('./pages/atoms/checkbox-showcase/checkbox-showcase.component').then(m => m.CheckboxShowcaseComponent)
          },
          {
            path: 'radio',
            loadComponent: () => import('./pages/atoms/radio-showcase/radio-showcase.component').then(m => m.RadioShowcaseComponent)
          },
          {
            path: 'toggle',
            loadComponent: () => import('./pages/atoms/toggle-showcase/toggle-showcase.component').then(m => m.ToggleShowcaseComponent)
          },
          {
            path: 'select',
            loadComponent: () => import('./pages/atoms/select-showcase/select-showcase.component').then(m => m.SelectShowcaseComponent)
          },
          {
            path: 'badge',
            loadComponent: () => import('./pages/atoms/badge-showcase/badge-showcase.component').then(m => m.BadgeShowcaseComponent)
          },
          {
            path: 'avatar',
            loadComponent: () => import('./pages/atoms/avatar-showcase/avatar-showcase.component').then(m => m.AvatarShowcaseComponent)
          },
          {
            path: 'icon',
            loadComponent: () => import('./pages/atoms/icon-showcase/icon-showcase.component').then(m => m.IconShowcaseComponent)
          },
          {
            path: 'logo',
            loadComponent: () => import('./pages/atoms/logo-showcase/logo-showcase.component').then(m => m.LogoShowcaseComponent)
          },
          {
            path: 'spinner',
            loadComponent: () => import('./pages/atoms/spinner-showcase/spinner-showcase.component').then(m => m.SpinnerShowcaseComponent)
          },
          {
            path: 'divider',
            loadComponent: () => import('./pages/atoms/divider-showcase/divider-showcase.component').then(m => m.DividerShowcaseComponent)
          },
          {
            path: 'tag',
            loadComponent: () => import('./pages/atoms/tag-showcase/tag-showcase.component').then(m => m.TagShowcaseComponent)
          },
          {
            path: 'tooltip',
            loadComponent: () => import('./pages/atoms/tooltip-showcase/tooltip-showcase.component').then(m => m.TooltipShowcaseComponent)
          },
          {
            path: 'typography',
            loadComponent: () => import('./pages/atoms/typography-showcase/typography-showcase.component').then(m => m.TypographyShowcaseComponent)
          },
          {
            path: 'link',
            loadComponent: () => import('./pages/atoms/link-showcase/link-showcase.component').then(m => m.LinkShowcaseComponent)
          },
          {
            path: 'progress-bar',
            loadComponent: () => import('./pages/atoms/progress-bar-showcase/progress-bar-showcase.component').then(m => m.ProgressBarShowcaseComponent)
          },
          {
            path: 'skeleton',
            loadComponent: () => import('./pages/atoms/skeleton-showcase/skeleton-showcase.component').then(m => m.SkeletonShowcaseComponent)
          }
        ]
      },
      {
        path: 'molecules',
        children: [
          {
            path: 'card',
            loadComponent: () => import('./pages/molecules/card-showcase/card-showcase.component').then(m => m.CardShowcaseComponent)
          },
          {
            path: 'button-group',
            loadComponent: () => import('./pages/molecules/button-group-showcase/button-group-showcase.component').then(m => m.ButtonGroupShowcaseComponent)
          }
        ]
      },
      {
        path: 'organisms',
        children: [
          // Future organisms will be added here
        ]
      },
      {
        path: 'playground-demo',
        loadComponent: () => import('./pages/playground-demo.component').then(m => m.PlaygroundDemoComponent),
        data: { title: 'Playground Demo' }
      }
    ]
  }
];
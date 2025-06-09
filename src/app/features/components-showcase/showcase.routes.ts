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
            path: 'alert',
            loadComponent: () => import('./pages/molecules/alert-showcase/alert-showcase.component').then(m => m.AlertShowcaseComponent)
          },
          {
            path: 'form-field',
            loadComponent: () => import('./pages/molecules/form-field-showcase/form-field-showcase.component').then(m => m.FormFieldShowcaseComponent)
          },
          {
            path: 'card',
            loadComponent: () => import('./pages/molecules/card-showcase/card-showcase.component').then(m => m.CardShowcaseComponent)
          },
          {
            path: 'dashboard-widget',
            loadComponent: () => import('./pages/molecules/dashboard-widget-showcase/dashboard-widget-showcase.component').then(m => m.DashboardWidgetShowcaseComponent)
          },
          {
            path: 'button-group',
            loadComponent: () => import('./pages/molecules/button-group-showcase/button-group-showcase.component').then(m => m.ButtonGroupShowcaseComponent)
          },
          {
            path: 'modal',
            loadComponent: () => import('./pages/molecules/modal-showcase/modal-showcase.component').then(m => m.ModalShowcaseComponent)
          },
          {
            path: 'tabs',
            loadComponent: () => import('./pages/molecules/tabs-showcase/tabs-showcase.component').then(m => m.TabsShowcaseComponent)
          },
          {
            path: 'breadcrumb',
            loadComponent: () => import('./pages/molecules/breadcrumb-showcase/breadcrumb-showcase.component').then(m => m.BreadcrumbShowcaseComponent)
          },
          {
            path: 'file-upload',
            loadComponent: () => import('./pages/molecules/file-upload-showcase/file-upload-showcase.component').then(m => m.FileUploadShowcaseComponent)
          },
          {
            path: 'dropdown',
            loadComponent: () => import('./pages/molecules/dropdown-showcase/dropdown-showcase.component').then(m => m.DropdownShowcaseComponent)
          },
          {
            path: 'accordion',
            loadComponent: () => import('./pages/molecules/accordion-showcase/accordion-showcase.component').then(m => m.AccordionShowcaseComponent)
          },
          {
            path: 'pagination',
            loadComponent: () => import('./pages/molecules/pagination-showcase/pagination-showcase.component').then(m => m.PaginationShowcaseComponent)
          },
          {
            path: 'date-picker',
            loadComponent: () => import('./pages/molecules/date-picker-showcase/date-picker-showcase.component').then(m => m.DatePickerShowcaseComponent)
          },
          {
            path: 'time-picker',
            loadComponent: () => import('./pages/molecules/time-picker-showcase/time-picker-showcase.component').then(m => m.TimePickerShowcaseComponent)
          },
          {
            path: 'bottom-navigation',
            loadComponent: () => import('./pages/molecules/bottom-navigation-showcase/bottom-navigation-showcase.component').then(m => m.BottomNavigationShowcaseComponent)
          },
          {
            path: 'notifications',
            loadComponent: () => import('./pages/molecules/notifications-showcase/notifications-showcase.component').then(m => m.NotificationsShowcaseComponent)
          },
          {
            path: 'search-modal',
            loadComponent: () => import('./pages/molecules/search-modal-showcase/search-modal-showcase.component').then(m => m.SearchModalShowcaseComponent)
          },
          {
            path: 'user-menu',
            loadComponent: () => import('./pages/molecules/user-menu-showcase/user-menu-showcase.component').then(m => m.UserMenuShowcaseComponent)
          }
        ]
      },
      {
        path: 'organisms',
        children: [
          {
            path: 'top-navigation',
            loadComponent: () => import('./pages/organisms/top-navigation-showcase/top-navigation-showcase.component').then(m => m.TopNavigationShowcaseComponent)
          },
          {
            path: 'mobile-menu',
            loadComponent: () => import('./pages/organisms/mobile-menu-showcase/mobile-menu-showcase.component').then(m => m.MobileMenuShowcaseComponent)
          },
          {
            path: 'stepper',
            loadComponent: () => import('./pages/organisms/stepper-showcase/stepper-showcase.component').then(m => m.StepperShowcaseComponent)
          },
          {
            path: 'search',
            loadComponent: () => import('./pages/organisms/search-showcase/search-showcase.component').then(m => m.SearchShowcaseComponent)
          }
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
import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LogoVariant = 'horizontal' | 'vertical' | 'icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <ng-container [ngSwitch]="variant">
        <!-- Horizontal Logo -->
        <ng-container *ngSwitchCase="'horizontal'">
          <img 
            [src]="logoSrc" 
            [alt]="alt"
            [class]="logoClasses"
            [style.height.px]="height"
          />
        </ng-container>

        <!-- Vertical Logo -->
        <ng-container *ngSwitchCase="'vertical'">
          <div class="vertical-logo">
            <img 
              [src]="iconSrc" 
              [alt]="alt + ' Icon'"
              [class]="iconClasses"
              [style.height.px]="iconHeight"
            />
            <span [class]="textClasses">ProSolarTec</span>
          </div>
        </ng-container>

        <!-- Icon Only -->
        <ng-container *ngSwitchCase="'icon'">
          <div class="icon-logo">
            <span [class]="pstClasses">PST</span>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .vertical-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .icon-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--primary-gradient, linear-gradient(135deg, #F99600 0%, #FF7A00 100%));
      border-radius: 0.5rem;
      aspect-ratio: 1;
    }
  `]
})
export class LogoComponent {
  @Input() size: LogoSize = 'md';
  @Input() variant: LogoVariant = 'horizontal';
  @Input() alt = 'ProSolarTec Logo';
  @Input() customClass = '';
  
  private themeService = inject(ThemeService);
  
  // Logo paths
  private readonly logoLight = '/logos/pst_blau.svg';
  private readonly logoDark = '/logos/pst_weiss.svg';
  private readonly iconLight = '/icons/pst-icon-blau.svg';
  private readonly iconDark = '/icons/pst-icon-weiss.svg';
  
  get logoSrc(): string {
    return this.themeService.isDarkMode() ? this.logoDark : this.logoLight;
  }

  get iconSrc(): string {
    return this.themeService.isDarkMode() ? this.iconDark : this.iconLight;
  }
  
  get containerClasses(): string {
    return `logo-container ${this.variant} ${this.customClass}`.trim();
  }

  get logoClasses(): string {
    return 'transition-all duration-300';
  }

  get iconClasses(): string {
    return 'transition-all duration-300';
  }

  get textClasses(): string {
    const sizeMap = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    };
    return `font-semibold ${sizeMap[this.size]} text-gray-900 dark:text-white`;
  }

  get pstClasses(): string {
    const sizeMap = {
      xs: 'text-xs p-1.5',
      sm: 'text-sm p-2',
      md: 'text-base p-2.5',
      lg: 'text-lg p-3',
      xl: 'text-xl p-4'
    };
    return `font-bold text-white ${sizeMap[this.size]}`;
  }
  
  get height(): number {
    const sizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
    return sizes[this.size];
  }

  get iconHeight(): number {
    const sizes = { xs: 32, sm: 40, md: 48, lg: 56, xl: 72 };
    return sizes[this.size];
  }

  get iconSize(): number {
    const sizes = { xs: 32, sm: 40, md: 48, lg: 56, xl: 72 };
    return sizes[this.size];
  }
}
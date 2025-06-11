import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { logoClasses } from '../../../core/design-system/component-classes/atoms.classes';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LogoVariant = 'horizontal' | 'vertical' | 'icon';

@Component({
  selector: 'pst-logo',
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
            [class]="logoClasses.image.base"
            [style.height.px]="height"
          />
        </ng-container>

        <!-- Vertical Logo -->
        <ng-container *ngSwitchCase="'vertical'">
          <div [class]="logoClasses.verticalLogo.container">
            <img 
              [src]="iconSrc" 
              [alt]="alt + ' Icon'"
              [class]="logoClasses.image.base"
              [style.height.px]="iconHeight"
            />
            <span [class]="textClasses">ProSolarTec</span>
          </div>
        </ng-container>

        <!-- Icon Only -->
        <ng-container *ngSwitchCase="'icon'">
          <div [class]="logoClasses.iconLogo.container">
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
  `]
})
export class LogoComponent {
  @Input() size: LogoSize = 'md';
  @Input() variant: LogoVariant = 'horizontal';
  @Input() alt = 'ProSolarTec Logo';
  @Input() customClass = '';
  
  private themeService = inject(ThemeService);
  
  // Expose classes to template
  logoClasses = logoClasses;
  
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
    const variantClass = this.logoClasses.container.variants[this.variant];
    return `${this.logoClasses.container.base} ${variantClass} ${this.customClass}`.trim();
  }

  get textClasses(): string {
    return `${this.logoClasses.verticalLogo.text.base} ${this.logoClasses.verticalLogo.text.sizes[this.size]}`;
  }

  get pstClasses(): string {
    return `${this.logoClasses.iconLogo.text.base} ${this.logoClasses.iconLogo.text.sizes[this.size]}`;
  }
  
  get height(): number {
    const sizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };
    return sizes[this.size];
  }

  get iconHeight(): number {
    const sizes = { xs: 32, sm: 40, md: 48, lg: 56, xl: 72 };
    return sizes[this.size];
  }
}
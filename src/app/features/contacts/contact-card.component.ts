import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from './contacts.service';
import { IconComponent } from '../../shared/icons/icon.component';
import { IconName } from '../../shared/icons/icon-definitions';
import { contactCardClasses } from '../../core/design-system/component-classes/organisms.classes';

@Component({
  selector: 'pst-contact-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (contact) {
      <div 
        [class]="containerClass"
        (click)="onCardClick()">
        
        <!-- Header mit Name und Status -->
        <div [class]="headerClass">
          <div [class]="nameSectionClass">
            <h3 [class]="nameClass">{{ contact.name }}</h3>
            @if (contact.company) {
              <p [class]="companyClass">{{ contact.company }}</p>
            }
          </div>
          <div class="flex items-center gap-2">
            <!-- Customer Type Icon -->
            <div [class]="customerTypeIconClass()" 
                 [attr.title]="contact.customerType">
              <pst-icon [name]="getCustomerTypeIcon()" [size]="20" />
            </div>
            
            <!-- Status Badge -->
            @if (contact.customerStatus) {
              <span [class]="statusBadgeClass()">
                {{ contact.customerStatus.name }}
              </span>
            } @else {
              <span [class]="statusBadgeClass()">
                {{ contact.customerType || 'Unknown' }}
              </span>
            }
          </div>
        </div>
        
        <!-- Content mit Adresse und Interessen -->
        <div [class]="contentClass">
          <!-- Activity Indicator -->
          <div class="flex items-center gap-2 mb-3">
            <div [class]="activityIndicatorClass()" 
                 [attr.title]="'Letzte Aktivität: ' + getLastActivityText()">
              <div [class]="activityDotClass()"></div>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ getLastActivityText() }}
            </span>
          </div>
          
          <!-- Adresse -->
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-md p-2 mb-2">
            <div [class]="addressLineClass">
              <pst-icon name="map-pin" [size]="16" [class]="iconSmallClass" />
              <div class="flex flex-col">
                <span>{{ contact.street }}</span>
                <span>{{ contact.postalCode }} {{ contact.city }}</span>
              </div>
            </div>
          </div>
          
          <!-- Interessen -->
          @if (contact.interests && contact.interests.length > 0) {
            <div [class]="interestsClass">
              @for (interest of splitInterests(contact.interests); track interest) {
                <span [class]="interestTagClass">{{ interest }}</span>
              }
            </div>
          }
        </div>
        
        <!-- Footer mit Aktionen -->
        <div [class]="footerClass">
          <button
            type="button"
            [class]="actionButtonClass"
            (click)="onPhoneClick($event)"
            [attr.aria-label]="'Anrufen: ' + contact.phone"
            title="Anrufen">
            <pst-icon name="phone" [size]="18" />
          </button>
          <button
            type="button"
            [class]="actionButtonClass"
            (click)="onEmailClick($event)"
            [attr.aria-label]="'E-Mail an: ' + contact.email"
            title="E-Mail senden">
            <pst-icon name="mail" [size]="18" />
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class ContactCardComponent {
  @Input({ required: true }) contact!: Contact;
  @Output() cardClick = new EventEmitter<Contact>();
  @Output() phoneClick = new EventEmitter<Contact>();
  @Output() emailClick = new EventEmitter<Contact>();
  
  // Statische Klassen
  protected containerClass = contactCardClasses.container;
  protected headerClass = contactCardClasses.header;
  protected nameSectionClass = contactCardClasses.nameSection;
  protected nameClass = contactCardClasses.name;
  protected companyClass = contactCardClasses.company;
  protected contentClass = contactCardClasses.content;
  protected addressLineClass = contactCardClasses.addressLine;
  protected iconSmallClass = contactCardClasses.iconSmall;
  protected interestsClass = contactCardClasses.interests;
  protected interestTagClass = contactCardClasses.interestTag;
  protected footerClass = contactCardClasses.footer;
  protected actionButtonClass = contactCardClasses.actionButton;
  
  // Computed property für dynamische Status-Badge-Klasse
  protected statusBadgeClass = computed(() => {
    const baseClass = contactCardClasses.statusBadge.base;
    
    // Defensive check for customerStatus
    if (!this.contact || !this.contact.customerStatus) {
      return `${baseClass} ${contactCardClasses.statusBadge.neutral}`;
    }
    
    const tokenKey = this.contact.customerStatus.tokenKey as keyof typeof contactCardClasses.statusBadge;
    const statusClass = contactCardClasses.statusBadge[tokenKey] || contactCardClasses.statusBadge.neutral;
    
    return `${baseClass} ${statusClass}`;
  });
  
  // Customer type icon methods
  protected customerTypeIconClass = computed(() => {
    const baseClass = 'w-10 h-10 rounded-full flex items-center justify-center';
    const tokenKey = this.contact?.customerStatus?.tokenKey || 'neutral';
    
    const colorClasses = {
      success: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
      neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
    };
    
    return `${baseClass} ${colorClasses[tokenKey as keyof typeof colorClasses] || colorClasses.neutral}`;
  });
  
  protected getCustomerTypeIcon(): IconName {
    const type = this.contact?.customerType;
    switch (type) {
      case 'Kunde': return 'check-circle' as IconName;
      case 'Interessent': return 'star' as IconName;
      case 'Lead': return 'lightning-bolt' as IconName;
      case 'Partner': return 'users' as IconName;
      case 'Lieferant': return 'package' as IconName;
      default: return 'user' as IconName;
    }
  }
  
  // Activity indicator methods
  protected activityIndicatorClass = computed(() => {
    return 'relative w-3 h-3';
  });
  
  protected activityDotClass = computed(() => {
    const daysSinceActivity = this.getDaysSinceActivity();
    const baseClass = 'absolute inset-0 rounded-full';
    
    if (daysSinceActivity <= 7) {
      return `${baseClass} bg-green-500 animate-pulse`;
    } else if (daysSinceActivity <= 30) {
      return `${baseClass} bg-yellow-500`;
    } else {
      return `${baseClass} bg-red-500`;
    }
  });
  
  private getDaysSinceActivity(): number {
    if (!this.contact?.lastActivity) return 999;
    const lastActivity = new Date(this.contact.lastActivity);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  protected getLastActivityText(): string {
    const days = this.getDaysSinceActivity();
    if (days === 0) return 'Heute';
    if (days === 1) return 'Gestern';
    if (days <= 7) return `vor ${days} Tagen`;
    if (days <= 30) return `vor ${Math.floor(days / 7)} Wochen`;
    return `vor ${Math.floor(days / 30)} Monaten`;
  }
  
  protected splitInterests(interests: string[]): string[] {
    const splitInterests: string[] = [];
    interests.forEach(interest => {
      // Split "PV & WP" into ["PV", "WP"]
      if (interest.includes('&')) {
        const parts = interest.split('&').map(part => part.trim());
        splitInterests.push(...parts);
      } else {
        splitInterests.push(interest);
      }
    });
    // Remove duplicates
    return [...new Set(splitInterests)];
  }
  
  
  onCardClick(): void {
    if (this.contact) {
      this.cardClick.emit(this.contact);
    }
  }
  
  onPhoneClick(event: Event): void {
    event.stopPropagation();
    if (this.contact) {
      this.phoneClick.emit(this.contact);
      // Direkter Anruf
      window.location.href = `tel:${this.contact.phone}`;
    }
  }
  
  onEmailClick(event: Event): void {
    event.stopPropagation();
    if (this.contact) {
      this.emailClick.emit(this.contact);
      // E-Mail öffnen
      window.location.href = `mailto:${this.contact.email}`;
    }
  }
}
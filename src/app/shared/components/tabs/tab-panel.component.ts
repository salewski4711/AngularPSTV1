import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pst-tab-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-panel-content">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class]': '"block"',
    '[attr.role]': '"tabpanel"',
    '[attr.aria-labelledby]': 'labelledBy',
    '[attr.tabindex]': '0'
  }
})
export class TabPanelComponent {
  @Input() tabId!: string;
  @Input() labelledBy!: string;
  
  @HostBinding('class.hidden')
  @Input() hidden = true;
  
  @HostBinding('attr.id')
  get panelId(): string {
    return `${this.tabId}-panel`;
  }
}
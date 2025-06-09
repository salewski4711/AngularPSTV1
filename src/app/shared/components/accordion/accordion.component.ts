import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionPanel, AccordionConfig, PanelToggleEvent } from './accordion.types';

@Component({
  selector: 'pst-accordion',
  standalone: true,
  imports: [CommonModule, AccordionPanelComponent],
  template: `
    <div class="space-y-2">
      <!-- Using @for for panels array -->
      @for (panel of panels(); track panel.id) {
        <pst-accordion-panel
          [panel]="createPanelSignal(panel)"
          [animated]="animated"
          [iconPosition]="iconPosition"
          (panelToggle)="handlePanelToggle(panel, $event)"
        >
          <!-- Pass through custom content if provided -->
          <ng-container *ngIf="panel.customContent">
            <ng-container *ngTemplateOutlet="panel.customContent"></ng-container>
          </ng-container>
        </pst-accordion-panel>
      }

      <!-- Support for content projection (nested accordions) -->
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements AfterContentInit {
  @Input() panels = signal<AccordionPanel[]>([]);
  @Input() multiple = signal(false);
  @Input() animated = signal(true);
  @Input() iconPosition = signal<'left' | 'right'>('right');
  @Output() panelToggle = new EventEmitter<PanelToggleEvent>();

  @ContentChildren(AccordionPanelComponent) contentPanels!: QueryList<AccordionPanelComponent>;
  
  private panelSignals = new Map<string, WritableSignal<AccordionPanel | null>>();
  
  createPanelSignal(panel: AccordionPanel): WritableSignal<AccordionPanel | null> {
    if (!this.panelSignals.has(panel.id)) {
      this.panelSignals.set(panel.id, signal(panel));
    }
    const panelSignal = this.panelSignals.get(panel.id)!;
    panelSignal.set(panel);
    return panelSignal;
  }

  ngAfterContentInit() {
    // Set properties for content-projected panels
    this.contentPanels.forEach(panel => {
      panel.animated = this.animated;
      panel.iconPosition = this.iconPosition;
      
      // Subscribe to panel toggle events
      panel.panelToggle.subscribe((expanded: boolean) => {
        const panelData = panel.panel();
        if (panelData) {
          this.handlePanelToggle(panelData, expanded);
        }
      });
    });

    // Update when content panels change
    this.contentPanels.changes.subscribe(() => {
      this.contentPanels.forEach(panel => {
        panel.animated = this.animated;
        panel.iconPosition = this.iconPosition;
      });
    });
  }

  handlePanelToggle(panel: AccordionPanel, expanded: boolean) {
    const currentPanels = this.panels();
    
    if (!this.multiple() && expanded) {
      // Close all other panels if not in multiple mode
      currentPanels.forEach(p => {
        if (p.id !== panel.id) {
          p.expanded = false;
        }
      });
    }

    // Update the panel state
    const targetPanel = currentPanels.find(p => p.id === panel.id);
    if (targetPanel) {
      targetPanel.expanded = expanded;
    }

    // Update the panels signal to trigger change detection
    this.panels.set([...currentPanels]);

    // Emit the toggle event
    this.panelToggle.emit({
      panelId: panel.id,
      expanded,
      panel
    });
  }

  // Public API methods
  expandAll() {
    const currentPanels = this.panels();
    currentPanels.forEach(panel => {
      if (!panel.disabled) {
        panel.expanded = true;
      }
    });
    this.panels.set([...currentPanels]);
  }

  collapseAll() {
    const currentPanels = this.panels();
    currentPanels.forEach(panel => {
      panel.expanded = false;
    });
    this.panels.set([...currentPanels]);
  }

  togglePanel(panelId: string) {
    const currentPanels = this.panels();
    const panel = currentPanels.find(p => p.id === panelId);
    if (panel && !panel.disabled) {
      this.handlePanelToggle(panel, !panel.expanded);
    }
  }
}
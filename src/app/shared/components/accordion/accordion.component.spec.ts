import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { AccordionPanel } from './accordion.types';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.multiple()).toBe(false);
    expect(component.animated()).toBe(true);
    expect(component.iconPosition()).toBe('right');
    expect(component.panels()).toEqual([]);
  });

  it('should expand panel on toggle', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1' },
      { id: '2', header: 'Panel 2', content: 'Content 2' }
    ];
    component.panels.set(panels);

    component.handlePanelToggle(panels[0], true);

    expect(component.panels()[0].expanded).toBe(true);
    expect(component.panels()[1].expanded).toBeUndefined();
  });

  it('should close other panels when not in multiple mode', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1', expanded: true },
      { id: '2', header: 'Panel 2', content: 'Content 2' }
    ];
    component.panels.set(panels);
    component.multiple.set(false);

    component.handlePanelToggle(panels[1], true);

    expect(component.panels()[0].expanded).toBe(false);
    expect(component.panels()[1].expanded).toBe(true);
  });

  it('should allow multiple panels open when in multiple mode', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1', expanded: true },
      { id: '2', header: 'Panel 2', content: 'Content 2' }
    ];
    component.panels.set(panels);
    component.multiple.set(true);

    component.handlePanelToggle(panels[1], true);

    expect(component.panels()[0].expanded).toBe(true);
    expect(component.panels()[1].expanded).toBe(true);
  });

  it('should not toggle disabled panels', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1', disabled: true }
    ];
    component.panels.set(panels);

    component.togglePanel('1');

    expect(component.panels()[0].expanded).toBeUndefined();
  });

  it('should expand all panels', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1' },
      { id: '2', header: 'Panel 2', content: 'Content 2' },
      { id: '3', header: 'Panel 3', content: 'Content 3', disabled: true }
    ];
    component.panels.set(panels);

    component.expandAll();

    expect(component.panels()[0].expanded).toBe(true);
    expect(component.panels()[1].expanded).toBe(true);
    expect(component.panels()[2].expanded).toBeUndefined(); // Disabled panel
  });

  it('should collapse all panels', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1', expanded: true },
      { id: '2', header: 'Panel 2', content: 'Content 2', expanded: true }
    ];
    component.panels.set(panels);

    component.collapseAll();

    expect(component.panels()[0].expanded).toBe(false);
    expect(component.panels()[1].expanded).toBe(false);
  });

  it('should emit panelToggle event', () => {
    const panels: AccordionPanel[] = [
      { id: '1', header: 'Panel 1', content: 'Content 1' }
    ];
    component.panels.set(panels);

    spyOn(component.panelToggle, 'emit');

    component.handlePanelToggle(panels[0], true);

    expect(component.panelToggle.emit).toHaveBeenCalledWith({
      panelId: '1',
      expanded: true,
      panel: panels[0]
    });
  });
});
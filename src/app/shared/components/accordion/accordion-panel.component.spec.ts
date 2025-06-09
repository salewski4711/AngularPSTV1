import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionPanel } from './accordion.types';

describe('AccordionPanelComponent', () => {
  let component: AccordionPanelComponent;
  let fixture: ComponentFixture<AccordionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.animated()).toBe(true);
    expect(component.iconPosition()).toBe('right');
    expect(component.panel()).toBeNull();
  });

  it('should compute expanded state from panel', () => {
    const panel: AccordionPanel = {
      id: '1',
      header: 'Test Panel',
      expanded: true
    };
    component.panel.set(panel);

    expect(component.isExpanded()).toBe(true);
  });

  it('should emit toggle event when clicked', () => {
    const panel: AccordionPanel = {
      id: '1',
      header: 'Test Panel',
      expanded: false
    };
    component.panel.set(panel);

    spyOn(component.panelToggle, 'emit');

    component.toggle();

    expect(component.panelToggle.emit).toHaveBeenCalledWith(true);
  });

  it('should not toggle when panel is disabled', () => {
    const panel: AccordionPanel = {
      id: '1',
      header: 'Test Panel',
      disabled: true
    };
    component.panel.set(panel);

    spyOn(component.panelToggle, 'emit');

    component.toggle();

    expect(component.panelToggle.emit).not.toHaveBeenCalled();
  });

  it('should update content height when expanded', () => {
    const panel: AccordionPanel = {
      id: '1',
      header: 'Test Panel',
      expanded: true
    };
    component.panel.set(panel);

    // Mock content element
    component.contentElement = {
      nativeElement: {
        scrollHeight: 200
      }
    } as any;

    component.ngAfterViewInit();

    expect(component.contentHeight()).toBe(200);
  });

  it('should generate unique content ID', () => {
    const anotherComponent = TestBed.createComponent(AccordionPanelComponent).componentInstance;
    
    expect(component.contentId).toBeTruthy();
    expect(anotherComponent.contentId).toBeTruthy();
    expect(component.contentId).not.toBe(anotherComponent.contentId);
  });
});
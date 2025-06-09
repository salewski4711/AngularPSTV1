import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPanelComponent } from './tab-panel.component';

describe('TabPanelComponent', () => {
  let component: TabPanelComponent;
  let fixture: ComponentFixture<TabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
    component.tabId = 'test-tab';
    component.labelledBy = 'test-tab-label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct role attribute', () => {
    const element = fixture.nativeElement;
    expect(element.getAttribute('role')).toBe('tabpanel');
  });

  it('should have correct aria-labelledby attribute', () => {
    const element = fixture.nativeElement;
    expect(element.getAttribute('aria-labelledby')).toBe('test-tab-label');
  });

  it('should have tabindex 0', () => {
    const element = fixture.nativeElement;
    expect(element.getAttribute('tabindex')).toBe('0');
  });

  it('should generate correct panel id', () => {
    const element = fixture.nativeElement;
    expect(element.getAttribute('id')).toBe('test-tab-panel');
  });

  it('should be hidden by default', () => {
    expect(fixture.nativeElement.classList.contains('hidden')).toBe(true);
  });

  it('should show when hidden is false', () => {
    component.hidden = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('hidden')).toBe(false);
  });

  it('should project content', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TabPanelComponent]
    });

    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const content = hostFixture.nativeElement.querySelector('.tab-panel-content');
    expect(content.textContent.trim()).toBe('Test Content');
  });
});

// Test host component for content projection
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [TabPanelComponent],
  template: `
    <pst-tab-panel tabId="test" labelledBy="test-label">
      Test Content
    </pst-tab-panel>
  `
})
class TestHostComponent {}
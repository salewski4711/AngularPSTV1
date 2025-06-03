import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestUtils {
  static findElement<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

  static findAllElements<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }

  static click<T>(fixture: ComponentFixture<T>, selector: string): void {
    const element = this.findElement(fixture, selector);
    element.nativeElement.click();
    fixture.detectChanges();
  }

  static expectText<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    text: string
  ): void {
    const element = this.findElement(fixture, selector);
    expect(element.nativeElement.textContent.trim()).toBe(text);
  }

  static setInputValue<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    value: string
  ): void {
    const input = this.findElement(fixture, selector).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  static hasClass<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    className: string
  ): boolean {
    const element = this.findElement(fixture, selector);
    return element.nativeElement.classList.contains(className);
  }

  static getAttribute<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    attribute: string
  ): string | null {
    const element = this.findElement(fixture, selector);
    return element.nativeElement.getAttribute(attribute);
  }

  static triggerKeyEvent<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    eventType: string,
    key: string
  ): void {
    const element = this.findElement(fixture, selector).nativeElement;
    const event = new KeyboardEvent(eventType, { key });
    element.dispatchEvent(event);
    fixture.detectChanges();
  }
}
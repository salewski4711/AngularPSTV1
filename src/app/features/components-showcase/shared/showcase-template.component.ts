import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent, PlaygroundConfig } from './components/playground.component';
import { PropsTableComponent, EventDefinition } from './components/props-table.component';
import { CodeBlockComponent } from './components/code-block.component';
import { ShowcaseProp } from './base-showcase.component';

export interface ShowcaseSection {
  title: string;
  code: string;
  description?: string;
}

/**
 * Generic showcase template component
 * Implements DRY principle for all showcase pages
 */
@Component({
  selector: 'pst-showcase-template',
  standalone: true,
  imports: [
    CommonModule,
    PlaygroundComponent,
    PropsTableComponent,
    CodeBlockComponent
  ],
  template: `
    <div class="space-y-12">
      <!-- Header -->
      <header>
        <h1 class="text-3xl font-bold mb-4">{{ title }}</h1>
        <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
      </header>

      <!-- Interactive Playground -->
      <section *ngIf="playgroundConfig">
        <pst-playground [config]="playgroundConfig"></pst-playground>
      </section>

      <!-- Props Table -->
      <section *ngIf="(props && props.length > 0) || (events && events.length > 0)">
        <h2 class="text-2xl font-semibold mb-6">API</h2>
        <pst-props-table [props]="props" [events]="events"></pst-props-table>
      </section>

      <!-- Code Examples -->
      <ng-container *ngFor="let section of sections">
        <section>
          <h2 class="text-2xl font-semibold mb-6">{{ section.title }}</h2>
          <p *ngIf="section.description" class="text-gray-600 dark:text-gray-400 mb-4">
            {{ section.description }}
          </p>
          <pst-code-block [code]="section.code" language="html"></pst-code-block>
        </section>
      </ng-container>

      <!-- Best Practices (optional) -->
      <section *ngIf="bestPractices">
        <h2 class="text-2xl font-semibold mb-6">Best Practices</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 class="text-lg font-medium text-green-800 dark:text-green-200 mb-3">Do</h3>
            <ul class="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li *ngFor="let practice of bestPractices.do">• {{ practice }}</li>
            </ul>
          </div>
          <div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h3 class="text-lg font-medium text-red-800 dark:text-red-200 mb-3">Don't</h3>
            <ul class="space-y-2 text-sm text-red-700 dark:text-red-300">
              <li *ngFor="let practice of bestPractices.dont">• {{ practice }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- API Reference (optional) -->
      <section *ngIf="apiReference">
        <h2 class="text-2xl font-semibold mb-6">API Reference</h2>
        <div class="prose dark:prose-invert max-w-none">
          <div [innerHTML]="apiReference"></div>
        </div>
      </section>
    </div>
  `
})
export class ShowcaseTemplateComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() playgroundConfig?: PlaygroundConfig;
  @Input() props: ShowcaseProp[] = [];
  @Input() events: EventDefinition[] = [];
  @Input() sections: ShowcaseSection[] = [];
  @Input() bestPractices?: {
    do: string[];
    dont: string[];
  };
  @Input() apiReference?: string;
}
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { ButtonGroupComponent } from '../../components/button-group/button-group.component';

@Component({
  selector: 'pst-beta-playground',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6 mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🚧 Beta Components Playground
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Hier werden neue Komponenten entwickelt und getestet, bevor sie in Produktion gehen.
          </p>
          
          <!-- Status Badge -->
          <div class="mt-4 flex gap-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
              <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Beta Environment
            </span>
          </div>
        </div>

        <!-- Component Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Button Component (Beta) -->
          <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Button Component</h3>
              <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">v1.0</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Buttons mit ProSolarTec Design-System
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Alle Varianten
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Token-basierte Farben
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Dark Mode
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> SVG Icons
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Icon-Only Support
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Ripple-Effekt
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Button Groups
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Loading States
              </div>
            </div>
          </div>
          
          <!-- Button Group Component (Beta) -->
          <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Button Group Component</h3>
              <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">v1.0</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Gruppierung von zusammenhängenden Buttons
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Horizontale Gruppen
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Vertikale Gruppen
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Nahtlose Verbindung
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Toggle-Funktionalität
              </div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Card Component</h3>
              <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">v0.8</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Container-Komponente für gruppierte Inhalte
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Basic Layout
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Dark Mode
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">🚧</span> Animations
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Collapsible
              </div>
            </div>
          </div>

          <!-- Table Component (Beta) -->
          <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Table Component</h3>
              <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">v0.5</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Responsive Datentabelle mit Features
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">✅</span> Basic Table
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">🚧</span> Sorting
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Filtering
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Pagination
              </div>
            </div>
          </div>

          <!-- Form Fields (Planned) -->
          <div class="bg-white dark:bg-black-lighter rounded-lg shadow-md p-6 opacity-60">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold">Form Fields</h3>
              <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">Geplant</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Input-Komponenten mit Validierung
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Text Input
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Select
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Checkbox
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 mr-2">📋</span> Validation
              </div>
            </div>
          </div>
        </div>

        <!-- Info Box -->
        <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Beta Workflow
          </h2>
          <ol class="list-decimal list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>Komponente wird hier entwickelt und getestet</li>
            <li>Feedback von Stakeholdern einholen</li>
            <li>Iterationen und Verbesserungen</li>
            <li>Nach Abnahme: Migration zu /components</li>
            <li>Beta-Version wird archiviert oder gelöscht</li>
          </ol>
        </div>

        <!-- Component Demo Area -->
        <div class="mt-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Live Demos
          </h2>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Button Component Demo</h3>
            
            <!-- Varianten -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Varianten:</h4>
              <div class="flex flex-wrap gap-3">
                <pst-button variant="primary" icon="plus">Primary</pst-button>
                <pst-button variant="secondary" icon="list">Secondary</pst-button>
                <pst-button variant="outline-primary" icon="save">Outline</pst-button>
                <pst-button variant="tertiary" icon="filter">Tertiary</pst-button>
                <pst-button variant="ghost" icon="arrow-left">Ghost</pst-button>
                <pst-button variant="danger" icon="trash">Danger</pst-button>
              </div>
            </div>
            
            <!-- Größen -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Größen:</h4>
              <div class="flex flex-wrap items-center gap-3">
                <pst-button size="xs">XS</pst-button>
                <pst-button size="sm">SM</pst-button>
                <pst-button size="md">MD</pst-button>
                <pst-button size="lg">LG</pst-button>
                <pst-button size="xl">XL</pst-button>
              </div>
            </div>
            
            <!-- Zustände -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Zustände:</h4>
              <div class="flex flex-wrap gap-3">
                <pst-button>Normal</pst-button>
                <pst-button [disabled]="true">Disabled</pst-button>
                <pst-button [loading]="true">Loading</pst-button>
              </div>
            </div>
            
            <!-- Loading States (Erweiterte Demo) -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">⏳ Loading States (NEU!):</h4>
              <p class="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Verschiedene Loading-Animationen und Optionen
              </p>
              
              <!-- Standard Loading -->
              <div class="mb-4">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Standard Loading (Circle Spinner):</p>
                <div class="flex flex-wrap gap-3">
                  <pst-button variant="primary" [loading]="true">Speichern</pst-button>
                  <pst-button variant="secondary" [loading]="true" loadingText="Wird geladen...">Mit Text</pst-button>
                  <pst-button variant="outline-primary" [loading]="true" size="sm">Klein</pst-button>
                  <pst-button variant="tertiary" [loading]="true" size="lg">Groß</pst-button>
                </div>
              </div>
              
              <!-- Verschiedene Spinner-Typen -->
              <div class="mb-4">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Verschiedene Spinner-Typen:</p>
                <div class="flex flex-wrap gap-3">
                  <pst-button 
                    variant="primary" 
                    [loading]="true" 
                    spinnerType="circle"
                    loadingText="Circle">
                  </pst-button>
                  <pst-button 
                    variant="secondary" 
                    [loading]="true" 
                    spinnerType="dots"
                    loadingText="Dots">
                  </pst-button>
                  <pst-button 
                    variant="outline-primary" 
                    [loading]="true" 
                    spinnerType="bars"
                    loadingText="Bars">
                  </pst-button>
                </div>
              </div>
              
              <!-- Icon-Only Loading -->
              <div class="mb-4">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Icon-Only Buttons mit Loading:</p>
                <div class="flex flex-wrap gap-3">
                  <pst-button 
                    icon="save" 
                    variant="primary" 
                    [iconOnly]="true" 
                    [loading]="true"
                    ariaLabel="Speichern">
                  </pst-button>
                  <pst-button 
                    icon="download" 
                    variant="ghost" 
                    [iconOnly]="true" 
                    [loading]="true"
                    size="lg"
                    spinnerType="dots"
                    ariaLabel="Herunterladen">
                  </pst-button>
                  <pst-button 
                    icon="trash" 
                    variant="danger" 
                    [iconOnly]="true" 
                    [loading]="true"
                    size="sm"
                    ariaLabel="Löschen">
                  </pst-button>
                </div>
              </div>
              
              <!-- Full Width Loading -->
              <div>
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Full Width mit Loading:</p>
                <pst-button 
                  variant="primary" 
                  [fullWidth]="true" 
                  [loading]="true"
                  loadingText="Daten werden verarbeitet...">
                  Submit Form
                </pst-button>
              </div>
              
              <!-- Interaktive Loading Demo -->
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">🎮 Interaktive Demo (Klicken zum Testen):</p>
                <div class="flex flex-wrap gap-3">
                  <pst-button 
                    variant="primary" 
                    icon="save"
                    [loading]="isLoading1"
                    loadingText="Speichern..."
                    (clicked)="simulateLoading(1)">
                    Speichern
                  </pst-button>
                  
                  <pst-button 
                    variant="secondary" 
                    [loading]="isLoading2"
                    spinnerType="dots"
                    loadingText="Hochladen..."
                    (clicked)="simulateLoading(2)">
                    Datei hochladen
                  </pst-button>
                  
                  <pst-button 
                    icon="download"
                    variant="outline-primary" 
                    [iconOnly]="true"
                    [loading]="isLoading3"
                    spinnerType="bars"
                    ariaLabel="Download"
                    size="lg"
                    (clicked)="simulateLoading(3)">
                  </pst-button>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  💡 Buttons werden automatisch nach 1.5-3 Sekunden wieder aktiviert
                </p>
              </div>
            </div>
            
            <!-- Ripple Effect -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🌊 Ripple-Effekt (Beta):</h4>
              <p class="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Klicken Sie auf die Buttons, um den Welleneffekt zu sehen!
              </p>
              <div class="flex flex-wrap gap-3">
                <pst-button variant="primary" [ripple]="true">Mit Ripple</pst-button>
                <pst-button variant="secondary">Ohne Ripple (Standard)</pst-button>
                <pst-button icon="bell" variant="ghost" [iconOnly]="true" size="lg" [ripple]="true" ariaLabel="Icon mit Ripple"></pst-button>
              </div>
            </div>
            
            <!-- Button Groups -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">👥 Button Groups:</h4>
              <p class="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Zusammenhängende Buttons für verwandte Aktionen.
              </p>
              <div class="space-y-6">
                <!-- Standard Button Group -->
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Standard (keine Toggle-Funktion):</p>
                  <div class="flex gap-3">
                    <pst-button-group ariaLabel="Filter und Sortierung">
                      <pst-button icon="filter" variant="tertiary" size="sm">Filter</pst-button>
                      <pst-button icon="arrow-down" variant="tertiary" size="sm">Sortieren</pst-button>
                      <pst-button icon="download" variant="tertiary" size="sm">Export</pst-button>
                    </pst-button-group>
                    
                    <pst-button-group ariaLabel="Seitennavigation">
                      <pst-button variant="outline-primary" size="sm">Zurück</pst-button>
                      <pst-button variant="outline-primary" size="sm">1</pst-button>
                      <pst-button variant="outline-primary" size="sm">2</pst-button>
                      <pst-button variant="outline-primary" size="sm">3</pst-button>
                      <pst-button variant="outline-primary" size="sm">Weiter</pst-button>
                    </pst-button-group>
                  </div>
                </div>
                
                <!-- Toggle Single Selection -->
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Toggle Mode (Einzelauswahl) - NEU! 🎯:</p>
                  <div class="flex flex-wrap gap-3">
                    <div>
                      <p class="text-xs text-gray-500 mb-1">Ansicht-Switcher:</p>
                      <pst-button-group 
                        ariaLabel="Ansicht wählen" 
                        mode="toggle"
                        [(value)]="selectedView"
                        (valueChange)="onViewChange($event)">
                        <pst-button icon="list" variant="tertiary" size="sm">Liste</pst-button>
                        <pst-button icon="grid" variant="tertiary" size="sm">Kacheln</pst-button>
                        <pst-button icon="calendar" variant="tertiary" size="sm">Kalender</pst-button>
                      </pst-button-group>
                      <p class="text-xs text-gray-500 mt-1">Ausgewählt: {{ selectedView || 'Keine' }}</p>
                    </div>
                    
                    <div>
                      <p class="text-xs text-gray-500 mb-1">Zeitraum:</p>
                      <pst-button-group 
                        ariaLabel="Zeitraum wählen" 
                        mode="toggle"
                        [(value)]="selectedPeriod">
                        <pst-button variant="outline-primary" size="sm">Tag</pst-button>
                        <pst-button variant="outline-primary" size="sm">Woche</pst-button>
                        <pst-button variant="outline-primary" size="sm">Monat</pst-button>
                        <pst-button variant="outline-primary" size="sm">Jahr</pst-button>
                      </pst-button-group>
                      <p class="text-xs text-gray-500 mt-1">Zeitraum: {{ selectedPeriod || 'Keiner' }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Toggle Multiple Selection -->
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Toggle Mode (Mehrfachauswahl) - NEU! 🎯:</p>
                  <div>
                    <p class="text-xs text-gray-500 mb-1">Filter-Optionen:</p>
                    <pst-button-group 
                      ariaLabel="Filter auswählen" 
                      mode="toggle-multiple"
                      [(value)]="selectedFilters"
                      (valueChange)="onFiltersChange($event)">
                      <pst-button icon="check" variant="ghost" size="sm">Aktiv</pst-button>
                      <pst-button icon="x" variant="ghost" size="sm">Inaktiv</pst-button>
                      <pst-button icon="clock" variant="ghost" size="sm">Ausstehend</pst-button>
                      <pst-button icon="warning" variant="ghost" size="sm">Kritisch</pst-button>
                    </pst-button-group>
                    <p class="text-xs text-gray-500 mt-1">Ausgewählte Filter: {{ selectedFilters.length ? selectedFilters.join(', ') : 'Keine' }}</p>
                  </div>
                </div>
                
                <!-- Vertical Toggle Group -->
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Vertikale Toggle-Gruppe:</p>
                  <div class="flex gap-4">
                    <pst-button-group 
                      orientation="vertical" 
                      ariaLabel="Aktionen"
                      mode="toggle"
                      [(value)]="selectedAction">
                      <pst-button icon="edit" variant="ghost">Bearbeiten</pst-button>
                      <pst-button icon="copy" variant="ghost">Duplizieren</pst-button>
                      <pst-button icon="trash" variant="ghost">Löschen</pst-button>
                      <pst-button icon="download" variant="ghost">Exportieren</pst-button>
                    </pst-button-group>
                    <div class="text-xs text-gray-500">
                      <p>Ausgewählte Aktion:</p>
                      <p class="font-medium">{{ selectedAction || 'Keine' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BetaPlaygroundComponent {
  // Loading State Demo Properties
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  
  // Toggle Button Group Properties
  selectedView: string | null = 'Liste'; // Default selection
  selectedPeriod: string | null = null;
  selectedFilters: string[] = [];
  selectedAction: string | null = null;
  
  // Simulate async operation
  simulateLoading(buttonNumber: number): void {
    switch(buttonNumber) {
      case 1:
        this.isLoading1 = true;
        setTimeout(() => this.isLoading1 = false, 2000);
        break;
      case 2:
        this.isLoading2 = true;
        setTimeout(() => this.isLoading2 = false, 3000);
        break;
      case 3:
        this.isLoading3 = true;
        setTimeout(() => this.isLoading3 = false, 1500);
        break;
    }
  }
  
  // Toggle Button Group Handlers
  onViewChange(value: string | string[] | null): void {
    if (typeof value === 'string' || value === null) {
      this.selectedView = value;
    }
    console.log('View changed to:', value);
  }
  
  onFiltersChange(filters: string | string[] | null): void {
    if (Array.isArray(filters)) {
      this.selectedFilters = filters;
    } else if (filters === null) {
      this.selectedFilters = [];
    }
    console.log('Filters changed to:', filters);
  }
}

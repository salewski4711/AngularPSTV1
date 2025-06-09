# Task: Login Component SCSS zu Tailwind Migration

## Titel
Migration von login.component.scss zu Tailwind CSS

## Beschreibung
Die login.component.scss ist mit 4.59KB die zweitgrößte SCSS-Datei und überschreitet das Budget um 588 bytes. Die Datei enthält Custom Styles für das Login-Formular, die zu Tailwind migriert werden müssen.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/features/auth/login/login.component.scss`
- `/mnt/c/Code/AngularV1/src/app/features/auth/login/login.component.html`
- `/mnt/c/Code/AngularV1/src/app/features/auth/login/login.component.ts`

## Geschätzter Aufwand
2-3 Story Points

## Abhängigkeiten
Keine

## Analyse der aktuellen SCSS
```scss
// Hauptcontainer und Layout-Styles
// Form-Styles
// Button-Styles  
// Error/Success Message Styles
// Responsive Design
```

## Migrations-Mapping

### Container Layout
```scss
.login-container → 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'
```

### Login Box
```scss
.login-box → 'max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'
```

### Logo Section
```scss
.logo-section → 'flex justify-center mb-8'
.logo-image → 'h-12 w-auto'
```

### Form Header
```scss
.form-header → 'text-center mb-8'
.form-title → 'text-3xl font-bold text-gray-900 dark:text-white'
.form-subtitle → 'mt-2 text-sm text-gray-600 dark:text-gray-400'
```

### Form Elements
```scss
.form-group → 'mb-4'
.form-label → 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
.form-input → 'appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700'
.form-input.error → 'border-red-500 dark:border-red-400'
```

### Checkbox Group
```scss
.checkbox-group → 'flex items-center justify-between mb-6'
.checkbox-wrapper → 'flex items-center'
.checkbox-input → 'h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded'
.checkbox-label → 'ml-2 block text-sm text-gray-900 dark:text-gray-300'
```

### Links
```scss
.forgot-link → 'text-sm text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300'
```

### Buttons
```scss
.submit-button → 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
.button-spinner → 'animate-spin -ml-1 mr-3 h-5 w-5 text-white'
```

### Messages
```scss
.error-message → 'mt-2 text-sm text-red-600 dark:text-red-400'
.success-message → 'mb-4 p-4 text-sm text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20 rounded-md'
.error-alert → 'mb-4 p-4 text-sm text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20 rounded-md'
```

### Footer
```scss
.login-footer → 'mt-6 text-center'
.signup-text → 'text-sm text-gray-600 dark:text-gray-400'
.signup-link → 'font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300'
```

### Responsive Utilities
```scss
@media (max-width: 640px) {
  .login-box → 'p-6'
  .form-title → 'text-2xl'
}
```

## Tailwind Config Erweiterungen
Keine zusätzlichen Erweiterungen erforderlich, da alle Farben bereits in der Config definiert sind.

## Prüfkriterium "Done"
- [ ] Alle SCSS-Klassen durch Tailwind ersetzt
- [ ] SCSS-Datei gelöscht
- [ ] Component styleUrl entfernt
- [ ] Form-Validierung visuell korrekt
- [ ] Dark Mode funktioniert
- [ ] Responsive Design erhalten
- [ ] Loading States funktionieren
- [ ] Bundle-Größe um ~4KB reduziert
- [ ] Code Review bestanden
# PowerShell Script zum Kopieren der Design Tokens

# Quell- und Zielverzeichnisse
$SourceDir = "C:\Code\CRM_Chatgpt_WEB\tokens"
$TargetDir = "C:\Code\AngularV1\src\app\design-system\tokens"

# Erstelle Zielverzeichnis
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

Write-Host "📋 Kopiere Design Tokens..." -ForegroundColor Cyan

# Kopiere Token-Dateien
$tokenFiles = @(
    "colors.json",
    "typography.json", 
    "spacing.json",
    "themes.json",
    "components-buttons.json",
    "components-cards.json",
    "components-forms.json",
    "components-tables.json",
    "components-badges.json",
    "components-dashboard.json",
    "components-empty-states.json",
    "components-filters.json",
    "components-modals.json",
    "components-page-headers.json",
    "components-stepper.json"
)

foreach ($file in $tokenFiles) {
    $source = Join-Path $SourceDir $file
    $target = Join-Path $TargetDir $file
    
    if (Test-Path $source) {
        Copy-Item $source $target -Force
        Write-Host "✓ $file kopiert" -ForegroundColor Green
    } else {
        Write-Host "✗ $file nicht gefunden" -ForegroundColor Yellow
    }
}

# Kopiere Tailwind Config
$tailwindTarget = "C:\Code\AngularV1\tokens"
New-Item -ItemType Directory -Force -Path $tailwindTarget | Out-Null
Copy-Item -Path "$SourceDir\tailwind.config" -Destination $tailwindTarget -Recurse -Force

Write-Host "`n✅ Design Tokens erfolgreich kopiert!" -ForegroundColor Green
Write-Host "`nNächste Schritte:" -ForegroundColor Yellow
Write-Host "1. Installiere Tailwind CSS: npm install -D tailwindcss postcss autoprefixer"
Write-Host "2. Aktualisiere tailwind.config.js mit dem kopierten Config"
Write-Host "3. Importiere die Tokens in deine Angular Services"

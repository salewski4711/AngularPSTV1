# Build & Deployment

## 🏗️ Build Configuration

### Angular Build Settings
```json
// angular.json
{
  "projects": {
    "angular-crm-app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
}
```

### Environment Configuration
```typescript
// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  version: '1.0.0-dev'
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  version: '1.0.0'
};
```

## 📦 Build Process

### Development Build
```bash
# Standard Development Build
npm run build -- --configuration development

# Watch Mode für kontinuierliche Builds
npm run watch
```

### Production Build
```bash
# Optimierter Production Build
npm run build -- --configuration production

# Mit Source Maps (für Debugging)
npm run build -- --configuration production --source-map
```

### Build Output
```
dist/angular-crm-app/
├── index.html
├── main-[hash].js
├── polyfills-[hash].js
├── styles-[hash].css
├── assets/
├── favicon.ico
└── [weitere chunk files]
```

## 📊 Bundle Optimization

### Aktuelle Bundle-Größen
```
Initial Bundle: 584.23 kB
- main.js: 115.99 kB
- vendor.js: 176.72 kB
- styles.css: 54.53 kB
- polyfills.js: 34.58 kB
```

### Optimierungs-Strategien

#### 1. Lazy Loading
```typescript
// Routen mit Lazy Loading
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.routes')
      .then(m => m.CUSTOMERS_ROUTES)
  }
];
```

#### 2. Tree Shaking
```typescript
// Spezifische Imports verwenden
import { debounceTime } from 'rxjs/operators'; // ✅
// import * as rxjs from 'rxjs'; // ❌
```

#### 3. Code Splitting
```typescript
// Dynamic Imports für große Libraries
async loadChartLibrary() {
  const { Chart } = await import('chart.js');
  return new Chart(ctx, config);
}
```

## 🚀 Deployment Strategies

### 1. Static Hosting (Empfohlen)

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/angular-crm-app;
    index index.html;

    # Angular Routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache Static Assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

#### Apache Configuration
```apache
<VirtualHost *:80>
    DocumentRoot /var/www/angular-crm-app
    
    <Directory /var/www/angular-crm-app>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Cache Control
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
</VirtualHost>
```

### 2. Docker Deployment

#### Dockerfile
```dockerfile
# Build Stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist/angular-crm-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  angular-app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 3. Cloud Deployment

#### AWS S3 + CloudFront
```bash
# Build erstellen
npm run build

# Zu S3 hochladen
aws s3 sync dist/angular-crm-app/ s3://your-bucket-name --delete

# CloudFront Cache invalidieren
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Vercel
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🔒 Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self';">
```

### Environment Variables
```typescript
// Niemals Secrets im Frontend Code!
// Verwende Backend APIs für sensitive Daten

// ❌ FALSCH
const apiKey = 'sk_live_abc123';

// ✅ RICHTIG
const response = await fetch('/api/secure-endpoint', {
  headers: { 'Authorization': `Bearer ${userToken}` }
});
```

## 📈 Performance Monitoring

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://your-preview-url.com
          uploadArtifacts: true
```

### Web Vitals Monitoring
```typescript
// main.ts
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Performance Metriken an Analytics senden
onCLS(console.log);
onFID(console.log);
onLCP(console.log);
onFCP(console.log);
onTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Tests
        run: npm test -- --ci --coverage
      
      - name: Build Application
        run: npm run build
      
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        run: |
          # Deployment Script
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Alle Tests bestehen (`npm test`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] Bundle-Größe geprüft
- [ ] Environment Variables gesetzt
- [ ] Security Headers konfiguriert
- [ ] SSL-Zertifikat eingerichtet

### Post-Deployment
- [ ] Smoke Tests durchführen
- [ ] Performance Monitoring aktiv
- [ ] Error Tracking funktioniert
- [ ] Backup-Strategie implementiert
- [ ] Rollback-Plan vorbereitet

## 🆘 Troubleshooting

### Build Fehler
```bash
# Node Modules neu installieren
rm -rf node_modules package-lock.json
npm install

# Angular Cache löschen
rm -rf .angular/cache
```

### Deployment Issues
```bash
# Nginx Logs prüfen
tail -f /var/log/nginx/error.log

# Docker Container Logs
docker logs container-name

# Permissions prüfen
ls -la /var/www/angular-crm-app
```
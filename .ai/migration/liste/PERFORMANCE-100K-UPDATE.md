# Entity List View - 100k+ Performance

## ⚡ **KRITISCH: 100.000+ Entitäten**

### **Pflicht-Anforderungen:**

#### **1. Virtual Scrolling - ABSOLUT NOTWENDIG**
- `<cdk-virtual-scroll-viewport>` 
- Nur ~50 DOM-Elemente statt 100k

#### **2. Server-side Everything**
- **Paginierung:** Max 50 Entitäten pro Request
- **Search:** Backend + 300ms Debouncing  
- **Filter/Sort:** Database-Level

#### **3. Infinite Scrolling + Cache-Management**

#### **4. Search: Min 2 Zeichen, Backend Volltextsuche**

## 🔧 **Component-Konfiguration**

```typescript
interface EntityListViewConfig<T> {
  performance: {
    virtualScrolling: true;    // PFLICHT
    infiniteScroll: true;      
    pageSize: 50;              
    searchDebounce: 300;       
  };
  
  serverSide: {
    searchEnabled: true;       
    filteringEnabled: true;    
    sortingEnabled: true;      
  };
}
```

**🚨 Backend:** Database-Indizes + Elasticsearch + Komprimierung

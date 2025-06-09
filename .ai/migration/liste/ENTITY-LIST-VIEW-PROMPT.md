# Entity List View - MSW + 100k Performance

## 🎯 **Angular Senior Developer: MSW + High-Performance Entity List**

**MSW bereits konfiguriert!** ✅ 

**Analysiere:** https://dev.prosolartec.com/crmdashboard/KontakteV2/index.html

## ⚡ **MSW für 100k+ Performance-Simulation**

### **MSW Handlers erweitern**
```typescript
// src/mocks/handlers.ts
http.get('/api/contacts', async ({ request }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const contacts = Array.from({ length: 50 }, (_, i) => 
    generateMockContact((page - 1) * 50 + i + 1)
  );
  
  return HttpResponse.json({
    data: contacts,
    pagination: { page, pageSize: 50, totalItems: 100000, hasNextPage: true }
  });
})
```

## 🚀 **Frontend: Virtual Scrolling + MSW**

**Komponente:** `pst-entity-list-view`

### **Performance:**
- Virtual Scrolling (`<cdk-virtual-scroll-viewport>`) - PFLICHT
- MSW-API für Paginierung/Search/Filter
- Infinite Scrolling

### **Konfiguration:**
```typescript
performance: {
  virtualScrolling: true,
  infiniteScroll: true,      
  pageSize: 50,              
  searchDebounce: 300        
}
```

### **Standards:**
✅ **Angular 20.0.0** + CDK + MSW + SOLID + Performance für 100k+

**🎯 Implementiere High-Performance Entity List mit MSW!**

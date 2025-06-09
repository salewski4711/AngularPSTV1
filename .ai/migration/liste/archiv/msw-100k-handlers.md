# MSW Handlers für 100k+ Performance

## 🔧 **MSW Handler-Erweiterung für Entity List View**

### **Zu src/mocks/handlers.ts hinzufügen:**

```typescript
// Paginierte Kontakte für 100k Simulation
http.get('/api/contacts', async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
  const search = url.searchParams.get('search') || '';
  
  // Simuliere 100k Datensätze
  const totalContacts = 100000;
  let filteredCount = totalContacts;
  
  // Search-Simulation
  if (search.length >= 2) {
    filteredCount = Math.floor(totalContacts * 0.1); // 10% Match
  }
  
  // Mock-Daten für aktuelle Seite
  const contacts = Array.from({ length: pageSize }, (_, i) => {
    const id = (page - 1) * pageSize + i + 1;
    return generateLargeContact(id, search);
  });
  
  await delay(Math.random() * 100 + 50); // 50-150ms Latenz
  
  return HttpResponse.json({
    data: contacts,
    pagination: {
      page, pageSize, totalItems: filteredCount,
      totalPages: Math.ceil(filteredCount / pageSize),
      hasNextPage: page < Math.ceil(filteredCount / pageSize)
    }
  });
})
```

### **Mock-Generator hinzufügen:**

```typescript
// src/mocks/data/contacts-large.mock.ts
export function generateLargeContact(id: number, searchTerm?: string): Contact {
  const names = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber'];
  const cities = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt'];
  
  return {
    id: id.toString(),
    name: `${names[id % 5]} ${id % 3 === 0 ? 'GmbH' : 'Person'}`,
    email: `contact${id}@example.de`,
    phone: `+49 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000000)}`,
    status: ['active', 'inactive', 'pending'][id % 3] as Contact['status'],
    city: cities[id % 5],
    initials: `${names[id % 5][0]}${String.fromCharCode((id % 26) + 65)}`
  };
}
```

import { http, HttpResponse, delay } from 'msw';
import { mockCustomers, generateMockCustomer } from './data/customers.mock';
import { mockContacts, generateMockContact } from './data/contacts.mock';
import { mockDashboardStats } from './data/dashboard.mock';
import { mockProjects } from './data/projects.mock';
import { mockUsers, authResponses } from './data/auth.mock';

// Simulierte Verzögerung für realistisches Verhalten
const DELAY_MS = 300;

export const handlers = [
  // ========== CUSTOMER ENDPOINTS ==========
  
  // GET all customers
  http.get('/api/customers', async () => {
    await delay(DELAY_MS);
    
    // Erweitere die Liste mit generierten Kunden
    const allCustomers = [
      ...mockCustomers,
      ...Array.from({ length: 20 }, (_, i) => generateMockCustomer(i + 5))
    ];
    
    return HttpResponse.json({
      success: true,
      data: allCustomers,
      total: allCustomers.length
    });
  }),

  // GET contacts with pagination, search and filters (High-Performance Endpoint)
  http.get('/api/contacts', async ({ request }) => {
    await delay(DELAY_MS / 2); // Faster response for performance testing
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '50');
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';
    const type = url.searchParams.get('type') || '';
    const sortBy = url.searchParams.get('sortBy') || 'name';
    const sortOrder = url.searchParams.get('sortOrder') || 'asc';
    
    // Use our real mock contacts data
    const allContacts = mockContacts;
    const totalItems = allContacts.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    
    // Get contacts for current page
    const contacts = allContacts.slice(startIndex, endIndex);
    
    // Apply search filter
    let filteredContacts = contacts;
    if (search) {
      filteredContacts = contacts.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.city.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter
    if (status) {
      filteredContacts = filteredContacts.filter(c => c.status === status);
    }
    
    // Apply type filter
    if (type) {
      filteredContacts = filteredContacts.filter(c => c.type === type);
    }
    
    // Apply sorting
    filteredContacts.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return HttpResponse.json({
      success: true,
      data: filteredContacts,
      pagination: {
        page,
        pageSize,
        totalItems: allContacts.length, // Total number of all contacts
        totalPages: Math.ceil(allContacts.length / pageSize),
        hasNextPage: endIndex < allContacts.length,
        hasPreviousPage: page > 1
      },
      meta: {
        searchApplied: !!search,
        filtersApplied: !!(status || type),
        sortedBy: sortBy,
        sortOrder
      }
    });
  }),

  // GET single customer
  http.get('/api/customers/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const customer = mockCustomers.find(c => c.id === params['id']);
    
    if (!customer) {
      return HttpResponse.json(
        { success: false, error: 'Kunde nicht gefunden' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: customer
    });
  }),

  // POST create customer
  http.post('/api/customers', async ({ request }) => {
    await delay(DELAY_MS);
    const data = await request.json() as any;
    
    const newCustomer = {
      id: (mockCustomers.length + 1).toString(),
      ...data,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      totalProjects: 0,
      totalRevenue: 0
    };
    
    return HttpResponse.json({
      success: true,
      data: newCustomer
    }, { status: 201 });
  }),
  // PUT update customer
  http.put('/api/customers/:id', async ({ params, request }) => {
    await delay(DELAY_MS);
    const data = await request.json() as any;
    
    return HttpResponse.json({
      success: true,
      data: {
        id: params['id'],
        ...data,
        lastContact: new Date().toISOString()
      }
    });
  }),

  // DELETE customer
  http.delete('/api/customers/:id', async ({ params }) => {
    await delay(DELAY_MS);
    
    return HttpResponse.json({
      success: true,
      message: `Kunde ${params['id']} wurde gelöscht`
    });
  }),

  // ========== DASHBOARD ENDPOINTS ==========
  
  // GET dashboard stats
  http.get('/api/dashboard/stats', async () => {
    await delay(DELAY_MS);
    
    return HttpResponse.json({
      success: true,
      data: mockDashboardStats
    });
  }),

  // ========== PROJECT ENDPOINTS ==========
  
  // GET all projects
  http.get('/api/projects', async ({ request }) => {
    await delay(DELAY_MS);
    const url = new URL(request.url);
    const customerId = url.searchParams.get('customerId');
    
    let projects = mockProjects;
    if (customerId) {
      projects = projects.filter(p => p.customerId === customerId);
    }
    
    return HttpResponse.json({
      success: true,
      data: projects,
      total: projects.length
    });
  }),
  // GET single project
  http.get('/api/projects/:id', async ({ params }) => {
    await delay(DELAY_MS);
    const project = mockProjects.find(p => p.id === params['id']);
    
    if (!project) {
      return HttpResponse.json(
        { success: false, error: 'Projekt nicht gefunden' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: project
    });
  }),

  // ========== AUTH ENDPOINTS ==========
  
  // POST login
  http.post('/api/auth/login', async ({ request }) => {
    await delay(DELAY_MS);
    const { username, password } = await request.json() as any;
    
    // Validate demo:demo credentials
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      return HttpResponse.json(authResponses.success(user));
    }
    
    return HttpResponse.json(authResponses.failure, { status: 401 });
  }),

  // POST logout
  http.post('/api/auth/logout', async () => {
    await delay(DELAY_MS);
    return HttpResponse.json({ success: true });
  }),

  // GET current user (for remember me functionality)
  http.get('/api/auth/me', async ({ request }) => {
    await delay(DELAY_MS);
    
    const authHeader = request.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer mock-jwt-token')) {
      // Return the demo user
      return HttpResponse.json(authResponses.success(mockUsers[0]));
    }
    
    return HttpResponse.json({ success: false }, { status: 401 });
  })
];

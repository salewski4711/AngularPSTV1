import { http, HttpResponse, delay } from 'msw';
import { mockCustomers, generateMockCustomer } from './data/customers.mock';
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

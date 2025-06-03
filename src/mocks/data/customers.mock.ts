// Mock-Daten für Kunden
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'private' | 'business';
  createdAt: string;
  lastContact: string;
  totalProjects: number;
  totalRevenue: number;
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'ProSolarTec GmbH',
    email: 'info@prosolartec.de',
    phone: '+49 3391 123456',
    address: 'Solarstraße 1',
    city: 'Neuruppin',
    postalCode: '16816',
    status: 'active',
    type: 'business',
    createdAt: '2023-01-15T10:00:00Z',
    lastContact: '2024-02-20T14:30:00Z',
    totalProjects: 12,
    totalRevenue: 125000
  },
  {
    id: '2',
    name: 'Familie Schmidt',
    email: 'schmidt@email.de',
    phone: '+49 30 987654',
    address: 'Hauptstraße 42',
    city: 'Berlin',
    postalCode: '10115',
    status: 'active',
    type: 'private',
    createdAt: '2023-03-20T11:00:00Z',
    lastContact: '2024-01-15T09:00:00Z',
    totalProjects: 2,
    totalRevenue: 35000
  },
  {
    id: '3',
    name: 'Müller & Partner GbR',
    email: 'kontakt@mueller-partner.de',
    phone: '+49 40 555666',
    address: 'Hafenweg 10',
    city: 'Hamburg',
    postalCode: '20095',
    status: 'pending',
    type: 'business',
    createdAt: '2023-06-10T14:00:00Z',
    lastContact: '2024-02-25T16:00:00Z',
    totalProjects: 5,
    totalRevenue: 78500
  },
  {
    id: '4',
    name: 'Thomas Weber',
    email: 't.weber@gmail.com',
    phone: '+49 170 111222',
    address: 'Bergstraße 5',
    city: 'München',
    postalCode: '80331',
    status: 'inactive',
    type: 'private',
    createdAt: '2022-11-01T08:00:00Z',
    lastContact: '2023-12-10T10:00:00Z',
    totalProjects: 1,
    totalRevenue: 15000
  }
];

// Funktion zum Generieren weiterer Mock-Kunden
export function generateMockCustomer(id: number): Customer {
  const types: ('private' | 'business')[] = ['private', 'business'];
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
  const cities = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf'];
  const names = ['Schneider', 'Fischer', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
  
  return {
    id: id.toString(),
    name: `${names[id % names.length]} ${types[id % 2] === 'business' ? 'GmbH' : ''}`,
    email: `${names[id % names.length].toLowerCase()}@example.de`,
    phone: `+49 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000000) + 1000000}`,
    address: `Beispielstraße ${id}`,
    city: cities[id % cities.length],
    postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    status: statuses[id % 3],
    type: types[id % 2],
    createdAt: new Date(2023, 0, id).toISOString(),
    lastContact: new Date(2024, 0, id + 10).toISOString(),
    totalProjects: Math.floor(Math.random() * 20) + 1,
    totalRevenue: Math.floor(Math.random() * 200000) + 10000
  };
}

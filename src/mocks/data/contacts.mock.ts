import { Contact } from '../../app/features/contacts/contacts.service';

// Basis-Daten für realistische Mock-Generierung
const firstNames = ['Max', 'Anna', 'Peter', 'Julia', 'Michael', 'Sarah', 'Thomas', 'Laura', 'Stefan', 'Lisa'];
const lastNames = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
const companies = ['Solar GmbH', 'Energie Plus', 'Green Power AG', 'Öko Systems', 'Future Energy', 'SunTech', 'Wind & Solar', 'EcoHaus'];
const streets = ['Hauptstraße', 'Bahnhofstraße', 'Gartenweg', 'Industriestraße', 'Parkweg', 'Sonnenallee', 'Windstraße', 'Am Markt'];
const cities = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dresden', 'Hannover'];
const customerTypes = ['Kunde', 'Interessent', 'Lead', 'Partner', 'Lieferant'];
const interestOptions = ['WP', 'PV', 'Klima'];

// Customer Status Konfiguration
const customerStatusMap = {
  'Kunde': { tokenKey: 'success', name: 'Kunde' },
  'Interessent': { tokenKey: 'warning', name: 'Interessent' },
  'Lead': { tokenKey: 'info', name: 'Lead' },
  'Partner': { tokenKey: 'primary', name: 'Partner' },
  'Lieferant': { tokenKey: 'neutral', name: 'Lieferant' }
};

// Generiere einzelnen Kontakt
export function generateMockContact(index: number): Contact {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / 10) % lastNames.length];
  const isBusinessContact = index % 3 === 0;
  const customerType = customerTypes[index % customerTypes.length];
  const city = cities[index % cities.length];
  
  // Generiere 1-3 zufällige Interessen
  const numInterests = (index % 3) + 1;
  const interests: string[] = [];
  for (let i = 0; i < numInterests; i++) {
    const interest = interestOptions[(index + i) % interestOptions.length];
    if (!interests.includes(interest)) {
      interests.push(interest);
    }
  }
  
  return {
    id: `contact-${index}`,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${isBusinessContact ? 'firma' : 'privat'}.de`,
    phone: `+49 ${1500 + index} ${Math.floor(Math.random() * 9000000) + 1000000}`,
    company: isBusinessContact ? companies[index % companies.length] : '',
    position: isBusinessContact ? 'Geschäftsführer' : '',
    address: `${streets[index % streets.length]} ${index + 1}, ${cities[index % cities.length]}`,
    street: `${streets[index % streets.length]} ${index + 1}`,
    city: city,
    postalCode: `${10000 + (index * 100) % 90000}`,
    status: index % 10 === 0 ? 'inactive' : index % 5 === 0 ? 'pending' : 'active',
    type: isBusinessContact ? 'business' : 'private',
    customerType: customerType,
    interests: interests,
    customerStatus: {
      id: `status-${index}`,
      name: customerType,
      tokenKey: customerStatusMap[customerType as keyof typeof customerStatusMap].tokenKey
    },
    tags: [`Tag${index % 5}`, `Category${index % 3}`],
    notes: `Notizen zu ${firstName} ${lastName}`,
    score: 50 + (index % 50),
    createdAt: new Date(2023, index % 12, (index % 28) + 1).toISOString(),
    lastContact: new Date(2024, (index + 3) % 12, (index % 28) + 1).toISOString(),
    lastActivity: new Date(2024, (index + 1) % 12, (index % 28) + 1).toISOString(),
    totalProjects: index % 10,
    totalRevenue: (index % 10) * 12500
  };
}

// Generiere Mock-Kontakte
export const mockContacts: Contact[] = Array.from({ length: 100 }, (_, i) => generateMockContact(i));

// Erste 10 Kontakte mit speziellen Eigenschaften
mockContacts[0] = {
  ...mockContacts[0],
  name: 'Max Mustermann',
  firstName: 'Max',
  lastName: 'Mustermann',
  company: 'ProSolarTec GmbH',
  customerType: 'Kunde',
  interests: ['PV', 'WP'],
  score: 95,
  customerStatus: {
    id: 'status-0',
    name: 'Kunde',
    tokenKey: 'success'
  }
};

mockContacts[1] = {
  ...mockContacts[1],
  name: 'Anna Schmidt',
  firstName: 'Anna',
  lastName: 'Schmidt',
  customerType: 'Interessent',
  interests: ['PV', 'WP'],
  score: 78,
  customerStatus: {
    id: 'status-1',
    name: 'Interessent',
    tokenKey: 'warning'
  }
};

mockContacts[2] = {
  ...mockContacts[2],
  name: 'Peter Weber',
  firstName: 'Peter',
  lastName: 'Weber',
  company: 'Green Energy Solutions',
  customerType: 'Lead',
  interests: ['Klima', 'WP'],
  score: 62,
  customerStatus: {
    id: 'status-2',
    name: 'Lead',
    tokenKey: 'info'
  }
};

// Export für Filter-Optionen
export const availableCities = [...new Set(mockContacts.map(c => c.city))].sort();
export const availableCustomerTypes = [...new Set(mockContacts.map(c => c.customerType))].sort();
export const availableInterests = [...interestOptions];
// Projekt Mock-Daten
export interface Project {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  type: 'solar-panel' | 'battery' | 'maintenance' | 'consulting';
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  progress: number;
  assignedTeam: string[];
}

export const mockProjects: Project[] = [
  {
    id: 'P001',
    customerId: '1',
    customerName: 'ProSolarTec GmbH',
    title: 'Solaranlage Hauptgebäude',
    description: 'Installation einer 50kWp Photovoltaikanlage auf dem Hauptgebäude',
    status: 'in-progress',
    type: 'solar-panel',
    startDate: '2024-01-15',
    budget: 85000,
    spent: 42000,
    progress: 65,
    assignedTeam: ['Max Mustermann', 'Anna Schmidt']
  },
  {
    id: 'P002',
    customerId: '2',
    customerName: 'Familie Schmidt',
    title: 'Einfamilienhaus PV-Anlage',
    description: '8kWp Anlage mit Batteriespeicher für Einfamilienhaus',
    status: 'completed',
    type: 'solar-panel',
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    budget: 25000,
    spent: 23500,
    progress: 100,
    assignedTeam: ['Peter Weber']
  },
  {
    id: 'P003',
    customerId: '3',
    customerName: 'Müller & Partner GbR',
    title: 'Wartungsvertrag 2024',
    description: 'Jährlicher Wartungsvertrag für bestehende Anlagen',
    status: 'planning',
    type: 'maintenance',
    startDate: '2024-03-01',
    budget: 12000,
    spent: 0,
    progress: 0,
    assignedTeam: ['Service Team']
  }
];

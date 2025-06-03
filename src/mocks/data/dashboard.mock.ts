// Dashboard Mock-Daten
export interface DashboardStats {
  totalCustomers: number;
  activeProjects: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  newCustomersThisMonth: number;
  projectsCompletedThisMonth: number;
  revenueChart: ChartData[];
  projectsChart: ChartData[];
}

export interface ChartData {
  month: string;
  value: number;
}

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 147,
  activeProjects: 23,
  monthlyRevenue: 45250,
  yearlyRevenue: 542000,
  newCustomersThisMonth: 8,
  projectsCompletedThisMonth: 5,
  revenueChart: [
    { month: 'Jan', value: 38000 },
    { month: 'Feb', value: 42000 },
    { month: 'Mär', value: 35000 },
    { month: 'Apr', value: 48000 },
    { month: 'Mai', value: 51000 },
    { month: 'Jun', value: 45250 }
  ],
  projectsChart: [
    { month: 'Jan', value: 4 },
    { month: 'Feb', value: 6 },
    { month: 'Mär', value: 3 },
    { month: 'Apr', value: 7 },
    { month: 'Mai', value: 8 },
    { month: 'Jun', value: 5 }
  ]
};

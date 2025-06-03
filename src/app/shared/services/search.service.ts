import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SearchResult } from '../components/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Mock data for demonstration
  private mockData: SearchResult[] = [
    // Customers
    { id: 'c1', title: 'John Doe', subtitle: 'john@example.com', type: 'customer', icon: 'user', route: '/customers/c1' },
    { id: 'c2', title: 'Jane Smith', subtitle: 'jane@example.com', type: 'customer', icon: 'user', route: '/customers/c2' },
    { id: 'c3', title: 'Bob Johnson', subtitle: 'bob@example.com', type: 'customer', icon: 'user', route: '/customers/c3' },
    { id: 'c4', title: 'Alice Williams', subtitle: 'alice@example.com', type: 'customer', icon: 'user', route: '/customers/c4' },
    { id: 'c5', title: 'Charlie Brown', subtitle: 'charlie@example.com', type: 'customer', icon: 'user', route: '/customers/c5' },
    
    // Offers
    { id: 'o1', title: 'Solar Panel Installation - Residential', subtitle: 'Quote #2024-001', type: 'offer', icon: 'file-text', route: '/offers/o1' },
    { id: 'o2', title: 'Commercial Solar Project', subtitle: 'Quote #2024-002', type: 'offer', icon: 'file-text', route: '/offers/o2' },
    { id: 'o3', title: 'Solar Maintenance Package', subtitle: 'Quote #2024-003', type: 'offer', icon: 'file-text', route: '/offers/o3' },
    { id: 'o4', title: 'Energy Storage System', subtitle: 'Quote #2024-004', type: 'offer', icon: 'file-text', route: '/offers/o4' },
    
    // Projects
    { id: 'p1', title: 'Residential Solar Installation - Miller', subtitle: 'In Progress', type: 'project', icon: 'folder', route: '/projects/p1' },
    { id: 'p2', title: 'Office Building Solar Retrofit', subtitle: 'Planning', type: 'project', icon: 'folder', route: '/projects/p2' },
    { id: 'p3', title: 'Solar Farm Development', subtitle: 'Completed', type: 'project', icon: 'folder', route: '/projects/p3' },
    { id: 'p4', title: 'School Solar Project', subtitle: 'In Progress', type: 'project', icon: 'folder', route: '/projects/p4' },
    
    // Documents
    { id: 'd1', title: 'Installation Manual.pdf', subtitle: '2.5 MB', type: 'document', icon: 'file', route: '/documents/d1' },
    { id: 'd2', title: 'Warranty Certificate.pdf', subtitle: '1.2 MB', type: 'document', icon: 'file', route: '/documents/d2' },
    { id: 'd3', title: 'Technical Specifications.xlsx', subtitle: '3.8 MB', type: 'document', icon: 'file', route: '/documents/d3' },
    { id: 'd4', title: 'Project Timeline.docx', subtitle: '0.8 MB', type: 'document', icon: 'file', route: '/documents/d4' },
    { id: 'd5', title: 'Budget Proposal.pdf', subtitle: '1.5 MB', type: 'document', icon: 'file', route: '/documents/d5' }
  ];
  
  constructor() {}
  
  search(query: string): Observable<SearchResult[]> {
    const lowerQuery = query.toLowerCase().trim();
    
    return of(this.mockData).pipe(
      delay(300), // Simulate API delay
      map(data => {
        return data.filter(item => {
          const searchableText = `${item.title} ${item.subtitle || ''}`.toLowerCase();
          return searchableText.includes(lowerQuery);
        });
      }),
      map(results => results.slice(0, 10)) // Limit to 10 results
    );
  }
  
  searchByType(query: string, type: SearchResult['type']): Observable<SearchResult[]> {
    const lowerQuery = query.toLowerCase().trim();
    
    return of(this.mockData).pipe(
      delay(300),
      map(data => {
        return data.filter(item => {
          if (item.type !== type) {return false;}
          const searchableText = `${item.title} ${item.subtitle || ''}`.toLowerCase();
          return searchableText.includes(lowerQuery);
        });
      })
    );
  }
  
  getRecentSearches(): SearchResult[] {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  }
}
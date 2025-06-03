import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { SearchResult } from '../components/search/search.component';

describe('SearchService', () => {
  let service: SearchService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });
  
  afterEach(() => {
    localStorage.clear();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should search and return filtered results', (done) => {
    service.search('john').subscribe(results => {
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('John');
      done();
    });
  });
  
  it('should return empty array for no matches', (done) => {
    service.search('xyz123notfound').subscribe(results => {
      expect(results).toEqual([]);
      done();
    });
  });
  
  it('should be case insensitive', (done) => {
    service.search('JOHN').subscribe(results => {
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('John');
      done();
    });
  });
  
  it('should search by type', (done) => {
    service.searchByType('solar', 'project').subscribe(results => {
      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.type === 'project')).toBe(true);
      done();
    });
  });
  
  it('should limit results to 10', (done) => {
    service.search('e').subscribe(results => {
      expect(results.length).toBeLessThanOrEqual(10);
      done();
    });
  });
  
  it('should get recent searches from localStorage', () => {
    const mockRecentSearches: SearchResult[] = [
      { id: 'c1', title: 'Test', type: 'customer', icon: 'user', route: '/test' }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockRecentSearches));
    
    const recent = service.getRecentSearches();
    expect(recent).toEqual(mockRecentSearches);
  });
  
  it('should return empty array when no recent searches', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    const recent = service.getRecentSearches();
    expect(recent).toEqual([]);
  });
});
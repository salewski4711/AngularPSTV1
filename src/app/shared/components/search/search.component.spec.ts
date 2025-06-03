import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SearchComponent, SearchResult } from './search.component';
import { SearchService } from '../../services/search.service';
import { IconComponent } from '../../icons/icon.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: jasmine.SpyObj<SearchService>;
  
  const mockResults: SearchResult[] = [
    { id: 'c1', title: 'John Doe', subtitle: 'john@example.com', type: 'customer', icon: 'user', route: '/customers/c1' },
    { id: 'p1', title: 'Solar Project', subtitle: 'In Progress', type: 'project', icon: 'folder', route: '/projects/p1' }
  ];
  
  beforeEach(async () => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', ['search']);
    
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule, IconComponent],
      providers: [
        { provide: SearchService, useValue: searchServiceSpy }
      ]
    }).compileComponents();
    
    searchService = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  afterEach(() => {
    localStorage.clear();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should debounce search input', fakeAsync(() => {
    searchService.search.and.returnValue(of(mockResults));
    
    component.onSearch('test');
    expect(searchService.search).not.toHaveBeenCalled();
    
    tick(300);
    expect(searchService.search).toHaveBeenCalledWith('test');
    expect(component.searchResults).toEqual(mockResults);
  }));
  
  it('should clear search', () => {
    component.searchQuery = 'test';
    component.searchResults = mockResults;
    component.showDropdown = true;
    
    component.clearSearch();
    
    expect(component.searchQuery).toBe('');
    expect(component.searchResults).toEqual([]);
    expect(component.showDropdown).toBe(false);
  });
  
  it('should handle keyboard navigation', () => {
    component.searchResults = mockResults;
    component.showDropdown = true;
    
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.onKeyDown(downEvent);
    expect(component.selectedIndex).toBe(0);
    
    component.onKeyDown(downEvent);
    expect(component.selectedIndex).toBe(1);
    
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    component.onKeyDown(upEvent);
    expect(component.selectedIndex).toBe(0);
  });
  
  it('should select result and save to recent searches', () => {
    const result = mockResults[0];
    spyOn(localStorage, 'setItem');
    
    component.selectResult(result);
    
    expect(component.searchQuery).toBe(result.title);
    expect(component.showDropdown).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('recentSearches', jasmine.any(String));
  });
  
  it('should load recent searches', () => {
    const recentSearches = [mockResults[0]];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(recentSearches));
    
    component.ngOnInit();
    
    expect(component.recentSearches).toEqual(recentSearches);
  });
  
  it('should show recent searches on focus when empty', () => {
    component.recentSearches = [mockResults[0]];
    component.searchQuery = '';
    
    component.onFocus();
    
    expect(component.searchResults).toEqual(component.recentSearches);
    expect(component.showDropdown).toBe(true);
  });
  
  it('should get correct icon for result type', () => {
    expect(component.getResultIcon('customer')).toBe('user');
    expect(component.getResultIcon('offer')).toBe('file-text');
    expect(component.getResultIcon('project')).toBe('folder');
    expect(component.getResultIcon('document')).toBe('file');
    expect(component.getResultIcon('unknown')).toBe('search');
  });
});
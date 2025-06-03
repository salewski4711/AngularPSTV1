import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { IconComponent } from '../../icons/icon.component';

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'customer' | 'offer' | 'project' | 'document';
  icon: string;
  route: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() placeholder = 'Suchen...';
  @Output() searchSubmit = new EventEmitter<string>();
  
  searchQuery = '';
  searchResults: SearchResult[] = [];
  recentSearches: SearchResult[] = [];
  isLoading = false;
  showDropdown = false;
  selectedIndex = -1;
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private blurTimeout?: number;
  
  constructor(private searchService: SearchService) {}
  
  ngOnInit() {
    this.loadRecentSearches();
    
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.trim()) {
          this.isLoading = true;
          return this.searchService.search(query);
        }
        return [];
      }),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.searchResults = results;
      this.isLoading = false;
      this.showDropdown = true;
      this.selectedIndex = -1;
    });
  }
  
  ngOnDestroy() {
    // Clear timeout if still pending
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  onSearch(query: string) {
    this.searchQuery = query;
    if (query.trim()) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
      this.showDropdown = false;
    }
  }
  
  onFocus() {
    if (!this.searchQuery.trim() && this.recentSearches.length > 0) {
      this.searchResults = this.recentSearches;
      this.showDropdown = true;
    }
  }
  
  onBlur() {
    // Clear existing timeout if any
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
    
    // Delay to allow click events on results
    this.blurTimeout = window.setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
  
  selectResult(result: SearchResult) {
    this.saveToRecentSearches(result);
    this.searchQuery = result.title;
    this.showDropdown = false;
    // Navigate to result - implement routing logic here
    console.log('Navigate to:', result.route);
  }
  
  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showDropdown = false;
    this.searchInput.nativeElement.focus();
  }
  
  onKeyDown(event: KeyboardEvent) {
    if (!this.showDropdown || this.searchResults.length === 0) {return;}
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.searchResults.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.searchResults[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.showDropdown = false;
        this.selectedIndex = -1;
        break;
    }
  }
  
  private loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      this.recentSearches = JSON.parse(saved);
    }
  }
  
  private saveToRecentSearches(result: SearchResult) {
    const existing = this.recentSearches.findIndex(r => r.id === result.id);
    if (existing >= 0) {
      this.recentSearches.splice(existing, 1);
    }
    this.recentSearches.unshift(result);
    this.recentSearches = this.recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
  
  getResultIcon(type: string): string {
    switch (type) {
      case 'customer': return 'user';
      case 'offer': return 'file-text';
      case 'project': return 'folder';
      case 'document': return 'file';
      default: return 'search';
    }
  }
  
  onSubmit() {
    if (this.searchQuery.trim()) {
      this.searchSubmit.emit(this.searchQuery);
      this.showDropdown = false;
    }
  }
}
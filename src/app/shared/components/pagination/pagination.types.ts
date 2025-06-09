export interface PaginationConfig {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxPages?: number;
  showPageSize?: boolean;
  showFirstLast?: boolean;
  showInfo?: boolean;
  compact?: boolean;
  pageSizeOptions?: number[];
}

export interface PaginationEvents {
  pageChange: (page: number) => void;
  pageSizeChange: (pageSize: number) => void;
}

export interface PaginationInfo {
  totalPages: number;
  startItem: number;
  endItem: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
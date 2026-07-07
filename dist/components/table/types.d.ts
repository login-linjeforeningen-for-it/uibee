import { ReactNode } from "react";

//#region src/components/table/types.d.ts
type TableColor = 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'orange' | 'purple';
type Column<T extends Record<string, unknown> = Record<string, unknown>> = {
  key: keyof T & string;
  label?: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  highlight?: Record<string, TableColor>;
  render?: (value: unknown, row: T) => ReactNode;
  truncate?: boolean;
};
type SortState = {
  column: string;
  order: 'asc' | 'desc';
};
type Density = 'compact' | 'comfortable' | 'spacious';
type TableVariant = 'original' | 'modern';
type TableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  data: T[];
  columns: Column<T>[];
  idKey?: keyof T & string;
  variant?: TableVariant;
  density?: Density;
  striped?: boolean;
  className?: string;
  loading?: boolean;
  loadingRows?: number;
  emptyState?: ReactNode;
  redirectPath?: string | {
    path: string;
    key?: string;
  };
  onRowClick?: (row: T, id: string) => void;
  renderExpandedRow?: (row: T) => ReactNode;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  urlState?: boolean;
  sort?: SortState;
  onSort?: (sort: SortState) => void;
  pageSize?: number;
  totalRows?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  hidePagination?: boolean;
  menuItems?: (row: T, id: string) => ReactNode;
};
//#endregion
export { Column, Density, SortState, TableColor, TableProps, TableVariant };
import { TableVariant } from "./types.js";

//#region src/components/table/pagination.d.ts
type PaginationProps = {
  totalRows: number;
  pageSize: number;
  variant?: TableVariant;
  urlState?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
};
declare function Pagination(props: PaginationProps): import("react").JSX.Element;
//#endregion
export { PaginationProps, Pagination as default };
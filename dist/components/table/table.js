"use client";
import { VARIANT_CONTAINER } from "./constants.js";
import Header from "./header.js";
import { resolveId } from "./utils.js";
import { MenuButton } from "./menu.js";
import Body from "./body.js";
import Skeleton from "./skeleton.js";
import Empty from "./empty.js";
import Pagination from "./pagination.js";
import { Suspense, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
//#region src/components/table/table.tsx
function TableShell({ data, columns, idKey, variant, density, striped, loading, loadingRows, emptyState, redirectPath, onRowClick, renderExpandedRow, selectable, selectedIds, onSelectionChange, sort, onSort, page, onPageChange, totalRows, pageSize, hidePagination, menuItems, className }) {
	const allIds = data.map((row) => resolveId(row, idKey, columns));
	const allIdsSet = useMemo(() => new Set(allIds), [allIds]);
	const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
	const someSelected = !allSelected && allIds.some((id) => selectedIds.includes(id));
	function handleSelectAll() {
		if (allSelected) onSelectionChange(selectedIds.filter((id) => !allIdsSet.has(id)));
		else onSelectionChange([.../* @__PURE__ */ new Set([...selectedIds, ...allIds])]);
	}
	const isEmpty = !loading && data.length === 0;
	const showPagination = !hidePagination && pageSize > 0 && totalRows > 0;
	const hasMenu = Boolean(menuItems);
	const hasSelect = Boolean(selectable);
	const hasExpand = Boolean(renderExpandedRow);
	const paginationPad = variant === "original" ? "px-4 pb-4 pt-3" : "pt-4";
	return /* @__PURE__ */ jsxs("div", {
		className: [
			"flex flex-col min-h-0 w-full",
			VARIANT_CONTAINER[variant],
			className
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 min-h-0 overflow-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "min-w-full table-auto border-separate border-spacing-0",
				children: [/* @__PURE__ */ jsx(Header, {
					columns,
					sort,
					onSort,
					hasMenu,
					hasSelect,
					hasExpand,
					allSelected,
					someSelected,
					onSelectAll: handleSelectAll,
					variant,
					density
				}), loading ? /* @__PURE__ */ jsx(Skeleton, {
					columns,
					rows: loadingRows,
					variant,
					density,
					hasMenu,
					hasSelect
				}) : isEmpty ? /* @__PURE__ */ jsx(Empty, { emptyState }) : /* @__PURE__ */ jsx(Body, {
					data,
					columns,
					idKey,
					variant,
					density,
					striped,
					redirectPath,
					onRowClick,
					renderExpandedRow,
					selectable,
					selectedIds,
					onSelectionChange,
					menuItems
				})]
			})
		}), showPagination && /* @__PURE__ */ jsx("div", {
			className: paginationPad,
			children: /* @__PURE__ */ jsx(Pagination, {
				page,
				totalRows,
				pageSize,
				onPageChange,
				variant
			})
		})]
	});
}
function useInternalSelection(props) {
	const [internal, setInternal] = useState([]);
	return {
		selectedIds: props.selectedIds ?? internal,
		onSelectionChange: props.onSelectionChange ?? setInternal
	};
}
function applyDefaults(props) {
	return {
		variant: props.variant ?? "original",
		density: props.density ?? "comfortable",
		selectable: props.selectable ?? false,
		loading: props.loading ?? false,
		loadingRows: props.loadingRows ?? props.pageSize ?? 5,
		striped: props.striped ?? false,
		hidePagination: props.hidePagination ?? false,
		pageSize: props.pageSize ?? 0
	};
}
function TableLocalState(props) {
	const defaults = applyDefaults(props);
	const selection = useInternalSelection(props);
	const [sort, setSort] = useState(void 0);
	const [page, setPage] = useState(1);
	const ps = defaults.pageSize;
	const allRows = props.data.length;
	const sorted = useMemo(() => {
		if (!sort) return props.data;
		return [...props.data].sort((a, b) => {
			const av = a[sort.column];
			const bv = b[sort.column];
			const cmp = String(av ?? "").localeCompare(String(bv ?? ""), void 0, {
				numeric: true,
				sensitivity: "base"
			});
			return sort.order === "asc" ? cmp : -cmp;
		});
	}, [props.data, sort]);
	const displayData = ps > 0 ? sorted.slice((page - 1) * ps, page * ps) : sorted;
	function handleSort(newSort) {
		setSort(newSort);
		setPage(1);
	}
	return /* @__PURE__ */ jsx(TableShell, {
		...props,
		...defaults,
		...selection,
		data: displayData,
		sort,
		onSort: handleSort,
		page,
		onPageChange: setPage,
		totalRows: ps > 0 ? allRows : props.totalRows ?? allRows
	});
}
function TableURLState(props) {
	const defaults = applyDefaults(props);
	const selection = useInternalSelection(props);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const urlColumn = searchParams.get("column") ?? "";
	const urlOrder = searchParams.get("order") ?? "asc";
	const urlPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
	const sort = urlColumn ? {
		column: urlColumn,
		order: urlOrder
	} : void 0;
	function handleSort(newSort) {
		const p = new URLSearchParams(searchParams.toString());
		p.set("column", newSort.column);
		p.set("order", newSort.order);
		p.set("page", "1");
		router.replace(`${pathname}?${p.toString()}`);
	}
	function handlePageChange(newPage) {
		const p = new URLSearchParams(searchParams.toString());
		p.set("page", String(newPage));
		router.replace(`${pathname}?${p.toString()}`);
	}
	return /* @__PURE__ */ jsx(TableShell, {
		...props,
		...defaults,
		...selection,
		sort,
		onSort: handleSort,
		page: urlPage,
		onPageChange: handlePageChange,
		totalRows: props.totalRows ?? props.data.length
	});
}
function TableControlled(props) {
	const defaults = applyDefaults(props);
	const selection = useInternalSelection(props);
	return /* @__PURE__ */ jsx(TableShell, {
		...props,
		...defaults,
		...selection,
		sort: props.sort,
		onSort: props.onSort,
		page: props.page ?? 1,
		onPageChange: props.onPageChange ?? (() => {}),
		totalRows: props.totalRows ?? props.data.length
	});
}
function Table(props) {
	if (props.sort !== void 0 || props.onSort !== void 0) return /* @__PURE__ */ jsx(TableControlled, { ...props });
	if (props.urlState) {
		const defaults = applyDefaults(props);
		return /* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx(TableShell, {
				...props,
				...defaults,
				selectedIds: props.selectedIds ?? [],
				onSelectionChange: props.onSelectionChange ?? (() => {}),
				sort: void 0,
				onSort: () => {},
				page: 1,
				onPageChange: () => {},
				totalRows: props.totalRows ?? props.data.length
			}),
			children: /* @__PURE__ */ jsx(TableURLState, { ...props })
		});
	}
	return /* @__PURE__ */ jsx(TableLocalState, { ...props });
}
//#endregion
export { MenuButton, Table };

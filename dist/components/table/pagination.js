"use client";
import { Suspense, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
//#region src/components/table/pagination.tsx
function computeTotalPages(totalRows, pageSize) {
	return Math.max(1, pageSize > 0 ? Math.ceil(totalRows / pageSize) : 1);
}
function pageRange(current, total) {
	const delta = 2;
	const left = Math.max(1, current - delta);
	const right = Math.min(total, current + delta);
	const pages = [];
	if (left > 1) {
		pages.push(1);
		if (left > 2) pages.push("…");
	}
	for (let i = left; i <= right; i++) pages.push(i);
	if (right < total) {
		if (right < total - 1) pages.push("…");
		pages.push(total);
	}
	return pages;
}
function PaginationShell({ page, totalPages, totalRows, pageSize, onPageChange, variant }) {
	const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
	const end = Math.min(page * pageSize, totalRows);
	const pages = pageRange(page, totalPages);
	const btnBase = `
        flex items-center justify-center rounded-md border text-sm transition-colors duration-100
        disabled:opacity-35 disabled:cursor-not-allowed
    `;
	const btnStyle = variant === "original" ? "border-login-500/50 bg-login-700 hover:bg-login-600 text-login-100" : "border-login-500/40 bg-transparent hover:bg-login-700/60 text-login-100";
	const pageActive = variant === "original" ? "border-login bg-login/10 text-login" : "border-login text-login bg-transparent";
	const pageInactive = variant === "original" ? "border-login-500/50 bg-login-700 text-login-100 hover:bg-login-600" : "border-transparent bg-transparent text-login-200 hover:text-login-75 hover:bg-login-700/60";
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between w-full gap-4 flex-wrap",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-xs text-login-300 tabular-nums",
			children: totalRows === 0 ? "No results" : `${start}-${end} of ${totalRows}`
		}), /* @__PURE__ */ jsxs("nav", {
			className: "flex items-center gap-1.5",
			"aria-label": "Pagination",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Previous page",
					disabled: page <= 1,
					onClick: () => onPageChange(page - 1),
					className: `${btnBase} ${btnStyle} h-8 w-8`,
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
				}),
				pages.map((p, i) => p === "…" ? /* @__PURE__ */ jsx("span", {
					className: "w-8 text-center text-sm text-login-400 select-none",
					children: "…"
				}, `ellipsis-${i}`) : /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-current": p === page ? "page" : void 0,
					onClick: () => onPageChange(p),
					className: `${btnBase} h-8 min-w-8 px-2 tabular-nums ${p === page ? pageActive : pageInactive}`,
					children: p
				}, p)),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Next page",
					disabled: page >= totalPages,
					onClick: () => onPageChange(page + 1),
					className: `${btnBase} ${btnStyle} h-8 w-8`,
					children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
				})
			]
		})]
	});
}
function PaginationLocalState({ totalRows, pageSize, variant = "original" }) {
	const [page, setPage] = useState(1);
	return /* @__PURE__ */ jsx(PaginationShell, {
		page,
		totalPages: computeTotalPages(totalRows, pageSize),
		totalRows,
		pageSize,
		onPageChange: setPage,
		variant
	});
}
function PaginationURLState({ totalRows, pageSize, variant = "original" }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
	function onPageChange(p) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(p));
		router.replace(`${pathname}?${params.toString()}`);
	}
	return /* @__PURE__ */ jsx(PaginationShell, {
		page,
		totalPages: computeTotalPages(totalRows, pageSize),
		totalRows,
		pageSize,
		onPageChange,
		variant
	});
}
function Pagination(props) {
	const { totalRows, pageSize, variant = "original", urlState, page, onPageChange } = props;
	if (urlState) return /* @__PURE__ */ jsx(Suspense, {
		fallback: /* @__PURE__ */ jsx(PaginationShell, {
			page: 1,
			totalPages: computeTotalPages(totalRows, pageSize),
			totalRows,
			pageSize,
			onPageChange: () => {},
			variant
		}),
		children: /* @__PURE__ */ jsx(PaginationURLState, { ...props })
	});
	if (page !== void 0 && onPageChange !== void 0) return /* @__PURE__ */ jsx(PaginationShell, {
		page,
		totalPages: computeTotalPages(totalRows, pageSize),
		totalRows,
		pageSize,
		onPageChange,
		variant
	});
	return /* @__PURE__ */ jsx(PaginationLocalState, { ...props });
}
//#endregion
export { Pagination as default };

"use client";
import { DENSITY_TH, VARIANT_HEAD_BG, VARIANT_HEAD_BORDER, VARIANT_THEAD, VARIANT_THEAD_TH } from "./constants.js";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/table/header.tsx
function formatLabel(key, label) {
	if (label) return label;
	if (key.length <= 2) return key.toUpperCase();
	return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replaceAll("_", " ").replaceAll("-", " ").split(/\s+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function Header({ columns, sort, onSort, hasMenu, hasSelect, hasExpand, allSelected, someSelected, onSelectAll, variant, density }) {
	function handleSort(key) {
		onSort({
			column: key,
			order: sort?.column === key && sort?.order === "asc" ? "desc" : "asc"
		});
	}
	return /* @__PURE__ */ jsx("thead", {
		className: VARIANT_THEAD[variant],
		children: /* @__PURE__ */ jsxs("tr", { children: [
			hasSelect && /* @__PURE__ */ jsx("th", {
				className: `sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`,
				style: {
					width: "3rem",
					minWidth: "3rem"
				},
				children: /* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						"aria-label": allSelected ? "Deselect all" : "Select all",
						onClick: onSelectAll,
						className: `
                                h-4 w-4 rounded border flex items-center justify-center transition-colors cursor-pointer
                                ${allSelected || someSelected ? "bg-login border-login text-white" : "border-login-400 bg-transparent hover:border-login-200"}
                            `,
						children: [someSelected && !allSelected && /* @__PURE__ */ jsx("span", { className: "block h-0.5 w-2 bg-white rounded-full" }), allSelected && /* @__PURE__ */ jsx("svg", {
							className: "h-3 w-3",
							viewBox: "0 0 12 12",
							fill: "none",
							children: /* @__PURE__ */ jsx("path", {
								d: "M2 6l3 3 5-5",
								stroke: "currentColor",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})]
					})
				})
			}),
			columns.map((col) => {
				const sortable = col.sortable !== false;
				const isActive = sort?.column === col.key;
				const ariaSort = isActive ? sort.order === "asc" ? "ascending" : "descending" : "none";
				const alignClass = col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "";
				return /* @__PURE__ */ jsx("th", {
					"aria-sort": sortable ? ariaSort : void 0,
					style: col.width ? { width: col.width } : void 0,
					className: `
                                sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}
                                text-xs font-medium uppercase tracking-wider
                                ${DENSITY_TH[density]} ${VARIANT_THEAD_TH[variant]}
                            `,
					children: sortable ? /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `group inline-flex items-center gap-1.5 w-full cursor-pointer ${alignClass}`,
						onClick: () => handleSort(col.key),
						children: [/* @__PURE__ */ jsx("span", {
							className: "whitespace-nowrap",
							children: formatLabel(col.key, col.label)
						}), /* @__PURE__ */ jsx("span", {
							className: "shrink-0 text-current",
							children: isActive ? sort.order === "asc" ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-3.5 w-3.5 opacity-0 group-hover:opacity-35 transition-opacity" })
						})]
					}) : /* @__PURE__ */ jsx("span", {
						className: `flex w-full whitespace-nowrap ${alignClass}`,
						children: formatLabel(col.key, col.label)
					})
				}, col.key);
			}),
			hasExpand && /* @__PURE__ */ jsx("th", {
				className: `sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`,
				style: {
					width: "2.5rem",
					minWidth: "2.5rem"
				},
				children: /* @__PURE__ */ jsx("span", {
					className: `
                            flex items-center justify-center
                            text-xs font-medium tracking-wider uppercase opacity-50
                            ${VARIANT_THEAD_TH[variant]}
                        `,
					children: "+"
				})
			}),
			hasMenu && /* @__PURE__ */ jsx("th", {
				"aria-hidden": "true",
				className: `sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`,
				style: {
					width: "3.5rem",
					minWidth: "3.5rem"
				}
			})
		] })
	});
}
//#endregion
export { Header as default };

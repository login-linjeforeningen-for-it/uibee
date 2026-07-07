"use client";
import { DENSITY_TD, HIGHLIGHT, VARIANT_ROW_BORDER, VARIANT_ROW_HOVER, VARIANT_ROW_STRIPED, VARIANT_TBODY } from "./constants.js";
import { formatValue } from "./format.js";
import { resolveId } from "./utils.js";
import Menu from "./menu.js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter } from "next/navigation.js";
//#region src/components/table/body.tsx
function useClickOutside(ref, cb, enabled) {
	useEffect(() => {
		if (!enabled) return;
		function handler(e) {
			if (ref.current && !ref.current.contains(e.target)) cb();
		}
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [
		ref,
		cb,
		enabled
	]);
}
function resolveRedirectUrl(redirectPath, row, id) {
	if (!redirectPath) return null;
	const cfg = typeof redirectPath === "string" ? {
		path: redirectPath,
		key: void 0
	} : redirectPath;
	if (!cfg.path) return null;
	const rid = cfg.key ? String(row[cfg.key] ?? id) : id;
	return cfg.path.includes("?") ? `${cfg.path}${rid}` : `${cfg.path}/${rid}`;
}
function Cell({ col, row, density, variant }) {
	const value = row[col.key];
	const shouldTruncate = col.truncate === true;
	const align = col.align ?? "left";
	const wrapperAlign = align === "right" ? "text-right" : align === "center" ? "text-center" : "";
	let content;
	if (col.render) content = col.render(value, row);
	else if (col.highlight) {
		const colorName = col.highlight[String(value)] ?? col.highlight["default"];
		const formatted = String(formatValue(col.key, value));
		if (colorName) content = /* @__PURE__ */ jsx("span", {
			className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${HIGHLIGHT[colorName]}`,
			children: formatted
		});
		else content = /* @__PURE__ */ jsx("span", {
			className: shouldTruncate ? "block truncate" : "whitespace-nowrap",
			children: formatted
		});
	} else {
		const formatted = formatValue(col.key, value);
		content = /* @__PURE__ */ jsx("span", {
			className: shouldTruncate ? "block truncate" : "whitespace-nowrap",
			children: formatted === null || formatted === void 0 ? "-" : String(formatted)
		});
	}
	return /* @__PURE__ */ jsx("td", {
		style: col.width ? {
			width: col.width,
			maxWidth: col.width
		} : void 0,
		className: `
                align-middle text-sm text-login-75 ${wrapperAlign}
                ${DENSITY_TD[density]} ${VARIANT_ROW_BORDER[variant]}
            `,
		children: content
	});
}
function Body({ data, columns, idKey, variant, density, striped, redirectPath, onRowClick, renderExpandedRow, selectable, selectedIds, onSelectionChange, menuItems }) {
	const router = useRouter();
	const [openMenuId, setOpenMenuId] = useState(null);
	const [anchor, setAnchor] = useState(null);
	const [expandedId, setExpandedId] = useState(null);
	const menuRef = useRef(null);
	const menuWasOpenOnMouseDown = useRef(false);
	const closeMenu = useCallback(() => setOpenMenuId(null), []);
	useClickOutside(menuRef, closeMenu, openMenuId !== null);
	useEffect(() => {
		if (openMenuId === null) return;
		document.addEventListener("scroll", closeMenu, true);
		return () => document.removeEventListener("scroll", closeMenu, true);
	}, [closeMenu, openMenuId]);
	function openMenu(id, coords) {
		setAnchor(coords);
		setOpenMenuId(id);
	}
	const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
	function toggleSelect(id) {
		onSelectionChange(selectedSet.has(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id]);
	}
	const hasMenu = Boolean(menuItems);
	const hasExpand = Boolean(renderExpandedRow);
	return /* @__PURE__ */ jsx("tbody", {
		className: VARIANT_TBODY[variant],
		children: data.map((row, rowIdx) => {
			const id = resolveId(row, idKey, columns);
			const url = resolveRedirectUrl(redirectPath, row, id);
			const isClickable = Boolean(url || onRowClick || hasExpand);
			const isMenuOpen = openMenuId === id;
			const isExpanded = expandedId === id;
			const isSelected = selectable && selectedSet.has(id);
			const expandedContent = renderExpandedRow?.(row);
			const rowClass = [
				"transition-colors duration-100",
				isClickable ? "cursor-pointer" : "",
				VARIANT_ROW_HOVER[variant],
				striped ? VARIANT_ROW_STRIPED[variant] : "",
				isSelected ? "bg-login/5" : ""
			].filter(Boolean).join(" ");
			return /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("tr", {
				className: rowClass,
				onMouseEnter: () => {
					if (url) router.prefetch(url);
				},
				onMouseDown: () => {
					menuWasOpenOnMouseDown.current = openMenuId !== null;
				},
				onClick: () => {
					if (menuWasOpenOnMouseDown.current) {
						menuWasOpenOnMouseDown.current = false;
						return;
					}
					if (hasExpand) {
						setExpandedId(isExpanded ? null : id);
						return;
					}
					if (onRowClick) {
						onRowClick(row, id);
						return;
					}
					if (url) router.push(url);
				},
				onContextMenu: (e) => {
					if (!hasMenu) return;
					e.preventDefault();
					openMenu(id, {
						top: e.clientY,
						right: window.innerWidth - e.clientX
					});
				},
				children: [
					selectable && /* @__PURE__ */ jsx("td", {
						className: `align-middle ${VARIANT_ROW_BORDER[variant]}`,
						style: {
							width: "3rem",
							minWidth: "3rem"
						},
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center",
							children: /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": isSelected ? "Deselect row" : "Select row",
								"aria-checked": isSelected,
								role: "checkbox",
								onClick: (e) => {
									e.stopPropagation();
									toggleSelect(id);
								},
								className: `
                                            h-4 w-4 rounded border flex items-center justify-center transition-colors cursor-pointer
                                            ${isSelected ? "bg-login border-login text-white" : "border-login-400 bg-transparent hover:border-login-100"}
                                        `,
								children: isSelected && /* @__PURE__ */ jsx("svg", {
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
								})
							})
						})
					}),
					columns.map((col) => /* @__PURE__ */ jsx(Cell, {
						col,
						row,
						density,
						variant
					}, col.key)),
					hasExpand && /* @__PURE__ */ jsx("td", {
						className: `align-middle ${VARIANT_ROW_BORDER[variant]}`,
						style: {
							width: "2.5rem",
							minWidth: "2.5rem"
						},
						children: /* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center",
							children: /* @__PURE__ */ jsx(ChevronDown, { className: `
                                        h-4 w-4 transition-transform duration-200
                                        ${isExpanded ? "rotate-180 text-login" : "text-login-400"}
                                    ` })
						})
					}),
					hasMenu && /* @__PURE__ */ jsx("td", {
						className: `align-middle pr-3 ${VARIANT_ROW_BORDER[variant]}`,
						style: {
							width: "3.5rem",
							minWidth: "3.5rem"
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative flex items-center justify-end",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Row actions",
								"aria-expanded": isMenuOpen,
								"aria-haspopup": "menu",
								onMouseDown: (e) => e.nativeEvent.stopImmediatePropagation(),
								onClick: (e) => {
									e.stopPropagation();
									if (isMenuOpen) setOpenMenuId(null);
									else {
										const rect = e.currentTarget.getBoundingClientRect();
										openMenu(id, {
											top: rect.bottom + 4,
											right: window.innerWidth - rect.right
										});
									}
								},
								className: `
                                                p-1.5 rounded flex items-center justify-center transition-colors
                                                ${isMenuOpen ? "bg-login-500 text-login-75" : "text-login-300 hover:bg-login-500/60 hover:text-login-75"}
                                            `,
								children: /* @__PURE__ */ jsx(EllipsisVertical, { className: "h-4 w-4" })
							}), isMenuOpen && anchor && /* @__PURE__ */ jsx(Menu, {
								ref: menuRef,
								anchor,
								onClose: closeMenu,
								children: menuItems(row, id)
							})]
						})
					})
				]
			}), hasExpand && isExpanded && /* @__PURE__ */ jsx("tr", {
				className: "bg-login-700/25",
				children: /* @__PURE__ */ jsx("td", {
					colSpan: 999,
					className: "px-6 py-4 border-b border-login-600/20",
					onClick: (e) => e.stopPropagation(),
					children: expandedContent
				})
			})] }, id + rowIdx);
		})
	});
}
//#endregion
export { Body as default };

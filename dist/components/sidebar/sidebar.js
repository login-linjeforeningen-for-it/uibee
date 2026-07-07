"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { usePathname, useSearchParams } from "next/navigation.js";
import Link from "next/link.js";
//#region src/components/sidebar/sidebar.tsx
const ITEM_HEIGHT = 48;
const GAP = 4;
const SUB_STRIDE = 40;
function Sidebar({ items, header, bottomAction, mobile = false, initialExpanded = true, onExpandedChange, className = "" }) {
	const [expanded, setExpanded] = useState(initialExpanded);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
	function toggleExpanded() {
		const next = !expanded;
		setExpanded(next);
		onExpandedChange?.(next);
	}
	function isSubActive(sub) {
		return sub.path.includes("?") ? fullPath.startsWith(sub.path) : pathname === sub.path;
	}
	function isItemActive(item) {
		return pathname === item.path || !!item.items?.some((sub) => sub.path.includes("?") ? fullPath.startsWith(sub.path) : pathname === sub.path || pathname.startsWith(sub.path + "/"));
	}
	const activeIndex = items.findIndex(isItemActive);
	const activeOffset = items.slice(0, Math.max(activeIndex, 0)).reduce((acc, item) => acc + ITEM_HEIGHT + (item.items ? GAP : 0) + GAP, 0);
	return /* @__PURE__ */ jsxs("aside", {
		className: `
            flex flex-col border-r border-login-100/10 bg-login-900
            transition-all duration-300 ease-in-out
            ${mobile ? "w-full" : `h-full ${expanded ? "w-64" : "w-20"}`}
            ${className}
        `,
		children: [
			!mobile && /* @__PURE__ */ jsxs("div", {
				className: `relative mb-2 p-4 transition-all duration-300 ${expanded ? "h-16" : "h-20"}`,
				children: [header && /* @__PURE__ */ jsx("div", {
					className: `
                            absolute top-4 flex items-center transition-all duration-300
                            ${expanded ? "left-4 gap-3" : "left-1/2 -translate-x-1/2 gap-0"}
                        `,
					children: typeof header === "function" ? header(expanded) : header
				}), /* @__PURE__ */ jsx("button", {
					onClick: toggleExpanded,
					className: `
                            absolute cursor-pointer rounded-lg p-1.5
                            text-login-200 transition-all duration-300 hover:bg-login-800
                            ${expanded ? "right-4 top-4" : "left-1/2 top-12 -translate-x-1/2"}
                        `,
					children: expanded ? /* @__PURE__ */ jsx(ChevronLeft, { size: 20 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
				})]
			}),
			mobile && /* @__PURE__ */ jsx("div", { className: "h-4" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto px-3 [scrollbar-width:none]",
				children: [activeIndex >= 0 && /* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "absolute left-3 right-3 top-0 h-12 rounded-lg bg-login-800 transition-transform duration-300 ease-in-out",
					style: { transform: `translateY(${activeOffset}px)` }
				}), items.map((item, index) => {
					const isActive = isItemActive(item);
					const Icon = item.icon;
					const activeSubIndex = item.items ? item.items.findIndex(isSubActive) : -1;
					return /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ jsxs(Link, {
							href: item.path,
							title: !expanded ? item.name : void 0,
							className: `
                                    group relative z-10 flex items-center
                                    overflow-hidden rounded-lg p-3 transition-all duration-200
                                    ${isActive ? "text-login" : "text-login-200 hover:bg-login-800/50 hover:text-login-100"}
                                `,
							children: [
								/* @__PURE__ */ jsx("div", {
									className: `
                                    flex min-w-6 w-6 items-center justify-center transition-all duration-300
                                    ${expanded ? "" : "translate-x-1"}
                                    ${isActive ? "[&>svg]:stroke-login" : "group-hover:[&>svg]:stroke-login-100"}
                                `,
									children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsx("span", {
									className: `
                                    whitespace-nowrap overflow-hidden transition-all duration-300
                                    ${expanded ? "ml-3 max-w-48 opacity-100" : "ml-0 max-w-0 opacity-0"}
                                `,
									children: item.name
								}),
								item.status && /* @__PURE__ */ jsx("div", {
									className: `
                                        flex items-center justify-center
                                        ${expanded ? "ml-auto" : "absolute right-1 top-1 scale-75"}
                                    `,
									children: item.status
								})
							]
						}), item.items && /* @__PURE__ */ jsxs("div", {
							className: `
                                    relative ml-6 flex flex-col gap-1 overflow-hidden
                                    border-l border-login-800 pl-2
                                    transition-all duration-300 ease-in-out
                                    ${expanded && isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `,
							children: [activeSubIndex >= 0 && /* @__PURE__ */ jsx("span", {
								"aria-hidden": true,
								className: "\n                                                absolute left-2 right-0 top-0 h-9 rounded-lg\n                                                bg-login-800/50 transition-transform duration-300 ease-in-out\n                                            ",
								style: { transform: `translateY(${activeSubIndex * SUB_STRIDE}px)` }
							}), item.items.map((sub, subIndex) => {
								const subActive = isSubActive(sub);
								return /* @__PURE__ */ jsx(Link, {
									href: sub.path,
									className: `
                                                    relative z-10 rounded-lg p-2 text-sm
                                                    transition-all duration-200
                                                    ${subActive ? "text-login" : "text-login-300 hover:bg-login-800/30 hover:text-login-100"}
                                                `,
									children: sub.name
								}, `${index}-${subIndex}`);
							})]
						})]
					}, index);
				})]
			}),
			bottomAction && /* @__PURE__ */ jsx("div", {
				className: "border-t border-login-100/10 p-3",
				children: bottomAction(expanded)
			})
		]
	});
}
//#endregion
export { Sidebar as default };

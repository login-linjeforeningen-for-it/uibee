"use client";
import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/navbar/navbarDropdown.tsx
function NavDropdown({ children, title, className }) {
	const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
	const [isDesktopOpen, setIsDesktopOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "relative hidden 800px:block",
		children: /* @__PURE__ */ jsxs("div", {
			className: "outline-none",
			tabIndex: 0,
			ref: useRef(null),
			onMouseEnter: () => setIsDesktopOpen(true),
			onMouseLeave: () => setIsDesktopOpen(false),
			onFocus: () => setIsDesktopOpen(true),
			onBlur: () => setIsDesktopOpen(false),
			children: [/* @__PURE__ */ jsxs("div", {
				className: `list-none no-underline text-base leading-4 p-3 font-bold cursor-pointer flex flex-row items-center 
                        transition-colors`,
				children: [title, /* @__PURE__ */ jsx(ChevronDown, { className: "w-6 h-6 stroke-login ml-1 text-2xl transition-transform duration-300 ease-in-out" })]
			}), /* @__PURE__ */ jsx("div", {
				className: `absolute pt-2 -ml-4 transition-all duration-200 ease-in-out z-10 ${isDesktopOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}`,
				children: /* @__PURE__ */ jsx("ul", {
					className: `p-3 px-6 pb-4 rounded-[0.4rem] shadow-[0_0.1rem_0.5rem_rgba(3,3,3,0.5)] bg-login-700/98 ${className || ""}`,
					onClick: () => setIsDesktopOpen(false),
					children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
						onClick: () => setIsDesktopOpen(false),
						className: "group dropdown",
						children: child
					}, index))
				})
			})]
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "block 800px:hidden!",
		children: [/* @__PURE__ */ jsx("button", {
			className: "bg-none border-none cursor-pointer w-full text-left",
			onClick: (e) => {
				e.stopPropagation();
				setIsMobileDropdownOpen(!isMobileDropdownOpen);
			},
			children: /* @__PURE__ */ jsxs("li", {
				className: `list-none no-underline text-2xl leading-6 overflow-hidden
                        w-full pl-4 pr-4 rounded-[0.3rem] transition-all duration-600
                        flex items-center gap-2 opacity-100 min-h-16 py-5 `,
				children: [/* @__PURE__ */ jsx("span", { children: title }), /* @__PURE__ */ jsx(ChevronDown, { className: `w-6 h-6 transition-transform duration-400 shrink-0 
                            ${isMobileDropdownOpen ? "rotate-180" : ""}` })]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: `list-none no-underline text-xl px-6 ${isMobileDropdownOpen ? "pb-4" : ""}`,
			children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
				className: `leading-6 transition-all duration-500 group dropdown
                            ${isMobileDropdownOpen ? "h-11 opacity-100" : "h-0 opacity-0"}
                        `,
				children: child
			}, index))
		})]
	})] });
}
//#endregion
export { NavDropdown as default };

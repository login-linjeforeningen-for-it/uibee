"use client";
import { ArrowUpRight } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/navbar/navbarItem.tsx
const commonStyling = "list-none flex no-underline items-center gap-2 whitespace-nowrap cursor-pointer";
function NavItem({ href, children, external = false, target, rel, title, icon }) {
	const linkProps = {
		href,
		target,
		rel,
		title
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
		...linkProps,
		className: "hidden 800px:flex",
		children: /* @__PURE__ */ jsxs("li", {
			className: `${commonStyling} text-base leading-4 p-3 font-bold transition-colors link-corner-hover
                    group-[.dropdown]:p-2.5 group-[.dropdown]:pr-3 group-[.dropdown]:pl-1`,
			children: [
				icon,
				children,
				external && /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-6 h-6 stroke-login" })
			]
		})
	}), /* @__PURE__ */ jsx(Link, {
		...linkProps,
		className: "800px:hidden",
		children: /* @__PURE__ */ jsxs("li", {
			className: `${commonStyling} text-2xl leading-6 overflow-hidden w-auto pl-4 rounded-[0.3rem] transition-all 
                    duration-600 opacity-100 h-16 py-5 group-[.dropdown]:p-0 group-[.dropdown]:text-lg group-[.dropdown]:h-auto 
                    group-[.dropdown]:py-2.5 group-[.dropdown]:pl-4`,
			children: [children, external && /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-6 h-6 stroke-login" })]
		})
	})] });
}
//#endregion
export { NavItem as default };

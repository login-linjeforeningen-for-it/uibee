"use client";
import { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/accordion.tsx
const GroupContext = createContext(false);
function AccordionGroup({ children, className = "" }) {
	return /* @__PURE__ */ jsx(GroupContext.Provider, {
		value: true,
		children: /* @__PURE__ */ jsx("div", {
			className: `rounded-lg border border-login-500/40 overflow-hidden divide-y divide-login-500/25 ${className}`,
			children
		})
	});
}
function Accordion({ title, children, defaultOpen = false, className = "" }) {
	const [open, setOpen] = useState(defaultOpen);
	return /* @__PURE__ */ jsxs("div", {
		className: useContext(GroupContext) ? className : `rounded-lg border border-login-500/40 overflow-hidden ${className}`,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			className: "\n                    flex w-full cursor-pointer items-center justify-between\n                    bg-login-800 px-4 py-3 text-left select-none\n                    transition-colors duration-150 hover:bg-login-700\n                ",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-sm font-medium text-login-50",
				children: title
			}), /* @__PURE__ */ jsx(ChevronDown, {
				size: 16,
				className: `shrink-0 text-login-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: `overflow-hidden bg-login-900 transition-all duration-200 ${open ? "max-h-[9999px]" : "max-h-0"}`,
			children: /* @__PURE__ */ jsx("div", {
				className: "px-4 py-3 text-sm text-login-100",
				children
			})
		})]
	});
}
//#endregion
export { AccordionGroup, Accordion as default };

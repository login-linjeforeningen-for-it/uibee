"use client";
import Card from "./card.js";
import IconBubble from "./iconBubble.js";
import PulseDot from "./pulseDot.js";
import Button from "../buttons/button.js";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/expandableCard.tsx
function ExpandableCard({ icon, iconTone = "orange", title, subtitle, pulse, trailing, isExpanded, onToggle, children }) {
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs("div", {
		role: "button",
		tabIndex: 0,
		onClick: onToggle,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onToggle();
			}
		},
		"aria-expanded": isExpanded,
		className: "group flex cursor-pointer select-none items-center gap-4 px-5 py-4",
		children: [
			/* @__PURE__ */ jsx(IconBubble, {
				icon,
				tone: iconTone,
				size: "sm"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-login-50 transition group-hover:text-login",
						children: title
					}), pulse && /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2 text-xs text-login-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "flex h-3 w-3 shrink-0 items-center justify-center",
							children: /* @__PURE__ */ jsx(PulseDot, {
								variant: pulse.variant,
								size: "sm"
							})
						}), pulse.label]
					})]
				}), subtitle && /* @__PURE__ */ jsx("div", {
					className: "mt-0.5 text-xs text-login-300",
					children: subtitle
				})]
			}),
			trailing && /* @__PURE__ */ jsx("div", {
				className: "flex shrink-0 items-center gap-3",
				onClick: (e) => e.stopPropagation(),
				children: trailing
			}),
			/* @__PURE__ */ jsx(Button, {
				variant: "secondary",
				icon: /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}` }),
				onClick: (e) => {
					e.stopPropagation();
					onToggle();
				}
			})
		]
	}), isExpanded && children && /* @__PURE__ */ jsx("div", {
		className: "border-t border-white/5 px-5 pb-5 pt-4",
		children
	})] });
}
//#endregion
export { ExpandableCard as default };

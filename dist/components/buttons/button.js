"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link.js";
//#region src/components/buttons/button.tsx
const variants = {
	primary: "bg-login text-white hover:brightness-110",
	secondary: "bg-login-500 text-login-50 hover:bg-login-400",
	warning: "bg-yellow-500 text-black hover:brightness-110",
	danger: "bg-red-600 text-white hover:brightness-110",
	success: "bg-green-600 text-white hover:brightness-110",
	info: "bg-blue-600 text-white hover:brightness-110"
};
const base = "cursor-pointer rounded-md h-9 flex items-center justify-center gap-2 select-none text-sm font-medium transition-all duration-150";
const withText = "px-4 w-fit";
const iconOnly = "w-9";
const disabledCls = "opacity-40 cursor-not-allowed pointer-events-none";
const iconWrap = (icon) => icon ? /* @__PURE__ */ jsx("span", {
	className: "[&>svg]:w-4 [&>svg]:h-4 flex items-center",
	children: icon
}) : null;
function Button({ text, className, icon, path, variant = "primary", type, onClick, disabled }) {
	const color = variants[variant];
	const sizing = icon && !text ? iconOnly : withText;
	const cls = `${base} ${sizing} ${color} ${disabled ? disabledCls : ""} ${className || ""}`;
	if (!path) return /* @__PURE__ */ jsxs("button", {
		type: type || "button",
		disabled,
		onClick,
		"aria-label": text,
		className: cls,
		children: [iconWrap(icon), text]
	});
	if (disabled) return /* @__PURE__ */ jsxs("div", {
		className: cls,
		children: [iconWrap(icon), text]
	});
	return /* @__PURE__ */ jsxs(Link, {
		href: path,
		className: `${base} ${sizing} ${color} ${className || ""}`,
		children: [iconWrap(icon), text]
	});
}
//#endregion
export { Button as default };

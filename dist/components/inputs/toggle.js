"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/toggle.tsx
function Toggle({ value, onChange, left, right }) {
	const active = "bg-login text-white shadow-sm";
	const idle = "text-login-200 hover:text-login-50 hover:bg-login-500/50";
	const base = "flex items-center justify-center rounded-md px-3 h-7 transition-all duration-150 gap-1.5 text-sm";
	function renderContent(opt) {
		return /* @__PURE__ */ jsxs(Fragment, { children: [opt.icon, opt.text && /* @__PURE__ */ jsx("span", { children: opt.text })] });
	}
	const isLeftActive = value === left.value;
	const isRightActive = value === right.value;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center w-fit bg-login-500/50 border border-login-500 rounded-lg p-1 gap-0.5",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(left.value),
			"aria-label": left.label ?? left.text,
			"aria-pressed": isLeftActive,
			className: `${base} ${isLeftActive ? active : idle}`,
			children: renderContent(left)
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(right.value),
			"aria-label": right.label ?? right.text,
			"aria-pressed": isRightActive,
			className: `${base} ${isRightActive ? active : idle}`,
			children: renderContent(right)
		})]
	});
}
//#endregion
export { Toggle as default };

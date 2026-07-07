import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/pulseDot.tsx
const variantColor = {
	online: "bg-green-500",
	offline: "bg-red-500",
	warning: "bg-login",
	unknown: "bg-login-400"
};
const sizeClass = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2",
	lg: "w-3 h-3"
};
function PulseDot({ variant = "online", size = "md" }) {
	const color = variantColor[variant];
	const dotSize = sizeClass[size];
	return /* @__PURE__ */ jsxs("div", {
		className: `relative grid place-items-center ${dotSize}`,
		children: [/* @__PURE__ */ jsx("span", { className: `absolute inline-flex h-full w-full rounded-full ${color} opacity-50 animate-ping` }), /* @__PURE__ */ jsx("span", { className: `relative inline-flex rounded-full ${dotSize} ${color}` })]
	});
}
//#endregion
export { PulseDot as default };

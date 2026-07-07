import { jsx } from "react/jsx-runtime";
//#region src/components/badge/badge.tsx
const variants = {
	default: "bg-login-600 text-login-100",
	success: "bg-emerald-500/15 text-emerald-400",
	warning: "bg-yellow-500/15 text-yellow-400",
	danger: "bg-red-500/15 text-red-400",
	info: "bg-sky-500/15 text-sky-400",
	amber: "bg-amber-500/15 text-amber-400",
	violet: "bg-violet-500/15 text-violet-400",
	blue: "bg-blue-500/15 text-blue-400",
	emerald: "bg-emerald-500/15 text-emerald-400",
	orange: "bg-login/15 text-login"
};
const sizes = {
	sm: "px-2 py-0.5 text-xs",
	md: "px-2.5 py-1 text-sm"
};
function Badge({ text, variant = "default", size = "sm", className = "" }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`,
		children: text
	});
}
//#endregion
export { Badge as default };

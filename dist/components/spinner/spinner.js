import { jsx } from "react/jsx-runtime";
//#region src/components/spinner/spinner.tsx
const sizes = {
	sm: "w-4 h-4 border-2",
	md: "w-6 h-6 border-2",
	lg: "w-9 h-9 border-[3px]"
};
function Spinner({ size = "md", className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		role: "status",
		"aria-label": "Loading",
		className: `rounded-full border-login-500 border-t-login animate-spin ${sizes[size]} ${className}`
	});
}
//#endregion
export { Spinner as default };

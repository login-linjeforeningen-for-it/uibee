import { jsx } from "react/jsx-runtime";
//#region src/components/container/leftBarPanel.tsx
function LeftBarPanel({ color, children, className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: `bg-login-500/50 border border-login-500/30 border-l-2 rounded-sm ${color} ${className}`,
		children
	});
}
//#endregion
export { LeftBarPanel as default };

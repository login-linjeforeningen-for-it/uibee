import { jsx } from "react/jsx-runtime";
//#region src/components/container/card.tsx
function Card({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-login-500/30 bg-login-500/50 ${className}`,
		children
	});
}
//#endregion
export { Card as default };

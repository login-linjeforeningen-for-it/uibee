import { jsx } from "react/jsx-runtime";
//#region src/components/container/glassCard.tsx
function GlassCard({ children, className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: `rounded-xl border border-login-500/20 bg-login-800/60 backdrop-blur-sm ${className}`,
		children
	});
}
//#endregion
export { GlassCard as default };

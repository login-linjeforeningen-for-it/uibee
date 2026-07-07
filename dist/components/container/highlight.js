import { jsx } from "react/jsx-runtime";
//#region src/components/container/highlight.tsx
function Highlight({ children, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: `highlighted-section ${className ?? ""}`,
		children
	});
}
//#endregion
export { Highlight as default };

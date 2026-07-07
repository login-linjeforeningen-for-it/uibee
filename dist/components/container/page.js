import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/container/page.tsx
function PageContainer({ title, children, className, innerClassName }) {
	return /* @__PURE__ */ jsx("div", {
		className: `w-full page-container ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `flex flex-col col-start-3 ${innerClassName}`,
			children: [/* @__PURE__ */ jsx("h1", {
				className: "heading",
				children: title
			}), children]
		})
	});
}
//#endregion
export { PageContainer as default };

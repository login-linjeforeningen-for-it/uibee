import { TableIcon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/table/empty.tsx
function Empty({ emptyState }) {
	if (emptyState) return /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
		colSpan: 999,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center min-h-[160px] py-8 px-6",
			children: emptyState
		})
	}) }) });
	return /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
		colSpan: 999,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center justify-center gap-3 min-h-[160px] py-8 text-login-300",
			children: [/* @__PURE__ */ jsx(TableIcon, { className: "h-10 w-10 opacity-30" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm",
				children: "No data found"
			})]
		})
	}) }) });
}
//#endregion
export { Empty as default };

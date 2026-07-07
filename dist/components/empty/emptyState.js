import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/empty/emptyState.tsx
function EmptyState({ icon: Icon, title, description, action, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col items-center justify-center gap-3 py-12 text-center ${className}`,
		children: [
			Icon && /* @__PURE__ */ jsx("div", {
				className: "mb-1 rounded-xl bg-login-600/30 p-3 text-login-400",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm font-semibold text-login-100",
				children: title
			}),
			description && /* @__PURE__ */ jsx("p", {
				className: "max-w-xs text-xs leading-relaxed text-login-400",
				children: description
			}),
			action && /* @__PURE__ */ jsx("div", {
				className: "mt-2",
				children: action
			})
		]
	});
}
//#endregion
export { EmptyState as default };

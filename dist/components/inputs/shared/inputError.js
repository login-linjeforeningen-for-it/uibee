import { jsx } from "react/jsx-runtime";
//#region src/components/inputs/shared/inputError.tsx
function InputError({ error, id }) {
	if (!error) return /* @__PURE__ */ jsx("div", { className: "h-4" });
	return /* @__PURE__ */ jsx("div", {
		className: "h-4",
		children: /* @__PURE__ */ jsx("span", {
			id,
			className: "text-xs text-red-400 ml-1 truncate block",
			role: "alert",
			title: error,
			children: error
		})
	});
}
//#endregion
export { InputError as default };

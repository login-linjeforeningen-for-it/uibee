import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/shared/inputLabel.tsx
function InputLabel({ label, name, required, disabled, className }) {
	return /* @__PURE__ */ jsxs("label", {
		htmlFor: name,
		className: `text-sm font-medium text-login-text ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`,
		title: label,
		children: [
			label,
			" ",
			required && /* @__PURE__ */ jsx("span", {
				className: "text-red-500",
				children: "*"
			})
		]
	});
}
//#endregion
export { InputLabel as default };

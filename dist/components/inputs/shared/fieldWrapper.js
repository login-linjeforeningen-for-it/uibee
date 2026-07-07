import InputLabel from "./inputLabel.js";
import InputInfo from "./inputInfo.js";
import InputError from "./inputError.js";
import MarkdownRender from "../../markdownrender/markdownRender.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/shared/fieldWrapper.tsx
function FieldWrapper({ label, name, required, info, error, description, textSize = "sm", children, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col gap-1 w-full relative ${className || ""}`,
		children: [
			(label || info) && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-1",
				children: [label && /* @__PURE__ */ jsx(InputLabel, {
					label,
					name,
					required,
					className: `ml-1 ${textSize === "sm" ? "text-sm!" : "text-base!"}`
				}), info && /* @__PURE__ */ jsx(InputInfo, { info })]
			}),
			description && /* @__PURE__ */ jsx("div", {
				className: "text-login-100 **:text-xs! ml-1 mb-1",
				children: /* @__PURE__ */ jsx(MarkdownRender, { MDstr: String(description || "") })
			}),
			children,
			/* @__PURE__ */ jsx(InputError, {
				error,
				id: `${name}-error`
			})
		]
	});
}
//#endregion
export { FieldWrapper as default };

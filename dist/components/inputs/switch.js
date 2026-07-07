import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/switch.tsx
function Switch(props) {
	const { name, label, error, info, description, className, switchOnly, textSize = "sm", ...inputProps } = props;
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: inputProps.required,
		info,
		error,
		description,
		textSize,
		className,
		children: /* @__PURE__ */ jsxs("label", {
			className: `group/sw inline-flex items-center cursor-pointer ${switchOnly ? "h-fit" : "h-10"}`,
			children: [/* @__PURE__ */ jsx("input", {
				...inputProps,
				type: "checkbox",
				id: name,
				name,
				className: "sr-only"
			}), /* @__PURE__ */ jsx("div", {
				className: `
                    relative flex items-center w-11 h-6 rounded-full transition-colors
                    bg-login-600 group-has-[input:checked]/sw:bg-login
                    ${inputProps.disabled ? "opacity-40 cursor-not-allowed" : ""}
                    ${error ? "ring-1 ring-red-500/60" : ""}
                `,
				children: /* @__PURE__ */ jsx("span", { className: "\n                        absolute inset-y-0 my-auto left-0.5 h-5 w-5\n                        rounded-full bg-white shadow-sm transition-all\n                        group-has-[input:checked]/sw:translate-x-full\n                    " })
			})]
		})
	});
}
//#endregion
export { Switch as default };

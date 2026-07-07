"use client";
import InputLabel from "./shared/inputLabel.js";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/radio.tsx
function Radio(props) {
	const { options, onChange, value, label, description, error, info, name, className, textSize = "sm", ...rest } = props;
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: rest.required,
		info,
		description,
		error,
		textSize,
		className,
		children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-2",
			children: options.map((option) => /* @__PURE__ */ jsx(RadioItem, {
				name,
				value: option.value,
				label: option.label,
				checked: value === option.value,
				disabled: rest.disabled,
				onChange: () => {
					if (onChange) onChange(option.value);
				},
				className: "mb-0"
			}, option.value))
		})
	});
}
function RadioItem(props) {
	const { name, label, error, ...inputProps } = props;
	const { value } = inputProps;
	const id = `${name}-${value}`;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-5 h-5 shrink-0",
			children: [/* @__PURE__ */ jsx("input", {
				...inputProps,
				id,
				name,
				type: "radio",
				className: `
                        peer appearance-none rounded-full border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-150
                        w-5 h-5 absolute inset-0
                        ${error ? "border-red-500/70" : ""}
                    `
			}), /* @__PURE__ */ jsx("div", { className: `
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-2 h-2 rounded-full bg-white pointer-events-none opacity-0
                    peer-checked:opacity-100 transition-opacity duration-200
                ` })]
		}), label && /* @__PURE__ */ jsx(InputLabel, {
			label,
			name,
			disabled: inputProps.disabled,
			className: "select-none cursor-pointer"
		})]
	});
}
//#endregion
export { Radio as default };

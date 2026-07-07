"use client";
import InputLabel from "./shared/inputLabel.js";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { Check } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/checkbox.tsx
function Checkbox(props) {
	const { options, onChange, value, label, description, error, info, name, className, textSize = "sm", ...rest } = props;
	const selectedValues = Array.isArray(value) ? value : [];
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
			children: options.map((option) => /* @__PURE__ */ jsx(CheckboxItem, {
				name,
				value: option.value,
				label: option.label,
				checked: selectedValues.includes(option.value),
				disabled: rest.disabled,
				onChange: (e) => {
					if (!onChange) return;
					const isChecked = e.target.checked;
					let newValues = [...selectedValues];
					if (isChecked) newValues.push(option.value);
					else newValues = newValues.filter((v) => v !== option.value);
					onChange(newValues);
				},
				className: "mb-0"
			}, option.value))
		})
	});
}
function CheckboxItem(props) {
	const { name, label, error, ...inputProps } = props;
	const id = inputProps.value ? `${name}-${inputProps.value}` : name;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-5 h-5 shrink-0",
			children: [/* @__PURE__ */ jsx("input", {
				...inputProps,
				id,
				name,
				type: "checkbox",
				className: `
                        peer appearance-none rounded border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-150
                        w-5 h-5 absolute inset-0
                        ${error ? "border-red-500/70" : ""}
                    `
			}), /* @__PURE__ */ jsx(Check, { className: `
                        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-3.5 h-3.5 pointer-events-none text-white opacity-0
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
export { Checkbox as default };

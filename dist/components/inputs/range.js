"use client";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/range.tsx
function Range(props) {
	const { name, label, error, className, info, description, showValue = true, textSize = "sm", ...inputProps } = props;
	const { min = 0, max = 100, step = 1, value, defaultValue, onChange, ...restInputProps } = inputProps;
	const displayValue = value ?? defaultValue ?? 0;
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: restInputProps.required,
		info,
		description,
		error,
		textSize,
		className,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ jsx("input", {
				...restInputProps,
				id: name,
				name,
				type: "range",
				min,
				max,
				step,
				...onChange ? {
					value,
					onChange
				} : { defaultValue: value ?? defaultValue ?? 0 },
				title: label,
				"aria-invalid": !!error,
				"aria-describedby": error ? `${name}-error` : void 0,
				className: `
                        flex-1 h-2 bg-login-500 rounded-lg appearance-none cursor-pointer
                        accent-login
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-login
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-login
                        [&::-moz-range-thumb]:border-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? "accent-red-500" : ""}
                    `
			}), showValue && /* @__PURE__ */ jsx("span", {
				className: "text-login-text text-sm font-medium min-w-10 text-right",
				children: displayValue
			})]
		})
	});
}
//#endregion
export { Range as default };

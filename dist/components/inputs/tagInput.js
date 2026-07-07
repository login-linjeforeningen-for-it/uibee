"use client";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import { useState } from "react";
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/tagInput.tsx
function TagInput({ label, name, value = [], onChange, placeholder = "Add...", error, className, disabled, required, info, description, textSize = "sm" }) {
	const [inputValue, setInputValue] = useState("");
	function handleKeyDown(e) {
		if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
			e.preventDefault();
			const val = inputValue.trim().replace(/,$/, "");
			if (val && !value.includes(val)) {
				const newValue = [...value, val];
				if (onChange) onChange(newValue);
			}
			setInputValue("");
		} else if (e.key === "Backspace" && !inputValue && value.length > 0) {
			const newValue = value.slice(0, -1);
			if (onChange) onChange(newValue);
		}
	}
	function removeTag(index) {
		if (disabled) return;
		const newValue = value.filter((_, i) => i !== index);
		if (onChange) onChange(newValue);
	}
	return /* @__PURE__ */ jsxs(FieldWrapper, {
		label,
		name,
		required,
		info,
		description,
		error,
		className,
		textSize,
		children: [/* @__PURE__ */ jsxs("div", {
			className: `
                    flex flex-wrap gap-2 p-2 rounded-md bg-login-500/50 border border-login-500
                    text-login-text min-h-10
                    focus-within:border-login/60 focus-within:ring-1 focus-within:ring-login/30
                    transition-all duration-150
                    ${error ? "border-red-500/70 focus-within:border-red-500/70 focus-within:ring-red-500/30" : ""}
                `,
			children: [value.map((tag, index) => /* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1 px-2 py-0.5 bg-login-600 text-login-100 border border-login-500 rounded text-sm",
				children: [tag, !disabled && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => removeTag(index),
					className: "hover:text-red-200 transition-colors",
					children: /* @__PURE__ */ jsx(X, { size: 14 })
				})]
			}, index)), /* @__PURE__ */ jsx("input", {
				type: "text",
				value: inputValue,
				required: required && value.length === 0,
				onChange: (e) => setInputValue(e.target.value),
				onKeyDown: handleKeyDown,
				disabled,
				placeholder: value.length === 0 ? placeholder : "",
				className: "flex-1 bg-transparent outline-none min-w-30 text-login-text placeholder:text-login-200"
			})]
		}), /* @__PURE__ */ jsx("input", {
			type: "hidden",
			name,
			value: value.join(",")
		})]
	});
}
//#endregion
export { TagInput as default };

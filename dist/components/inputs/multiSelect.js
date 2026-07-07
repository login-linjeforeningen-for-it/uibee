"use client";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import useClickOutside from "../../hooks/useClickOutside.js";
import { useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/multiSelect.tsx
function MultiSelect({ label, name, options, value = [], onChange, placeholder = "Select…", error, className, disabled, required, info, description, textSize = "sm" }) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef(null);
	useClickOutside(containerRef, () => setOpen(false));
	function toggleOption(optionValue) {
		if (!onChange) return;
		if (value.includes(optionValue)) onChange(value.filter((v) => v !== optionValue));
		else onChange([...value, optionValue]);
	}
	function removeOption(optionValue) {
		if (!onChange) return;
		onChange(value.filter((v) => v !== optionValue));
	}
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required,
		info,
		description,
		error,
		className,
		textSize,
		children: /* @__PURE__ */ jsxs("div", {
			ref: containerRef,
			className: "relative w-full",
			children: [
				/* @__PURE__ */ jsxs("div", {
					onClick: () => !disabled && setOpen((o) => !o),
					className: `
                        flex min-h-10 cursor-pointer items-center justify-between gap-2
                        rounded-md bg-login-500/50 border border-login-500 px-3 py-1.5
                        transition-all duration-150 select-none
                        ${open ? "border-login/60 ring-1 ring-login/30" : ""}
                        ${error ? "border-red-500/70" : ""}
                        ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                    `,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-1.5",
						children: [value.length === 0 && /* @__PURE__ */ jsx("span", {
							className: "text-sm text-login-200",
							children: placeholder
						}), value.map((val) => {
							const option = options.find((o) => o.value === val);
							if (!option) return null;
							return /* @__PURE__ */ jsxs("span", {
								className: "\n                                        flex items-center gap-1 rounded px-2 py-0.5 text-sm\n                                        border border-login-500 bg-login-600 text-login-100\n                                    ",
								children: [option.label, !disabled && /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: (e) => {
										e.stopPropagation();
										removeOption(val);
									},
									className: "hover:text-red-300 transition-colors",
									children: /* @__PURE__ */ jsx(X, { size: 13 })
								})]
							}, val);
						})]
					}), /* @__PURE__ */ jsx(ChevronDown, {
						size: 16,
						className: `shrink-0 text-login-200 transition-transform duration-150 ${open ? "rotate-180" : ""}`
					})]
				}),
				open && options.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "\n                        absolute z-50 mt-1 w-full max-h-60 overflow-auto\n                        rounded-md border border-login-500/50 bg-login-800 shadow-lg\n                    ",
					children: options.map((option) => {
						const selected = value.includes(option.value);
						return /* @__PURE__ */ jsxs("div", {
							onClick: () => toggleOption(option.value),
							className: `
                                        flex cursor-pointer items-center justify-between px-3 py-2 text-sm
                                        hover:bg-login-700 transition-colors select-none
                                        ${selected ? "text-login-50" : "text-login-100"}
                                    `,
							children: [/* @__PURE__ */ jsx("span", { children: option.label }), selected && /* @__PURE__ */ jsx(Check, {
								size: 14,
								className: "text-login shrink-0"
							})]
						}, option.value);
					})
				}),
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name,
					value: value.join(",")
				})
			]
		})
	});
}
//#endregion
export { MultiSelect as default };

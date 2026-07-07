"use client";
import FieldWrapper from "./shared/fieldWrapper.js";
import "./shared/index.js";
import useClickOutside from "../../hooks/useClickOutside.js";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import Image from "next/image.js";
//#region src/components/inputs/select.tsx
function Select({ label, name, value, onChange, options, error, className, disabled, required, placeholder = "Select an option", info, description, clearable = true, searchable = true, textSize = "sm" }) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedOption, setSelectedOption] = useState(options.find((opt) => opt.value === value));
	useEffect(() => {
		if (!isOpen) setSearchTerm("");
	}, [isOpen]);
	useEffect(() => {
		setSelectedOption(options.find((opt) => opt.value === value));
	}, [value, options]);
	const containerRef = useRef(null);
	useClickOutside(containerRef, () => setIsOpen(false));
	function handleSelect(option) {
		if (disabled) return;
		setSelectedOption(option);
		setIsOpen(false);
		if (onChange) onChange(option.value);
	}
	function handleClear(e) {
		e.stopPropagation();
		if (disabled) return;
		setSelectedOption(void 0);
		if (onChange) onChange(null);
	}
	const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ jsxs(FieldWrapper, {
		label,
		name,
		required,
		info,
		description,
		error,
		textSize,
		className,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative",
			ref: containerRef,
			children: [/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => !disabled && setIsOpen(!isOpen),
				disabled,
				"aria-haspopup": "listbox",
				"aria-expanded": isOpen,
				"aria-labelledby": label ? void 0 : name,
				className: `
                        w-full rounded-md bg-login-500/50 border border-login-500
                        text-login-text text-left text-sm
                        focus:outline-none focus:border-login/60 focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        h-10 py-2 pl-3 pr-10
                        transition-all duration-150
                        flex items-center justify-between
                        ${error ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/30" : ""}
                        ${!selectedOption ? "text-login-200" : ""}
                    `,
				title: label,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 truncate",
					children: [selectedOption?.image && /* @__PURE__ */ jsx(Image, {
						src: selectedOption.image,
						alt: "",
						width: 30,
						height: 20,
						className: "rounded-xs object-cover shrink-0"
					}), /* @__PURE__ */ jsx("span", {
						className: "truncate",
						children: selectedOption ? selectedOption.label : placeholder
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "absolute inset-y-0 right-0 flex items-center px-2 gap-1",
					children: [clearable && selectedOption && !disabled && /* @__PURE__ */ jsx("div", {
						role: "button",
						onClick: handleClear,
						className: `
                                    p-1 hover:bg-login-500 rounded-full text-login-200
                                    hover:text-red-400 transition-colors cursor-pointer
                                `,
						title: "Clear selection",
						children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
					}), /* @__PURE__ */ jsx("div", {
						className: `
                            text-login-200 pointer-events-none
                            transition-transform duration-200
                            ${isOpen ? "rotate-180" : ""}
                        `,
						children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
					})]
				})]
			}), isOpen && /* @__PURE__ */ jsxs("div", {
				className: `
                        absolute z-50 w-full mt-1 bg-login-700 border border-login-500/50
                        rounded-md shadow-xl max-h-60 overflow-hidden flex flex-col
                    `,
				children: [searchable && /* @__PURE__ */ jsx("div", {
					className: "p-2 sticky top-0 bg-login-700 border-b border-login-500/20 z-10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-login-200" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							placeholder: "Search...",
							autoFocus: true,
							className: `
                                            w-full bg-login-600 border border-login-500/50 rounded-md
                                            py-1.5 pl-9 pr-3 text-sm text-login-text
                                            focus:outline-none focus:border-login/60 focus:ring-1 focus:ring-login/30
                                        `
						})]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-auto noscroll",
					children: filteredOptions.length > 0 ? /* @__PURE__ */ jsx("ul", {
						className: "py-1",
						role: "listbox",
						children: filteredOptions.map((option) => /* @__PURE__ */ jsx("li", {
							role: "option",
							"aria-selected": selectedOption?.value === option.value,
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => handleSelect(option),
								className: `
                                                    w-full text-left px-3 py-2 text-sm
                                                    hover:bg-login-600 transition-colors duration-150
                                                    flex items-center gap-2
                                                    ${selectedOption?.value === option.value ? "bg-login/15 text-login" : "text-login-text"}
                                                `,
								children: [option.image && /* @__PURE__ */ jsx(Image, {
									src: option.image,
									alt: "",
									width: 75,
									height: 25,
									className: "rounded-md object-cover shrink-0"
								}), /* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: option.label
								})]
							})
						}, option.value))
					}) : /* @__PURE__ */ jsx("div", {
						className: "px-3 py-2 text-sm text-login-200",
						children: searchTerm ? "No results found" : "No options available"
					})
				})]
			})]
		}), /* @__PURE__ */ jsx("input", {
			type: "hidden",
			name,
			value: selectedOption?.value || "",
			required
		})]
	});
}
//#endregion
export { Select as default };

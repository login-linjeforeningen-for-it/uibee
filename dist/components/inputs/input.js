"use client";
import FieldWrapper from "./shared/fieldWrapper.js";
import ColorPickerPopup from "./shared/colorPickerPopup.js";
import "./shared/index.js";
import DateTimePickerPopup from "./shared/dateTimePickerPopup.js";
import useClickOutside from "../../hooks/useClickOutside.js";
import { useId, useRef, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/inputs/input.tsx
function Input(props) {
	const { name, label, error, className, icon, info, description, textSize = "sm", ...inputProps } = props;
	const { type = "text", value } = inputProps;
	const localRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const anchorName = `--input-${useId().replace(/:/g, "")}`;
	const containerRef = useRef(null);
	useClickOutside(containerRef, () => setIsOpen(false));
	const isDateType = [
		"date",
		"datetime-local",
		"time"
	].includes(type);
	const isColorType = type === "color";
	const isClickableType = isDateType || isColorType;
	function handleIconClick() {
		if (isClickableType && !inputProps.disabled) setIsOpen(!isOpen);
		else if (localRef.current && !inputProps.disabled) localRef.current.focus();
	}
	function pad(n) {
		return n.toString().padStart(2, "0");
	}
	function handleDateChange(date) {
		const onChange = inputProps.onChange;
		if (!onChange) return;
		const yyyy = date.getFullYear();
		const MM = pad(date.getMonth() + 1);
		const dd = pad(date.getDate());
		const hh = pad(date.getHours());
		const mm = pad(date.getMinutes());
		let newValue = "";
		if (type === "date") newValue = `${yyyy}-${MM}-${dd}`;
		else if (type === "time") newValue = `${hh}:${mm}`;
		else if (type === "datetime-local") newValue = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
		onChange({ target: {
			name,
			value: newValue,
			type
		} });
	}
	function handleColorChange(color) {
		const onChange = inputProps.onChange;
		if (!onChange) return;
		onChange({ target: {
			name,
			value: color,
			type
		} });
	}
	let displayIcon = icon;
	if (!displayIcon && isDateType) if (type === "time") displayIcon = /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" });
	else displayIcon = /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" });
	else if (!displayIcon && isColorType) displayIcon = /* @__PURE__ */ jsx("div", {
		className: "w-4 h-4 rounded border border-login-200",
		style: { backgroundColor: value || "#000000" }
	});
	function getDateValue() {
		if (!value) return null;
		if (type === "time") {
			const date = /* @__PURE__ */ new Date(`2000-01-01T${value}`);
			return isNaN(date.getTime()) ? null : date;
		}
		const date = new Date(value);
		return isNaN(date.getTime()) ? null : date;
	}
	function getDateDisplayValue() {
		if (!value || !isDateType) return value;
		const date = getDateValue();
		if (!date) return value;
		const yyyy = date.getFullYear();
		const MM = pad(date.getMonth() + 1);
		const dd = pad(date.getDate());
		const hh = pad(date.getHours());
		const mm = pad(date.getMinutes());
		if (type === "date") return `${dd}.${MM}.${yyyy}`;
		if (type === "time") return `${hh}:${mm}`;
		if (type === "datetime-local") return `${dd}.${MM}.${yyyy} ${hh}:${mm}`;
		return value;
	}
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: inputProps.required,
		info,
		error,
		description,
		textSize,
		className,
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative flex items-center",
			ref: containerRef,
			children: [
				displayIcon && /* @__PURE__ */ jsx("div", {
					className: `
                            absolute left-3 text-login-200
                            ${isClickableType && !inputProps.disabled ? "cursor-pointer hover:text-login-text" : "pointer-events-none"}
                        `,
					onClick: handleIconClick,
					children: displayIcon
				}),
				/* @__PURE__ */ jsx("input", {
					...inputProps,
					ref: localRef,
					id: name,
					name: isClickableType ? void 0 : name,
					type: isClickableType ? "text" : type,
					value: isDateType ? getDateDisplayValue() : value,
					readOnly: isClickableType,
					onClick: () => isClickableType && !inputProps.disabled && setIsOpen(true),
					"aria-describedby": error ? `${name}-error` : void 0,
					style: { anchorName },
					className: `
                        w-full rounded-md bg-login-500/50 border border-login-500
                        text-login-text placeholder-login-200 text-sm
                        focus:outline-none focus:border-login/60 focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        h-10 py-2 ${displayIcon ? "pl-10 pr-3" : "px-3"}
                        transition-all duration-150
                        input-reset
                        ${error ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/30" : ""}
                        ${isClickableType && !inputProps.disabled ? "cursor-pointer" : ""}
                    `
				}),
				isClickableType && /* @__PURE__ */ jsx("input", {
					type: "hidden",
					name,
					value
				}),
				isOpen && isDateType && !inputProps.disabled && /* @__PURE__ */ jsx(DateTimePickerPopup, {
					value: getDateValue(),
					onChange: handleDateChange,
					type,
					onClose: () => setIsOpen(false),
					anchorName
				}),
				isOpen && isColorType && !inputProps.disabled && /* @__PURE__ */ jsx(ColorPickerPopup, {
					value: value || "",
					onChange: handleColorChange,
					onClose: () => setIsOpen(false),
					anchorName
				})
			]
		})
	});
}
//#endregion
export { Input as default };

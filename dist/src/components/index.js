"use client";
import { t as useClickOutside } from "../../useClickOutside-Cmp-RsP3.js";
import { D as Facebook, Kt as Wikijs, N as Github, W as Linkedin, x as Discord } from "../../icons-lZYQ6Vlr.js";
import React, { createContext, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, ArrowUpRight, Calendar, Check, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleAlert, CircleHelp, Clock, EllipsisVertical, ExternalLink, Eye, Globe, Info, LogIn, LogOut, Pencil, Search, TriangleAlert, User, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import Image from "next/image.js";
import { getCookie, setCookie } from "utilbee";
import Link from "next/link.js";
import { createPortal } from "react-dom";
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
//#region src/components/inputs/shared/inputInfo.tsx
function InputInfo({ info }) {
	return /* @__PURE__ */ jsx("div", {
		className: "text-login-200 hover:text-login-text transition-colors",
		"aria-label": info,
		title: info,
		children: /* @__PURE__ */ jsx(CircleHelp, { className: "w-4 h-4" })
	});
}
//#endregion
//#region src/components/inputs/shared/inputError.tsx
function InputError({ error, id }) {
	if (!error) return /* @__PURE__ */ jsx("div", { className: "h-4" });
	return /* @__PURE__ */ jsx("div", {
		className: "h-4",
		children: /* @__PURE__ */ jsx("span", {
			id,
			className: "text-xs text-red-400 ml-1 truncate block",
			role: "alert",
			title: error,
			children: error
		})
	});
}
//#endregion
//#region src/components/markdownrender/markdownRender.tsx
function makeDefaultComponents() {
	return {
		h1: ({ ...props }) => /* @__PURE__ */ jsx("h2", { ...props }),
		input({ type, checked }) {
			if (type !== "checkbox") return /* @__PURE__ */ jsx("input", { type });
			return /* @__PURE__ */ jsx("span", {
				"data-task-checkbox": true,
				className: `inline-flex items-center justify-center w-4 h-4 rounded-xs border-2 shrink-0 align-middle
                        ${checked ? "bg-login border-login" : "border-login/50"}`,
				children: checked && /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 10 8",
					className: "w-2.5 h-2.5 fill-none stroke-white stroke-2",
					children: /* @__PURE__ */ jsx("polyline", {
						points: "1,4 4,7 9,1",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			});
		},
		a({ href, children }) {
			return /* @__PURE__ */ jsxs("a", {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex items-center gap-1 text-login hover:text-login/80 underline underline-offset-2 transition-colors",
				children: [children, /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 shrink-0 opacity-70" })]
			});
		},
		pre({ children }) {
			return /* @__PURE__ */ jsx("pre", {
				className: "block rounded-lg overflow-auto whitespace-pre-wrap wrap-break-word w-full",
				children
			});
		}
	};
}
function MarkdownRender({ MDstr, components, className, size }) {
	return /* @__PURE__ */ jsx("div", {
		className: className ?? `prose ${size === "sm" ? "prose-sm" : size === "lg" ? "prose-lg" : size === "xl" ? "prose-xl" : ""} prose-custom max-w-none`,
		children: /* @__PURE__ */ jsx(Markdown, {
			components: {
				...makeDefaultComponents(),
				...components
			},
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeHighlight],
			children: MDstr.replace(/\\n/g, "\n")
		})
	});
}
//#endregion
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
//#region src/components/inputs/shared/colorPickerPopup.tsx
function hexToHsv(hex) {
	hex = hex.replace("#", "");
	let r = 0, g = 0, b = 0;
	if (hex.length === 3) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 6) {
		r = parseInt(hex.substring(0, 2), 16);
		g = parseInt(hex.substring(2, 4), 16);
		b = parseInt(hex.substring(4, 6), 16);
	}
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;
	const s = max === 0 ? 0 : d / max;
	const v = max;
	if (max !== min) {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return {
		h: h * 360,
		s: s * 100,
		v: v * 100
	};
}
function hsvToRgb(h, s, v) {
	let r = 0, g = 0, b = 0;
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255)
	};
}
function hsvToHex(h, s, v) {
	const { r, g, b } = hsvToRgb(h / 360, s / 100, v / 100);
	function toHex(x) {
		const hex = x.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
const PRESET_COLORS = [
	"#f87171",
	"#fd8738",
	"#fbbf24",
	"#facc15",
	"#a3e635",
	"#4ade80",
	"#34d399",
	"#2dd4bf",
	"#38bdf8",
	"#60a5fa",
	"#818cf8",
	"#a78bfa",
	"#c084fc",
	"#e879f9",
	"#f472b6",
	"#fb7185"
];
function SaturationPicker({ hsv, onChange }) {
	const containerRef = useRef(null);
	function handleMove(e) {
		if (!containerRef.current) return;
		const { left, top, width, height } = containerRef.current.getBoundingClientRect();
		const x = Math.min(Math.max((e.clientX - left) / width, 0), 1);
		const y = Math.min(Math.max((e.clientY - top) / height, 0), 1);
		onChange(x * 100, (1 - y) * 100);
	}
	function handleMouseDown(e) {
		handleMove(e);
		function moveHandler(e) {
			handleMove(e);
		}
		function upHandler() {
			window.removeEventListener("mousemove", moveHandler);
			window.removeEventListener("mouseup", upHandler);
		}
		window.addEventListener("mousemove", moveHandler);
		window.addEventListener("mouseup", upHandler);
	}
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: "w-full h-32 relative rounded-md overflow-hidden cursor-crosshair mb-3 select-none",
		style: { backgroundColor: hsvToHex(hsv.h, 100, 100) },
		onMouseDown: handleMouseDown,
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-r from-white to-transparent" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black to-transparent" }),
			/* @__PURE__ */ jsx("div", {
				className: `
                    absolute w-3 h-3 border-2 border-white rounded-full
                    shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none
                `,
				style: {
					left: `${hsv.s}%`,
					top: `${100 - hsv.v}%`
				}
			})
		]
	});
}
function HuePicker({ hue, onChange }) {
	const containerRef = useRef(null);
	function handleMove(e) {
		if (!containerRef.current) return;
		const { left, width } = containerRef.current.getBoundingClientRect();
		onChange(Math.min(Math.max((e.clientX - left) / width, 0), 1) * 360);
	}
	function handleMouseDown(e) {
		handleMove(e);
		function moveHandler(e) {
			handleMove(e);
		}
		function upHandler() {
			window.removeEventListener("mousemove", moveHandler);
			window.removeEventListener("mouseup", upHandler);
		}
		window.addEventListener("mousemove", moveHandler);
		window.addEventListener("mouseup", upHandler);
	}
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: "w-full h-3 relative rounded-full cursor-pointer mb-4 select-none",
		style: { background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)" },
		onMouseDown: handleMouseDown,
		children: /* @__PURE__ */ jsx("div", {
			className: `
                    absolute w-4 h-4 bg-white border border-gray-200
                    rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2
                    top-1/2 pointer-events-none
                `,
			style: { left: `${hue / 360 * 100}%` }
		})
	});
}
function ColorPickerPopup({ value, onChange, onClose, anchorName }) {
	const [hsv, setHsv] = useState(() => hexToHsv(value || "#000000"));
	const [hexInput, setHexInput] = useState(value || "#000000");
	useEffect(() => {
		if (value && value !== hexInput) {
			setHsv(hexToHsv(value));
			setHexInput(value);
		}
	}, [value]);
	function handleColorChange(newHsv) {
		setHsv(newHsv);
		const hex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
		setHexInput(hex);
		onChange(hex);
	}
	function handleSaturationChange(s, v) {
		handleColorChange({
			...hsv,
			s,
			v
		});
	}
	function handleHueChange(h) {
		handleColorChange({
			...hsv,
			h
		});
	}
	function manualHexChange(e) {
		const val = e.target.value;
		setHexInput(val);
		if (/^#[0-9A-F]{6}$/i.test(val)) {
			setHsv(hexToHsv(val));
			onChange(val);
		}
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed z-50 bg-login-700 border border-login-500/50 rounded-md shadow-xl p-3 w-64 select-none anchor-popup",
		style: {
			positionAnchor: anchorName,
			positionArea: "bottom span-right",
			insetArea: "bottom span-right",
			positionTryFallbacks: "flip-block",
			margin: "0.25rem 0"
		},
		children: [
			/* @__PURE__ */ jsx(SaturationPicker, {
				hsv,
				onChange: handleSaturationChange
			}),
			/* @__PURE__ */ jsx(HuePicker, {
				hue: hsv.h,
				onChange: handleHueChange
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 mb-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-login-200 font-mono",
						children: "HEX"
					}),
					/* @__PURE__ */ jsx("input", {
						type: "text",
						value: hexInput,
						onChange: manualHexChange,
						className: `
                        flex-1 min-w-0 bg-login-600 border border-login-500/50 rounded
                        px-2 py-1 text-sm text-login-text focus:outline-none
                        focus:border-login/60 focus:ring-1 focus:ring-login/30
                    `,
						spellCheck: false
					}),
					/* @__PURE__ */ jsx("div", {
						className: "w-8 h-8 rounded border border-login-500/50 shrink-0",
						style: { backgroundColor: hexInput }
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-8 gap-1.5 pt-3 border-t border-login-500/25",
				children: PRESET_COLORS.map((color) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: `
                            w-6 h-6 rounded-sm cursor-pointer hover:scale-110
                            hover:zIndex-10 transition-transform ring-1 ring-inset ring-black/10
                        `,
					style: { backgroundColor: color },
					onClick: () => {
						setHsv(hexToHsv(color));
						setHexInput(color);
						onChange(color);
						onClose();
					},
					title: color
				}, color))
			})
		]
	});
}
//#endregion
//#region src/components/inputs/shared/dateTimePickerPopup.tsx
const DAYS = [
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa",
	"Su"
];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function DateTimePickerPopup({ value, onChange, type, onClose, anchorName }) {
	const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
	const [timeInput, setTimeInput] = useState({
		hours: value ? value.getHours().toString() : "0",
		minutes: value ? value.getMinutes().toString() : "0"
	});
	useEffect(() => {
		if (value) {
			setCurrentDate(value);
			setTimeInput((prev) => ({
				hours: prev.hours === "" && value.getHours() === 0 ? "" : value.getHours().toString(),
				minutes: prev.minutes === "" && value.getMinutes() === 0 ? "" : value.getMinutes().toString()
			}));
		}
	}, [value]);
	function handleDateSelect(day) {
		const newDate = new Date(currentDate);
		newDate.setDate(day);
		if (value) {
			newDate.setHours(value.getHours());
			newDate.setMinutes(value.getMinutes());
		} else newDate.setHours(0, 0, 0, 0);
		onChange(newDate);
		if (type === "date" && onClose) onClose();
	}
	function handleTimeChange(timeUnit, val) {
		const newDate = value ? new Date(value) : /* @__PURE__ */ new Date();
		if (!value) newDate.setHours(0, 0, 0, 0);
		if (timeUnit === "hours") {
			if (val < 0 || val > 23) return;
			newDate.setHours(val);
		}
		if (timeUnit === "minutes") {
			if (val < 0 || val > 59) return;
			newDate.setMinutes(val);
		}
		onChange(newDate);
	}
	function onTimeInputChange(unit, val) {
		if (val === "") {
			setTimeInput((prev) => ({
				...prev,
				[unit]: ""
			}));
			handleTimeChange(unit, 0);
			return;
		}
		if (!/^\d+$/.test(val)) return;
		const num = parseInt(val);
		if (unit === "hours" && num > 23) return;
		if (unit === "minutes" && num > 59) return;
		setTimeInput((prev) => ({
			...prev,
			[unit]: val
		}));
		handleTimeChange(unit, num);
	}
	function onTimeInputBlur(unit) {
		if (timeInput[unit] === "") {
			const num = unit === "hours" ? value?.getHours() ?? 0 : value?.getMinutes() ?? 0;
			setTimeInput((prev) => ({
				...prev,
				[unit]: num.toString()
			}));
		}
	}
	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}
	function getFirstDayOfMonth(year, month) {
		return new Date(year, month, 1).getDay();
	}
	function renderCalendar() {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDay = getFirstDayOfMonth(year, month);
		const days = [];
		const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
		for (let i = 0; i < adjustedFirstDay; i++) days.push(/* @__PURE__ */ jsx("div", { className: "w-8 h-8" }, `empty-${i}`));
		for (let i = 1; i <= daysInMonth; i++) {
			const isSelected = value && value.getDate() === i && value.getMonth() === month && value.getFullYear() === year;
			const isToday = (/* @__PURE__ */ new Date()).getDate() === i && (/* @__PURE__ */ new Date()).getMonth() === month && (/* @__PURE__ */ new Date()).getFullYear() === year;
			days.push(/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => handleDateSelect(i),
				className: `
                        w-8 h-8 flex items-center justify-center rounded-full text-sm
                        hover:bg-login-600 transition-colors
                        ${isSelected ? "bg-login! text-white! hover:bg-login!" : ""}
                        ${!isSelected && isToday ? "text-login! font-bold" : ""}
                        ${!isSelected && !isToday ? "text-login-text!" : ""}
                    `,
				children: i
			}, i));
		}
		return /* @__PURE__ */ jsxs("div", {
			className: "p-2",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-2",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setCurrentDate(new Date(year, month - 1)),
							className: "p-1 hover:bg-login-600 rounded-full text-login-text transition-colors",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "font-medium text-login-text",
							children: [
								MONTHS[month],
								" ",
								year
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setCurrentDate(new Date(year, month + 1)),
							className: "p-1 hover:bg-login-600 rounded-full text-login-text transition-colors",
							children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-7 gap-1 mb-1",
					children: DAYS.map((d) => /* @__PURE__ */ jsx("div", {
						className: "w-8 text-center text-xs text-login-200 font-medium",
						children: d
					}, d))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-7 gap-1",
					children: days
				})
			]
		});
	}
	function renderTimePicker() {
		return /* @__PURE__ */ jsxs("div", {
			className: "p-2 border-t border-login-500/25 flex justify-center gap-2",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs text-login-200 mb-1",
						children: "Hour"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						inputMode: "numeric",
						value: timeInput.hours,
						onChange: (e) => onTimeInputChange("hours", e.target.value),
						onBlur: () => onTimeInputBlur("hours"),
						className: `
                            w-16 p-1 bg-login-600 rounded text-center text-login-text text-sm
                            border border-login-500/50 focus:border-login/60 focus:ring-1 focus:ring-login/30 outline-none
                        `
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-end pb-2 text-login-text",
					children: ":"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-xs text-login-200 mb-1",
						children: "Minute"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						inputMode: "numeric",
						value: timeInput.minutes,
						onChange: (e) => onTimeInputChange("minutes", e.target.value),
						onBlur: () => onTimeInputBlur("minutes"),
						className: `
                            w-16 p-1 bg-login-600 rounded text-center text-login-text text-sm
                            border border-login-500/50 focus:border-login/60 focus:ring-1 focus:ring-login/30 outline-none
                        `
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed z-50 bg-login-700 border border-login-500/50 rounded-md shadow-xl p-1 min-w-70 anchor-popup",
		style: {
			positionAnchor: anchorName,
			positionArea: "bottom span-right",
			insetArea: "bottom span-right",
			positionTryFallbacks: "flip-block",
			margin: "0.25rem 0"
		},
		children: [type !== "time" && renderCalendar(), (type === "time" || type === "datetime-local") && renderTimePicker()]
	});
}
//#endregion
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
//#region src/components/inputs/searchInput.tsx
function SearchInput({ placeholder = "Search...", variant = "default" }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
	useEffect(() => {
		setSearchValue(searchParams.get("q") || "");
	}, [searchParams]);
	function handleSearch(value) {
		setSearchValue(value);
		const params = new URLSearchParams(searchParams.toString());
		if (value.trim()) params.set("q", value.trim());
		else params.delete("q");
		params.delete("page");
		router.push(`${pathname}?${params.toString()}`);
	}
	function handleKeyDown(e) {
		if (e.key === "Enter") handleSearch(searchValue);
	}
	function handleChange(e) {
		setSearchValue(e.target.value);
	}
	if (variant === "minimal") return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" }), /* @__PURE__ */ jsx("input", {
			type: "text",
			value: searchValue,
			onChange: (e) => setSearchValue(e.target.value),
			onKeyDown: handleKeyDown,
			onBlur: () => handleSearch(searchValue),
			placeholder,
			className: "pl-10 pr-4 py-2 border-b outline-none w-64"
		})]
	});
	else return /* @__PURE__ */ jsx("div", {
		className: "w-fit min-w-48",
		children: /* @__PURE__ */ jsx(Input, {
			name: "search",
			icon: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }),
			value: searchValue,
			onChange: handleChange,
			onKeyDown: handleKeyDown,
			onBlur: () => handleSearch(searchValue),
			placeholder
		})
	});
}
//#endregion
//#region src/components/inputs/textarea.tsx
function isValidJson(str) {
	try {
		JSON.parse(str);
		return null;
	} catch (error) {
		return error.message;
	}
}
function Textarea(props) {
	const { name, label, error, className, info, description, type = "text", rows = 4, textSize = "sm", ...textareaProps } = props;
	const { value } = textareaProps;
	const [preview, setPreview] = useState(false);
	const displayError = (type === "json" && value ? isValidJson(value) : void 0) || error;
	return /* @__PURE__ */ jsx(FieldWrapper, {
		label,
		name,
		required: textareaProps.required,
		info,
		description,
		error: displayError,
		textSize,
		className,
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [
				type === "markdown" && /* @__PURE__ */ jsx("div", {
					className: "absolute right-2 top-2 z-10 flex gap-2",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setPreview(!preview),
						className: "p-1 rounded hover:bg-login-500/50 text-login-text transition-colors",
						title: preview ? "Edit" : "Preview",
						children: preview ? /* @__PURE__ */ jsx(Pencil, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
					})
				}),
				type === "markdown" && preview && /* @__PURE__ */ jsx("div", {
					className: `
                            w-full rounded-md bg-login-500/50 border border-login-500
                            p-3 overflow-y-auto ${error ? "border-red-500/70" : ""}
                        `,
					children: /* @__PURE__ */ jsx(MarkdownRender, { MDstr: String(value || "") })
				}),
				/* @__PURE__ */ jsx("textarea", {
					...textareaProps,
					id: name,
					name,
					rows,
					title: label,
					"aria-invalid": !!error,
					"aria-describedby": error ? `${name}-error` : void 0,
					className: `
                        ${type === "markdown" && preview ? "hidden" : ""}
                        w-full rounded-md bg-login-500/50 border border-login-500
                        text-login-text placeholder-login-200 text-sm
                        focus:outline-none focus:border-login/60 focus:ring-1 focus:ring-login/30
                        disabled:opacity-40 disabled:cursor-not-allowed
                        p-3 pr-10
                        transition-all duration-150
                        resize-y
                        ${error ? "border-red-500/70 focus:border-red-500/70 focus:ring-red-500/30" : ""}
                    `
				})
			]
		})
	});
}
//#endregion
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
								className: "flex items-center gap-1 px-2 py-0.5 bg-login-600 text-login-100 border border-login-500 rounded text-sm",
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
					className: "absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md bg-login-800 border border-login-500/50 shadow-lg",
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
				children: /* @__PURE__ */ jsx("span", { className: "absolute inset-y-0 my-auto left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all group-has-[input:checked]/sw:translate-x-full" })
			})]
		})
	});
}
//#endregion
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
//#region src/components/logo/logo.tsx
function Logo({ className }) {
	const corner = "fill-[var(--foreground)] transition-all duration-1000";
	const letter = "fill-none stroke-[var(--color-login)] stroke-[3.5px]";
	return /* @__PURE__ */ jsxs("svg", {
		className: `block w-full max-w-2xl mx-auto ${className || ""}`,
		viewBox: "0 0 147.02299 59.20511",
		children: [
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 28.77713,58.37738 v 0.76465 H 25.531 v -5.61816 h 0.91309 v 4.85351 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 30.47831,59.142 h -0.917 v -5.61813 h 0.917 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 36.46268,53.52387 V 59.142 H 35.99881 A 0.36347,0.36347 0 0 1 35.6785,58.98185 L 32.59256,55.018 c 0.0078,0.07617 0.01368,0.15039 0.01758,0.22461 0.0039,0.07422 0.0059,0.14258 0.0059,0.20508 V 59.142 h -0.80371 v -5.61813 h 0.47656 a 0.71321,0.71321 0 0 1 0.09864,0.0059 0.3128,0.3128 0 0 1 0.07617,0.02148 0.22919,0.22919 0 0 1 0.0664,0.04688 0.63781,0.63781 0 0 1 0.06641,0.07812 l 3.08984,3.96779 c -0.0078,-0.08105 -0.01367,-0.16015 -0.01757,-0.23828 -0.0039,-0.07813 -0.0059,-0.15039 -0.0059,-0.21875 v -3.6631 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 39.84549,57.1684 a 2.91264,2.91264 0 0 1 -0.11523,0.84765 1.748,1.748 0 0 1 -0.34375,0.64063 1.52483,1.52483 0 0 1 -0.56543,0.40527 2.00691,2.00691 0 0 1 -0.78223,0.14258 3.23707,3.23707 0 0 1 -0.40234,-0.0254 3.44454,3.44454 0 0 1 -0.41309,-0.0801 l 0.04688,-0.5459 a 0.2079,0.2079 0 0 1 0.06055,-0.125 0.19754,0.19754 0 0 1 0.14257,-0.0469 0.74035,0.74035 0 0 1 0.18067,0.0293 1.36468,1.36468 0 0 0 0.71387,-0.041 0.74722,0.74722 0 0 0 0.3125,-0.2207 0.9864,0.9864 0 0 0 0.1914,-0.38574 2.19551,2.19551 0 0 0 0.06445,-0.57227 v -3.667 h 0.90918 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 44.6326,58.40473 -0.0039,0.7373 h -3.50391 v -5.61816 h 3.50391 v 0.7373 h -2.58692 v 1.69336 h 2.06739 v 0.71387 h -2.06739 v 1.73633 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 46.53592,54.26117 V 56.06 h 2.19629 v 0.7373 h -2.19629 v 2.3447 h -0.917 v -5.61813 h 3.50391 v 0.7373 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 55.25956,56.33344 a 3.18179,3.18179 0 0 1 -0.20215,1.15039 2.6634,2.6634 0 0 1 -0.57227,0.90722 2.59685,2.59685 0 0 1 -0.88476,0.59473 3.17156,3.17156 0 0 1 -2.29492,0 2.62415,2.62415 0 0 1 -0.88672,-0.59473 2.65327,2.65327 0 0 1 -0.57422,-0.90722 3.37717,3.37717 0 0 1 0,-2.30176 2.67118,2.67118 0 0 1 0.57422,-0.90918 2.61491,2.61491 0 0 1 0.88672,-0.59668 3.1717,3.1717 0 0 1 2.29492,0 2.58781,2.58781 0 0 1 0.88476,0.59668 2.68144,2.68144 0 0 1 0.57227,0.90918 3.1871,3.1871 0 0 1 0.20215,1.15137 z m -0.93164,0 a 2.706,2.706 0 0 0 -0.13086,-0.87012 1.821,1.821 0 0 0 -0.375,-0.65527 1.63008,1.63008 0 0 0 -0.59082,-0.41407 2.16795,2.16795 0 0 0 -1.55664,0 1.65415,1.65415 0 0 0 -0.59278,0.41407 1.84212,1.84212 0 0 0 -0.3789,0.65527 2.92611,2.92611 0 0 0 0,1.74316 1.83766,1.83766 0 0 0 0.3789,0.6543 1.64222,1.64222 0 0 0 0.59278,0.40918 2.19564,2.19564 0 0 0 1.55664,0 1.61838,1.61838 0 0 0 0.59082,-0.40918 1.81652,1.81652 0 0 0 0.375,-0.6543 2.71589,2.71589 0 0 0 0.13086,-0.87304 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 60.534,59.142 h -0.81543 a 0.377,0.377 0 0 1 -0.35156,-0.1875 l -1.31055,-1.8916 a 0.4267,0.4267 0 0 0 -0.14453,-0.14063 0.50286,0.50286 0 0 0 -0.23437,-0.043 H 57.17072 V 59.142 H 56.2576 v -5.61813 h 1.6543 a 3.54427,3.54427 0 0 1 0.9541,0.11328 1.80649,1.80649 0 0 1 0.65723,0.32226 1.25606,1.25606 0 0 1 0.37988,0.501 1.76427,1.76427 0 0 1 0.03516,1.19727 1.50418,1.50418 0 0 1 -0.25293,0.46093 1.61283,1.61283 0 0 1 -0.40821,0.3584 2.04861,2.04861 0 0 1 -0.5498,0.23828 0.92346,0.92346 0 0 1 0.28906,0.28516 z m -2.64551,-2.92578 a 1.763,1.763 0 0 0 0.5459,-0.07617 1.11007,1.11007 0 0 0 0.39063,-0.21289 0.87892,0.87892 0 0 0 0.23437,-0.3252 1.10093,1.10093 0 0 0 0.07715,-0.41992 0.84276,0.84276 0 0 0 -0.30371,-0.70215 1.46527,1.46527 0 0 0 -0.9209,-0.24219 h -0.74121 v 1.97852 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 64.72049,58.40473 -0.0039,0.7373 h -3.50391 v -5.61816 h 3.50391 v 0.7373 h -2.58692 v 1.69336 h 2.06739 v 0.71387 h -2.06739 v 1.73633 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 70.35721,53.52387 V 59.142 H 69.89335 A 0.36347,0.36347 0 0 1 69.57303,58.98185 L 66.4871,55.018 c 0.0078,0.07617 0.01367,0.15039 0.01757,0.22461 0.0039,0.07422 0.0059,0.14258 0.0059,0.20508 V 59.142 h -0.80371 v -5.61813 h 0.47656 a 0.71321,0.71321 0 0 1 0.09864,0.0059 0.3128,0.3128 0 0 1 0.07617,0.02148 0.22936,0.22936 0 0 1 0.06641,0.04688 0.63869,0.63869 0 0 1 0.0664,0.07812 l 3.08985,3.96777 c -0.008,-0.08105 -0.0137,-0.16015 -0.0176,-0.23828 -0.004,-0.07813 -0.006,-0.15039 -0.006,-0.21875 v -3.66308 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 72.6121,59.142 h -0.917 v -5.61813 h 0.917 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 78.59794,53.52387 V 59.142 H 78.13358 A 0.36344,0.36344 0 0 1 77.81327,58.98185 L 74.72733,55.018 c 0.008,0.07617 0.0137,0.15039 0.0176,0.22461 0.004,0.07422 0.006,0.14258 0.006,0.20508 V 59.142 h -0.80371 v -5.61813 h 0.47656 a 0.713,0.713 0 0 1 0.0986,0.0059 0.31254,0.31254 0 0 1 0.0762,0.02148 0.22936,0.22936 0 0 1 0.0664,0.04688 0.63869,0.63869 0 0 1 0.0664,0.07812 l 3.08984,3.96777 c -0.008,-0.08105 -0.0137,-0.16015 -0.0176,-0.23828 -0.004,-0.07813 -0.006,-0.15039 -0.006,-0.21875 v -3.66308 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 84.53544,56.37641 V 58.6 a 3.24425,3.24425 0 0 1 -1.9502,0.60449 3.419,3.419 0 0 1 -1.23535,-0.21289 2.7275,2.7275 0 0 1 -0.94141,-0.59277 2.59231,2.59231 0 0 1 -0.60156,-0.90723 3.08634,3.08634 0 0 1 -0.21,-1.1582 3.23536,3.23536 0 0 1 0.20215,-1.165 2.5484,2.5484 0 0 1 1.49414,-1.498 3.29189,3.29189 0 0 1 1.20215,-0.209 3.52605,3.52605 0 0 1 0.62988,0.05273 3.11559,3.11559 0 0 1 0.54,0.14649 2.535,2.535 0 0 1 0.84668,0.52246 l -0.26074,0.418 a 0.26545,0.26545 0 0 1 -0.16016,0.12109 0.27377,0.27377 0 0 1 -0.21094,-0.04688 c -0.0752,-0.04492 -0.15527,-0.09082 -0.24023,-0.14062 a 2.01137,2.01137 0 0 0 -0.29,-0.13867 2.127,2.127 0 0 0 -0.37891,-0.10547 2.72656,2.72656 0 0 0 -0.50683,-0.041 2.09434,2.09434 0 0 0 -0.80176,0.14649 1.70173,1.70173 0 0 0 -0.61035,0.418 1.84692,1.84692 0 0 0 -0.39063,0.65722 2.5766,2.5766 0 0 0 -0.13672,0.86231 2.62333,2.62333 0 0 0 0.14453,0.89844 1.88731,1.88731 0 0 0 0.41016,0.67187 1.74772,1.74772 0 0 0 0.6416,0.419 2.55647,2.55647 0 0 0 1.459,0.0703 2.80344,2.80344 0 0 0 0.53222,-0.207 V 57.07074 H 82.928 a 0.19287,0.19287 0 0 1 -0.13964,-0.04883 0.16848,0.16848 0 0 1 -0.0508,-0.12695 v -0.51855 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 89.1243,58.40473 -0.004,0.7373 h -3.50391 v -5.61816 h 3.50391 v 0.7373 h -2.58692 v 1.69336 h 2.06739 v 0.71387 h -2.06739 v 1.73633 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 94.761,53.52387 V 59.142 H 94.29713 A 0.36347,0.36347 0 0 1 93.97682,58.98185 L 90.8909,55.018 c 0.008,0.07617 0.0137,0.15039 0.0176,0.22461 0.004,0.07422 0.006,0.14258 0.006,0.20508 V 59.142 h -0.80371 v -5.61813 h 0.47656 a 0.71321,0.71321 0 0 1 0.0986,0.0059 0.3128,0.3128 0 0 1 0.0762,0.02148 0.22919,0.22919 0 0 1 0.0664,0.04688 0.63781,0.63781 0 0 1 0.0664,0.07812 l 3.08984,3.96777 c -0.008,-0.08105 -0.0137,-0.16015 -0.0176,-0.23828 -0.004,-0.07813 -0.006,-0.15039 -0.006,-0.21875 v -3.66308 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 98.95829,54.26117 V 56.06 h 2.19629 v 0.7373 h -2.19629 v 2.3447 h -0.917 v -5.61813 h 3.5039 v 0.7373 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 107.68192,56.33344 a 3.18158,3.18158 0 0 1 -0.20215,1.15039 2.66353,2.66353 0 0 1 -0.57226,0.90722 2.597,2.597 0 0 1 -0.88477,0.59473 3.17156,3.17156 0 0 1 -2.29492,0 2.62415,2.62415 0 0 1 -0.88672,-0.59473 2.65327,2.65327 0 0 1 -0.57422,-0.90722 3.37717,3.37717 0 0 1 0,-2.30176 2.67118,2.67118 0 0 1 0.57422,-0.90918 2.61491,2.61491 0 0 1 0.88672,-0.59668 3.1717,3.1717 0 0 1 2.29492,0 2.588,2.588 0 0 1 0.88477,0.59668 2.68157,2.68157 0 0 1 0.57226,0.90918 3.18689,3.18689 0 0 1 0.20215,1.15137 z m -0.93164,0 a 2.706,2.706 0 0 0 -0.13086,-0.87012 1.82066,1.82066 0 0 0 -0.375,-0.65527 1.63,1.63 0 0 0 -0.59082,-0.41407 2.16795,2.16795 0 0 0 -1.55664,0 1.65411,1.65411 0 0 0 -0.59277,0.41407 1.84214,1.84214 0 0 0 -0.37891,0.65527 2.92632,2.92632 0 0 0 0,1.74316 1.83768,1.83768 0 0 0 0.37891,0.6543 1.64218,1.64218 0 0 0 0.59277,0.40918 2.19564,2.19564 0 0 0 1.55664,0 1.61829,1.61829 0 0 0 0.59082,-0.40918 1.81623,1.81623 0 0 0 0.375,-0.6543 2.71589,2.71589 0 0 0 0.13086,-0.87304 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 112.95731,59.142 h -0.81543 a 0.377,0.377 0 0 1 -0.35156,-0.1875 l -1.31055,-1.8916 a 0.4267,0.4267 0 0 0 -0.14453,-0.14063 0.50286,0.50286 0 0 0 -0.23437,-0.043 H 109.594 V 59.142 h -0.91309 v -5.61813 h 1.6543 a 3.54427,3.54427 0 0 1 0.9541,0.11328 1.80649,1.80649 0 0 1 0.65723,0.32226 1.25606,1.25606 0 0 1 0.37988,0.501 1.76427,1.76427 0 0 1 0.0352,1.19727 1.50418,1.50418 0 0 1 -0.25293,0.46093 1.61283,1.61283 0 0 1 -0.40821,0.3584 2.04861,2.04861 0 0 1 -0.5498,0.23828 0.92346,0.92346 0 0 1 0.28906,0.28516 z m -2.64551,-2.92578 a 1.763,1.763 0 0 0 0.5459,-0.07617 1.11007,1.11007 0 0 0 0.39063,-0.21289 0.87892,0.87892 0 0 0 0.23437,-0.3252 1.10093,1.10093 0 0 0 0.0772,-0.41992 0.84276,0.84276 0 0 0 -0.30371,-0.70215 1.46527,1.46527 0 0 0 -0.9209,-0.24219 H 109.594 v 1.97852 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 116.4954,59.142 h -0.917 v -5.61813 h 0.917 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 121.69559,54.28461 h -1.75195 V 59.142 h -0.9082 v -4.85739 h -1.75586 v -0.76074 h 4.416 z"
			}),
			/* @__PURE__ */ jsx("polyline", {
				className: letter,
				style: { strokeMiterlimit: 10 },
				points: "47.871 98.1 33.189 98.1 33.189 83.418",
				transform: "translate(-31.392,-41.894)"
			}),
			/* @__PURE__ */ jsx("polyline", {
				className: letter,
				style: { strokeMiterlimit: 10 },
				points: "33.142 58.326 33.142 43.644 47.824 43.644",
				transform: "translate(-31.392,-41.894)"
			}),
			/* @__PURE__ */ jsx("polyline", {
				className: letter,
				style: { strokeMiterlimit: 10 },
				points: "161.983 98.122 176.665 98.122 176.665 83.44",
				transform: "translate(-31.392,-41.894)"
			}),
			/* @__PURE__ */ jsx("polyline", {
				className: letter,
				style: { strokeMiterlimit: 10 },
				points: "176.665 58.372 176.665 43.69 161.983 43.69",
				transform: "translate(-31.392,-41.894)"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 30.02449,40.19351 v 4.12842 H 12.4991 V 13.99038 h 4.92871 v 26.20313 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 61.53523,29.1564 a 17.15942,17.15942 0 0 1 -1.09473,6.21338 14.35971,14.35971 0 0 1 -3.08593,4.89746 14.091,14.091 0 0 1 -4.78125,3.21191 17.1289,17.1289 0 0 1 -12.38575,0 13.98317,13.98317 0 0 1 -7.88867,-8.10937 18.18161,18.18161 0 0 1 0,-12.42725 14.39119,14.39119 0 0 1 3.09668,-4.90771 14.13157,14.13157 0 0 1 4.792,-3.22315 17.13565,17.13565 0 0 1 12.38575,0 14.02046,14.02046 0 0 1 4.78125,3.22315 14.47032,14.47032 0 0 1 3.08593,4.90771 17.16209,17.16209 0 0 1 1.09472,6.21387 z m -5.03418,0 a 14.62587,14.62587 0 0 0 -0.70508,-4.69727 9.9446,9.9446 0 0 0 -2.02246,-3.53906 8.80545,8.80545 0 0 0 -3.1914,-2.23242 11.719,11.719 0 0 0 -8.4043,0 8.90077,8.90077 0 0 0 -3.20117,2.23242 9.96735,9.96735 0 0 0 -2.043,3.53906 15.81644,15.81644 0 0 0 0,9.415 9.847,9.847 0 0 0 2.043,3.52832 8.85094,8.85094 0 0 0 3.20117,2.21192 11.87213,11.87213 0 0 0 8.4043,0 8.75623,8.75623 0 0 0 3.1914,-2.21192 9.82454,9.82454 0 0 0 2.02249,-3.52828 14.69371,14.69371 0 0 0 0.70505,-4.71777 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 91.76082,29.38784 v 12.00635 a 17.5354,17.5354 0 0 1 -10.53125,3.26465 18.41512,18.41512 0 0 1 -6.667,-1.148 14.80254,14.80254 0 0 1 -5.08691,-3.20166 14.0148,14.0148 0 0 1 -3.24316,-4.897 16.691,16.691 0 0 1 -1.1377,-6.25586 17.42935,17.42935 0 0 1 1.09473,-6.2876 13.74023,13.74023 0 0 1 8.06738,-8.08838 17.7222,17.7222 0 0 1 6.48828,-1.127 19.10354,19.10354 0 0 1 3.40137,0.28418 16.85244,16.85244 0 0 1 2.917,0.79 13.68442,13.68442 0 0 1 2.48633,1.22168 13.95372,13.95372 0 0 1 2.085,1.60058 l -1.41113,2.25391 a 1.40229,1.40229 0 0 1 -0.86426,0.65283 1.47784,1.47784 0 0 1 -1.13672,-0.25244 q -0.6123,-0.35816 -1.2959,-0.7583 a 11.33129,11.33129 0 0 0 -1.56933,-0.748 11.53387,11.53387 0 0 0 -2.043,-0.56836 14.78335,14.78335 0 0 0 -2.73828,-0.22119 11.32128,11.32128 0 0 0 -4.32813,0.78955 9.26752,9.26752 0 0 0 -3.29687,2.25391 9.99164,9.99164 0 0 0 -2.10645,3.54931 13.90267,13.90267 0 0 0 -0.7373,4.65528 14.11731,14.11731 0 0 0 0.77929,4.855 10.1425,10.1425 0 0 0 2.21192,3.62305 9.43419,9.43419 0 0 0 3.46484,2.26416 13.81975,13.81975 0 0 0 7.87793,0.3789 15.14816,15.14816 0 0 0 2.875,-1.11621 v -6.02383 h -4.2334 a 1.04883,1.04883 0 0 1 -0.75879,-0.26367 0.90553,0.90553 0 0 1 -0.27343,-0.68457 v -2.80127 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M 102.546,44.32193 H 97.59581 V 13.99038 h 4.95019 z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "m 134.8575,13.99038 v 30.33155 h -2.50684 a 2.14219,2.14219 0 0 1 -0.96875,-0.2002 2.26108,2.26108 0 0 1 -0.75879,-0.66357 L 113.962,22.05777 q 0.063,0.61083 0.0947,1.21093 0.0322,0.60058 0.0322,1.106 v 19.94723 h -4.3398 V 13.99038 h 2.57031 a 3.89092,3.89092 0 0 1 0.53711,0.03174 1.53328,1.53328 0 0 1 0.41016,0.11572 1.18964,1.18964 0 0 1 0.35839,0.25293 4.01792,4.01792 0 0 1 0.3584,0.4209 l 16.68164,21.42188 q -0.063,-0.65259 -0.0947,-1.28467 -0.0308,-0.63208 -0.0312,-1.17969 V 13.99038 Z"
			})
		]
	});
}
//#endregion
//#region src/components/logo/logoSmall.tsx
function LogoSmall() {
	const corner = "fill-login";
	const letter = "fill-[var(--foreground)] transition-all duration-1000";
	return /* @__PURE__ */ jsxs("svg", {
		className: "block h-full",
		viewBox: "0 0 100 100",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M0 0H6.6667V28.3333H0V0Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M28.3333 0V6.6667H0V0H28.3333Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M100 0V6.6667H71.6667V0H100Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M100 28.3333H93.3333V0H100V28.3333Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M0 100V93.3333H28.3333V100H0Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M0 71.6667H6.6667V100H0V71.6667Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M100 100H93.3333V71.6667H100V100Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: corner,
				d: "M71.6667 100V93.3333H100V100H71.6667Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: letter,
				d: "M31.6667 18.3333H43.3334V81.6666H31.6667V18.3333Z"
			}),
			/* @__PURE__ */ jsx("path", {
				className: letter,
				d: "M31.6667 70H68.3334V81.6667H31.6667V70Z"
			})
		]
	});
}
//#endregion
//#region src/components/toggle/theme.tsx
function ThemeToggle({ className }) {
	const router = useRouter();
	const [theme, setTheme] = useState("dark");
	useEffect(() => {
		const savedTheme = getCookie("theme");
		if (savedTheme) setTheme(savedTheme);
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(theme);
	}, [theme]);
	function toggleTheme() {
		const newTheme = theme === "dark" ? "light" : "dark";
		setCookie("theme", newTheme);
		setTheme(newTheme);
		router.refresh();
	}
	return /* @__PURE__ */ jsx("div", {
		className: `grid place-items-center justify-end rounded-md hover:bg-login-300/20 w-fit ${className}`,
		children: /* @__PURE__ */ jsxs("label", {
			className: "cursor-pointer",
			children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: theme === "light",
				onChange: toggleTheme,
				className: "sr-only"
			}), /* @__PURE__ */ jsx(ThemeIcon, { theme })]
		})
	});
}
function ThemeIcon({ theme }) {
	const sunrayClass = `fill-white transition-opacity duration-400 ${theme === "light" ? "opacity-0" : "opacity-100"}`;
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-12 p-3",
		viewBox: "0 0 100 100",
		xmlns: "http://www.w3.org/2000/svg",
		children: [
			/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", {
				id: "theme-toggle_clip-path",
				children: [/* @__PURE__ */ jsx("rect", {
					x: "0",
					y: "0",
					width: "100",
					height: "100",
					fill: "white"
				}), /* @__PURE__ */ jsx("circle", {
					className: `transition-transform duration-400 ${theme === "dark" ? "translate-x-8 -translate-y-4" : ""}`,
					cx: "68",
					cy: "40",
					r: "18"
				})]
			}) }),
			/* @__PURE__ */ jsx("circle", {
				className: `origin-center transition-all duration-400 ${theme === "light" ? "scale-[1.9] fill-black" : "scale-100 fill-white"}`,
				mask: "url(#theme-toggle_clip-path)",
				cx: "50",
				cy: "50",
				r: "23"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "86",
				y: "47",
				width: "14",
				height: "6",
				rx: "3"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				y: "47",
				width: "14",
				height: "6",
				rx: "3"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "47",
				y: "86",
				width: "6",
				height: "14",
				rx: "3"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "75",
				y: "75",
				width: "6",
				height: "14",
				rx: "3",
				transform: "rotate(-45 78 78)"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "84.8995",
				y: "12",
				width: "6",
				height: "14",
				rx: "3",
				transform: "rotate(45 84.8995 12)"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "22.8995",
				y: "74",
				width: "6",
				height: "14",
				rx: "3",
				transform: "rotate(45 22.8995 74)"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "13",
				y: "16.2426",
				width: "6",
				height: "14",
				rx: "3",
				transform: "rotate(-45 13 16.2426)"
			}),
			/* @__PURE__ */ jsx("rect", {
				className: sunrayClass,
				x: "47",
				y: "0",
				width: "6",
				height: "14",
				rx: "3"
			})
		]
	});
}
//#endregion
//#region src/components/toggle/language.tsx
function LanguageToggle({ language }) {
	const [lang, setLang] = useState(language || "en");
	const [jump, setJump] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const savedLang = getCookie("lang");
		if (savedLang) setLang(savedLang);
	}, []);
	function handleClick() {
		const newLang = lang === "no" ? "en" : "no";
		setCookie("lang", newLang);
		setLang(newLang);
		language = newLang;
		setJump(true);
		setTimeout(() => setJump(false), 400);
		router.refresh();
	}
	return /* @__PURE__ */ jsxs("button", {
		value: lang,
		onClick: handleClick,
		className: `cursor-pointer p-2 leading-8 text-base w-[4.3rem] text-center rounded 
        bg-transparent border-none hover:bg-gray-400/10 flex flex-row items-center justify-center gap-1`,
		children: [/* @__PURE__ */ jsx(Globe, { className: `text-xl leading-8 -mt-0.5 ${jump ? "animate-jump" : ""}` }), " " + lang]
	});
}
//#endregion
//#region src/components/navbar/bubble.tsx
function Bubble({ bubble }) {
	if (bubble.hide) return null;
	return /* @__PURE__ */ jsxs("a", {
		href: bubble.href,
		className: `absolute top-13 min-w-40 ${bubble.className}`,
		children: [/* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 12",
			className: "absolute -top-3 h-3 w-6",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("path", {
				d: "M12 0 24 12H0Z",
				fill: bubble.fill,
				stroke: bubble.stroke,
				strokeWidth: "1.5",
				strokeLinejoin: "round"
			}), /* @__PURE__ */ jsx("path", {
				d: "M12 0 24 12H0Z",
				fill: bubble.fill
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ jsx("span", {
				className: "min-w-40",
				children: bubble.text
			}), /* @__PURE__ */ jsx(X, {
				onClick: bubble.handleHide,
				className: bubble.x
			})]
		})]
	});
}
//#endregion
//#region src/components/navbar/navbar.tsx
function Navbar({ children, bubble, className, disableLanguageToggle, disableThemeToggle, innerClassName, lang, loginPath, logoutPath, onlyLogo, profilePath, token }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return /* @__PURE__ */ jsx("div", {
		className: `${isMobileMenuOpen ? "bg-[#181818f0]" : "bg-[#18181899]"} backdrop-blur-xl fixed top-0 z-900 w-full ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `flex w-full max-w-6xl m-auto p-2 transition duration-500 800px:justify-between 800px:p-4 ${isMobileMenuOpen ? "h-screen bg-login-900/20 800px:h-20" : ""} ${innerClassName}
            `,
			children: [/* @__PURE__ */ jsx("div", {
				className: "block h-12 p-1 800px:p-0",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/",
					onClick: () => setIsMobileMenuOpen(false),
					children: /* @__PURE__ */ jsx(LogoSmall, {})
				})
			}), onlyLogo ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("nav", {
					className: "hidden 800px:flex 800px:justify-between 800px:items-center 800px:w-fill max-w-200",
					children
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "flex w-[calc(100vw-8rem)] justify-end h-12 800px:w-fit",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [!disableThemeToggle && /* @__PURE__ */ jsx(ThemeToggle, {}), bubble?.theme?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.theme })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [!disableLanguageToggle && /* @__PURE__ */ jsx(LanguageToggle, { language: lang }), bubble?.lang?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.lang })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative grid gap-2",
							children: [loginPath && logoutPath && /* @__PURE__ */ jsx(AuthButton, {
								profilePath,
								token,
								loginPath,
								logoutPath
							}), bubble?.login?.condition && /* @__PURE__ */ jsx(Bubble, { bubble: bubble.login })]
						})
					]
				}),
				/* @__PURE__ */ jsxs("button", {
					className: "w-12 h-12 relative cursor-pointer bg-none border-none 800px:hidden",
					onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
					children: [/* @__PURE__ */ jsx("div", { className: hamburgerStyle(isMobileMenuOpen) }), /* @__PURE__ */ jsx("div", { className: hamburgerStyle(isMobileMenuOpen, true) })]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: `fixed top-16 w-[calc(100%-2rem)] max-w-140 mx-auto left-0 right-0 800px:hidden
                            transition-all duration-500 ease-in-out overflow-hidden 
                            ${isMobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"}`,
					onClick: () => setIsMobileMenuOpen(false),
					children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
						className: `transition-all duration-500 ease-out ${isMobileMenuOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"}`,
						style: { transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : "0ms" },
						children: child
					}, index))
				})
			] })]
		})
	});
}
function AuthButton({ profilePath, logoutPath, loginPath, token }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-[0.3rem] hover:bg-login-300/20 h-12 w-12",
		children: token ? /* @__PURE__ */ jsxs(Fragment, { children: [logoutPath && /* @__PURE__ */ jsx(Link, {
			href: logoutPath,
			prefetch: false,
			onClick: (e) => {
				e.preventDefault();
				window.location.href = logoutPath;
			},
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(LogOut, { size: 24 })
		}), profilePath && /* @__PURE__ */ jsx(Link, {
			href: profilePath,
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(User, { size: 24 })
		})] }) : /* @__PURE__ */ jsx(Link, {
			href: loginPath,
			className: "grid items-center justify-center h-full w-full",
			children: /* @__PURE__ */ jsx(User, { size: 24 })
		})
	});
}
function hamburgerStyle(isOpen, isSecond) {
	return `bg-login-50 h-0.5 absolute w-8 transition-all duration-[400ms] left-2 ${isOpen ? `top-6 ${isSecond ? "rotate-45" : "-rotate-45"}` : isSecond ? "top-7" : "top-4"}`;
}
//#endregion
//#region src/components/navbar/navbarItem.tsx
const commonStyling = "list-none flex no-underline items-center gap-2 whitespace-nowrap cursor-pointer";
function NavItem({ href, children, external = false, target, rel, title, icon }) {
	const linkProps = {
		href,
		target,
		rel,
		title
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
		...linkProps,
		className: "hidden 800px:flex",
		children: /* @__PURE__ */ jsxs("li", {
			className: `${commonStyling} text-base leading-4 p-3 font-bold transition-colors link-corner-hover
                    group-[.dropdown]:p-2.5 group-[.dropdown]:pr-3 group-[.dropdown]:pl-1`,
			children: [
				icon,
				children,
				external && /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-6 h-6 stroke-login" })
			]
		})
	}), /* @__PURE__ */ jsx(Link, {
		...linkProps,
		className: "800px:hidden",
		children: /* @__PURE__ */ jsxs("li", {
			className: `${commonStyling} text-2xl leading-6 overflow-hidden w-auto pl-4 rounded-[0.3rem] transition-all 
                    duration-600 opacity-100 h-16 py-5 group-[.dropdown]:p-0 group-[.dropdown]:text-lg group-[.dropdown]:h-auto 
                    group-[.dropdown]:py-2.5 group-[.dropdown]:pl-4`,
			children: [children, external && /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-6 h-6 stroke-login" })]
		})
	})] });
}
//#endregion
//#region src/components/navbar/navbarDropdown.tsx
function NavDropdown({ children, title, className }) {
	const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
	const [isDesktopOpen, setIsDesktopOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "relative hidden 800px:block",
		children: /* @__PURE__ */ jsxs("div", {
			className: "outline-none",
			tabIndex: 0,
			ref: useRef(null),
			onMouseEnter: () => setIsDesktopOpen(true),
			onMouseLeave: () => setIsDesktopOpen(false),
			onFocus: () => setIsDesktopOpen(true),
			onBlur: () => setIsDesktopOpen(false),
			children: [/* @__PURE__ */ jsxs("div", {
				className: `list-none no-underline text-base leading-4 p-3 font-bold cursor-pointer flex flex-row items-center 
                        transition-colors`,
				children: [title, /* @__PURE__ */ jsx(ChevronDown, { className: "w-6 h-6 stroke-login ml-1 text-2xl transition-transform duration-300 ease-in-out" })]
			}), /* @__PURE__ */ jsx("div", {
				className: `absolute pt-2 -ml-4 transition-all duration-200 ease-in-out z-10 ${isDesktopOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}`,
				children: /* @__PURE__ */ jsx("ul", {
					className: `p-3 px-6 pb-4 rounded-[0.4rem] shadow-[0_0.1rem_0.5rem_rgba(3,3,3,0.5)] bg-login-700/98 ${className || ""}`,
					onClick: () => setIsDesktopOpen(false),
					children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
						onClick: () => setIsDesktopOpen(false),
						className: "group dropdown",
						children: child
					}, index))
				})
			})]
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "block 800px:hidden!",
		children: [/* @__PURE__ */ jsx("button", {
			className: "bg-none border-none cursor-pointer w-full text-left",
			onClick: (e) => {
				e.stopPropagation();
				setIsMobileDropdownOpen(!isMobileDropdownOpen);
			},
			children: /* @__PURE__ */ jsxs("li", {
				className: `list-none no-underline text-2xl leading-6 overflow-hidden
                        w-full pl-4 pr-4 rounded-[0.3rem] transition-all duration-600
                        flex items-center gap-2 opacity-100 min-h-16 py-5 `,
				children: [/* @__PURE__ */ jsx("span", { children: title }), /* @__PURE__ */ jsx(ChevronDown, { className: `w-6 h-6 transition-transform duration-400 shrink-0 
                            ${isMobileDropdownOpen ? "rotate-180" : ""}` })]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: `list-none no-underline text-xl px-6 ${isMobileDropdownOpen ? "pb-4" : ""}`,
			children: React.Children.map(children, (child, index) => /* @__PURE__ */ jsx("div", {
				className: `leading-6 transition-all duration-500 group dropdown
                            ${isMobileDropdownOpen ? "h-11 opacity-100" : "h-0 opacity-0"}
                        `,
				children: child
			}, index))
		})]
	})] });
}
//#endregion
//#region src/components/version/version.tsx
function VersionTag({ version, url, className }) {
	if (!version) return;
	const style = `w-fit bg-login-700 text-login-100 border border-login-500/40 text-xs font-mono px-2 py-0.5 rounded ${className || ""}`;
	if (url) return /* @__PURE__ */ jsxs(Link, {
		className: style,
		target: "_blank",
		href: url,
		children: ["v", version]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: style,
		children: ["v", version]
	});
}
//#endregion
//#region src/components/footer/footer.tsx
function t(s, lang) {
	return typeof s === "string" ? s : s[lang];
}
function Footer({ logo, sponsor, columns, socialLinks, copyright, version, lang = "no", className }) {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const hasRight = columns && columns.length > 0 || socialLinks && socialLinks.length > 0;
	return /* @__PURE__ */ jsx("div", {
		className: `mt-24 bg-login-950 md:mt-40 ${className || ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `
                mx-auto w-full px-4 pt-16 pb-24 md:max-w-304 md:px-12 md:pt-20 md:pb-4
                ${hasRight ? "md:grid md:grid-cols-[18rem_1fr] md:gap-x-12" : ""}
            `,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid w-full max-w-60 gap-16 md:row-span-2 md:max-w-72 md:gap-20",
					children: [/* @__PURE__ */ jsx("div", {
						className: "block w-full",
						children: logo
					}), sponsor && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "block w-full",
						children: sponsor.node
					}), sponsor.label && /* @__PURE__ */ jsx("p", {
						className: "pt-8 text-center text-login-100",
						children: t(sponsor.label, lang)
					})] })]
				}),
				columns && columns.length > 0 && /* @__PURE__ */ jsx("div", {
					className: `
                        mt-12 grid w-full max-w-60 gap-8
                        sm:max-w-88 sm:justify-items-end sm:justify-self-end
                        md:col-start-2 md:row-start-1 md:mt-0 md:max-w-136 md:gap-0 md:justify-self-end
                        ${columns.length > 1 ? "sm:grid-cols-2" : ""}
                    `,
					children: columns.map((col, i) => /* @__PURE__ */ jsxs("div", {
						className: "sm:justify-self-center md:justify-self-end",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "pb-2 text-sm font-medium tracking-widest text-login-100",
							children: t(col.heading, lang)
						}), col.items.map((item, j) => item.href ? /* @__PURE__ */ jsx("a", {
							className: "link--underscore-hover block",
							href: item.href,
							children: t(item.label, lang)
						}, j) : /* @__PURE__ */ jsx("p", { children: t(item.label, lang) }, j))]
					}, i))
				}),
				socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsx("div", {
					className: "md:col-start-2 md:row-start-2 md:justify-self-end",
					children: /* @__PURE__ */ jsx("div", {
						className: "mx-auto mt-20 mb-12 flex w-fit flex-wrap justify-center gap-6",
						children: socialLinks.map((link, i) => /* @__PURE__ */ jsx("a", {
							className: `block size-8 text-login-100 transition-all duration-200 group
                                        ${link.hoverClass ?? "hover:text-login-50"}`,
							title: link.title,
							href: link.href,
							target: "_blank",
							rel: "noreferrer",
							children: link.icon
						}, i))
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-16 flex flex-col items-start gap-4 md:col-span-2 md:row-start-3 md:mt-24 md:grid\n                    md:grid-cols-[auto_min-content] md:items-end md:gap-8",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs wrap-break-word text-login-100",
						children: [
							"Copyright © ",
							year,
							" ",
							t(copyright, lang)
						]
					}), version && /* @__PURE__ */ jsx(VersionTag, {
						version: version.tag,
						url: version.href
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/footer/loginContent.tsx
const INSTAGRAM_PATH = "M512 960Q408 960 375.0 959.5Q342 959 301 957Q260 955 230.5 949.0Q201 943 177 933Q151 923 129.0 909.0Q107 895 86 874Q65 853 51.0 831.0Q37 809 27 783Q17 759 11.0 729.5Q5 700 3 659Q1 618 0.5 585.0Q0 552 0 448Q0 344 0.5 311.0Q1 278 3 237Q5 196 11.0 166.5Q17 137 27 113Q37 87 51.0 65.0Q65 43 86 22Q107 1 129.0 -13.0Q151 -27 177 -37Q201 -47 230.5 -53.0Q260 -59 301 -61Q342 -63 375.0 -63.5Q408 -64 512 -64Q616 -64 649.0 -63.5Q682 -63 723 -61Q764 -59 793.5 -53.0Q823 -47 847 -37Q873 -27 895.0 -13.0Q917 1 938 22Q959 43 973.0 65.0Q987 87 997 113Q1007 137 1013.0 166.5Q1019 196 1021 237Q1023 278 1023.5 311.0Q1024 344 1024 448Q1024 552 1023.5 585.0Q1023 618 1021 659Q1019 700 1013.0 729.5Q1007 759 997 783Q987 809 973.0 831.0Q959 853 938 874Q917 895 895.0 909.0Q873 923 847 933Q823 943 793.5 949.0Q764 955 723 957Q682 959 649.0 959.5Q616 960 512 960ZM512 868Q614 868 646.0 867.5Q678 867 719 865Q756 863 778.0 857.5Q800 852 814 847Q832 840 845.5 831.0Q859 822 873 809Q886 795 895.0 781.5Q904 768 911 750Q916 736 921.5 714.0Q927 692 929 655Q931 614 931.5 582.5Q932 551 932 448Q932 345 931.0 313.5Q930 282 929 241Q927 204 921.5 182.0Q916 160 911 146Q903 128 894.5 114.5Q886 101 872 87Q859 74 845.0 65.0Q831 56 813 49Q800 44 777.5 38.5Q755 33 718 31Q677 29 645.0 28.5Q613 28 511 28Q408 28 376.0 29.0Q344 30 303 31Q266 33 243.5 38.5Q221 44 208 49Q190 57 176.5 65.5Q163 74 149 88Q136 101 126.5 115.0Q117 129 111 147Q105 160 100.0 182.5Q95 205 93 242Q91 282 90.5 314.0Q90 346 90 449Q90 551 90.5 583.0Q91 615 93 656Q95 693 100.0 715.5Q105 738 111 751Q117 770 126.5 783.5Q136 797 149 810Q163 824 176.5 833.0Q190 842 208 849Q221 854 243.0 859.5Q265 865 303 867Q344 868 375.5 868.5Q407 869 510 869ZM512 711Q458 711 410 690Q362 670 326.0 634.0Q290 598 270 550Q249 502 249 448Q249 394 270 346Q290 298 326.0 262.0Q362 226 410 206Q458 185 512 185Q566 185 614 206Q662 226 698.0 262.0Q734 298 754 346Q775 394 775 448Q775 502 754 550Q734 598 698.0 634.0Q662 670 614 690Q566 711 512 711ZM512 277Q441 277 391.0 327.0Q341 377 341 448Q341 519 391.0 569.0Q441 619 512 619Q583 619 633.0 569.0Q683 519 683 448Q683 377 633.0 327.0Q583 277 512 277ZM847 721Q847 696 829.0 678.0Q811 660 785 660Q760 660 742.0 678.0Q724 696 724 721Q724 747 742.0 765.0Q760 783 785 783Q811 783 829.0 765.0Q847 747 847 721Z";
function InstagramIcon({ size = 24 }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "relative block",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 1024 1024",
			width: size,
			height: size,
			"aria-hidden": "true",
			className: "absolute inset-0 transition-opacity duration-200 opacity-100 group-hover:opacity-0",
			children: /* @__PURE__ */ jsx("g", {
				transform: "translate(0 960) scale(1 -1)",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: INSTAGRAM_PATH
				})
			})
		}), /* @__PURE__ */ jsxs("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 1024 1024",
			width: size,
			height: size,
			"aria-hidden": "true",
			className: "absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100",
			children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
				id: "ig-grad",
				x1: "0%",
				y1: "100%",
				x2: "100%",
				y2: "0%",
				children: [
					/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "#fff695"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "45%",
						stopColor: "#ff5445"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "60%",
						stopColor: "#ff37c0"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "90%",
						stopColor: "#3d6dff"
					})
				]
			}) }), /* @__PURE__ */ jsx("g", {
				transform: "translate(0 960) scale(1 -1)",
				children: /* @__PURE__ */ jsx("path", {
					fill: "url(#ig-grad)",
					d: INSTAGRAM_PATH
				})
			})]
		})]
	});
}
const loginAddress = {
	heading: {
		no: "Adresse",
		en: "Address"
	},
	items: [
		{ label: "Teknologivegen 22" },
		{ label: {
			no: "Bygg A, rom 155",
			en: "Building A, room 155"
		} },
		{ label: "2815 GJØVIK" }
	]
};
const loginEmail = (email) => ({
	heading: {
		no: "E-post",
		en: "Email"
	},
	items: [{
		label: email,
		href: `mailto:${email}`
	}]
});
const loginCopyright = {
	no: "Login - Linjeforeningen for IT, NO 811 940 372",
	en: "Login - Association for IT, NO 811 940 372"
};
const loginSponsor = { label: {
	no: "Hovedsamarbeidspartner",
	en: "Main partner"
} };
const loginSocialLinks = [
	{
		title: "Discord",
		href: "https://discord.gg/login-ntnu",
		icon: /* @__PURE__ */ jsx(Discord, { size: 24 }),
		hoverClass: "hover:text-[#6571fd]"
	},
	{
		title: "Instagram",
		href: "https://www.instagram.com/login_linjeforening/",
		icon: /* @__PURE__ */ jsx(InstagramIcon, { size: 24 })
	},
	{
		title: "Facebook",
		href: "https://facebook.com/LogNTNU",
		icon: /* @__PURE__ */ jsx(Facebook, { size: 24 }),
		hoverClass: "hover:text-[#2c87ff]"
	},
	{
		title: "LinkedIn",
		href: "https://www.linkedin.com/company/linjeforeningen-login/about",
		icon: /* @__PURE__ */ jsx(Linkedin, { size: 24 }),
		hoverClass: "hover:text-[#1a7bdd]"
	},
	{
		title: "GitHub",
		href: "https://github.com/login-linjeforeningen-for-it",
		icon: /* @__PURE__ */ jsx(Github, { size: 24 }),
		hoverClass: "hover:text-white"
	},
	{
		title: "Wiki",
		href: "https://outline.login.no/s/doc",
		icon: /* @__PURE__ */ jsx(Wikijs, { size: 24 }),
		hoverClass: "hover:text-login-50"
	}
];
//#endregion
//#region src/components/container/page.tsx
function PageContainer({ title, children, className, innerClassName }) {
	return /* @__PURE__ */ jsx("div", {
		className: `w-full page-container ${className}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `flex flex-col col-start-3 ${innerClassName}`,
			children: [/* @__PURE__ */ jsx("h1", {
				className: "heading",
				children: title
			}), children]
		})
	});
}
//#endregion
//#region src/components/container/highlight.tsx
function Highlight({ children, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: `highlighted-section ${className ?? ""}`,
		children
	});
}
//#endregion
//#region src/components/container/leftBarPanel.tsx
function LeftBarPanel({ color, children, className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: `bg-login-500/50 border border-login-500/30 border-l-2 rounded-sm ${color} ${className}`,
		children
	});
}
//#endregion
//#region src/components/container/card.tsx
function Card({ children, className = "" }) {
	return /* @__PURE__ */ jsx("section", {
		className: `rounded-xl border border-login-500/30 bg-login-500/50 ${className}`,
		children
	});
}
//#endregion
//#region src/components/container/iconBubble.tsx
const tones = {
	amber: "bg-amber-500/10 text-amber-400",
	blue: "bg-sky-500/10 text-sky-400",
	emerald: "bg-emerald-500/10 text-emerald-400",
	rose: "bg-rose-500/10 text-rose-400",
	slate: "bg-login-600 text-login-100",
	violet: "bg-violet-500/10 text-violet-400",
	orange: "bg-login/10 text-login"
};
function IconBubble({ icon: Icon, tone = "slate", size = "md" }) {
	const sizeClass = size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
	const iconSize = size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
	return /* @__PURE__ */ jsx("div", {
		className: `flex shrink-0 items-center justify-center rounded-lg ${sizeClass} ${tones[tone]}`,
		children: /* @__PURE__ */ jsx(Icon, { className: iconSize })
	});
}
//#endregion
//#region src/components/container/statCard.tsx
function StatCard({ label, value, icon, tone = "slate" }) {
	return /* @__PURE__ */ jsxs(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center gap-3",
			children: [/* @__PURE__ */ jsx(IconBubble, {
				icon,
				tone
			}), /* @__PURE__ */ jsx("span", {
				className: "text-sm font-medium text-login-200",
				children: label
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "truncate text-lg font-semibold text-login-50",
			title: value,
			children: value
		})]
	});
}
//#endregion
//#region src/components/container/tabs.tsx
function Tabs({ tabs, defaultTab, activeTab: controlledTab, onTabChange, children, className = "" }) {
	const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
	const activeTab = controlledTab ?? internalTab;
	function handleTabChange(id) {
		if (!controlledTab) setInternalTab(id);
		onTabChange?.(id);
	}
	return /* @__PURE__ */ jsxs("div", {
		className,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex gap-1 rounded-md bg-login-500/50 border border-login-500/40 p-1 w-fit",
			children: tabs.map((tab) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => handleTabChange(tab.id),
				className: `
                            px-3 py-1.5 rounded text-sm font-medium transition-all duration-150 cursor-pointer select-none
                            ${activeTab === tab.id ? "bg-login text-white shadow-sm" : "text-login-200 hover:text-login-50 hover:bg-login-600"}
                        `,
				children: tab.label
			}, tab.id))
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children
		})]
	});
}
function TabPanel({ id, activeTab, children }) {
	if (activeTab !== id) return null;
	return /* @__PURE__ */ jsx("div", { children });
}
//#endregion
//#region src/components/container/accordion.tsx
const GroupContext = createContext(false);
function AccordionGroup({ children, className = "" }) {
	return /* @__PURE__ */ jsx(GroupContext.Provider, {
		value: true,
		children: /* @__PURE__ */ jsx("div", {
			className: `rounded-lg border border-login-500/40 overflow-hidden divide-y divide-login-500/25 ${className}`,
			children
		})
	});
}
function Accordion({ title, children, defaultOpen = false, className = "" }) {
	const [open, setOpen] = useState(defaultOpen);
	return /* @__PURE__ */ jsxs("div", {
		className: useContext(GroupContext) ? className : `rounded-lg border border-login-500/40 overflow-hidden ${className}`,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			className: "flex w-full cursor-pointer items-center justify-between bg-login-800 px-4 py-3 text-left transition-colors duration-150 hover:bg-login-700 select-none",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-sm font-medium text-login-50",
				children: title
			}), /* @__PURE__ */ jsx(ChevronDown, {
				size: 16,
				className: `shrink-0 text-login-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: `overflow-hidden bg-login-900 transition-all duration-200 ${open ? "max-h-[9999px]" : "max-h-0"}`,
			children: /* @__PURE__ */ jsx("div", {
				className: "px-4 py-3 text-sm text-login-100",
				children
			})
		})]
	});
}
//#endregion
//#region src/components/container/pulseDot.tsx
const variantColor = {
	online: "bg-green-500",
	offline: "bg-red-500",
	warning: "bg-login",
	unknown: "bg-login-400"
};
const sizeClass = {
	sm: "w-1.5 h-1.5",
	md: "w-2 h-2",
	lg: "w-3 h-3"
};
function PulseDot({ variant = "online", size = "md" }) {
	const color = variantColor[variant];
	const dotSize = sizeClass[size];
	return /* @__PURE__ */ jsxs("div", {
		className: `relative grid place-items-center ${dotSize}`,
		children: [/* @__PURE__ */ jsx("span", { className: `absolute inline-flex h-full w-full rounded-full ${color} opacity-50 animate-ping` }), /* @__PURE__ */ jsx("span", { className: `relative inline-flex rounded-full ${dotSize} ${color}` })]
	});
}
//#endregion
//#region src/components/login/loginPage.tsx
function LoginPage({ title, description, redirectPath, version, btg, handleSubmit, guestRedirectPath, guestText }) {
	return /* @__PURE__ */ jsx("main", {
		className: "w-full h-full flex items-center justify-center bg-login-800 p-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col justify-center items-center bg-login-600 px-4 py-12 rounded-xl w-full max-w-md gap-4 md:gap-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "relative aspect-3/1 w-full",
					children: /* @__PURE__ */ jsx(Logo, { className: "object-contain px-6 sm:px-12" })
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "text-3xl font-extrabold text-login text-center tracking-tight",
					children: [
						title,
						" ",
						btg ? " - Break the Glass" : ""
					]
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "text-center font-medium text-lg mb-2 max-w-xs",
					children: description
				}),
				btg ? /* @__PURE__ */ jsxs("form", {
					className: "w-full flex flex-col gap-3 max-w-xs",
					onSubmit: (e) => {
						e.preventDefault();
						handleSubmit?.(new FormData(e.currentTarget));
						e.currentTarget.reset();
					},
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "text",
							name: "name",
							placeholder: "Name",
							className: "py-2 px-3 rounded bg-login-900 font-medium focus:outline-none",
							required: true
						}),
						/* @__PURE__ */ jsx("input", {
							type: "password",
							name: "token",
							placeholder: "Token",
							className: "py-2 px-3 rounded bg-login-900 font-medium focus:outline-none",
							required: true
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "py-2 px-4 rounded-xl bg-login font-bold text-lg hover:bg-login/80 transition-all duration-200 mt-2",
							children: "Login"
						})
					]
				}) : /* @__PURE__ */ jsxs(Link, {
					href: redirectPath,
					className: `
                            flex items-center justify-center gap-2 w-full
                            max-w-xs py-3 px-6 rounded-xl bg-login font-bold
                            text-lg hover:bg-login/80 transition-all
                            duration-200 mb-2 mt-2 cursor-pointer
                        `,
					children: ["Login", /* @__PURE__ */ jsx(LogIn, { className: "w-6 h-6" })]
				}),
				guestRedirectPath && /* @__PURE__ */ jsx(Link, {
					href: guestRedirectPath,
					className: "text-sm font-semibold cursor-pointer opacity-50",
					children: guestText || "Continue as guest"
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "text-sm mt-2",
					children: ["v", version]
				})
			]
		})
	});
}
//#endregion
//#region src/components/toast/toastItem.tsx
function ToastItem({ toast, index, expanded, onRemove, onHeight, offset, frontHeight }) {
	const [mounted, setMounted] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		requestAnimationFrame(() => setMounted(true));
	}, []);
	useLayoutEffect(() => {
		if (ref.current) onHeight(toast.id, ref.current.offsetHeight);
	}, [
		toast.message,
		onHeight,
		toast.id,
		expanded
	]);
	const isVisible = mounted && !toast.exiting;
	const isFront = index === 0;
	const collapsedOffset = index * 10 + (index > 0 ? frontHeight - 60 : 0);
	return /* @__PURE__ */ jsx("li", {
		ref,
		className: "absolute bottom-0 right-0 w-full transition-all duration-300 ease-out pointer-events-auto",
		style: {
			transform: isVisible ? `translateY(${expanded ? -offset : -collapsedOffset}px) scale(${expanded ? 1 : 1 - index * .05})` : "translateY(20px) scale(0.9)",
			opacity: isVisible ? 1 : 0,
			zIndex: toast.id
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center space-x-4 rounded-lg p-4 shadow-lg border-2 border-login-400 bg-login-700",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "shrink-0",
					children: Icon(toast.type)
				}),
				/* @__PURE__ */ jsx("p", {
					className: `flex-1 text-sm font-semibold text-login-800 dark:text-login-100 min-w-0
                        ${!expanded && !isFront ? "truncate" : ""}`,
					children: toast.message
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: onRemove,
					className: "hover:text-login-200 text-login-400",
					children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
				})
			]
		})
	});
}
function Icon(type) {
	switch (type) {
		case "info": return /* @__PURE__ */ jsx(Info, { className: "h-6 w-6 text-blue-500" });
		case "success": return /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6 text-green-500" });
		case "warning": return /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-500" });
		case "error": return /* @__PURE__ */ jsx(AlertCircle, { className: "h-6 w-6 text-red-500" });
	}
}
//#endregion
//#region src/components/toast/toaster.tsx
const listeners = /* @__PURE__ */ new Set();
let idCounter = 0;
function toast(message, type, duration = 4e3) {
	const id = ++idCounter;
	listeners.forEach((listener) => listener({
		id,
		message,
		type,
		expiresAt: Date.now() + duration
	}));
}
toast.info = (message, duration) => toast(message, "info", duration);
toast.success = (message, duration) => toast(message, "success", duration);
toast.warning = (message, duration) => toast(message, "warning", duration);
toast.error = (message, duration) => toast(message, "error", duration);
function Toaster() {
	const [toasts, setToasts] = useState([]);
	const [expanded, setExpanded] = useState(false);
	const [heights, setHeights] = useState({});
	useEffect(() => {
		function addToast(toast) {
			setToasts((prev) => [toast, ...prev]);
		}
		listeners.add(addToast);
		return () => {
			listeners.delete(addToast);
		};
	}, []);
	useEffect(() => {
		const now = Date.now();
		setToasts((prev) => prev.map((toast) => {
			if (expanded) return {
				...toast,
				pausedAt: toast.pausedAt || now
			};
			if (!toast.pausedAt) return toast;
			return {
				...toast,
				expiresAt: toast.expiresAt + (now - toast.pausedAt),
				pausedAt: void 0
			};
		}));
	}, [expanded]);
	function removeToast(id) {
		setToasts((prev) => prev.map((toast) => toast.id === id ? {
			...toast,
			exiting: true
		} : toast));
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 300);
	}
	useEffect(() => {
		const timer = setInterval(() => {
			if (expanded) return;
			const now = Date.now();
			setToasts((prev) => {
				const toastsToExit = prev.filter((toast) => !toast.exiting && !toast.pausedAt && toast.expiresAt <= now);
				if (toastsToExit.length === 0) return prev;
				toastsToExit.forEach((toast) => {
					setTimeout(() => {
						setToasts((current) => current.filter((item) => item.id !== toast.id));
					}, 300);
				});
				return prev.map((toast) => toastsToExit.find((exitToast) => exitToast.id === toast.id) ? {
					...toast,
					exiting: true
				} : toast);
			});
		}, 100);
		return () => clearInterval(timer);
	}, [expanded]);
	function onHeight(id, height) {
		setHeights((prev) => {
			if (prev[id] === height) return prev;
			return {
				...prev,
				[id]: height
			};
		});
	}
	const visibleToasts = toasts.slice(0, expanded ? 10 : 3);
	const frontHeight = heights[visibleToasts[0]?.id] || 60;
	const offsets = useMemo(() => {
		let currentOffset = 0;
		return visibleToasts.map((toast) => {
			const height = heights[toast.id] || 60;
			const offset = currentOffset;
			currentOffset += height + 16;
			return offset;
		});
	}, [visibleToasts, heights]);
	const totalHeight = offsets.length > 0 ? offsets[offsets.length - 1] + (heights[visibleToasts[visibleToasts.length - 1]?.id] || 60) : 0;
	return /* @__PURE__ */ jsx("ul", {
		className: `fixed bottom-4 right-4 z-9999 w-full max-w-sm flex flex-col items-end transition-all duration-300 ease-out
                ${expanded ? "pointer-events-auto" : "pointer-events-none"}`,
		style: { height: expanded ? totalHeight + "px" : "auto" },
		onMouseEnter: () => setExpanded(true),
		onMouseLeave: () => setExpanded(false),
		children: visibleToasts.map((toast, index) => /* @__PURE__ */ jsx(ToastItem, {
			toast,
			index,
			expanded,
			onRemove: () => removeToast(toast.id),
			onHeight,
			offset: offsets[index],
			frontHeight
		}, toast.id))
	});
}
//#endregion
//#region src/components/buttons/button.tsx
const variants = {
	primary: "bg-login text-white hover:brightness-110",
	secondary: "bg-login-500 text-login-50 hover:bg-login-400",
	warning: "bg-yellow-500 text-black hover:brightness-110",
	danger: "bg-red-600 text-white hover:brightness-110",
	success: "bg-green-600 text-white hover:brightness-110",
	info: "bg-blue-600 text-white hover:brightness-110"
};
const base = "cursor-pointer rounded-md h-9 flex items-center justify-center gap-2 select-none text-sm font-medium transition-all duration-150";
const withText = "px-4 w-fit";
const iconOnly = "w-9";
const disabledCls = "opacity-40 cursor-not-allowed pointer-events-none";
const iconWrap = (icon) => icon ? /* @__PURE__ */ jsx("span", {
	className: "[&>svg]:w-4 [&>svg]:h-4 flex items-center",
	children: icon
}) : null;
function Button({ text, className, icon, path, variant = "primary", type, onClick, disabled }) {
	const color = variants[variant];
	const sizing = icon && !text ? iconOnly : withText;
	const cls = `${base} ${sizing} ${color} ${disabled ? disabledCls : ""} ${className || ""}`;
	if (!path) return /* @__PURE__ */ jsxs("button", {
		type: type || "button",
		disabled,
		onClick,
		"aria-label": text,
		className: cls,
		children: [iconWrap(icon), text]
	});
	if (disabled) return /* @__PURE__ */ jsxs("div", {
		className: cls,
		children: [iconWrap(icon), text]
	});
	return /* @__PURE__ */ jsxs(Link, {
		href: path,
		className: `${base} ${sizing} ${color} ${className || ""}`,
		children: [iconWrap(icon), text]
	});
}
//#endregion
//#region src/components/alert/alert.tsx
const styles = {
	warning: {
		color: "border-l-red-500",
		iconClass: "w-4 h-4 shrink-0 stroke-red-400 mr-3 mt-0.5",
		Icon: CircleAlert
	},
	info: {
		color: "border-l-blue-500",
		iconClass: "w-4 h-4 shrink-0 stroke-blue-400 mr-3 mt-0.5",
		Icon: Info
	}
};
function Alert({ children, variant = "warning", className = "" }) {
	const { color, iconClass, Icon } = styles[variant] ?? styles.warning;
	return /* @__PURE__ */ jsxs(LeftBarPanel, {
		color,
		className: `flex items-start px-4 py-3 text-sm text-login-100 ${className}`,
		children: [/* @__PURE__ */ jsx(Icon, { className: iconClass }), /* @__PURE__ */ jsx("div", {
			className: "leading-relaxed",
			children
		})]
	});
}
//#endregion
//#region src/components/table/menu.tsx
const MenuContext = createContext({});
function Menu({ ref, children, anchor, onClose }) {
	return createPortal(/* @__PURE__ */ jsx("div", {
		ref,
		style: {
			top: anchor.top,
			right: anchor.right
		},
		className: "fixed bg-login-500 border border-login-600 rounded-lg shadow-lg z-9999 w-44",
		children: /* @__PURE__ */ jsx(MenuContext.Provider, {
			value: { onClose },
			children
		})
	}), document.body);
}
function MenuButton({ icon, text, hotKey, onClick, className }) {
	const { onClose } = useContext(MenuContext);
	useEffect(() => {
		if (!hotKey) return;
		function handleKeyDown(e) {
			if (e.key.toLowerCase() === hotKey.toLowerCase()) {
				e.preventDefault();
				onClick();
				onClose?.();
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		hotKey,
		onClick,
		onClose
	]);
	return /* @__PURE__ */ jsxs("button", {
		onClick: () => {
			onClick();
			onClose?.();
		},
		className: `flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-login-600 cursor-pointer
                ${className || ""}
            `,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center",
			children: [React.cloneElement(icon, { className: "w-4 h-4 mr-2" }), text]
		}), /* @__PURE__ */ jsx("span", {
			className: "text-xs opacity-50 font-mono",
			children: hotKey
		})]
	});
}
//#endregion
//#region src/components/table/format.ts
const nullableTimeKeys = [
	"date",
	"last_sent",
	"time"
];
const ISODateTimeReg = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
const ISODateReg = /^\d{4}-\d{2}-\d{2}$/;
const ISOTimeReg = /^\d{2}:\d{2}(:\d{2})?$/;
const OsloTZ = { timeZone: "Europe/Oslo" };
const OsloTime = {
	...OsloTZ,
	hour: "2-digit",
	minute: "2-digit"
};
const OsloDateTime = {
	...OsloTime,
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
};
function formatValue(key, value) {
	if (nullableTimeKeys.includes(key) && !value) return "Never";
	if (typeof value === "string") {
		if (ISODateTimeReg.test(value)) return new Date(value).toLocaleString("nb-NO", OsloDateTime);
		if (ISODateReg.test(value)) return new Date(value).toLocaleDateString("nb-NO", OsloTZ);
		if (ISOTimeReg.test(value)) return (/* @__PURE__ */ new Date(`1970-01-01T${value}`)).toLocaleTimeString("nb-NO", OsloTime);
	}
	if (key.includes("capacity")) return value === 0 ? "Unlimited" : value;
	return value;
}
//#endregion
//#region src/components/table/body.tsx
function Body({ list, columns, menuItems, redirectPath, variant = "default", idKey }) {
	const [openMenuId, setOpenMenuId] = useState(null);
	const [anchor, setAnchor] = useState(null);
	const router = useRouter();
	const menuRef = useRef(null);
	const tbodyRef = useRef(null);
	const menuWasOpenOnMouseDown = useRef(false);
	useClickOutside(menuRef, () => setOpenMenuId(null));
	useEffect(() => {
		const el = tbodyRef.current;
		if (!el) return;
		const close = () => setOpenMenuId(null);
		el.addEventListener("scroll", close);
		return () => el.removeEventListener("scroll", close);
	}, []);
	return /* @__PURE__ */ jsx("tbody", {
		ref: tbodyRef,
		className: `
                block overflow-y-auto flex-1 min-h-0 divide-y
                ${variant === "default" ? "bg-login-800 divide-login-600/25" : "bg-transparent divide-login-600/20"}
            `,
		children: list.map((item, index) => {
			const itemRecord = item;
			let id = "";
			if (idKey && itemRecord[idKey] !== void 0) id = String(itemRecord[idKey]);
			else if (itemRecord["id"] !== void 0) id = String(itemRecord["id"]);
			else {
				const firstKey = columns[0]?.key || Object.keys(itemRecord)[0];
				id = String(itemRecord[firstKey]);
			}
			const redirectConfig = typeof redirectPath === "object" && redirectPath ? redirectPath : { path: redirectPath };
			const redirectId = redirectConfig.key ? String(itemRecord[redirectConfig.key]) : id;
			const menuButtonColors = variant === "minimal" ? {
				active: "bg-login-600 text-login-100",
				inactive: "hover:bg-login-600 text-login-200 hover:text-login-100"
			} : {
				active: "bg-login-400 text-login-100",
				inactive: "hover:bg-login-400 text-login-200 hover:text-login-100"
			};
			const buttonClass = openMenuId === id ? menuButtonColors.active : menuButtonColors.inactive;
			return /* @__PURE__ */ jsxs("tr", {
				className: `
                            flex w-full group/row transition-colors 
                            ${redirectConfig.path ? "cursor-pointer" : ""}
                            ${variant === "default" && redirectConfig.path ? "hover:bg-login-600/80" : ""}
                            ${variant === "minimal" ? "hover:bg-login-600/70 border-b border-login-600/20 last:border-0" : ""}
                        `,
				onMouseDown: () => {
					menuWasOpenOnMouseDown.current = openMenuId !== null;
				},
				onClick: () => {
					if (menuWasOpenOnMouseDown.current) {
						menuWasOpenOnMouseDown.current = false;
						return;
					}
					if (redirectConfig.path) if (redirectConfig.path.includes("?")) router.push(`${redirectConfig.path}${redirectId}`);
					else router.push(`${redirectConfig.path}/${redirectId}`);
				},
				onContextMenu: (e) => {
					e.preventDefault();
					setAnchor({
						top: e.clientY,
						right: window.innerWidth - e.clientX
					});
					setOpenMenuId(id);
				},
				children: [columns.map((col) => {
					const value = itemRecord[col.key];
					let badgeClass = "";
					if (col.highlight) {
						const highlightKey = String(value);
						const colorName = col.highlight[highlightKey] || col.highlight.default;
						if (colorName) {
							switch (colorName) {
								case "green":
									badgeClass = "bg-green-500/20 text-green-400";
									break;
								case "yellow":
									badgeClass = "bg-yellow-500/20 text-yellow-400";
									break;
								case "red":
									badgeClass = "bg-red-500/20 text-red-400";
									break;
								case "blue":
									badgeClass = "bg-blue-500/20 text-blue-400";
									break;
								case "gray":
									badgeClass = "bg-gray-500/20 text-gray-400";
									break;
							}
							badgeClass += " px-2 py-1 rounded";
						}
					}
					return /* @__PURE__ */ jsx("td", {
						className: `
                                        flex-1 min-w-0 px-6 py-4 whitespace-nowrap text-sm flex items-center text-login-100
                                        ${variant === "minimal" ? "px-4! py-2!" : ""}
                                    `,
						children: /* @__PURE__ */ jsx("div", {
							className: "relative w-full min-w-0",
							children: /* @__PURE__ */ jsx("span", {
								className: `block max-w-full truncate ${badgeClass}`,
								children: formatValue(col.key, value)
							})
						})
					}, col.key);
				}), menuItems && /* @__PURE__ */ jsx("td", {
					className: "shrink-0 w-16 flex flex-row items-center justify-end p-2 px-4\n                                    whitespace-nowrap text-right text-sm font-medium",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: `p-1.5 rounded flex items-center justify-center transition-colors ${buttonClass}`,
							onMouseDown: (e) => e.nativeEvent.stopImmediatePropagation(),
							onClick: (e) => {
								e.stopPropagation();
								const rect = e.currentTarget.getBoundingClientRect();
								const coords = {
									top: rect.bottom + 4,
									right: window.innerWidth - rect.right
								};
								setAnchor(openMenuId === id ? null : coords);
								setOpenMenuId(openMenuId === id ? null : id);
							},
							children: /* @__PURE__ */ jsx("span", {
								className: "text-xl leading-none select-none",
								children: /* @__PURE__ */ jsx(EllipsisVertical, { className: "h-5 w-5" })
							})
						}), openMenuId === id && anchor && /* @__PURE__ */ jsx(Menu, {
							ref: menuRef,
							anchor,
							onClose: () => setOpenMenuId(null),
							children: menuItems?.(item, id)
						})]
					})
				})]
			}, index);
		})
	});
}
//#endregion
//#region src/components/table/header.tsx
function parseOrder(value) {
	return value === "asc" || value === "desc" ? value : void 0;
}
function Header({ columns, hideMenu, variant = "default" }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [column, setColumn] = useState(searchParams.get("column") ?? "");
	const [order, setOrder] = useState(parseOrder(searchParams.get("order")));
	useEffect(() => {
		if (!column || !order) return;
		const params = new URLSearchParams(searchParams.toString());
		if (searchParams.get("order") !== order || searchParams.get("column") !== column) {
			params.set("order", order);
			params.set("column", column);
			params.set("page", "1");
			router.push(`${pathname}?${params.toString()}`);
		}
	}, [
		order,
		column,
		pathname,
		router,
		searchParams
	]);
	function handleChange(key) {
		setColumn(key);
		setOrder((prev) => key === column && prev === "asc" ? "desc" : "asc");
	}
	return /* @__PURE__ */ jsx("thead", {
		className: `
            block w-full
            ${variant === "default" ? "bg-login-700" : "bg-transparent border-b border-login-600"}
        `,
		children: /* @__PURE__ */ jsxs("tr", {
			className: "flex w-full",
			children: [columns.map((col) => {
				const key = col.key;
				const value = col.label || (key.length < 3 ? key.toUpperCase() : `${key[0].toUpperCase()}${key.slice(1).replaceAll("_", " ")}`);
				return /* @__PURE__ */ jsx("th", {
					className: `
                                flex-1 min-w-0 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left
                                ${variant === "default" ? "text-login-200" : "text-login-100"}
                                ${variant === "minimal" ? "px-4!" : ""}
                            `,
					children: /* @__PURE__ */ jsxs("button", {
						className: "flex w-full min-w-0 flex-row items-center gap-2 group uppercase whitespace-nowrap",
						onClick: () => handleChange(key),
						children: [/* @__PURE__ */ jsx("span", {
							className: "min-w-0 truncate",
							children: value
						}), /* @__PURE__ */ jsx("span", {
							className: "flex flex-col",
							children: column === key ? order === "asc" ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4 stroke-login-200 opacity-0 group-hover:opacity-100" })
						})]
					})
				}, key);
			}), !hideMenu && /* @__PURE__ */ jsx("th", { className: "shrink-0 w-16 px-6 py-3" })]
		})
	});
}
//#endregion
//#region src/components/table/table.tsx
function Table({ data, columns, menuItems, redirectPath, variant = "default", idKey }) {
	if (data.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "p-4 text-center text-login-200",
		children: "No data found"
	});
	return /* @__PURE__ */ jsx("div", {
		className: `
            flex-1 flex flex-col min-h-0 overflow-x-auto overflow-y-hidden h-full w-full
            ${variant === "default" ? "bg-login-800 rounded-lg border border-login-600/30" : ""}
            ${variant === "minimal" ? "bg-transparent" : ""}
        `,
		children: /* @__PURE__ */ jsxs("table", {
			className: "min-w-full w-max divide-y divide-login-600/30 flex flex-col flex-1 min-h-0",
			children: [/* @__PURE__ */ jsx(Header, {
				columns,
				hideMenu: !menuItems,
				variant
			}), /* @__PURE__ */ jsx(Body, {
				list: data,
				columns,
				menuItems,
				redirectPath,
				variant,
				idKey
			})]
		})
	});
}
//#endregion
//#region src/components/table/pagination.tsx
function Pagination({ pageSize = 10, totalRows }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const rawPage = parseInt(searchParams.get("page") || "1", 10);
	const [current, setCurrent] = useState(Math.max(1, Number.isNaN(rawPage) ? 1 : rawPage));
	const totalPages = Math.max(1, Math.ceil(totalRows !== void 0 && pageSize > 0 ? totalRows / pageSize : 1));
	useEffect(() => {
		const raw = parseInt(searchParams.get("page") || "1", 10);
		setCurrent(Math.max(1, Math.min(totalPages, Math.max(1, Number.isNaN(raw) ? 1 : raw))));
	}, [searchParams, totalPages]);
	function updateQuery(p) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(p));
		router.push(`${pathname}?${params.toString()}`);
	}
	function goPrevious() {
		if (current <= 1) return;
		const next = current - 1;
		setCurrent(next);
		updateQuery(next);
	}
	function goNext() {
		if (current >= totalPages) return;
		const next = current + 1;
		setCurrent(next);
		updateQuery(next);
	}
	function setPage(p) {
		if (p === current) return;
		setCurrent(p);
		updateQuery(p);
	}
	function getPages(curr, total) {
		const delta = 2;
		const left = Math.max(1, curr - delta);
		const right = Math.min(total, curr + delta);
		const pages = [];
		if (left > 1) {
			pages.push(1);
			if (left > 2) pages.push("...");
		}
		for (let i = left; i <= right; i++) pages.push(i);
		if (right < total) {
			if (right < total - 1) pages.push("...");
			pages.push(total);
		}
		return pages;
	}
	const pages = getPages(current, totalPages);
	const start = Math.max(1, (current - 1) * pageSize + 1);
	const end = Math.min(current * pageSize, totalRows !== void 0 ? totalRows : current * pageSize);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between w-full pt-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-sm /70",
			children: totalRows !== void 0 ? totalRows === 0 ? /* @__PURE__ */ jsx("span", { children: "Showing 0 results" }) : /* @__PURE__ */ jsxs("span", { children: [
				"Showing ",
				start,
				" to ",
				end,
				" of ",
				totalRows,
				" results"
			] }) : null
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: goPrevious,
					disabled: current <= 1,
					className: `
                        flex items-center gap-2 p-1 rounded-lg
                        bg-login-700 hover:bg-login-600 disabled:opacity-40
                        border border-login-500/50 text-sm transition-colors duration-150
                    `,
					children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "flex items-center gap-1",
					"aria-label": "Pagination",
					children: pages.map((p, i) => typeof p === "string" ? /* @__PURE__ */ jsx("span", {
						className: "px-3 py-1 text-sm",
						children: p
					}, `e-${i}`) : /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setPage(p),
						"aria-current": p === current ? "page" : void 0,
						className: `
                                    px-3 py-1 rounded-lg text-sm border transition-colors duration-150
                                    ${p === current ? "bg-login text-white border-login" : "bg-login-700 border-login-500/50 hover:bg-login-600"}
                                `,
						children: p
					}, p))
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: goNext,
					disabled: current >= totalPages,
					className: `
                        flex items-center gap-2 p-1 rounded-lg select-none
                        bg-login-700 hover:bg-login-600 disabled:opacity-40
                        border border-login-500/50 text-sm transition-colors duration-150
                    `,
					children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" })
				})
			]
		})]
	});
}
//#endregion
//#region src/components/confirm/confirmPopup.tsx
function ConfirmPopup({ isOpen, header, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, variant = "default" }) {
	if (!isOpen) return null;
	return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "confirm-popup-header",
		className: "fixed inset-0 z-50 flex items-center justify-center",
		onClick: onCancel,
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm" }), /* @__PURE__ */ jsxs("div", {
			className: "\n                    relative z-10 w-full max-w-md mx-4\n                    bg-login-800 border border-login-500/50 rounded-xl\n                    shadow-2xl p-6 flex flex-col gap-4\n                ",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-3",
					children: [variant !== "default" && /* @__PURE__ */ jsx(TriangleAlert, { className: `w-5 h-5 shrink-0 mt-0.5 ${variant === "danger" ? "stroke-red-400" : "stroke-yellow-400"}` }), /* @__PURE__ */ jsx("h2", {
						id: "confirm-popup-header",
						className: "text-login-50 text-base font-semibold leading-snug",
						children: header
					})]
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "text-login-200 text-sm leading-relaxed",
					children: description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 mt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onCancel,
						className: "\n                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium\n                            bg-login-600 hover:bg-login-500 text-login-100\n                            transition-colors duration-150 select-none\n                        ",
						children: cancelText
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onConfirm,
						className: `
                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium
                            transition-all duration-150 select-none
                            ${variant === "danger" ? "bg-red-600 hover:brightness-110 text-white" : variant === "warning" ? "bg-yellow-500 hover:brightness-110 text-black" : "bg-login hover:brightness-110 text-white"}
                        `,
						children: confirmText
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/vulnerability/constants.ts
const severityLabel = {
	critical: "Critical",
	high: "High",
	medium: "Medium",
	low: "Low",
	unknown: "Unknown"
};
const severityClasses = {
	critical: "border-l-red-500",
	high: "border-l-orange-500",
	medium: "border-l-amber-500",
	low: "border-l-green-500",
	unknown: "border-l-login-400"
};
//#endregion
//#region src/components/vulnerability/severityPill.tsx
function SeverityPill({ severity, count, compact = false }) {
	if (count === 0) return null;
	return /* @__PURE__ */ jsxs(LeftBarPanel, {
		color: severityClasses[severity],
		className: `flex items-center gap-2.5 ${compact ? "px-2.5 py-1.5" : "px-3 py-2"}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: `${compact ? "text-sm" : "text-base"} font-bold text-login-50`,
			children: count
		}), /* @__PURE__ */ jsx("span", {
			className: "text-[10px] font-semibold uppercase tracking-[0.15em] text-login-300",
			children: severityLabel[severity]
		})]
	});
}
//#endregion
//#region src/components/inputs/toggle.tsx
function Toggle({ value, onChange, left, right }) {
	const active = "bg-login text-white shadow-sm";
	const idle = "text-login-200 hover:text-login-50 hover:bg-login-500/50";
	const base = "flex items-center justify-center rounded-md px-3 h-7 transition-all duration-150 gap-1.5 text-sm";
	function renderContent(opt) {
		return /* @__PURE__ */ jsxs(Fragment, { children: [opt.icon, opt.text && /* @__PURE__ */ jsx("span", { children: opt.text })] });
	}
	const isLeftActive = value === left.value;
	const isRightActive = value === right.value;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center w-fit bg-login-500/50 border border-login-500 rounded-lg p-1 gap-0.5",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(left.value),
			"aria-label": left.label ?? left.text,
			"aria-pressed": isLeftActive,
			className: `${base} ${isLeftActive ? active : idle}`,
			children: renderContent(left)
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(right.value),
			"aria-label": right.label ?? right.text,
			"aria-pressed": isRightActive,
			className: `${base} ${isRightActive ? active : idle}`,
			children: renderContent(right)
		})]
	});
}
//#endregion
export { Accordion, AccordionGroup, Alert, Button, Card, Checkbox, ConfirmPopup, Footer, Highlight, IconBubble, Input, LanguageToggle, LeftBarPanel, LoginPage, Logo, LogoSmall, MarkdownRender, MenuButton, MultiSelect, NavDropdown, NavItem, Navbar, PageContainer, Pagination, PulseDot, Radio, Range, SearchInput, Select, SeverityPill, StatCard, Switch, TabPanel, Table, Tabs, TagInput, Textarea, ThemeToggle, Toaster, Toggle, VersionTag, loginAddress, loginCopyright, loginEmail, loginSocialLinks, loginSponsor, toast };

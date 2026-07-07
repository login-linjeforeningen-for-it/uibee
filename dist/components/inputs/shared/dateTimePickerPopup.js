"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
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
export { DateTimePickerPopup as default };

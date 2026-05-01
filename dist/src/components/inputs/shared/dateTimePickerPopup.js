import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
export default function DateTimePickerPopup({ value, onChange, type, onClose, anchorName, }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [timeInput, setTimeInput] = useState({
        hours: value ? value.getHours().toString() : '0',
        minutes: value ? value.getMinutes().toString() : '0',
    });
    useEffect(() => {
        if (value) {
            setCurrentDate(value);
            setTimeInput(prev => ({
                hours: prev.hours === '' && value.getHours() === 0 ? '' : value.getHours().toString(),
                minutes: prev.minutes === '' && value.getMinutes() === 0 ? '' : value.getMinutes().toString(),
            }));
        }
    }, [value]);
    function handleDateSelect(day) {
        const newDate = new Date(currentDate);
        newDate.setDate(day);
        if (value) {
            newDate.setHours(value.getHours());
            newDate.setMinutes(value.getMinutes());
        }
        else {
            newDate.setHours(0, 0, 0, 0);
        }
        onChange(newDate);
        if (type === 'date' && onClose) {
            onClose();
        }
    }
    function handleTimeChange(timeUnit, val) {
        const newDate = value ? new Date(value) : new Date();
        if (!value) {
            newDate.setHours(0, 0, 0, 0);
        }
        if (timeUnit === 'hours') {
            if (val < 0 || val > 23)
                return;
            newDate.setHours(val);
        }
        if (timeUnit === 'minutes') {
            if (val < 0 || val > 59)
                return;
            newDate.setMinutes(val);
        }
        onChange(newDate);
    }
    function onTimeInputChange(unit, val) {
        if (val === '') {
            setTimeInput(prev => ({ ...prev, [unit]: '' }));
            handleTimeChange(unit, 0);
            return;
        }
        if (!/^\d+$/.test(val))
            return;
        const num = parseInt(val);
        if (unit === 'hours' && num > 23)
            return;
        if (unit === 'minutes' && num > 59)
            return;
        setTimeInput(prev => ({ ...prev, [unit]: val }));
        handleTimeChange(unit, num);
    }
    function onTimeInputBlur(unit) {
        if (timeInput[unit] === '') {
            const num = unit === 'hours' ? (value?.getHours() ?? 0) : (value?.getMinutes() ?? 0);
            setTimeInput(prev => ({ ...prev, [unit]: num.toString() }));
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
        for (let i = 0; i < adjustedFirstDay; i++) {
            days.push(_jsx("div", { className: 'w-8 h-8' }, `empty-${i}`));
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const isSelected = value &&
                value.getDate() === i &&
                value.getMonth() === month &&
                value.getFullYear() === year;
            const isToday = new Date().getDate() === i &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;
            days.push(_jsx("button", { type: 'button', onClick: () => handleDateSelect(i), className: `
                        w-8 h-8 flex items-center justify-center rounded-full text-sm
                        hover:bg-login-500 transition-colors
                        ${isSelected ? 'bg-login! text-white! hover:bg-login!' : ''}
                        ${!isSelected && isToday ? 'text-login! font-bold' : ''}
                        ${!isSelected && !isToday ? 'text-login-text!' : ''}
                    `, children: i }, i));
        }
        return (_jsxs("div", { className: 'p-2', children: [_jsxs("div", { className: 'flex items-center justify-between mb-2', children: [_jsx("button", { type: 'button', onClick: () => setCurrentDate(new Date(year, month - 1)), className: 'p-1 hover:bg-login-500 rounded-full text-login-text', children: _jsx(ChevronLeft, { className: 'w-4 h-4' }) }), _jsxs("span", { className: 'font-medium text-login-text', children: [MONTHS[month], " ", year] }), _jsx("button", { type: 'button', onClick: () => setCurrentDate(new Date(year, month + 1)), className: 'p-1 hover:bg-login-500 rounded-full text-login-text', children: _jsx(ChevronRight, { className: 'w-4 h-4' }) })] }), _jsx("div", { className: 'grid grid-cols-7 gap-1 mb-1', children: DAYS.map(d => (_jsx("div", { className: 'w-8 text-center text-xs text-login-200 font-medium', children: d }, d))) }), _jsx("div", { className: 'grid grid-cols-7 gap-1', children: days })] }));
    }
    function renderTimePicker() {
        return (_jsxs("div", { className: 'p-2 border-t border-login-500 flex justify-center gap-2', children: [_jsxs("div", { className: 'flex flex-col items-center', children: [_jsx("label", { className: 'text-xs text-login-200 mb-1', children: "Hour" }), _jsx("input", { type: 'text', inputMode: 'numeric', value: timeInput.hours, onChange: (e) => onTimeInputChange('hours', e.target.value), onBlur: () => onTimeInputBlur('hours'), className: `
                            w-16 p-1 bg-login-500 rounded text-center text-login-text 
                            border border-login-500 focus:border-login outline-none
                        ` })] }), _jsx("div", { className: 'flex items-end pb-2 text-login-text', children: ":" }), _jsxs("div", { className: 'flex flex-col items-center', children: [_jsx("label", { className: 'text-xs text-login-200 mb-1', children: "Minute" }), _jsx("input", { type: 'text', inputMode: 'numeric', value: timeInput.minutes, onChange: (e) => onTimeInputChange('minutes', e.target.value), onBlur: () => onTimeInputBlur('minutes'), className: `
                            w-16 p-1 bg-login-500 rounded text-center text-login-text 
                            border border-login-500 focus:border-login outline-none
                        ` })] })] }));
    }
    return (_jsxs("div", { className: 'fixed z-50 bg-login-600 border border-login-500 rounded-md shadow-lg p-1 min-w-70 anchor-popup', style: {
            positionAnchor: anchorName,
            positionArea: 'bottom span-right',
            insetArea: 'bottom span-right',
            positionTryFallbacks: 'flip-block',
            margin: '0.25rem 0',
        }, children: [type !== 'time' && renderCalendar(), (type === 'time' || type === 'datetime-local') && renderTimePicker()] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
function hexToHsv(hex) {
    hex = hex.replace('#', '');
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    }
    else if (hex.length === 6) {
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
    return { h: h * 360, s: s * 100, v: v * 100 };
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
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function hsvToHex(h, s, v) {
    const { r, g, b } = hsvToRgb(h / 360, s / 100, v / 100);
    function toHex(x) {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
const PRESET_COLORS = [
    '#f87171', '#fd8738', '#fbbf24', '#facc15', '#a3e635', '#4ade80', '#34d399', '#2dd4bf',
    '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185'
];
function SaturationPicker({ hsv, onChange }) {
    const containerRef = useRef(null);
    function handleMove(e) {
        if (!containerRef.current)
            return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = Math.min(Math.max((e.clientX - left) / width, 0), 1);
        const y = Math.min(Math.max((e.clientY - top) / height, 0), 1);
        onChange(x * 100, (1 - y) * 100);
    }
    function handleMouseDown(e) {
        handleMove(e);
        function moveHandler(e) { handleMove(e); }
        function upHandler() {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
        }
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
    }
    const bgColor = hsvToHex(hsv.h, 100, 100);
    return (_jsxs("div", { ref: containerRef, className: 'w-full h-32 relative rounded-md overflow-hidden cursor-crosshair mb-3 select-none', style: { backgroundColor: bgColor }, onMouseDown: handleMouseDown, children: [_jsx("div", { className: 'absolute inset-0 bg-linear-to-r from-white to-transparent' }), _jsx("div", { className: 'absolute inset-0 bg-linear-to-t from-black to-transparent' }), _jsx("div", { className: `
                    absolute w-3 h-3 border-2 border-white rounded-full
                    shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none
                `, style: { left: `${hsv.s}%`, top: `${100 - hsv.v}%` } })] }));
}
function HuePicker({ hue, onChange }) {
    const containerRef = useRef(null);
    function handleMove(e) {
        if (!containerRef.current)
            return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const x = Math.min(Math.max((e.clientX - left) / width, 0), 1);
        onChange(x * 360);
    }
    function handleMouseDown(e) {
        handleMove(e);
        function moveHandler(e) { handleMove(e); }
        function upHandler() {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
        }
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
    }
    return (_jsx("div", { ref: containerRef, className: 'w-full h-3 relative rounded-full cursor-pointer mb-4 select-none', style: { background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }, onMouseDown: handleMouseDown, children: _jsx("div", { className: `
                    absolute w-4 h-4 bg-white border border-gray-200
                    rounded-full shadow-sm -translate-x-1/2 -translate-y-1/2
                    top-1/2 pointer-events-none
                `, style: { left: `${(hue / 360) * 100}%` } }) }));
}
export default function ColorPickerPopup({ value, onChange, onClose, anchorName }) {
    const [hsv, setHsv] = useState(() => hexToHsv(value || '#000000'));
    const [hexInput, setHexInput] = useState(value || '#000000');
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
    function handleSaturationChange(s, v) { handleColorChange({ ...hsv, s, v }); }
    function handleHueChange(h) { handleColorChange({ ...hsv, h }); }
    function manualHexChange(e) {
        const val = e.target.value;
        setHexInput(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            const newHsv = hexToHsv(val);
            setHsv(newHsv);
            onChange(val);
        }
    }
    return (_jsxs("div", { className: 'fixed z-50 bg-login-600 border border-login-500 rounded-md shadow-lg p-3 w-64 select-none anchor-popup', style: {
            positionAnchor: anchorName,
            positionArea: 'bottom span-right',
            insetArea: 'bottom span-right',
            positionTryFallbacks: 'flip-block',
            margin: '0.25rem 0',
        }, children: [_jsx(SaturationPicker, { hsv: hsv, onChange: handleSaturationChange }), _jsx(HuePicker, { hue: hsv.h, onChange: handleHueChange }), _jsxs("div", { className: 'flex items-center gap-2 mb-3', children: [_jsx("div", { className: 'text-xs text-login-200 font-mono', children: "HEX" }), _jsx("input", { type: 'text', value: hexInput, onChange: manualHexChange, className: `
                        flex-1 min-w-0 bg-login-500 border border-login-500 rounded
                        px-2 py-1 text-sm text-login-text focus:outline-none
                        focus:border-login focus:ring-1 focus:ring-login
                    `, spellCheck: false }), _jsx("div", { className: 'w-8 h-8 rounded border border-login-500 shrink-0', style: { backgroundColor: hexInput } })] }), _jsx("div", { className: 'grid grid-cols-8 gap-1.5 pt-3 border-t border-login-500', children: PRESET_COLORS.map(color => (_jsx("button", { type: 'button', className: `
                            w-6 h-6 rounded-sm cursor-pointer hover:scale-110
                            hover:zIndex-10 transition-transform ring-1 ring-inset ring-black/10
                        `, style: { backgroundColor: color }, onClick: () => {
                        const newHsv = hexToHsv(color);
                        setHsv(newHsv);
                        setHexInput(color);
                        onChange(color);
                        onClose();
                    }, title: color }, color))) })] }));
}

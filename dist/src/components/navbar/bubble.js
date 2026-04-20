import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
export default function Bubble({ bubble }) {
    if (bubble.hide) {
        return null;
    }
    return (_jsxs("a", { href: bubble.href, className: `absolute top-15 min-w-30 ${bubble.className}`, children: [_jsxs("svg", { viewBox: '0 0 24 12', className: 'absolute -top-3 h-3 w-6', "aria-hidden": 'true', children: [_jsx("path", { d: 'M12 0 24 12H0Z', fill: bubble.fill, stroke: bubble.stroke, strokeWidth: '1.5', strokeLinejoin: 'round' }), _jsx("path", { d: 'M12 0 24 12H0Z', fill: bubble.fill })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: bubble.text }), _jsx(X, { onClick: bubble.handleHide, className: bubble.x })] })] }));
}

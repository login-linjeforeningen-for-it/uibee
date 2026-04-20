import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Bubble({ href, className, fill, stroke, text }) {
    return (_jsxs("a", { href: href, className: className, children: [_jsxs("svg", { viewBox: '0 0 24 12', className: 'relative -top-4.5 h-3 w-6', "aria-hidden": 'true', children: [_jsx("path", { d: 'M12 0 24 12H0Z', fill: fill, stroke: stroke, strokeWidth: '1.5', strokeLinejoin: 'round' }), _jsx("path", { d: 'M12 0 24 12H0Z', fill: fill })] }), _jsx("span", { children: text })] }));
}

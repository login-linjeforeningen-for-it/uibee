import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export default function Toggle({ value, onChange, left, right, }) {
    const active = 'bg-login-200 text-login-950 shadow';
    const idle = 'text-login-200 hover:bg-login-50/10 hover:text-login-50';
    const base = 'flex items-center justify-center rounded-full transition gap-1';
    function renderContent(opt) {
        return (_jsxs(_Fragment, { children: [opt.icon, opt.text && _jsx("span", { children: opt.text })] }));
    }
    const isLeftActive = value === left.value;
    const isRightActive = value === right.value;
    return (_jsxs("div", { className: 'flex items-center rounded-full border border-login-100/10 bg-login-50/5 p-1', children: [_jsx("button", { type: 'button', onClick: () => onChange(left.value), "aria-label": left.label ?? left.text, "aria-pressed": isLeftActive, className: `${base} px-2 h-7 ${isLeftActive ? active : idle}`, children: renderContent(left) }), _jsx("button", { type: 'button', onClick: () => onChange(right.value), "aria-label": right.label ?? right.text, "aria-pressed": isRightActive, className: `${base} px-2 h-7 ${isRightActive ? active : idle}`, children: renderContent(right) })] }));
}

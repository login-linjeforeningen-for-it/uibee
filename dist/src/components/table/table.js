'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Body from './body';
import Header from './header';
export default function Table({ data, columns, menuItems, redirectPath, variant = 'default', idKey }) {
    if (data.length === 0) {
        return _jsx("div", { className: 'p-4 text-center text-login-200', children: "No data found" });
    }
    return (_jsx("div", { className: `
            flex-1 flex flex-col min-h-0 overflow-x-auto overflow-y-hidden h-full w-full
            ${variant === 'default' ? 'bg-login-500/50 rounded-lg shadow border border-login-600' : ''}
            ${variant === 'minimal' ? 'bg-transparent' : ''}
        `, children: _jsxs("table", { className: 'min-w-full w-max divide-y divide-login-600 flex flex-col flex-1 min-h-0', children: [_jsx(Header, { columns: columns, hideMenu: !menuItems, variant: variant }), _jsx(Body, { list: data, columns: columns, menuItems: menuItems, redirectPath: redirectPath, variant: variant, idKey: idKey })] }) }));
}

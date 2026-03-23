import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogIn } from 'lucide-react';
import Logo from '../logo/logo';
import Link from 'next/link';
export default function LoginPage({ title, description, redirectPath, version, btg, handleSubmit, guestRedirectPath, guestText }) {
    return (_jsx("main", { className: 'w-full h-full flex items-center justify-center bg-login-800 p-8', children: _jsxs("div", { className: 'flex flex-col justify-center items-center bg-login-600 px-4 py-12 rounded-xl w-full max-w-md gap-4 md:gap-6', children: [_jsx("div", { className: 'relative aspect-3/1 w-full', children: _jsx(Logo, { className: 'object-contain px-6 sm:px-12' }) }), _jsxs("h1", { className: 'text-3xl font-extrabold text-login text-center tracking-tight', children: [title, " ", btg ? ' - Break the Glass' : ''] }), description && (_jsx("p", { className: 'text-center font-medium text-lg mb-2 max-w-xs', children: description })), btg ? (_jsxs("form", { className: 'w-full flex flex-col gap-3 max-w-xs', onSubmit: e => {
                        e.preventDefault();
                        handleSubmit?.(new FormData(e.currentTarget));
                        e.currentTarget.reset();
                    }, children: [_jsx("input", { type: 'text', name: 'name', placeholder: 'Name', className: 'py-2 px-3 rounded bg-login-900 font-medium focus:outline-none', required: true }), _jsx("input", { type: 'password', name: 'token', placeholder: 'Token', className: 'py-2 px-3 rounded bg-login-900 font-medium focus:outline-none', required: true }), _jsx("button", { type: 'submit', className: 'py-2 px-4 rounded-xl bg-login font-bold text-lg ' +
                                'hover:bg-login/80 transition-all duration-200 mt-2', children: "Login" })] })) : (_jsxs(Link, { href: redirectPath, className: `
                            flex items-center justify-center gap-2 w-full
                            max-w-xs py-3 px-6 rounded-xl bg-login font-bold
                            text-lg hover:bg-login/80 transition-all
                            duration-200 mb-2 mt-2 cursor-pointer
                        `, children: ["Login", _jsx(LogIn, { className: 'w-6 h-6' })] })), guestRedirectPath &&
                    _jsx(Link, { href: guestRedirectPath, className: 'text-sm font-semibold cursor-pointer opacity-50', children: guestText || 'Continue as guest' }), _jsxs("span", { className: 'text-sm mt-2', children: ["v", version] })] }) }));
}

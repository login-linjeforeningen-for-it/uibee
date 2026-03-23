import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import Menu from './menu';
import { formatValue } from './format';
export default function Body({ list, columns, menuItems, redirectPath, variant = 'default', idKey }) {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const router = useRouter();
    const menuRef = useRef(null);
    const tbodyRef = useRef(null);
    const menuWasOpenOnMouseDown = useRef(false);
    useClickOutside(menuRef, () => setOpenMenuId(null));
    useEffect(() => {
        const el = tbodyRef.current;
        if (!el)
            return;
        const close = () => setOpenMenuId(null);
        el.addEventListener('scroll', close);
        return () => el.removeEventListener('scroll', close);
    }, []);
    return (_jsx("tbody", { ref: tbodyRef, className: `
                divide-login-600 block overflow-y-auto flex-1 min-h-0
                ${variant === 'default' ? 'bg-login-500/50 divide-y' : 'bg-transparent divide-y'}
            `, children: list.map((item, index) => {
            const itemRecord = item;
            let id = '';
            if (idKey && itemRecord[idKey] !== undefined) {
                id = String(itemRecord[idKey]);
            }
            else if (itemRecord['id'] !== undefined) {
                id = String(itemRecord['id']);
            }
            else {
                const firstKey = columns[0]?.key || Object.keys(itemRecord)[0];
                id = String(itemRecord[firstKey]);
            }
            const redirectConfig = (typeof redirectPath === 'object' && redirectPath) ? redirectPath : { path: redirectPath };
            const redirectId = redirectConfig.key ? String(itemRecord[redirectConfig.key]) : id;
            const menuButtonColors = variant === 'minimal'
                ? {
                    active: 'bg-login-600 text-login-100',
                    inactive: 'hover:bg-login-600 text-login-200 hover:text-login-100'
                }
                : {
                    active: 'bg-login-400 text-login-100',
                    inactive: 'hover:bg-login-400 text-login-200 hover:text-login-100'
                };
            const buttonClass = openMenuId === id ? menuButtonColors.active : menuButtonColors.inactive;
            return (_jsxs("tr", { className: `
                            flex w-full group/row transition-colors 
                            ${redirectConfig.path ? 'cursor-pointer' : ''}
                            ${variant === 'default' && redirectConfig.path ? 'hover:bg-login-600/30' : ''}
                            ${variant === 'minimal' ? 'hover:bg-white/5 border-b border-login-600/50 last:border-0' : ''}
                        `, onMouseDown: () => {
                    menuWasOpenOnMouseDown.current = openMenuId !== null;
                }, onClick: () => {
                    if (menuWasOpenOnMouseDown.current) {
                        menuWasOpenOnMouseDown.current = false;
                        return;
                    }
                    if (redirectConfig.path) {
                        if (redirectConfig.path.includes('?')) {
                            router.push(`${redirectConfig.path}${redirectId}`);
                        }
                        else {
                            router.push(`${redirectConfig.path}/${redirectId}`);
                        }
                    }
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    setAnchor({ top: e.clientY, right: window.innerWidth - e.clientX });
                    setOpenMenuId(id);
                }, children: [columns.map((col) => {
                        const val = itemRecord[col.key];
                        const value = val;
                        let badgeClass = '';
                        if (col.highlight) {
                            const highlightKey = String(value);
                            const colorName = col.highlight[highlightKey] || col.highlight.default;
                            if (colorName) {
                                switch (colorName) {
                                    case 'green':
                                        badgeClass = 'bg-green-500/20 text-green-400';
                                        break;
                                    case 'yellow':
                                        badgeClass = 'bg-yellow-500/20 text-yellow-400';
                                        break;
                                    case 'red':
                                        badgeClass = 'bg-red-500/20 text-red-400';
                                        break;
                                    case 'blue':
                                        badgeClass = 'bg-blue-500/20 text-blue-400';
                                        break;
                                    case 'gray':
                                        badgeClass = 'bg-gray-500/20 text-gray-400';
                                        break;
                                }
                                badgeClass += ' px-2 py-1 rounded';
                            }
                        }
                        return (_jsx("td", { className: `
                                        flex-1 min-w-0 px-6 py-4 whitespace-nowrap text-sm flex items-center text-login-100
                                        ${variant === 'minimal' ? 'px-4! py-2!' : ''}
                                    `, children: _jsx("div", { className: 'relative w-full min-w-0', children: _jsx("h1", { className: `block max-w-full truncate ${badgeClass}`, children: formatValue(col.key, value) }) }) }, col.key));
                    }), menuItems && (_jsx("td", { className: 'shrink-0 w-16 flex flex-row items-center justify-end p-2 px-4\n                                    whitespace-nowrap text-right text-sm font-medium', children: _jsxs("div", { className: 'relative', children: [_jsx("button", { type: 'button', className: `p-1.5 rounded flex items-center justify-center transition-colors ${buttonClass}`, onMouseDown: (e) => e.nativeEvent.stopImmediatePropagation(), onClick: (e) => {
                                        e.stopPropagation();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const coords = { top: rect.bottom + 4, right: window.innerWidth - rect.right };
                                        setAnchor(openMenuId === id ? null : coords);
                                        setOpenMenuId(openMenuId === id ? null : id);
                                    }, children: _jsx("span", { className: 'text-xl leading-none select-none', children: _jsx(EllipsisVertical, { className: 'h-5 w-5' }) }) }), openMenuId === id && anchor && (_jsx(Menu, { ref: menuRef, anchor: anchor, onClose: () => setOpenMenuId(null), children: menuItems?.(item, id) }))] }) }))] }, index));
        }) }));
}
